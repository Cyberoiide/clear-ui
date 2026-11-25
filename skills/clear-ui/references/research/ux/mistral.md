# Mistral AI: UX teardown (structure, flows, behaviour)

Research date: 2026-11-25. Desktop Chromium, 1440 px wide, English locale unless stated; one extra pass with a French locale. No account was created and no login was attempted.

**Evidence tags used on every finding**

- **[live]** observed by interacting with the live page in a private browser.
- **[docs]** read in official documentation (docs.mistral.ai, help.mistral.ai) or an official blog post.
- **[shot]** seen in an official screenshot (App Store listing, mistral.ai product page mock-up).
- **[strings]** read in the UI string catalogue that chat.mistral.ai ships inside its own page (7,141 English strings, 7,136 French). These are real product copy, but most were **not seen rendered**, so they prove wording and the existence of a state, not layout or timing.
- **[code]** read in the app's shipped JavaScript (command registry). Same caveat as [strings].
- **[3p]** third-party source.

**What the product is called today.** "Le Chat" became "Vibe" on 28 May 2026; Vibe then had three tabs (Chat, Work, Code); since 22 September 2026 Chat is merged into Work, leaving Work and Code. "La Plateforme" is now "Studio" (console.mistral.ai), and a third product, "Admin" (admin.mistral.ai), holds organisation settings. [docs] https://docs.mistral.ai/vibe , https://docs.mistral.ai/getting-started/platform-overview

**The single most important finding.** As a guest I could not have a conversation. The page shows a working-looking composer, asks me to accept the Terms of Service, lets me type and pick a mode, and then pressing Enter sends the whole page to the login screen. Everything about a rendered conversation therefore comes from docs, official screenshots and shipped strings. [live]

---

## 1. Information architecture

### Assistant, guest first screen (chat.mistral.ai → /work, title "Vibe Work") [live]

Ten controls in total, nothing else on the page:

| Zone | Contents |
|---|---|
| Top left | Theme button (menu: Light / Dark / System), Privacy button |
| Top right | "Sign in" (text link), "Sign up" (filled button) |
| Centre | Logo, greeting "Good morning. Let's get started", composer |
| Composer, one row | "+" button, text field "Ask anything", mode button "Think ⌄", microphone, send arrow (disabled) |
| Bottom right | "?" help button (menu: Documentation, Models, API documentation, Cookbooks, Help Center, Discord community, Terms of Service, Privacy Policy) |

Left out for a guest: sidebar, chat history, suggested prompts, model picker, tool toggles, disclaimer text, footer, product tabs (Work/Code), any explanation of what Vibe is. `/chat` redirects to `/work`; `/code` redirects to `/work?return_to=/code` with no message. [live]

At 390 px wide the same ten controls remain, except the mode button drops its label and the help button disappears. [live]

### Assistant, signed-in structure

Sidebar contents, from the shipped strings and docs. **The visual order is not verified.**

- Top: product switcher with two tabs, Work ("Get work done with tools") and Code ("Build anything"), with a "New activity" marker; Search; New chat. [strings] Vibe remembers the last tab used. [docs] https://docs.mistral.ai/vibe/work/web
- Sections: Pinned, Projects ("New Project", sort "Manually" / "Last updated", "Show N more"), Scheduled, Chats (label "Tasks" in the Work history), grouped by "Recent / Yesterday / Last 7 days / Last 30 days / Older". [strings]
- Context group: Instructions, Knowledge, Skills, Plugins. [strings] [docs]
- Libraries, Connectors, Apps, Meeting Notes; Archived chats, Shared chats. [strings]
- Sections can be reordered ("Move up" / "Move down") and the user chooses how many recent chats show: "Choose how many of your latest chats show here. The others stay under Show more." [strings]
- Bottom left: organisation name opens the account menu: switch Organization / Workspace, Settings, Privacy, Help Center, Theme, Log out; a usage meter "{percentage}% of monthly usage used"; "Upgrade to Pro". [strings] [docs] https://docs.mistral.ai/vibe/work/web/knowledge
- Collapsed state: a 48 px icon rail. The official mock-up shows logo, "+", a grid icon, a cluster icon, a clock, and the organisation at the bottom. [shot] https://mistral.ai/products/vibe/
- Right-hand panel: live todos, Canvas, Sources. [docs] [strings]

How objects are organised [docs]:

- **Chats** live in history; a chat can be put in one **Project** (own instructions and shared files). Removing a chat from a Project does not delete it.
- **Skills** replace Agents; **Knowledge** replaces Memories; both sit under "Context".
- **Libraries** are persistent document sets attached per chat from the "+" menu; file uploads last for one chat only.
- **Connectors** have their own page ("My Connectors" → card → "Functions" tab with an "Always allow" switch per function).
- **Settings** are reached from the account menu, not from the sidebar body.

