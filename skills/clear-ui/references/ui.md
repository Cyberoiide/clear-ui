# Part 2: UI

Apply this once the structure from Part 1 is agreed. The system is black ink on white, with hairline
borders, one filled button per screen, and colour used only to report status or to tell chart
categories apart. Every value below is in
`assets/tokens.css` as a CSS variable and a reference class; `assets/components.html` shows them all
on one page, in light and dark.

Where the values come from: measured CSS of Linear, ChatGPT, Mistral and Alan. The evidence is
summarised in `sources.md`, with the full teardowns in `research/ui/`.

## Contents

1. The idea in six rules
2. Colour
3. Typography
4. Spacing and layout
5. Radius
6. Borders and shadows
7. Buttons
8. Form controls
9. Other components
10. Motion
11. Icons and imagery
12. Dark mode
13. Using it with Tailwind and shadcn/ui
14. What makes a screen look generated
15. Check before shipping

## 1. The idea in six rules

1. **White page, near-black ink.** Hierarchy comes from three text greys, size and weight.
2. **One filled button per screen**, and it is ink-coloured. Everything else is outlined, soft or ghost.
3. **Colour means status.** Green, amber, red and blue appear only to say success, warning, error
   or information, in small amounts. The one other use is telling categories apart inside a chart.
4. **Hairline borders for things that sit on the page; shadows only for things that float** above it.
5. **Generous, fixed sizes.** Controls have fixed heights on a 4px grid, with radius about a third
   of their height.
6. **Nothing decorative.** If an element carries no information and triggers no action, remove it.

## 2. Colour

### Light theme

| Role | Token | Value | Use |
|---|---|---|---|
| Page | `--bg` | `#ffffff` | The default background |
| Subtle surface | `--bg-subtle` | `#fafafa` | Sidebar, alternate page section, table row hover |
| Soft fill | `--bg-soft` | `#f4f4f4` | Hover, soft button, badge, user chat bubble |
| Soft fill, stronger | `--bg-soft-hover` | `#ececec` | Pressed, selected navigation item |
| Raised surface | `--bg-raised` | `#ffffff` | Inputs, menus, dialogs |
| Ink | `--ink` | `#0d0d0d` | Primary button, checked controls, focus outline |
| Ink hover / pressed | `--ink-hover` / `--ink-active` | `#303030` / `#414141` | The primary button gets lighter on hover |
| Text | `--text` | `#0d0d0d` | Titles, body, values |
| Text, secondary | `--text-2` | `#5d5d5d` | Descriptions, column headers, inactive navigation |
| Text, tertiary | `--text-3` | `#6e6e6e` | Meta, timestamps, counts |
| Placeholder | `--text-placeholder` | `#8f8f8f` | Placeholders and disabled text only |
| Border | `--border` | ink at 8% | Dividers, cards, table rules |
| Border, strong | `--border-strong` | ink at 16% | Inputs, outlined buttons |

Ink is `#0d0d0d` and not `#000000` because pure black on pure white is harsh at text sizes. Borders
are ink at low opacity, not fixed greys, so the same token works on white, on `--bg-subtle` and in
dark mode.

`--text-3` (5.1:1 on white, 4.6:1 on the soft fill) is the lightest grey allowed for text someone needs to read.
`--text-placeholder` fails that test on purpose and is only for placeholders and disabled states.

### Status colours

| Meaning | Text / dot | Soft background |
|---|---|---|
| Success | `#15803d` | `#edf7f0` |
| Warning | `#b45309` | `#fdf4e7` |
| Danger | `#cf2a1e` | `#fdeeed` |
| Information | `#2563eb` | `#edf2fe` |

Use them in badges, inline validation, a 6px status dot, a positive or negative delta. Never as the
fill of a navigation item, a card, an icon tile or a section background. A status colour always
comes with a word or icon, since colour alone is invisible to some users.

### Data colours

A chart is grey by default: marks in `--data-neutral`, and the one mark the user should look at
(today, the current period, the selected row) in `--ink`. That covers any chart with one series, including a
funnel, where the ink mark is the stage with the biggest loss.

When marks belong to different categories and the user has to tell them apart, such as projects on
a timeline, use the five tints, in this order:

