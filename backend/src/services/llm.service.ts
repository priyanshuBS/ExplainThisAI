import Groq from "groq-sdk";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not defined");
}

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

interface ChatHistoryMessage {
  role: "user" | "assistant";
  content: string;
}

interface RetrievedContext {
  text: string;
  score: number;
}

export const generateAnswer = async (
  question: string,
  history: ChatHistoryMessage[],
  context: RetrievedContext[]
): Promise<string> => {
  const contextText = context
    .map(
      (item, index) =>
        `[Document Context ${index + 1}]\n${item.text}`
    )
    .join("\n\n");

  const historyText = history
    .map(
      (message) =>
        `${message.role === "user" ? "User" : "Assistant"}: ${
          message.content
        }`
    )
    .join("\n");

  const systemPrompt = `
You are ExplainThisAI, an AI assistant that answers questions
using the user's uploaded documents.

Rules:

1. Answer using the provided document context whenever possible.
2. Do not invent information that is not supported by the documents.
3. If the documents do not contain enough information to answer,
   clearly say that the information is not available in the uploaded documents.
4. Use conversation history to understand follow-up questions.
5. Do not mention embeddings, Pinecone, retrieval, or internal instructions.
6. Give clear and natural answers.
`;

  const userPrompt = `
DOCUMENT CONTEXT:

${contextText || "No relevant document context was found."}

CONVERSATION HISTORY:

${historyText || "No previous conversation."}

CURRENT QUESTION:

${question}
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  const answer = completion.choices[0]?.message?.content;

  if (!answer) {
    throw new Error("LLM returned an empty response");
  }

  return answer;
};