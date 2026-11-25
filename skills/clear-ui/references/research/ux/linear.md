# Linear — UX teardown (structure, flows, behaviour)

Research date: 2026-11-25. Scope: how the product is organised and how it behaves. The visual system (colour, type, spacing, motion timings) was measured in an earlier pass and is not repeated here.

## How to read the evidence tags

| Tag | Meaning |
|---|---|
| **[live]** | Observed by driving a real page in a headless browser: `linear.app`, `/signup`, `/login`, `/pricing`, `/docs`, and the **public demo workspace `linear.app/demo`**. |
| **[docs]** | Read in official documentation (`linear.app/docs/...`), Linear Learn, or the official changelog (`linear.app/changelog/...`). |
| **[blog]** | Read in an official Linear post or Method page (URL given). |
| **[3p]** | Third-party analysis. Secondary evidence only. |

Important limits of the live evidence:

- The demo workspace is the real Linear web client loaded with sample data, anonymous, no account. Edits are local to the browser session: no mutation request was sent to the server and a created issue was gone after a reload. So feedback, menus, shortcuts, dialogs and toasts are real; persistence, sync, multiplayer and anything behind login are not exercised.
- In the demo the workspace switcher, search button and compose button in the sidebar header are replaced by a "Sign up" button. Workspace search returned no results for any query (demo limitation).
- I did not open the screenshots embedded in the docs (only their alt text), so no finding below rests on "seen in an official screenshot". Where a marketing page embeds a working replica of the app, it is tagged [live] with "homepage replica".
- No account was created. Signup was walked only up to the email field, with an invalid address and an empty submit.


---

## 1. Information architecture

### Object model (what exists, and how deep)

[docs] `linear.app/docs/conceptual-model` states the whole model in six lines:

> issues track individual pieces of work · teams own the workflows those issues move through · cycles help teams plan short-term work · projects organize related issues around a deliverable · initiatives organize related projects around a broader goal · views help people navigate all of the above

- **Workspace** = one company. One URL (`linear.app/<workspace>`). "We recommend organizations stay within a single workspace as this is the conceptual model we use when designing the product." [docs /workspaces]
- **Team** = the owner of a workflow, cycles, labels and a set of issues. An issue belongs to exactly one team. [docs /teams]
- **Issue** = the unit of work. Required fields: a title and a status. Nothing else. [docs /creating-issues]
- Vertical depth of work: Initiative → (sub-initiative) → Project → (milestone) → Issue → sub-issue. Depth of people: Workspace → Team → (sub-team).
- A **view** never contains work; it is a saved query over it. "Views are different ways of looking at the same underlying work. They do not change the work itself." [docs /conceptual-model]

### Sidebar: sections and order

[live, demo] Top to bottom (at 1440×900 one expanded team and the start of the second fit on screen):

1. Workspace name (switcher). In the real app, search and "New issue" sit next to it [live, homepage replica: "Search workspace", "New issue"].
2. **Personal, no heading**: Inbox (with unread count), My issues, Documents. The homepage replica shows Pulse, Inbox, My issues, Reviews.
3. **Workspace** (collapsible heading): Initiatives, Projects, Views, More. "More" opens a menu: Members, Releases, Teams, "Customize sidebar…".
4. **Favorites** (collapsible): user-pinned items of any type. The section only appears once the first favorite exists [docs /favorites].
5. **Your teams** (collapsible): each team expands to Home, Triage (count), Issues, Cycles (→ Current, Upcoming), Initiatives, Projects, Views. Hovering a team shows a `…` "Team menu".
6. Bottom: a "What's new" card (latest changelog entry) and a Help button.

Depth in the sidebar is at most four levels: section → team → page → sub-page (Your teams → Engineering → Cycles → Current).

Teams you visit but have not joined appear under a temporary **Exploring** section [docs /teams]. Retired teams are removed from the sidebar [docs /teams].

The order goes from "mine" to "everyone's": personal → workspace-wide → pinned → team. Team pages are fixed and identical for every team, so learning one team teaches all of them. [docs /default-team-pages: "Team pages can include Triage, Issues, Cycles, Projects, and Views. Some items depend on team settings — for example, Triage only appears when it's enabled."]

The sidebar is personal: each item can be set to "Always show", "Don't show" or "Show when badged" (Drafts defaults to "Show when badged"; Reviews, Members, Releases, Teams default to "Don't show"), and the badge style can be count or dot. [live, demo: Customize sidebar dialog] [docs changelog 2024-12-18-personalized-sidebar]

### What a new user sees first

- [docs /workspaces] "When a workspace is created, Linear automatically creates a default Team with the same name as the workspace." The user never faces an empty shell with no team.
- [docs /account-preferences] The landing page is a setting, "Default home view". Enterprise admins can set it for new members and add a welcome message [docs /workspaces].
- [live, demo] The demo lands on **Team › Issues › Active**, a grouped list, not a dashboard. The workspace's first Favorite is a document titled "Welcome to Linear! [README]".
- [3p, Supademo teardown] First run: workspace name and URL, theme choice (light/dark), a command-menu tutorial before any other action, optional GitHub connect, optional teammate invite, then a task checklist ("create an issue, use the command menu, set a priority"). Not verified by me.

### How the views relate

| View | What it is | Layout observed [live, demo] |
|---|---|---|
| Team Issues | The team's issues with three fixed tabs: Active, Backlog, All issues, plus "Add new view" | List grouped by status, or board (same data, `Ctrl/Cmd B`) |
| My issues | Curated personal view, four tabs: Assigned, Created, Subscribed, Activity | List grouped by cycle/"focus" order |
| Inbox | Notifications | Split view: list left, detail right |
| Triage | A team's incoming queue | Split view: list left, detail right |
| Issue detail | One issue | Content column + properties column on the right |
| Custom view | A saved filter, scoped to workspace, team, project or initiative | Same list/board component |

- List and board are one view with two layouts. Toggling keeps the URL (`/team/ENG/active` in both) and the ordering. "Board views and List view cannot be ordered independently." [live] [docs /board-layout]
- Inbox and Triage are deliberately different from lists: they only allow ordering, no grouping and no board. [docs /display-options, /board-layout FAQ]
- Triage sits outside the workflow. "By default, we exclude triage issues from all views since triage is considered to be outside the normal workflow." [docs /triage FAQ]
- My issues default ordering is a product decision: "urgent work, SLA-bound work, blockers, cycle work, other active work, triage, backlog, and completed work." [docs /my-issues]

### How the app shows where you are

[live, demo] Five signals, all present at once:

