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
                document: result.document,
                chunks: result.chunks,
                embeddings: result.embeddings
            }
        })
    } catch (error) {
        console.log("Document controller error!", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}