| Token | Light | Reads as |
|---|---|---|
| `--data-1` | `#dbe7fe` | Blue |
| `--data-2` | `#fde6cc` | Peach |
| `--data-3` | `#fbd8ee` | Pink |
| `--data-4` | `#e5dcfb` | Violet |
| `--data-5` | `#cdf0dc` | Green |

- A category keeps its tint everywhere on the screen: its interval on the timeline, its bar, and an
  8px square (`.swatch`) before its name in the rows below. This is how a row is tied to its mark.
- Text on a tint is `--text`. The tints are too pale to be read on their own, so every mark carries
  its name and value in text, and adjacent marks are separated by a 2px gap.
- More than five categories: keep the four largest and group the rest as "Other" in
  `--data-neutral`.
- Tints fill chart marks and swatches only. Not cards, badges, navigation, icons or buttons.
- Do not use a status colour as a category: a red bar reads as a problem.

### Brand colour

The default has no accent: the primary action is ink. When a product has a brand colour, treat it the
way Mistral treats its orange: the logo, and small state signals such as a progress fill, an unread
dot, a text selection or a chart's highlighted series. Keep buttons ink. If the user insists on a
brand-coloured primary button, change `--ink`, `--ink-hover`, `--ink-active` and `--on-ink` together
and check that the label passes 4.5:1.

Links in running text are ink with an underline. A blue link colour is acceptable inside long
generated or user-written content, where links must be found quickly.

## 3. Typography

**Typeface.** Inter, loaded as a variable font, falling back to the system stack. Two acceptable
swaps: the plain system stack (what ChatGPT ships, and the right choice when load time matters or
the product should feel native), and a single warmer face such as Alan Sans or Geist for consumer
products. One family per product. Use the monospace stack only for code, IDs and keyboard keys.

**Weights.** 400 for text, 500 for labels, buttons, navigation and headings, 600 for the page title
and large numbers. Nothing heavier. Emphasis in a sentence is 500, not bold.

**Scale.** Product screens use the first seven steps; marketing pages add the last two.

| Token | Size / line-height | Weight | Tracking | Use |
|---|---|---|---|---|
| `--text-xs` | 12 / 16 | 400 or 500 | 0 | Meta, badges, tooltips |
| `--text-sm` | 13 / 20 | 400 or 500 | 0 | Secondary text, labels, table headers, dense lists |
| `--text-base` | 14 / 20 | 400 | 0 | Default for product UI and controls |
| `--text-md` | 16 / 24 | 400 or 500 | -0.01em | Long-form reading, section headings, marketing body |
| `--text-lg` | 20 / 28 | 500 | -0.01em | Dialog and card titles, marketing lead paragraph |
| `--text-xl` | 24 / 32 | 600 | -0.02em | Page title, key numbers |
| `--text-2xl` | 32 / 40 | 600 | -0.02em | Marketing section heading, mobile hero |
| `--text-3xl` | 40 / 48 | 600 | -0.02em | Marketing heading |
| `--text-4xl` | 56 / 60 | 600 | -0.02em | Marketing hero on desktop |

Rules:

- A product screen needs three or four sizes. If a fifth appears, merge two.
- Tracking tightens as size grows and is zero at 14px and below. Never add positive tracking.
- Sentence case everywhere, including buttons, headings and table headers. No uppercase labels.
- Body lines stay under about 75 characters; set a `max-width` in `ch` on paragraphs.
- Numbers in tables and stats use `font-variant-numeric: tabular-nums` and align right.
- Headings use `text-wrap: balance`; paragraphs `text-wrap: pretty`.
- A hero heading drops from 56 to 32 on phones. The rest of the scale stays the same.

## 4. Spacing and layout

**Scale (4px grid):** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 112.

Space shows what belongs together: related things are close, unrelated things are far. Use a bigger
gap before reaching for a divider or a box.

