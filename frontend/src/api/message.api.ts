import api from "./api";

export interface ChatMessage {
    id: string;
    role: "USER" | "ASSISTANT";
    content: string;
    createdAt: string;
}

export interface MessageSource {
    documentId: string;
    chunkIndex: number;
    score: number;
}

interface CreateMessageResponse {
    success: boolean;
    data: {
        message: ChatMessage;
        sources: MessageSource[];
    };
}

export const createMessage = async (
    conversationId: string,
    content: string
): Promise<CreateMessageResponse> => {
    const response = await api.post<CreateMessageResponse>(
        `/conversations/${conversationId}/messages`,
        {
            content,
        }
    );

    return response.data;
};