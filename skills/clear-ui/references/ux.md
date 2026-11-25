# Part 1: UX

The goal of this part is one agreed structure for the screen or flow, chosen by the user from a few
options they could see. No colours, fonts or component styling are decided here. Visual polish on a
confusing structure still leaves the user lost, and structure is cheap to change in a wireframe and
expensive to change in code.

The rules in sections 6 to 8 come from studying how Linear, ChatGPT, Alan and Mistral behave. The
product named in brackets after a rule is where it was observed; the evidence is summarised in
`sources.md` and given in full in `research/ux/`.

## Contents

1. Understand the job
2. Take inventory and cut
3. Propose two or three directions as wireframes
4. Wireframe rules
5. The gate
6. Rules that keep the user from getting lost
7. What to avoid
8. Patterns to reach for

## 1. Understand the job

Before drawing anything, be able to answer these in one line each:

- **Who** uses this screen, and how often (daily tool, or once a year)? A daily tool can be dense
  and keyboard-driven like Linear; a once-a-year task needs Alan's one-question-at-a-time pace.
- **What is the one job** of this screen? If there are two, it is probably two screens.
- **What does the user need to see first** to do that job?
- **What is the primary action**, in the user's words ("Send invoice", not "Submit")?
- **What real content** goes here? Use real names, numbers and lengths. Layouts that work with
  "Lorem ipsum" break with a 60-character project name.
- **How many steps and decisions** does the main task take today, or in the obvious design? Write
  the number down; the directions in step 3 should try to beat it.

Read the existing code or product first when there is one: the answers are often already there, and
a new screen should follow the navigation and vocabulary the product already uses.

If an answer is missing, propose one and say it is an assumption. Ask the user only when the answer
would change the structure (for example: is this used on a phone?). One question, with the proposal
as the default.

## 2. Take inventory and cut

List everything the screen could show and every action it could offer. Then rank:

- **Must** be visible to do the job.
- **Sometimes** needed: one click away (a menu, a detail view, a "More" disclosure).
- **Rarely** needed: move to settings, or drop.

Aim to remove something. Each extra element lowers the visibility of the ones that matter. The
guest screen of Mistral's assistant has ten controls in total; a Linear issue row shows about ten
facts and no buttons.

## 3. Propose two or three directions as wireframes

Show the user two or three directions in the chat. They must differ in **structure**, not in
styling: where navigation lives, what is the first thing seen, how many steps the task takes, list
versus table versus cards, one page versus a stepped flow, modal versus full page, edit in place
versus a form. Three versions of the same layout with boxes shuffled is one direction.

For each direction give:

- A short name that describes it ("Single list with side panel", not "Option A").
- One sentence saying the idea.
- The wireframe.
- The step and decision count for the main task, when it differs between directions.
- What it is best at, and what it costs. Be honest about the cost.

Then say which one you recommend and why, in one or two sentences.

**How to show them.** If the environment has a way to render HTML inline for the user (an HTML
preview or render tool, an artifact), use `assets/wireframe.html` as the starting point: it is a
grayscale kit with the three-direction layout already built. Replace the example content with the
real screen. If nothing can render HTML, draw the wireframes as ASCII in a code block, at most about
70 columns wide, one direction after the other.

For a flow of several screens, draw the screens of one direction in a row, left to right, with the
action that leads to the next screen marked.

## 4. Wireframe rules

- **Grayscale only.** Grey boxes, one dark fill for the primary action. Colour and typefaces invite
  feedback about colour and typefaces, which is Part 2.
- **Real labels and real copy.** Navigation items, headings, button labels, column names and one or
  two realistic rows. The words are part of the UX.
- **Mark the primary action** so it is obvious in each direction which single thing the screen wants
  the user to do.
- **Show the state that matters.** If the screen is usually empty at first, or failure is likely,
  draw that state too. An empty screen is where a new user starts.
- **Draw the small screen** when the product is used on phones. A direction that only works at
  1440px is not a direction.
- **Stay low fidelity.** No icons beyond a placeholder square, no shadows, no imagery. Ten minutes of
  work per direction, not an hour.

## 5. The gate

Stop after presenting the directions and ask the user to choose one, or to mix parts of several.
Write no UI code and pick no visual details until they answer. This is the point where the user's
judgment is cheapest to apply; skipping it means redoing styled work later.

When they answer, restate the agreed structure in three to five lines (layout, navigation, what is
visible, primary action, the steps of the flow) so both sides are working from the same thing. Then
start Part 2.

The gate can be skipped in two cases, and say so when skipping:

- The user explicitly asks to go straight to the UI.
- The task changes only the look of an existing screen and no structure (restyling a button,
  fixing spacing, applying the tokens to a page whose layout stays).

If the user changes the structure during Part 2, go back to a quick wireframe of the change before
styling it.

## 6. Rules that keep the user from getting lost

At any moment the user should be able to answer three questions without thinking: where am I, what
can I do here, and what just happened? The rest is about asking less of them and using their words.

### Where am I

