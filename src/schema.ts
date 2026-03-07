import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";

// For the PoC, use defaults. Custom blocks can be added here later.
export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    // Future custom blocks:
    // callout: CalloutBlock,
    // aiPrompt: AIPromptBlock,
  },
});

export type SBDSchema = typeof schema;
