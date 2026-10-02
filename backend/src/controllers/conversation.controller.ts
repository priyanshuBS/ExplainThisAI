import { Request, Response } from "express";
import { createConversation, getConversation } from "../services/conversation.service.js";

export const CreateConversation = async (req: Request, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const { documentIds, title } = req.body;

        if (!Array.isArray(documentIds) || documentIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one document is required"
            })
        }

        const conversation = await createConversation(
            req.userId, documentIds, title
        );

        return res.status(200).json({
            success: true,
            message: "Conversation created successfully!",
            data: {
                conversation
            }
        })
    } catch (error) {
        console.log("conversation error!", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create conversation"
        })
    }
}

export const GetConversation = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const { conversationId } = req.params;

        if (!conversationId || Array.isArray(conversationId)) {
            return res.status(400).json({
                success: false,
                message: "Conversation ID is required",
            });
        }

        const conversation = await getConversation(
            req.userId,
            conversationId
        );

        return res.status(200).json({
            success: true,
            message: "Conversation fetched successfully!",
            data: {
                conversation,
            },
        });
    } catch (error) {
        console.error("Get conversation error:", error);

        if (
            error instanceof Error &&
            error.message === "Conversation not found"
        ) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to fetch conversation",
        });
    }
};