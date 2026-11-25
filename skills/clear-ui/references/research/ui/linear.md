# Linear visual design system: value-level teardown

Captured 2026-11-25 from shipped assets.

## 0. Sources and evidence labels

| Label | Meaning |
|---|---|
| **[WEB-CSS]** | Read directly from the marketing site's 72 stylesheets (`static.linear.app/web/_next/static/css/*.css`, 457 KB concatenated in `raw/web-all.css`). Pages: `/`, `/features`, `/pricing`, `/changelog`, `/method`. |
| **[WEB-COMPUTED]** | `getComputedStyle` in a real browser on `linear.app/`, 1440px viewport, DPR 1, dark theme. |
| **[APP-CSS]** | Read from the product client's stylesheet `static.linear.app/client/assets/style-KRuU1wE7.css` (726 KB), which `/login` serves. |
| **[APP-JS]** | Read from the product client's startup bundles (`startup-entry`, `startup-root`), with their atomic class names resolved back to CSS declarations in [APP-CSS]. Static reading only; nothing was executed. |
| **[APP-COMPUTED]** | `getComputedStyle` on `linear.app/login` (logged-out app shell), light and dark, DPR 1. |
| **[ARTICLE]** | Stated by Linear in a public post. Not verified in CSS unless also tagged otherwise. |
| **[INFERRED]** | My interpretation. |

Two different systems are in play and they do not share values:

- **Marketing site**: CSS modules, named custom properties (`--color-bg-primary`, `--title-5`, `--radius-8`), dark by default (`data-theme=dark`), with `light` and `glass` variants.
- **Product app**: atomic CSS (one declaration per `sx-*` class), colour tokens with hashed names (`--sx-1ubxoo9`) whose values are **generated at runtime** from three inputs. The static CSS holds no colour values for the theme; they were read from the generator source and from computed styles.

Caveat on counts: in the app's atomic CSS each declaration exists once however many components use it, so "x N" figures for the app are an inventory of distinct rules, not usage frequency. Marketing CSS counts are closer to real usage.

---

## 1. Colour tokens

### 1.1 Marketing site [WEB-CSS]

Dark (default):

```css
[data-theme=dark]{
  --color-bg-primary:#08090a; --color-bg-secondary:#1c1c1f; --color-bg-tertiary:#232326;
  --color-bg-quaternary:#28282c; --color-bg-quinary:#282828; --color-bg-marketing:#010102;
  --color-bg-panel:#0f1011; --color-bg-translucent:#ffffff0d;
  --color-bg-level-0:#08090a; --color-bg-level-1:#0f1011; --color-bg-level-2:#141516; --color-bg-level-3:#191a1b;
  --color-border-primary:#23252a; --color-border-secondary:#34343a; --color-border-tertiary:#3e3e44;
  --color-border-translucent:#ffffff0d; --color-border-translucent-strong:#ffffff14;
  --color-line-primary:#37393a; --color-line-secondary:#202122; --color-line-tertiary:#18191a; --color-line-quaternary:#141515;
  --color-text-primary:#f7f8f8; --color-text-secondary:#d0d6e0; --color-text-tertiary:#8a8f98; --color-text-quaternary:#62666d;
  --color-link-primary:#828fff; --color-link-hover:#fff;
  --color-brand-bg:#5e6ad2; --color-brand-text:#fff;
  --color-accent:#7170ff; --color-accent-hover:#828fff; --color-accent-tint:#18182f;
  --color-button-invert-bg:#e5e5e6; --color-button-invert-bg-hover:#fff;
  --color-overlay-primary:#000000d9;
  --header-bg:#0b0b0bcc; --header-border:#ffffff14;
}
```

Light:

```css
[data-theme=light]{
  --color-bg-primary:#fff; --color-bg-secondary:#f9f8f9; --color-bg-tertiary:#f4f2f4;
  --color-bg-quaternary:#eeedef; --color-bg-quinary:#e9e8ea; --color-bg-translucent:#00000005;
  --color-bg-level-0:#fff; --color-bg-level-1:#f8f8f8; --color-bg-level-2:#f4f4f4; --color-bg-level-3:#f0f0f0;
  --color-border-primary:#e9e8ea; --color-border-secondary:#e4e2e4; --color-border-tertiary:#dcdbdd;
  --color-border-translucent:#0000000d; --color-border-translucent-strong:#00000014;
  --color-line-primary:#d4d4d6; --color-line-secondary:#eaeaeb; --color-line-tertiary:#f0f0f0; --color-line-quaternary:#f4f4f4;
  --color-text-primary:#282a30; --color-text-secondary:#3c4149; --color-text-tertiary:#6f6e77; --color-text-quaternary:#86848d;
  --color-link-primary:#7070ff; --color-brand-bg:#7070ff;
  --color-accent:#7170ff; --color-accent-hover:#8989f0; --color-accent-tint:#f1f1ff;
  --color-button-invert-bg:#282a30; --color-button-invert-bg-hover:#1f2024;
  --color-overlay-primary:#ffffffa6; --header-border:#00000014;
}
```

Status hues, theme-independent, in `:root`:

```css
--color-blue:#4ea7fc; --color-red:#eb5757; --color-green:#27a644; --color-orange:#fc7840;
--color-yellow:#f0bf00; --color-indigo:#5e6ad2; --color-teal:#00b8cc;
```

Structure worth copying [INFERRED from the above]:

- Four text steps (primary, secondary, tertiary, quaternary), four or five background steps, three border steps, plus translucent borders at 5% and 8% alpha.
- Neither theme uses pure black on pure white for text. Dark text is `#f7f8f8` on `#08090a`; light text is `#282a30` on `#fff`.
- Dark surface steps are tiny: `#08090a → #0f1011 → #141516 → #191a1b`.
- One accent family only (indigo/violet `#5e6ad2`, `#7170ff`, `#828fff`).
- The primary marketing call to action is not the accent. It is the neutral "invert" button (`#e5e5e6` on dark, `#282a30` on light).

### 1.2 Product app: semantic token names [APP-JS]

The app's theme object has these token families (names are theirs):

- Surfaces: `bgSub`, `bgBase`, `bgShade`, `bgSelected`, `bgFocus`, `bgModalOverlay`, each with a `Hover` twin.
- Borders: `bgBorder`, `bgBorderFaint`, `bgBorderSolid`, `bgBorderStrong`, each with `Hover`, `Thin`, and `Alpha` variants, plus `bgSelectedBorder`.
- Text: `labelTitle`, `labelBase`, `labelMuted`, `labelFaint`, `labelLink` (with `Hover` twins for the first three).
- Controls: `controlPrimary`, `controlSecondary`, `controlTertiary`, each with `Label`, `Hover`, and (secondary, tertiary) `Selected`.
- Seven status hues (`teal green yellow orange red blue purple`), each with `Bg Base BaseHover Mid Text Foreground Tint`.
- Misc: `focusColor`, `shadowColor`, `sidebarLinkBg`, `sidebarLinkBgActive`, scrollbar and chrome-tab colours.

