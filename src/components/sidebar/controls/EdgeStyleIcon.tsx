export default function EdgeStyleIcon({ name, size = 16 }: { name: string; size?: number }) {
  const p = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {name === "sharp" && <rect x="4" y="4" width="16" height="16" {...p} />}
      {name === "round" && <rect x="4" y="4" width="16" height="16" rx="4" {...p} />}
    </svg>
  );
}
