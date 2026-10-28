// blocknote-safe-links.ts — the editor wiring for safe-links.ts in the
// rich-text block.
//
// The block's editor bundles a Link extension that opens a clicked link with
// `window.open(href, "_blank")` and renders stored `rel`/`target`/`class` as
// given. It cannot be reconfigured, so this extension:
// - claims link clicks first: a TipTap extension with priority above Link's
//   (1000). It must be a TipTap extension: plugins passed to the editor as
//   `prosemirrorPlugins` rank around 100, below Link, and Link would then
//   open a second tab that keeps the opener;
// - renders link marks through `safeLinkDOMSpec`, which also covers a
//   read-only block, where a click follows the anchor natively.

import { createExtension } from "@blocknote/core";
import { Extension } from "@tiptap/core";
import { DOMSerializer } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { handleSafeLinkClick, safeLinkDOMSpec } from "./safe-links";

/** Opens link clicks in an editable view through `handleSafeLinkClick`. */
export const SafeLinkClick = Extension.create({
  name: "safeLinkClick",
  priority: 1001,
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("safeLinkClick"),
        props: {
          handleClick: (view, _pos, event) => handleSafeLinkClick(view, event),
        },
      }),
    ];
  },
});

/**
 * Renders the `markName` mark with its own `toDOM`, then forces the safe
 * `rel`/`target` and drops `class`. Rendering only: stored attributes are
 * left as they are.
 */
export function safeLinkMarkViewPlugin(markName = "link"): Plugin {
  return new Plugin({
    key: new PluginKey("safeLinkRender"),
    props: {
      markViews: {
        [markName]: (mark, view, inline) => {
          const spec = mark.type.spec.toDOM?.(mark, inline) ?? ["a", 0];
          const { dom, contentDOM } = DOMSerializer.renderSpec(
            view.dom.ownerDocument,
            safeLinkDOMSpec(spec),
          );
          return { dom: dom as HTMLElement, contentDOM: contentDOM ?? undefined };
        },
      },
    },
  });
}

/** Pass `safeLinksExtension()` in the block editor's `extensions`. */
export const safeLinksExtension = createExtension(() => ({
  key: "safeLinks",
  tiptapExtensions: [SafeLinkClick],
  prosemirrorPlugins: [safeLinkMarkViewPlugin("link")],
}));