### 1.3 Product app: resolved values on `/login` [APP-COMPUTED]

| Token | Light | Dark |
|---|---|---|
| bgSub | `#eeeeef` | `#09090a` |
| bgBase | `#f8f8f9` | `#111212` |
| bgBaseHover | `#eeeeef` | `#191a1b` |
| bgShade | `#e9e9ea` | `#151617` |
| bgSelected | `#e7e8f3` | `#1b1e37` |
| bgFocus | `#eaeaeb` | `#222223` |
| bgModalOverlay | `#0000003f` | `#00000066` |
| bgBorder | `#dedede` | `#232325` |
| bgBorderFaint | `#f1f1f1` | `#1a1b1d` |
| bgBorderSolid | `#d2d2d2` | `#27282a` |
| bgBorderSolidHover | `#b4b4b4` | `#303133` |
| bgBorderStrong | `#7c7c7c` | `#727376` |
| bgBorderAlphaThin | `#0000001a` | `#ffffff17` |
| bgBorderFaintAlphaThin | `#00000007` | `#ffffff0b` |
| bgBorderSolidAlphaThin | `#00000026` | `#ffffff1d` |
| labelTitle | `#1b1b1b` | `#ffffff` |
| labelBase | `#2f2f31` | `#e2e3e5` |
| labelMuted | `#5b5c5e` | `#949597` |
| labelFaint | `#9c9c9e` | `#565658` |
| labelLink | `#3f60d9` | `#6f7ffe` |
| controlPrimary | `#6d78d5` | `#5e69d1` |
| controlPrimaryHover | `#5e69c1` | `#6974e1` |
| controlPrimaryLabel | `#fefeff` | `#fefeff` |
| controlSecondary | `#fefeff` | `#1b1b1c` |
| controlSecondaryHover | `#f3f3f3` | `#242526` |
| controlSecondarySelected | `#f0f0f0` | `#2c2d2e` |
| controlTertiaryHover | `#f0f0f1` | `#232324` |
| controlTertiarySelected | `#ececed` | `#28292a` |
| sidebarLinkBg | `#f0f0f1` | `#1d1e1f` |
| sidebarLinkBgActive | `#eaeaeb` | `#28292b` |
| focusColor | `#6d78d5` | `#5e69d1` |
| redBase / redText / redTint | `#f34e52` / `#e1243a` / `#f7e3e4` | `#f34e52` / `#ff8583` / `#321617` |
| greenBase | `#43bc58` | `#26a544` |
| yellow / orange / blue / purple / teal Base | `#f0bf00` `#ff7235` `#55ccff` `#5e6ad2` `#00b8cb` | same |

These are the logged-out shell's themes. Whether a logged-in workspace's default light and dark resolve to exactly these values was not verified (see section 10).

### 1.4 How the app derives every colour from three inputs [APP-JS]

`generateTheme({base, accent, contrast, colorFormat})` works in LCH (`[lightness, chroma, hue]`). Presets found in the bundle:

| Where it appears | base (LCH) | accent (LCH) | contrast |
|---|---|---|---|
| System default, dark (`prefers-color-scheme: dark`) | `[9.47, 6.57, 282.86]` | `[42.89, 62.45, 291.57]` | 30 |
| System default, light | `[100, 0, 282.86]` | `[53, 52.26, 286.91]` | 30 |
| A dark preset | `[5.52, 0.4, 272]` | `[47.92, 59.30, 288.42]` | 27 |
| A light preset | `[97.94, 0.5, 282]` | `[53, 52.26, 286.91]` | 30 |
| A dark preset from hex | `#1F2023` | `#5E6AD2` | 30 |
| High-contrast variants of the above | same | same | 90 |

The preset names are minified away, so I cannot say which one a user sees as "Light" or "Dark" in settings. Base chroma is 0 to 6.6 in every neutral preset: the grays are almost achromatic.

Derivation rules, verbatim from the generator (light branch first where `i ?` appears; `c()`, `d()`, `p()` are lightness/chroma offsets scaled by contrast):

```js
bgBaseHover:  c(base, light ? {l:3.5} : {l:4.25, c:.5})
bgSub:        c(base, light ? {l:3.5} : {l:-3.25, c:0})
bgShade:      c(base, light ? {l:5.5} : {l:2, c:.5})
bgFocus:      c(base, light ? {l:5}   : {l:9, c:.5})
bgBorder:     p(base, light ? {l:3.5, c:1} : {l:4, c:.5})
bgBorderFaint:p(base, light ? {l:1, c:1}   : {l:2, c:.5})
bgBorderSolid:p(base, light ? {l:5, c:1}   : {l:5, c:.5})
bgBorderStrong:p(base, light ? {l:17, c:1} : {l:20, c:.5})
bgSelected:   mix(base, accent, (1 + base.c/30) * (light ? .18 : .05))
sidebarLinkBg:       c(base, light ? {l:2.8} : {l:6.5, c:1})
sidebarLinkBgActive: c(base, light ? {l:4.9} : {l:12.5, c:1})
controlPrimary: accent
controlPrimaryHover: c(accent, {l: light ? 6 : 5, c:2})
bgModalOverlay: [0,0,0, clamp((light ? .25 : .4) * k, 0, .8)]
// text: start from the readable text colour for base, then step lightness
labelTitle: offset 10·t      labelBase: 10–20·t      labelMuted: 40·t      labelFaint: 66·t
// status hues are fixed LCH triples:
purple [48,59.31,288.43]  blue [80,70,267]  teal [67.5,45,210]  green [60|68,64.37,141.95]
yellow [80,90,85]  orange [66,80,48]  red [58,73,29]
// tints: mix(base, hue, light ? .2 : .03)
```

Sub-themes are generated by re-running the same function with a shifted base: `elevatedTheme` (base lightness `-8` light / `+4.125` dark), `menuTheme` (`-8` / `+8`), `subTheme` (base = `bgSub`), `sidebarTheme`, `selectedTheme` (base = `bgSelected`). So a menu or popover is not styled with its own palette; it is the whole token set recomputed one step up.

---

## 2. Typography

### 2.1 Families

```css
/* [WEB-CSS] */
--font-regular:"Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--font-monospace:"Berkeley Mono",ui-monospace,"SF Mono","Menlo",monospace;
--font-serif-display:"Tiempos Headline",ui-serif,Georgia,Cambria,"Times New Roman",Times,serif;
/* [APP-CSS] adds "Linear Thai" before sans-serif; mono fallback is "SFMono Regular",Consolas,"Liberation Mono",Menlo,Courier */
```

- Fonts are self-hosted: `InterVariable.woff2?v=4.1` (weight axis 100 to 900, plus italic), `Berkeley-Mono-Variable.woff2`, Tiempos Headline 400 (one stylesheet only) [WEB-CSS].
- Marketing body sets `font-feature-settings:"cv01","ss03"` and `font-variation-settings:"opsz" auto` [WEB-CSS, WEB-COMPUTED]. No `Inter Display` family name exists in either stylesheet; display cuts come from Inter Variable's optical-size axis. The app sets `"opsz" 28` and `"opsz" 32` explicitly on some classes [APP-CSS].
- Both set `-webkit-font-smoothing:antialiased; text-rendering:optimizelegibility` on `body`.

