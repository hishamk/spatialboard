interface BorderControlsProps {
    borderColor: string | null | undefined;
    borderStyle: "solid" | "dashed" | "dotted" | undefined;
    borderWidth: number | undefined;
    mixed?: {
        color?: boolean;
        style?: boolean;
        width?: boolean;
    };
    onChange: (prop: string, value: unknown) => void;
}
export default function BorderControls({ borderColor, borderStyle, borderWidth, mixed, onChange, }: BorderControlsProps): import("react/jsx-runtime").JSX.Element;
export {};
