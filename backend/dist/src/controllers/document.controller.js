import { processDocument } from "../services/document.service.js";
export const UploadDocuments = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one pdf is required"
            });
        }
        const documents = [];
        for (const file of files) {
            const result = await processDocument(req.userId, file);
            documents.push({
                id: result.document.id,
                fileName: result.document.filename,
                pageCount: result.document.pageCount,
                fileSize: result.document.fileSize,
                status: result.document.status,
                createdAt: result.document.createdAt
            });
        }
        return res.status(200).json({
            success: true,
            message: "Documents uploaded successfully!",
            data: {
                documents
            }
        });
    }
    catch (error) {
        console.log("Document controller error!", error);
        if (error instanceof Error && error.name === "JINA_RATE_LIMIT") {
            return res.status(429).json({
                success: false,
                code: "JINA_RATE_LIMIT",
                message: "Embedding service limit reach. Please try again later"
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
};