| Between | Gap |
|---|---|
| Icon and its label | 8 (4 in 28px controls) |
| Label and its input | 6 |
| Input and its hint | 6 |
| Two fields in a form | 16 to 20 |
| Two buttons side by side | 8 in product, 16 on marketing pages |
| Text block and the buttons under it | 24 in product, 40 on marketing pages |
| Card padding | 20 (16 dense, 32 for large marketing cards) |
| Cards in a grid | 16 |
| Sections of a product page | 40 |
| Sections of a marketing page | 80 to 112 on desktop, 64 on phones |
| Page padding | 24 on desktop, 16 on phones |

**Widths.** Sidebar 248. Top bar 56 high. Reading column and conversation 768. Forms and settings
640. Dialogs 480. Marketing container 1120 to 1280 with 24px gutters. Product content can run full
width for tables and lists, but text and forms inside it keep their own maximum.

**Breakpoints.** 640, 800, 1120, 1440. On phones: the sidebar becomes a drawer or bottom tabs,
grids become one column, button pairs stack full width with 8px between, wide tables scroll inside
their own container or become stacked rows.

**Alignment.** Left-align product UI. Centre only short, self-contained moments: an empty state, a
login card, a marketing hero. Never centre a paragraph longer than three lines.

## 5. Radius

Radius grows with the size of the element, so small things stay crisp and large things feel soft.

| Token | Value | Use |
|---|---|---|
| `--radius-xs` | 4 | Checkbox, key cap |
| `--radius-sm` | 6 | Tooltip, small highlight |
| `--radius-md` | 8 | 28px controls, menu items, navigation rows |
| `--radius-lg` | 10 | 32px controls |
| `--radius-xl` | 12 | 40px controls, menus, popovers, toasts |
| `--radius-2xl` | 16 | 48px controls, cards |
| `--radius-3xl` | 20 | 56px controls, dialogs, chat composer and bubbles |
| `--radius-4xl` | 24 | Large panels, marketing cards |
| `--radius-full` | 999 | Badges, avatars, switches, the chat send button |

For controls the rule is **radius ≈ height ÷ 3**. That gives a clearly rounded rectangle that never
becomes a pill, which is the shape taken from Alan's buttons. When one rounded element sits inside
another, inner radius = outer radius − the padding between them (never below 4).

## 6. Borders and shadows

- **On the page** (cards, tables, inputs, sidebars, sections): a 1px border in `--border` or
  `--border-strong`, and no shadow.
- **Above the page** (menus, popovers, dialogs, toasts): `--shadow-float` or `--shadow-dialog`, and
  no border. Each shadow already contains a 1px ring that does the border's job.
- Never give a static card a drop shadow, and never combine a border with a shadow.
- Prefer no container at all. Group with space and a heading first; add a border when the content
  is a distinct object (a record, a table, a form); avoid cards inside cards.
- Dividers are 1px in `--border`. Use one between rows of a list; skip them between sections that
  space already separates.

## 7. Buttons

Fixed height, zero vertical padding, weight 500, a 1px border on every variant (transparent unless
the variant is outlined) so all variants are exactly the same size.

| Size | Height | Padding-x | Radius | Label | Icon gap | Use |
|---|---|---|---|---|---|---|
| `btn-xs` | 28 | 10 | 8 | 13 | 4 | Inline in rows, toolbars, toasts |
| default | 32 | 12 | 10 | 14 | 8 | Product screens |
| `btn-md` | 40 | 16 | 12 | 14 | 8 | Forms, dialogs on touch, empty states |
| `btn-lg` | 48 | 20 | 16 | 16 | 8 | Marketing pages, primary action on phones |
| `btn-xl` | 56 | 28 | 20 | 18 | 12 | Marketing hero only |

| Variant | Look | Use |
|---|---|---|
| Primary | Ink fill, white label | The one main action of the screen |
| Secondary | White fill, `--border-strong` outline | The alternative to the primary |
| Soft | `--bg-soft` fill, no border | Repeated or low-emphasis actions |
| Ghost | No fill until hover | Toolbars, Cancel, navigation-like actions |
| Danger | Red label, outlined | Starting a destructive action |
| Danger solid | Red fill | Only the confirm button inside a destructive dialog |

States:

- **Hover:** the fill changes at once (0ms) and fades back over 150ms when the pointer leaves.
  Primary gets lighter (`#303030`); the others gain a soft fill.
