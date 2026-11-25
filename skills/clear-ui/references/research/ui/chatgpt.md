# ChatGPT / OpenAI visual design teardown

Captured 2026-11-25. Every value is tagged with where it came from:

- **[LIVE]** computed styles read in a real browser (Playwright, 1440x757, DPR 1) on `https://chatgpt.com/` logged out, plus one anonymous chat turn. This build is OpenAI's lightweight logged-out shell (`/unauth-mweb/assets/stylex-*.css`, StyleX atomic classes, no named custom properties).
- **[APP-CSS]** static read of the full-app stylesheet `https://chatgpt.com/cdn/assets/afdb142aa018.css` (2.2 MB), which `curl` received from `chatgpt.com/`. Declared token values only; nothing was rendered, and the file carries several theme presets, so where a token has multiple declarations I list them and do not claim which one wins.
- **[SDK]** `openai/apps-sdk-ui` v0.2.2 (MIT), `main` at commit `0f00143` (2026-05-05), read from GitHub raw. OpenAI describes it as the way to "match the ChatGPT design system".
- **[DOCS]** `https://developers.openai.com/plugins/concepts/ui-guidelines.md` (the old `/apps-sdk/concepts/design-guidelines` and `/ui-guidelines` URLs both redirect here) and `https://openai.com/brand/`.
- **[INFERRED]** my reading, not a measured or published value.

The SDK gray scale, type scale, radius scale, shadow geometry and easing curves appear byte-for-byte in [APP-CSS], so the SDK is a faithful public copy of the app's primitives. Component-level numbers differ in places (the live site is rounder than the SDK defaults); both are given.


---

## 1. Colour tokens

### 1.1 Gray scale (the whole UI is built from this) [SDK = APP-CSS]

Light value, dark value. The scale is mirrored: `gray-N` in dark is roughly `gray-(1000-N)` in light.

| token | light | dark | | token | light | dark |
|---|---|---|---|---|---|---|
| gray-0 | `#ffffff` | `#0d0d0d` | | gray-500 | `#5d5d5d` | `#5d5d5d` |
| gray-25 | `#fcfcfc` | `#101010` | | gray-550 | `#4f4f4f` | `#767676` |
| gray-50 | `#f9f9f9` | `#131313` | | gray-600 | `#414141` | `#8f8f8f` |
| gray-75 | `#f3f3f3` | `#161616` | | gray-650 | `#393939` | `#9f9f9f` |
| gray-100 | `#ededed` | `#181818` | | gray-700 | `#303030` | `#afafaf` |
| gray-150 | `#dfdfdf` | `#1c1c1c` | | gray-750 | `#282828` | `#b9b9b9` |
| gray-200 | `#cdcdcd` | `#212121` | | gray-800 | `#212121` | `#cdcdcd` |
| gray-250 | `#b9b9b9` | `#282828` | | gray-850 | `#1c1c1c` | `#dcdcdc` |
| gray-300 | `#afafaf` | `#303030` | | gray-900 | `#181818` | `#ededed` |
| gray-350 | `#9f9f9f` | `#393939` | | gray-925 | `#161616` | `#f3f3f3` |
| gray-400 | `#8f8f8f` | `#414141` | | gray-950 | `#131313` | `#f3f3f3` |
| gray-450 | `#767676` | `#4f4f4f` | | gray-1000 | `#0d0d0d` | `#ffffff` |

Two things to copy: the darkest ink is `#0d0d0d`, not `#000`; and the grays are perfectly neutral (R=G=B), no blue or warm tint.

### 1.2 Alpha scale [SDK]

`--alpha-base` is `#0d0d0d` in light and `#ffffff` in dark. Steps: 0, 2, 4, 5, 6, 8, 10, 12, 15, 16, 20, 25, 30, 35, 40, 50, 60, 70 percent, each `color-mix(in oklab, base N%, transparent)`. Borders, hover fills and the user bubble are all alpha-of-ink, so they sit correctly on any surface.

### 1.3 Semantic tokens [SDK; same names in APP-CSS]

| role | token | light | dark |
|---|---|---|---|
| page surface | `--color-surface` | `#ffffff` | `#212121` |
| secondary surface | `--color-surface-secondary` | `#f9f9f9` | `#181818` |
| tertiary surface | `--color-surface-tertiary` | `#f3f3f3` | `#131313` |
| elevated (menus, composer) | `--color-surface-elevated` | `#ffffff` | `#303030` |
| elevated secondary | `--color-surface-elevated-secondary` | `#f9f9f9` | `#414141` |
| text | `--color-text` | `#0d0d0d` | `#ffffff` |
| text secondary | `--color-text-secondary` | `#5d5d5d` | `#afafaf` |
| text tertiary / placeholder | `--color-text-tertiary` | `#8f8f8f` | `#8f8f8f` |
| text inverse | `--color-text-inverse` | `#ffffff` | `#0d0d0d` |
| text disabled | `--color-text-disabled` | `#8f8f8f` | `#5d5d5d` |
| border subtle | `--color-border-subtle` | ink 5% | white 6% |
| border | `--color-border` | ink 10% | white 12% |
| border strong | `--color-border-strong` | ink 15% | white 20% |
| disabled fill / border | `--color-background-disabled` / `--color-border-disabled` | ink 5% / 6% | white 5% / 6% |
| focus ring | `--color-ring` | `#0169cc` | `#0285ff` |
| link (primary) | `--link-primary-text-color` | `#0169cc`, hover `#013566` | `#339cff`, hover `#0285ff` |
| scrollbar | `--scrollbar-color` | ink 30% | white 30% |

