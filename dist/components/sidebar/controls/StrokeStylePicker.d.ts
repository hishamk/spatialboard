interface StrokeStylePickerProps {
    label: string;
    value: "solid" | "dashed" | "dotted" | undefined;
    onChange: (style: "solid" | "dashed" | "dotted") => void;
    mixed?: boolean;
}
export default function StrokeStylePicker({ label, value, onChange, mixed, }: StrokeStylePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
