import type { PortableTextBlock } from "@portabletext/types";

const WORDS_PER_MINUTE = 200;

function extractText(blocks: PortableTextBlock[]): string {
  const texts: string[] = [];

  for (const block of blocks) {
    if (block._type !== "code" && block.children) {
      for (const child of block.children) {
        if ("text" in child && typeof child.text === "string") {
          texts.push(child.text);
        }
      }
    }
  }

  return texts.join(" ");
}

export function estimateReadingTime(blocks: PortableTextBlock[]): string {
  const text = extractText(blocks);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

  return `${minutes} min read`;
}
