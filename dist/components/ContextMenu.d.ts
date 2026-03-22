import { type ReactNode } from "react";
export interface ContextMenuItem {
    label: string;
    shortcut?: string;
    action: () => void;
    danger?: boolean;
    disabled?: boolean;
    checked?: boolean;
    /** Optional leading icon (e.g. Lucide). */
    icon?: ReactNode;
    /** Non-interactive subsection title (e.g. alignment groups). */
    kind?: "header";
}
export interface ContextMenuSection {
    items: ContextMenuItem[];
}
interface ContextMenuProps {
    x: number;
    y: number;
    sections: ContextMenuSection[];
    onClose: () => void;
}
export default function ContextMenu({ x, y, sections, onClose, }: ContextMenuProps): import("react/jsx-runtime").JSX.Element;
export {};
