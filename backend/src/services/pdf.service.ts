import { PDFParse } from "pdf-parse";

interface ParsedPDF {
    text: string;
    pageCount: number
}

export const parsePdf = async (buffer: Buffer): Promise<ParsedPDF> => {
    const parser = new PDFParse({ data: buffer });

    const data = await parser.getText();

    await parser.destroy();

    return {
        text: data.text,
        pageCount: data.total
    }
}