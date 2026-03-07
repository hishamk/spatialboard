export type PresetOrientation = "portrait" | "landscape";
export type PresetGroup = "phone" | "phone-landscape" | "tablet" | "tablet-landscape" | "other" | "standard";

export interface DevicePreset {
  key: string;
  label: string;
  w: number;
  h: number;
  group: PresetGroup;
}

// Portrait definitions (canonical)
const PORTRAIT_PHONES: DevicePreset[] = [
  { key: "iphone-se", label: "iPhone SE", w: 375, h: 667, group: "phone" },
  { key: "iphone-xr", label: "iPhone XR", w: 414, h: 896, group: "phone" },
  { key: "iphone-12-pro", label: "iPhone 12 Pro", w: 390, h: 844, group: "phone" },
  { key: "iphone-14-pro-max", label: "iPhone 14 Pro Max", w: 430, h: 932, group: "phone" },
  { key: "iphone-16-pro", label: "iPhone 16 Pro", w: 402, h: 874, group: "phone" },
  { key: "pixel-7", label: "Pixel 7", w: 412, h: 915, group: "phone" },
  { key: "galaxy-s8", label: "Galaxy S8+", w: 360, h: 740, group: "phone" },
  { key: "galaxy-s20-ultra", label: "Galaxy S20 Ultra", w: 412, h: 915, group: "phone" },
  { key: "galaxy-z-fold-5", label: "Galaxy Z Fold 5", w: 344, h: 882, group: "phone" },
  { key: "galaxy-a51", label: "Galaxy A51/71", w: 412, h: 914, group: "phone" },
];

const PORTRAIT_TABLETS: DevicePreset[] = [
  { key: "ipad-mini", label: "iPad Mini", w: 768, h: 1024, group: "tablet" },
  { key: "ipad-air", label: "iPad Air", w: 820, h: 1180, group: "tablet" },
  { key: "ipad-pro", label: "iPad Pro", w: 1024, h: 1366, group: "tablet" },
  { key: "surface-pro-7", label: "Surface Pro 7", w: 912, h: 1368, group: "tablet" },
  { key: "surface-duo", label: "Surface Duo", w: 540, h: 720, group: "tablet" },
  { key: "zenbook-fold", label: "Asus Zenbook Fold", w: 853, h: 1280, group: "tablet" },
];

function toLandscape(presets: DevicePreset[], group: PresetGroup): DevicePreset[] {
  return presets.map((p) => ({
    key: `${p.key}-landscape`,
    label: `${p.label} ↔`,
    w: p.h,
    h: p.w,
    group,
  }));
}

export const DEVICE_PRESETS: DevicePreset[] = [
  ...PORTRAIT_PHONES,
  ...toLandscape(PORTRAIT_PHONES, "phone-landscape"),
  ...PORTRAIT_TABLETS,
  ...toLandscape(PORTRAIT_TABLETS, "tablet-landscape"),
  // Other devices (already landscape-oriented)
  { key: "nest-hub", label: "Nest Hub", w: 1024, h: 600, group: "other" },
  { key: "nest-hub-max", label: "Nest Hub Max", w: 1280, h: 800, group: "other" },
  // Standard ratios
  { key: "16-9", label: "16:9", w: 1920, h: 1080, group: "standard" },
  { key: "9-16", label: "9:16", w: 1080, h: 1920, group: "standard" },
  { key: "4-3", label: "4:3", w: 1024, h: 768, group: "standard" },
  { key: "3-4", label: "3:4", w: 768, h: 1024, group: "standard" },
  { key: "1-1", label: "1:1", w: 1000, h: 1000, group: "standard" },
  { key: "21-9", label: "21:9", w: 2560, h: 1080, group: "standard" },
];

const PRESET_MAP = new Map(DEVICE_PRESETS.map((p) => [p.key, p]));

export function getPreset(key: string): DevicePreset | undefined {
  return PRESET_MAP.get(key);
}

export function getAspectRatio(preset: DevicePreset): number {
  return preset.w / preset.h;
}

const GROUP_LABELS: Record<string, string> = {
  phone: "Phones",
  "phone-landscape": "Phones (Landscape)",
  tablet: "Tablets",
  "tablet-landscape": "Tablets (Landscape)",
  other: "Devices",
  standard: "Standard",
};

export function getGroupedPresets(): { label: string; presets: DevicePreset[] }[] {
  const groups = new Map<string, DevicePreset[]>();
  for (const p of DEVICE_PRESETS) {
    const arr = groups.get(p.group);
    if (arr) arr.push(p);
    else groups.set(p.group, [p]);
  }
  return Array.from(groups.entries()).map(([group, presets]) => ({
    label: GROUP_LABELS[group] ?? group,
    presets,
  }));
}
