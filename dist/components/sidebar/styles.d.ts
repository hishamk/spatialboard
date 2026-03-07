export declare const TOOL_STRIP_WIDTH = 48;
export declare const PROPERTIES_WIDTH = 270;
export declare const SIDEBAR_WIDTH: number;
export declare const STROKE_COLORS: string[];
export declare const FILL_COLORS: (string | null)[];
export declare const FILL_STYLES: {
    key: "hachure" | "cross-hatch" | "solid";
    label: string;
}[];
export declare const STROKE_STYLES: {
    key: "solid" | "dashed" | "dotted";
    label: string;
    dash: string;
}[];
export declare const ROUGHNESS_LEVELS: {
    value: number;
    label: string;
}[];
export declare const WIDTHS: number[];
export declare const FONT_SIZES: number[];
export declare const TEXT_ALIGNS: {
    key: "left" | "center" | "right";
    label: string;
}[];
export declare const STICKY_COLORS: string[];
export interface ColorPalette {
    name: string;
    colors: string[];
}
export declare const STROKE_PALETTES: ColorPalette[];
export declare const FILL_PALETTES: ColorPalette[];
export declare const STICKY_PALETTES: ColorPalette[];
export declare const rowStyle: React.CSSProperties;
export declare const labelStyle: React.CSSProperties;
export declare const btnBase: React.CSSProperties;
export declare const sectionHeader: React.CSSProperties;
