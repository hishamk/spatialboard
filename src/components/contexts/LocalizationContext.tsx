import { createContext, useContext, useMemo } from "react";

export type SpatialBoardDirection = "ltr" | "rtl" | "auto";

/** One custom node’s inspector help; keyed by `NodeTypeDefinition.docs.id` or node `type`. */
export interface CustomNodeDocEntry {
  title?: string;
  body: string;
}

export interface SpatialBoardLocalization {
  inspectorTitle: string;
  autoHide: string;
  popOut: string;
  dockIn: string;
  performanceTitle: string;
  perfVirtualization: string;
  perfOn: string;
  perfOff: string;
  perfFps: string;
  perfFrameP50P95: string;
  perfCullingP50P95: string;
  perfHitTestP50P95: string;
  perfEdgeHitP50P95: string;
  perfHitTestCalls: string;
  perfEdgeHitCalls: string;
  perfVisibleNodes: string;
  perfVisibleEdges: string;
  perfSeedVisibleNodes: string;
  perfNodesAdjacency: string;
  perfNodesEdgeEndpoints: string;
  perfEdgesAdjacency: string;
  perfEdgesCrossing: string;
  zoomOut: string;
  zoomIn: string;
  resetZoom: string;
  fitToContent: string;
  saveOriginView: string;
  clearOriginView: string;
  goToOriginView: string;
  presentSlides: string;
  toggleSlidesPanel: string;
  /** pill shown on the canvas when the host passes `readOnly`. */
  viewOnly: string;
  togglePerformanceOverlay: string;
  canvasSearchPlaceholder: string;
  canvasSearchOpen: string;
  canvasSearchPrev: string;
  canvasSearchNext: string;
  canvasSearchClose: string;
  /** Minimap overlay (overview + viewport; click/drag to pan) */
  minimapTitle: string;
  toggleMinimap: string;
  undo: string;
  redo: string;
  slidesTitle: string;
  closeSlidesPanel: string;
  noFramesYet: string;
  inspectorNoSelection: string;
  inspectorToolSuffix: string;
  inspectorShared: string;
  inspectorCanvas: string;
  inspectorStructure: string;
  inspectorTypography: string;
  inspectorAppearance: string;
  inspectorSketch: string;
  inspectorActions: string;
  inspectorStack: string;
  inspectorOn: string;
  inspectorOff: string;
  inspectorMixed: string;
  inspectorGrid: string;
  inspectorGridSize: string;
  inspectorGuides: string;
  inspectorPaper: string;
  inspectorRotation: string;
  inspectorOpacity: string;
  inspectorStroke: string;
  inspectorBorder: string;
  inspectorStyle: string;
  inspectorWidth: string;
  inspectorFill: string;
  inspectorFillPattern: string;
  inspectorStrokeStyle: string;
  inspectorStrokeWidth: string;
  inspectorShape: string;
  inspectorEdges: string;
  inspectorLabel: string;
  inspectorFont: string;
  inspectorSize: string;
  inspectorAlign: string;
  inspectorRoughness: string;
  inspectorBrush: string;
  brushPen: string;
  brushAirbrush: string;
  consoleTools: string;
  consoleSelection: string;
  consoleObjects: string;
  consoleObject: string;
  consoleAll: string;
  consoleFilterHint: string;
  consoleGroup: string;
  consoleMore: string;
  consoleProperties: string;
  consoleUndo: string;
  consoleStack: string;
  consoleRedo: string;
  consoleEmptyHint: string;
  consoleView: string;
  consoleSlides: string;
  consoleFit: string;
  consolePlay: string;
  consolePrevSlide: string;
  consoleNextSlide: string;
  consoleCollapse: string;
  consoleExpand: string;
  inspectorCrop: string;
  inspectorReset: string;
  inspectorBackground: string;
  inspectorNone: string;
  inspectorSwitchPalette: string;
  paletteStandard: string;
  edgeLineSection: string;
  edgeColor: string;
  edgeArrowsSection: string;
  edgeHead: string;
  edgeHeadSize: string;
  edgeTail: string;
  edgeTailSize: string;
  edgePathMotionSection: string;
  edgePath: string;
  edgeBezier: string;
  edgeStraight: string;
  edgeSmooth: string;
  edgeStep: string;
  edgeAnimate: string;
  edgeDirection: string;
  /** Shown when edge uses ports — animation follows data flow only */
  edgeAnimationPortHint: string;
  edgeText: string;
  edgeLabelPlaceholder: string;
  frameLabelPlaceholder: string;
  frameDevice: string;
  frameFreeform: string;
  frameSlideNumber: string;
  frameAuto: string;
  frameTransition: string;
  frameDuration: string;
  frameMilliseconds: string;
  transitionPan: string;
  transitionFadeToBlack: string;
  transitionDissolve: string;
  transitionZoom: string;
  transitionFold: string;
  transitionCube: string;
  transitionNoneInstant: string;
  deviceGroupPhones: string;
  deviceGroupPhonesLandscape: string;
  deviceGroupTablets: string;
  deviceGroupTabletsLandscape: string;
  deviceGroupDevices: string;
  deviceGroupStandard: string;
  paperType: string;
  paperGroupLight: string;
  paperGroupDark: string;
  paperGroupTextured: string;
  paperWhite: string;
  paperCream: string;
  paperWarm: string;
  paperBlueprint: string;
  paperNight: string;
  paperJapaneseStationery: string;
  paperKraftPaper: string;
  templatesTitle: string;
  librariesTitle: string;
  librariesSearchPlaceholder: string;
  librariesNoMatchingItems: string;
  librariesNoLibrariesInstalled: string;
  librariesImportHint: string;
  librariesBrowseHint: string;
  librariesImportFile: string;
  librariesBrowseLibraries: string;
  librariesUninstall: string;
  librariesPersonal: string;
  librariesUntitled: string;
  librariesRemoveFromPersonal: string;
  libraryDirectoryTitle: string;
  libraryDirectorySearchPlaceholder: string;
  libraryDirectoryLoading: string;
  libraryDirectoryFailedPrefix: string;
  libraryDirectoryNoMatches: string;
  libraryDirectoryLibrariesCountSuffix: string;
  libraryDirectoryPoweredBy: string;
  libraryDirectoryBy: string;
  libraryDirectoryInstalled: string;
  libraryDirectoryInstalling: string;
  libraryDirectoryInstall: string;
  gifSearchTitle: string;
  gifPanelTitle: string;
  gifSearchPlaceholder: string;
  gifNoResults: string;
  gifLoading: string;
  gifPoweredBy: string;
  mermaidSketchTitle: string;
  mermaidSupportedHint: string;
  mermaidNoNodesParsed: string;
  mermaidInsertedSummary: string;
  mermaidParseFailed: string;
  mermaidResetExample: string;
  mermaidInsertDiagram: string;
  toolSelect: string;
  toolHand: string;
  toolDraw: string;
  toolShape: string;
  toolText: string;
  toolNote: string;
  toolSticky: string;
  toolFrame: string;
  toolEdge: string;
  toolEraser: string;
  toolLaser: string;
  toolLassoSelect: string;
  toolTextGlyph: string;
  moreTools: string;
  close: string;
  actionDownloadImage: string;
  roughnessArchitect: string;
  roughnessArtist: string;
  roughnessCartoonist: string;
  actionCut: string;
  actionCopy: string;
  actionPaste: string;
  actionDuplicate: string;
  /** Multi-select: auto-layout (DAG layers + barycenter, or tidy grid). */
  actionArrangeSelection: string;
  /** Bottom bar: auto-layout the whole board (no selection required). */
  actionArrangeBoard: string;
  /** Context menu: alignment subsection titles */
  alignMenuHorizontal: string;
  alignMenuVertical: string;
  alignLeft: string;
  alignCenterHorizontal: string;
  alignRight: string;
  alignTop: string;
  alignCenterVertical: string;
  alignBottom: string;
  alignDistributeHorizontal: string;
  alignDistributeVertical: string;
  actionAddToPersonalLibrary: string;
  actionGroupSelection: string;
  actionUngroupSelection: string;
  actionFlipHorizontal: string;
  actionFlipVertical: string;
  actionBringForward: string;
  actionSendBackward: string;
  actionBringToFront: string;
  actionSendToBack: string;
  actionLock: string;
  actionUnlock: string;
  actionDelete: string;
  actionToggleGrid: string;
  actionSmartGuides: string;
  actionExportAsPng: string;
  actionExportAsSvg: string;
  actionExportFrameAsPng: string;
  actionExportFrameAsSvg: string;
  typeShape: string;
  typeDrawing: string;
  typeText: string;
  typeEdge: string;
  typeImage: string;
  typeContent: string;
  typeFrame: string;
  typeStickyNote: string;
  typeYouTube: string;
  /** Expand/collapse control for custom-node inspector help (?). */
  inspectorNodeHelpShow: string;
  inspectorNodeHelpHide: string;
  /**
   * Inspector help for registered custom node types. Keys match each node’s `type`
   * string, or `docs.id` when set. Merge with defaults: `{ ...DEFAULT_SB_LOCALIZATION.customNodeDocs, ...yours }`.
   */
  customNodeDocs: Record<string, CustomNodeDocEntry>;
}

