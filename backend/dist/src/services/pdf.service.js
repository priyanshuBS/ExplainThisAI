import { PDFParse } from "pdf-parse";
export const parsePdf = async (buffer) => {
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();
    await parser.destroy();
    return {
        text: data.text,
        pageCount: data.total
    };
};