Dark mode gets lighter as it elevates (`#212121` page, `#303030` elevated, `#414141` elevated-secondary); light mode stays white and relies on a hairline plus shadow.

[APP-CSS] differences worth knowing: `--color-text-secondary` dark is `#cdcdcd` in one declaration; `--color-border` has a literal `#0000001a` / `#ffffff26` declaration (black 10% / white 15%); `--color-border-heavy` is `#00000026` / `#fff3`.

### 1.4 The primary ("black") colour family [SDK]

| | light | dark |
|---|---|---|
| solid bg | `#181818` | `#f3f3f3` |
| solid hover | `#303030` | `#ededed` |
| solid active | `#414141` | `#dcdcdc` |
| solid text | `#ffffff` | `#0d0d0d` |
| soft bg (alpha) | ink 8%, hover 12%, active 16% | white 12%, hover 16%, active 20% |
| soft bg (opaque) | `#ededed`, hover `#dfdfdf`, active `#cdcdcd` | `#303030`, `#393939`, `#414141` |
| outline border | ink 16%, hover 20% | white 25%, hover 30% |
| outline hover fill | ink 2%, active 4% | white 4%, active 6% |
| ghost hover fill | ink 8%, active 12% | white 12%, active 16% |

Hover on the black button goes lighter, not darker. [APP-CSS] has `--color-background-primary-solid` hover as literal `#333` / `#ededed`, and one declaration sets the solid to `gray-1000` (`#0d0d0d`), which is what the live site renders.

### 1.5 Status / accent colours [SDK]

Seven hues exist (green, red, pink, orange, yellow, purple, blue), each 25 to 1000 plus six alpha steps. Used values:

| role | solid bg | text on tint (light / dark) | soft bg |
|---|---|---|---|
| danger | `#e02e2a` (hover `#ba2623`) | `#ba2623` / `#fa423e` | `#fa423e` at 16% |
| success | `#00a240` / dark `#008635` | `#008635` / `#04b84c` | `#04b84c` at 15% |
| warning | `#e25507` | `#923b0f` / `#fb6a22` | `#fb6a22` at 16% |
| caution | `#ba8e00` | `#6e5400` / `#ffc300` | `#ffc300` at 15% |
| info | `#0285ff` (hover `#0169cc`) | `#004f99` / `#339cff` | `#0285ff` at 13% |
| discovery | `#924ff7` | `#6b3ab4` / `#be95fa` | `#924ff7` at 15% |

Status "surface" (Alert) backgrounds are only 4 to 8 percent tint in light. Solid text on every status colour is white.

### 1.6 What the live logged-out page actually paints [LIVE]

| element | light | dark (`prefers-color-scheme: dark`) |
|---|---|---|
| page + sidebar bg | `#fcfcfc` (gray-25) | `#000000` |
| text | `#0d0d0d` | `#ffffff` |
| secondary text (footer links, action icons) | `#5d5d5d` | `#cdcdcd` |
| placeholder | `#8f8f8f` | `#cdcdcd` |
| composer bg | `#ffffff` | `#212121` |
| soft button bg | `#f3f3f3` | not measured |
| code block bg | `#f3f3f3` | not measured |
| card bg (cookie notice) | `#ffffff` | `#303030` |
| hairlines | black 5%, 10%, 20% | white 10%, 15%, 20% |
| primary button | bg `#0d0d0d`, text `#fff` | bg `#fff`, text `#0d0d0d` |

Colour census of the landing page: 3 text colours (`#0d0d0d` x16 text nodes, `#5d5d5d` x11, `#fff` x2), 5 background colours (`#fcfcfc`, `#fff`, `#f3f3f3`, `#e8e8e8`, `#0d0d0d`), zero `background-image` gradients.

**One accent is present, and it is blue.** In this build the send button disc is `rgb(53,102,240)` (`#3566f0`), the user bubble is `rgb(237,243,254)` (`#edf3fe`) with text `rgb(36,81,218)` (`#2451da`). [APP-CSS] has the matching hooks: `--color-accent: var(--chatgpt-blue-400)` = `#3a83f7`, `--color-background-composer-primary: var(--messaging-send-background, var(--color-background-primary-solid))`. The neutral fallback in both [SDK] and [APP-CSS] is `--user-message-background-color: ink 5% / white 8%` with normal text colour. So "black send button, gray bubble" is the token default and a blue accent is what was served to me today. I could not tell whether that is an A/B test, a new default, or specific to the logged-out shell.

---

## 2. Typography

### 2.1 Families

```css
/* [SDK] */
--font-sans: ui-sans-serif, -apple-system, system-ui, "Segoe UI", "Noto Sans", "Helvetica",
  "Arial", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
--font-mono: ui-monospace, "SFMono-Regular", "SF Mono", "Menlo", "Monaco", "Consolas",
  "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace;

/* [LIVE] computed on body */
font-family: -apple-system-body, ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica,
  "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";

/* [LIVE] inline code */
font-family: "SF Mono", SFMono-Regular, ui-monospace, consolas, "liberation mono", ...;
```

