import type { SpatialNode } from "../engine/types";
interface PersonalLibraryPromptProps {
    nodes: SpatialNode[];
    onSave: (name: string) => void;
    onCancel: () => void;
}
export default function PersonalLibraryPrompt({ nodes, onSave, onCancel, }: PersonalLibraryPromptProps): import("react").ReactPortal;
export {};
