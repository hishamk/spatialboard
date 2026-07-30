import { useState, useEffect, useCallback } from "react";
import type { DataFlowEngine } from "../../../engine/DataFlowEngine";

/**
 * Subscribes to a DataFlowEngine so port-value / compute-time reads re-render when
 * the graph recomputes. `dataFlowVersion` bumps on every change; the accessor
 * callbacks capture it in their dependency arrays so consumers get fresh values.
 */
export function useDataFlow(dataFlow: DataFlowEngine | null | undefined) {
  // Subscribe to DataFlowEngine changes for port value re-renders
  const [dataFlowVersion, setDataFlowVersion] = useState(0);
  useEffect(() => {
    if (!dataFlow) return;
    return dataFlow.onChange(() => setDataFlowVersion((v) => v + 1));
  }, [dataFlow]);

  const getLastComputeMs = useCallback(
    (nodeId: string) => dataFlow?.getLastComputeMs(nodeId),
    [dataFlow, dataFlowVersion],
  );

  const getDataFlowPortValue = useCallback(
    (nodeId: string, portId: string) =>
      dataFlow ? dataFlow.getPortValue(nodeId, portId) : null,
    [dataFlow, dataFlowVersion],
  );

  return { dataFlowVersion, getLastComputeMs, getDataFlowPortValue };
}
