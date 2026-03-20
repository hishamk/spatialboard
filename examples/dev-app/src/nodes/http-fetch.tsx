import { memo, useRef, useEffect, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";
import { ShowEdgeComputeOverlayField } from "./show-edge-compute-overlay-field";

// ── Data shape ──────────────────────────────────────────────

export interface HttpFetchData {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body: string;
  lastTrigger: number;
  status: number | null;
  response: string;
  error: string;
  loading: boolean;
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "trigger", label: "Fetch", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "url", label: "URL", direction: "input", dataType: "string" },
  { id: "response", label: "Body", direction: "output", dataType: "string" },
  { id: "status", label: "Status", direction: "output", dataType: "number" },
  { id: "error", label: "Error", direction: "output", dataType: "string" },
];

// ── Renderer ────────────────────────────────────────────────

const HttpFetchRenderer = memo(function HttpFetchRenderer(
  props: NodeRendererProps<HttpFetchData>,
) {
  const { data, portValues, updateData } = props;
  const cd = data as HttpFetchData;
  const triggerVal = (portValues?.trigger as number) ?? 0;
  const urlFromPort = portValues?.url as string | undefined;

  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;
  const urlRef = useRef(urlFromPort || cd.url);
  urlRef.current = urlFromPort || cd.url;
  const methodRef = useRef(cd.method);
  methodRef.current = cd.method;
  const bodyRef = useRef(cd.body);
  bodyRef.current = cd.body;

  useEffect(() => {
    if (triggerVal <= 0 || triggerVal === cd.lastTrigger) return;
    updateDataRef.current({ lastTrigger: triggerVal, loading: true, error: "" });

    const controller = new AbortController();
    const opts: RequestInit = {
      method: methodRef.current,
      signal: controller.signal,
    };
    if (methodRef.current !== "GET" && bodyRef.current) {
      opts.body = bodyRef.current;
      opts.headers = { "Content-Type": "application/json" };
    }

    fetch(urlRef.current, opts)
      .then(async (res) => {
        const text = await res.text();
        updateDataRef.current({
          status: res.status,
          response: text.slice(0, 4096),
          loading: false,
          error: res.ok ? "" : `${res.status} ${res.statusText}`,
        });
      })
      .catch((err: Error) => {
        if (err.name === "AbortError") return;
        updateDataRef.current({
          status: null,
          response: "",
          loading: false,
          error: err.message,
        });
      });

    return () => controller.abort();
  }, [triggerVal]); // eslint-disable-line react-hooks/exhaustive-deps

  const METHOD_COLORS: Record<string, string> = {
    GET: "#10b981",
    POST: "#3b82f6",
    PUT: "#f59e0b",
    DELETE: "#ef4444",
  };

  const preview = cd.response
    ? cd.response.length > 40 ? cd.response.slice(0, 39) + "\u2026" : cd.response
    : "\u2014";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#fff",
      }}
    >
      {/* Background */}
      <svg
        viewBox="0 0 160 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="http-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={156} height={96}
          rx={8} ry={8}
          fill="url(#http-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Globe decoration */}
        <circle
          cx={130} cy={22} r={12}
          fill="none"
          stroke={cd.accentColor}
          strokeWidth={0.8}
          opacity={0.12}
          vectorEffect="non-scaling-stroke"
        />
        <ellipse
          cx={130} cy={22} rx={6} ry={12}
          fill="none"
          stroke={cd.accentColor}
          strokeWidth={0.6}
          opacity={0.1}
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1={118} y1={22} x2={142} y2={22}
          stroke={cd.accentColor}
          strokeWidth={0.5}
          opacity={0.1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          padding: "6% 8%",
          boxSizing: "border-box",
          gap: 2,
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{
            fontSize: 7, fontWeight: 800,
            color: METHOD_COLORS[cd.method] ?? cd.accentColor,
            letterSpacing: 0.5,
          }}>
            {cd.method}
          </span>
          <span style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
            Fetch
          </span>
        </div>

        {/* URL */}
        <div style={{
          fontSize: 7, color: "#666",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {urlFromPort || cd.url || "no url"}
        </div>

        {/* Status / loading */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
          {cd.loading ? (
            <>
              <div style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#f59e0b",
                boxShadow: "0 0 6px #f59e0b",
              }} />
              <span style={{ fontSize: 8, color: "#f59e0b", fontWeight: 600 }}>loading...</span>
            </>
          ) : cd.status != null ? (
            <>
              <span style={{
                fontSize: 10, fontWeight: 800,
                color: cd.status < 400 ? "#10b981" : "#ef4444",
                fontVariantNumeric: "tabular-nums",
              }}>
                {cd.status}
              </span>
            </>
          ) : cd.error ? (
            <span style={{ fontSize: 8, color: "#ef4444", fontWeight: 600 }}>
              {cd.error.length > 30 ? cd.error.slice(0, 29) + "\u2026" : cd.error}
            </span>
          ) : (
            <span style={{ fontSize: 8, color: "#333", fontStyle: "italic" }}>idle</span>
          )}
        </div>

        {/* Response preview */}
        <div style={{
          marginTop: "auto",
          fontSize: 6, color: "#444",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {preview}
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function HttpFetchPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<HttpFetchData>) {
  const cd = data as HttpFetchData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 48, fontSize: 10, color: "#999", flexShrink: 0 };
  const inputStyle: React.CSSProperties = {
    flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
    borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
  };

  const METHODS = ["GET", "POST", "PUT", "DELETE"] as const;

  const onUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => updateData({ url: e.target.value }),
    [updateData],
  );

  const onBodyChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => updateData({ body: e.target.value }),
    [updateData],
  );

  return (
    <>
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      <div style={{ ...row, flexWrap: "wrap" }}>
        <span style={label}>Method</span>
        {METHODS.map((m) => (
          <button
            key={m}
            onClick={() => updateData({ method: m })}
            style={{
              padding: "3px 6px",
              background: cd.method === m ? cd.accentColor : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 6, color: "#fff", fontSize: 9, fontWeight: 600, cursor: "pointer",
            }}
          >
            {m}
          </button>
        ))}
      </div>
      <div style={row}>
        <span style={label}>URL</span>
        <input
          type="text"
          value={cd.url}
          onChange={onUrlChange}
          placeholder="https://api.example.com"
          style={inputStyle}
        />
      </div>
      {cd.method !== "GET" && (
        <div style={row}>
          <span style={label}>Body</span>
          <textarea
            value={cd.body}
            onChange={onBodyChange}
            placeholder='{"key": "value"}'
            rows={3}
            style={{
              ...inputStyle,
              resize: "vertical",
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: 10,
            }}
          />
        </div>
      )}
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const httpFetchNodeType: NodeTypeDefinition<HttpFetchData> = {
  type: "http-fetch",
  docs: {},
  component: HttpFetchRenderer,
  propertiesPanel: HttpFetchPropertiesPanel,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: HttpFetchData) => ({
    response: data.response || "",
    status: data.status ?? 0,
    error: data.error || "",
  }),
  getClipboardText: (node) => {
    const d = node.data as HttpFetchData;
    return `${d.method} ${d.url}`;
  },
};
