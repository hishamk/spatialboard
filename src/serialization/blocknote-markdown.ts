import { BlockNoteEditor } from "@blocknote/core";
import { schema } from "../schema";

// Create a headless editor just for serialization (no DOM needed)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let serializerEditor: any = null;

function getSerializerEditor() {
  if (!serializerEditor) {
    serializerEditor = BlockNoteEditor.create({ schema });
  }
  return serializerEditor as ReturnType<typeof BlockNoteEditor.create>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function blocksToMarkdown(blocks: any[]): Promise<string> {
  const editor = getSerializerEditor();
  return await editor.blocksToMarkdownLossy(blocks);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function markdownToBlocks(markdown: string): Promise<any[]> {
  const editor = getSerializerEditor();
  return await editor.tryParseMarkdownToBlocks(markdown);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function htmlToBlocks(html: string): any[] {
  const editor = getSerializerEditor();
  return editor.tryParseHTMLToBlocks(html);
}
