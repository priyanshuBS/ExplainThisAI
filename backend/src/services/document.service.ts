import { prisma } from "../config/prisma.js";
import { parsePdf } from "./pdf.service.js";

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
            text: parsedPdf.text
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