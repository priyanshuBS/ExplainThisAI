import { Pinecone } from "@pinecone-database/pinecone";

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;

if (!PINECONE_API_KEY) {
  throw new Error("PINECONE_API_KEY is not defined");
}

if (!PINECONE_INDEX_NAME) {
    throw new Error("PINECONE_INDEX_NAME is not defined");
}

const pinecone = new Pinecone({
    apiKey: PINECONE_API_KEY
});

export const pineconeIndex = pinecone.index({
    name: PINECONE_INDEX_NAME,
});