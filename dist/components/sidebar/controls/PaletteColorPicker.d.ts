import type { ColorPalette } from "../styles";
interface PaletteColorPickerProps {
    label: string;
    palettes: ColorPalette[];
    value: string | null | undefined;
    onChange: (color: string | null) => void;
    allowNull?: boolean;
    mixed?: boolean;
}
export default function PaletteColorPicker({ label, palettes, value, onChange, allowNull, mixed, }: PaletteColorPickerProps): import("react/jsx-runtime").JSX.Element;
export {};
