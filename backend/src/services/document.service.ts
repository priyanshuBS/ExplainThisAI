import { prisma } from "../config/prisma.js";
import { parsePdf } from "./pdf.service.js";
import { cleanText } from "./text.service.js";
import { createChunk } from "./chunk.service.js";
import { generateDocumentEmbeddings } from "./embedding.service.js";

export const processDocument = async (userId: string, file: Express.Multer.File) => {
    const document = await prisma.document.create({
        data: {
            userId,
            filename: file.originalname,
            fileSize: file.size,
            status: "PROCESSING"
        }
    });

    try {
        const parsedPdf = await parsePdf(file.buffer);

        const cleanedText = cleanText(parsedPdf.text);

        const chunks = createChunk(cleanedText);

        const embeddings = await generateDocumentEmbeddings(
            chunks.map((chunk) => chunk.content)
        );

        const updatedDocument = await prisma.document.update({
            where: {
                id: document.id,
            },
            data: {
                pageCount: parsedPdf.pageCount,
                status: "READY"
            }
        });

        return {
            document: updatedDocument,
            chunks,
            embeddings
        }
    } catch (error) {
        await prisma.document.update({
            where: {
                id: document.id,
            },
            data: {
                status: "FAILED",
            }
        });
        
        throw error;
    }
}