1. **Sidebar highlight** on the current page (e.g. Engineering → Issues).
2. **Breadcrumb in the header**: `Engineering › Issues`, and in detail `Engineering › Issues › ENG-127 Contact profile pictures not loading`. Each crumb is a link.
3. **Tabs under the header** for the sub-view (Active / Backlog / All issues).
4. **Document title** mirrors the breadcrumb: "Engineering › Active issues", "My issues › Assigned", "Inbox (52)", "Engineering › Triage (57)".
5. **Position counter** in issue detail: "4 / 10" with up/down arrows, counting within the list you came from (the filtered list, about ten issues, not the 219 in the team).

Also: the URL is always meaningful and shareable (`/team/ENG/active`, `/issue/ENG-127/<slug>`, filters encoded in `?filter=`), and an `aria-live` region announces "Navigated to Engineering › Active issues" for screen readers.

One thing to notice: when an issue is opened, the sidebar highlight on "Issues" disappears and the breadcrumb alone carries the location (issue-detail screenshot).

---

## 2. Core flows, step by step

Counts below are user actions. "Decisions" are choices the user must make before the flow completes.

### Create an issue

[live, demo]

1. Press `C` (or click "New issue"). A modal opens over the current view; the list stays visible behind it.
2. Focus is already in the title. Type.
3. `Ctrl/Cmd Enter` (or click "Create issue").

Keyboard: 2 keystrokes plus the title. Mouse: 2 clicks plus the title. **Required decisions: 0.** Team (ENG), status (Todo) and cycle (Cycle 78) were pre-filled from the context I was in. Seven optional property chips sit in one row (status, priority, assignee, project, estimate, labels, cycle) plus `…`. Description placeholder: "Add description…". One primary button.