No web font is loaded for UI text: the only `@font-face` rules in [APP-CSS] are KaTeX math fonts. [APP-CSS] does declare `--font-openai-sans: "OpenAI Sans", var(--font-sans-default)` as an option, and openai.com/brand describes OpenAI Sans (five weights: Light, Regular, Medium, Semibold, Bold) as the brand typeface, but the product chat UI I loaded renders in the system font.

### 2.2 Scale [SDK = APP-CSS]

| token | size / line-height | weight |
|---|---|---|
| heading-5xl | 72 / 72 | 600 |
| heading-4xl | 60 / 60 | 600 |
| heading-3xl | 48 / 48 | 600 |
| heading-2xl | 36 / 42 | 600 |
| heading-xl | 32 / 38 | 600 |
| heading-lg | 24 / 28 | 600 |
| heading-md | 20 / 26 | 600 |
| heading-sm | 18 / 26 | 600 |
| heading-xs | 16 / 24 | 600 |
| text-lg | 18 / 29 | 400 |
| text-md (body) | 16 / 24 | 400 |
| text-sm (UI default) | 14 / 20 | 400 |
| text-xs | 12 / 18 | 400 |
| text-2xs | 10 / 14 | 400 |
| text-3xs | 8 / 12 | 400 |

Control font sizes: sm 12px, md 14px, lg 16px. Almost every control uses 14px.

### 2.3 Weights

- [SDK] 400 normal, 500 medium, 600 semibold, 700 bold. Buttons 500. Badges 600. `b, strong` are 600, not 700. `html { font-synthesis-weight: none; -webkit-font-smoothing: antialiased; }`.
- [APP-CSS] also declares 510 and 590 (SF-style optical weights) for medium/semibold in one preset, plus a 300.
- [LIVE] landing page text nodes by weight: 400 x21, 500 x3, 600 x4, 700 x1. Headline `h1` is weight **400**.

### 2.4 Letter-spacing

- [SDK] all three tracking tokens (`--font-tracking-tight/normal/wide`) are `0em`. Markdown `h1` alone uses `-0.04rem`.
- [APP-CSS] `--tracking-tight: -.025em`, `--tracking-wide: .025em`; small UI labels use tiny negative px values (`-.08px` at 13px, `-.15px` at 14px, `-.31px` at 15px, `-.26px` at 22px).
- [LIVE] 14px buttons `-0.08px`, 14px nav rows `-0.15px`, 12px footer `-0.1px`, 24px headline `+0.07px`, body `normal`.

### 2.5 Live text styles [LIVE]

| element | size / lh | weight | colour |
|---|---|---|---|
| empty-state headline `h1` | 24 / 28 | 400 | `#0d0d0d` |
| assistant paragraph | 16 / 26 | 400 | `#0d0d0d` |
| assistant `h2` | 18 / 28 | 600 | `#0d0d0d` |
| user message | 16 / 24 | 400 | (accent, see 1.6) |
| composer input | 17 / 24 | 400 | `#0d0d0d` |
| nav row | 14 / 20 | 400 | `#0d0d0d` |
| pill button label | 14 / 20 | 600 (solid, outline), 500 (soft) | |
| table `th` / `td` | 14 / 20 | 600 / 400 | |
| inline code | 14.88 (0.93em) | 500 | |
| footer legal | 12 / 16 | 400 | `#5d5d5d` |
| dialog title (hidden in DOM) | 20 / 25 | 600 | |

---

## 3. Spacing, sizing, radius

### 3.1 Spacing [SDK = APP-CSS]

Base unit `--spacing: 0.25rem` (4px); everything is `calc(var(--spacing) * n)`, with half steps (1.5 = 6px, 2.5 = 10px) used freely.

### 3.2 Control sizes [SDK]

| size | height | gutter | font | icon | radius (non-pill) |
|---|---|---|---|---|---|
| 3xs | 22 | 6 | 12 | 14 | 6 |
| 2xs | 24 | 8 | 12 | 16 | 6 |
| xs | 26 | 8 | 14 | 16 | 6 |
| sm | 28 | 10 | 14 | 18 | 6 |
| **md (default)** | **32** | **12** | **14** | **18** | **8** |
| lg | 36 | 12 | 14 | 18 | 8 |
| xl | 40 | 14 | 14 | 18 | 10 |
| 2xl | 44 | 14 | 16 | 20 | 12 |
| 3xl | 48 | 16 | 16 | 20 | 12 |

Pill controls multiply the gutter by `--control-gutter-pill-scaling: 1.33` (md: 12 -> 15.96px side padding).

### 3.3 Radius

| token [SDK = APP-CSS base] | value |
|---|---|
| 2xs / xs / sm / md / lg | 2 / 4 / 6 / 8 / 10 px |
| xl / 2xl / 3xl / 4xl | 12 / 16 / 20 / 24 px |
| full | 9999px |

