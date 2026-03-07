import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { SpatialNode } from "../../../engine/types";
import { useBatchUpdate } from "../MultiNodeContext";

interface CustomNodePropertiesProps {
  engine: SpatialEngine;
  node: SpatialNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PanelComponent: React.ComponentType<any>;
}

export default function CustomNodeProperties({ engine, node, PanelComponent }: CustomNodePropertiesProps) {
  const updateData = useBatchUpdate<Record<string, unknown>>(engine, node);

  return <PanelComponent node={node} data={node.data} engine={engine} updateData={updateData} />;
}
