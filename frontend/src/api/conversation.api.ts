import api from "./api";

export interface ConversationDocument {
    id: string;
    filename: string;
    pageCount: number | null;
    fileSize: number;
    status: "PROCESSING" | "READY" | "FAILED";
}

export interface ConversationMessage {
    id: string;
    role: "USER" | "ASSISTANT";
    content: string;
    createdAt: string;
}

export interface Conversation {
    id: string;
    title: string | null;
    createdAt: string;
    updatedAt: string;

    documents: Array<{
        document: ConversationDocument;
    }>;

    messages?: ConversationMessage[];
}

interface CreateConversationResponse {
    success: boolean;
    message: string;
    data: {
        conversation: Conversation;
    };
}

interface GetConversationResponse {
    success: boolean;
    message?: string;
    data: {
        conversation: Conversation & {
            messages: ConversationMessage[];
        };
    };
}

export const createConversation = async (
    documentIds: string[],
    title?: string
): Promise<CreateConversationResponse> => {
    const response = await api.post<CreateConversationResponse>(
        "/conversations",
        {
            documentIds,
            title,
        }
    );

    return response.data;
};

export const getConversation = async (
    conversationId: string
): Promise<GetConversationResponse> => {
    const response = await api.get<GetConversationResponse>(
        `/conversations/${conversationId}`
    );

    return response.data;
};