import type { ReactNode } from "react";
interface PropertySectionProps {
    title: string;
    defaultOpen?: boolean;
    children: ReactNode;
    variant?: "group" | "sub";
    open?: boolean;
    onToggle?: () => void;
    persistKey?: string;
}
export default function PropertySection({ title, defaultOpen, variant, open, onToggle, persistKey, children, }: PropertySectionProps): import("react/jsx-runtime").JSX.Element;
export {};