- **Show location in several places that agree.** The selected sidebar row, a breadcrumb, the page
  title and the URL all say the same thing, using the label the user clicked. In a detail view,
  show the position in the list ("4 / 10"). [Linear; Mistral's docs add an outline that follows
  the scroll]
- **Keep navigation short and named for the user.** Four or five top-level destinations, named
  with verbs or plain nouns. On a site with several audiences, the top level is who the visitor
  is, each with a one-line description. [Alan: four app tabs; Entreprises / Indépendants /
  Particuliers]
- **Never start from nothing.** The first screen after signup is a working one with sensible
  defaults already in place, not a blank canvas or a setup wizard. [Linear creates a team and a
  five-status workflow at workspace creation]
- **Let the user do the main task before asking for anything.** No account, no choices, the main
  input focused on load. [ChatGPT: a first answer in two actions as a guest]
- **Look without leaving.** A preview or side panel opens an item and closes back to the same
  list, with filter, scroll position and selection kept. [Linear: Space to peek, Esc to return]
- **Announce a filtered view loudly.** When items are hidden, say how many and offer to clear:
  "209 issues hidden by filters. Clear filters". Keep "which items" (filters) separate from "how
  they look" (display options), and mark a view that differs from its default. [Linear]
- **Keep empty sections and say they are empty** ("No projects") so the structure stays learnable.
  A concept the user has not needed yet stays switched off or hidden until it is. [ChatGPT; Linear
  keeps Triage, Cycles and Estimates as per-team toggles]

### What can I do

- **One primary action per screen**, and one entry point for the main task. Everything related to
  that task lives in or on it instead of scattered around the page. [ChatGPT and Mistral: tools,
  files, mode and voice all sit in the composer]
