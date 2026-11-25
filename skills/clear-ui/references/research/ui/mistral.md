# Mistral AI — visual design teardown (captured 2026-11-25)

Scope: `mistral.ai` (marketing, Astro + Tailwind v4), `docs.mistral.ai` (Next.js + Tailwind v4, same token set as marketing), `chat.mistral.ai` (the product, Next.js + Tailwind v4, internal design system named **"Aura"**), `v2.auth.mistral.ai` (login, same Aura system).

**Naming note.** The product formerly called *Le Chat* is now **"Mistral Vibe"**. `chat.mistral.ai/` redirects to `/work`, page title "Vibe Work"; the product page title reads "Mistral Vibe (formerly Le Chat)".

## How to read this file (evidence labels)

- **[CSS]** read directly from a shipped stylesheet.
- **[computed]** `getComputedStyle` / bounding box on a real element, headless Chromium, viewport 1440x900 (effective 1440x757 on the chat page), light theme.
- **[JS]** class string read from a shipped JS chunk (the component's Tailwind classes), resolved to values through the [CSS] tokens. Not rendered, so not measured.
- **[image]** seen in an official marketing image. Not measurable.
- **[article]** read in public writing.


---

## 1. Tokens

There are two token sets. They share the palette but name things differently.

### 1.1 Marketing + docs (`site-astro.css`, `docs-3-hwxcfq-xyoo.css`) [CSS]

Semantic, light (`:root`):

| Token | Value |
|---|---|
| `--color-surface-brand-primary` (page bg) | `#fbfbf8` |
| `--color-surface-brand-secondary` (alt section, sidebar, code bg) | `#f5f4ef` |
| `--color-surface-brand-tertiary` | `#ebe9e0` |
| `--color-surface-invert` | navy-950 `#151524` |
| `--color-surface-brand` (the orange) | orange-500 `#ff5229` (docs build resolves `orange-strong` to `#fa500f`) |
| `--color-border-primary` | `#e4e3de` |
| `--color-border-secondary` (hover border) | `#c9c9c4` |
| `--color-border-invert` | `#31313a` |
| `--color-text-primary` | zinc-900 `oklch(21% .006 285.885)` |
| `--color-text-secondary` / `-tertiary` | zinc-800 / zinc-700 |
| `--color-text-muted` | zinc-500 `oklch(55.2% .016 285.938)` |
| `--color-text-invert` | zinc-50 |
| `--color-action-primary` (primary button bg) | zinc-950 `oklch(14.1% .005 285.823)` |
| `--color-action-secondary` (its hover) | zinc-900 |
| `--color-action-ghost-1` / `-2` (secondary button bg / hover) | `#07070b0d` (5%) / `#07070b1a` (10%) |
| status surfaces | warning yellow-100 `#fff4d2`, destructive red-100 `#ffe0de`, informative blue-100 `#e0efff`, success green-100 `#ddf8ee` |
| status text | yellow-700 `#a77201`, red-700 `#ad0e00`, blue-700 `#0262bf`, green-700 `#318e68` |

Dark (`.dark`): surfaces steel-950 `#101013` / steel-900 `#1a1a1e` / steel-800 `#27272b`; text cream-50 `#fafaf4` / cream-100 `#f2f1e8`; muted steel-400 `#a1a1aa`; border steel-800; action-primary steel-100 `#f1f1f3`; ghost `#f9f9fb0d` / `#f9f9fb1a`. A separate `.inverted` class flips a single section (surface navy-950 `#151524`, border `#31313a`, text zinc-200).

Brand ramp (the "sunset" used in logo, footer strip, hero blocks):
`yellow-500 #ffaf01` → `tangerine-500 #ff8204` → `orange-500 #ff5229` → `red-600 #e51300` → `raspberry-700 #c4001d`.

### 1.2 Product "Aura" (`chat-2fnq5wwoqs00b.css`) [CSS]

Primitives:

```
cream  00 #fff  50 #fbfbf8  75 #f8f8f4  100 #f5f4ef  200 #ebe9e0  300 #dad9cf  400 #abaaa1
       500 #928f86  600 #79776e  700 #615f57  800 #484740  900 #302f2b  950 #201f1c
steel  00 #fff  50 #f9f9fa  100 #f1f1f3  200 #e4e4e7  300 #ccccd1  400 #a1a1aa  500 #8c8c97
       600 #6d6d78  700 #55555e  800 #3d3d43  875 #232327  900 #1a1a1e  925 #17171b  950 #101013  1000 #09090d
orange 50 #fff0eb 100 #ffdccf 200 #ffb598 300 #ff8e61 400 #ff6529 500 #fa500f 600 #de4408 700 #c23700 800 #9e2d00
transparent-dark-N  = #201f1c at N% alpha (2,4,6,8,10,15,20,25,30,35,40 ...)
transparent-light-N = #ffffff at N% alpha
```

Light theme uses the **warm cream** ramp as neutral; dark theme swaps to the **cool steel** ramp (`--neutral-*: var(--cream-*)` vs `var(--steel-*)`).

| Semantic | Light | Dark |
|---|---|---|
| `--bg-default` | `#fff` | steel-950 `#101013` |
| `--bg-subtle` (app canvas) | cream-50 `#fbfbf8` | steel-900 `#1a1a1e` |
| `--bg-muted` | cream-100 `#f5f4ef` | steel-800 |
| `--bg-card` | `#fff` | steel-875 `#232327` |
| `--bg-sidebar` | cream-75 `#f8f8f4` | steel-925 `#17171b` |
| `--bg-input` | `#fff` | white 6% |
| `--bg-overlay` | `#201f1c` 15% | `#201f1c` 70% |
| `--text-default` | cream-950 `#201f1c` | `#fff` |
| `--text-subtle` | cream-700 `#615f57` | white 70% |
| `--text-muted` | cream-500 `#928f86` | white 50% |
| `--text-hint` | dark 30% | white 30% |
| `--text-placeholder` | cream-400 `#abaaa1` | steel-400 |
| `--border-default` | `#201f1c` 10% | white 10% |
| `--border-darker` | `#201f1c` 15% | white 15% |
| `--border-strong` | `#201f1c` 25% | white 25% |
| `--border-input-hover` / `-highlight` | dark 30% / dark 40% | white 30% / white 45% |
| `--border-highlight` (focus ring) | `#14263d` 40% (blue-900 at 40%) | same |
| `--bg-state-primary` / hover / press | steel-900 `#1a1a1e` / steel-800 `#3d3d43` / steel-950 | steel-50 / steel-100 / steel-200 |
| `--bg-state-secondary` / hover / press | `#fff` / cream-50 / cream-100 | white 4% / 8% / 10% |
| `--bg-state-soft` / hover / press | dark 6% / 8% / 10% | white 8% / 10% / 15% |
| `--bg-state-ghost` / hover / press | dark 0% / 4% / 8% | white 0% / 4% / 15% |
| `--bg-state-brand` / hover / press | orange-500 / 400 / 600 | orange-600 / 500 / 400 |
| `--bg-state-destructive` | red-500 `#f43625` | same |
| `--bg-state-disabled` | dark 8% | white 8% |
| `--bg-switch-active` | green-500 `#3aa77a` (not orange) | — |
| `--bg-checkbox-active` | brand-500 (orange) | — |

Borders are **alpha colours, not solid greys**, so they sit correctly on white, cream and card backgrounds.

Badge backgrounds are the `-50` step of each hue (`--bg-badge-orange: #fff0eb`, blue `#f0f7ff`, green `#effcf7`...), gray badge = dark 6%. Chart palette: `#ff8204 #c86ee2 #f956c6 #2a9af0 #88889c #ffaf01 #3aa77a #ff1a3c`.

---

## 2. Typography

### 2.1 Families [CSS]

| Role | Marketing/docs | Product |
|---|---|---|
| Display / headings / nav / button labels | `"ALTMistral", sans-serif` (custom, self-hosted woff2; weights 400, 500, 600 + italics) | `"ALT Mistral", ui-sans-serif, system-ui, -apple-system, sans-serif` (`--font-headings`) |
| Body / UI | `"Inter", sans-serif` (variable 100–900) | `Inter, "Inter Fallback"` |
| Code | `"DM Mono", monospace` (300/400/500) | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` |
| Eyebrow / breadcrumb mono | `"Space Mono", monospace` (400), uppercase | — |

In the product, the heading font is applied automatically only to large text [CSS]:

```css
.text-3xl,.text-4xl,.text-5xl,.text-6xl,.text-7xl,
h1:not(.markdown-container-style *, .text-2xs,.text-xs,.text-sm,.text-base,.text-md,.text-lg), h2:not(...), h3:not(...)
{ font-family: var(--font-headings) }
```

So: brand font for >= 32px headings; Inter for everything else, including headings inside chat answers.

### 2.2 Marketing/docs type scale [CSS], confirmed [computed]

| Token | Size / line-height | Tracking | Weight | Font |
|---|---|---|---|---|
| display | 96 / 96 (hero: `clamp(2rem, -.86rem + 7.62vw, 6rem)`) | -0.02em | 500 | ALTMistral |
| h1 | 72 / 72 (hero: `clamp(2rem, .21rem + 4.76vw, 4.5rem)`) | -0.02em | 500 | ALTMistral |
| h2 | 56 / 60 | -0.01em | 500 | ALTMistral |
| h3 | 44 / 52 | -0.01em | 500 | ALTMistral |
| h4 | 32 / 40 | 0 | 500 | ALTMistral |
| h5 | 24 / 32 | 0 | 500 | ALTMistral |
| h6 | 16 / 24 | 0 | 500 | ALTMistral |
| body-large | 20 / 28 | -0.02em | 400 | Inter |
| body-base | 16 / 24 | -0.01em | 400 | Inter |
| body-small | 13 / 20 | 0 | 400 | Inter |
| button-large | 16 / 24 | **+0.01em** | 500 | ALTMistral |
| button-small | 14 / 20 | **+0.02em** | 500 | ALTMistral |
| eyebrow | 13 / 20 | 0 | 400 | Space Mono, uppercase |
| eyebrow-small | 11 / 16 | 0 | 400 | Space Mono, uppercase |
| code (docs) | 14.72 (`.92rem`) / 20 | 0 | 400 | DM Mono |

Rule visible in the scale: **every heading is weight 500**, never 700. Tracking tightens with size (-2% at 72px+, -1% at 44–56px, 0 below) and goes slightly positive on button labels.

Prose max width: `65ch` [CSS]. Docs article column: 665px wide, container `max-width: 800px` [computed].

### 2.3 Product type scale [CSS] + usage counts [JS]

Tailwind scale, with the top end remapped to the marketing heading sizes: xs 12/16, sm 14/20, base 16/24, lg 18/28, xl 20/28, 2xl 24/32, **3xl 32/40, 4xl 44/52, 5xl 56/60**. Tracking tokens: tight -0.025em, wide 0.025em, widest 0.1em.

Class frequency across the 131 JS chunks loaded on the landing route: `text-sm` 256, `text-xs` 110, `text-base` 13, `text-lg` 13, `text-2xl` 9, `text-xl` 7. Weights: `font-medium` 117, `font-semibold` 52, `font-normal` 26, `font-bold` 6, `font-light` 6.

So product chrome is **14px / 500** by default, 12px for meta, 16px for the composer text and message body.

Measured [computed]: greeting h1 `ALT Mistral 32/40, weight 400, #201f1c`; login h1 `32/40, weight 500`; dialog title `Inter 18/18, 600, -0.45px`; dialog body `Inter 14/20, #928f86`; all buttons `Inter 14/20, 500`.

---

## 3. Spacing, radius, layout

### 3.1 Spacing [CSS]
Base unit `--spacing: .25rem` (4px) in all three properties; everything is a multiple. Observed [computed]: section vertical padding 40 / 80 / 160px; card padding 24px (pricing, docs cards) and 40px (large feature blocks); nav item padding 0 16px; list row padding 16px; page gutter 40px desktop (16px mobile).

### 3.2 Radius

| Token | Marketing/docs [CSS] | Product [CSS] |
|---|---|---|
| xs | 2px | 2px |
| sm | 4px | **6px** |
| md | 6px | **8px** |
| lg | 8px | **10px** |
| xl | 12px | **14px** |
| 2xl | 16px | 16px |
| 3xl | 24px | 24px |

Marketing in practice [computed]: of 1,328 visible elements on the homepage only 19 have any radius: `6px` x10, `4px` x3, `12px` x2, `10px` x1, `8px` x1. Pricing: 3,392 elements, 23 rounded (`6px` x17, `4px` x4). Docs page: `6px` x126, `4px` x12, `8px` x1. Layout containers, cards, nav, tables, header are **square (0)**; only controls (buttons, inputs, tags, code blocks) get 4–6px.

Product in practice [JS]: `rounded-md` (8px) 146, `rounded-full` 105, `rounded-lg` (10px) 83, `rounded-sm` (6px) 70, `rounded-xl` (14px) 52, `rounded-2xl` 6. Controls 8px; composer 12.5px; dialog 10px; user bubble 24px.

### 3.3 Breakpoints and containers [CSS]
Breakpoints: 40rem (640), 48rem (768), 64rem (1024), 80rem (1280), 96rem (1536); marketing adds 113rem (1808), docs adds 1920px.
Marketing page container: `max-w-432` = **1728px**, with `border-x` (the vertical rules run the full page height). Docs: sidebar 300px, article max 800px, "On this page" rail right. Product: conversation column `max-w-(--breakpoint-md)` = **768px** [JS]; composer measured 736px wide at 1440 [computed]. Sidebar width `18rem` (288px), collapsed icon rail `3rem` (48px) [JS].

---

## 4. Borders and shadows

### 4.1 Marketing/docs: borders do all the work
- Every structural division is a `1px solid #e4e3de` hairline: header bottom, `divide-x` between nav items, section top/bottom, card grids, table cells, footer [computed].
- Hover on a bordered card darkens the border to `#c9c9c4`, or fills with `#f5f4ef`; no lift.
- **Homepage: 0 elements with box-shadow, 0 gradients** (1,328 elements). Docs page: 0 shadows; 1 gradient (a fade mask at the bottom of the sidebar). Pricing: the only shadow is a `0 0 0 1px #e4e3de` ring, i.e. a border [computed].
- Shadows that exist in the marketing stylesheet at all: Tailwind's stock `shadow-sm/md/lg/xl` plus 4 custom ones, used on isolated floating pieces (cookie panel, carousel).

### 4.2 Product: hairline + one soft elevation
- Hairlines are `1px` (or `0.5px` on secondary buttons, dialog, sidebar insets) in `rgba(32,31,28,.10)`.
- Shadow tokens [CSS]:
```
--shadow-2xs: 0 1px #0000000d
--shadow-sm:  0 1px 3px 0 #0000001a, 0 1px 2px -1px #0000001a
--shadow-md:  0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a   (popovers, menus)
--shadow-lg:  0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a (dialog)
```
- Solid buttons carry a bottom inner edge instead of a drop shadow [CSS]:
```css
.inset-shadow-components-default { --tw-inset-shadow: 0px -1.5px 0px 0px #00000014 inset }
```
- Focus ring [CSS]: `outline: none`, then a 1px offset ring in the surface colour plus a 3px ring in `--border-highlight`. Measured on the focused dialog button: `rgb(255,255,255) 0 0 0 1px, rgba(20,38,61,.4) 0 0 0 4px`.
- Marketing focus [CSS]: `outline: 2px solid var(--color-text-primary); outline-offset: 2px`.

---

## 5. Motion

| Where | Value | Source |
|---|---|---|
| Default transition (all three sites) | `150ms cubic-bezier(.4, 0, .2, 1)` | [CSS] |
| Easings | in `(.4,0,1,1)`, out `(0,0,.2,1)`, in-out `(.4,0,.2,1)` | [CSS] |
| Product button | properties `background-color, border-color, color, fill, stroke, scale`; **75ms ease-out**; hover-in is instant (`hover:[transition-duration:0s,...]`), hover-out fades over 75ms; press = `scale(.97)` under `motion-safe` | [JS]+[computed] |
| Product list/menu rows `.aura-color-fade-out` | hover/selected state applies with `0s`; leaving fades `150ms ease-out` | [CSS] |
| Product dialog/popover | `duration-200`, fade + `zoom-in-95`, popovers slide 8px from their side | [JS] |
| Dialog backdrop | `rgba(32,31,28,.15)` + `backdrop-filter: blur(4px)` | [computed] |
| Marketing button label | label translates on hover, `transition-all 300ms` | [CSS]+HTML |
| Marketing entrances | `fade-in .5s linear`, slide `.2s ease-in-out`, brand blocks `.7s ease-out` with staggered delays | [CSS] |
| Reduced motion | `prefers-reduced-motion: reduce` blocks present in all stylesheets (5 in marketing) | [CSS] |

The pattern worth copying: **state appears instantly, disappears with a short fade.**

---

## 6. Components

### 6.1 Buttons — product (Aura `AuraButton`) [JS], sizes confirmed [computed]

Base: `flex items-center justify-center font-medium whitespace-nowrap cursor-pointer`, 14px/20px, weight 500.

| Size | Height | Padding-x | Gap | Text | Icon |
|---|---|---|---|---|---|
| 2xs | 24 | 6 | 4 | 12px | 14–16 |
| xs | 28 | 8 | 4 | 14px | 16 |
| sm | 32 | 10 | 6 | 14px | 16 |
| default | 36 | 12 | 8 | 14px | 16 |
| lg | 40 | 14 | 10 | 14px | 18 |

Icon-only = square at the same height (`size-8` = 32px in the composer). Shape: `rounded-md` (8px) or `pill`.

| Variant | Rest | Hover | Press | Text | Extra |
|---|---|---|---|---|---|
| primary | `#1a1a1e` | `#3d3d43` | `#101013` | `#fff` | inset bottom edge `0 -1.5px 0 #00000014` |
| brand | `#fa500f` | `#ff6529` | `#de4408` | `#fff` | same inset edge |
| secondary | `#fff` | `#fbfbf8` | `#f5f4ef` | `#201f1c` | `0.5px` border `rgba(32,31,28,.15)` |
| dashed | as secondary | | | | `1px dashed` border |
| soft | dark 6% | dark 8% | dark 10% | `#201f1c` | no border |
| ghost | transparent | dark 4% | dark 8% | `#201f1c` | — |
| ghost-muted | as ghost | | | `#615f57` | — |
| destructive | `#f43625` | `#f66c60` | `#f43625` | `#fff` | — |

States: disabled = bg dark 8%, text dark 30% (measured on the empty-composer send button: `rgba(32,31,28,.08)` / `rgba(32,31,28,.3)`), `cursor: not-allowed`. Loading (`aria-busy`) = text goes transparent, centred spinner, bg `steel-300`. Open popup trigger = press colour held. Focus = ring from §4.2. Active = `scale(.97)`.

Measured: "Sign up" (primary, sm) `32px high, padding 0 8px, radius 8px, bg rgb(26,26,30), #fff`; "Sign in" (ghost) same box, transparent; dialog CTA (primary, default) `36px, 0 12px`.

### 6.2 Buttons — marketing/docs [computed] + HTML classes

| Variant | Height | Padding | Radius | Rest | Hover |
|---|---|---|---|---|---|
| primary lg | 48 | 8 16 | 6 | `oklch(14.1% .005 285.8)` (≈ `#09090b`), text zinc-50 | zinc-900 |
| primary md | 40 | 8 12 | 6 | same | same |
| secondary (ghost fill) lg/md | 48 / 40 | same | 6 | `rgba(7,7,11,.05)` | `rgba(7,7,11,.10)` |
| icon sm | 28 | 4 | 6 | `rgba(7,7,11,.05)` | `.10` |
| outline (docs "Copy page", language) | 36–38 | 0 12 / 8 12 | 6 | bg `#fbfbf8`, `1px #e4e3de` | bg zinc-100 |
| header CTA "Start building" | 48 (full header height) | 0 16 | **0** | zinc-950, white text | zinc-900 |

Label: ALTMistral 16/24 (lg) or 14/20 (sm), weight 500. Full-width primary buttons put the label left and a chevron right (`justify-between`). Disabled: text muted, bg ghost.

No orange button exists on the marketing site or docs.

### 6.3 Inputs

Product [JS]+[CSS]+[computed on login]:
```
aura-input-states border-darker bg-input placeholder:text-muted
flex w-full rounded-md border px-3 py-2 text-base sm:text-sm outline-hidden transition-shadow
disabled:cursor-not-allowed disabled:opacity-50
```
- Rest: `1px solid rgba(32,31,28,.15)`, bg `#fff`, radius 8px, padding 0 12px, text 14/20. Login email field is 48px tall; textarea min-height 80px.
- Hover: border → dark 30%, plus an inner 2px line in `--border-default`.
- Focus (measured): `box-shadow: rgba(32,31,28,.1) 0 0 0 3px, rgba(32,31,28,.4) 0 0 0 1px inset` — a **neutral** ring, not blue and not orange.
- Invalid: border and ring switch to `--border-destructive`; success to `--border-success`.
- Label: Inter 14, weight 500, above the field; helper link ("Forgot password?") right-aligned in `#928f86`.

Docs search [computed]: 44px tall, `1px #e4e3de`, radius 6, bg `#fbfbf8`, `⌘K` kbd chip on the right.

### 6.4 Chat composer [computed, guest landing, light]

```
outer   .g7PKlG_chat-input-bar  736 x 58px, bg #fff, border 1px rgba(32,31,28,.10),
        border-radius calc(var(--radius-xl) - 1.5px) = 12.5px, max-height 400px (max-h-100)
        box-shadow: 0 1px 2px #0f172a0d, 0 6px 16px -6px #0f172a0f, 0 24px 48px -16px #0f172a14
        dark: border 0; box-shadow: 0 0 0 1px var(--border-default), 0 1px 2px #0003,
              0 6px 16px -6px #00000047, 0 24px 48px -16px #0000005c
inner   padding 12px, gap 12px
row     height 32px, gap 4px, items centred  (single-row layout; a "two-row" layout exists in code)
```
- Left: one 32x32 ghost icon button (`+`, "Open settings menu" — attachments/tools), icon 16px.
- Middle: ProseMirror editor, Inter 16/24, placeholder "Ask anything" in `#abaaa1`, **caret orange** (`caret-brand-500`). Grows vertically; the bar caps at 400px then scrolls.
- Right, in order: "Think" toggle (ghost-muted, 32px high, text `#615f57`, label collapses to icon in narrow containers via a container query), voice button (32x32 ghost), **send** (32x32, radius 8, primary: `#1a1a1e` bg / white arrow when enabled; disabled `rgba(32,31,28,.08)` bg, arrow at 30%).
- Send is a rounded square, not a circle, and it is **near-black, not orange**.
- Empty state: composer vertically centred in the viewport, left-aligned with a 48x34 orange pixel-M mark and a 32px greeting above it; page bg `#fbfbf8`. The composer is the only element on the page with a real drop shadow.
- Clicking anywhere in the bar focuses the editor (`click-focus-input`, `cursor: text`).

### 6.5 Messages [JS] — not rendered, not measured

- Column: `mx-auto w-full max-w-(--breakpoint-md) min-w-0` → 768px.
- **User**: right-aligned bubble
  `bg-basic-gray-alpha-4 ms-auto flex w-fit max-w-full flex-col gap-1 rounded-3xl px-5 py-2.5`
  → bg `rgba(32,31,28,.04)` (dark: white 4%), radius 24px, padding 10px 20px, shrink-to-fit. No border, no colour.
- **Assistant**: no bubble, no background; plain markdown on the canvas, full column width. An avatar slot `w-7` (28px) exists beside it.
- Action row under a message: `ms-auto mb-2 w-fit gap-3`, ghost icon buttons `h-8 w-8 p-2` with 16px icons (copy, edit, delete, version switcher), timestamp in `text-hint text-xs`. Revealed on hover/focus (`has-focus-visible:opacity-100`).
- Reasoning text: `text-muted px-0.5 py-1 text-sm font-light italic`.
- Line length is therefore bounded by 768px minus gutters at 16px Inter — roughly 90–95 characters. (Inferred from the two values, not measured.)
- Vertical spacing between turns: only `mb-2`, `mt-6`, `pb-2` fragments were found; the exact rendered gap was **not** verified.

Markdown in answers [CSS] (`.markdown-container-style`):
```css
:is(h1..h6) { font-weight:600; line-height:1.5 }   h1 1.5em  h2 1.25em  h3 1.125em  h4 1em  h5 .875em
strong { font-weight:600 }
a { color:var(--text-informative); font-weight:500; text-decoration:none; text-underline-offset:3px }
a:hover { text-decoration: underline dotted }
ul { padding-inline-start:1em; list-style:disc }   ol { padding-inline-start:2em }   li+li { margin-top:.25em }
blockquote { border-inline-start-width:.25rem; padding:.125em 1em; font-style:normal }
code { font-size:85% }   pre { border-radius:.375rem }   .markdown-fenced-code-root { margin-block:1.25em }
```
Links in answers are **blue** (`blue-700 #0262bf`), not orange.

Tables in answers [CSS] (`.markdown-table`): `font-size .875em; line-height 1.714`; header `font-weight 600`, bottom border 1px; rows separated by 1px bottom border only, last row none; cell padding `.571em`, first/last column flush to the edge; **no vertical rules, no zebra, no outer box**; `overflow-x: auto`.

### 6.6 Code blocks

Docs [computed]: container bg `#f5f4ef`, `1px solid #e4e3de`, radius 6px (top-left squared when a tab strip sits above), DM Mono 14.72/20, light syntax theme (One Light colours: `#a626a4`, `#50a14f`, `#986801`, `#0184bc`, `#383a42`). Language tabs: 33px high, `border border-b-0 rounded-t-md`, active tab bg `#f5f4ef`, inactive `#fbfbf8`. "See more" expander is a 36px ghost button. Inline code: DM Mono 13/20, height 24, padding 0 4px, radius 4, `1px #e4e3de`, bg `#fbfbf8`.

Product canvas editor [CSS]: `pre code { background: var(--color-basic-gray-alpha-4); border-radius: 10px; padding: 24px 16px }`, 14px, line-height 1.6. Chat fenced blocks: `my-[1.25em]`, pre radius 6px; header/copy-button styling not captured.

### 6.7 Navigation / header

Marketing [computed]: `position: fixed`, **height 48px + 1px bottom border `#e4e3de`**, bg `#fbfbf8` (takes the colour of the section below, e.g. `#f5f4ef` on pricing), no shadow, no blur. Logo cell 120px wide; nav items are full-height cells `h-12 px-4` separated by vertical hairlines (`divide-x`); label ALTMistral 16/24, weight 500, +0.16px; hover fills the cell with the surface colour. Right: "Get in touch" plain cell, then a black full-height "Start building" cell with a chevron. Mega-menu is a full-width panel under the header, rows 57px with top/bottom hairlines.

Docs [computed]: same 48px sticky header and cell grammar; sidebar 300px, bg `#f5f4ef`, right border; group heading ALTMistral 16, weight 500; items `min-h-9 (36px) px-3 rounded-md`, text muted, hover `rgba(7,7,11,.05)`; breadcrumb in Space Mono 11px uppercase; right rail "On this page" with a 1px left rule and the active item in primary text.

Product [JS]: sidebar `18rem`, bg `--bg-sidebar` (`#f8f8f4`), section labels `text-xs text-hint`, sticky; active row `bg-muted text-default` (`#f5f4ef`), inactive `text-subtle`; row action button 20x20 revealed on hover. Title bar height 40px with `0.5px` bottom border. Unread indicator: 6px orange dot (`bg-brand-500 size-1.5 rounded-full`). [image] The official product shot shows a collapsed icon rail with ~6 outline icons and the orange pixel-M tile at top.

### 6.8 Cards

Marketing [computed]: no card component in the usual sense. Content sits in **grid cells divided by hairlines** — pricing tiers are four columns sharing borders, `padding 24px`, radius 0, no shadow; the CTA sits in a footer cell with its own top border. News cards: `p-5 lg:p-10`, `border-r border-b`, bg `#fbfbf8`. Logo wall: square 272px cells with 1px borders. The only emphasis on the featured pricing tier is a 40px orange bar ("Popular") on top of its column — the column itself is unchanged.

Docs [computed]: `p-6 border #e4e3de`, radius 0, hover border `#c9c9c4`; prev/next links `p-4 rounded-md border`.

Product [JS]: popover/card `bg-card border rounded-md shadow-md`, widths `w-64` / `w-72`, padding 16px.

### 6.9 Badges / tags

Marketing news tag [HTML]: `uppercase px-2 py-1 rounded (4px) bg rgba(7,7,11,.05)`. Docs callout: bg `#e0efff`, text `#0262bf`, radius 8, padding 12 — a tinted block with no border and no left stripe. Product [JS]: `inline-flex h-5 min-w-6 rounded-sm px-1.5 text-xs leading-none font-medium`; coloured badges pair `bg-badge-<hue>` (the 50 step) with `text-basic-<hue>-strong` (the 700 step).

### 6.10 Menus, dialog, toggles

- Menu item [JS]: `flex items-center gap-2 px-2 py-1.5 text-sm`, icons 16px, hover/focus `bg-subtle` (`#fbfbf8`), disabled 50% opacity. Check-item variant `rounded-sm py-1.5 ps-8 pe-2`.
- Dialog [computed]: 512px max width, padding 24px, gap 32px, radius 10px, bg `#fbfbf8`, border `rgba(32,31,28,.1)`, `--shadow-lg`; title 18px/600, body 14px muted; single primary button bottom-right.
- Segmented control (pricing currency, product tabs): track `h-9 p-0.5 rounded-md` in a 6% grey; active thumb is the page surface with a 1px top highlight and bottom edge, radius 6px — no colour.
- Toggle "on" in product [JS]: `bg-state-brand/5` + `text-brand-500` + `border-brand-400/10` — a 5% orange tint, not a solid fill.

---

## 7. Where the orange is actually allowed

Counted on rendered pages [computed] and in product class strings [JS]:

| Surface | Orange occurrences |
|---|---|
| Homepage (1,328 elements) | Logo; decorative flat squares in the hero (4 orange, 3 yellow, 3 tangerine); the 4-band footer strip. No orange text, link, or button. |
| Pricing (3,392 elements) | Logo; one "Popular" bar; plan icons; footer strip. |
| Docs page (1,745 elements) | Logo; footer strip. Nothing in the article. |
| Login (47 elements) | Logo only. |
| Product landing | Logo mark (`#fa500f`, 48x34) and the text caret. |
| Product code | Progress bar fill, drag/resize/drop indicators (1–2px lines), selected calendar day, toggle-on 5% tint, 6px unread dot, checkbox checked, `brand` button variant (found on a handful of confirm actions such as "review"). |

Rule that falls out: orange is **identity and tiny state indicators**. The primary action colour is near-black in every property. Links are underlined body-colour (marketing/docs) or blue (chat answers). The focus ring is navy/neutral. The "on" switch is green.

---

## 8. Brand and design writing

- **Mistral brand page** — https://mistral.ai/brand/ (also `/fr/brand/`). Primary source, read directly. Key statements: "Our abstract pixel cat is our emblem, symbolizing its unexpected but crucial role in the early development of machine learning and generative artificial intelligence." Models "are represented with pixelated illustrations rendered in vibrant colors, designed to shine at small scale. More than decorative accents, they function as a natural extension of our M symbol, forming a cohesive visual system." Logo rules: respect clearspace; prefer the gradient version; use monochrome on busy backgrounds; do not stretch/rotate, change layout, recolour, place on a coloured background, put in a frame, or use old versions. Variants offered: gradient, inverted, black, white. Brand kit zips are linked from `cms.mistral.ai` (`Mistral_Brandkit_2026.zip`, `Mistral_Logos_2026.zip`, `Mistral_Models_2026.zip`, `Mistral_Product_Shots_2026.zip`) — **not downloaded**.
- **Brand New (UnderConsideration)** — "Cat has Entered the Chat: New Logo and Identity for Mistral AI by Sylvain Boyer Studio" — https://www.underconsideration.com/brandnew/archives/new_logo_and_identity_for_mistral_ai_by_sylvain_boyer_studio.php. Only the title and attribution are public; the body is paywalled and was **not read**.
- **Creative Review** — "How French startup Mistral is using design to shake up AI" — https://www.creativereview.co.uk/mistral-ai-design-sylvain-boyer/. Blocked by a bot check; **not read**. Only the title is known.
- **ECV alumni piece** — https://ecv.fr/actualites/sylvain-boyer-designer-ecv-paris-2024-mistral-ai-eco-branding/ — confirms Sylvain Boyer (Paris 2024 logo, "Éco-Branding") as author of the Mistral identity. Nothing specific on the system.
- **Secondary summary** — https://madegooddesigns.com/mistral-ai-brand-guidelines/ — restates the brand page (pixel-block M, yellow→orange→red bands light at top to deep red at the foot). Adds nothing original.
- Unrelated despite the search hit: https://tomsouverain.com/projects/mistral-ai-branding is a self-initiated concept, not Mistral's work.

What the brand system looks like in the shipped CSS, as opposed to what is written about it: the pixel motif is confined to raster/SVG illustrations (cat, model icons, cursor-like chevrons, cookie image), and the "rainbow" is reduced to five flat bands. Neither leaks into UI controls.

---

## 9. What they do not do (with evidence)

1. **No orange CTAs.** Zero orange buttons on marketing, docs, login, or the product landing [computed]. Primary = `#1a1a1e` / zinc-950.
2. **No gradients in UI.** Homepage: 0 gradient backgrounds across 1,328 elements. The brand "gradient" is drawn as discrete flat bands (`#ff8204`, `#ff5229`, `#e51300`, `#c4001d`, 64px each) [computed]. The only CSS gradients are scroll-fade masks.
3. **No shadows on the marketing site or docs.** 0 box-shadows on the homepage and the docs page [computed]. In the product, shadow is reserved for things that float: composer, popover, dialog.
4. **No pure white page, no pure black text.** Canvas `#fbfbf8`, alt `#f5f4ef`, text `#201f1c` / zinc-900; pure `#fff` is kept for raised surfaces (composer, input, card) so they separate from the canvas by tone.
5. **No bold headings.** Every heading token is weight 500; the product greeting is 400. 700 appears only for inline emphasis [CSS].
6. **No big radii on structure.** Marketing layout is square; controls are 6px. Product controls are 8px; nothing structural exceeds 14px. The single large radius (24px) is the user message bubble.
7. **No coloured or bordered chat bubbles; no assistant bubble at all.** User = 4% grey fill; assistant = bare text [JS].
8. **No glass / blur chrome.** Header has `backdrop-filter: none` and an opaque background; blur appears once, 4px, on the modal backdrop [computed].
9. **No hover lift or scale-up.** Hover changes a fill by 4–5% alpha or darkens a border; the only scale is a 3% press-down [JS].
10. **No floating cards on marketing.** Sections and cards are cells in a ruled grid sharing 1px borders [computed].
11. **No accent-coloured focus ring or input focus.** Ring is navy at 40%; input focus is a dark-neutral ring [computed].
12. **No side-stripe callouts, no gradient text, no uppercase sans eyebrows.** Callouts are flat tinted blocks; eyebrows are monospace 11–13px.
13. **Few sizes in product chrome.** 14px and 12px account for 366 of ~430 text-size classes found [JS].

---

## 10. Not reachable / not verified

- **Logged-in product.** No login, no account. Not seen rendered: conversation list contents, settings, agents/library pages, model picker, file/attachment chips, canvas, connectors.
- **A rendered conversation.** The guest page shows a "Vibe Terms of Service" dialog that must be accepted before use. I did not accept it and did not send a message. Everything in §6.5 comes from class strings in shipped JS plus CSS tokens — real code, but not measured on screen. Spacing between turns, the streaming indicator, code-block header/copy button in chat, and citation chips are unverified.
- **Dark theme** values come from CSS token blocks only; no dark-mode page was rendered.
- **Product JS coverage.** Only the 131 chunks loaded on the landing route were read; usage counts in §2.3, §3.2 and §7 describe those chunks, not the whole app.
- **Mobile.** No narrow-viewport measurements were taken; only breakpoints from CSS.
- **Hover/active colours** are read from tokens and class strings, not sampled from a live hover.
- **Brand kit zips** not downloaded. **Creative Review** and **Brand New** article bodies not read (bot wall / paywall), so nothing here quotes the designer's rationale.
- `curl` gets HTTP 403 (Cloudflare challenge) on every `chat.mistral.ai` URL including static CSS; those files were fetched from inside a headless Chromium page instead.
