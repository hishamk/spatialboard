import { SpatialEngine } from "../engine/SpatialEngine";
import type { DebugBoardEntry } from "./DebugPanel";
import type { NodeTypeDefinition } from "../nodes/registry";
import type { SpatialBoardTheme } from "./sidebar/ThemeContext";
export interface SpatialBoardProps {
    /** Node type definitions. Defaults to all built-in types. */
    nodeTypes?: NodeTypeDefinition<any>[];
    /** Provide your own engine instance (advanced usage). */
    engine?: SpatialEngine;
    /** Enable keyboard shortcuts. Default: true. */
    keyboardShortcuts?: boolean;
    /** Container style overrides. */
    style?: React.CSSProperties;
    /** Initial SBD data to load. */
    initialData?: string;
    /** Show sidebar (tools + properties). Default: true. */
    toolbar?: boolean;
    /** @deprecated Properties are now part of the sidebar. This prop is ignored. */
    propertiesPanel?: boolean;
    /** Show debug panel. Default: false. */
    debugPanel?: boolean;
    /** Extra board loaders for the debug panel. */
    debugBoards?: DebugBoardEntry[];
    /** Theme overrides for sidebar and properties panel UI. */
    theme?: Partial<SpatialBoardTheme>;
    /** Callback fired when presentation mode is entered or exited. */
    onPresentationChange?: (presenting: boolean) => void;
    /** Base URL for GIF search API proxy (e.g. "/api/v1/gifs"). */
    gifApiBaseUrl?: string;
}
export default function SpatialBoard({ nodeTypes, engine: externalEngine, keyboardShortcuts, style, initialData, toolbar: showSidebar, debugPanel: showDebugPanel, debugBoards, theme, onPresentationChange, gifApiBaseUrl, }: SpatialBoardProps): import("react/jsx-runtime").JSX.Element;
