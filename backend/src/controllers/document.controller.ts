import { Request, Response } from "express";
import { processDocument } from "../services/document.service.js";

export const UploadDocument = async (req: Request, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "PDF file is required"
            })
        }

        const result = await processDocument(req.userId, req.file);

        return res.status(200).json({
            success: true,
            message: "Document uploaded successfully!",
            data: {
                document: {
                    id: result.document.id,
                    fileName: result.document.filename,
                    pageCount: result.document.pageCount,
                    fileSize: result.document.fileSize,
                    status: result.document.status,
                    createdAt: result.document.createdAt
                }
            }
        })
    } catch (error) {
        console.log("Document controller error!", error);

        if (error instanceof Error && error.name === "JINA_RATE_LIMIT") {
            return res.status(429).json({
                success: false,
                code: "JINA_RATE_LIMIT",
                message: "Embedding service limit reach. Please try again later"
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}