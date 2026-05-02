/**
 * read-only signal for the SpatialBoard subtree.
 *
 * Provided by `<SpatialBoard readOnly={…}>` and consumed wherever
 * a render needs to hide editing affordances (resize handles,
 * inline-edit triggers, drag handles, context menu items, etc.)
 * without each component reaching into the engine.
 *
 * Defense-in-depth — `engine.readOnly` already drops local doc
 * mutations at the source. This context is purely a UX layer:
 * dead affordances confuse viewers ("why doesn't this work?").
 *
 * Usage in a node renderer:
 *
 * ```tsx
 * import { useSpatialBoardReadOnly } from "spatialboard";
 *
 * export function MyNodeRenderer(props) {
 *   const readOnly = useSpatialBoardReadOnly();
 *   return (
 *     <div>
 *       …content…
 *       {!readOnly && <EditHandle />}
 *     </div>
 *   );
 * }
 * ```
 *
 * Default is `false` — components mounted outside a SpatialBoard
 * provider behave as though editing is allowed (no surprise
 * lockdown in standalone usage).
 */
export declare const SpatialBoardReadOnlyContext: import("react").Context<boolean>;
/** Hook: subscribe to the SpatialBoard readOnly flag. */
export declare function useSpatialBoardReadOnly(): boolean;