Usage: buttons default to `pill = true` (full radius) [SDK `Button.tsx`]; menus and popovers 12 [SDK] or 16 to 20 [APP-CSS]; tooltip 8 [SDK] or 16 [APP-CSS]; composer `--composer-radius: 24px` [SDK], 22 to 28 [APP-CSS]; code block 8 [SDK]; badges 4 to 6; checkbox 4; menu item = menu radius minus menu gutter (concentric corners).

[LIVE] radii found on the landing page: `999px` x11 (every button), `10px` x8 (nav rows), `28px` (composer), `24px` (code block, attachment tile), `30px` (notice card), `22px` (user bubble). Nothing has a sharp corner and nothing uses a 4 to 8px "default card" radius.

### 3.4 Breakpoints and widths

- [SDK] xs 380, sm 576, md 768, lg 1024, xl 1280, 2xl 1536 px, mobile-first `min-width`.
- [APP-CSS] Tailwind defaults: sm 40rem, md 48rem, lg 64rem, xl 80rem, 2xl 96rem; xs 20rem.
- [LIVE stylesheet] the dominant query is `width >= 48rem` (768px, 229 uses) and its inverse; then 900px, 600px, 1024px. Hover styles are gated by `(hover: hover) and (pointer: fine)`.
- Content widths: thread column **768px** [LIVE]; `--thread-content-max-width: 48rem` with 40rem / 42rem variants [APP-CSS]; `--chat-max-width: 800px` [SDK]. Sidebar **260px** [LIVE]; `clamp(240px, 275px, min(520px, 100vw - 320px))` [APP-CSS]. Dialog 250 to 450px [SDK]. Popover and menu min-width 300px, popover max 700px [SDK]. Tooltip max 300px [SDK]. Toast max `min(360px, 100vw - 32px)` [APP-CSS].

---

## 4. Borders and shadows

### 4.1 Borders

- Hairline token: `--hairline: 1px`, dropping to `0.5px` at `>= 1.5dppx` [SDK].
- Controls draw their outline as an inset box-shadow, not a `border`, so the box size never changes:
  ```css
  /* [SDK] outline button / input / badge / radio */
  box-shadow: 0 0 0 1px var(--color-border-primary-outline) inset;  /* ink 16% */
  ```
- [LIVE] every visible line on the landing page: sidebar right edge 1px black 10%; sidebar footer divider 1px black 10%; composer 1px black 10%; outline pills 1px black 20%; cards 1px black 5%; secondary pill 1px black 10%. Table rows 1px ink 5%. That is the complete list: seven bordered things on the screen.

### 4.2 Shadows

```css
/* [SDK] elevation geometry (x y blur spread) */
--elevation-100-geo: 0 1px 2px -1px;   /* alpha .08 light / .20 dark */
--elevation-200-geo: 0 2px 4px -1px;   /* .08 / .20 */
--elevation-300-geo: 0 4px 8px -2px;   /* .10 / .36 */
--elevation-400-geo: 0 8px 16px -4px;  /* .12 / .30 */
/* -strong = alpha x1.25, -stronger = alpha x1.6 */

/* [SDK] the floating-surface recipe (menu, popover, tooltip) */
--shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -4px rgb(0 0 0 / 10%);  /* 20% in dark */
--shadow-hairline: 0 0 0 1px rgb(0 0 0 / 8%);   /* 0.5px at 10% on hi-dpi; white 10-12% in dark */
box-shadow: var(--shadow), var(--shadow-hairline);
```

[APP-CSS] names the same geometry `--shadow-sm/md/lg/xl` and adds `--shadow-2xl: 0 16px 32px -8px #00000030`, `--shadow-card: 0 4px 16px 0 #0000000d`, `--shadow-tooltip: 0 8px 18px #0f172a33`.

[LIVE] only two elements on the landing page have a shadow:

```css
/* composer */
box-shadow: 0 0 0 1px rgba(0,0,0,.04), 0 2px 8px 0 rgba(0,0,0,.04), 0 4px 80px 8px rgba(0,0,0,.024);
/* notice card */
box-shadow: 0 4px 16px 0 rgba(0,0,0,.05);
/* composer, dark */
box-shadow: inset 0 0 1px 0 rgba(255,255,255,.2);
```

Buttons, nav rows, bubbles and code blocks have `box-shadow: none`. Shadow alpha never exceeds 5% in light mode on the live page.

---

## 5. Motion

```css
/* [SDK = APP-CSS] */
--transition-duration-basic: 150ms;   /* APP-CSS adds moderate 200ms, relaxed 300ms */
--transition-ease-basic: ease;
--cubic-enter: cubic-bezier(0.19, 1, 0.22, 1);
--cubic-exit: cubic-bezier(0.8, 0, 0.4, 1);
--cubic-exit-snappy: cubic-bezier(0.65, 0, 0.4, 1);
--cubic-move: cubic-bezier(0.65, 0, 0.35, 1);
```

