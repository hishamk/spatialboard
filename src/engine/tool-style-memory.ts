import type { ActiveTool } from "./types";

/**
 * "Current item defaults" (the Excalidraw behavior): styling a node from the
 * inspector becomes the default for the NEXT node of that type. Creation
 * paths read `engine.activeTool`, so remembering an inspector patch there is
 * all it takes — without this, every new text node reverted to the stock
 * font/size/color no matter what the user last chose.
 *
 * Only the whitelisted style keys are remembered; content and geometry keys
 * in a patch (text, points, crop, …) are ignored.
 */
const STYLE_MAPS: Record<string, Record<string, keyof ActiveTool>> = {
  text: {
    fontSize: "fontSize",
    fontFamily: "fontFamily",
    color: "color",
    align: "textAlign",
    opacity: "opacity",
  },
  draw: {
    tool: "tool",
    color: "color",
    strokeWidth: "width",
    strokeStyle: "strokeStyle",
    fill: "fillColor",
    fillStyle: "fillStyle",
    opacity: "opacity",
  },
  shape: {
    stroke: "color",
    strokeWidth: "width",
    strokeStyle: "strokeStyle",
    fill: "fillColor",
    fillStyle: "fillStyle",
    roughness: "roughness",
    opacity: "opacity",
    shape: "shapeType",
    edgeStyle: "edgeStyle",
  },
  sticky: {
    color: "stickyColor",
    fontSize: "stickyFontSize",
    opacity: "opacity",
  },
  edge: {
    color: "color",
    strokeWidth: "width",
    style: "strokeStyle",
    edgeType: "edgeType",
    arrowHead: "arrowHead",
    arrowTail: "arrowTail",
    attachmentGap: "attachmentGap",
    roughness: "roughness",
  },
};

/** Merge the style keys of an inspector patch into the tool defaults. */
export function rememberToolStyle(
  activeTool: ActiveTool,
  nodeType: string,
  patch: Record<string, unknown>,
): void {
  const map = STYLE_MAPS[nodeType];
  if (!map) return;
  for (const [dataKey, toolKey] of Object.entries(map)) {
    if (!(dataKey in patch)) continue;
    const value = patch[dataKey];
    // "no fill" arrives as null — store as undefined so creation defaults
    // (`?? fallback`) keep working.
    (activeTool as unknown as Record<string, unknown>)[toolKey] = value === null ? undefined : value;
  }
}
