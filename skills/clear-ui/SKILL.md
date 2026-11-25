---
name: clear-ui
description: >-
  UX-first design for clean, black-and-white product UI in the spirit of Linear, ChatGPT, Mistral
  and Alan. Works in two parts: first propose a few UX directions as wireframes in the chat and get
  the user's choice, then build the UI with a fixed token system (ink on white, hairline borders,
  one filled button per screen, colour only for status and chart categories). Use this whenever the user asks to design,
  build, redesign, restyle or review any interface: a web app, dashboard, admin panel, landing page,
  form, settings page, onboarding flow, chat interface, mobile screen or single component. Also use
  it when they say "clean", "simple", "minimal", "like Linear", "black and white", "not AI slop",
  "make this look better" or "the user gets lost", and when a frontend task has no stated visual
  direction.
---

# clear-ui

A way of designing interfaces where the user always knows where they are and what to do next, and
nothing on screen is there for decoration. White page, near-black ink, hairline borders, one filled
button per screen, colour only to report status or tell chart categories apart.

The work has two parts, in this order:

1. **UX:** decide the structure with the user, using wireframes shown in the chat.
2. **UI:** apply the visual system to the structure they chose.

The order matters because a clean look cannot rescue a confusing structure, and structure is cheap
to change as a wireframe and expensive to change as styled code. Showing options also lets the user
react to something concrete instead of describing what they want in the abstract.

## Part 1: UX

Read `references/ux.md` before starting. In short:

1. **Understand the job.** Who uses the screen, the one thing it is for, what they need to see
   first, the primary action, and the real content. Read existing code or screens first. Where
   something is unknown, propose an answer and label it as an assumption; ask only if the answer
   would change the structure.
2. **Take inventory and cut.** List what could be shown and done; keep what the job needs, move the
   rest one click away or drop it.
3. **Show two or three directions in the chat.** They differ in structure (navigation, what comes
   first, number of steps, list or table or cards, page or panel), not in styling. Each has a
   descriptive name, a one-sentence idea, a grayscale wireframe with real labels, what it is best
   at and what it costs. Say which one you recommend and why.
   - If the environment can render HTML inline for the user (an HTML preview or render tool, an
     artifact), build the wireframes from `assets/wireframe.html`.
   - Otherwise draw them as ASCII in a code block.
4. **Stop and let the user choose.** Do not write UI code or pick visual details before they answer.
   When they do, restate the agreed structure in three to five lines.

The directions should already follow the rules in `references/ux.md` section 6, which come from
how the four reference products behave. The ones that shape structure most:

- **The user can always tell where they are:** selected navigation, breadcrumb, title and URL agree.
- **The main task comes first:** usable before any signup or choice, from one entry point.
- **One primary action per screen;** at most two actions per card; rows carry facts, not buttons.
- **Ask less:** one question per screen in guided flows, pre-filled defaults, creation with one
  field, "not now" as a real answer.
- **Every action answers back:** the change itself is the feedback, undo instead of confirmation
  where possible, and typed text is never lost.
- **Outcome first, in the user's words:** the result, then a breakdown that adds up.
- **Data in its shape:** things with a start and an end go on a timeline, amounts per category
  become sorted bars, stages become a funnel, and one to three numbers stay numbers. A chart has to
  answer a question the rows cannot; the rows stay below it for acting. Draw the chart in the
  wireframe.

Skip Part 1 only when the user asks to go straight to the UI, or when the task changes the look of
an existing screen without changing its structure. Say that you are skipping it.

## Part 2: UI

Read `references/ui.md` before writing code. It holds every value: colour, type, spacing, radius,
buttons, form controls, components, motion, dark mode, and the list of things that make a screen
look generated. The rules that shape everything else:

- **Ink on white.** Text and the primary button are `#0d0d0d` on a `#ffffff` page. Hierarchy comes
  from three text greys, size and weight (400, 500, 600 only).
- **One filled button per screen.** It is ink-coloured and labelled with what it does. Other actions
  are outlined, soft or ghost.
- **Colour means status.** Green, amber, red and blue appear only for success, warning, error and
  information. No accent colour by default; a brand colour is limited to the logo and small state
  signals.
- **Charts are grey with one ink mark.** Five pale tints exist only to tell categories apart inside
  a chart, and a category keeps its tint in the rows below it. Every mark has its name and value in
  text.
- **Borders on the page, shadows above it.** Static surfaces get a 1px border at 8 to 16% ink and no
  shadow. Menus, dialogs and toasts get a shadow and no border.
- **Fixed, generous sizes.** Buttons and inputs are 28, 32, 40, 48 or 56 high with radius about a
  third of the height: rounded rectangles, not pills. Spacing is on a 4px grid.
- **Type is small and plain.** Inter or the system font, 14px base, sentence case everywhere,
  tracking that tightens only on large sizes.
- **Motion answers the user.** Hover appears at once and fades over 150ms; nothing animates on load
  or scroll.

Start from the bundled files instead of rewriting them:

- `assets/tokens.css`: all tokens as CSS variables for light and dark, plus reference classes for
  buttons, fields, cards, menus, dialogs, badges, tabs, tables, the app shell and the conversation
  layout. Copy it into the project, or map its variables onto the project's Tailwind or shadcn/ui
  theme as described in `references/ui.md` section 13.
- `assets/components.html`: every component on one page. Open it to see the intended result, and
  copy markup from it.

In a project that already has a design system, keep its components and apply these rules through
its tokens.

Write the interface's words with the same care as its layout: name things as the user would, make
button labels say what happens, keep one name per thing through a flow, and make errors and empty
states say what to do next.

## Finish

Take a screenshot of the result when the environment allows it, at desktop and phone width and in
both themes, and go through the checklist in `references/ui.md` section 15. Fix what fails, then
remove one more thing that is not earning its place. Tell the user what was built and anything left
unverified.

## Reference files

| File | Read it when |
|---|---|
| `references/ux.md` | Starting any task: the UX method, wireframe rules, the rules that keep users oriented, common patterns |
| `references/ui.md` | Building or reviewing the UI: all tokens and component specifications |
| `references/sources.md` | The user asks why a rule exists, or a rule needs adapting: what each product contributed to the UX and to the UI |
| `references/research/ux/*.md` | A detail of how Linear, ChatGPT, Mistral or Alan structure a flow or word a state is needed |
| `references/research/ui/*.md` | A visual detail from one of them is needed that the summary lacks |