Mobile (iOS) header: menu icon, centred mode switcher "Work ⌄", temporary-chat (ghost) icon. [shot] https://apps.apple.com/us/app/vibe-by-mistral-ex-le-chat/id6740410176

### Console ("Studio", console.mistral.ai)

Fully gated: `/` and `/api-keys` both redirect to login and keep the deep link in `return_to`. [live] From docs: a "Studio navigation" with entries such as Playground and API Keys, a workspace dropdown, and a separate Admin Panel whose navigation is written as breadcrumbs ("Admin Panel › Administration › Members", "› Subscriptions › Billing", "› Manage › Workspaces", "› API › API Keys"). [docs]

### Docs (docs.mistral.ai) [live]

- **Top bar**, 7 sections: Getting Started, Vibe, Studio, Inference & Models, Resources, Admin, API. Right side: theme, "Reach out", "Try Studio".
- **Left sidebar**, 300 px, scoped to the current top section. Search box at the top. Collapsible groups with chevrons. Depth reached: 4 levels (Getting started › Quickstarts › Studio › Create your first API key).
- **Current page**: filled grey row in the sidebar; the section name as the sidebar heading; an uppercase breadcrumb above the title; a scroll-spy "On this page" rail on the right that highlights the headings in view.
- **Search**: ⌘K / Ctrl+K opens a centred palette. Empty state shows "Recommended" chips (VIBE, BILLING, STUDIO). Results show title + snippet with matched words in orange and deep-link to headings.
- Footer: site links plus a language selector.

### Marketing (mistral.ai) [live]

- Header: Research, Sovereign AI, Cloud, Customers, Company | "Get in touch" | "Start building ⌄".
- Hover menus are short (Sovereign AI has 4 rows: Why Sovereign AI, Products, Method, Sovereign AI in practice).
- **Audience split is done by the two right-hand buttons.** "Get in touch" is for enterprise buyers. "Start building" opens a three-item menu: Studio, Vibe, Pricing. Pricing is not in the main navigation.
- Docs and Blog sit under Company.

---

## 2. Core flows, step by step

### Guest: first conversation [live]

1. Open chat.mistral.ai. Redirects to `/work`.
2. A modal blocks the page: "Vibe Terms of Service: You must accept our Terms of Service and Privacy Policy to start using Vibe." One button, "Accept and continue". No close button. Escape and clicking outside do nothing. The page behind is blurred and inert. Decision: 1, forced.
3. Click "Accept and continue". No personal data is asked. The choice is remembered on reload. The composer is not focused afterwards (on later loads it is focused automatically).
4. Type a question. The send button's label changes from "Cannot send empty message" to "Send".
5. Press Enter. **The whole page navigates to the login screen.** The prompt is stored in session storage and its id travels in the URL (`return_to=/work?pending_auth_prompt=<id>`), so it can be replayed after login.

Cost of the gate: one forced click and a legal acceptance, in exchange for nothing a guest can use. Steps to a first answer without an account: not possible in this session. Pressing Back returns to an empty composer with the mode reset to "Think".

The strings still describe a guest allowance ("{n} messages left: Sign up to access our best models, higher limits…" and "Thanks for using Vibe: Sign in or sign up to store chats, use files, generate images and more. [Continue the discussion]"), so guest chatting existed or exists for some sessions. [strings]

### Choosing a mode or tool

- Guest: click the mode button, pick "Fast: Get answers fast" or "Think: Handle complex tasks". 2 clicks, 1 decision. The button then shows the chosen name. Default is Think. [live]
- Signed in: tools sit behind "+" (Upload Files, Libraries, Connectors, Skills, Projects, Workflows, Knowledge, Plugins, Desktop Folders, Tools, Commands), or type "/" for the same list, or "@" to mention a Skill. Tools listed: Web search, Image generation, Canvas, Code Interpreter. Docs say Work "selects the right tools and context from your prompt automatically". [strings] [docs]

### Attaching a file

- Guest: clicking "+" navigates to login. The only warning is a hover tooltip, "Sign in to access settings". 1 click, then a wall. [live]
- Signed in: "+" → "Upload Files" → choose files (3 steps), or drag and drop ("Drop your files here..."). [docs] [strings]

### Sign-up and login [live]

