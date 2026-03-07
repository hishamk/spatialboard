interface ColorSwatchesProps {
    label: string;
    colors: (string | null)[];
    value: string | null | undefined;
    onChange: (color: string | null) => void;
    mixed?: boolean;
}
export default function ColorSwatches({ label, colors, value, onChange, mixed, }: ColorSwatchesProps): import("react/jsx-runtime").JSX.Element;
export {};