- Hover / colour changes: 150ms ease on `opacity, color, background-color, box-shadow, border-color, transform` [SDK]. [LIVE] pill buttons: `color, background-color, border-color 0.12s cubic-bezier(.4,0,.2,1)`.
- Menu / popover: enter `opacity 0 -> 1, scale .95 -> 1` over **350ms** `--cubic-enter`; exit over **200ms** `--cubic-exit`. `transform-origin` follows the trigger [SDK].
- Press feedback: `transform: scale(var(--scale))` on `:active`; menu items default `0.98`, segmented thumb `0.97`. The button's `--scale` value is not set in the files I pulled [SDK, unverified].
- Ghost button hover: the fill is a `::before` that fades in and scales up, not a background swap [SDK].
- Loading button: label fades out over 300ms, spinner fades in 150ms after a 100ms delay [SDK].
- Modal: enter 600ms, exit 300ms, slides 20px [APP-CSS].
- [APP-CSS] also defines `--ease-spring-snappy` as a `linear()` spring and `--ease-enter-snappy: cubic-bezier(.23,1,.32,1)`.
- `prefers-reduced-motion` appears in 95 media blocks of the logged-out stylesheet [LIVE stylesheet].

---

## 6. Components

### 6.1 Button

**[SDK] defaults:** `color="primary" variant="solid" pill size="md"`. Variants: solid, soft, outline, ghost. Colours: primary, secondary, danger, success, warning, caution, info, discovery.

```css
/* [SDK] Button.module.css, trimmed */
.Button {
  height: var(--button-size);             /* md 32px */
  padding: 0 var(--button-gutter);        /* md 12px; pill: x1.33 */
  border-radius: var(--button-radius);    /* pill: 9999px */
  font-size: var(--button-font-size);     /* 14px */
  font-weight: var(--button-font-weight); /* 500 */
  line-height: 1;
  white-space: nowrap; user-select: none;
  transition: opacity, color 150ms ease;
}
.Button:focus-visible::after { outline: 2px solid var(--color-ring); outline-offset: 2px; } /* -1px for ghost/outline */
.Button[data-disabled] { background: ink 5%; color: #8f8f8f; cursor: not-allowed; }
```

Icon+label gap 3 / 4 / 6px (sm / md / lg). Icon-only: `uniform` makes width = height. Disabled is one neutral treatment shared by every colour.

**[LIVE] measured buttons:**

| button | box | fill | text | border |
|---|---|---|---|---|
| "Log in" (primary, header) | 44 high, padding 0 12, radius 999 | `#0d0d0d` | `#fff` 14/20 600 | none |
| "Sign up for free" (outline) | 44 high, padding 0 12 | `#fff` | `#0d0d0d` 14/20 600 | 1px black 20% |
| "What can ChatGPT do?" (outline) | 44 high, padding 0 14 | `#fff` | 14/20 600 | 1px black 20% |
| "Log in" (soft, sidebar, full width) | 44 high, padding 0 16 | `#f3f3f3` | 14/20 500 | 1px transparent |
| "Accept all" (primary, in card) | 40 high, padding 12 16 | `#0d0d0d` | `#fff` 14 / 500 | none |
| "Reject non-essential" (secondary) | 40 high, padding 12 16 | transparent | `#0d0d0d` 14 / 500 | 1px black 10% |
| icon buttons | 44 x 44 hit area, 20 to 24px icon | transparent | | 1px transparent |

All `box-shadow: none`. This shell is the touch-first build, hence 44px targets; the SDK's desktop default is 32px. Hover and active colours were not captured live (see section 9); use 1.4.

### 6.2 Composer [LIVE unless noted]

| property | value |
|---|---|
| width | 768px max, centred in the main column |
| height, empty | 52px |
| height, 4 lines of text | 152px (textarea 88px); grows upward in thread view |
| padding | `7px 10px` single-line, `10px` multi-line |
| radius | 28px in both states |
| fill | `#fff` on a `#fcfcfc` page (dark: `#212121` on `#000`) |
| border | 1px black 10% (dark: white 15%) |
| shadow | see 4.2 |
| input text | 17px / 24px, weight 400; placeholder `#8f8f8f` "Chat with ChatGPT" |
| attach ("+") | far left, 44x44 hit area, 7px from the edge, icon 16px in a 24px box |
| dictation | right, immediately left of send |
| send | far right, 44x44 hit area, **32px disc** (drawn as `::before`), white 13x15 arrow, `opacity: .5` when empty |
| layout change | single line: `+ [input] mic send` in one row. Multi-line: input on top, controls drop to a bottom row with the same left/right positions |
| thread view | pinned to the bottom, 24px above the viewport edge, same size and shadow |

[SDK] tokens: `--composer-radius: 24px`, `--composer-gutter: 12px`, `--composer-background-color: var(--color-surface-elevated)`. [APP-CSS]: composer button 28 to 36px, single-line radius 22px.

### 6.3 Messages [LIVE]

- **User:** right-aligned bubble, `max-width: 70%` of the column, `padding: 10px 16px`, `border-radius: 22px`, no border, no shadow, 16/24 text. No avatar, no name. Fill: see 1.6 (token default is ink 5%).
- **Assistant:** no bubble, no background, no avatar. Text runs the full 768px column, 16px / 26px, `#0d0d0d`. Roughly 95 to 105 characters per line at that width [INFERRED from width and font size].
- **Vertical rhythm:** 36px between the user turn and the assistant turn; 40px padding under the assistant turn; paragraphs `margin-top: 8px`; lists `margin-top: 8px`, `padding-left: 32px`, each item one 26px line; code block and table `margin: 16px 0`.
- **Turn actions:** icon-only row under each message (Copy, Share), 20px icons in `#5d5d5d`, 44px hit areas with `-6px` margins so they sit on a 36px pitch and align with the text edge.
- **Markdown [SDK `Markdown.module.css`]:** h1 1.75em / 1.222 / 600; h2 1.5em, margin 2rem 0 1rem; h3 1.25em; p margin 1em 0; list markers in secondary text colour; blockquote = 4px rounded bar in ink 15% plus 24px indent; hr ink 10%.

