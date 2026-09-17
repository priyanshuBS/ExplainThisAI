import { PDFParse } from "pdf-parse";

export const processDocument = async (file: Express.Multer.File) => {
    const parser = new PDFParse({ data: file.buffer });

    const result = await parser.getText();

    await parser.destroy();

    return result.text;
}