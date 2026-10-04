import { pineconeIndex } from "../config/pinecone.js";
export const storeDocumentVectors = async (userId, documentId, chunks, embeddings) => {
    if (chunks.length !== embeddings.length) {
        throw new Error("Chunks and embeddings count do not match");
    }
    if (chunks.length === 0) {
        return;
    }
    const vectors = chunks.map((chunk, index) => ({
        id: `${documentId}-${chunk.chunkIndex}`,
        values: embeddings[index],
        metadata: {
            userId,
            documentId,
            chunkIndex: chunk.chunkIndex,
            text: chunk.content,
        },
    }));
    const namespace = pineconeIndex.namespace(userId);
    await namespace.upsert({
        records: vectors,
    });
};
