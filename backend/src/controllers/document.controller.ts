import { Request, Response } from "express";
import { processDocument } from "../services/document.service";

export const uploadDocument = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "PDF file is required"
            })
        }

        const result = await processDocument(req.file);

        return res.status(200).json({
            success: true,
            message: "Document processed successfully",
            data: result
        })
    } catch (error) {
        console.log("error in document controller");
        return res.status(500).json({
            success: false,
            message: "Failed to process documents."
        })
    }
}