### 2.2 Weights

| Name | Marketing [WEB-CSS] | App [APP-CSS, APP-JS] |
|---|---|---|
| light | 300 | 300 |
| normal | 400 | **450** |
| medium | **510** | 500 |
| semibold | **590** | 600 |
| bold | **680** | 700 |

Variable-font intermediate weights are used on purpose. In the app, body text is 450, not 400.

### 2.3 App type scale [APP-JS, resolved to CSS]

```
micro        11px  (0.6875rem)  450   line-height normal
microPlus    11px               500
mini         12px  (0.75rem)    450   normal
miniPlus     12px               500
small        13px  (0.8125rem)  450   normal
smallPlus    13px               500
regular      15px  (0.9375rem)  450   line-height 1.4375rem (23px)
regularPlus  15px               600   23px
large        18px  (1.125rem)   450   normal
largePlus    18px               500
title3       20px  (1.25rem)    500   normal, letter-spacing -0.01rem
title2       24px  (1.5rem)     500   line-height 2rem, letter-spacing -0.01rem
title1       36px  (2.25rem)    450   line-height 2.875rem
```

- Every size has a "Plus" twin that changes weight only. Hierarchy inside a size is carried by weight and colour, not by another size.
- 13px (`small`) is the workhorse: buttons, inputs, menus all use it. 14px and 16px are absent from the app scale.
- App editor (document body) text: 15px, line-height 1.6, letter-spacing `-0.00666667em` [APP-CSS].
- On non-retina screens the 11px size is rounded up: `--font-size-micro: round(up, .6875rem, 2px)` (12px) [APP-CSS].

### 2.4 Marketing type scale [WEB-CSS]

```css
--title-1-size:1.0625rem; --title-1-line-height:1.4;   --title-1-letter-spacing:-.012em;
--title-2-size:1.25rem;   --title-2-line-height:1.33;  --title-2-letter-spacing:-.012em;
--title-3-size:1.5rem;    --title-3-line-height:1.33;  --title-3-letter-spacing:-.012em;
--title-4-size:2rem;      --title-4-line-height:1.125; --title-4-letter-spacing:-.022em;
--title-5-size:2.5rem;    --title-5-line-height:1.1;   --title-5-letter-spacing:-.022em;
--title-6-size:3rem;      --title-6-line-height:1;     --title-6-letter-spacing:-.022em;
--title-7-size:3.5rem;    --title-7-line-height:1.1;   --title-7-letter-spacing:-.022em;
--title-8-size:4rem;      --title-8-line-height:1.06;  --title-8-letter-spacing:-.022em;
--title-9-size:4.5rem;    --title-9-line-height:1;     --title-9-letter-spacing:-.022em;
--text-large-size:1.0625rem;  --text-large-line-height:1.6;        --text-large-letter-spacing:0;
--text-regular-size:.9375rem; --text-regular-line-height:1.6;      --text-regular-letter-spacing:-.011em;
--text-small-size:.875rem;    --text-small-line-height:calc(21/14);--text-small-letter-spacing:-.013em;
--text-mini-size:.8125rem;    --text-mini-line-height:1.5;         --text-mini-letter-spacing:-.01em;
--text-micro-size:.75rem;     --text-micro-line-height:1.4;        --text-micro-letter-spacing:0;
--text-tiny-size:.625rem;     --text-tiny-line-height:1.5;         --text-tiny-letter-spacing:-.015em;
```

Pattern: letter-spacing tightens as size grows (0 at 12px, about -0.011em at 13 to 15px, -0.012em at 17 to 24px, -0.022em from 32px up). Line-height falls from 1.6 for body to 1.0 for display.

Measured on the homepage [WEB-COMPUTED]:

| Element | Size | Weight | Line-height | Letter-spacing | Colour |
|---|---|---|---|---|---|
| Hero h1 | 64px | 510 | 64px | -1.408px (-0.022em) | `#f7f8f8` |
| Section h2 | 48px | 510 | 48px | -1.056px | `#f7f8f8`, or `#8a8f98` for de-emphasised |
| h3 | 20px | 590 | 26.6px | -0.24px | `#d0d6e0` |
| Body p | 15px | 400 | 24px | -0.165px | `#8a8f98` |
| Small p | 14px | 400 | 21px | -0.182px | `#8a8f98` |
| Eyebrow | 12px | 400 | 16.8px | normal | `#62666d` |

The `--title-*` shorthand tokens declare semibold (590), but the rendered h1 and h2 are 510. Big headings are medium weight, not bold.

---

## 3. Spacing, radius, sizes

### 3.1 Spacing

There is **no named spacing scale** in either stylesheet (no `--space-*` tokens). Raw pixel values are used. Distribution of px values in padding, margin, and gap declarations:

- Marketing [WEB-CSS], 867 values: `8`(113) `12`(88) `16`(82) `4`(81) `6`(75) `24`(61) `32`(43) `10`(34) `1`(30) `2`(25) `20`(24) `14`(19) `28`(17) `5`(17) `40`(15) `56`(13) `48`(11) `3`(11). 69% are multiples of 4; 90% are even.
- App [APP-CSS], 1044 distinct rules: `12`(89) `4`(83) `8`(80) `6`(69) `16`(64) `2`(57) `24`(49) `10`(39) `1`(35) `14`(31) `5`(30) `20`(29) `40`(28) `3`(27) `32`(27). 56% are multiples of 4.

[INFERRED] The working set is 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64. It is a 4px grid with 2px half-steps (6, 10, 14) used freely for optical alignment inside small controls. It is not a strict 8pt grid.

### 3.2 Radius

Marketing tokens [WEB-CSS]:

```css
--radius-4:4px; --radius-6:6px; --radius-8:8px; --radius-12:12px; --radius-16:16px;
--radius-24:24px; --radius-32:32px; --radius-rounded:9999px; --radius-circle:50%;
```

Marketing usage counts: 8px (44+8), `rounded` 9999px (40+8), circle (36), 4px (36), 12px (33), 6px (23), 5px (11), 2px (9), 16px (5).

App values in use [APP-JS, APP-CSS]:

| Thing | Radius |
|---|---|
| Buttons | 9999px (pill); `circle` variant 50% |
| Inputs, select | 8px |
| Checkbox | 3px |
| Tooltip | 8px |
| Menu container | 10px |
| Menu item highlight | 6px (inset 4px from the menu edge) |
| Popover container | 12px |
| Modal (full-size container) | 8px |
| Main content panel | 12px (`mainContentBorderRadius`) |
| Sidebar-style list link | 8px |
| Editor blocks | 6px |
| Settings list item | 10px |
| Inline chip / mention | 0.35em |
| Avatar | 50%; square avatar 8px |

