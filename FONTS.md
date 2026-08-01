# Fonts

SpatialBoard ships **two** bundled fonts. Every other font it offers is
referenced by name and loaded at runtime from Google Fonts — those files are
never bundled or redistributed with this package.

## Bundled fonts

| Font | File | License | Source |
|------|------|---------|--------|
| **Excalifont** | `src/assets/fonts/Excalifont-Regular.woff2` | [SIL OFL-1.1](https://openfontlicense.org) | [plus.excalidraw.com/excalifont](https://plus.excalidraw.com/excalifont) |
| **HishamHand** | `src/assets/fonts/HishamHand-Regular.ttf` | First-party (this repository's MIT license) | Created for SpatialBoard |

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

## HishamHand

HishamHand is a first-party handwriting font created for SpatialBoard by
the project author. It is distributed as part of this repository under the
repository's MIT license (`LICENSE`) and requires no third-party notice.

## SIL Open Font License 1.1 — full text (applies to Excalifont)

Excalifont — Copyright (c) Excalidraw
(https://plus.excalidraw.com/excalifont).

```
This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://openfontlicense.org


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
```
