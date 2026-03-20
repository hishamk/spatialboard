import type { NodePropertiesPanelProps } from "spatialboard";

/** Optional on custom dataflow node `data`; default hidden until enabled in the inspector. */
export type ShowEdgeComputeOverlayFieldProps<T extends { showEdgeComputeOverlay?: boolean }> = Pick<
  NodePropertiesPanelProps<T>,
  "data" | "updateData"
>;

export function ShowEdgeComputeOverlayField<T extends { showEdgeComputeOverlay?: boolean }>({
  data,
  updateData,
}: ShowEdgeComputeOverlayFieldProps<T>) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginTop: 6,
        fontSize: 10,
        color: "#999",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={Boolean(data.showEdgeComputeOverlay)}
        onChange={(e) =>
          updateData({ showEdgeComputeOverlay: e.target.checked } as Partial<T>)
        }
      />
      Show port / timing labels on incoming wires
    </label>
  );
}