1. "Sign in" and "Sign up" both lead to the same screen on v2.auth.mistral.ai: "Let's start building / Login or signup below".
2. One email field (placeholder "you@example.com") and three icon-only buttons (Apple, Google, Microsoft). A "Forgot password?" link is shown before any password field exists.
3. A "Continue" button appears only after the first character is typed.
4. Typing a non-email and pressing Enter shows "Email is invalid" under the field.

Decisions on the screen: 1 (email or one of three providers). Not walked further, to avoid submitting an address.

### Getting an API key [docs]

https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key

1. Prerequisite: an account "on a plan with API access" (add a payment method).
2. Open Studio → API Keys (a direct link is given).
3. "New key".
4. Enter a name.
5. Set an expiration date.
6. Choose a connector scope (shared only, or private and shared).
7. Create, then copy: "The full key appears only once."

7 steps, 3 decisions. The page then gives the environment variable and a test `curl`, with the expected output and the most likely error.

### Docs: homepage to an answer ("how do I get an API key") [live]

- By search: Ctrl+K → type "api key" → choose a result. 3 actions, but the right page is the 9th result, and results carry no section label, so "API key expiration policy" appears twice and "Get an API key" twice with nothing to tell them apart.
- By browsing: Getting Started → Quickstarts → Studio → "Create your first API key". 4 clicks.
- From the homepage quickstart list: filter chip "Studio" → card. 2 clicks.

---

## 3. Interaction model

### Inside the composer versus behind menus

- Always visible: "+", text field, mode button, microphone, send. [live]
- Behind "+": every source of context and every tool. Selected items come back into the composer as removable pills ("Use "{name}" document library", "{count}/{total}" tools enabled). [strings]
- Behind the mode button: Fast / Think, each with a 3-word description. [live]
- The mobile composer is reduced to "+", field, microphone. [shot]

### Suggested prompts

None for a guest. [live] Signed in: cards that name a connected app, for example "Summarize my unread emails", "Post update to #team-channel", plus "Discover more". Each card has a short label and a longer prompt behind it ("Brief me on my next meeting" → "Look up my {connector} and brief me on my next meeting"). [shot] [strings]

### Message-level actions [strings]

Copy, Re-generate, Edit, Delete, Like / Dislike, Read aloud, Sources, Previous / Next version, "Ask about this" on selected text (Tab to quote). While an answer is generating the tooltips change to explain the block: "Message cannot be regenerated during generation". Whether these show always or on hover is not verified.

### Keyboard shortcuts

- Bindings [code]: command palette Mod+K; shortcut list Mod+/; new chat Mod+Shift+O; toggle sidebar Mod+B or Mod+Shift+B; "Steer" (stop and send the queued message now) Mod+Enter; Enter sends, Shift+Enter makes a new line (the last two confirmed [live]).
- Surfacing: tooltips carry the key ("K", "B") [code]; a "Keyboard shortcuts" sheet groups them by category (Chats, Modes, View, Session, Settings, Window, Actions) and by zone (Message composer, Pending approval, Command palette…) with a fixed "Other keys" block: "Send a message", "New line in a message", "Close a dialog or the palette", "Move through a list" [strings]; the composer placeholder can rotate to "Type / for quick access" [strings]; docs give both macOS and Windows/Linux keys every time [docs].
- For a guest, Ctrl+K and Ctrl+/ do nothing. [live]
- After clicking an empty area of the page, typing still goes into the composer. [live]

### Command and search palettes

- App: one palette with command search and "Search sessions and chats"; session commands are prefixed ("Session: Rename", "Session: Pin", "Session: Delete"). [strings]
- Docs: palette described in section 1. [live]
- Help centre: its own search with "Ctrl K" shown correctly for the platform. [live]

### Disclosure of advanced options

- Mode: two named choices instead of a model list. A model selector exists ("Choose model") but is not on the guest screen. [live] [strings]
- Agent steps: one status line ("Working · Searching web ⌄") that expands into a step list ("Thought for 3s", "Ran 2 web searches", "Loading skill pipeline-analysis.md"); a search step expands to the query, a source count and the sources with site icons. [shot] "Each tool call and reasoning chain is expandable to its inputs and outputs." [docs] https://mistral.ai/news/vibe-agent/
- Approvals: asked at the moment of the action with three choices (see section 5). Per-function switches live deeper, on the connector page. [docs]
- Login: the "Continue" button appears only when there is something to continue with. [live]
- Docs: long expected-output blocks sit behind "See more". [live]

---

## 4. Density and prioritisation