export const DEFAULT_LOCALIZATION: SpatialBoardLocalization = {
  inspectorTitle: "Inspector",
  autoHide: "Auto-hide",
  popOut: "Pop out",
  dockIn: "Dock back into the canvas",
  performanceTitle: "Performance",
  perfVirtualization: "Virtualization",
  perfOn: "on",
  perfOff: "off",
  perfFps: "FPS",
  perfFrameP50P95: "Frame (p50/p95)",
  perfCullingP50P95: "Culling (p50/p95)",
  perfHitTestP50P95: "Hit-test (p50/p95)",
  perfEdgeHitP50P95: "Edge-hit (p50/p95)",
  perfHitTestCalls: "Hit-test calls/s",
  perfEdgeHitCalls: "Edge-hit calls/s",
  perfVisibleNodes: "Visible nodes",
  perfVisibleEdges: "Visible edges",
  perfSeedVisibleNodes: "Seed visible nodes",
  perfNodesAdjacency: "Nodes +adjacency",
  perfNodesEdgeEndpoints: "Nodes +edge-endpoints",
  perfEdgesAdjacency: "Edges +adjacency",
  perfEdgesCrossing: "Edges +crossing",
  zoomOut: "Zoom out",
  zoomIn: "Zoom in",
  resetZoom: "Reset zoom to 100%",
  fitToContent: "Fit to content (Ctrl+0)",
  saveOriginView: "Save current view as origin",
  clearOriginView: "Clear saved view",
  goToOriginView: "Go to saved view",
  presentSlides: "Present (frames as slides)",
  toggleSlidesPanel: "Toggle slides panel",
  viewOnly: "View only",
  togglePerformanceOverlay: "Toggle performance overlay",
  canvasSearchPlaceholder: "Search canvas...",
  canvasSearchOpen: "Search (Ctrl+F)",
  canvasSearchPrev: "Previous match",
  canvasSearchNext: "Next match",
  canvasSearchClose: "Close search",
  minimapTitle: "Minimap — click or drag to pan the canvas",
  toggleMinimap: "Toggle minimap",
  undo: "Undo (Ctrl+Z)",
  redo: "Redo (Ctrl+Shift+Z)",
  slidesTitle: "Slides",
  closeSlidesPanel: "Close slides panel",
  noFramesYet: "No frames yet. Use the Frame tool (F) to create slides.",
  inspectorNoSelection: "No selection",
  inspectorToolSuffix: "tool",
  inspectorShared: "Shared",
  inspectorCanvas: "Canvas",
  inspectorStructure: "Structure",
  inspectorTypography: "Typography",
  inspectorAppearance: "Appearance",
  inspectorSketch: "Sketch",
  inspectorActions: "Actions",
  inspectorStack: "Stack",
  inspectorOn: "On",
  inspectorOff: "Off",
  inspectorMixed: "Mixed",
  inspectorGrid: "Grid",
  inspectorGridSize: "Grid size",
  inspectorGuides: "Guides",
  inspectorPaper: "Paper",
  inspectorRotation: "Rotation",
  inspectorOpacity: "Opacity",
  inspectorStroke: "Stroke",
  inspectorBorder: "Border",
  inspectorStyle: "Style",
  inspectorWidth: "Width",
  inspectorFill: "Fill",
  inspectorFillPattern: "Fill pattern",
  inspectorStrokeStyle: "Stroke style",
  inspectorStrokeWidth: "Stroke width",
  inspectorShape: "Shape",
  inspectorEdges: "Edges",
  inspectorLabel: "Label",
  inspectorFont: "Font",
  inspectorSize: "Size",
  inspectorAlign: "Align",
  inspectorRoughness: "Roughness",
  inspectorBrush: "Brush",
  brushPen: "Pen",
  brushAirbrush: "Airbrush",
  consoleTools: "Tools",
  consoleSelection: "Selection",
  consoleObjects: "objects",
  consoleObject: "object",
  consoleAll: "All",
  consoleFilterHint: "Keep only this type selected",
  consoleGroup: "Group",
  consoleMore: "More…",
  consoleProperties: "Properties",
  consoleUndo: "Undo",
  consoleStack: "Stack",
  consoleRedo: "Redo",
  consoleEmptyHint: "Select objects to edit them here",
  consoleView: "View",
  consoleSlides: "Slides",
  consoleFit: "FIT",
  consolePlay: "PLAY",
  consolePrevSlide: "Previous frame",
  consoleNextSlide: "Next frame",
  consoleCollapse: "Collapse panel",
  consoleExpand: "Expand panel",
  inspectorCrop: "Crop",
  inspectorReset: "Reset",
  inspectorBackground: "Background",
  inspectorNone: "None",
  inspectorSwitchPalette: "Switch palette",
  paletteStandard: "Standard",
  edgeLineSection: "Line",
  edgeColor: "Color",
  edgeArrowsSection: "Arrows",
  edgeHead: "Head",
  edgeHeadSize: "Head size",
  edgeTail: "Tail",
  edgeTailSize: "Tail size",
  edgePathMotionSection: "Path & Motion",
  edgePath: "Path",
  edgeBezier: "Bezier",
  edgeStraight: "Straight",
  edgeSmooth: "Smooth",
  edgeStep: "Step",
  edgeAnimate: "Animate",
  edgeDirection: "Direction",
  edgeAnimationPortHint: "Port links follow output → input",
  edgeText: "Text",
  edgeLabelPlaceholder: "Edge label...",
  frameLabelPlaceholder: "Frame label...",
  frameDevice: "Device",
  frameFreeform: "Freeform",
  frameSlideNumber: "Slide #",
  frameAuto: "Auto",
  frameTransition: "Transition",
  frameDuration: "Duration",
  frameMilliseconds: "ms",
  transitionPan: "Pan",
  transitionFadeToBlack: "Fade to Black",
  transitionDissolve: "Dissolve",
  transitionZoom: "Zoom",
  transitionFold: "Fold",
  transitionCube: "Cube",
  transitionNoneInstant: "None (instant)",
  deviceGroupPhones: "Phones",
  deviceGroupPhonesLandscape: "Phones (Landscape)",
  deviceGroupTablets: "Tablets",
  deviceGroupTabletsLandscape: "Tablets (Landscape)",
  deviceGroupDevices: "Devices",
  deviceGroupStandard: "Standard",
  paperType: "Paper type",
  paperGroupLight: "Light",
  paperGroupDark: "Dark",
  paperGroupTextured: "Textured",
  paperWhite: "White",
  paperCream: "Cream",
  paperWarm: "Warm",
  paperBlueprint: "Blueprint",
  paperNight: "Night",
  paperJapaneseStationery: "Japanese Stationery",
  paperKraftPaper: "Kraft Paper",
  templatesTitle: "Templates",
  librariesTitle: "Libraries",
  librariesSearchPlaceholder: "Search library...",
  librariesNoMatchingItems: "No matching items",
  librariesNoLibrariesInstalled: "No libraries installed.",
  librariesImportHint: "Import an .excalidrawlib file",
  librariesBrowseHint: "or browse the community directory.",
  librariesImportFile: "Import file",
  librariesBrowseLibraries: "Browse libraries",
  librariesUninstall: "Uninstall library",
  librariesPersonal: "Personal",
  librariesUntitled: "Untitled",
  librariesRemoveFromPersonal: "Remove from Personal Library",
  libraryDirectoryTitle: "Excalidraw Libraries",
  libraryDirectorySearchPlaceholder: "Search libraries...",
  libraryDirectoryLoading: "Loading libraries...",
  libraryDirectoryFailedPrefix: "Failed to load directory",
  libraryDirectoryNoMatches: "No libraries match your search.",
  libraryDirectoryLibrariesCountSuffix: "libraries",
  libraryDirectoryPoweredBy: "Powered by Excalidraw Libraries",
  libraryDirectoryBy: "by",
  libraryDirectoryInstalled: "Installed",
  libraryDirectoryInstalling: "Installing...",
  libraryDirectoryInstall: "Install",
  gifSearchTitle: "GIF Search",
  gifPanelTitle: "GIFs",
  gifSearchPlaceholder: "Search KLIPY",
  gifNoResults: "No results",
  gifLoading: "Loading...",
  gifPoweredBy: "Powered by KLIPY",
  mermaidSketchTitle: "Mermaid Sketch",
  mermaidSupportedHint:
    "Supported: flowchart/graph (TB/BT/LR/RL) and sequenceDiagram. Flowchart nodes: A[Text], A{Decision}, A((Start)). Edges: A-->B, A -- label --> B.",
  mermaidNoNodesParsed: "No nodes were parsed.",
  mermaidInsertedSummary: "Inserted {nodes} nodes and {edges} edges.",
  mermaidParseFailed: "Failed to parse Mermaid graph.",
  mermaidResetExample: "Reset Example",
  mermaidInsertDiagram: "Insert Diagram",
  toolSelect: "Select",
  toolHand: "Hand",
  toolDraw: "Draw",
  toolShape: "Shape",
  toolText: "Text",
  toolNote: "Note",
  toolSticky: "Sticky",
  toolFrame: "Frame",
  toolEdge: "Connector",
  toolEraser: "Eraser",
  toolLaser: "Laser",
  toolLassoSelect: "Lasso Select",
  toolTextGlyph: "T",
  moreTools: "More tools",
  close: "Close",
  actionDownloadImage: "Download image",
  roughnessArchitect: "Architect",
  roughnessArtist: "Artist",
  roughnessCartoonist: "Cartoonist",
  actionCut: "Cut",
  actionCopy: "Copy",
  actionPaste: "Paste",
  actionDuplicate: "Duplicate",
  actionArrangeSelection: "Smart arrange",
  actionArrangeBoard: "Smart arrange board",
  alignMenuHorizontal: "Horizontal",
  alignMenuVertical: "Vertical",
  alignLeft: "Align left edges",
  alignCenterHorizontal: "Align horizontal centers",
  alignRight: "Align right edges",
  alignTop: "Align top edges",
  alignCenterVertical: "Align vertical centers",
  alignBottom: "Align bottom edges",
  alignDistributeHorizontal: "Spread horizontally (equal spacing)",
  alignDistributeVertical: "Spread vertically (equal spacing)",
  actionAddToPersonalLibrary: "Add to Personal Library",
  actionGroupSelection: "Group selection",
  actionUngroupSelection: "Ungroup selection",
  actionFlipHorizontal: "Flip horizontal",
  actionFlipVertical: "Flip vertical",
  actionBringForward: "Bring forward",
  actionSendBackward: "Send backward",
  actionBringToFront: "Bring to front",
  actionSendToBack: "Send to back",
  actionLock: "Lock",
  actionUnlock: "Unlock",
  actionDelete: "Delete",
  actionToggleGrid: "Toggle Grid",
  actionSmartGuides: "Smart Guides",
  actionExportAsPng: "Export as PNG",
  actionExportAsSvg: "Export as SVG",
  actionExportFrameAsPng: "Export frame as PNG",
  actionExportFrameAsSvg: "Export frame as SVG",
  typeShape: "Shape",
  typeDrawing: "Drawing",
  typeText: "Text",
  typeEdge: "Edge",
  typeImage: "Image",
  typeContent: "Content",
  typeFrame: "Frame",
  typeStickyNote: "Sticky Note",
  typeYouTube: "YouTube",
  inspectorNodeHelpShow: "Show node help",
  inspectorNodeHelpHide: "Hide node help",
  customNodeDocs: {},
};

