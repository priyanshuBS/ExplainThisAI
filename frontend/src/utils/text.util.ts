export const cleanAIResponse = (text: string): string => {
    if (!text) {
        return "";
    }

    return text
        // Convert escaped newlines into actual newlines
        .replace(/\\n/g, "\n")

        // Remove bold markdown: **text**
        .replace(/\*\*(.*?)\*\*/g, "$1")

        // Remove underline-style bold: __text__
        .replace(/__(.*?)__/g, "$1")

        // Remove italic markdown: *text*
        .replace(/(?<!\*)\*(?!\*)(.*?)\*(?!\*)/g, "$1")

        // Remove markdown headings: ### Heading
        .replace(/^#{1,6}\s+/gm, "")

        // Clean excessive spaces
        .replace(/[ \t]+/g, " ")

        // Remove excessive blank lines
        .replace(/\n{3,}/g, "\n\n")

        .trim();
};