| Surface | Visible at once | Hidden until asked |
|---|---|---|
| Guest empty screen | 10 controls, 1 heading, 0 suggestions [live] | theme options, privacy switch, help links, modes |
| Composer | 4 buttons + field, one row [live] | all tools and context sources behind "+", "/" and "@" |
| iOS empty screen | 3 header controls, 3 suggestion cards, 3 composer controls [shot] | modes, tools |
| Sidebar row | title, unread dot; one "More options" button revealed on hover (20 px, from the earlier visual pass) | Rename, Pin, Mark as read/unread, Move to project, Archive, Delete [strings] |
| Message | up to 8 named actions [strings] | visibility rule not verified |
| Docs page | title, one-line summary, time estimate, body, right-hand outline, "Copy page" [live] | code copy button (hover only), "Copy section link" per heading, "Copy page" menu |
| Docs code block | code only [live] | 36 px copy button appears on hover, no label |
| Pricing first screen | 4 plans, 2 prices, currency switch, 1 checkbox [live] | comparison table and FAQ below |
| Marketing first screen | 1 headline, 1 small link chip, 7 header items [live] | product links inside "Start building" |

---

## 5. States

### Empty

- Guest: greeting + composer only. The greeting varies by time of day; eight variants are shipped ("Good morning. Let's get started", "Good afternoon. Ready when you are", "Late night? Ready when you are", "Still up? Tell me what's on your mind"). [live] [strings]
- Lists: "You don't have any {kind} yet." with a "New …" button; search inside a list: "We couldn't find any results for your search." [strings]
- Temporary chat: "Let's keep this one between us". [strings]

### Loading and streaming

- Status line with an animated pixel mark: "Working · Searching web". Finished steps get a tick, the running step a spinner. [shot]
- Every tool has three or four phrasings: running "Reading Knowledge", done "Read tool instructions for 3 tools", stopped "Stopped reading Knowledge", failed "Failed to find relevant tools". [strings]
- After reasoning: "Generating answer". Send becomes "Stop generation" (docs: "the black square"). [strings] [docs]
- Messages typed while the agent works are queued: "2 queued messages", "Steer: Stop and send now", "Clear all". [strings]
- Network: "Waiting for connection…", "Connection interrupted, reconnecting... (2 / 5)". New version available: "Reload to update". [strings]
- Upload: "Uploading...". [strings]

### Errors [strings]

Good ones state the cause and the way out:

- "This chat has reached its length limit: We don't support chats this long yet. Start a new chat to keep going."
- "This model can't read images: Switch to a vision-capable model or remove the image and try again."
- "Tool usage paused: Too many tool calls in a short window. You can retry when the window resets, or continue without this tool." Buttons: "Retry now", "Provide an answer now".
- Retry is disabled with a reason: "The model needs a moment to free up capacity. Retrying right away would likely fail again."
- File errors name the file: "File {filename} is larger than the allowed size {size}".
- Error cards carry "Retry", "Edit this message" and "Error code: {errorCode}".

Weak ones are generic or leak transport vocabulary:

- "It appears that an unexpected issue has occurred. We apologize for the inconvenience. Please try again later or refresh the page."
- "A precondition for this request was not met. Please check your input and try again."

App 404: "Page not found: This page does not exist or was moved. [Go home]". [live] Docs 404: "¿Meow? Page not found. The page you're looking for was either moved or doesn't exist. [Go back to Introduction]", with no search box. [live]

### Limits and upsell [strings]

- "Messages limit reached: You have reached your message limit. Your limit will reset {resetTime}." followed by one nudge that depends on who you are: guest "Login to unlock more messages and continue chatting."; free "Upgrade to Pro right now to unlock unlimited messages and more!"; team member "Ask an admin of your organization to grant you access to Team."
- Rate limits state the number: "{entity}: quota reached ({quota} every {window}). Try again {relativeTime}."
- Capacity: "This model is at full capacity right now: Try again in a few minutes, or upgrade to Pro for priority access."
- Standing meter in the account area: "{used} of {total} used", "Resets in {resetsIn}".
- Voice: "You have reached your weekly voice conversation limit. It resets on Monday."
- Upgrade dialog: "Upgrade to Pro" with "Maybe Later" as the way out.
- A user review on the App Store complains that hitting the free limit stops the conversation entirely. [3p] https://apps.apple.com/us/app/vibe-by-mistral-ex-le-chat/id6740410176

### Confirmation and destructive actions

