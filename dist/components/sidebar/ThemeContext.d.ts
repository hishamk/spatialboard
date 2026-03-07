export interface SpatialBoardTheme {
    /** Panel/toolbar background */
    panelBg: string;
    /** Floating panel box-shadow */
    panelShadow: string;
    /** Floating panel border radius */
    panelBorderRadius: number;
    /** Inactive button / input background */
    controlBg: string;
    /** Active button background */
    controlBgActive: string;
    /** Button border radius */
    controlBorderRadius: number;
    /** Primary text color */
    text: string;
    /** Muted label text */
    textMuted: string;
    /** Selection header text */
    textSecondary: string;
    /** Section header / disabled text */
    textFaint: string;
    /** Empty state text */
    textDisabled: string;
    /** Border color */
    border: string;
    /** Separator / divider color */
    separator: string;
    /** Active color swatch border */
    swatchBorderActive: string;
    /** Error state color */
    error: string;
    /** Native control accent (e.g. slider thumb) */
    accentColor: string;
}
export declare const DEFAULT_SB_THEME: SpatialBoardTheme;
export declare const SBThemeContext: import("react").Context<SpatialBoardTheme>;
export declare function useSBTheme(): SpatialBoardTheme;