[INFERRED] Radius grows with the size of the surface: 3 (checkbox) → 6 (row highlight) → 8 (control) → 10 to 12 (floating panel) → 12 to 16 (large card). Nested radii are concentric: a 10px menu with 4px padding holds 6px highlights.

### 3.3 Fixed layout constants

App [APP-JS]:

```js
{ mainPageMargin:8, mainContentBorderRadius:12, desktopTabsHeight:42, desktopTabHeight:26,
  sidebarPrimaryButtonSize:28, sidebarPadding:12, listHeaderHeight:36, listIssueRowHeight:44,
  listProjectRowHeight:48, listProjectRowWithDescriptionHeight:58, listInitiativeRowHeight:58 }
// breakpoints
{ phone:640, tablet:768, laptop:1024, normal:1025, large:1400, xlarge:1800 }
```

Marketing [WEB-CSS]:

```css
--header-height:72px;   /* 64px at <=640px */
--page-max-width:1024px; --prose-max-width:624px;
--homepage-max-width:calc(1344px + var(--homepage-outer-padding) * 2);
--page-padding-inline:24px; --page-padding-block:64px;
--grid-columns:12;      /* 8 at <=768px, 4 at <=640px */
--min-tap-size:44px;
/* container sizes */ 448px, 688px, 880px, 1136px
```

Marketing breakpoints by frequency: `max-width:640px` (126), `1024px` (61), `768px` (50), `1280px` (23). Hover styles are wrapped in `@media (any-hover:hover)` (63 on web; the app uses `(any-hover:hover) and (any-pointer:fine)`).

---

## 4. Borders and shadows

### 4.1 Borders

- Hairline token: `--border-hairline:1px`, switching to `.5px` at 2x pixel density [WEB-CSS]. The app does the same in JS: `thinPixel` is `0.5px` on retina, `1px` otherwise [APP-JS].
- On retina the app also swaps to slightly stronger "Thin" border colours to compensate for the thinner line (`bgBorderThin` uses a larger lightness offset when `thinPixel` is 0.5) [APP-JS].
- Borders are frequently drawn as `box-shadow: 0 0 0 1px <colour>` or `inset 0 0 0 1px` rather than `border`, so they do not affect layout [WEB-CSS, APP-CSS].
- Translucent borders: 5% and 8% white or black (`#ffffff0d`, `#ffffff14`, `#0000000d`, `#00000014`) [WEB-CSS]. App alpha borders: 10% black / 9% white [APP-COMPUTED].
- Separator in app menus: 12px tall block, `padding-block:6px`, a single hairline in `bgBorderFaintThin` [APP-JS].

### 4.2 Shadow recipes

App, generated [APP-JS]; `α(x)` is black at opacity `x`, scaled up slightly at high contrast:

```js
// light
shadowLow:    `0px 3px 6px -2px α(.02), 0px 1px 1px α(.04)`
shadowMedium: `0 6px 18px α(.02), 0 3px 9px α(.04), 0 1px 1px α(.04)`
shadowHigh:   `0 9px 48px α(.08), 0 6px 24px α(.10), 0 1px 1px α(.04)`
// dark
shadowLow:    `0px 0.5px 1px 1px α(.3)`
shadowMedium: `0 3px 8px α(.125), 0 2px 5px α(.125), 0 1px 1px α(.125)`
shadowHigh:   `0 4px 40px α(.10), 0 3px 20px α(.125), 0 3px 12px α(.125), 0 2px 8px α(.125), 0 1px 1px α(.125)`
// both
shadowBorder: `0 0 0 0.5px <bgBorder>`
focusShadow:  `0 0 0 1px <focusColor>`
shadowInset:  `0 1px 1px inset α(.07), 0 1px 3px inset α(.07), 0 2px 5px inset α(.10)`
```

Resolved on `/login`, light [APP-COMPUTED]:

```css
low:    0px 3px 6px -2px #00000005, 0px 1px 1px #0000000a;
medium: 0 6px 18px #00000005, 0 3px 9px #0000000a, 0 1px 1px #0000000a;
high:   0 9px 48px #00000014, 0 6px 24px #00000019, 0 1px 1px #0000000a;
```

Marketing [WEB-CSS]:

```css
:root{ --shadow-tiny/low/medium/high: 0px 0px 0px transparent; }   /* default: none */
[data-theme=dark]{  --shadow-low:0px 2px 4px #0000001a; --shadow-medium:0px 4px 24px #0003; --shadow-high:0px 7px 32px #00000059; }
[data-theme=light]{ --shadow-tiny:0px 1px 1px 0px #00000017; --shadow-low:0px 1px 4px -1px #00000017;
                    --shadow-medium:0px 3px 12px #00000017; --shadow-high:0px 7px 24px #0000000f; }
--shadow-stack-low (dark): 0px 8px 2px 0px #0000, 0px 5px 2px 0px #00000003, 0px 3px 2px 0px #0000000a,
                           0px 1px 1px 0px #00000012, 0px 0px 1px 0px #00000014;
```

Where each level is used in the app [APP-JS]: `low` on primary buttons, secondary buttons (with a hairline ring), and tooltips; `medium` on menus and popovers; `high` on modals.

[INFERRED] Shadows are stacks of two to five layers, each 2% to 12% opacity, always ending in a tight `0 1px 1px` contact layer. No single layer in light mode exceeds 10%. Elevation in dark mode comes mostly from a lighter surface plus a hairline ring, not from shadow.

---

## 5. Motion

Tokens (identical in both systems) [WEB-CSS, APP-CSS, APP-JS]:

```css
--speed-highlightFadeIn:0s;      /* hover/highlight appears instantly */
--speed-highlightFadeOut:.15s;   /* and fades out over 150ms */
--speed-quickTransition:.1s;
--speed-regularTransition:.25s;
--speed-slowTransition:.35s;     /* app only */
--ease-out-quad:cubic-bezier(.25,.46,.45,.94);   /* the default curve on the marketing site */
--ease-out-cubic:cubic-bezier(.215,.61,.355,1);
--ease-out-quart:cubic-bezier(.165,.84,.44,1);
--ease-out-quint:cubic-bezier(.23,1,.32,1);
--ease-out-expo:cubic-bezier(.19,1,.22,1);
--ease-in-out-quad:cubic-bezier(.455,.03,.515,.955);
/* plus the full in / out / in-out families for quad, cubic, quart, quint, expo, circ */
```

Asymmetric hover is implemented literally in the app button [APP-JS]:

```css
transition-property: border, background-color, color, opacity;
transition-duration: .15s;
/* on :hover, :active, [data-menu-open=true]: */ transition-duration: 0s;
```

Other measured durations:

