# Fonts

SpatialBoard ships exactly **one** bundled font. Every other font it offers is
referenced by name and loaded at runtime from Google Fonts — those files are
never bundled or redistributed with this package.

## Bundled font

| Font | File | License | Source |
|------|------|---------|--------|
| **Excalifont** | `src/assets/fonts/Excalifont-Regular.woff2` | [SIL OFL-1.1](https://openfontlicense.org) | [plus.excalidraw.com/excalifont](https://plus.excalidraw.com/excalifont) |

Excalifont is the default text font (`DEFAULT_FONT` in `src/fonts.ts`). It is
the official Excalidraw hand-drawn font, released under the SIL Open Font
License 1.1 and, per its authors, "freely available for both personal and
commercial use."

The OFL permits bundling and redistribution provided the font is not sold on
its own and its license notice is preserved — this file serves as that notice.
The font is embedded in library builds (`dist/`), registered via an
`@font-face` rule by `loadGoogleFonts()`, and inlined into SVG/PNG canvas
exports (`src/export/canvas-export.ts`) so exported boards render identically
offline.

## Runtime fonts (Google Fonts CDN — not distributed)

`loadGoogleFonts()` injects a stylesheet `<link>` to `fonts.googleapis.com`;
the end user's browser fetches these families directly from Google's CDN.
SpatialBoard does not bundle, modify, or redistribute their font files.

Families offered in the font picker:

- **Sans**: Inter, Roboto, Open Sans
- **Serif**: Lora, Playfair Display, Merriweather
- **Mono**: JetBrains Mono, Fira Code, Source Code Pro
- **Handwritten**: Caveat, Shadows Into Light, Dancing Script, Amatic SC
- **Display**: Pacifico, Lobster, Permanent Marker, Bangers, Righteous,
  Satisfy, Kaushan Script, Fredericka the Great, Comfortaa

Every family above is libre-licensed (SIL OFL 1.1 or Apache 2.0). The
authoritative license text for each family is published on its Google Fonts
specimen page (`fonts.google.com/specimen/<Family>` → License).

The generic `sans-serif` / `serif` / `monospace` options resolve to the end
user's operating-system fonts and involve no font distribution at all.

## Offline / self-hosted deployments

Only Excalifont is required for identical default rendering — it is bundled
and works offline. Deployments that must avoid the Google Fonts CDN entirely
can self-host any of the runtime families (their licenses permit it) and serve
equivalent `@font-face` rules, or simply restrict boards to Excalifont and the
system fonts.