- Delete chat: dialog "Delete the chat? This action will result in the removal of "{title}"", button "Delete". It names the object but does not say whether it can be undone. [strings]
- Archive is reversible and confirmed by a toast: "The chat has been archived" / "The chat has been restored". [strings]
- Temporary chat asks before any action that would lose it: "Exit temporary chat? If you exit this conversation, it will be lost." There is also a rescue: "Convert to real chat: Save this conversation to your history". [strings]
- Unshare states what stays: "The share link stops working. Your original chat stays as it is." [strings]
- Docs spell out permanence and side effects: "Deleting a Project is permanent and can't be undone. The chats inside aren't deleted." [docs] https://docs.mistral.ai/vibe/work/web/projects
- Agent actions on outside systems: "Continue" (this once), "Always allow" (this session), "Decline", with the arguments expandable; after declining, a field "Ask me to do something else". Local file changes are written as plain sentences: "Delete {name} on your Desktop, with 3 files inside". [docs] [strings]
- Slide deletion uses undo instead of a dialog (Cmd/Ctrl+Z). [docs]

### Feedback after an action

- Privacy switch: toast "Message privacy settings updated successfully." [live]
- Copy: "Copied to clipboard", "Table copied to clipboard". Feedback: "Thanks for the feedback!" / "Feedback removed". [strings]
- Docs "Copy page": the label becomes "Copied". Code copy: the icon becomes a tick for about two seconds, no text. [live]

### Docs states [live]

- No results: "No results for "zzqqxxyy"." and nothing else (no suggestion, no link).
- Search before typing: "Recommended" chips.

---

## 6. Defaults and reduction of decisions

