import { pineconeIndex } from "../config/pinecone.js";
import type { RecordMetadata } from "@pinecone-database/pinecone";

interface DocumentChunk {
  content: string;
  chunkIndex: number;
}

interface VectorChunk {
  id: string;
  values: number[];
  metadata: RecordMetadata;
}

export const storeDocumentVectors = async (
  userId: string,
  documentId: string,
  chunks: DocumentChunk[],
  embeddings: number[][]
): Promise<void> => {
  if (chunks.length !== embeddings.length) {
    throw new Error("Chunks and embeddings count do not match");
  }

  if (chunks.length === 0) {
    return;
  }

  const vectors: VectorChunk[] = chunks.map((chunk, index) => ({
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