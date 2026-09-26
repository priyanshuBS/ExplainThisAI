const JINA_API_URL = "https://api.jina.ai/v1/embeddings";
const JINA_MODEL = "jina-embeddings-v5-text-small";

const JINA_API_KEY = process.env.JINA_API_KEY;

if (!JINA_API_KEY) {
  throw new Error("JINA_API_KEY is not defined");
}

interface JinaEmbeddingResponse {
  data: {
    index: number;
    embedding: number[];
  }[];
}

export const generateDocumentEmbeddings = async (
  texts: string[]
): Promise<number[][]> => {
  if (texts.length === 0) {
    return [];
  }

  const response = await fetch(JINA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JINA_API_KEY}`,
    },
    body: JSON.stringify({
      model: JINA_MODEL,
      task: "retrieval.passage",
      dimensions: 1024,
      input: texts,
    }),
  });

  if (response.status === 429) {
    const error = new Error(
      "Jina embedding rate limit reached. Please try again later."
    );

    error.name = "JINA_RATE_LIMIT";
    throw error;
  }

  if (!response.ok) {
    const errorBody = await response.text();

    console.error("Jina API error:", errorBody);

    throw new Error("Failed to generate embeddings");
  }

  const data = (await response.json()) as JinaEmbeddingResponse;

  return data.data
    .sort((a, b) => a.index - b.index)
    .map((item) => item.embedding);
};

export const generateQueryEmbedding = async (
  query: string
): Promise<number[]> => {
  const response = await fetch(JINA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JINA_API_KEY}`,
    },
    body: JSON.stringify({
      model: JINA_MODEL,
      task: "retrieval.query",
      dimensions: 1024,
      input: [query],
    }),
  });

  if (response.status === 429) {
    const error = new Error(
      "Jina embedding rate limit reached. Please try again later."
    );

    error.name = "JINA_RATE_LIMIT";
    throw error;
  }

  if (!response.ok) {
    const errorBody = await response.text();

    console.error("Jina API error:", errorBody);

    throw new Error("Failed to generate query embedding");
  }

  const data = (await response.json()) as JinaEmbeddingResponse;

  return data.data[0].embedding;
};