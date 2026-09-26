interface TextChunk {
    content: string;
    chunkIndex: number;
}

const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

export const createChunk = (text: string): TextChunk[] => {
    const chunks: TextChunk[] = [];

    let start = 0;
    let chunkIndex = 0;

    while (start < text.length) {
        const end = Math.min(start + CHUNK_SIZE, text.length);
        const chunk = text.slice(start, end);

        chunks.push({
            content: chunk,
            chunkIndex
        });

        chunkIndex++;

        start += CHUNK_SIZE - CHUNK_OVERLAP;
    }

    return chunks;
}