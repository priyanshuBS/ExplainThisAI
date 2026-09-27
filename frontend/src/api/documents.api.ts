import api from "./api";

export interface UploadedDocument {
    id: string;
    fileName: string;
    pageCount: number | null;
    fileSize: number;
    status: "PROCESSING" | "READY" | "FAILED";
    createdAt: string;
}

interface UploadDocumentsResponse {
    success: boolean;
    message: string;
    data: {
        documents: UploadedDocument[];
    };
}

export const uploadDocuments = async (
    files: File[]
): Promise<UploadDocumentsResponse> => {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append("documents", file);
    });

    const response = await api.post<UploadDocumentsResponse>(
        "/documents/upload",
        formData
    );

    return response.data;
};