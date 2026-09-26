export const cleanText = (text: string): string => {
  return text
    // Convert multiple spaces/tabs into one space
    .replace(/[ \t]+/g, " ")

    // Remove excessive blank lines
    .replace(/\n\s*\n+/g, "\n\n")

    // Remove spaces at beginning/end of lines
    .replace(/^\s+|\s+$/gm, "")

    // Remove extra whitespace at beginning/end
    .trim();
};