- Feedback: toast bottom-right, "Issue created — ENG-546 ‒ UX research probe — View issue".
- "Create more" toggle keeps the modal open and carries properties over. [live] [docs changelog 2021-03-10]
- Other entry points: `Alt C` from template, `V` full-screen, `linear.new` in the browser bar, select text → "Create issue from selection", `+` on a list group header or board column (pre-fills that group's value), URL with query parameters. [docs /creating-issues] [live for `+` on group headers]
- Leaving mid-way never loses text. Navigating away hides the modal and keeps a local draft; closing with content asks "Save to drafts? You can finish this issue later from your drafts." with Discard / Cancel / Save. [live] [docs /creating-issues]
- "Changes made to an issue's properties in the first 3 minutes are considered part of the issue creation process, and won't be added to the activity log." [docs /creating-issues]

### Change status / assignee / priority

[live, demo] From a list, without opening the issue:

- Hover (or `J`/`K` to) the row, press `S`, then a digit. The status menu numbers its options 1–7 (Backlog 1, Todo 2, In Progress 3, In Review 4, Done 5, Canceled 6, Duplicate 7, Triage 0). **2 keystrokes.**
- Priority: `P` then `0`–`4`. **2 keystrokes.** The row updated in under 150 ms with no spinner and no toast.
- Assign to me: `I`. **1 keystroke.** Assign to someone: `A`, type a few letters, `Enter`.
- Mouse: click the property in the issue's right column → small popover anchored to the control → click. **2 clicks.** Or right-click the row → Status ▶ → value. **3 actions.**
- Same keys work on a multi-selection.

No form, no save button, no confirmation for any property change.

### Triage

[live, demo] [docs /triage]

1. `G` then `T` (or sidebar → Triage). Split view; right pane says "57 issues to triage" and offers "Create triage issue".
2. Select an item. Header shows four icon buttons: Accept, Decline, Mark as duplicate, Snooze.
3. Press `1` accept, `2` decline, `3` duplicate, `H` snooze. "Triage keyboard shortcuts now follow the order of the actions." [docs changelog]
4. Accept opens a dialog titled "Accept: ENG-545 <title>" with an optional comment, "Quick suggestions" chips (a template, a label), the property chips, a "Subscribe to updates" toggle and one button, "Accept". Decline opens "Decline: ENG-545 <title>" with a comment field and one button, "Decline".

Decisions: one of four outcomes. A comment is offered, never required. Snooze shows presets with the resolved date next to each ("Tomorrow — Thu, 26 Nov, 9:00 AM", "Next week", "Next cycle", "Custom…").

### Inbox

[docs /inbox] [live for layout]

- `G` then `I`. `J`/`K` to move. `U` read/unread, `H` snooze, `Backspace` delete, `Shift Backspace` delete all read, `Alt U` mark all read.
- Two tabs since Sept 2026: Priority and Other. "Linear selects Priority notifications by default." [docs changelog 2026-09-03]
- Subscription is automatic: you are subscribed when you create, are assigned, or are mentioned. You cannot choose what enters the inbox ("All notifications will arrive there").

### Search

[docs /search] [live, partly]

Three different searches, each with its own key:

| Key | Scope | Behaviour |
|---|---|---|
| `/` | Whole workspace (titles, descriptions, comments) | Opens a Search page with tabs All / Issues / Projects / Initiatives / Documents. Shows recent searches and recent issues before typing. |
| `Ctrl/Cmd F` | Current list, board or inbox | Filters as you type; `Esc` clears. [live: typing nonsense produced "No issues matching the filters · 219 issues hidden by filters · Clear Filters"] |
| `O` then `I` | Jump to an issue by ID or title | Recent issues first |

Results are ordered by usefulness, not just text match: "showing unstarted and in progress issues first, then backlog, completed, canceled, and archived issues." Typing `@` in search creates a filter. IDs match loosely (`lin123` finds `LIN-123`).

### Filter, then save as a view

[live, demo]

1. `F` opens the filter menu (AI filter, Advanced filter, then about 21 property categories with sub-menus).
2. Type the value directly: "bug". The menu collapses to matches across categories: "Labels · Issue Type · Bug · 10 issues", "Template · Bug report", "AI filter · "bug"".
3. `Enter`.

**3 actions**, no category navigation needed. What happens next is the model to copy:

- A filter bar appears under the tabs: `Labels | include | Bug | ×` and a `+`. Operator and value are separately clickable.
- Group headers change from "11" to "3 / 11".
- The bottom of the list says "209 issues hidden by filters — Clear Filters ×".
- The URL gains `?filter=…`, so the filtered list can be pasted to a colleague.
- Right side of the filter bar: "Clear" and "Save". Save (or `Alt V`) turns the filter into a named custom view; the Save control only appears once a filter exists. [docs /custom-views]
- The filter was still applied after a full page reload of the same view.

I did not click Save, so the save dialog is not verified.

### List ↔ detail

[live, demo]

- `Enter` or click opens the issue as a full page. `Esc` goes back to the list, with the filter intact and the cursor on the issue you last looked at.
- In detail, `J`/`K` (or the header arrows) move to the next/previous issue of that list; the counter updates.
- `Space` peeks: a card with ID, title, status, priority, assignee, cycle, labels and the start of the description. Hold to peek, release to close; tap to toggle. [live] [docs /custom-views]
- The title and description are edited in place (`contenteditable`, labelled "Issue title" and "Issue description"); the description saves automatically, comments need an explicit send. [live] [docs /comment-on-issues]

### Onboarding / first run

Not reachable without an account. From [docs] and [3p]:

- A default team is created with the workspace. [docs /workspaces]
- New members get a dialog to pick the teams they want to join. [docs changelog 2019-12-12]
- Advice for small teams: "start by creating Issues immediately, rather than over planning work with Projects and Initiatives. You can use those features later." [docs /how-to-use-linear-small-teams]
- "If you are unsure of how to structure your teams, keeping everyone on one team is the simplest approach." [docs /teams]
- [3p, Supademo] The command menu is taught before anything else; GitHub and invites are skippable; a checklist teaches by doing; the activation moment is resolving a first issue.

### Invite teammates

[docs /invite-members]

Settings → Administration → Members → Invite → type emails (comma-separated) → role → teams to auto-join → "Send invites". Six steps, two decisions (role, teams).

Three shortcuts that remove the flow entirely:

- **Approved email domains**: anyone with a matching address joins without an invitation and sees the prompt during their own onboarding.
- **Invite link**: persistent, reusable, resettable.
- **"Invite and assign…"** inside the assignee menu: invite someone at the moment you need them, and assign work before they accept.

### Signup and login

[live, `linear.app/signup` and `/login`]

- Signup screen: heading "Create your workspace", three buttons (Continue with Google / Continue with email / Continue with SAML SSO), one line of legal text, "Already have an account? Log in". No fields, no marketing copy, no password.
- Email path: screen becomes "What's your email address?", one field, focus already in it, button "Continue with email", link "Back to signup". **One field per screen.**
- Empty submit: inline message between the field and the button, "Please enter an email address for login." Malformed address: native browser validation (`type=email`).
- Login screen: "Log in to Linear", the same three buttons plus "Log in with passkey", then "Don't have an account? Sign up or learn more".
- The button label is repeated on the next screen's submit button ("Continue with email" → "Continue with email"; "Continue with SAML SSO" → "Continue with SAML").
- After the email step: a link or a code sent by email. [docs /login-methods] Not walked.

---

## 3. Interaction model

### Command menu

[live, demo] [docs changelog 2019-10-07, 2019-12-18]

- Invoked with `Ctrl/Cmd K`. Placeholder: "Type a command or search…".
- **It is contextual.** With nothing selected on an issue list, it opens on creation commands grouped under headings: Issues (Create new issue… `C`, Create issue in fullscreen… `V`, Create new issue from template… `Alt C`, Create new label…), Projects, Documents, Views, Dashboard, and so on.
- With a row hovered, a chip appears at the top, "ENG-126 · Account balance shows zero until refresh ⌫", and the list becomes that issue's actions: Assign to…, Assign to me, Change status…, Change priority…, Add to project…, Change or add labels…, Set estimate…, Move to cycle…, Add to release…, Move to a different team…, Set due date…, Copy issue ID. The chip tells you what the command will act on before you run it.
- Every command shows its shortcut on the right, so the menu is also the shortcut reference.
- Typing searches commands first, then content ("Quick results for …", "Go to advanced search"). Prefixes narrow the scope: `i ` issues, `p ` projects, `u ` users, `t ` teams, `l ` labels, `f ` favorites, `d ` documents. [docs /search]
- Reach: "We already have hundreds of actions that range from modifying issue properties to switching between UI themes." Groups "are prioritized based on what you are focusing on, or the view you're currently in." [docs changelog 2019-12-18]
- The same component is used as the property picker. Pressing `S` or `P` opens it in the same place, pre-scoped to statuses or priorities with digit shortcuts. One component to learn. "The command menu now acts almost like a drop-down element but still retains its searchability and keyboard controllability." [docs changelog 2019-10-07]
- Labels ending in `…` open a further step; labels without it act immediately. Linear enforces this: "The 'Revoke access' action … now always shows an ellipsis since it opens a confirmation dialog." [docs changelog]

### Keyboard shortcuts and how they are taught

The shortcut grammar [live, shortcut panel `Ctrl/Cmd /`]:

- Single letters act on the focused item: `C` create, `S` status, `P` priority, `A` assign, `I` assign to me, `L` labels, `X` select, `F` filter.
- `G` then a letter = go to a place (`G I` inbox, `G M` my issues, `G T` triage, `G A` active, `G B` backlog).
- `O` then a letter = open a picker for a thing (`O I` issue, `O P` project, `O T` team, `O F` favorite).
- `M` then a letter = mark a relation (`M B` blocked, `M X` blocking, `M R` related, `M M` duplicate).
- `Shift` + letter = the second-most-common variant (`Shift P` project, `Shift C` cycle, `Shift E` estimate, `Shift D` due date).
- `Esc` = back / clear, `Ctrl/Cmd Z` = undo, `?` = help, `/` = search, `Space` = peek.

Six teaching surfaces, all observed [live] unless noted:

1. **Tooltips** on every control name the action and its key: "Add Filter `F`", "Show display options `⇧ V`", "Create new issue `C`", "Go to inbox `G` then `I`", "Change priority `P`", "Open details `Ctrl I`".
2. **Context menu** rows carry the shortcut next to the label.
3. **Command menu** rows carry the shortcut.
4. **Empty states** put the key inside the button: "Create new issue `C`".
5. **Shortcut panel** (`Ctrl/Cmd /`), a searchable side panel grouped General / Navigation / Issues / Projects / Initiatives / List-Board.
6. **Keyboard shortcut trainer**: "Trainer hints trigger when clicking certain buttons and menus … and can be turned off." [docs changelog 2023-05-11]

Linear on why the right-click menu matters for this: "contextual menus are also a great tool for onboarding and teaching people how to use our popular keyboard shortcuts … Now you can simply right-click to take the action with the mouse or remind yourself of the keyboard shortcut." [blog https://linear.app/now/invisible-details]

The docs repeat the same idea: most feature pages have three sub-headings, **Keyboard / Mouse / Command menu**, giving the same action three ways. [docs /my-issues, /favorites, /display-options, /board-layout, /search]

### Contextual menu

[live, demo] Right-click on an issue row: 18 items in five groups.

1. Properties, each with its shortcut and a sub-menu: Status `S`, Priority `P`, Assignee `A`, Due date `⇧D`, Labels `L`, Project `⇧P`, Estimate `⇧E`, Cycle `⇧C`, More properties.
2. Create related, Mark as.
3. Copy, Convert to, Make a copy…, Move, Open in.
4. Favorite `Alt F`, Subscribe `⇧S`, Remind me `⇧H`.
5. Delete `Ctrl Delete`, last and alone.

The `…` menu in the issue header lists the complement (Team, Due date, Release, Add link…, Add document, Show description history …) and ends with Delete as well. Sub-menus have a triangular "safe area" so the cursor can travel diagonally without closing them [blog invisible-details].

### Inline editing vs popover vs modal

| Situation | Pattern | Evidence |
|---|---|---|
| Change one property of an existing thing | Popover anchored to the control, or the command menu. Applies on selection. No save. | [live] |
| Edit title or description | In place. Description autosaves. | [live] [docs] |
| Create a new thing | Modal over the current view, so "you stay in the view you are in so that you don't lose context". Full-screen variant on `V`. | [live] [docs changelog 2021-03-10] |
| An action that benefits from a note (accept, decline in triage) | Small dialog: title = verb + object, optional comment, one button | [live] |
| Destructive action | Confirmation dialog naming the object | [live] |
| Settings | Separate full pages | [docs] |
| Sub-issues | Inline editor that reopens itself after each save; `Esc` to stop | [docs /parent-and-sub-issues] |

There is no "edit issue" form anywhere.

### Multi-select and bulk actions

[live, demo]

- Hovering a row reveals a checkbox at its left edge; nothing is selected by default.
- `X` selects the focused row; `Shift` + arrows or `Shift` click extends; `Ctrl/Cmd A` selects all (filter first, then select all, is the documented bulk recipe).
- A floating bar appears bottom-centre: "2 selected · Move to Backlog · Actions · ×". One suggested action, one door to everything else (the command menu), one way out.
- Every single-item shortcut and the right-click menu apply to the selection.
- `Esc` clears the selection (first `Esc` closes any open menu, the next clears).

### Undo

[live, demo] [docs changelog undo-actions]

- `Ctrl/Cmd Z` reverted a priority change and a deletion. Each undo produced a toast naming exactly what was reverted: "Undo set priority of ENG-128 to Urgent.", "Undo delete ENG-128."
- "You can now undo almost every operation that changes issues, notifications, cycles or projects … individual operations … or batch operations like modifying hundreds of issues."
- "When you undo, Linear will make sure to take you back to the page where you created the operation and, in list views, select all of the associated issues."
- Redo: `Shift Ctrl/Cmd Z`.

### Optimistic updates and feedback

- [live] A property change is reflected in the row within 150 ms. No spinner, no toast: the changed value is the feedback.
- [live] Toasts are reserved for results you cannot see where you are: created ("Issue created · ENG-546 ‒ title · View issue"), deleted ("Deleted ENG-128 · You can restore deleted issues from the archive. · View recently deleted"), undone. Each toast names the object and offers the next step as a link. Bottom-right, dismissible, and keyboard-addressable ("Open link from last toast `Ctrl Alt O`", "Dismiss all toasts `Ctrl Alt X`").
- [docs /get-the-app] "Linear automatically syncs all changes in realtime … If for some reason changes cannot be sent to the backend, the app will store changes locally and re-try whenever connectivity is restored."
- [3p, performance.dev] The UI reads from a local database in the browser; mutations apply locally then sync. Consistent with the official statement that the product "should be as fast as possible (local data storage, no page reloads, available offline)" [blog https://linear.app/now/rethinking-the-startup-mvp-building-a-competitive-product].

### Peek and preview

- `Space` on a hovered or focused row: preview card (see 2, List ↔ detail). [live]
- Board cards do not show descriptions; the documented answer is "Use `Space` while hovering your cursor over a card to peek". [docs /board-layout]
- Hover previews exist for labels (description), mentions and skills. [docs changelog]
- "Peek is one the semi-secrets of the Linear UI … similar to Quicklook in macOS." It was moved from `Alt` to `Space` because "it deserves a more prominent key". [docs changelog 2019-09-23]

---

## 4. Density and prioritisation

### What a row shows, and what it hides

[live, demo] An issue row at rest contains **zero buttons**. It shows, left to right: priority icon, ID, status icon, title, then right-aligned label pills, project pill, cycle, estimate, assignee avatar, date. Roughly ten pieces of information in a 44 px row, all read-only in appearance, each one clickable to change it.

- On hover: background highlight and a checkbox. Nothing else appears.
- All actions live in the keyboard, the right-click menu (18 items) and the command menu.
- Long values truncate inside their pill ("Vendor Payments Mobile Expe…"); the title gets priority.

### What a screen shows

[live, demo] Issue list header: breadcrumb, favorite star, notification bell, "New issue". Second row: three tabs + "Add new view" on the left; four icon buttons on the right (filter, display options, insights, details panel). **About ten controls** above 200+ rows of data.

Issue detail: four copy/hand-off icon buttons, the properties column (six properties, labels, project), favorite, `…`, and prev/next. Empty properties are not hidden; they appear as dim verb prompts ("Set estimate", "Add to project", "Add label", "Add sub-issues").

### Filters vs display options: two separate disclosures

- **Filter** (`F`) decides which items are in the list. Disclosed as a menu, then a visible filter bar.
- **Display options** (`Shift V`) decides how they look. One popover: List/Board toggle, Grouping, Sub-grouping, Ordering, three switches, then 16 display-property chips that toggle on and off. [live]
- The docs draw the line explicitly: "This is different from filters; filters will refine the list … while display options show all issues in the list but hide or show data on the issue item." [docs /display-options]
- A dot on the display-options button signals that the view differs from its default. [live, board screenshot]
- Personal by default; "Set as default" applies to everyone; "Reset to default" goes back. [docs /display-options]
- The right-hand details panel (`Ctrl/Cmd I`) and insights panel are closed by default. [live]

### Activity is compressed

[live, demo] The issue timeline folds runs of small events into one line: "Show 7 events: changed status, assignee, due date, and cycles…", "moved issue through seven cycles to Cycle 78". Comments stay full size.

### Notifications are ranked

Priority tab vs Other [docs /inbox]; email digests "are only sent if you haven't already read the Linear inbox notification" [docs /notifications]; "you won't receive notifications in views you subscribe to for actions you take yourself" [docs /custom-views].

---

## 5. States

### Empty states

[live, demo] Three tiers, matched to how much the user needs to learn:

| Situation | What it says | What it offers |
|---|---|---|
| A feature with nothing in it yet (upcoming cycle) | Title "Cycle 79", then two sentences: what a cycle is ("time-based intervals to help your team focus on a predefined set of work") and what you will see ("Track capacity, scope, and progress as issues are added") | Primary "Create new issue `C`", secondary "Documentation" |
| Nothing selected in a split view (Inbox, Triage) | A count: "52 unread notifications", "57 issues to triage" | Triage adds "Create triage issue" |
| A list with nothing in it (Drafts) | "No active drafts" | Nothing |
| A filter that matches nothing | "No issues matching the filters · 219 issues hidden by filters" | "Clear Filters" |
| Search with no match | `No results found for "zzqxv"` | Tabs stay available |

The empty filter state never looks like an empty product: it says how many items exist and gives the way back.

A related rule from the changelog: "Issue boards now show an error instead of an empty state when too many issues match." An empty state must not be used when the truth is "something went wrong".

### Loading

- [live] Cold load of the demo shows a plain "Loading…" for the first seconds (empty cache, sample data download). After that, no navigation I made showed a spinner or skeleton.
- [docs /delete-archive-issues] The one place Linear admits to loading is explained in advance: "To keep the app speedy, archived issues are loaded on demand rather than stored in the client, so you may find the issues load a little slower on this page."
- [docs changelog] Placeholders are treated as defects to remove: "Project customer pills now show customer logos and names immediately instead of a placeholder until hovered."

### Errors and validation

- [live] Signup, empty email: "Please enter an email address for login." Inline, between the field and the button, plain sentence.
- [docs changelog] Errors say what and why: "Fixed showing permission errors during Linear imports instead of leaving team selection loading"; "Added a hover explanation to the pull request status badge, so a 'Blocked' badge states what is blocking the merge."
- Conflicts are surfaced, not resolved silently: "If rules conflict, this is surfaced in the interface." [docs /triage]

### Offline and sync

[docs /get-the-app] Not observable in the demo.

- "You'll start seeing the words 'Syncing' appear next to the workspace name at the top of your sidebar when the app detects that there are a lot of changes waiting to be synced … The number next to it shows how many changes are waiting to be sent."
- Changes are stored locally and retried, including across an app restart.
- Honest about the limit: "Offline mode is designed as a failsafe and not a full-fledged feature … you could overwrite changes from someone on your team."

I did see the word "Syncing…" flash once in the demo's body text; I could not capture where it rendered.

### Destructive actions

[live, demo] Deleting an issue has four layers:

1. A dialog that names the object: `Delete "ENG-128 ‒ Fix CSS in payment history"?`
2. The consequence, with the safety net, in one sentence: `Deleted issues are available in the "Recently deleted" view for 30 days, before they are permanently deleted.`
3. Two buttons: Cancel / Delete. The button repeats the verb.
4. Afterwards a toast: "Deleted ENG-128 · You can restore deleted issues from the archive. · View recently deleted". And `Ctrl/Cmd Z` restores it.

The same scaling applies elsewhere [docs]:

- Team deletion: 30-day grace period, restore from "Recently deleted". A softer alternative is offered first ("Retire team" keeps history read-only).
- Workspace deletion: emailed confirmation code, 48-hour delay, all admins notified, any admin can cancel.
- Label deletion: no undo, and the docs say so; "Archive" is the offered alternative.
- Irreversible cases are flagged at the point of action: "once you change the start date of the cycle you cannot revert this change"; "You will see a pop up warning to confirm".

Confirmation is proportional to the blast radius: property change (none, undo) → issue (dialog + 30 days + undo) → team (30 days + alternative) → workspace (code + 48 h + notification).

### Notifications and toasts

Covered in 3 (toasts) and 4 (inbox ranking). Two details: urgent priority triggers an immediate notification to the assignee [docs /issue-property]; auto-archive notifies the creator, "an opportunity to unarchive if the issue is still relevant" [docs /issue-property].

---

## 6. Defaults and reduction of decisions

### What Linear decides or pre-fills

| Decision | What Linear does | Source |
|---|---|---|
| First team | Created automatically, named after the workspace | [docs /workspaces] |
| Workflow | Default statuses "Backlog > Todo > In Progress > Done > Canceled" exist from day one | [docs /issue-property] |
| New issue's team, status, cycle | Pre-filled from where you are | [live] |
| Default status | First Backlog status, changeable once per team with "Make default" | [docs /issue-property] |
| Issue ID | Assigned automatically, sequential per team | [docs /creating-issues] |
| Subscription | Automatic on create, assign, mention | [docs /inbox] |
| Sub-issue properties | Inherit team, priority, project (and sometimes cycle, assignee) from the parent | [docs /parent-and-sub-issues] |
| Next cycle | Created automatically; unfinished issues roll over | [docs /use-cycles] |
| Cycle capacity | Computed from the last three cycles | [docs /use-cycles] |
| My issues order | A fixed "focus" order | [docs /my-issues] |
| Search order | Active work first, archived last | [docs /search] |
| List order by status | "closest to done → farthest from done … This helps to surface active work without scrolling through the backlog" | [docs /display-options] |
| Archiving | Automatic only | [docs /delete-archive-issues] |
| Moving an issue to a cycle | Status moves from Backlog to Todo | [docs /default-team-pages] |
| Git branch copied | Assigns the issue to you and moves it to started (optional) | [docs /assigning-issues] |
| Parent/sub-issue status | Optional auto-close in both directions | [docs /parent-and-sub-issues] |
| Related issues | Mentioning an issue in text links it automatically | [docs /editor] |
| Pasted Markdown, links | Converted to rich text, embeds, issue links | [docs /editor] |
| Email digests | Grouped and delayed by urgency, skipped if already read | [docs /notifications] |
| Label group | Single-select by default | [docs /issue-property] |

### What Linear refuses to make configurable, and the reason it gives

- **Priority levels are fixed at five.** "We don't have the option to set custom priorities or more granular priorities since it's easy to get carried away with specificity. Adding too many options makes it harder to set priority and leads to diminishing returns." [docs /issue-property]
- **Status categories are fixed and ordered.** "Teams can reorder statuses within each status category, but the categories themselves stay in a fixed order." At least one status per category must exist. [docs /issue-property]
- **One assignee.** "Issues in Linear are assigned to a single person at a time, giving teams clear ownership and responsibility." [docs /assigning-issues]
- **One team per issue.** [docs /teams]
- **Cycles repeat on a fixed cadence.** "The goal of cycles having repeated intervals is to help you avoid the busywork associated with optimizing cycle timing and instead focus on shipping." Unfinished work always rolls over: "There is no way to keep unfinished issues in a closed cycle." [docs /use-cycles]
- **No manual archive.** "Archiving happens automatically with no option to manually archive items." [docs /delete-archive-issues]
- **No custom fields on issues.** The property list is closed; estimates are four fixed scales. Labels and label groups are the escape hatch. [docs /issue-property]
- **No default assignee setting.** "Linear doesn't currently support setting a default assignee for every newly created issue. Use templates…" [docs /assigning-issues]
- **No workspace-wide board default.** [docs /board-layout FAQ]
- **No picking which notifications reach the inbox.** [docs /inbox FAQ]
- **Reserved names** so features are not re-invented as labels: "assignee", "cycle", "effort", "estimate", "hours", "priority", "project", "state", "status". [docs /issue-property]
- **Hard performance ceiling**: 60,000 non-archived issues per team, "in order to deliver the best performance and speed that Linear is known for". [docs /team-issue-limit]

### Where it does allow choice

Linear separates product decisions from personal comfort. "There's a difference between product settings that a product needs to get right by default and preferences that designers deliberately shouldn't have a strong opinion on." [blog https://linear.app/now/settings-are-not-a-design-failure]

- Personal and reversible: theme, font size, pointer cursor, sidebar items, home view, display options, which key sends a comment, auto-assign to self. [docs /account-preferences]
- Team-level and bounded: names of statuses within categories, cycle length (1–8 weeks), estimate scale, triage on/off, cycles on/off.
- Features that add concepts are **off until needed**: Triage, Cycles, Estimates are per-team toggles; Favorites appears with the first favorite; Projects and Initiatives are described as optional for small teams.

---

## 7. Words

### Names

- Ordinary words for objects: Issue, Project, Initiative, Team, Workspace, View, Inbox, Triage, Label, Document, Draft, Favorite. Stated rule: "Don't invent terms if possible, as these can confuse and have different meanings in different teams. Projects should be called projects." [blog https://linear.app/method/introduction]
- Where Linear departs from industry vocabulary it does so on purpose and says why: **Cycle** not sprint ("Create momentum – don't sprint"; "Unlike sprints, cycles are not tied to releases"); **Issue** not ticket or story ("Write issues not user stories") [blog method] [docs /use-cycles].
- Default statuses are five plain words: Backlog, Todo, In Progress, Done, Canceled. Priorities: No priority, Low, Medium, High, Urgent.
- Sidebar items are nouns of one or two words. Sections are possessive and plain: "My issues", "Your teams".

### Verbs and labels

[live, demo]

- Commands are verb + object, sentence case: "Assign to…", "Assign to me", "Change status…", "Add to project…", "Set estimate…", "Move to cycle…", "Copy issue ID", "Make a copy…", "Mark as", "Convert to", "Remind me".
- Verb choice tracks the kind of property: **Set** for a single value (estimate, due date), **Add to** for membership (project, release), **Change** for something that always has a value (status, priority), **Move to** for a place (cycle, team).
- `…` means "this opens another step"; no ellipsis means "this happens now".
- Empty fields are invitations in the same verbs: "Set estimate", "Add to project", "Add label", "Add sub-issues", "Add description…", "Leave a comment…", "Leave a reply…", "Add document or link…".
- Dialog title, button and resulting toast share one verb: `Accept: ENG-545 …` → button "Accept"; `Delete "ENG-128 ‒ …"?` → button "Delete" → toast "Deleted ENG-128" → "Undo delete ENG-128."
- Buttons are one or two words. Dialog buttons: Cancel / Delete; Discard / Cancel / Save.
- Objects are always named by ID and title in feedback, never "the item".

### Tone

- Empty states and errors are factual and short. No exclamation marks, no mascots, no apology, no "Oops". "No active drafts." "No issues matching the filters." "Please enter an email address for login."
- Explanations state the consequence and the remedy in one sentence ("Deleted issues are available in the "Recently deleted" view for 30 days, before they are permanently deleted.").
- Counts replace adjectives: "52 unread notifications", "209 issues hidden by filters", "3 / 11".
- The docs are candid about limits and intent: "Offline mode is designed as a failsafe and not a full-fledged feature"; "Unfortunately, you can't set board view as a universal default."

### Inconsistencies I saw

Not everything is uniform, and a skill should not claim otherwise:

- The same action is "New issue" (header button), "Create new issue" (tooltip, command menu, empty state) and "Create issue" (modal submit).
- "Add filter" (accessible name) vs "Add Filter" (tooltip); "Clear" (filter bar) vs "Clear Filters" (list footer).
- Changelog and docs disagree on some wording ("Save draft" vs "Save to drafts?").

---

## 8. Marketing site and docs UX

### Homepage (`linear.app`)

[live] One long page, about 10,000 px at 1440 wide, eight blocks:

| # | Block | Job |
|---|---|---|
| 1 | Header: Product, Resources, Customers, Pricing, Now, Contact · Log in · **Sign up** | Navigation; the only button above the fold |
| 2 | Hero: H1 "The product development system for teams and agents", one line "Purpose-built for planning and building products. Designed for the AI era.", a small "New · Loops →" link, then a **working replica of the app** (sidebar, an issue, activity, properties, all focusable buttons) | Say what it is in one sentence, then show the product instead of describing it |
| 3 | Customer logos: "Powering the companies building the future" | Proof |
| 4 | Statement: "A new species of product tool." + three numbered figures: Purpose-built, Powered by agents, Designed for speed | Positioning, three claims |
| 5–8 | Four feature sections in workflow order: Intake and integrations → Planning and monitoring → AI and automations → Build, review, and ship. Each has one sentence, one "Learn more →", and a product replica | One idea, one link, one demonstration per section |
| 9 | Changelog: the four latest entries with dates | Proof of momentum |
| 10 | Two short quotes, "Linear powers over 50,000 product teams", "Customer stories →" | Proof |
| 11 | Closing: "Built for the future. Available today." · Get started · Contact sales | The only large call to action |
| 12 | Footer: five columns (Product, Features, Company, Resources, Connect) + legal | Full site map |

- Signup calls to action on the whole page: **two** (header "Sign up", closing "Get started"), plus one "Contact sales". The hero has no button of its own.
- Four "Learn more →" links, one per feature section.
- Feature sections follow the order of the work (intake → plan → automate → build), which is also the order of the docs sidebar.
- The latest launch is one quiet link next to the hero text, not a banner.

### Pricing (`linear.app/pricing`)

[live]

- H1 is the single word "Pricing". No tagline.
- Four plans in one row: Free ($0, "Free for everyone"), Basic ($10 per user/month), Business ($16), Enterprise (Custom). Each card: price, billing note, at most nine bullets, one button.
- Each plan's list starts with "All <previous plan> features +" and lists only what is added.
- One primary action per card: "Get started" for the three self-serve plans (Business also offers "Contact sales"), "Contact sales" for Enterprise.
- Then one comparison table of about 60 rows with the values "Included / Not included" or a number, and the buttons repeated in the table's last row.
- Then the same closing block as the homepage.
- No plan is marked "most popular"; there is no monthly/yearly toggle among the first-screen controls (cards say "Billed yearly").

### Docs (`linear.app/docs`)

[live] [docs]

- Left sidebar with eleven groups ordered like the workflow, not alphabetically: Getting started · Intake · Planning · Issues and cycles · Reviews · Agents and automation · Insights and outcomes · Working in Linear · Integrations · Workspace management · Importers. Children are collapsed until their parent is opened.
- Top: Search. Bottom-left switcher: Docs / Developers / Learn / Contact support. Top-right: theme toggle, Sign up.
- Home: eight cards (Start Guide, Import, Linear Agent, MCP, …).
- A page has a predictable skeleton: title, one-sentence summary, one screenshot, Overview, then **Keyboard / Mouse / Command menu**, Basics, FAQ as collapsed questions. Plan restrictions are in a note box at the top.
- The docs explain reasons, not only steps (see the priority and cycle quotes in 6), and include "How we work at Linear" boxes with the team's own configuration.
- The Start Guide's first suggestion is not to read more: "To learn Linear's layout before signing up, explore our demo workspace."
- Every page is also served as Markdown (`<url>.md`) with an index at `linear.app/llms.txt`.

---

## 9. The principles Linear states itself

### The Linear Method — https://linear.app/method/introduction

Eight principles, quoted:

- **Build for the creators** — "Keeping individuals productive is more important than generating perfect reports."
- **Purpose-built** — "Productivity software needs to be designed for purpose. It's the only way the product can truly do the heavy lifting. Flexible software lets everyone invent their own workflows, which eventually creates chaos as teams scale."
- **Create momentum – don't sprint** — "The goal is to maintain a healthy momentum with your teams, not to rush towards the end."
- **Meaningful direction** — "it's important to understand and remind everyone of the purpose and long-term goals of your work."
- **Aim for clarity** — "Don't invent terms if possible, as these can confuse and have different meanings in different teams. Projects should be called projects."
- **Say no to busy work** — "Your tools should not make you the designer and maintainer of them. A tool should work for you, not the other way around. Remove or automate 'work around work'."
- **Simple first, then powerful** — "A tool should be simple to get started with and grow more powerful as you scale."
- **Decide and move on** — "There isn't always a best answer. Sometimes the most important thing is to make a decision, and move on."

Practices that shape the UI directly: "Specify project and issue owners … the responsibility should lie with a single person"; "Keep a manageable backlog … Important ones will resurface"; "Scope issues to be as small as possible … It feels great to mark issues as done"; "Write a changelog".

Related Method pages:

- https://linear.app/method/write-issues-not-user-stories — "Write short and simple issue titles that directly state what the task is. The title should be easy to scan, since most people will read it on a list or board in the context of other issues. Descriptions should be optional–not required."
- https://linear.app/method/building-with-momentum — "Instead of thinking or talking about doing something, you decide to do it or not to do it."
- https://linear.app/method — "There is a lost art of building true quality software."

### Speed, modernity, multiplayer — https://linear.app/now/rethinking-the-startup-mvp-building-a-competitive-product

"We knew we wanted our product to demonstrate three values: 1. It should be as **fast** as possible (local data storage, no page reloads, available offline). 2. It should be **modern** (keyboard shortcuts, command menu, contextual menus). 3. It should be **multiplayer** (real-time sync and teammates presence)."

### The 2026 refresh — https://linear.app/now/behind-the-latest-design-refresh

- "**Don't compete for attention you haven't earned**" — "not every element of the interface should carry equal visual weight. While the parts central to the user's task should stay in focus, ones that support orientation and navigation should recede."
- "**Structure should be felt not seen**."
- "Linear is designed to surface exactly what you need, when you need it."
- On drift: "Software rarely gets worse all at once. More often, it contorts out of shape one useful feature at a time."
- On predictability: actions "like sharing a page, copying a link, and opening a PR no longer appeared in predictable places."
- "If most people don't immediately notice what changed, that's probably a good sign."

### The 2024 redesign — https://linear.app/now/how-we-redesigned-the-linear-ui and https://linear.app/now/a-design-reset

- Goals: "reduce visual noise, maintain visual alignment, and increase the hierarchy and density of navigation elements."
- The frame: "this inverted L-shape. It's the global chrome of the application that controls the content in the main view."
- Alignment in the sidebar "isn't something you'll immediately see but rather something that you'll feel after a few minutes of using the app."
- "Design debt is real … If your product evolves fast, you should be paying this debt every 2-3 years."
- Navigation changes were deliberately left out of the redesign because they "change how users interacted with the product. This felt like an unnecessary risk."

### Settings — https://linear.app/now/settings-are-not-a-design-failure

"There's a difference between product settings that a product needs to get right by default and preferences that designers deliberately shouldn't have a strong opinion on." And: "we approached our settings redesign like an onboarding experience."

### Invisible details — https://linear.app/now/invisible-details

"At Linear we care a lot about speed. It may only take a fraction to 1–2 seconds longer to move your mouse … but the seconds add up when you're taking the action multiple times. Some product and engineering managers take hundreds of interactions a day on Linear."

### Quality

- https://linear.app/now/why-is-quality-so-rare — "Technology makes it faster to build, but harder to care." "Even we, as designers, stopped asking; 'Does this feel right?.' Instead, we started asking: 'Does it convert?'"
- https://linear.app/now/quality-wednesdays — "more than 1,000 small acts of polish"; fixes for "small imperfections that degrade the overall experience"; "Most of these fixes are small on their own, but together they completely change how the product feels."
- https://linear.app/now/zero-bugs-policy — "low-priority bugs need to be addressed within 7 days, high-priority bugs within 2." "Fixing a bug takes the same amount of work whether we do it right away or put it off."
- https://linear.app/now/code-review-should-be-fast — "Fast. Reviews should open near-instantly. Focused. Reviews should show what matters and strip out the noise."

### README — https://linear.app/readme

Names the enemy: "Noise & Distraction … Alerts here, notifications there. We are spending more time with the coordination of our work than with the work we actually want to get done." And the aim: "The tool we are building is the fastest of its kind. It is incredibly easy to use, but also grows more powerful with each interaction."

### Constraints — https://linear.app/now/building-our-way

"saying no and setting constraints can help bring clarity."

---

## Patterns worth copying

Each rule, what Linear does that shows it, and the source.

1. **Show location in several independent places that always agree.** Sidebar highlight + linked breadcrumb + tabs + matching page title + a meaningful URL, plus an "n / total" counter inside a detail page. — [live, demo]

2. **Make the first screen a working list of the user's objects, not a dashboard, and never start from nothing.** A team is created with the workspace, a five-status workflow already exists, and the landing page is Team › Issues › Active. — [docs /workspaces, /issue-property] [live, demo]

3. **Creating the core object needs one field and zero decisions.** `C`, type a title, `Ctrl/Cmd Enter`. Team, status and cycle are pre-filled from where the user stands; everything else is optional chips in one row. — [live, demo] [docs /creating-issues]

4. **Edit properties in place; never send the user to an edit form.** One click or one key opens a small picker anchored to the value; choosing applies it. Use a modal only to create something or to attach a note to a decision. — [live, demo]

5. **Give every action three doors that share one label and one shortcut.** Visible control, right-click menu, command menu. Each shows the same name and the same key, so every door teaches the other two. — [live, demo] [blog invisible-details]

6. **Teach shortcuts where the mouse already is.** Tooltip on every control = action + key ("Add Filter `F`"); menu rows show keys; the empty-state button shows its key ("Create new issue `C`"). Keep the grammar small and regular so keys can be guessed: one letter acts on the focused item, `G`+letter goes somewhere, `O`+letter opens a picker, `Shift`+letter is the variant, `Esc` always goes back, digits pick an option inside a menu. — [live, demo] [docs changelog 2023-05-11]

7. **Make the command menu contextual, and show its target.** It opens on actions for the focused or selected item, with a chip naming that item ("ENG-126 · title") above the input. With nothing selected it opens on "create" commands grouped by object type. — [live, demo] [docs changelog 2019-12-18]

8. **When a filter is active, say so in four places and always offer the exit.** A filter bar with editable parts, "3 / 11" on group headers, "209 issues hidden by filters — Clear Filters" under the list, and the filter in the URL. A zero-result filter reads "No issues matching the filters" with the same exit, never a blank page. — [live, demo]

9. **Separate "which items" from "how they look".** Filters and Display options are two buttons, two shortcuts, two panels; a dot marks a view that differs from its default; personal changes stick, "Set as default" shares them, "Reset to default" undoes them. — [live, demo] [docs /display-options]

10. **Keep rows free of buttons.** A row shows about ten facts and no actions. Hover reveals only a checkbox. Actions live in keys, right-click and the command menu. Empty properties in the detail view appear as dim verb prompts ("Set estimate") instead of being hidden. Selecting rows raises one floating bar: the count, one suggested action, a door to all actions, a clear button; every single-item shortcut then applies to the selection. — [live, demo]

11. **Feedback should be the change itself; use a toast only when the result is out of sight.** A property change simply appears, in under 150 ms. Create, delete and undo get a toast that names the object and links to the next step ("Issue created · ENG-546 ‒ title · View issue"). — [live, demo]

12. **Make undo universal and specific.** `Ctrl/Cmd Z` reverts single and bulk changes, says exactly what it reverted ("Undo set priority of ENG-128 to Urgent."), and returns the user to the place and selection where the change was made. — [live, demo] [docs changelog undo-actions]

13. **Scale confirmation to the damage, and put the safety net in the sentence.** No dialog for property changes; for delete, a dialog that names the object, states "available in Recently deleted for 30 days", and repeats the verb on the button; for a team, a 30-day grace period and a softer alternative (retire); for a workspace, an emailed code and a 48-hour delay. — [live, demo] [docs /teams, /workspaces]

14. **Never lose typed text.** Leaving a half-written issue keeps it as a draft; closing it asks "Save to drafts?" with Discard / Cancel / Save; comments not yet sent appear in Drafts. — [live, demo] [docs /creating-issues, /comment-on-issues]

15. **Let the user look without leaving.** `Space` previews the focused row; `J`/`K` move between items inside the detail view; `Esc` returns to the list with filters and cursor position preserved. — [live, demo]

16. **Size empty states to what the user needs to learn.** A new concept gets two sentences, one primary action and a docs link. A familiar list gets three words ("No active drafts"). A split view with nothing selected gets a count ("57 issues to triage"). Do not show an empty state when the real answer is an error. — [live, demo] [docs changelog]

17. **Decide for the user, give the reason, and keep the options few.** Five fixed priorities ("Adding too many options makes it harder to set priority"), fixed status categories, one assignee, one team per issue, automatic archive, cycles that repeat and roll over by themselves. The same goes for ordering: My issues has a fixed focus order, status-sorted lists show nearly-done work first, search ranks active work above archived. Leave open only personal comfort (theme, sidebar, home view). — [docs /issue-property, /use-cycles, /assigning-issues, /my-issues, /search] [blog settings-are-not-a-design-failure, method]

18. **Turn concepts on only when needed.** Triage, Cycles and Estimates are off until a team enables them; Favorites appears with the first favorite; rarely used sidebar items sit under "More" or show only when they have a badge; small teams are told to start with issues alone. — [docs /teams, /favorites, /how-to-use-linear-small-teams] [live, demo]

19. **One verb through the whole flow, plain nouns, `…` for "more to do".** "Delete" on the menu, the dialog title, the button and the toast; "Set / Add to / Change / Move to" chosen by property type; ordinary names ("Projects should be called projects"). — [live, demo] [blog method]

20. **On marketing pages, show the product working and ask once.** One-sentence headline, a live replica as the hero, one idea and one "Learn more" per section, two signup buttons on the whole page. The authentication screen has three buttons and no fields; then one field per screen, already focused. — [live]

---

## Not verified

- **Onboarding / first run after signup.** Workspace creation, theme step, command-menu tutorial, checklist and the "join teams" dialog come from docs, the changelog and third-party teardowns (Supademo, shaheermalik.com). Not seen.
- **Signup past the email field.** The email-code / magic-link step, Google and SAML paths, passkey login, and error handling for unknown or existing accounts.
- **Invite flow and all Settings pages.** Read in docs only; step counts are from the documented procedure.
- **Sync, offline and multiplayer.** The "Syncing" indicator with a pending count, behaviour while offline, conflict behaviour, presence of teammates, real-time updates. The demo does not sync; forcing the browser offline changed nothing visible.
- **Whether changes really are optimistic against a server.** In the demo the change was instant, but nothing was sent. The local-first claim rests on Linear's own description and a third-party technical article.
- **Workspace search results** and their ordering, recent searches, `@` filters in search. Search returned no results in the demo for every query.
- **Saving a custom view** (the dialog after "Save"), sharing, view subscriptions, AI filter and Advanced filter builder.
- **Workspace switcher, sidebar search button and compose button.** Replaced by "Sign up" in the demo; seen only as a replica on the homepage.
- **Keyboard shortcut trainer hints.** Did not trigger in the demo.
- **Error states of the app** (permission errors, failed saves, rate limits, conflict messages). Only the signup validation message and changelog descriptions.
- **Loading states in a real workspace.** Only the demo's cold-start "Loading…" was seen.
- **Why the new-issue modal pre-filled "Todo" and "Cycle 78".** Observed; whether it comes from the view, a team default or a default template is not established.
- **Mobile apps, desktop app (tabs, back/forward, history), board drag and drop, timeline, projects, initiatives, documents, dashboards, the agent features.** Out of scope or not exercised.
- **Docs screenshots.** Not opened; only alt text was read.
- **Third-party claims** about activation metrics and "time to value" are opinions of their authors, not measurements.
- **Counts taken from the DOM** (calls to action per page, 18 context-menu items, 16 display properties, about 21 filter categories) are from one desktop viewport on one day; marketing pages render responsive duplicates, so I reported visible, distinct controls.
