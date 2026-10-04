import { pineconeIndex } from "../config/pinecone.js";
import { generateQueryEmbedding } from "./embedding.service.js";
export const searchDocuments = async (userId, documentIds, query, topK = 5) => {
    if (documentIds.length === 0) {
        return [];
    }
    // Convert user's question into a vector
    const queryEmbedding = await generateQueryEmbedding(query);
    // Search only inside this user's namespace
    const namespace = pineconeIndex.namespace(userId);
    // Search only the documents attached to the conversation
    const result = await namespace.query({
        vector: queryEmbedding,
        topK,
        includeMetadata: true,
        filter: {
            documentId: {
                $in: documentIds,
            },
        },
    });
    // Convert Pinecone response into our own format
    return result.matches
        .filter((match) => match.metadata?.text)
        .map((match) => ({
        id: match.id,
        score: match.score ?? 0,
        text: match.metadata.text,
        documentId: match.metadata.documentId,
        chunkIndex: match.metadata.chunkIndex,
    }));
};