- **Pressed:** `transform: scale(0.98)` and the next fill step.
- **Keyboard focus:** a 2px ink outline, 2px away from the button. Only on `:focus-visible`.
- **Disabled:** 45% opacity, `not-allowed` cursor. Prefer keeping the button enabled and explaining
  on click what is missing.
- **Loading:** keep the width, swap the icon for a spinner, keep the label.

Rules:

- One primary per screen. In a dialog, the primary is on the right and Cancel is a ghost button to
  its left.
- The label says what happens: "Send invoice", "Add a client". No arrows or icons added for
  decoration; an icon is there only if it helps recognition.
- Icon-only buttons are square (`btn-icon`) and carry an `aria-label` and a tooltip.
- Pointer hit areas are at least 24px; on touch screens use 40 or 48 high buttons.
- On phones, a pair of buttons stacks full width, primary first.

## 8. Form controls

**Text input.** The same shell as the button of the same size: 40 high, 12px radius, 12px
horizontal padding, 14px text, `--border-strong`. Use 32 (`input-sm`) in toolbars and filters, 48
(`input-lg`) on marketing pages and phones. On touch devices the text is 16px so iOS does not zoom.

- **Label:** 13px, weight 500, above the field, 6px gap. Always visible; a placeholder is not a label.
- **Hint:** 13px in `--text-2`, below the field, 6px gap.
- **Hover:** border darkens to `--text-3`.
- **Focus:** border becomes ink plus a 3px halo in `--ring`.
- **Error:** red border, and the hint is replaced by a red message that says how to fix it.
- **Disabled:** `--bg-soft` fill and placeholder-coloured text.

**Checkbox** 16px, 4px radius, ink when checked. **Switch** 32×20, ink when on; use it for settings
that apply immediately, and a checkbox for choices submitted with a form. **Segmented control** for
two to four mutually exclusive views: a soft track with the selected segment raised in white.
**Select** looks like the input with a chevron; with more than about eight options use a searchable
menu.

Forms are one column, at most 640 wide, labels above fields. Mark optional fields, not required
ones. Validate when the user leaves a field, not on every keystroke.

## 9. Other components

**Sidebar.** 248 wide, `--bg-subtle`, a hairline on its right edge, 12px padding. Order: workspace
or account, search field with its shortcut, navigation, then secondary groups under a 12px label in
`--text-3` (sentence case). Rows are 32 high, 8px radius, 16px icon, 14px label in `--text-2`. The
current row has a `--bg-soft-hover` fill, `--text` colour and weight 500. No coloured bar, no
accent.

**Top bar.** 56 high, hairline below. Page title at 16/500 on the left, actions on the right with
the primary last.

**Card.** `--bg`, 1px `--border`, 16px radius, 20px padding, no shadow. A clickable card darkens its
border on hover; it does not lift. Cards in a grid do not need to be identical: let content decide.

**Table.** Header row 36 high, 13px, weight 500, `--text-2`, sentence case. Body rows 44 high with
hairlines between them and none after the last. Numbers right-aligned in tabular figures. Row hover
is `--bg-subtle`. At most two row actions visible; the rest in a "more" menu at the row's end.

**List row.** 44 high, hairline below, 12px gaps: leading icon or avatar, title, meta in `--text-3`,
trailing status or action.

**Badge.** 22 high, pill, 12px, weight 500, `--bg-soft` fill with `--text-2` text. Status badges use
the status colour on its soft background, with an optional 6px dot.

**Stat.** A 13px label in `--text-2` and the value at 24/600 with tabular figures. A delta, when
there is one, is a small status-coloured number next to it. Use stats when the numbers are what the
user came for, not as a default page header.

**Chart.** Sits directly on the page or in a card, under a 16/500 title that names what it shows.
Axis labels are in `--text-3` with tabular figures, at the smallest text size already on the
screen (12 or 13px), so a chart adds no new size; the baseline is a `--border-strong`
hairline, gridlines are `--border` and dashed, and there are at most four of them. No chart border,
no background fill, no shadow, no gradient under a line, no 3D. Marks have 4 to 6px radius. A value
label sits on or beside its mark at that same size. Hovering a mark shows a tooltip with the exact
value and gives its row below the hover fill; the other marks keep their colour. Draw simple charts in HTML and CSS or inline SVG; add a chart
library only when the chart needs zoom, many series or live data.

