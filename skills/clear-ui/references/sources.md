# Where the system comes from

Both parts of the skill rest on a study of four products made in November 2026: Linear, ChatGPT,
Mistral and Alan. The study was done twice, once for behaviour and structure (UX) and once for the
visual system (UI). This file summarises what each product contributed to each part. The full
teardowns, with source URLs, are in:

- `research/ux/linear.md`, `research/ux/chatgpt.md`, `research/ux/mistral.md`, `research/ux/alan.md`
- `research/ui/linear.md`, `research/ui/chatgpt.md`, `research/ui/mistral.md`, `research/ui/alan.md`

Read one when a task needs a detail this summary lacks, such as the exact steps of Alan's quote
funnel or Linear's shadow stacks.

## Part 1: UX evidence

### How it was gathered

No accounts were created, so the depth differs by product:

- **Linear:** mostly observed live, in its public demo workspace, which runs the real client with
  sample data. Onboarding after signup, settings, sync and real search were read in docs only.
- **ChatGPT:** the logged-out site used live (one question sent, signup walked to the password
  step). The logged-in sidebar, settings and message actions come from the Help Center and official
  screenshots.
- **Alan:** the public quote funnel walked live up to the email step, in French; the marketing
  site; the member app only through official screenshots and store listings. Quote results and
  prices were not seen.
- **Mistral:** the guest screen, docs and marketing site live. A guest could not hold a
  conversation, so chat behaviour comes from app-store screenshots, docs and the text strings
  shipped in the page, which prove wording but not layout or timing.

### What each one contributed

**Linear: orientation and speed in a dense tool.** Location shown in several agreeing places
(sidebar, breadcrumb, title, URL, "4 / 10"). A working first screen with defaults instead of a blank
one. Creating with one field. Editing in place through anchored pickers, with forms only for
creation. The same action reachable from a control, a right-click menu and the command menu under
one name, with shortcuts taught in tooltips. Rows that carry facts and no buttons. Feedback through
the change itself, toasts only for out-of-sight events, specific undo, and confirmation that scales
with the damage. Filters announced loudly and kept separate from display options. Their stated
principles: opinionated defaults over configuration, and "Structure should be felt not seen".

**ChatGPT: one entry point and immediate use.** The main task available before any account or
choice. Everything attached to one composer, with one button slot that changes role and active
modes shown as removable chips. Acknowledgement within about 0.3 seconds and a page that never
moves under the reader. Actions that appear only when usable, capped per unit (OpenAI's guideline:
two per card). Locked features kept visible with a reason. Failure that keeps the input and offers
Retry; limit messages that give the reset time and the way out. Settings that apply immediately.
One search for everything.

**Alan: making a complicated subject effortless.** One question per screen where a tap is also
"next". Asking what people know and deriving the rest, at the lowest precision that works, with the
reason beside the field and "not now" as a real answer. The effort announced up front. Options in
the user's words with the technical term underneath. Outcome first, then a breakdown that adds up,
with limits as "remaining of total" and zero shown explicitly. One running example through every
explanation. Navigation by audience, four verb-named app tabs, a person reachable from every step.

**Mistral: precise wording, and what to avoid.** Depth offered as outcomes ("Fast", "Think")
instead of a model list. Destructive actions described as sentences about the user's things, with
what survives stated. Four phrasings per operation (running, done, stopped, failed) and one status
line that expands. Disabled controls that explain themselves. Docs that show location three ways.
It also supplied most of the "what to avoid" list: a terms gate before an unusable feature,
enabled-looking controls that redirect to login, identical "Sign in" and "Sign up" screens, limits
as multiples, and a rename that outran its help content.

### Where the products disagree

- **Density.** Linear packs about ten facts into a 44px row for people who use it all day; Alan
  shows one question per screen for people who visit once a year. The skill picks by frequency of
  use (see `ux.md` section 1).
- **Feedback.** Linear shows almost no toasts; ChatGPT and Mistral confirm more. The skill follows
  Linear: the visible change is the feedback, toasts are for what happens out of sight.
- **Keyboard.** Linear and ChatGPT invest heavily in shortcuts; Alan has none. Shortcuts are for
  frequent tasks in daily tools, always in addition to a visible control.

## Part 2: UI evidence

The values in `ui.md` were chosen after reading shipped CSS and computed styles. Only logged-out
pages and login screens were measured; logged-in screens were read from shipped code and marketing
replicas, and hover and focus states mostly from CSS rules.

### What all four agree on

These became the core rules, because four independent teams arrived at the same answers.

