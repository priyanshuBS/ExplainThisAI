import { createMessage } from "../services/message.service.js";
export const CreateMessage = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { conversationId } = req.params;
        const { content } = req.body;
        if (typeof conversationId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid conversation ID",
            });
        }
        if (!content || typeof content !== "string") {
            return res.status(400).json({
                success: false,
                message: "Message content is required",
            });
        }
        const result = await createMessage(req.userId, conversationId, content);
        return res.status(200).json({
            success: true,
            data: {
                message: result.assistantMessage,
                sources: result.sources.map((source) => ({
                    documentId: source.documentId,
                    chunkIndex: source.chunkIndex,
                    score: source.score,
                })),
            },
        });
    }
    catch (error) {
        console.error("Create message error:", error);
        if (error instanceof Error &&
            error.message === "Conversation not found") {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }
        if (error instanceof Error &&
            error.message ===
                "No documents are attached to this conversation") {
            return res.status(400).json({
                success: false,
                message: "No documents are attached to this conversation",
            });
        }
        if (error instanceof Error &&
            error.name === "JINA_RATE_LIMIT") {
            return res.status(429).json({
                success: false,
                code: "JINA_RATE_LIMIT",
                message: "Embedding service limit reached. Please try again later.",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Failed to generate response",
        });
    }
};