- **Bar list** (`.bar-list`): rows of name, bar, number. Bars are 24 high and their width is the
  share of the largest value. Use it for amounts per category and for funnel stages.
- **Timeline** (`.timeline`): a 40 high track with intervals positioned by start and length, an
  axis of evenly spaced labels below (`.timeline-axis`), and a 1px ink line for now. An interval too
  narrow for its label shows it in the tooltip. On a phone the track scrolls sideways.
- **Columns:** bars from a zero baseline, 4px radius on the top corners, at most about 31 of them,
  the current one in ink.
- **Line:** 1.5px in ink, no dots except on the last point and the hovered one.

**Tabs.** 40 high, 14px, weight 500, 20px apart, on a hairline. The selected tab is `--text` with a
2px ink underline.

**Menu and popover.** `--bg-raised`, 12px radius, 4px padding, `--shadow-float`. Items 32 high, 8px
radius, 8px padding, soft fill on hover. Shortcuts sit at the right in key caps. Destructive items
are red and last, after a separator.

**Dialog.** Up to 480 wide, 20px radius, 24px padding, `--shadow-dialog`, over a backdrop of black
at 40%. A title that names the decision, one or two sentences, and buttons at the bottom right.
Use dialogs for decisions that must interrupt; use a side panel or a page for editing.

**Toast.** `--bg-raised`, 12px radius, `--shadow-float`, bottom centre or bottom right. One line,
with an Undo action when the action can be reversed.

**Tooltip.** Ink background, 12px text, 6px radius, 4×8 padding. For naming icon buttons and showing
shortcuts, never for information the user needs.

**Empty state.** Centred in the area it fills: a 16/500 heading, one sentence of up to about 44
characters per line, and a 40px primary button. No illustration needed.

**Conversation.** A 768 column. The user's turn is a right-aligned bubble (`--bg-soft`, 20px radius,
10×16 padding, at most 70% wide). The answer has no bubble and reads as page text at 16/26. 32px
between turns. The composer is fixed at the bottom of the column: `--bg-raised`, `--border-strong`,
20px radius, 10px padding, with secondary controls on the left and a round 32px ink send button on
the right.

**Key cap.** 20 high, 11px, 4px radius, hairline border, `--bg-subtle`.

**Loading.** Skeleton blocks in `--bg-soft` that match the final layout, or a 16px spinner inside the
control that triggered the wait. No full-page spinners after the first load.

## 10. Motion

- **Default:** 150ms with `cubic-bezier(0.4, 0, 0.2, 1)`, for colour, border and opacity.
- **Hover:** appears instantly, fades out over 150ms. This is what makes an interface feel fast.
- **Press:** scale to 0.98 over 100ms.
- **Menus, popovers, dialogs:** fade in while scaling from 0.97, over 150 to 200ms; leave in 100ms.
- Motion answers something the user did. Nothing animates on page load or on scroll, nothing loops,
  nothing bounces.
- Under `prefers-reduced-motion`, transitions are removed.

## 11. Icons and imagery

- One outline family, Lucide by default. Stroke 1.5. Size 16 in controls and navigation, 20 for
  standalone icons. `currentColor`, so icons take the colour of their text.
- Icons support a label; they rarely replace one. Icon-only is fine for universal actions (close,
  search, more) with a tooltip.
- No icons in coloured or tinted tiles, no emoji as icons, no decorative illustrations or 3D
  characters. On a marketing page the product itself, shown in a real screenshot or a live piece of
  UI, is the image.
- Avatars are circles: 24 in rows, 32 in headers, with initials on `--bg-soft-hover` as fallback.

## 12. Dark mode

The dark values are in `assets/tokens.css`. The rules that differ from light:

- Surfaces get **lighter** as they rise: page `#111111`, subtle `#161616`, raised `#1c1c1c`,
  soft fill `#1f1f1f`.
