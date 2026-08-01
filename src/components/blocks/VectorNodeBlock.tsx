import { memo, useMemo } from "react";
import type { DrawNode, ShapeNode } from "../../engine/types";
import { getFontFamilyCSS, DEFAULT_FONT } from "../../fonts";
import { getStrokePath } from "../../rendering/freehand";
import { computeDrawFillData } from "../../rendering/draw-fill";
import {
  getRoughRectPaths,
  getRoughEllipsePaths,
  getRoughDiamondPaths,
  getRoughLinePaths,
  getRoughArrowPaths,
  strokeStyleToDash,
  roundedRectRadius,
} from "../../rendering/rough-shapes";

/** Return black or white depending on which contrasts better with `hex`. */
export function contrastingTextColor(hex: string): string {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16) || 0;
  const g = parseInt(c.substring(2, 4), 16) || 0;
  const b = parseInt(c.substring(4, 6), 16) || 0;
  // Relative luminance (sRGB approximation)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.5 ? "#1e1e2e" : "#ffffff";
}

/**
 * Renders an individual draw or shape node as a positioned <svg> element
 * in the DOM layer, so it can share z-index stacking with content blocks.
 */
function VectorNodeBlock({ node, editingLabel }: { node: DrawNode | ShapeNode; editingLabel?: boolean }) {
  if (node.type === "draw") {
    const drawNode = node as DrawNode;
    if (drawNode.data.tool === "vector") {
      return <VectorBlock node={drawNode} />;
    }
    return <DrawBlock node={drawNode} />;
  }
  return <ShapeBlock node={node as ShapeNode} editingLabel={editingLabel} />;
}

export default memo(VectorNodeBlock);

