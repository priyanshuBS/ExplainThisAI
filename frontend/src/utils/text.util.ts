export const cleanAIResponse = (text: string): string => {
    return text
        // Bold / italic markdown
        .replace(/\*\*\*(.*?)\*\*\*/gs, "$1")
        .replace(/\*\*(.*?)\*\*/gs, "$1")
        .replace(/__(.*?)__/gs, "$1")
        .replace(/\*(.*?)\*/gs, "$1")
        .replace(/_(.*?)_/gs, "$1")

        // Markdown headings
        .replace(/^#{1,6}\s+/gm, "")

        // Markdown code fences
        .replace(/```[\w-]*\n?/g, "")
        .replace(/```/g, "")

        // Markdown links: [text](url) -> text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

        // Excessive horizontal separators
        .replace(/^[-*_]{3,}$/gm, "")

        // Remove excessive blank lines
        .replace(/\n{3,}/g, "\n\n")

        .trim();
};