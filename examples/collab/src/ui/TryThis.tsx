import { useEffect, useRef } from "react";

/** Things worth trying first, as a header menu so it never covers a board. */
export function TryThis() {
  const ref = useRef<HTMLDetailsElement>(null);

  // Closes on any click outside it, like a menu.
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const el = ref.current;
      if (el?.open && !el.contains(e.target as Node)) el.open = false;
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <details ref={ref} className="menu">
      <summary>Things to try</summary>
      <div className="menu-panel try-panel">
        <ul>
          <li>Drag a sticky on one board and watch it move on the other, a beat later.</li>
          <li>Draw, or drag out a shape. The other peer sees it while you are still drawing.</li>
          <li>Take Peer A offline, change both boards, then bring it back. Both edits survive.</li>
          <li>Undo on one peer. Only that peer's own change is reverted, on both boards.</li>
          <li>Open this page in a second tab and switch on Sync other tabs in both.</li>
        </ul>
      </div>
    </details>
  );
}
