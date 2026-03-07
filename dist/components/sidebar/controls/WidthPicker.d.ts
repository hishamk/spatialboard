interface WidthPickerProps {
    label: string;
    widths?: number[];
    value: number | undefined;
    onChange: (width: number) => void;
    mixed?: boolean;
}
export default function WidthPicker({ label, widths, value, onChange, mixed, }: WidthPickerProps): import("react/jsx-runtime").JSX.Element;
export {};
