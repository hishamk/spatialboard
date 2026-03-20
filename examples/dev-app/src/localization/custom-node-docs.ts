import type { CustomNodeDocEntry } from "spatialboard";

/**
 * English inspector help for dev-app sample nodes. Apps embedding SpatialBoard should
 * pass their own `localization.customNodeDocs` (merge with these keys or replace).
 */
export const DEV_CUSTOM_NODE_DOCS: Record<string, CustomNodeDocEntry> = {
  "data-card": {
    title: "Data card",
    body:
      "A read-only style card with a title and key/value rows.\n\n" +
      "Demo node for layout and lifecycle logging — not part of the data-flow graph.",
  },
  timer: {
    title: "Timer",
    body:
      "Countdown or stopwatch with start, pause, and reset.\n\n" +
      "Runs locally in the node UI; connect other nodes via signals separately if you extend it.",
  },
  "analog-clock": {
    title: "Analog clock",
    body:
      "Shows hours, minutes, and seconds for a configurable UTC offset.\n\n" +
      "Use the inspector for label, timezone offset, and accent color.",
  },
  "spinning-cube": {
    title: "Spinning cube",
    body:
      "A decorative 3D cube preview with palette options.\n\n" +
      "No data-flow ports — for visual demos only.",
  },
  constant: {
    title: "Constant",
    body:
      "Outputs a numeric value on the value port.\n\n" +
      "Edit the number and label in the inspector; downstream nodes read the output port.",
  },
  "math-op": {
    title: "Math",
    body:
      "Inputs A and B (numbers). Output is result of the selected operation.\n\n" +
      "Unary ops abs and negate only use A. Divide/modulo guard against divide-by-zero.",
  },
  template: {
    title: "Template",
    body:
      "Builds a string from the template text by replacing {{a}} and {{b}} with wired inputs.\n\n" +
      "Result is available on the result output port.",
  },
  display: {
    title: "Display",
    body:
      "Shows the value input using raw, number, or JSON formatting.\n\n" +
      "Useful for monitoring any wire at a glance.",
  },
  condition: {
    title: "Condition",
    body:
      "Compares A and B with ==, !=, or numeric comparisons.\n\n" +
      "then outputs A when the comparison is true (otherwise null). else outputs A when false (otherwise null). B is only used for the test.",
  },
  random: {
    title: "Random",
    body:
      "Dice UI with min, max, and decimals. Rolling updates the stored value.\n\n" +
      "trigger accepts a signal to roll from the graph; value outputs the current number.",
  },
  button: {
    title: "Button",
    body:
      "Clicking fires an incrementing signal on the trigger output.\n\n" +
      "Use to manually pulse downstream logic.",
  },
  loop: {
    title: "Loop",
    body:
      "Container that runs a timed sequence when triggered. Each tick bumps outputs index, count, tick, and done.\n\n" +
      "Start nodes whose center lies inside the loop frame get their fire count incremented each iteration.",
  },
  start: {
    title: "Start",
    body:
      "Outputs a trigger signal derived from fireCount (used by Loop).\n\n" +
      "Place inside a Loop frame to be auto-fired on each loop iteration.",
  },
  gate: {
    title: "Gate",
    body:
      "When Open is true, out mirrors value; when false, out is null.\n\n" +
      "Use to enable or block a data path with a boolean.",
  },
  delay: {
    title: "Delay",
    body:
      "Signal delay: each new input trigger schedules an output pulse after delay ms.\n\n" +
      "The out port carries an incrementing fire count when the timer fires.",
  },
  accumulator: {
    title: "Accumulator",
    body:
      "On each Add trigger, adds the current value input to total and increments count.\n\n" +
      "Reset clears total and count.",
  },
  "logic-gate": {
    title: "Logic gate",
    body:
      "AND, OR, XOR, NOT, NAND, NOR, XNOR on boolean inputs A and B.\n\n" +
      "Output is the gate result on the out port.",
  },
  logger: {
    title: "Logger",
    body:
      "On each Log trigger, appends a timestamped line with the current value input.\n\n" +
      "Keeps a rolling buffer up to maxEntries.",
  },
  toggle: {
    title: "Toggle",
    body:
      "Each new Toggle signal flips boolean state; Reset forces OFF.\n\n" +
      "state output reflects the current value.",
  },
  switch: {
    title: "Switch",
    body:
      "Index mode: Sel chooses which channel (A–D) is forwarded to out.\n\n" +
      "Match mode: forwards the first channel whose value equals Sel; otherwise null.",
  },
  "map-remap": {
    title: "Map / remap",
    body:
      "Linearly maps the input number from [inMin, inMax] to [outMin, outMax].\n\n" +
      "Optional clamp keeps the blend factor within 0–1 before mapping.",
  },
  interval: {
    title: "Interval",
    body:
      "Start begins emitting tick signals every interval ms; Stop halts.\n\n" +
      "Use as a clock source for demos.",
  },
  led: {
    title: "LED",
    body:
      "Lights when the value input is truthy.\n\n" +
      "Pick LED color in the inspector.",
  },
  clamp: {
    title: "Clamp",
    body:
      "Clamps the input number between min and max from node data.\n\n" +
      "Output is the clamped value.",
  },
  round: {
    title: "Round",
    body:
      "Rounds the input to an integer using floor, ceil, round, or trunc.\n\n" +
      "Output is the rounded number.",
  },
  "progress-bar": {
    title: "Progress bar",
    body:
      "Bar driven by the value input.\n\n" +
      "Inspector sets label and Max. Values between 0 and 1 are treated as fractions; larger ranges use Max as scale.",
  },
  sparkline: {
    title: "Sparkline",
    body:
      "On each Sample trigger, records the current numeric value input into a rolling buffer and draws a mini chart.\n\n" +
      "Configure max samples in the inspector.",
  },
  color: {
    title: "Color",
    body:
      "Outputs the picked color as hex string and R, G, B numbers.\n\n" +
      "Use as a constant color source for other nodes.",
  },
  debounce: {
    title: "Debounce",
    body:
      "After each input trigger, waits delay ms with no further triggers, then pulses out once.\n\n" +
      "Good for noisy buttons or signals.",
  },
  sequence: {
    title: "Sequence",
    body:
      "On Go, fires outputs A, then B, then C on staggered delays.\n\n" +
      "Each output is a signal counter downstream can watch.",
  },
  once: {
    title: "Once",
    body:
      "First trigger bumps the out signal counter; further triggers are ignored until Reset.\n\n" +
      "Use for single-shot initialization.",
  },
  "date-time": {
    title: "Date / time",
    body:
      "Outputs timestamp, date string, time string, and hour/minute/second from the stored currentTime.\n\n" +
      "Use Refresh Now in the inspector to snap currentTime to now.",
  },
  merge: {
    title: "Merge",
    body:
      "Builds one object on out from inputs A–D: each connected, non-null input becomes a property (keys a–d).\n\n" +
      "Use to bundle wires for templates, displays, or downstream nodes.",
  },
  "http-fetch": {
    title: "HTTP fetch",
    body:
      "Demo node: configure method, URL, and optional body in the inspector, then use the node’s actions to fetch.\n\n" +
      "response, status, and error outputs reflect the last completed request (not a live reactive client).",
  },
  "json-parse": {
    title: "JSON parse",
    body:
      "Parses the JSON string input. Optional dot path selects a sub-value.\n\n" +
      "output holds the result; error holds parse/path errors.",
  },
  "string-op": {
    title: "String op",
    body:
      "Operations on strings: concat, slice, replace, upper/lower, trim, length, split, includes, etc.\n\n" +
      "Wire inputs per the selected op; result is on the output port.",
  },
  expression: {
    title: "Expression",
    body:
      "Evaluates a safe math expression with inputs a, b, c.\n\n" +
      "Supports calls like abs, floor, sin, pow, min, max, PI. result and error are outputs.",
  },
  compare: {
    title: "Compare",
    body:
      "Compares two values (eq, neq, lt, gt, lte, gte).\n\n" +
      "Outputs boolean result plus min/max of numeric inputs where applicable.",
  },
  lerp: {
    title: "Lerp",
    body:
      "Linear interpolation between a and b by t (usually 0–1).\n\n" +
      "Output is a + (b − a) × t.",
  },
  throttle: {
    title: "Throttle",
    body:
      "On each input trigger, forwards at most one output pulse per interval ms.\n\n" +
      "Extra triggers in the window increment a blocked counter instead of firing out.",
  },
  convert: {
    title: "Convert",
    body:
      "Casts the input to number, string, boolean, or JSON per inspector mode.\n\n" +
      "output is the converted value; error describes failures.",
  },
  variable: {
    title: "Variable",
    body:
      "Set stores the current value input when the Set signal fires.\n\n" +
      "Reset restores defaultValue. out always reflects storedValue.",
  },
};
