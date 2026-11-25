# Alan (alan.com) — visual design system teardown

Captured 2026-11-25. Purpose: carry Alan's geometry (buttons, sizing, spacing, radii, type scale, layout widths) into a neutral black/white design skill, without its palette.

## How to read this

Every value carries one of three evidence labels:

- **[CSS]** read from shipped CSS text (inline `<style>` blocks of the server-rendered marketing site, or the web app's linked stylesheets).
- **[computed]** read with `getComputedStyle` / `getBoundingClientRect` on live elements in headless Chromium (1440x900 and 390x900 viewports).
- **[article]** stated in Alan's public writing. **[inferred]** is my own reading of the evidence.

Pages measured: `alan.com/` (FR home), `/en` (corporate), `/en-ca` (home), `/en-ca/pricing`, `/en-ca/products/health-insurance`, `/en-ca/contact` (form), `/en/blog`, `/en/careers`, `/login` (web app, the only app screen reachable without an account).

Stack, from the markup: the marketing site and the web app both render the same design system through Tamagui atomic CSS (`_height-t-size-px48`, `_btlr-t-radius-px16`) plus a little Emotion. Components carry the class `murray-next`; legacy rules are scoped `:not(:where(.murray-next))`. Because Tamagui applies hover and press through JS, interaction states were measured live, not read from CSS.

Size names (XS/S/M/L) below are my labels. Alan's own names are not public.

---

## 1. Tokens

### 1.1 Space, size, radius [CSS]

Three parallel scales share the same steps and are plain pixel values (`--t-space-N`, `--t-size-N`, `--t-radius-N`):

```
0 1 2 4 6 8 10 12 14 16 20 24 28 32 36 40 44 48 56 64 80 96 112 128 144 160 176 192
```

```css
--t-space-4: 4px;   --t-space-8: 8px;   --t-space-12: 12px;  --t-space-16: 16px;
--t-space-20: 20px; --t-space-24: 24px; --t-space-32: 32px;  --t-space-40: 40px;
--t-size-28: 28px;  --t-size-40: 40px;  --t-size-48: 48px;   --t-size-56: 56px;
--t-radius-12: 12px; --t-radius-16: 16px; --t-radius-20: 20px; --t-radius-24: 24px;
```

Every token equals its own number in px (each also exists as a `-pxN` alias). The pattern is a 4px grid up to 48, then 8/16px jumps.

### 1.2 Type tokens [CSS]

```css
--f-family: AlanSans, Helvetica, Arial, Sans-Serif;
--f-size-text100: 12.5px;  --f-lineHeight-text100: 16px;
--f-size-text200: 14.5px;  --f-lineHeight-text200: 20px;
--f-size-text300: 16px;    --f-lineHeight-text300: 24px;
--f-size-text400: 18px;    --f-lineHeight-text400: 28px;
--f-size-text500: 24px;    --f-lineHeight-text500: 32px;
```

### 1.3 Colour tokens (for roles only) [CSS]

Nine hue families (grey, indigo, blue, teal, green, orange, red, pink, yellow) at steps 50/100/300/500/700/900, plus `cream #fffcf5`, `fluoYellow #fcff7e` and `whiteAlpha100–900`.

| Role | Token | Value |
|---|---|---|
| Heading text | grey900 | `#282830` |
| Body text | grey800 | `#464754` |
| Caption / helper | grey700 | `#656779` |
| Placeholder / disabled fill | grey500, grey400 | `#9da3ba`, `#b4bcd3` |
| Input border | grey200 | `#dbe2f4` |
| Card border, hover fill | grey100 | `#ecf1fc` |
| Subtle surface, ghost hover | grey50 | `#f5f8fe` |
| Brand / primary action | indigo500 | `#5c59f3` |
| Primary hover / press | indigo700 / indigo900 | `#2f33a8` / `#0c0a66` |
| Tinted button fill | indigo50 | `#f0f3ff` |
| Focus halo, focus border | indigo100, indigo300 | `#d6dbff`, `#8c99fa` |
| Error text / border / halo | red700, red300, red50 | `#c9202e`, `#ffabb0`, `#ffe8e9` |

White on indigo500 is about 5.0:1 (my calculation).

High-contrast theme [CSS]: a second token set remaps single steps (`--indigo500 → indigo700`, `--grey500 → grey700`, `--grey200 → grey600`, `--linkTextDecoration: underline`, `--hoverOutline: indigo700`). Geometry does not change.

---

## 2. Typography

- **Typeface**: `AlanSans`, a custom variable font, one file covering weights 300–900 [CSS]:
  ```css
  @font-face{font-family:AlanSans;font-style:normal;font-weight:300 900;
    src:url(.../AlanSans-variable.woff2)format("woff2");font-display:swap}
  ```
  Fallbacks: `Helvetica, Arial, sans-serif`. It is open source (SIL OFL 1.1, on Google Fonts as "Alan Sans") [article], so the skill may use it or any friendly grotesque.
- **Scale in use** [computed], size/line-height:

  | Use | Desktop | Mobile (390) | Weight |
  |---|---|---|---|
  | Hero H1 (home) | 64/70 | 32/40 | 500 |
  | Section H2 (home) | 56/64 | 24/32 or 32/40 | 500 |
  | Page H1 (form, blog) | 40/48 | — | 500 |
  | H1 inner pages, H2 | 32/40 | 24/32 | 500 |
  | H3, lead paragraph | 24/32 | 18/28 | 500 / 400 |
  | Card title, large body, L button | 18/28 | 18/28 | 500 / 400 |
  | Body, button label, nav | 16/24 | 16/24 | 400 / 500 |
  | Secondary text, field label, helper | 14.5/20 | 14.5/20 | 400 / 500 |
  | Caption, legal | 12.5/16 | 12.5/16 | 400 / 500 |
  | App screen title (login H1) | 24/32 | 24/32 | 500 |

- **Weights**: 400 for running text, 500 for every heading, label, button and nav item. 700 appears only in legacy rules. Headings are never bold.
- **Line-heights** are all multiples of 4px except 64/70.
- **Letter-spacing**: `normal` on every measured element. No tracking, no uppercase labels.
- Headings have `margin-bottom: 0`; spacing comes from the parent's `gap` or spacer elements.
- Legacy heading scale still shipped for non-Murray content [CSS]: 84/90, 60/66, 42/48 (w500), 30/36 (w800), 22/30, 18/24 (w700). Do not copy; it is the old system.

---

## 3. Spacing and layout

### 3.1 Breakpoints [CSS]

`640 / 800 / 960 / 1120 / 1440` px, min-width, mobile-first (named `sm md lg xl xxl`; `xs` is 0). 960 is by far the most used (2,639 rules), i.e. the mobile/desktop switch.

### 3.2 Containers [CSS + computed]

```css
@media (min-width: 640px)  { max-width: 608px;  }
@media (min-width: 800px)  { max-width: 752px;  }
@media (min-width: 960px)  { max-width: 944px;  }
@media (min-width: 1120px) { max-width: 1088px; }
@media (min-width: 1440px) { max-width: 1280px; }
```

- Container has 16px inline padding, so content is 1248 wide at 1440.
- Mobile gutter 16px: content is 358 wide at 390.
- Header and full-bleed bands cap at 1800px.
- Text measure caps: hero H1 `max-width: 1008px`, intro copy `800px`, section headings about 604–827 wide at 32–56px.
- 12-column grid (8.33% steps) with gutters of 8 / 24 / 32px by breakpoint (padding 4/12/16 each side).

### 3.3 Header [CSS + computed]

```css
--website-header-height: 84px;
--header-padding-inline: max(clamp(16px, calc(16px + 24 * (100vw - 960px) / 160), 40px), calc((100vw - 1800px) / 2));
--header-item-row-inset: calc((84px - 40px) / 2);
```

Sticky, 84px tall, transparent, no border, no shadow, no blur. Items are 40px-high ghost buttons, so there is 22px above and below.

### 3.4 Vertical rhythm [computed]

- Gaps used inside components, by frequency: **8, 16, 24, 32**, then 4, 12, 40, 48. Section-level: 64, 80, 160.
- Section separation on desktop uses spacer elements of **80, 112, 144px** and band padding of `120/120`, `64/160`, `48/80`. Hero top padding is 84 (header) + 84.
- A responsive spacer is literally `height: 60px` on mobile and `120px` from 640px [CSS].
- Mobile bands use `32/24`, `24/24`, `32/32`, `40/40`.
- Hero (en-ca, 1440): H1 two lines at 64/70, then a 24/32 subtitle, then **40px** to the CTA row; CTAs sit 16px apart.

---

## 4. Radii and shadows

### Radius ladder [computed]

| Radius | Used on |
|---|---|
| 8 | small mobile tiles |
| 12 | XS button, inset info box, inline chip button |
| **16** | S and M buttons, inputs, selects, small cards, pricing cards |
| 20 | L button, 48px icon button |
| **24** | standard cards, form card, 56px round-ish icon button, switch track |
| 32 | large feature panels |
| 56 | section-sized coloured panels (1216–1392 wide) |

Nothing is a full pill and nothing is square. Radius grows with the size of the box.

### Shadows [CSS]

```css
box-shadow: 0px 1px 4px 0px #2828300f;   /* buttons (filled and outlined) */
box-shadow: 0px 1px 4px 0px #4647540F;   /* bordered cards */
box-shadow: 0px 2px 6px 0px #4647540F;   /* card hover */
box-shadow: 0px 0px 2px 0px #4647540F;   /* card pressed */
box-shadow: 0px 2px 20px 0px #4647540F;  /* floating panels, menus */
box-shadow: 0px 0px 12px 0px #2828300f;
```

All shadows are 6% alpha of the text colour, never black, and never offset more than 2px. Elevation is carried mostly by a 1px `#ecf1fc` border plus the faintest shadow.

Borders: 1px everywhere. 2px appears only for an accent side-border and outlines.

---

## 5. Motion

- Colour changes [CSS]:
  ```css
  transition: background-color 100ms linear, border-color 100ms linear, color 100ms linear;
  ```
- Primary filled button [computed]: the wrapper scales to **1.02 on hover and 0.98 on press**. It is JS-driven, so duration and easing were not readable.
- Switch [computed]: `transition: 0.25s cubic-bezier(0.2, 1, 0.4, 1)`.
- Most-used easing on the site [CSS]: `cubic-bezier(0.34, 1.56, 0.64, 1)` (slight overshoot, 16 uses), then `cubic-bezier(0.37, 0, 0.63, 1)` for slow loops.
- Entrances: `slideUpAndFadeIn`, `scaleAndFadeIn`, 300–600ms ease-out.
- 55 `prefers-reduced-motion: reduce` blocks; animations are disabled under it.

---

## 6. Buttons

### 6.1 Sizes [computed]

| Size | Height | Padding-x | Radius | Label | Gap | Icon | Seen on |
|---|---|---|---|---|---|---|---|
| XS | 28 | 12 | 12 | 14.5/20 w500 | 4 | 16 | secondary nav row (FR home) |
| S | 40 | 16 | 16 | 16/24 w500 | 8 | 16 or 24 | header nav, header CTA, "Login" |
| **M** | **48** | **20** | **16** | 16/24 w500 | 8 | — | default everywhere, forms, cards |
| L | 56 | 28 | 20 | 18/28 w500 | 12 | — | hero CTAs only (desktop) |
| Icon M | 48x48 | 0 | 20 | — | — | 24 | mobile menu |
| Icon L | 56x56 | 0 | 24 | — | — | 32 | play video |

All have `padding-top/bottom: 0` with a fixed height, a 1px border (transparent when not outlined), and `max-width: 100%`.

Verbatim recipe for size M (Tamagui atoms resolved) [CSS]:

```css
/* M button */
height: var(--t-size-px48);                     /* 48px */
padding: 0 var(--t-space-px20);                 /* 0 20px */
border-radius: var(--t-radius-px16);            /* 16px */
gap: var(--t-space-px8);                        /* 8px */
border: var(--t-space-px1) solid transparent;   /* 1px */
display: flex; flex-direction: row; align-items: center; justify-content: center;
cursor: pointer; max-width: 100%;
transition: background-color 100ms linear, border-color 100ms linear, color 100ms linear;
/* label */
font-family: var(--f-family); font-size: var(--f-size-text300); line-height: var(--f-lineHeight-text300); font-weight: 500;
```

### 6.2 Variants and states [computed]

| Variant | Rest | Hover | Press |
|---|---|---|---|
| **Primary (filled)** | bg indigo500, white label, shadow `0 1px 4px 6%` | bg indigo700, **scale 1.02** | bg indigo900, **scale 0.98** |
| **Outlined (secondary)** | bg white, 1px grey100 border, indigo500 label, same shadow | label indigo700, no scale | label indigo900, border grey50 |
| **Tinted (tertiary)** | bg indigo50, indigo500 label, no shadow | bg grey100, label indigo700 | bg grey100, label indigo900 |
| **Ghost (nav)** | transparent, grey900 label | bg grey50 | bg grey50–grey100 |
| **Disabled** | bg grey400 `#b4bcd3`, label grey50, `cursor: not-allowed`, `disabled` + `aria-disabled` | — | — |

- Shadow does not change on hover or press. The only "lift" is the 2% scale on the filled primary.
- Focus: on the buttons tested (login "Continuer", nav) keyboard focus showed the browser default ring. The shipped CSS also defines a custom ring used on some elements [CSS]:
  ```css
  :focus-visible { outline-style: solid; outline-width: 2px; outline-offset: 2px; outline-color: var(--indigo700); }
  ```
  Which components use it was not confirmed.
- Mobile [computed]: buttons go full width (358 at 390), stack vertically with 8px gap, and L (56) drops to M (48).

### 6.3 Neutral translation [inferred]

Primary = solid near-black fill, white label; hover/press = two darker or lighter steps plus the 1.02/0.98 scale. Outlined = white fill, 1px hairline, faint shadow. Tinted = 4–6% grey fill, no border. Ghost = transparent to 3% grey on hover.

---

## 7. Other components

### Text input [computed, `/en-ca/contact` and `/login`]

- Wrapper 48 high, `padding: 11px 15px` + 1px border (so 12/16 optically), radius 16, white, border grey200 `#dbe2f4`, no shadow.
- Text 16px w400 grey800. The inner `<input>` has no border, outline or padding.
- Label above: 14.5/20 w500 grey900, **4px** above the field. Required mark is ` *` in the label.
- Helper below: 14.5/20 w400 grey700, **8px** below the field.
- Hover: no change.
- Focus: border indigo300 `#8c99fa` plus a **4px solid outline** in indigo100 `#d6dbff`, offset 0 (a soft halo, not a hard ring).
- Error: border red300 `#ffabb0` plus 4px outline red50 `#ffe8e9`; message 14.5/20 w400 red700 under the field.
- Select: same shell (48 high, radius 16, 1px grey200), `cursor: pointer`.
- Form layout: two half-width fields side by side with 16px gap (279 + 16 + 279), then full-width fields (574) at an **88px pitch** (48 field + 40 for label and gaps). Form sits in a card: radius 24, padding 32, 1px grey100 border, faint shadow, 640 wide.

### Cards [computed]

| Type | Radius | Padding | Surface |
|---|---|---|---|
| Feature tile | 24 | `32px 24px 24px` | flat tint, no border, no shadow |
| Pricing / bordered card | 16 | `40px 24px` | white, 1px grey100, shadow `0 1px 4px 6%` |
| Compact row card | 16 | 24, or `10px 24px` at 80 high | white |
| Large panel | 32 | 40, inner gap 16–32 | grey50 flat |
| Section panel | 56 | `0 80px` | flat colour, up to 1392 wide |
| Inset info box (login) | 12 | 16, gap 16 | grey50 flat |

Pricing card anatomy (389 wide): title 18/28 w500 at +40, description 14.5/20, three feature lines at a 45px pitch, price 18/28 w500, then a full-width M button about 21px under the price.

### Switch [computed, one instance]

Track 40x24, padding 3, radius 24, off colour grey600 `#82879c`; thumb 18px circle. Hover adds a 4px outline. On-state colour not captured.

### Navigation

Desktop: logo left at x=40, ghost S buttons with 16px chevrons, one outlined S "Login", optional filled S CTA. Mobile: logo plus a 48x48 outlined icon button.

### Footer [computed]

Dark band; links 14.5/20 w500, legal 12.5/16. Link rows are 18–25px tall, i.e. text-only targets, the one place hit areas are small.

### Not observed on any reachable page

Modals, checkboxes, radios, tags/pills, tabs, tables, list rows, toasts. See section 11.

---

## 8. Principles from Alan's own writing

Gathered by a research pass; Medium posts were read through a mirror because Medium blocked direct fetches, so check quotes against the originals before reusing them.

**Design system — "Towards a universal Design System"**, Tim Petricola, 12 Mar 2024, https://medium.com/alan/towards-a-universal-design-system-dc4a65e1e13d
- The system is called **Murray** ("after Bill Murray, who played in Groundhog Day"). This matches the `murray-next` / `murray__` classes in the shipped code. I found no source for the name "Mosaic".
- It began "as a simple means to share a Button component between two web products".
- Since 2023 there is one universal implementation on React Native for Web + Tamagui, chosen for "its straightforward approach to managing design tokens".
- Constraints are mobile-first: no cascading styles, "only flexbox for layout", no CSS pseudo-states. This explains the fixed heights, gap-based spacing and JS-driven hover measured above.
- Figma is the source of truth; docs site and Storybook exist but no public URL is given.

**Typeface — "How we created Alan Sans"**, Raphaël Ronot, 24 Sep 2025, https://typeface.alan.com/how-we-created-alan-sans ; repo https://github.com/alan-eu/Alan-Sans ; https://fonts.google.com/specimen/Alan+Sans
- Brief: "Edgy but not intimidating", "**Friendly but not childish**", "Distinctive: not the typical tech startup 'bland' sans serif".
- Replaced Filson Pro; tuned to occupy "roughly the same horizontal space" with looser spacing that "slightly improves the readability at small size".
- "the bolder you go, the more personality the typeface reveals" — consistent with the UI staying at 400/500.
- SIL OFL 1.1, released 16 Sep 2025.

**Brand and mascot — "How our mascot came to life"**, 20 Feb 2026, https://alan.com/en/blog/discover-alan/a/how-our-mascot-came-to-life
- Stance: "profound levity: give people the answers they need with the warmth they deserve".
- Emotional target: "Lightness, caring, fun-but-not-comical". "A mascot you want to hug."
- "Consistency isn't about looking identical everywhere. It's about feeling the same everywhere."
- Related: https://medium.com/alan/generative-branding-c7499b2cf679 and https://medium.com/@duncid/embracing-ai-in-brand-design-at-alan-8a27207a5694 (mascot as "furry, 3D indigo beast", generated imagery).

**Accessibility statement**, updated 8 Oct 2026, https://alan.com/en-fr/accessibility-notice
- High-contrast mode "increases color contrast and underlines links" and persists.
- Self-assessed 53.25% RGAA 4.1 conformance on the website; known gaps include insufficient contrast and name/role/state exposure. So Alan's accessibility is a work in progress, not a model to copy as-is.

**Process**: https://medium.com/alan/design-collaboration-at-alan-in-2021-bd62e16b7176 and https://medium.com/alan/alan-design-behind-the-screens-9263628dcbb1 (team size, async written culture; few visual principles).

No public post on tone of voice, button specs or token values was found. No public brand-guidelines page; the press kit (https://alan.com/en/press-room) has logos only.

---

## 9. Why the geometry feels good [inferred from the measurements]

1. **Height is 3x the font size.** M button: 48 high, 16px label, 24px line-height, so 12px of air above and below. L: 56 / 18 = 3.1. Nothing is cramped and nothing needs padding tweaks.
2. **Horizontal padding is a bit more than the font size and grows faster than height.** 12 / 16 / 20 / 28 for heights 28 / 40 / 48 / 56 (0.43h, 0.40h, 0.42h, 0.50h). Short labels still produce wide, calm shapes (a one-word M button is about 130px).
3. **Radius is about one third of the height, never a pill.** 12 / 16 / 16 / 20 for 28 / 40 / 48 / 56. This "squircle" proportion is the friendly signal; a full pill reads playful and 4–8px reads enterprise.
4. **Padding is 1.25x the radius** on M (20 vs 16), so text never sits in the curve.
5. **Inputs and buttons share one shell**: 48 high, radius 16. A field and its submit button line up exactly.
6. **Radius scales with container size**: 12 → 16 → 24 → 32 → 56. Inner radius is always smaller than outer, so nesting looks deliberate.
7. **One spacing grammar**: 4 (label to field), 8 (field to helper, icon to label), 16 (between sibling controls), 24–32 (inside cards), 40 (between groups, before a CTA), 80–144 (between sections). Each step is roughly 1.5–2x the last.
8. **Hit targets**: 48 for every real action on both desktop and mobile, 40 for navigation, 28 only for dense desktop sub-nav. Mobile buttons are full width.
9. **Whitespace around the primary action**: 40px above the hero CTA row, 16px between the two CTAs, and no other filled element in the viewport.
10. **Few actions per screen**: every measured first viewport has exactly **one filled primary**, at most one outlined secondary beside it, and quiet ghost navigation. The login screen has one field and one full-width button in a 408px column.
11. **Type is medium, not bold**: weight 500 headings with zero tracking and generous line-height (ratio 1.1–1.25 for display, 1.5 for body) read as confident but soft.
12. **Flat first, depth last**: 1px hairline + 6% shadow at 1px offset. Elevation never competes with the content.
13. **Feedback is quick and physical**: 100ms linear colour change plus a 2% grow / 2% shrink on the primary.

---

## 10. What to leave out (why the palette reads childish)

- **Saturated violet-blue as the action colour**: indigo500 `#5c59f3`, with indigo label text on white for secondary buttons, so the whole UI is tinted.
- **Blue-tinted "greys"**: `#f5f8fe`, `#ecf1fc`, `#dbe2f4`, `#9da3ba`. Nothing is neutral; even borders are lavender.
- **Pastel tile fills**: yellow50 `#fff6df`, orange50 `#fff3e5`, blue50 `#ebf5ff`, cream `#fffcf5`, pink50 `#ffe7f0`, teal50 `#ebfaf9`, often several on one page.
- **Candy accents**: pink500 `#ff709b`, orange500 `#ff9359`, yellow500 `#ffb619`, `fluoYellow #fcff7e`.
- **Nine hue families** in the token set; the neutral skill needs one grey ramp plus a single semantic red.
- **Sky-blue gradient hero backgrounds**.
- **3D clay/fur illustration**: a furry indigo mascot (heart eyes on the login screen), cotton-candy trees in pink, orange and teal, toy-like 3D phones, lightning bolts and clouds.
- **Emoji in UI copy** (flags, "Blog 🌏").
- Coloured section panels with 56px radius filled in teal900 `#124548` or pastel blue.

Keep: the dark text ramp idea (heading / body / caption as three steps), the 6%-alpha shadow, the halo-style focus ring (recolour to neutral), and the error treatment structure (border + halo + message).

---

## 11. Not reachable or not verified

- **Logged-in web app and the mobile app**: only `/login` was reachable. Modals, checkboxes, radios, tabs, tags/pills, tables, list rows, toasts and the app's navigation were not measured. Legacy (pre-Murray) modal and dropdown CSS exists in the web app's stylesheets but was not treated as current.
- **`/fr`, `/fr/...`, `/blog`** return the web-app shell, and `/en-fr/...` returned 404 to curl. The FR marketing home is `alan.com/`.
- **Button focus ring**: computed style showed the browser default on tested buttons; the custom 2px/2px-offset ring exists in CSS but its targets were not confirmed.
- **Scale animation timing/easing** on the primary button: JS-driven, not read.
- **Switch on-state** and any checkbox/radio styling: not captured.
- **Size and variant names**: mine, not Alan's.
- **"Mosaic"** as a design-system name: no source found. "Murray" is confirmed.
- **Medium posts** were read via a mirror; **Creative Review** and **LS:N Global** articles on the rebrand were blocked; the internal Docusaurus docs and Storybook are not public.
- **Dark mode**: no `prefers-color-scheme` query appeared among the media queries on the sampled pages; I did not look further.
- Hover on the L (56) hero buttons did not register in one headless run; their hover behaviour is assumed to match M, which was measured.