| Rule | Linear | ChatGPT | Mistral | Alan |
|---|---|---|---|---|
| Primary action is neutral, not a brand hue | Marketing CTA is a neutral pill | `#0d0d0d` pill | `#1a1a1e`, never orange | (uses indigo: left out) |
| Text is near-black, not `#000` | `#1b1b1b` | `#0d0d0d` | `#201f1c` | dark navy |
| Borders are hairlines at low opacity | Translucent 1px | Ink at 5/10/15% | Ink at 10/15/25% | 1px on every button |
| Static cards have no drop shadow | Border only | Two shadowed elements on the page | Zero shadows on site and docs | Faint 6% shadow |
| Shadows are for floating surfaces | Layered, 2 to 12% | Ring plus drop | Floating only | `0 2px 20px` panels |
| Weights stop at 600 | 450/500/600 | 400, strong 600 | Headings 500 | 400/500 |
| Controls have fixed heights | 24/28/32/44 | 32 default, 44 touch | 24/28/32/36/40 | 28/40/48/56 |
| State changes take 100 to 150ms | 150ms fade-out | 150ms | 150ms, 75ms buttons | 100ms |
| One main action per view | Yes | At most two actions per card | Yes | One filled, one outlined |

### What each one contributed

**Linear: restraint and density.** One accent in the whole app, with other hues reserved for status.
A small type scale centred on 13px with tracking that tightens as size grows. Radius that grows with
the size of the surface (3, 6, 8, 10, 12, 16). Hover that appears at once and fades out over 150ms.
Row-based layouts: 44px issue rows, 36px list headers, 32px menu items. Their own words: "Structure
should be felt not seen" and "Don't compete for attention you haven't earned".

**ChatGPT: the black-and-white palette.** The ink value `#0d0d0d`, the text greys `#5d5d5d` and
`#8f8f8f`, the soft fill near `#f3f3f3`, borders as ink at low opacity, the primary button that gets
lighter on hover, the dark theme whose surfaces lighten as they rise, and the conversation layout
(768px column, right-aligned user bubble at 70% width, unboxed answer, round send button). OpenAI's
published guidance supplied several UX rules: at most two actions per card, system fonts, no custom
gradients, monochrome outline icons.

**Mistral: how to hold a brand colour back.** The brand orange appears on the logo, the text caret,
a progress fill and a 6px unread dot, and on no button. White is kept for raised surfaces on a
slightly off-white page. The neutral focus ring (a 3px halo at 10% plus a darker 1px edge) and the
0.97 press scale came from here.

**Alan: button geometry, sizing and spacing.** Fixed-height buttons with zero vertical padding and a
1px border on every variant, so variants never change size. Height about three times the label
size, radius about a third of the height (a rounded rectangle, never a pill), inputs that share the
button's shell. The 4px spacing grid and its large section gaps (64 to 112), the 40px gap between a
text block and its buttons, the 16px gap between two buttons on marketing pages, full-width stacked
buttons on phones, and one filled plus at most one outlined action in the first screen.

### Where the system differs, and why

- **Buttons are rounded rectangles, not pills.** Linear and ChatGPT use pills; this follows Alan's
  shape, which was the stated preference. Pills are kept for badges, switches and the send button.
- **A 32px default was added to Alan's sizes.** Alan's smallest practical button is 40px, which is
  too tall for dense product screens. 28 and 32 come from Linear and Mistral, scaled with the same
  radius rule.
- **Base text is 14px, not Linear's 13px.** 13px is kept for secondary text and dense lists; 14px
  reads more easily for people who do not live in the tool all day.
- **The page is pure white.** ChatGPT uses `#fcfcfc` and Mistral a warm `#fbfbf8`. White with a
  `#fafafa` sidebar keeps the black-and-white look that was asked for.
- **No accent at all by default.** Linear keeps one indigo accent; here the ink does that job, and a
  brand colour is opt-in.
- **Alan's palette, illustrations and mascot are left out.** The saturated indigo, blue-tinted
  greys, pastel tiles, sky gradients, 3D character and emoji in copy are what made it read as
  childish.
- **Cards carry a border and no shadow.** Alan and the earlier `clean-ui-design` skill use a faint
  shadow on cards; the other three use borders, and a border survives dark mode.
- **Text greys are a little darker than the sources where needed.** Alan reports 53% accessibility
  conformance and several source greys fail 4.5:1, so `--text-3` is `#6e6e6e`.

### Open points in the research

- The logged-out ChatGPT page showed a blue send button and user bubble while its tokens define a
  black button and neutral bubble. The system follows the tokens.
- Linear's logged-in default theme could not be established; the neutrals used are from its login
  screen.
- Mistral's product has been renamed from Le Chat to Mistral Vibe; conversation spacing there was
  read from code, not measured.