### 6.4 Code

- **Block [LIVE]:** container `#f3f3f3`, 1px black 5% border, `border-radius: 24px`, `margin: 16px 0`, no shadow. Header row about 49px with a language label on the left and a 44px copy button on the right. `pre` padding `0 16px 16px`, 16px / 26px monospace. Syntax colours seen: `#a0111f`, `#622cbc`, `#023b95`, `#032563`, `#0e1116`. This is the only multi-hue area in the product.
- **Block [SDK]:** `border: 1px solid var(--color-border); border-radius: 8px; background: var(--gray-25)`; code padding `14px 40px 14px 16px`, 0.875em, line-height 1.5; copy button absolute top-right with 10px inset; five syntax colours (`#c0660d`, blue-500, green-600, pink-500, purple-500), comments at 50% text alpha.
- **Inline [LIVE]:** 0.93em, weight 500, padding `0.05em 0.28em`, radius about 4px, fill `rgb(238,238,238)` at 82%. [SDK]: padding `1px 0.3rem`, radius 4px, fill ink 4%, inset 1px ink 8% ring, weight 500.

### 6.5 Tables

- [LIVE] no outer border, no zebra, no header fill. `th` 14/20 weight 600, `td` 14/20 weight 400, cell padding 8px (first column 0 left, last column 0 right, so the table aligns with the paragraph edge). Row height 37px. `tr` border-bottom 1px ink 5%, none on the last row.
- [SDK] the same shape: header border-bottom `--color-border-strong`, rows `--color-border`, `th` padding 8px, `td` padding 10px 8px, font 0.875em.

### 6.6 Sidebar [LIVE]

- 260px wide, same fill as the page (`#fcfcfc`), separated only by a 1px black 10% right border.
- Nav rows: 36px high, inset 6px from each side, `padding: 8px 10px`, `border-radius: 10px`, 14/20 weight 400, 20px icon, transparent at rest, rows touch (36px pitch, no gap).
- `nav` padding `8px 0 24px`, 16px gap between sections.
- Footer block separated by a 1px black 10% top border: 17/24 weight 700 title, full-width soft pill button.
- Top bar is 61px, transparent, with the two auth pills at the right.
- [APP-CSS] row tokens: `--height-token-row: 36px`, `--padding-row-x: 8px`, `--padding-row-y: 6px`, `--spacing-nav-row-gap: 1px`, section gap 16 to 20px, row action buttons hidden until hover (`--sidebar-row-action-opacity: 0 -> 1`), top and bottom scroll fade via `mask-image`.
- The conversation list (titles, hover, active, rename) exists only when logged in and was not rendered.

### 6.7 Menus and popovers [SDK; APP-CSS variants in brackets]

```css
.MenuList {
  min-width: 300px;
  padding: 6px;                         /* [APP-CSS: 4 / 6 / 10px] */
  border-radius: 12px;                  /* [APP-CSS: 16 or 20px] */
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow), var(--shadow-hairline);
  font-size: 14px; line-height: 20px;
}
.MenuItem { padding: 6px 8px; gap: 6px; }        /* [APP-CSS: row height 36 or 40px] */
.MenuItem::before {                               /* the highlight */
  border-radius: calc(var(--menu-radius) - var(--menu-gutter));  /* 6px */
  background: ink 8% (dark: white 10%);
}
.Separator { height: 1px; margin: 6px -6px; background: var(--color-border); }  /* full-bleed */
```

Disabled items: `opacity: .5`. Submenu chevron at 75% opacity. Radio/checkbox indicators 18px. [APP-CSS] adds `backdrop-filter: blur(8px)` with the menu fill at 90% opacity and a 1px `--color-border-subtle` ring plus `--shadow-xl`.

### 6.8 Dialog / modal

- [SDK] width 250 to 450px, inner padding 20px, backdrop `rgb(0 0 0 / 30%)` light and `50%` dark.
- [APP-CSS] radius 12 / 16 / 24px by preset; form dialog 24px; alternative "fade" backdrop `#f2f2f280` with `blur(1px)`; shadow `0 8px 16px #00000012, 0 2px 6px #0000000d, 0 0 0 1px var(--color-border)`.
- [LIVE] dialog titles in the DOM: 20/25 weight 600 ("Clear current chat?"), 24/32 weight 400 ("Log in or sign up").

### 6.9 Tooltip

- [SDK] max-width 300px, radius 8px, elevated surface plus `--shadow` and hairline, 14px / 1.45, padding 8x12 (sm), 12x16 (md), 14x18 (lg). Compact variant: `padding: 2px 8px`, fill `#303030`, white text.
- [APP-CSS] inverted: fill = neutral solid (near-black) in light, `--color-surface-elevated-secondary` in dark; padding 5px 12px; 12 to 14px text, line-height 18px, tracking -0.15px; radius 16px; shadow `0 8px 18px #0f172a33`.