export interface SBLocalizationContextValue {
  dir: "ltr" | "rtl";
  isRTL: boolean;
  labels: SpatialBoardLocalization;
}

export const SBLocalizationContext = createContext<SBLocalizationContextValue>({
  dir: "ltr",
  isRTL: false,
  labels: DEFAULT_LOCALIZATION,
});

export function resolveDirection(direction: SpatialBoardDirection | undefined): "ltr" | "rtl" {
  if (direction === "rtl" || direction === "ltr") return direction;
  if (typeof document !== "undefined") {
    const docDir = document.dir?.toLowerCase();
    if (docDir === "rtl") return "rtl";
  }
  return "ltr";
}

export function useSBLocalizationValue(
  direction?: SpatialBoardDirection,
  localization?: Partial<SpatialBoardLocalization>,
): SBLocalizationContextValue {
  return useMemo(() => {
    const dir = resolveDirection(direction);
    const { customNodeDocs: locCustomDocs, ...locRest } = localization ?? {};
    return {
      dir,
      isRTL: dir === "rtl",
      labels: {
        ...DEFAULT_LOCALIZATION,
        ...locRest,
        customNodeDocs: {
          ...DEFAULT_LOCALIZATION.customNodeDocs,
          ...(locCustomDocs ?? {}),
        },
      },
    };
  }, [direction, localization]);
}

export function useSBI18n() {
  return useContext(SBLocalizationContext);
}