- Marketing buttons: `.16s var(--ease-out-quad)` on border, background-color, color, box-shadow, opacity, filter, transform; press is `transform:scale(.97)` [WEB-CSS].
- Marketing menu popup: opacity and transform `80ms` in, `60ms` out, from `scale(.98)` [WEB-CSS].
- Marketing nav dropdown and mobile menu: `.18s`. Command palette dialog and overlay: `.175s var(--ease-out-quad)`; list height `80ms` [WEB-CSS].
- App checkbox: `80ms ease-out`. App input border: `.15s`. App avatar initials: `.25s ease-in-out` [APP-JS].
- Reduced motion: marketing gates entrance animations behind `@media (prefers-reduced-motion:no-preference)` (31 blocks); the app has a `transition-duration:.01ms!important` override [WEB-CSS, APP-CSS].

[INFERRED] Almost everything is 80 to 250ms. Durations above 350ms exist only for one-off illustrations.

---

## 6. Layering (z-index)

App [APP-JS]:

```js
{ elevated:10, stickyBar:30, detailsPaneBackdrop:80, detailsPane:90, sidebarBackdrop:95, sidebar:96,
  modalBackdrop:100, proTip:200, slideOverBackdrop:249, slideOver:250, fastCreate:300,
  popoverBackdrop:400, popover:500, toast:580, commandMenuBackdrop:599, commandMenu:600, peek:650,
  dialog:700, lightbox:701, toastAboveDialog:702, popoverBackdropInDialog:705, popoverInDialog:706,
  dndDragLayer:1000, tooltip:1100, skipToContent:1200, fullWindow:1300 }
```

Marketing [WEB-CSS]:

```css
--layer-1:1; --layer-2:2; --layer-3:3; --layer-footer:50; --layer-scrollbar:75; --layer-header:100;
--layer-overlay:500; --layer-popover:600; --layer-command-menu:650; --layer-dialog-overlay:699;
--layer-dialog:700; --layer-toasts:800; --layer-tooltip:1100; --layer-context-menu:1200;
--layer-skip-nav:5000; --layer-max:10000;
```

Both are named, sparse, and put each backdrop exactly one below its surface.

---

## 7. Focus

App [APP-CSS, APP-JS, APP-COMPUTED]:

```css
--focus-ring-color: <focusColor>;          /* #6d78d5 light, #5e69d1 dark */
--focus-ring-width: 1px;
--focus-ring-outline: var(--focus-ring-width) solid var(--focus-ring-color);
/* applied as */ outline: var(--focus-ring-outline);   /* only on :focus-visible */
/* offsets: 2px on filled buttons; calc(-1 * var(--focus-ring-width)) on tabs and rows; -1px on inputs */
/* some surfaces use a 2px ring: outline-width:2px; outline-offset:-2px; outline-color: controlPrimary */
/* dangerous buttons: outline-color = redBaseHover */
```

`focusColor` is the accent if it is saturated enough, otherwise it is forced to LCH `l:50,c:120` (dark) or `l:70,c:90` (light) at the accent hue [APP-JS].

Marketing [WEB-CSS]:

```css
*{ outline-color:#0000 }
:focus-visible{ outline-style:solid; outline-color:var(--focus-ring-color);
                outline-width:var(--focus-ring-width); outline-offset:var(--focus-ring-offset) }
:where(a:focus-visible,button:focus-visible){ border-radius:var(--radius-4) }
/* --focus-ring-width:2px; --focus-ring-offset:2px; colour: #5e6ad2 on dark, #0006 on light */
```

Keyboard-focused rows and menu items get a background (`bgFocus`) instead of a ring [APP-JS]. Focus is `:focus-visible` only; mouse clicks never draw a ring.

---

## 8. Component specs

### 8.1 Buttons: product app [APP-JS resolved, APP-COMPUTED]

Base:

```css
display:inline-flex; align-items:center; justify-content:center; white-space:nowrap; flex-shrink:0;
border-radius:9999px; font-weight:500; line-height:normal; padding-block:0;
border:<thinPixel> solid transparent; user-select:none; position:relative;
transition-property:border,background-color,color,opacity; transition-duration:.15s;  /* 0s on hover/active */
:disabled, [data-disabled=true] { opacity:.6; cursor:default }
```

Sizes:

| Size | Height | Min-width | Font | Padding-inline | With leading icon | Icon |
|---|---|---|---|---|---|---|
| small | 24px | 24px | 12px | 8px | 6px / 8px | 14px |
| medium | 28px | 28px | 12px | 10px | 8px / 10px | 14px |
| normal (default) | 32px | 32px | 13px | 12px | 10px / 12px | 16px |
| large | 44px | 32px | 13px | 18px | 14px / 16px | 16px |

- Touch devices bump each size one step: 28, 32, 36.
- Icon-to-label gap 6px; caret gap 5px. Icon-only buttons are square with 2px padding.
- The side with the icon gets 2px less padding than the text side (optical balance).

Variants (token names from 1.2):

| Variant | Background | Text | Border / shadow | Hover and active |
|---|---|---|---|---|
| primary | `controlPrimary` | `controlPrimaryLabel` | `shadowLow` | bg `controlPrimaryHover` |
| secondary | `controlSecondary` | `labelBase` | `0 0 0 <thin> bgBorderAlphaThin, shadowLow` | bg `controlSecondaryHover`; ring becomes `bgBorderSolidAlphaThin` |
| ghost | transparent | `labelBase` | `1px dashed` | bg `controlTertiaryHover`, text `labelTitle` |
| borderless | transparent | `labelBase` | none | bg `controlTertiaryHover`, text `labelTitle` |
| muted | transparent | `labelMuted` | none | bg `controlTertiaryHover`, text `labelBase` |
| link | transparent | `labelBase` | none | text `labelTitle` |
| dangerous | `redBase` | `controlPrimaryLabel` | none | bg `redBaseHover` |
| dangerous-borderless | transparent | `redText` | none | bg `redTint` |
| circle | (inherits) | `labelBase` | `border-radius:50%` | text `labelTitle` |
| tab | transparent | `labelMuted` | none | bg `controlTertiaryHover`; active tab uses `labelTitle` |

Hover and active use the same colour. An open menu holds its trigger in the hover state (`[data-menu-open=true]`). Focus ring: 1px outline, `outline-offset:2px` on filled variants.

Measured on `/login` [APP-COMPUTED]: both buttons 44px tall, 288px wide, padding `0 18px`, radius 9999px, 13px / 500. Primary `#6d78d5` with text `#fefeff` and shadow `0 3px 6px -2px rgba(0,0,0,.02), 0 1px 1px rgba(0,0,0,.04)`. Secondary `#fefeff` (light) or `#1b1b1c` (dark), no shadow on that page.

### 8.2 Buttons: marketing site [WEB-CSS, WEB-COMPUTED]