- Text is `#f2f2f2`, not pure white, with `#a3a3a3` and `#8a8a8a` below it.
- Borders are white at 9% and 18%.
- The primary button inverts: light fill, dark label.
- Shadows barely show on dark, so floating surfaces rely on their 1px ring and lighter fill.
- Status colours switch to lighter tints (`#4ade80`, `#fbbf24`, `#f87171`, `#7aa7ff`) on 12% fills.

Build with the tokens only and both themes come for free. Hard-coded hex values in components are
what breaks dark mode.

## 13. Using it with Tailwind and shadcn/ui

Keep the project's existing stack and conventions; map the tokens onto them.

- **Plain CSS or any framework:** import `assets/tokens.css` and use the variables and classes.
- **shadcn/ui:** set its theme variables from these tokens. `--background` → `--bg`, `--foreground`
  → `--text`, `--primary` → `--ink`, `--primary-foreground` → `--on-ink`, `--secondary` and
  `--muted` and `--accent` → `--bg-soft`, `--muted-foreground` → `--text-2`, `--border` →
  `--border`, `--input` → `--border-strong`, `--ring` → `--focus`, `--destructive` → `--danger`,
  `--card` and `--popover` → `--bg` and `--bg-raised`. Then adjust the component files: button
  heights and radii to the table in section 7, remove `shadow-sm` from Card and Input, give the
  popover and dialog the two shadow tokens. Check the variable names and colour format against the
  shadcn and Tailwind versions installed in the project before editing.
- **Tailwind:** expose the tokens through the theme so classes such as `bg-soft`, `text-2` and
  `rounded-2xl` resolve to the variables. Avoid Tailwind's default `shadow-*` utilities on static
  elements and its default colour palette (`blue-500`, `purple-600`, and so on) outside status.

When working in an existing product that has its own design system, its components win. Apply the
rules of this file (one primary, status-only colour, borders versus shadows, spacing) through that
system's tokens instead of importing these.

## 14. What makes a screen look generated

Each of these shows up in machine-made pages regardless of the subject, and none of the four
reference products do them. Leave them out unless the user asks for one by name.

- Gradients on backgrounds, buttons or text; glows; blurred glass panels.
- A purple, indigo or blue accent used because a page "needs" a colour.
- Several accent colours, or pastel tints behind cards and icons.
- Emoji used as icons or bullets; sparkle icons to signal AI.
- Small uppercase, letter-spaced labels above headings.
- One word of a headline in a different colour, weight or italic.
- A row of identical cards with an icon tile, a title and two lines of text.
- The same soft drop shadow under every card; a border and a shadow on the same element.
- An arrow appended to button and link labels.
- Elements that fade and slide up as the page scrolls; cards that lift on hover.
- Everything centred, including long paragraphs.
- Big numbers with small labels as the opening of every page.
- A donut or pie chart; a chart with a rainbow of saturated series; a sparkline beside every number.
- Numbered markers (01, 02, 03) on content that is not a sequence.
- Monospace type for labels or numbers as decoration.
- Vague copy: "Unlock the power of", "Seamless", "Supercharge", "Get started today".
- Placeholder content: "Lorem ipsum", "John Doe", "Acme" where the real subject is known.

## 15. Check before shipping

Look at a screenshot of the result, at desktop and phone width, in light and dark.

1. Is there at most one filled button on the screen, and is it the thing the user most likely wants?
   A screen that is only read, such as a dashboard, has none: do not invent an action to fill the slot.
2. Covering every status colour and chart mark, is the screen only black, white and grey?
3. Do static surfaces have borders without shadows, and floating ones shadows without borders?
4. Are there four text sizes or fewer, weights 400/500/600 only, no uppercase labels?
5. Are all gaps on the 4px grid, and do related things sit closer than unrelated ones?
6. Do controls have the fixed heights and matching radii from the tables?
7. Can everything be reached and seen with the keyboard, with a visible focus outline?
8. Does readable text pass 4.5:1, in both themes?
9. Does it work at 390px wide with nothing clipped and targets of at least 40px?
10. Do empty, loading and error states exist and say what to do next?
11. Where the data has a shape (time, amounts, stages), is it drawn, and does every mark have its
    name and value in text?
12. Is every item in section 14 absent?
13. Then remove one more thing.
