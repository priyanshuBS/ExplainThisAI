import { prisma } from "../config/prisma.js";
import { searchDocuments } from "./search.service.js";
import { generateAnswer } from "./llm.service.js";
const HISTORY_LIMIT = 10;
const SEARCH_TOP_K = 5;
export const createMessage = async (userId, conversationId, content) => {
    const question = content.trim();
    if (!question) {
        throw new Error("Message content is required");
    }
    // Find conversation belonging to current user
    const conversation = await prisma.conversation.findFirst({
        where: {
            id: conversationId,
            userId,
        },
        include: {
            documents: {
                select: {
                    documentId: true,
                },
            },
        },
    });
    if (!conversation) {
        throw new Error("Conversation not found");
    }
    // Get documents attached to this conversation
    const documentIds = conversation.documents.map((item) => item.documentId);
    if (documentIds.length === 0) {
        throw new Error("No documents are attached to this conversation");
    }
    // Get previous conversation history
    const history = await prisma.message.findMany({
        where: {
            conversationId,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: HISTORY_LIMIT,
        select: {
            role: true,
            content: true,
        },
    });
    const orderedHistory = history.reverse();
    // Save user's message
    const userMessage = await prisma.message.create({
        data: {
            conversationId,
            role: "USER",
            content: question,
        },
    });
    try {
        // Search only inside this conversation's documents
        const searchResults = await searchDocuments(userId, documentIds, question, SEARCH_TOP_K);
        // Generate answer using retrieved context + history
        const answer = await generateAnswer(question, orderedHistory.map((message) => ({
            role: message.role === "USER"
                ? "user"
                : "assistant",
            content: message.content,
        })), searchResults.map((result) => ({
            text: result.text,
            score: result.score,
        })));
        // Save assistant message
        const assistantMessage = await prisma.message.create({
            data: {
                conversationId,
                role: "ASSISTANT",
                content: answer,
            },
        });
        // Update conversation timestamp
        await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                updatedAt: new Date(),
            },
        });
        return {
            userMessage,
            assistantMessage,
            sources: searchResults,
        };
    }
    catch (error) {
        console.error("Message generation error:", error);
        throw error;
    }
};
