import api from "./api";

export interface ConversationDocument {
    id: string;
    filename: string;
    pageCount: number | null;
    fileSize: number;
    status: "PROCESSING" | "READY" | "FAILED";
}

export interface Conversation {
    id: string;
    title: string | null;
    createdAt: string;
    updatedAt: string;

    documents: Array<{
        document: ConversationDocument;
    }>;
}

interface CreateConversationResponse {
    success: boolean;
    message: string;
    data: {
        conversation: Conversation;
    };
}

export const createConversation = async (
    documentIds: string[],
    title?: string
): Promise<CreateConversationResponse> => {
    const response =
        await api.post<CreateConversationResponse>(
            "/conversations",
            {
                documentIds,
                title,
            }
        );

    return response.data;
};