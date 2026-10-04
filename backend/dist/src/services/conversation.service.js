import { prisma } from "../config/prisma.js";
export const createConversation = async (userId, documentIds, title) => {
    if (documentIds.length == 0) {
        throw new Error("At lease one document is required");
    }
    // verify every documents
    const documents = await prisma.document.findMany({
        where: {
            id: {
                in: documentIds
            },
            userId,
            status: "READY"
        },
        select: {
            id: true
        }
    });
    if (documentIds.length !== documents.length) {
        throw new Error("Atleast one or two documents are not ready!");
    }
    const conversation = await prisma.conversation.create({
        data: {
            userId,
            title: title || "New Conversation",
            documents: {
                create: documentIds.map((documentId) => ({
                    documentId
                }))
            }
        },
        include: {
            documents: {
                include: {
                    document: {
                        select: {
                            id: true,
                            filename: true,
                            pageCount: true,
                            fileSize: true,
                            status: true
                        }
                    }
                }
            }
        }
    });
    return conversation;
};
export const getConversation = async (userId, conversationId) => {
    const conversation = await prisma.conversation.findFirst({
        where: {
            id: conversationId,
            userId,
        },
        include: {
            documents: {
                include: {
                    document: {
                        select: {
                            id: true,
                            filename: true,
                            pageCount: true,
                            fileSize: true,
                            status: true,
                        },
                    },
                },
            },
            messages: {
                orderBy: {
                    createdAt: "asc",
                },
                select: {
                    id: true,
                    role: true,
                    content: true,
                    createdAt: true,
                },
            },
        },
    });
    if (!conversation) {
        throw new Error("Conversation not found");
    }
    return conversation;
};
