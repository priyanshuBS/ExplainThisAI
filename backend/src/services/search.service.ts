import { pineconeIndex } from "../config/pinecone.js";
import { generateQueryEmbedding } from "./embedding.service.js";

interface SearchResult {
  id: string;
  score: number;
  text: string;
  documentId: string;
  chunkIndex: number;
}

export const searchDocuments = async (
  userId: string,
  documentIds: string[],
  query: string,
  topK: number = 5
): Promise<SearchResult[]> => {
  if (documentIds.length === 0) {
    return [];
  }

  // 1. Convert user's question into a vector
  const queryEmbedding = await generateQueryEmbedding(query);


  // 2. Search only inside this user's namespace
  const namespace = pineconeIndex.namespace(userId);

  // 3. Search only the documents attached to the conversation
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

  // 4. Convert Pinecone response into our own format
  return result.matches
    .filter((match) => match.metadata?.text)
    .map((match) => ({
      id: match.id,
      score: match.score ?? 0,
      text: match.metadata!.text as string,
      documentId: match.metadata!.documentId as string,
      chunkIndex: match.metadata!.chunkIndex as number,
    }));
};