import { useEffect, useRef } from "react";

/**
 * Site chrome for the hosted demos: the examples, the examples index, and
 * the GitHub repo. The other examples float this list over their board; with
 * two boards side by side it lives in the page header instead, as a menu.
 *
 * Not part of the example itself — delete this file (and its usage) when
 * copying the example out as a starter.
 */

const DEMOS = [
  { slug: "basic", name: "Basic board", href: "/basic/" },
  { slug: "rich-text", name: "Rich text", href: "/rich-text/" },
  { slug: "custom-nodes", name: "Custom nodes", href: "/custom-nodes/" },
  { slug: "video-notes", name: "Video notes", href: "/video-notes/" },
  { slug: "collab", name: "Collaboration", href: "/collab/" },
  { slug: "dev-app", name: "Playground", href: "/dev-app/" },
];

const REPO_URL = "https://github.com/hishamk/spatialboard";

export function DemoSwitcher({ current }: { current: string }) {
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
    <details ref={ref} className="menu demos">
      <summary>Examples</summary>
      <nav className="menu-panel demos-panel" aria-label="Examples">
        {DEMOS.map((d) =>
          d.slug === current ? (
            <span key={d.slug} className="demos-item is-current" aria-current="page">
              {d.name}
            </span>
          ) : (
            <a key={d.slug} className="demos-item" href={d.href}>
              {d.name}
            </a>
          ),
        )}
        <span className="demos-rule" />
        <a className="demos-item" href="/">
          All examples
        </a>
        <a className="demos-item" href={REPO_URL}>
          GitHub repo
        </a>
      </nav>
    </details>
  );
}