```css
.variant{ --button-corner-radius:var(--radius-rounded); font-weight:var(--font-weight-medium);
  font-size:var(--button-font-size); line-height:var(--button-height); height:var(--button-height);
  gap:var(--button-gap); padding:var(--button-padding); border-radius:var(--button-corner-radius);
  transition:.16s var(--ease-out-quad);
  transition-property:border,background-color,color,box-shadow,opacity,filter,transform }
.variant:disabled{ opacity:.5 }
.size-mini   { --button-height:24px; --button-icon-size:12px; --button-font-size:.75rem;   --button-padding:0 10px; --button-gap:4px }
.size-small  { --button-height:32px; --button-icon-size:16px; --button-font-size:.8125rem; --button-padding:0 12px; --button-gap:8px }
.size-medium { --button-height:40px; --button-icon-size:16px; --button-font-size:.8125rem; --button-padding:0 14px; --button-gap:8px }
.size-default{ --button-height:40px; --button-icon-size:18px; --button-font-size:.9375rem; --button-padding:0 16px; --button-gap:6px }
.size-large  { --button-height:44px; --button-icon-size:18px; --button-font-size:16px;     --button-padding:0 20px; --button-gap:6px }
.shape-square{ --button-corner-radius:var(--radius-4) }
```

| Variant | Rest | Hover | Active |
|---|---|---|---|
| invert (main CTA) | bg and 1px border `--color-button-invert-bg`, text `--color-bg-primary`, `--shadow-stack-low` (no shadow in light) | bg `--color-button-invert-bg-hover` | `scale(.97)` |
| primary | bg `--color-brand-bg`, text `--color-brand-text` | `filter:brightness(115%)` | `brightness(98%)`, `scale(.97)` |
| secondary | bg `--color-bg-translucent`, `backdrop-filter:blur(4px)`, shadow `inset 0 0 0 1px #ffffff08, inset 0 1px #ffffff0a, 0 0 0 1px #0009, 0 4px 4px #0000001a`; light: bg `#fff`, `0 0 0 1px #00000014, var(--shadow-low)` | bg `--color-bg-level-3` | same, `scale(.97)` |
| tertiary | 1px border `--color-bg-secondary`, bg primary, text tertiary | text primary, bg and border `--color-bg-tertiary` | quaternary, `scale(.97)` |
| ghost | transparent, text tertiary | text primary, bg `--color-bg-quaternary` | bg quinary, `scale(.97)` |
| inline | text `--color-link-primary`, padding-inline 8px, margin-left -8px | text primary | `scale(.97)` |

Measured: "Get started" is 44px tall, `0 20px`, 16px / 510, `#e5e5e6` background, `#08090a` text, pill. Header "Sign up" is 32px, `0 12px`, 13px / 510.

### 8.3 Inputs [APP-JS resolved]

```css
padding: 6px 12px; height: 32px;            /* 36px on touch */
background: <bgBase>; border-radius: 8px; font-size: .8125rem;
border: <thinPixel> solid <bgBorderSolidThin>;   /* theme token inputBorder: 1px solid bgBorder */
color: <labelTitle>;  :disabled { color: <labelMuted> }
::placeholder { color: <labelFaint> }
transition: border .15s;                    /* 0s on hover/active */
font-feature-settings: "calt" 0;
outline-offset: -1px;                       /* focus ring sits on the border */
/* hover: border-color steps to a caller-supplied hover colour */
textarea { height: 64px; resize: none }
select   { padding: 6px 24px 6px 12px; background: <controlSecondary>; caret 24x24 }
select.small { height: 24px; font-size: .75rem; padding-block: 3px }
```

Checkbox: 14x14 (small 12x12), radius 3px, 1px border `bgBorderStrong`; checked fills `controlPrimary`; indeterminate fills `labelFaint`; disabled `opacity:.5`; `80ms ease-out`. Radio: 16x16.

### 8.4 Menus, popovers, context menus [APP-JS resolved]

```css
/* container */ border-radius:10px; box-shadow:<shadowMedium>; color:<labelBase>; font-size:.8125rem; padding:4px 0;
/* item */      height:32px; padding:0 14px; gap:8px; display:flex; align-items:center; white-space:nowrap;
                color:<labelBase>;  [data-active],[data-focused=true]{ color:<labelTitle> }
                icons: <labelMuted>, becoming <labelTitle> when the row is focused; 16px icon column
/* highlight */ ::after{ position:absolute; inset:0 4px; border-radius:6px; background:<bgFocus>; z-index:-1 }
/* disabled */  opacity:.5
/* separator */ height:12px; padding-block:6px; one hairline in <bgBorderFaintThin>
/* submenu caret */ font-size:6px; color:<labelFaint>
/* label wrapper */ max-width:400px
/* popover */   border-radius:12px; box-shadow:<shadowMedium>; overflow:hidden
```

Menus are rendered in `menuTheme` (base surface stepped one level, see 1.4).

Marketing menu, for comparison [WEB-CSS]: radius 14px, `padding:5px 0`, bg `#08090ae6` (light `#ffffffe6`) with `backdrop-filter:blur(20px)`, border `1px solid #ffffff14` (light `#00000014`), shadow `0 8px 32px #08090a` (light `0 8px 32px #08090a0d`), `min-width:175px`. Item 32px, `padding:0 15px`, 13px / 450, gap 8px; highlight is a `::before` inset `0 5px`, radius 8px, bg `#ffffff14` (light `#0000000d`), pressed `#ffffff21`.

### 8.5 Command palette

App [APP-JS]: positioned from the top at `modalMargin` = `13vh`; `padding-inline:16px`; backdrop z 599, content z 600; a centred variant uses `padding-bottom:36px`. The list and row internals live in a lazily loaded chunk I did not fetch.

Marketing site's own palette (same pattern, real shipped CSS) [WEB-CSS]:

```css
.dialog{ top:13vh; left:50%; transform:translate(-50%); width:100%; max-width:min(720px,100vw - 32px);
  max-height:min(73vh,500px); border-radius:12px; background:var(--color-bg-level-1);
  border:1px solid var(--color-border-translucent);
  box-shadow:0 4px 40px #0000001a,0 3px 20px #00000020,0 3px 12px #00000020,0 2px 8px #00000020,0 1px 1px #00000020;
  animation:scaleIn .175s var(--ease-out-quad) }
.input{ height:46px; padding:0 18px; font-size:.9375rem; border:none;
  border-bottom:1px solid var(--color-border-translucent); caret-color:var(--color-brand-bg) }
.groupHeading{ height:30px; padding-inline:12px; font-size:.75rem; font-weight:510; color:tertiary }
.list{ padding:6px }
.item{ min-height:46px; padding:8px 12px; gap:12px; font-size:.8125rem; color:secondary; icon 16px tertiary }
.item[aria-selected=true]{ color:primary }  ::after{ inset:2px 0; border-radius:8px; background:var(--color-bg-level-3) }
.shortcut span{ min-width:20px; height:20px; padding:0 4px; font-size:11px; font-weight:510;
  color:tertiary; border:1px solid var(--color-border-translucent); border-radius:3px }
```

The dark box-shadow here is the same five-layer recipe as the app's dark `shadowHigh` (same offsets and blurs; alphas differ by one hex step).

### 8.6 Tooltip [APP-JS resolved]