### 6.10 Inputs [SDK]

Same height scale as buttons (md 32px, radius 8px, 12px gutter, 14px text). Outline variant: inset 1px ring, ink 16% -> 25% on hover -> 50% on focus; invalid ring `#e02e2a`. Soft variant: ink 8% fill, ring appears only on focus (ink 20%). Focus is a darker ring of the same 1px width, not a blue glow. Disabled: `opacity: .5`. Placeholder `#8f8f8f`. Textarea line-height 20px.

### 6.11 Small controls [SDK]

- Badge: heights 20 / 22 / 24px, radius 4 / 4 / 6px (or pill), 12 / 14 / 14px text, weight 600, soft / solid / outline.
- Switch: 32 x 19px track, 13px thumb with `0 1px 2px rgb(0 0 0 / 20%)`; on = `#181818` in light, `#0285ff` in dark; off = `#dfdfdf`.
- Checkbox: 18px, radius 4px, checked fill `#181818`.
- Segmented control: track `#ededed`, 2px gutter, thumb white with `0 1px 4px -1px rgb(0 0 0 / 20%)`, weight 600.
- Alert: radius 12px, padding 16px, gap 12px, 14/20, title 600, fill and 1px ring both ink 5% (or a 4 to 8% status tint).
- Avatar: 28px circle.

### 6.12 Toast / notice

- [APP-CSS] `.toast`: fixed `bottom: 16px; right: 16px`, `max-width: min(360px, 100vw - 32px)`, `padding: 12px 16px`, 14px / 20px, 1px border, 12px radius, `--shadow-sm`. Error variant changes only border and text colour.
- [LIVE] the cookie notice is the nearest rendered equivalent: 768px card, `padding: 20px`, `border-radius: 30px`, `#fff`, 1px black 5%, `0 4px 16px rgba(0,0,0,.05)`, title 14 / 600, two 40px pill buttons right-aligned with 8px gap, primary on the right.

### 6.13 Empty state / first run [LIVE]

The whole first screen is: one centred sentence, the composer, one optional outline pill.

- `h1` "Where should we begin?" 24 / 28, weight 400, centred, `max-width: 280px`.
- 32px below it, the 768x52 composer, with its top edge at about 46% of viewport height.
- 12px below the composer, a single 44px outline pill.
- Footer: one line of 12px `#5d5d5d` legal text.
- No illustration, no logo mark in the content area, no suggestion grid, no colour.
- [SDK] `EmptyMessage`: 40px icon tile (radius 8px, soft fill, 24px icon), 12px gap, title 16px / 600, description 14px / 1.45 in secondary text with 6px top margin, both `max-width: 90%` and `text-wrap: balance`, actions 16px below.

---

## 7. OpenAI's stated principles

Source: https://developers.openai.com/plugins/concepts/ui-guidelines.md [DOCS]

**Colour**
- "Use system colors for text, icons, and spatial elements like dividers."
- "Partner brand accents such as logos or icons should not override backgrounds or text colors."
- "Avoid custom gradients or patterns that break ChatGPT's minimal look."
- "Use brand accent colors on primary buttons inside app display modes."
- "Use brand colors on accents and badges. Don't change text colors or other core component styles." / "Don't apply colors to backgrounds in text areas."

**Typography**
- "ChatGPT uses platform-native system fonts (SF Pro on iOS, a sans-serif font on Android) to ensure readability and accessibility across devices."
- "Always inherit the system font stack, respecting system sizing rules for headings, body text, and captions."
- "Use partner styling such as bold, italic, or highlights only within content areas, not for structural UI."
- "Limit variation in font size as much as possible, preferring body and body-small sizes."
- "Don't use custom fonts, even in full screen modes."

**Spacing and hierarchy**
- "Use system grid spacing for cards, collections, and inspector panels."
- "Keep padding consistent and avoid cramming or edge-to-edge text."
- "Respect system specified corner rounds when possible to keep shapes consistent."
- "Maintain visual hierarchy with headline, supporting text, and CTA in a clear order."

**Number of actions**
- "Limit primary actions per card: Support up to two actions maximum, with one primary CTA and one optional secondary CTA." Placed at the bottom of the card.
- Carousel: "3-8 items per carousel", "a single clear CTA per item", metadata "three lines max".

**Structure (what not to do)**
- "No deep navigation or multiple views within a card." No tabs or drill-ins.
- "No nested scrolling. Cards should auto fit their content and prevent internal scrolling."
- "No duplicate inputs. Don't replicate ChatGPT features in a card."
- "Do not overload PiP with controls or static content."
- "Do not include your logo as part of the response."

**Icons and imagery**
- "Use either system icons or custom iconography that fits within ChatGPT's visual world - monochromatic and outlined."
- "All imagery must follow enforced aspect ratios to avoid distortion."

**Accessibility**
- "Text and background must maintain a minimum contrast ratio (WCAG AA)."
- "Provide alt text for all images."
- "Support text resizing without breaking layouts."