const DrawBlock = memo(function DrawBlock({ node }: { node: DrawNode }) {
  const isDashed = node.data.strokeStyle === "dashed" || node.data.strokeStyle === "dotted";
  const dashArray = strokeStyleToDash(node.data.strokeStyle);

  const pathData = useMemo(
    () => isDashed ? null : getStrokePath(node.data.points, { size: node.data.strokeWidth }),
    [node.data.points, node.data.strokeWidth, isDashed]
  );

  // Simple polyline through points for the invisible hit area
  const hitAreaPath = useMemo(() => {
    const pts = node.data.points;
    if (!pts || pts.length === 0) return "";
    if (pts.length === 1) return `M${pts[0][0]},${pts[0][1]}L${pts[0][0]},${pts[0][1]}`;
    const d = [`M${pts[0][0]},${pts[0][1]}`];
    for (let i = 1; i < pts.length; i++) {
      d.push(`L${pts[i][0]},${pts[i][1]}`);
    }
    return d.join("");
  }, [node.data.points]);

  // For dashed/dotted strokes, build a smooth center-line path instead of the
  // filled outline (SVG strokeDasharray only works on stroked paths, not fills).
  const centerLinePath = useMemo(() => {
    if (!isDashed) return null;
    const pts = node.data.points;
    if (!pts || pts.length < 2) return "";
    const d: (string | number)[] = ["M", pts[0][0], pts[0][1]];
    for (let i = 1; i < pts.length; i++) {
      const [px, py] = pts[i];
      const [prevX, prevY] = pts[i - 1];
      d.push("Q", prevX, prevY, (prevX + px) / 2, (prevY + py) / 2);
    }
    const last = pts[pts.length - 1];
    d.push("L", last[0], last[1]);
    return d.join(" ");
  }, [node.data.points, isDashed]);

  // Build fill data for freehand paths (shared with the SVG exporter so exports
  // paint identically — see src/rendering/draw-fill.ts).
  const fillData = useMemo(
    () =>
      computeDrawFillData(
        node.data.points,
        node.data.fill,
        node.data.fillStyle,
        node.data.strokeWidth,
      ),
    [node.data.fill, node.data.fillStyle, node.data.points, node.data.strokeWidth]
  );

  const rawH = node.h === "auto" ? 0 : (node.h as number);
  const w = Number.isFinite(node.w) ? (node.w as number) : 0;
  const h = Number.isFinite(rawH) ? rawH : 0;
  // Add padding around the stroke so it doesn't clip at edges
  const strokeWidth = Number.isFinite(node.data.strokeWidth) ? node.data.strokeWidth : 0;
  const pad = strokeWidth * 4;

  return (
    <div
      style={{
        position: "absolute",
        left: node.x - pad,
        top: node.y - pad,
        width: w + pad * 2,
        height: h + pad * 2,
        zIndex: node.z,
        pointerEvents: "none",
        transform: node.rotation ? `rotate(${node.rotation}deg)` : undefined,
        transformOrigin: "center center",
      }}
    >
      <svg
        width={w + pad * 2}
        height={h + pad * 2}
        style={{ overflow: "visible" }}
      >
        <g transform={`translate(${pad}, ${pad})`} opacity={node.data.opacity ?? 1}>
          {/* Fill rendered first, behind the stroke */}
          {fillData?.kind === "solid" &&
            (fillData.regions
              ? fillData.regions.map((r, i) => (
                  <path
                    key={i}
                    d={r.pathD}
                    fill={fillData.fill}
                    stroke="none"
                  />
                ))
              : (
                <path d={fillData.d} fill={fillData.fill} stroke="none" />
              ))}
          {fillData?.kind === "rough" &&
            fillData.paths.map((p, i) => (
              <path
                key={i}
                d={p.d}
                stroke={p.stroke}
                strokeWidth={p.strokeWidth}
                fill={p.fill}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          {/* Stroke on top */}
          {isDashed ? (
            <path
              d={centerLinePath!}
              fill="none"
              stroke={node.data.color}
              strokeWidth={node.data.strokeWidth}
              strokeDasharray={dashArray?.map(v => v * Math.max(node.data.strokeWidth, 1)).join(" ")}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d={pathData!}
              fill={node.data.color}
            />
          )}
          {/* Invisible hit area — captures pointer events on the stroke path */}
          {hitAreaPath && (
            <path
              d={hitAreaPath}
              fill="none"
              stroke="transparent"
              strokeWidth={node.data.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              pointerEvents="stroke"
            />
          )}
        </g>
      </svg>
    </div>
  );
});

/** Clean vector polygon rendering for precise shapes (icons, logos). */
const VectorBlock = memo(function VectorBlock({ node }: { node: DrawNode }) {
  const rawH = node.h === "auto" ? 0 : (node.h as number);
  const w = Number.isFinite(node.w) ? (node.w as number) : 0;
  const h = Number.isFinite(rawH) ? rawH : 0;
  const strokeWidth = Number.isFinite(node.data.strokeWidth) ? node.data.strokeWidth : 0;
  const pad = strokeWidth * 2;

  const polyPath = useMemo(() => {
    const pts = node.data.points;
    if (!pts || pts.length === 0) return "";
    const d = [`M${pts[0][0]},${pts[0][1]}`];
    for (let i = 1; i < pts.length; i++) {
      d.push(`L${pts[i][0]},${pts[i][1]}`);
    }
    d.push("Z");
    return d.join("");
  }, [node.data.points]);

  const dashArray = strokeStyleToDash(node.data.strokeStyle);
  const dash = dashArray?.map((v) => v * Math.max(node.data.strokeWidth, 1)).join(" ");

  return (
    <div
      style={{
        position: "absolute",
        left: node.x - pad,
        top: node.y - pad,
        width: w + pad * 2,
        height: h + pad * 2,
        zIndex: node.z,
        pointerEvents: "none",
        transform: node.rotation ? `rotate(${node.rotation}deg)` : undefined,
        transformOrigin: "center center",
      }}
    >
      <svg
        width={w + pad * 2}
        height={h + pad * 2}
        style={{ overflow: "visible" }}
      >
        <g transform={`translate(${pad}, ${pad})`} opacity={node.data.opacity ?? 1}>
          <path
            d={polyPath}
            fill={node.data.fill || "none"}
            stroke={node.data.color}
            strokeWidth={node.data.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={dash}
          />
          {/* Invisible hit area */}
          <path
            d={polyPath}
            fill={node.data.fill ? "transparent" : "none"}
            stroke="transparent"
            strokeWidth={Math.max(node.data.strokeWidth, 8)}
            pointerEvents={node.data.fill ? "painted" : "stroke"}
          />
        </g>
      </svg>
    </div>
  );
});

const ShapeBlock = memo(function ShapeBlock({ node, editingLabel }: { node: ShapeNode; editingLabel?: boolean }) {
  const rawH = node.h === "auto" ? 100 : (node.h as number);
  const w = Number.isFinite(node.w) ? (node.w as number) : 0;
  const h = Number.isFinite(rawH) ? rawH : 100;
  const strokeWidth = Number.isFinite(node.data.strokeWidth) ? node.data.strokeWidth : 0;
  const pad = strokeWidth * 2;
  const dashArray = strokeStyleToDash(node.data.strokeStyle);

  // Get line/arrow endpoints (relative to node origin)
  const x1 = node.data.startPoint?.[0] ?? 0;
  const y1 = node.data.startPoint?.[1] ?? h / 2;
  const x2 = node.data.endPoint?.[0] ?? w;
  const y2 = node.data.endPoint?.[1] ?? h / 2;

  const paths = useMemo(() => {
    if (node.data.roughness === 0) return null;

    const opts = {
      stroke: node.data.stroke,
      fill: node.data.fill,
      fillStyle: node.data.fillStyle,
      roughness: node.data.roughness,
      strokeWidth: node.data.strokeWidth,
      strokeLineDash: dashArray,
      seed: node.id,
    };

    const isRounded = node.data.edgeStyle === "round";
    switch (node.data.shape) {
      case "rect":
        return getRoughRectPaths(0, 0, w, h, opts, isRounded);
      case "ellipse":
        return getRoughEllipsePaths(w / 2, h / 2, w, h, opts);
      case "diamond":
        return getRoughDiamondPaths(0, 0, w, h, opts, isRounded);
      case "line":
        return getRoughLinePaths(x1, y1, x2, y2, opts);
      case "arrow":
        return getRoughArrowPaths(x1, y1, x2, y2, opts);
      default:
        return null;
    }
  }, [node, dashArray, x1, y1, x2, y2, w, h]);

  // For solid fill + roughness > 0, use clean geometry behind rough stroke
  // to avoid fill-stroke boundary misalignment from independent randomization.
  const solidFillBehind =
    node.data.fill &&
    node.data.fillStyle === "solid" &&
    node.data.roughness > 0;

  const opacity = node.data.opacity ?? 1;
  const isLinear = node.data.shape === "line" || node.data.shape === "arrow";
  const label = node.data.label;
  const labelFontSize = node.data.labelFontSize ?? 14;

  return (
    <div
      // Search highlighting scans the DOM under [data-node-id] — own-layout
      // types must carry it themselves so shape LABELS get match rects.
      data-node-id={node.id}
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: w,
        height: h,
        zIndex: node.z,
        pointerEvents: "none",
        overflow: "visible",
        transform: node.rotation ? `rotate(${node.rotation}deg)` : undefined,
        transformOrigin: "center center",
      }}
    >
      <svg
        width={w + pad * 2}
        height={h + pad * 2}
        style={{ overflow: "visible", marginLeft: -pad, marginTop: -pad }}
      >
        <g transform={`translate(${pad}, ${pad})`} opacity={opacity}>
          {solidFillBehind && (
            <CleanShapeFill
              shape={node.data.shape}
              w={w}
              h={h}
              fill={node.data.fill!}
              rounded={node.data.edgeStyle === "round"}
            />
          )}
          {paths ? (
            paths.map((p, i) => {
              // Skip RoughJS's own fillPath when using clean geometry fill
              if (solidFillBehind && p.fill && p.fill !== "none") return null;
              return (
                <path
                  key={i}
                  d={p.d}
                  stroke={p.stroke}
                  strokeWidth={p.strokeWidth}
                  fill={p.fill}
                  strokeDasharray={p.strokeDasharray}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })
          ) : (
            <CleanShape
              shape={node.data.shape}
              w={w}
              h={h}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={node.data.stroke}
              fill={node.data.fill}
              strokeWidth={node.data.strokeWidth}
              dashArray={dashArray}
              rounded={node.data.edgeStyle === "round"}
            />
          )}
          {/* Invisible hit area — captures pointer events on the shape geometry */}
          <ShapeHitArea
            shape={node.data.shape}
            w={w}
            h={h}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            hasFill={!!node.data.fill}
            strokeWidth={node.data.strokeWidth}
            rounded={node.data.edgeStyle === "round"}
          />
        </g>
      </svg>
      {/* Static label (read-only) — hidden during editing to avoid overlap */}
      {!isLinear && label && !editingLabel && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            padding: "4px 8px",
          }}
        >
          <div
            style={{
              textAlign: node.data.labelAlign ?? "center",
              fontFamily: getFontFamilyCSS(node.data.labelFontFamily ?? DEFAULT_FONT),
              fontSize: labelFontSize,
              color: node.data.fill && node.data.fillStyle === "solid"
                ? contrastingTextColor(node.data.fill)
                : node.data.stroke,
              lineHeight: 1.3,
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              width: "100%",
            }}
          >
            {label}
          </div>
        </div>
      )}
    </div>
  );
});

/** Build a rounded diamond SVG path for clean rendering (roughness=0). */
function cleanRoundedDiamondPath(w: number, h: number): string {
  const r = roundedRectRadius(w, h);
  const cx = w / 2;
  const cy = h / 2;
  const T: [number, number] = [cx, 0];
  const R: [number, number] = [w, cy];
  const B: [number, number] = [cx, h];
  const L: [number, number] = [0, cy];
  const edgeLen = Math.hypot(w / 2, h / 2);
  const t = Math.min(r, edgeLen / 2) / edgeLen;
  const lerp = (a: [number, number], b: [number, number], f: number): [number, number] => [
    a[0] + f * (b[0] - a[0]),
    a[1] + f * (b[1] - a[1]),
  ];
  const T_out = lerp(T, R, t);
  const R_in = lerp(T, R, 1 - t);
  const R_out = lerp(R, B, t);
  const B_in = lerp(R, B, 1 - t);
  const B_out = lerp(B, L, t);
  const L_in = lerp(B, L, 1 - t);
  const L_out = lerp(L, T, t);
  const T_in = lerp(L, T, 1 - t);
  return [
    `M${T_out[0]},${T_out[1]}`,
    `L${R_in[0]},${R_in[1]}`,
    `Q${R[0]},${R[1]} ${R_out[0]},${R_out[1]}`,
    `L${B_in[0]},${B_in[1]}`,
    `Q${B[0]},${B[1]} ${B_out[0]},${B_out[1]}`,
    `L${L_in[0]},${L_in[1]}`,
    `Q${L[0]},${L[1]} ${L_out[0]},${L_out[1]}`,
    `L${T_in[0]},${T_in[1]}`,
    `Q${T[0]},${T[1]} ${T_out[0]},${T_out[1]}`,
    "Z",
  ].join(" ");
}

/** Clean SVG fallback when roughness === 0 */
function CleanShape({
  shape,
  w,
  h,
  x1,
  y1,
  x2,
  y2,
  stroke,
  fill,
  strokeWidth,
  dashArray,
  rounded,
}: {
  shape: ShapeNode["data"]["shape"];
  w: number;
  h: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  fill?: string;
  strokeWidth: number;
  dashArray?: number[];
  rounded?: boolean;
}) {
  const dash = dashArray?.join(",");

  switch (shape) {
    case "rect": {
      // Thin, unfilled rectangles visually collapse into "hollow pills" at low zoom.
      // Render them as center lines so legacy Mermaid self-loop helper segments
      // stay visible and crisp regardless of import version.
      const hasFill = !!fill && fill !== "none";
      const isThinH = h <= Math.max(strokeWidth * 2, 4);
      const isThinW = w <= Math.max(strokeWidth * 2, 4);
      if (!hasFill && (isThinH || isThinW)) {
        if (isThinH && w >= h) {
          return (
            <line
              x1={0}
              y1={h / 2}
              x2={w}
              y2={h / 2}
              stroke={stroke}
              strokeWidth={Math.max(strokeWidth, h)}
              strokeDasharray={dash}
            />
          );
        }
        return (
          <line
            x1={w / 2}
            y1={0}
            x2={w / 2}
            y2={h}
            stroke={stroke}
            strokeWidth={Math.max(strokeWidth, w)}
            strokeDasharray={dash}
          />
        );
      }

      const r = rounded ? roundedRectRadius(w, h) : 0;
      return (
        <rect
          x={0}
          y={0}
          width={w}
          height={h}
          rx={r || undefined}
          ry={r || undefined}
          stroke={stroke}
          fill={fill || "none"}
          strokeWidth={strokeWidth}
          strokeDasharray={dash}
        />
      );
    }
    case "ellipse":
      return (
        <ellipse
          cx={w / 2}
          cy={h / 2}
          rx={w / 2}
          ry={h / 2}
          stroke={stroke}
          fill={fill || "none"}
          strokeWidth={strokeWidth}
          strokeDasharray={dash}
        />
      );
    case "diamond":
      return rounded ? (
        <path
          d={cleanRoundedDiamondPath(w, h)}
          stroke={stroke}
          fill={fill || "none"}
          strokeWidth={strokeWidth}
          strokeDasharray={dash}
        />
      ) : (
        <polygon
          points={`${w / 2},0 ${w},${h / 2} ${w / 2},${h} 0,${h / 2}`}
          stroke={stroke}
          fill={fill || "none"}
          strokeWidth={strokeWidth}
          strokeDasharray={dash}
        />
      );
    case "line":
      return (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={dash}
        />
      );
    case "arrow": {
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const headLen = Math.max(12, strokeWidth * 4);
      const headAngle = Math.PI / 6;
      const ax = x2 - headLen * Math.cos(angle - headAngle);
      const ay = y2 - headLen * Math.sin(angle - headAngle);
      const bx = x2 - headLen * Math.cos(angle + headAngle);
      const by = y2 - headLen * Math.sin(angle + headAngle);
      return (
        <>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={dash}
          />
          <polyline
            points={`${ax},${ay} ${x2},${y2} ${bx},${by}`}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="none"
          />
        </>
      );
    }
    default:
      return null;
  }
}

/** Transparent hit area for shapes — captures pointer events on geometry only */
function ShapeHitArea({
  shape,
  w,
  h,
  x1,
  y1,
  x2,
  y2,
  hasFill,
  strokeWidth,
  rounded,
}: {
  shape: ShapeNode["data"]["shape"];
  w: number;
  h: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  hasFill: boolean;
  strokeWidth: number;
  rounded?: boolean;
}) {
  // "painted" fires on fill+stroke areas; "stroke" fires on stroke area only
  const pe = hasFill ? "painted" : "stroke";
  const fill = hasFill ? "transparent" : "none";

  switch (shape) {
    case "rect": {
      const r = rounded ? roundedRectRadius(w, h) : 0;
      return (
        <rect
          x={0} y={0} width={w} height={h}
          rx={r || undefined} ry={r || undefined}
          fill={fill} stroke="transparent" strokeWidth={strokeWidth}
          pointerEvents={pe}
        />
      );
    }
    case "ellipse":
      return (
        <ellipse
          cx={w / 2} cy={h / 2} rx={w / 2} ry={h / 2}
          fill={fill} stroke="transparent" strokeWidth={strokeWidth}
          pointerEvents={pe}
        />
      );
    case "diamond":
      return rounded ? (
        <path
          d={cleanRoundedDiamondPath(w, h)}
          fill={fill} stroke="transparent" strokeWidth={strokeWidth}
          pointerEvents={pe}
        />
      ) : (
        <polygon
          points={`${w / 2},0 ${w},${h / 2} ${w / 2},${h} 0,${h / 2}`}
          fill={fill} stroke="transparent" strokeWidth={strokeWidth}
          pointerEvents={pe}
        />
      );
    case "line":
    case "arrow":
      return (
        <line
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="transparent" strokeWidth={strokeWidth}
          pointerEvents="stroke"
        />
      );
    default:
      return null;
  }
}

/** Clean geometric fill rendered behind rough strokes to avoid misalignment */
function CleanShapeFill({
  shape,
  w,
  h,
  fill,
  rounded,
}: {
  shape: ShapeNode["data"]["shape"];
  w: number;
  h: number;
  fill: string;
  rounded?: boolean;
}) {
  switch (shape) {
    case "rect": {
      const r = rounded ? roundedRectRadius(w, h) : 0;
      return <rect x={0} y={0} width={w} height={h} rx={r || undefined} ry={r || undefined} fill={fill} stroke="none" />;
    }
    case "ellipse":
      return <ellipse cx={w / 2} cy={h / 2} rx={w / 2} ry={h / 2} fill={fill} stroke="none" />;
    case "diamond":
      return rounded ? (
        <path
          d={cleanRoundedDiamondPath(w, h)}
          fill={fill}
          stroke="none"
        />
      ) : (
        <polygon
          points={`${w / 2},0 ${w},${h / 2} ${w / 2},${h} 0,${h / 2}`}
          fill={fill}
          stroke="none"
        />
      );
    default:
      return null;
  }
}