```css
border-radius:8px; box-shadow:<shadowLow>; padding:5px 8px; font-size:.6875rem (11px);
color:<labelBase>; max-width:520px; word-break:break-word; z-index:1100;
/* trailing shortcut: gap 8px, margin-right:-3px; leading shortcut: margin-left:-3px, margin-right:4px */
```

### 8.7 Keyboard-shortcut hints [WEB-CSS]

```css
kbd{ min-width:24px; padding:3px 6px; margin:0 1px; border-radius:5px; font-size:.8em; font-weight:510;
     line-height:normal; text-align:center; background:var(--color-bg-primary);
     box-shadow:var(--shadow-tiny), 0 0 0 1px var(--color-border-tertiary) }
/* inside a button */ min-width:20px; height:20px; padding:0 4px; border-radius:5px; font-size:.8em; no shadow;
                      background: translucent (#ffffff26 dark, #00000014 light); hidden on touch and <=640px
/* in command palette rows */ 20x20, radius 3px, 11px/510, 1px translucent border, no fill
```

The app's own key-cap component was not located in the startup bundles.

### 8.8 Modal / dialog [APP-JS resolved]

```css
/* backdrop */ position:fixed; inset:0; background:<bgModalOverlay>;   /* black 25% light, 40% dark */
/* container (full-size variant) */ width:calc(100vw - 66px); height:calc(100dvh - 66px);
   background:<bgBase>; border:1px solid <bgBorder>; border-radius:8px; box-shadow:<shadowHigh>; overflow:hidden
/* header content */ padding:12px 16px; close button absolutely placed at right:16px
```

No backdrop blur on app modals. (The marketing site does blur one drawer overlay: `backdrop-filter:blur(24px)`.)

### 8.9 Sidebar and navigation

App values confirmed [APP-JS]: `sidebarPadding:12`, `sidebarPrimaryButtonSize:28`, `mainPageMargin:8`, `mainContentBorderRadius:12`, tab bar 42px with 26px tabs; hover fill `sidebarLinkBg`, active fill `sidebarLinkBgActive`; section action buttons hidden at `opacity:0` and revealed on hover or focus over `.15s`. The sidebar is rendered in its own `sidebarTheme`. The sidebar item component's height and padding are in a chunk I did not fetch.

The marketing homepage contains a hand-built replica of the app UI. These are Linear's own numbers but from the replica, not the live app [WEB-CSS]:

```css
.navItem{ height:28px; padding-inline:7px; gap:8px; border-radius:8px; font-size:12px; font-weight:510;
  color:var(--color-text-secondary) }           /* icon colour: text-quaternary */
.navItem[data-active=true]{ background:#ffffff0a }   .navItem:hover{ background:#ffffff05 }
.navItems{ gap:2px }   .sidebar{ padding:8px 16px 16px 8px }
.sectionHeader{ font-size:11px; line-height:14px; padding:4px 0 4px 6px; colour muted }
.newIssueButton, .searchButton{ 28x28, pill }   workspace switcher: height 28px, radius 8px, gap 6px
```

Marketing header [WEB-CSS, WEB-COMPUTED]: fixed, 72px tall (64px mobile), `backdrop-filter:blur(20px)`, bg `#0b0b0bcc`, `border-bottom:1px solid #ffffff14`, z 100. Nav links 32px tall, `padding:0 12px`, 13px / 400, pill, colour tertiary `#8a8f98` → primary on hover with an 8% white fill; gap 8px; 1px x 16px divider.

### 8.10 Lists, rows, tables

- App row heights [APP-JS]: issue row 44px, list group header 36px, project row 48px (58px with description).
- Replica issue list [WEB-CSS]: row 40px, `margin-inline:8px`, hover is a `::before` fill `#ffffff08` with radius 8px (the row is inset; highlight does not touch the panel edge); group header 36px, radius 8px, bg `#ffffff05`, `padding:8px`; status icon slot 16x16; avatar slot 24x24; ID column 72px; date column 40px right-aligned; `font-variant-numeric:lining-nums tabular-nums`.
- Pricing comparison table [WEB-CSS]: rows 44px (48px at ≤1024px), no cell borders, hover is a `::before` fill `--color-bg-level-2` with radius 6px that appears instantly and fades out over `.15s` (`--speed-highlightFadeIn/Out`); sticky header gains bg, blur, and a bottom border only when stuck.
- Settings list items [APP-CSS]: radius 10px, `padding:12px 16px`, min-height 60px, gap 12px.

### 8.11 Cards, badges, pills, avatars

- Marketing card [WEB-CSS]: `border-radius:16px`, `padding:32px 24px` (24px at ≤768px), bg `--color-bg-level-1`, border drawn as a `::after` overlay `1px solid var(--color-border-translucent)`, hover `filter:brightness(110%)`, active `scale(.99)`. No shadow.
- Badge / pill [WEB-CSS]: height 24px (small 22px), pill radius, hairline border, 12px / 14px line-height / 510 (small 10px), colour tertiary, gap 6px, 16px avatar slot. Label chip in the replica list: height 24px, `padding:4px 8px 4px 6px`, gap 4px, with a 9px colour dot.
- App inline chips and mentions: radius `0.35em`, border via `box-shadow: 0 0 0 <thin> <colour> inset` [APP-CSS].
- App avatar: circle; initials white on a generated colour; inactive = `opacity(.5) grayscale()`; invite = 1px dashed border [APP-JS].
- App overlay badge on media: radius 6px, `padding:6px 10px`, 60% surface colour with `backdrop-filter:blur(12px)` [APP-JS].

---

## 9. Principles from Linear's own writing [ARTICLE]

**"How we redesigned the Linear UI (part II)"**, 2024-03-28. https://linear.app/now/how-we-redesigned-the-linear-ui

- Goal: "reduce visual noise, maintain visual alignment, and increase the hierarchy and density of navigation elements."
- Theme system: "instead of having to define 98 specific variables for each theme, we defined three: base color, accent color, and contrast." This matches the generator in 1.4.
- LCH over HSL because it is perceptually uniform: "a red and a yellow color with lightness 50 will appear roughly equally light to the human eye."
- The contrast variable exists to produce high-contrast accessibility themes automatically (bundle presets at contrast 90 agree).
- Karri Saarinen explored "mostly … with opacities of black and white," which exposed elevation and hierarchy relationships.
- A "more neutral and timeless appearance … achieved by limiting how much chrome (blue in our case) was used in the calculations." Text and neutral icons made darker in light mode, lighter in dark mode.
- "We started using Inter Display to add more expression to our headings … and kept using regular Inter for the rest."
- Alignment work in sidebar and tabs "isn't something you'll immediately see but rather something that you'll feel."
- Leaned on Apple platform conventions to feel native.

**"A calmer interface for a product in motion"**, 2026-03-12. https://linear.app/now/behind-the-latest-design-refresh