**Stated goal:** display modes used consistently so "experiences stay basic and predictable"; UI should "extend what users can do without breaking the flow of conversation" and be used "only when visual interaction improves the workflow."

Source: `openai/apps-sdk-ui` docs [SDK]
- Styles are written mobile-first; hover styles apply only under `(hover: hover) and (pointer: fine)`.
- Theme is a `data-theme` attribute, nestable, with every colour declared once as `light-dark(a, b)`.
- Input comment: "Whenever this is not 16px on mobile, zooming occurs."

Source: https://openai.com/brand/ [DOCS]
- OpenAI Sans is the brand typeface (Light, Regular, Medium, Semibold, Bold, each with italic).
- Logo rules: "DON'T add any colors to the Blossom", "DON'T use any effects or textures", "DO use the Blossom with lots of open space".

---

## 8. What ChatGPT deliberately does not do (with evidence)

| restraint | evidence |
|---|---|
| No brand colour in the chrome | [LIVE] 3 text colours and 5 fills on the landing page, all neutral gray. Primary action is `#0d0d0d`. Exception: the blue send disc and user bubble noted in 1.6. |
| No tinted grays | [SDK] every gray has R=G=B. |
| No pure black ink | [SDK][LIVE] `#0d0d0d` for text and primary fill. (Dark page background in the logged-out shell is `#000`.) |
| No gradients | [LIVE] zero gradient backgrounds computed on the landing page. [DOCS] "Avoid custom gradients or patterns". The stylesheet's few gradients are scroll-fade masks, image scrims and a loading shimmer. |
| Almost no shadows | [LIVE] 2 shadowed elements on screen (composer, one card), max alpha 5%. Buttons, rows, bubbles: `none`. |
| Few, faint borders | [LIVE] 7 bordered elements, all 1px at 5 to 20% black. No border on the user bubble, assistant text, nav rows or table outline. |
| No boxes around the answer | [LIVE] assistant text has no bubble, fill, avatar or name. |
| No heavy weights | [LIVE] weight 400 on 21 of 29 text nodes; headline is 400; one 700 on the page. [SDK] `strong` is 600. |
| Little size variation | [LIVE] seven size/line-height pairs on the landing page; 14px and 16px carry nearly everything. [DOCS] "Limit variation in font size". |
| No custom UI font | [APP-CSS] only KaTeX `@font-face`. [DOCS] "Don't use custom fonts". |
| No square or small-radius corners | [LIVE] radii are 999, 10, 22, 24, 28, 30px. |
| No coloured or filled icons | [LIVE] icons inherit text colour (`#0d0d0d` or `#5d5d5d`), 20px. [DOCS] "monochromatic and outlined". |
| No focus glow | [SDK] focus is a 2px solid outline at 2px offset on buttons, a darker 1px ring on inputs. |
| No hover on touch | [SDK][LIVE stylesheet] hover gated by `(hover: hover) and (pointer: fine)`. |
| No per-colour disabled states | [SDK] one neutral disabled treatment (ink 5% fill, `#8f8f8f` text). |
| No crowded first screen | [LIVE] one sentence, one input, one optional pill. |
| No more than two actions per surface | [DOCS] "one primary CTA and one optional secondary CTA". [LIVE] notice card has exactly two. |

Why it reads as calm [INFERRED]: hierarchy comes from fill (one black pill per view) and from spacing, not from colour, weight or boxes. Surfaces differ by 1 to 3 percent lightness, so edges are implied. Every interactive shape is a pill or a soft rounded rectangle, and every state change is a 5 to 16 percent ink overlay over 120 to 150ms.

---

## 9. Not reachable / not verified

- **Logged-in app was not opened** (by instruction). Conversation list rows, the model picker, account menu, settings modal, share dialog and real toasts were not rendered. Their values in 6.6 to 6.12 are from [APP-CSS] tokens or [SDK] source, not measurements.
- **The [APP-CSS] bundle is multi-preset.** The HTML that `curl` received carried `data-appearance-preset="codex"`, and the stylesheet includes VS Code and other theme variables. Where a token had several declarations I could not confirm which applies to a logged-in consumer session.
- **Blue accent provenance unknown.** Send disc `#3566f0` and bubble `#edf3fe` / `#2451da` were measured, but I cannot say whether this is the general default or specific to the logged-out shell or an experiment. The neutral bubble (ink 5%) is the documented token default.
- **Hover, active and focus states were not measured live.** State colours come from [SDK] tokens. Live pill-button transition timing (120ms) was measured.
- **Button `--scale` (press scale)** is referenced in `Button.module.css` but not defined in any file I downloaded.
- **Dark mode on the live site** was sampled via `prefers-color-scheme` emulation on the landing page only (page, composer, buttons, card). Dark code block, bubble and table were not measured.
- **Mobile viewport** was not measured; only 1440px wide.
- **The docs' images** (colour palette, typography and spacing diagrams) were not downloaded or read; only the text was.
- **OpenAI's Figma library** (linked from the docs) and the "full design guidelines" behind openai.com/brand were not accessed.
- **Storybook site** `openai.github.io/apps-sdk-ui` is a JS app; I read the repo source instead of the rendered pages.
- **Line length** (characters per line) is estimated from column width and font size, not counted.