- Mode defaults to Think; the guest's choice of Fast is lost on reload. [live]
- Theme defaults to System. [live]
- **Training on user data defaults to on for a guest.** It is reached by Privacy icon → a one-item menu → a dialog with the switch: 3 clicks. [live]
- The composer is focused on load. [live]
- Tools are picked by the agent; "Enabled automatically in Work mode". [strings]
- Read-only connector functions can be pre-authorised; functions that write stay on manual approval by recommendation. [docs]
- One login screen serves sign-in and sign-up, for all three products; the destination is carried in `return_to`. [live]
- Drafts are stored per chat (`draftMessageByChatId` in the app's local store). [live]
- Docs choose a language tab for you (Python) and give every quickstart a time estimate. [live]
- Pricing marks one plan "Popular". [live]
- What a guest can do without an account: change theme, switch off training, open help links, pick a mode, type. Nothing else. [live]
- When sign-in is requested: on "+", on the microphone, and on send. Always as a full-page redirect, never as an in-page prompt. Only "+" announces it, and only in a hover tooltip. [live]

---

## 7. Words

### Labels and placeholders

| Item | English | French | Where |
|---|---|---|---|
| Composer placeholder | Ask anything | Posez votre question | [live] |
| Alternate placeholder | Type / for quick access | Tapez / pour un accès rapide | [strings] |
| Greeting | Good morning. Let's get started | Bonjour. C'est parti | [live] |
| Modes | Fast: Get answers fast / Think: Handle complex tasks | Rapide: Obtenez des réponses rapidement / Réflexion: Gérez des tâches complexes | [live] EN, [strings] FR |
| Disabled send | Cannot send empty message | Message vide | [live] |
| Auth | Sign in / Sign up | Se connecter / S'inscrire | [live] |
| Gate | Accept and continue | Accepter et continuer | [live] |
| Disclaimer | Vibe can make mistakes. Check answers. Learn more | Vibe peut faire des erreurs. Vérifiez les réponses. En savoir plus | [strings] |
| Approval | Allow this time / Always allow / Decline | Autoriser cette fois / Toujours autoriser / Refuser | [strings] |
| Limit | Messages limit reached | Limite de messages atteinte | [strings] |
| Temporary chat | Let's keep this one between us | Gardons celle-ci entre nous | [strings] |
| Delete | Delete the chat? | Supprimer la conversation ? | [strings] |

Placeholder elsewhere: "Ask Vibe anything" in the iOS screenshot and "Ask Vibe anything..." in the product-page mock-up. [shot]

### Tone

- Short, plain, second person. Status lines are verb phrases ("Searching web", "Loading skill").
- Limits state the fact, then the reset, then one next step.
- Light humour is confined to low-stakes places: the docs 404 ("¿Meow?") and the cookie notice ("Purr-fecting your experience with Cookies"). [live]
- Docs are instructional and verify themselves: "You should see", then the likely failure. [live]

### Naming, and how the rename is handled

Done well:

- Signed-in users get a walkthrough: "Le Chat is now Vibe" / "Le Chat devient Vibe", then "We've merged Chat into Work", "We've added Fast and Think modes", "We've upgraded Deep Research and Agents to Skills", "We've upgraded Memories to Knowledge", ending on the button "Let's get to Work". Coach marks then point at the new places: "Agents are now Skills. Memories are now Knowledge. Both live here." [strings]
- The same promise is repeated everywhere: "Same URL, same login", "Nothing you have created is lost". [docs] https://help.mistral.ai/en/articles/682992-le-chat-is-now-vibe
- A mapping table from each old feature to its new home. [docs] https://docs.mistral.ai/vibe/choose-chat-work-code
- Old names kept in titles for search: "Vibe by Mistral (ex-Le Chat)" (App Store), "Mistral Vibe (formerly Le Chat)" (product page). [live]
- Old clients are told plainly: "This mode is no longer available: Use Work mode for your conversations. Update your app to get the latest functionalities." [strings]

Done badly:

- A returning guest sees "Vibe Terms of Service" and "Vibe Work" with no mention of Le Chat anywhere on the page. [live]
- The official help article still describes three modes ("Vibe Chat … Still available") and its three documentation links all return the docs 404 page (`/vibe/overview`, `/vibe/code/overview`, `/studio-api/overview`). [live]
- Three renames since May 2026 (Le Chat → Vibe; Chat/Work/Code → Work/Code; Agents → Skills, Memories → Knowledge), plus La Plateforme → Studio. Both "Incognito mode" and "Temporary chat" strings are still shipped. [strings] [3p: search-result summaries from sondero.ai, chatsol.app and medux.io confirm the dates]
- One docs section has three names: "Inference & Models" (top bar), "Models & inference" (sidebar), "Models and inference" (breadcrumb). [live]
- French mixes "conversation", "discussion" and "Chats" for the same object and leaves Work, Code and Canvas in English. [strings]

---

## 8. Docs and marketing UX

### Docs homepage [live]

1. Title, one sentence, a large search box.
2. "Discover our platform: Three products, one platform. Pick where you want to start." Three cards (Vibe, Studio, Admin), each with a one-sentence definition and two or three links, plus "Compare our products".
3. "Latest models" (5 cards) and "View all models".
4. "Quickstarts: Self-contained walkthroughs grouped by product and role. Most take 15 minutes or less." Filter chips: All, Vibe for work, Vibe for code, Studio, Inference, Resources, Admin. Each card states its duration ("5 min to complete").

Readers are routed first by product, then by role, then by time available.

### A typical docs page [live]

- Breadcrumb, H1, one-sentence summary, time callout ("This step takes ~5 minutes to complete.").
- Fixed section order in quickstarts: "Before you begin" → numbered steps → "You should see" → "Next quickstarts" → "Going further" → Previous / Next.
- "Copy page" split button; its menu: "Copy page as Markdown for LLMs", "View as Markdown", "Open in Vibe: Ask questions about this page". Every page also exists as Markdown under `/llms/...`.
- Each heading has a "Copy section link".
- Code tabs (Python / TypeScript / curl) wrap prose and code together; the selected tab carries a link icon.
- No screenshots anywhere in the Vibe docs pages checked; the interface is described in words ("the black square").
- No "was this page helpful" control was seen.
- Release notes: filter chips (All, Deprecation, Improvement, Security, What's new), entries grouped by month with a product tag.

### Marketing homepage [live] (6,118 px tall at 1440)

| Section | Purpose | Calls to action |
|---|---|---|
| Hero: "Mistral is #1 in Sovereign AI." No sub-headline | Position | 1 small chip, "Vibe for desktop" |
| Logo strip | Proof | 0 |
| "Mistral lets you decide how AI works in your organization." Four layers: Frontier open models, Proprietary intelligence, AI operations, Flexible compute | Explain the offer as four layers | 4 anchors + 6 "Discover …" links (Research, Forge, Vibe, Studio, Inference, Compute) |
| "See Sovereign AI at work." | Customer stories | 1 |
| "Go deeper." | Further reading | links |

12 links in the page body; the header adds "Get in touch" and "Start building". The first screen speaks only to enterprise buyers; an individual who wants the assistant must open "Start building" or notice the chip.

Blog posts open with category, title, date, reading time, and a machine-written "Summary" before the article. [live]

### Pricing [live] https://mistral.ai/pricing/

- H1 "Pricing", currency switch (USD / EUR, with a country list).
- Four columns: Free, Pro (flagged "Popular"), Team, Enterprise. Each has a one-line audience statement, a price, 5 to 7 bullets and exactly one button: "Start Free", "Get Pro", "Get Team", "Contact Sales".
- "I'm a student" checkbox inside Pro changes the price in place.
- Comparison table in six groups (Interfaces; Features and tools; Coding features; Team and enterprise features; Usage and data; Customer service), with the four plan buttons repeated in its header: 8 plan buttons in total.
- FAQ, 9 questions.
- Limits are given as multiples ("Up to 6x free", "Up to 40x free"); the only absolute numbers are in the FAQ ("Flash answers: 200 / day on Team vs. 150 / day on Pro").
- "Start Free" points to `/chat`, which redirects to `/work`.

---

## 9. Principles Mistral states, and weak spots

### Stated principles

- "**At every step, you stay in control.** Vibe asks for approval before sensitive actions, shows every tool call, and lets you steer or stop at any point." https://docs.mistral.ai/vibe
- "Vibe used to split quick conversations (Chat) and multi-step agentic work (Work) into two tabs, so you had to pick a surface before you could start a task. … one place for every conversation, where the fast/think toggle sets how deep Vibe goes, not which tab you're in." https://docs.mistral.ai/vibe
- "one surface for everything, and no more guessing which tab a task belongs to." https://docs.mistral.ai/getting-started/platform-overview
- "Work is built for **delegation with supervision**. … Nothing important happens in a connected tool **without you signing off** on it." https://docs.mistral.ai/vibe/work/web/safety-and-approvals
- "Every step is visible as it happens, and each tool call and reasoning chain is expandable to its inputs and outputs." https://mistral.ai/news/vibe-agent/
- "It maps out a plan and gets your sign-off before it starts". https://mistral.ai/news/vibe-agent/
- "Treat Work outputs as drafts until you review them." https://docs.mistral.ai/vibe/work/web
- "When a connection breaks, you should be able to find out why." https://mistral.ai/news/more-control-over-connectors/
- Brand: model illustrations are "designed to shine at small scale. More than decorative accents, they function as a natural extension of our M symbol, forming a cohesive visual system." https://mistral.ai/brand/

No published design-principles page or design-team post was found.

### Weak or confusing

1. **A consent gate that buys nothing.** Terms must be accepted before a guest can type, and the first send goes to login anyway. [live]
2. **Silent walls.** "+", microphone and send each replace the page with the login screen. Only "+" warns, and only on hover. The "+" button's accessible name is "Open settings menu". [live]
3. **The login page has lost the context.** It says "Let's start building" whether the user came from the assistant, the console or admin; no product name, no reason, no way back. [live]
4. **Two buttons, one destination.** "Sign in" and "Sign up" open the identical screen. [live]
5. **Training consent on by default and three clicks deep**, behind a menu that contains a single item. [live]
6. **Docs top bar has no active state**; the breadcrumb is truncated to "GETTING S… · QUICKS… · STUDIO QUIC…". [live]
7. **Code tabs are not linked.** Choosing TypeScript in one block leaves the next on Python, and nothing is stored to remember the choice. [live]
8. **Docs search results have no section label** and contain same-titled duplicates. [live]
9. **Step numbering restarts mid-procedure** on the API-key quickstart (1, 2, then 1, 2, 3, then 1). [live]
10. **Code copy button exists only on hover** and has no accessible name. [live]
11. "⌘K" is shown on Linux in the docs; the help centre gets it right. [live]
12. The cookie notice appears a few seconds after load and covers the open search palette. [live]
13. Official help article with three dead links and an outdated mode list. [live]
14. The app's `<html>` element has an empty `lang` attribute in both English and French. [live]
15. Product page hero shows a disabled "Coming soon" button beside "Try Vibe now" with no explanation of what is coming. [live]
16. Delete-chat wording is indirect and omits permanence. [strings]

---

## Patterns worth copying

Format: **rule**. What Mistral does. Source.

1. **Start with one field and almost nothing else.** Ten controls on the first screen; one heading; the composer is focused on load and keeps receiving keystrokes after a click on empty space. [live] chat.mistral.ai/work
2. **Offer a choice of depth, not a list of models.** Two modes, each a name plus three words: "Fast: Get answers fast", "Think: Handle complex tasks". The button shows the current choice. [live]
3. **One door for all context and tools, three ways in.** "+" for the mouse, "/" for the list, "@" to mention; each selection returns to the composer as a removable pill. [docs] docs.mistral.ai/vibe/work/web/skills, [strings]
4. **Never lose what the user typed.** The prompt written before the login wall is stored and its id carried through the redirect; drafts are kept per chat. [live]
5. **Show one line of status, expandable to the full trace.** "Working · Searching web ⌄" → "Thought for 3s", "Ran 2 web searches" → query, source count, sources. [shot] App Store screenshots 3 and 4
6. **Give every operation a phrase for running, done, stopped and failed.** "Reading Knowledge" / "Read…" / "Stopped reading Knowledge" / "Failed to…". [strings]
7. **Ask for approval at the moment of risk, with scope in the button.** "Allow this time", "Always allow", "Decline", then a field to redirect the agent. Read-only actions may be pre-approved; writes stay manual. [docs] docs.mistral.ai/vibe/work/web/safety-and-approvals
8. **Describe a destructive action as a sentence about the user's things.** "Delete {name} on your Desktop, with 3 files inside". [strings]
9. **Say what survives.** "The share link stops working. Your original chat stays as it is."; "The chats inside aren't deleted." [strings] [docs]
10. **Prefer a reversible action plus a toast to a dialog; keep dialogs for real loss.** Archive → "The chat has been archived"; temporary chat → "If you exit this conversation, it will be lost", with "Convert to real chat" as a rescue. [strings]
11. **A limit message has four parts: what, the number, when it resets, one next step fitted to the user.** "quota reached ({quota} every {window}). Try again {relativeTime}."; guest → log in, free → upgrade, member → ask an admin. [strings]
12. **An error names the cause and offers the exit as a button.** "This chat has reached its length limit … Start a new chat to keep going."; "Retry", "Edit this message", error code shown. [strings]
13. **When an action is unavailable, the tooltip says why.** "Message cannot be regenerated during generation"; "Sharing is unavailable while the answer is generated"; "You reached the limit of pinned chats". [strings]
14. **Let the user keep typing while the system works.** Messages queue ("2 queued messages") with "Steer: Stop and send now". [strings]
15. **Teach shortcuts where the action is.** Key shown in the tooltip, one searchable palette (Mod+K), one cheat sheet (Mod+/) grouped by area, both key sets in the docs. [code] [strings] [docs]
16. **When you rename, walk existing users through it and map old to new.** Four-step walkthrough, coach marks at the new locations, a mapping table, the old name kept in page titles. [strings] [docs] docs.mistral.ai/vibe/choose-chat-work-code
17. **Route docs readers by product, then role, then time.** Three product cards, filter chips, "5 min to complete" on every card. [live] docs.mistral.ai
18. **Give task pages a fixed skeleton that ends in verification.** "Before you begin" → numbered steps → "You should see" → likely error → "Next". [live]
19. **Show where the reader is in three places at once.** Highlighted sidebar row, breadcrumb, scroll-following outline. [live]
20. **One button per plan; split audiences at the header.** "Start Free / Get Pro / Get Team / Contact Sales"; "Get in touch" versus "Start building". [live] mistral.ai/pricing

## Patterns to avoid

- A consent or terms gate placed before a feature the visitor still cannot use.
- Full-page redirects to login from controls that look enabled, with no in-place explanation and a generic login headline.
- Separate "Sign in" and "Sign up" buttons that open the same screen.
- Data-sharing consent switched on by default and buried behind an icon, a one-item menu and a dialog.
- Navigation tabs with no active state; breadcrumbs that truncate to unreadable stubs.
- Language tabs that do not follow the reader's choice across the page.
- Search results without a section label.
- Hover-only, unlabelled copy buttons.
- Renaming faster than the help content is updated; one thing with three names; migration articles with dead links.
- Limits published as multiples of an unstated base.
- Apologetic filler and transport-level wording in error messages.

## Not verified

- **A rendered conversation in the web app.** No message could be sent without an account. Streaming indicator, message action bar (hover or persistent), citation chips, canvas, todos panel and approval cards were not seen on the web; evidence is the iOS screenshots, docs and shipped strings.
- **Whether guest chatting is switched off for everyone** or only for this session (automated browser, region). Guest-allowance strings are still shipped.
- **Sidebar section order, row layout and what appears on hover** in the signed-in web app. Contents are from strings and docs; order is not.
- **Command palette and shortcut sheet rendering.** Bindings come from the shipped code; they did nothing for a guest.
- **Sign-up beyond the email field**: verification, password or code step, onboarding questions, the rename walkthrough as actually displayed.
- **Studio and Admin screens.** Navigation is inferred from docs only.
- **API-key creation** as experienced; the step list is from docs.
- **Upsell and limit moments in context**: which appear inline, as banners or as dialogs, and how often.
- **Android listing and mobile app behaviour**; only the six iOS store screenshots were viewed.
- **French marketing and docs pages** (only the app was loaded in French). Help centre offers English, French and Italian; not read in French.
- **Third-party UX analyses**: only search-result summaries were read, for dates; no independent usability study was found or read in full.
- **Docs on a narrow screen**, dark mode behaviour, and the API reference page layout.