- **Cap the actions per unit.** At most two on a card, one on a carousel item; rows carry facts and
  no buttons. Further actions appear on hover, on selection (one floating bar for the selected
  rows) or in a "more" menu. [OpenAI's guidelines; Linear]
- **Show actions only when they can be used.** Copy and Share appear once an answer is complete,
  not while it is still being written. [ChatGPT]
- **Offer the same action through several doors with one name.** A visible control, a right-click
  menu and a command menu share the same label and shortcut. Teach the shortcut where the mouse
  already is, in the tooltip ("Add filter  F"). [Linear]
- **Edit in place.** Changing one property opens a small picker anchored to the value and applies
  on selection. Use a form or modal only to create something or write at length. [Linear]
- **Locked or unavailable features stay visible and explain themselves.** Group them under a line
  such as "Log in to use…", or give a disabled control a tooltip saying why. A control must never
  look enabled and then do something else. [ChatGPT; Mistral's tooltips]
- **Show an active mode as a removable chip** in the place where the user is working, so the mode
  can be seen and switched off there. [ChatGPT: "Web search ×"]
- **Offer outcomes, not mechanisms.** "Fast: get answers fast" and "Think: handle complex tasks"
  instead of a list of model names. [Mistral]
- **One search for everything**, reachable from one shortcut, covering every kind of item and
  action. [ChatGPT; Linear's command menu, which opens on the actions of the hovered item]

### What just happened

- **Acknowledge within about 0.3 seconds.** The input clears, the button changes role, and a
  progress mark appears where the result will be. [ChatGPT]
- **The change is the feedback.** When a value updates visibly in place, add nothing. Keep toasts
  for things that happen out of sight: created, deleted, undone. [Linear: property edits show in
  under 150ms with no toast]
- **Undo beats confirmation, and says exactly what it undoes**: "Undo set priority of ENG-128 to
  Urgent". [Linear]
- **Confirmation scales with the damage.** None for reversible changes; a dialog naming the object
  and what happens to it for deletion; a slow, deliberate path for irreversible account-level
  actions. [Linear; ChatGPT confirms clearing a chat but not archiving]
- **Describe a destructive action as a sentence about the user's things, and say what survives.**
  "Delete Reports on your Desktop, with 3 files inside". "Your original chat stays as it is".
  [Mistral]
- **Never move the page under the reader.** No automatic scrolling while content arrives; media
  reserves its final size. [ChatGPT]
- **Never lose what the user typed.** Drafts save on their own, a failed send keeps the text with
  Retry beside it, a login redirect brings the text back, and closing asks "Save to drafts?".
  [Linear, ChatGPT, Mistral]
- **Long work gets one status line that can be expanded**, with separate wording for running,
  done, stopped and failed. Let the user keep typing while it runs. [Mistral]
- **For anything slow, give the expected duration up front and a notification at the end.** "90%
  within 24h", then "New reimbursement". [Alan]
- **A limit message says what was reached, until when, and the way out.** "You've reached your
  image creation limit. Upgrade to Plus or try again tomorrow after 9:17 AM." [ChatGPT]
- **An error sits next to its cause, in one sentence, with the value kept**, and offers the way
  out as a button. "Enter a valid year of birth". [Alan, Mistral]

### Ask less

- **One question per screen in a guided flow, and tapping an answer moves forward.** [Alan: nine of
  eleven quote answers are a single tap]
- **Ask what people know and work out the rest.** The company name instead of its legal category;
  a few questions about habits instead of "choose a plan". [Alan]
- **Ask for the least precise value that works**: a birth year, a postal code, a headcount in
  three ranges. [Alan]
- **Say why you ask, next to the field.** "We use it to calculate your price." [Alan]
- **Make "not now" a real answer**, with a promise that it can be added later. [Alan]
- **Announce the effort and the end.** "5 quick questions" before, "Almost there" near the end,
  with named stages and a back button that keeps what was entered. The indicator has to actually
  advance. [Alan, whose own indicator stayed on stage one]
- **Create with one field and no decisions.** Everything else is pre-filled from context and can be
  changed afterwards. [Linear: a title, then Cmd+Enter]
- **Merge decisions the system can make.** One "Log in or sign up" screen; one field and one button
  per authentication step. [ChatGPT, Linear]
- **Decide for the user and say why.** A fixed, small set of options is easier than a configurable
  one. [Linear: five fixed priorities, one assignee per issue]
- **Settings apply immediately**, with one sentence of consequence under each. No Save button.
  [ChatGPT]

### Explain with outcomes and numbers

- **Lead with the outcome, then a breakdown that adds up to it.** "€25 reimbursed in full", then
  who paid what, ending with "€0 out of your pocket". [Alan]
- **Show a limit as what remains out of the total, in everyday units**: "5 sessions left of 5".
  Show zero explicitly instead of leaving a blank. [Alan]
- **One definition and one running example** carried through every concept, instead of a new
  example each time. [Alan: the €30 doctor's visit]
- **Compare options on the same few lines**, each with a one-sentence promise and a price that
  states its assumption: "From €50 a month, for one person aged 35". [Alan]

### Words

- **Options in the user's words, with the technical term in grey underneath.** [Alan: "Des soins
  classiques", then "Couronnes, bridges, dévitalisation"]
- **Buttons are verb plus object**, named by the outcome: "Clear chat", "Copy response", "Send
  invoice". First person is fine for the user's own things: "Get my quote". [ChatGPT, Alan]
- **One verb through a whole flow.** Delete in the menu, the dialog title, the button and the
  toast. An ellipsis on a label means another step follows. [Linear]
- **Size an empty state to the need.** A new concept gets two sentences, one action and a link to
  learn more; a familiar list gets three words ("No active drafts"). [Linear]
- **A dead end becomes a direction**: say where the thing is or who can help, and keep a person
  reachable from every step of a difficult flow. [Alan]

## 7. What to avoid

Each of these was seen in one of the products studied, and each leaves the user unsure what
happened.

- A consent or terms dialog in front of a feature the visitor still cannot use afterwards. [Mistral]
- Controls that look enabled and then redirect to a login page with no explanation. [Mistral]
- "Sign in" and "Sign up" as two buttons leading to the same screen. [Mistral]
- A progress indicator that does not move. [Alan]
- Navigation with no selected state, or breadcrumbs cut short. [Mistral's docs]
- Actions that exist only on hover and carry no label. [Mistral's docs]
- Several names for one action ("New issue", "Create new issue", "Create issue"). [Linear]
- Limits written as multiples ("Up to 6x") instead of numbers. [Mistral]
- Renaming something without updating every place that mentions it. [Mistral]
- A choice with consequences for the user switched on by default and buried in settings. [Mistral]

## 8. Patterns to reach for

These are the structures the reference products use. Prefer them to inventing new ones: users
already know how they work.

- **App shell:** a fixed sidebar of about 240 to 260px with the workspace at the top, search, then
  grouped navigation; the content area has one title row with the primary action on the right.
- **List then detail:** a dense list of rows that carry facts and no buttons. A row opens as a peek
  or side panel (keeps the list in view) or as a full page (more room), with next and previous
  available inside the detail. Choose one and use it everywhere.
- **Selection bar:** selecting rows raises one floating bar with the actions for the selection.
- **Command menu:** one search box that reaches every screen and action, opened by one shortcut,
  aware of what is under the cursor.
- **Conversation:** one centred column of about 720 to 768px, the input fixed at the bottom and
  kept in every mode, the user's turn in a light bubble on the right, the answer as plain text. One
  button slot on the right of the input changes role: voice when empty, send with text, stop while
  working.
- **Guided flow:** one question per screen, answers as large tappable options, named stages, back
  always available, the effort announced at the start and a summary before the final commit.
- **Result with breakdown:** the outcome in one line, then the parts that add up to it.
- **Empty state:** what this place is for and one button to create the first item.
- **Settings:** a left list of sections and a narrow single-column list of settings that apply
  immediately, each with one sentence saying what it changes.
- **Marketing page:** the product itself as the first thing shown (a real screenshot or a working
  piece of it), one message, one action repeated at the end; plans compared on the same few lines
  with one button each.
- **Small screens:** primary navigation and the main action move to the bottom edge within reach of
  the thumb; rows get taller; one full-width button per screen.
