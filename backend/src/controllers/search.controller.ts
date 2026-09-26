import { Request, Response } from "express";
import { searchDocuments } from "../services/search.service.js";

export const searchDocumentsController = async (
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

    const { query, documentIds, topK } = req.body;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Query is required",
      });
    }

    if (!Array.isArray(documentIds) || documentIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one documentId is required",
      });
    }

    const results = await searchDocuments(
      req.userId,
      documentIds,
      query,
      topK
    );

    return res.status(200).json({
      success: true,
      data: {
        results,
      },
    });
  } catch (error) {
    console.error("Search error:", error);

    if (error instanceof Error && error.name === "JINA_RATE_LIMIT") {
      return res.status(429).json({
        success: false,
        code: "JINA_RATE_LIMIT",
        message: "Embedding service limit reached. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to search documents",
    });
  }
};