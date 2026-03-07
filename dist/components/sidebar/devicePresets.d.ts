export type PresetOrientation = "portrait" | "landscape";
export type PresetGroup = "phone" | "phone-landscape" | "tablet" | "tablet-landscape" | "other" | "standard";
export interface DevicePreset {
    key: string;
    label: string;
    w: number;
    h: number;
    group: PresetGroup;
}
export declare const DEVICE_PRESETS: DevicePreset[];
export declare function getPreset(key: string): DevicePreset | undefined;
export declare function getAspectRatio(preset: DevicePreset): number;
export declare function getGroupedPresets(): {
    label: string;
    presets: DevicePreset[];
}[];