- "Don't compete for attention you haven't earned": navigation should recede; the sidebar was made "a few notches dimmer"; tabs more compact; fewer and smaller icons; coloured team-icon backgrounds removed.
- "Structure should be felt not seen": borders and separators had "quietly proliferated"; fewer of them, softer contrast, rounder.
- Default palette moved from "a cool, blue-ish hue" toward "a warmer gray that still feels crisp, but less saturated."
- "If most people don't immediately notice what changed, that's probably a good sign."

**"A design reset (part I)"**, 2024-03-27. https://linear.app/now/a-design-reset
Design debt accumulates from incremental shipping and should be paid in whole-product sweeps every two to three years, because "the product experience is holistic."

**"Quality Wednesdays"**, 2025-08-13. https://linear.app/now/quality-wednesdays
The canonical defect: one button "darkened instantly when the mouse moved away, rather than fading out over 150 milliseconds as it should have." This is `--speed-highlightFadeOut:.15s` in the CSS. Fixes are small (under an hour), e.g. standardising the sizes of adjacent buttons, or stopping a composer from changing height.

**"Invisible details"**, 2020-09-17. https://linear.app/now/invisible-details
Submenus tolerate diagonal mouse travel via a safe-area triangle. The tooltip code in the bundle carries the same clip-path safe-area logic [APP-JS]. Context menus double as a way to teach keyboard shortcuts by showing them beside each action.

**"Settings are not a design failure"**, 2022-02-02. https://linear.app/now/settings-are-not-a-design-failure
Get product defaults right; expose preferences (theme, etc.) where a designer should not hold a strong opinion.

**"Why is quality so rare?"**, 2025-05-27. https://linear.app/now/why-is-quality-so-rare
Craft is "deliberate attention"; judgment over A/B tests ("Does this feel right?" rather than "Does it convert?").

**Linear Method, Principles**. https://linear.app/method/introduction
"Purpose-built", "Aim for clarity" ("Don't invent terms … Projects should be called projects"), "Say no to busy work", "Simple first, then powerful", "Decide and move on".

Also found, not mined in depth: https://linear.app/now/linear-liquid-glass (custom glass material on iOS; cites Apple's consumer Aqua vs professional ProKit split), https://linear.app/now/design-for-the-ai-age ("form follows function"), https://linear.app/now/design-is-more-than-code, https://linear.app/now/output-isn-t-design.

---

## 10. What they deliberately do not do

Each item is backed by what is in the CSS.

1. **One accent hue.** The only brand colour is indigo/violet (`#5e6ad2` family). The seven other hues are status colours, defined as fixed LCH triples and used for state, labels, and tints [APP-JS, WEB-CSS].
2. **The accent is rationed.** In the app it fills primary buttons, checked checkboxes, focus rings, and tints the selected-row background by 5% (dark) or 18% (light). On the marketing site the main call to action is a neutral near-white or near-black pill, not the accent [WEB-COMPUTED].
3. **No pure black on pure white.** See 1.1 and 1.3.
4. **No heavy weights.** Display headings render at 510. Marketing bold is 680, app bold 700, and both are rare. Hierarchy in the app is 450 vs 500 at the same size [WEB-COMPUTED, APP-JS].
5. **No large type inside the product.** The app scale has 11, 12, 13, 15, 18, 20, 24, 36px. Controls are 13px [APP-JS].
6. **No single heavy shadow.** Every shadow is a multi-layer stack at 2% to 12.5% per layer. The marketing site's shadow tokens default to `0 0 0 transparent`. Cards have no shadow, only a translucent 1px border [WEB-CSS, APP-JS].
7. **No decorative gradients in app UI chrome.** In the app stylesheet, gradients appear in `background-image` (141), `mask-image` (187 incl. prefixed), and `background` (7). I did not classify all 141 `background-image` uses; the ones I read were scroll-edge fades, editor rules, and skeleton/progress effects. None of the button, input, menu, tooltip, or modal rules resolved in section 8 contains a gradient. Treat "no gradients in the app" as mostly, not absolutely, verified.
8. **The marketing site does use gradients.** 234 `linear-gradient` and 119 `radial-gradient` occurrences. 190 of them are masks (edge fades); 71 are `background` / `background-image` (illustrations, glows, the header's fade). The marketing site is not gradient-free; its buttons, cards, and text are.
9. **Blur is rare in the app.** The string `backdrop-filter` occurs 20 times in the app CSS (prefixed and unprefixed counted separately, so about 10 rules) versus 37 in the smaller marketing CSS. App menus, modals, and tooltips are opaque.
10. **No visible structure where spacing will do.** Rows have no dividers; hover and selection are inset rounded fills. Menu separators are a single faint hairline. This is stated policy in the 2026 post and visible in 8.4 and 8.10.
11. **No slow or bouncy motion on controls.** Control transitions are 80 to 250ms on ease-out curves. Two overshoot curves exist in the app CSS (`cubic-bezier(.34,1.56,.64,1)`, `(.34,1.4,.64,1)`), each once.
12. **No hover fade-in.** Highlight in is 0s; out is 150ms.
13. **No focus ring on mouse click.** `:focus-visible` only.
14. **No mixed corner language.** Buttons are pills; everything else is a small rounded rectangle whose radius scales with its size.
15. **No per-theme hand-tuned palettes.** Three inputs generate everything, including elevated, menu, sidebar, and selected sub-themes.

---

## 11. Not reachable or not verified

- **The logged-in app was not accessed.** No account was used. Everything tagged [APP-JS] comes from the two startup bundles and the stylesheet that `/login` serves to anyone. Everything tagged [APP-COMPUTED] is the logged-out login screen.
- **Lazily loaded app chunks were not fetched.** Missing as a result: the sidebar item component (height, padding, icon size), the issue-list row internals, the command palette's list and row styles, toast, the app's key-cap component, tabs beyond the `tab` button variant, board cards, and the property/label pills. Sections 8.5, 8.7, 8.9, and 8.10 fall back to the marketing site's shipped CSS (its own palette, and its replica of the app UI) and say so.
- **Which preset is the logged-in default** is not established. The bundle contains several light and dark presets with minified names. The login screen's resolved neutrals (`#f8f8f9`, `#111212`) match the near-achromatic presets, not the bluer "system default" inputs (`[9.47, 6.57, 282.86]`), so the logged-in default may differ slightly from the table in 1.3.
- **Retina values.** All computed values were taken at DPR 1. At 2x, hairlines are 0.5px and "Thin" border colours shift (see 4.1). Those branches were read in source, not measured.
- **Usage frequency inside the app** cannot be derived from atomic CSS.
- **Hover, active, and focus states were read from CSS rules**, not triggered and measured in the browser.
- **Mobile apps (iOS/Android)** were not examined; the Liquid Glass post is the only source.
- **`/features`, `/pricing`, `/changelog`, `/method`** were mined for CSS only; computed styles were taken on the homepage and `/login` alone.
- **Asset hashes will rotate.** File names such as `style-KRuU1wE7.css` and class hashes such as `S36ykG_` are specific to the build served on 2026-11-25.
