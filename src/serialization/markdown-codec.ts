// Injectable BlockNote markdown codec.
//
// Core SBD serialize/parse must carry NO dependency edge on `@blocknote` so a
// whiteboard-only / headless consumer never pulls it. The rich-text node module
// registers the real codec on import (`setSbdMarkdownCodec`); when it is absent,
// content nodes fall back to their stored `markdown` (serialize) / empty blocks
// (parse) — the core path stays BlockNote-free.

export interface SbdMarkdownCodec {
  blocksToMarkdown(blocks: unknown[]): Promise<string> | string;
  markdownToBlocks(markdown: string): Promise<unknown[]> | unknown[];
}

let codec: SbdMarkdownCodec | null = null;

/** Register (or clear) the markdown codec used for rich-text content nodes. */
export function setSbdMarkdownCodec(c: SbdMarkdownCodec | null): void {
  codec = c;
}

/** The registered markdown codec, or null when no rich-text module is loaded. */
export function getSbdMarkdownCodec(): SbdMarkdownCodec | null {
  return codec;
}
