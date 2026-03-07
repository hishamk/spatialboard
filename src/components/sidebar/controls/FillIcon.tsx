import { useSBTheme } from "../ThemeContext";

export default function FillIcon({ style }: { style: string }) {
  const theme = useSBTheme();
  if (style === "hachure") {
    return (
      <svg width={20} height={16} viewBox="0 0 20 16">
        <line x1={2} y1={14} x2={8} y2={2} stroke={theme.text} strokeWidth={1.5} />
        <line x1={8} y1={14} x2={14} y2={2} stroke={theme.text} strokeWidth={1.5} />
        <line x1={14} y1={14} x2={18} y2={6} stroke={theme.text} strokeWidth={1.5} />
      </svg>
    );
  }
  if (style === "cross-hatch") {
    return (
      <svg width={20} height={16} viewBox="0 0 20 16">
        <line x1={2} y1={14} x2={8} y2={2} stroke={theme.text} strokeWidth={1.2} />
        <line x1={8} y1={14} x2={14} y2={2} stroke={theme.text} strokeWidth={1.2} />
        <line x1={14} y1={14} x2={18} y2={6} stroke={theme.text} strokeWidth={1.2} />
        <line x1={2} y1={2} x2={8} y2={14} stroke={theme.text} strokeWidth={1.2} />
        <line x1={8} y1={2} x2={14} y2={14} stroke={theme.text} strokeWidth={1.2} />
      </svg>
    );
  }
  // solid
  return (
    <svg width={20} height={16} viewBox="0 0 20 16">
      <rect x={2} y={2} width={16} height={12} fill={theme.text} rx={2} />
    </svg>
  );
}
