# ChatGPT UX teardown: structure, flows and behaviour

Researched 2026-11-25. Scope: how the product is organised and behaves, not how it looks.

**Evidence tags**

- **[LIVE]** observed by me on the logged-out chatgpt.com in a private headless Chromium (1440x900 desktop, plus a 390x844 narrow viewport). One question was sent ("Why is the sky blue?"). No login, no account.
- **[DOC]** read in official OpenAI text (Help Center, release notes, developers.openai.com).
- **[SHOT]** seen in an official screenshot (Help Center article image or App Store listing).
- **[3P]** third-party source, secondary evidence only.

**Caveats on the live session.** The session ran outside the US/EU, so regional variants may differ; UI language was English. Everything logged-in comes from docs and official screenshots, never from the live page.

---

## 1. Information architecture

### Logged-out first screen [LIVE]

The whole first screen is one question and one input.

| Region | Contents, in order |
|---|---|
| Sidebar (260 px, collapsible) | Wordmark + "Close sidebar" toggle; then 7 rows: **New chat, Images, Plugins, See plans and pricing, Help, Deep research, Settings**; at the bottom a card "Get responses tailored to you / Log in to get answers based on saved chats, plus create images and upload files." with one **Log in** button |
| Top right | **Log in** (filled), **Sign up for free** (outlined) |
| Centre | Heading "Where should we begin?"; composer (plus button, placeholder "Ask ChatGPT", dictation mic, voice button); one suggestion chip "What can I do here?" (on another load: "What can you do?") |
| Footer | One line: "ChatGPT is AI. By using it, you agree to our Terms & Privacy Policy. Chats may be reviewed and used to improve our AI models. Learn more" |

What it leaves out: no hero copy, no feature tour, no model picker, no chat history, no search, no onboarding carousel, no forced sign-up. The cookie banner sits at the bottom and does not block the composer. The composer has keyboard focus on load (`document.activeElement` was the textarea).

- Rows that leave the app ("See plans and pricing", "Help") carry an external-link glyph; rows that stay do not.
- "Deep research" is a button, not a link: for a guest it opens a small card anchored to the row ("Turn questions into research / Log in to run multi-step research, compare sources, and save cited reports to revisit later." + Log in / Sign up for free) instead of navigating.
- "Images" (`/images`) and "Plugins" (`/plugins`) are real browsable pages for guests: Images shows a second composer ("Describe a new image") above a grid of 16 named style presets with "Log in or sign up to see more"; Plugins is a searchable directory grouped by category (Popular, New & Noteworthy, Small Business, Productivity, Creativity...) with 6 entries per group and a "See X, Y, and more" row.
- Collapsing the sidebar leaves a 56 px icon rail with the same 7 destinations in the same order; the collapsed state persisted across page navigations in the session.

### Logged-in web [SHOT] [DOC]

- Sidebar order in a current Help Center screenshot (Library article): header with wordmark, **search icon**, collapse toggle; then **New chat, Images, Library, Plugins, Explore**; then a **Projects** section ("No projects" when empty; otherwise "New project" as the first row above the project list); then **Recents** as a flat list of chat titles. [SHOT `official-shots/hc-6.png`, `hc-8.png`]
- "Space" replaces Library for accounts that have it ("open Space in the sidebar. It replaces Library and is your new home for pages, slides, images, and uploaded files"). [DOC release notes]
- Pinned section holds both chats and projects; Recents can be one combined list or grouped by project. Recents shows up to eight recent conversations. A "Scheduled" page is "discoverable in the sidebar". [DOC release notes]
- Projects: name + icon + colour; hold chats, files, instructions; chats move in by drag-and-drop or the chat's menu > "Move to project". [DOC https://help.openai.com/en/articles/10169521-projects-in-chatgpt]
- Search is one entry point for everything: chats, projects, images, documents, connected Drive. Filters: All, Chats, Images, Documents, Projects. Archived chats stay searchable. [DOC https://help.openai.com/en/articles/10056348-finding-your-chats-projects-and-files-in-chatgpt]
- Settings for a logged-in user is a modal with a left tab list: **General, Notifications, Personalization, Connectors, Data controls, Security, Account**; sub-settings open as a second small dialog with a "Done" button. [SHOT `official-shots/hc-1.png`] Reached from the account menu. [DOC data controls article]
- Library has its own tabs: Suggested, Favorites, Folders, Images, All; a "New" button; grid/list toggle; in-page search. [SHOT]

### How the product shows where you are

- Guest: the URL changes from `/` to `/uc/<id>` about 1.8 s after sending; the page title does not change; the empty-state heading disappears and the composer moves from centre to bottom. [LIVE]
- Guest settings is a full page at `/settings` with a centred title "Settings" and a "Back to ChatGPT" arrow; the sidebar auto-collapses to the rail. [LIVE]
- Logged-in: the current destination row is highlighted in the sidebar (Library row filled in the screenshot). [SHOT]
- Mode is shown inside the composer, not in a header: enabling Web search adds a removable "Web search x" pill in the composer and changes the placeholder to "Search the web". [LIVE]
- Temporary chat confirms its state by "darkening the prompt window and adding a Temporary Chat banner": "Memory is disabled for this chat, and it won't appear in your history." [DOC+SHOT https://help.openai.com/en/articles/9295248-temporary-chats-on-the-chatgpt-macos-app]

---

## 2. Core flows, step by step

### 2.1 First conversation as a guest [LIVE]

Steps: **land -> type -> send**. Zero decisions, zero screens before the first answer.

Timeline measured from clicking send:

| t | What happened |
|---|---|
| 0.3 s | Composer cleared; send button became "Stop generating"; a live region announced "Thinking"; a single pulsing dot appeared where the answer will start |
| 0.8 s | User message shown as a right-aligned bubble with a Copy button under it; footer legal line replaced by "ChatGPT is AI and can make mistakes." |
| 1.8 s | URL became `/uc/<id>` |
| 3.7 s | First answer text streamed in |
| 3.7-7.3 s | Image slots appeared as grey placeholders of final size, then filled (no layout jump) |
| 7.0 s | "Copy response" and "Share" appeared under the answer (only once the answer finished) |
| 8.2 s | "Stop generating" reverted to "Send message" |
| 9.0 s | Live region announced "Response complete" |

- The view did not auto-scroll with the stream: the user message stayed pinned at the top and the answer grew downward; a "Scroll to bottom" button exists but stays invisible until needed. Release notes confirm this is deliberate: "Initiating a new conversation no longer auto scrolls to the bottom while the message is generating". [LIVE + DOC]
- The composer stays usable during streaming (plus, mic and text field remain; only send becomes stop).
- Reloading the page lost the conversation without warning and returned to `/`. Help Center: "Chats will remain accessible only for the current session on the same browser." [LIVE + DOC https://help.openai.com/en/articles/9125172-the-chatgpt-home-page]

### 2.2 New chat

- Guest: click "New chat" -> confirmation dialog **"Clear current chat?"** / "To start a new chat, your current conversation will be discarded. Sign up or log in to save chats." / buttons **Clear chat** and **Log in**. Escape cancels. 2 steps, 1 decision. [LIVE] "While logged out, you can only have one conversation at a time." [DOC]
- Logged-in: "Select New chat any time to start fresh." 1 step. [DOC https://help.openai.com/en/articles/12677804-what-is-chatgpt-faq]

### 2.3 Attaching a file

- Guest: plus -> "Add photos" -> OS picker (2 clicks). "Add files" is visible but greyed under a "Log in to use..." divider; clicking it opens the sign-up sheet. [LIVE]
- Logged-in: "select + in the prompt area, then Add photos & files". Saved files: plus -> "Add from library" (or "Recent files"). [DOC uploads + library articles]
- Automatic: "If you paste more than 10k characters into the composer, ChatGPT will automatically convert the content into an attachment". [DOC release notes]
- iOS: "The keyboard now opens automatically after you attach a file"; image previews show immediately after sending instead of a grey box. [DOC release notes]

### 2.4 Choosing a tool or a model

- Tool, guest: plus -> "Web search" (2 clicks). Result: a blue "Web search x" pill inside the composer, placeholder becomes "Search the web", composer grows to two rows. One click on the pill removes it (its accessible name is "Web search, click to remove"). [LIVE]
- Model, guest: no model control anywhere. "Logged-out users do not have access to GPT-5.6 Sol." [LIVE + DOC]
- Model, logged-in: "Model selection now appears in the composer, so you can find and switch models from the same place where you write your prompt." On iOS/Android "you can find the picker at the top of the conversation." Options are named by effort, not by model number: Instant, Medium, High, Extra High, Pro. [DOC release notes; https://help.openai.com/en/articles/20001354-gpt-6-and-other-models-in-chatgpt]
- Fallback models used after a rate limit "won't appear in the model picker". [DOC release notes]

### 2.5 Searching past chats [DOC]

Open Search from the sidebar (or Ctrl+K / Cmd+K on web) -> type -> optionally pick a filter -> select result. 3 steps. Guests have nothing to search on desktop.

### 2.6 Editing, regenerating, branching [DOC/SHOT/3P, not live]

- Regenerate is an icon in the row under each answer [SHOT limit-notice screenshot, App Store screenshot 2]; the Help Center calls it "Regenerate" and pairs it with "Stop generating" as the recovery path for a stuck answer.
- "You can now edit messages that include attachments, so you can revise your prompt without starting over." [DOC release notes]
- Branch: "Hover over a message, click More actions (...), and select Branch in new chat to start a separate conversation from that point." [DOC release notes]
- Guest has neither edit nor regenerate: only Copy on the user message, Copy response and Share on the answer. [LIVE]

### 2.7 Sharing

- Guest: Share (under the answer) -> dialog titled "Conversation" with a preview of what will be shared and four targets: Copy link, X, LinkedIn, Reddit. 2 clicks. Works without an account. [LIVE]
- Logged-in: Share -> review -> Create link / Copy link. A personal link is a snapshot ("Messages added later are not included automatically"); "Update link" refreshes it. Links are managed at Settings > Data controls > Shared links. "Sharing a conversation is now faster, with a one-click flow that no longer opens a separate pop-up." [DOC https://help.openai.com/en/articles/7925741-sharing-conversations-and-scheduled-tasks-in-chatgpt + release notes]
- Mobile uses the OS share sheet. [DOC]

### 2.8 Sign-up and login [LIVE, stopped before any account creation]

1. "Log in" and "Sign up for free" open the **same** sheet, titled "Log in or sign up" / "You'll get smarter responses and can upload files, images, and more." The user never has to know whether they already have an account.
2. Options, in order: Continue with Google, Continue with Apple, Continue with phone, OR, Email address + Continue. One field on screen.
3. Bad email: inline "Email is not valid." under the field on submit (role=alert); the sheet stays open and the typed value is kept.
4. Valid email -> redirect to `auth.openai.com/log-in/password`, titled "Enter your password": email shown read-only with an "Edit" link, password field with show/hide, "Forgot password?", Continue, "Don't have an account? Sign up", OR, "Log in with a one-time code".
5. "Sign up" -> `auth.openai.com/create-account`, "Create an account": Google, Apple, Microsoft, phone, OR, email, "Already have an account? Log in".

Count to reach the password step: 3 actions (open sheet, type email, Continue). Every auth screen has exactly one primary button, labelled "Continue". After signing up, "the thread to your latest conversation will appear in the sidebar". [DOC]

### 2.9 Upgrading

- Guest: sidebar "See plans and pricing" -> external pricing page: tabs Individual / Business & Enterprise; four cards Free, Go, Plus, Pro, each with one button "Get Free / Get Go / Get Plus / Get Pro" and a list that starts "Everything in Go and:"; a full comparison table sits below, not in the cards. [LIVE]
- Logged-in web: "open your profile menu, and select Upgrade plan". The "Upgrade your plan" screen shows the current plan as a disabled "Your current plan" button. [DOC+SHOT https://help.openai.com/en/articles/7905739-chatgpt-ios-app-upgrading-to-a-paid-subscription]
- In context: a limit notice carries its own "Get Plus" button (section 5). iOS shows a "Get Plus" pill at the top centre of the chat screen. [SHOT]

---

## 3. Interaction model

### The composer is the single entry point [LIVE]

- Inside it: plus button (left), text field, dictation mic, and one right-most slot that changes role: **voice** when empty, **send** when there is text, **stop** while generating. One slot, three states, always in the same place.
- Behind the plus menu (guest): Add photos, Web search, then a divider labelled "Log in to use..." with Create image, Deep research, Add files greyed. Locked items stay visible and named; clicking one opens the sign-up sheet rather than doing nothing.
- Selected tools become removable pills inside the composer and rewrite the placeholder.
- The composer grows with content (one row to several) and moves from centre (empty state) to bottom (conversation) without changing its controls.
- Docs for logged-in: plus is "the tools menu (+)" and is also where apps are chosen; "/Search" slash shortcut and @mentions for files exist. [DOC]
- In this session pressing Enter inserted a newline and only the send button sent (the field has `enterkeyhint="enter"`). I could not tell whether that is the guest default or a side effect of the headless browser; see Not verified.
- An unsent draft was still in the composer after a page reload. [LIVE]

### Suggested prompts [LIVE]

Exactly one chip under the composer on the empty screen ("What can I do here?" / "What can you do?"). It disappears once a conversation starts. The Images page uses a grid of named presets instead.

### Streaming and stop [LIVE + DOC]

Covered in 2.1. Stop is the send button itself, so the user's pointer is already there. Official recovery sequence for a hung answer: "Click 'Stop generating,' then click 'Regenerate' to retry". Long-running research can be redirected mid-run: "you can simply add that information midstream by clicking 'update' in the sidebar". [DOC]

### Message-level actions

- Guest: user message = Copy; answer = Copy response, Share. They are **always visible** (opacity 1 without hover), each with a tooltip naming it. [LIVE]
- Copy feedback: the button's own label changes to "Response copied" and a live region announces it; no toast. [LIVE]
- Logged-in mobile: six icons under every answer, always visible: copy, read aloud, thumbs up, thumbs down, regenerate, share. [SHOT App Store screenshot 2]
- Less-used actions are behind hover + "More actions (...)": Branch in new chat, "Add to project sources". [DOC]
- NN/g on the same row: it "featured a nice set of followup actions" but "these icons were unlabeled, and they were not all standard". [3P https://www.nngroup.com/articles/prompt-controls-genai/, 2024]

### Keyboard shortcuts

- Official: "Work faster with shortcuts, like Cmd (Ctrl) + Shift + ; to copy last code block. Try Cmd (Ctrl) + / to see the complete list." and "press Ctrl+K on Windows or Cmd+K on macOS to open Search". The list is surfaced by a shortcut that opens the list, not by a permanent on-screen legend. [DOC release notes; finding-your-chats article]
- As a guest Ctrl+/ did nothing and the page contains no shortcut dialog. [LIVE]
- Third-party list (2023, may be stale): new chat Ctrl+Shift+O, focus input Shift+Esc, copy last response Ctrl+Shift+C, custom instructions Ctrl+Shift+I, toggle sidebar Ctrl+Shift+S, delete chat Ctrl+Shift+Backspace. [3P https://www.hongkiat.com/blog/chatgpt-keyboard-shortcuts/]
- Desktop apps add a global launcher: Option+Space (macOS "Chat Bar"), Alt+Space (Windows "companion window"), both rebindable in Settings. [DOC]

### Temporary chat [DOC]

"Open a new chat. Select Temporary. Choose Personalized or Unpersonalized before you send your first message." The choice is locked once the conversation starts. A temporary chat can be saved later, which converts it to a regular chat. https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt

### Settings

- Guest: one page, two groups, six controls. General (Appearance: System/Dark/Light; Language: Auto-detect + list) and Data controls (four toggles, each with a one-sentence consequence underneath). No Save button anywhere. [LIVE]
- Logged-in: modal, 7 tabs, detail dialogs with "Done" (section 1). Destructive rows are visually separated: "Archive all" neutral, "Delete all" in red. [SHOT]
- Settings changes "are applied immediately across all chats". [DOC custom instructions article]

### Progressive disclosure

- Model picker shows effort names first; "click Configure" for advanced options such as auto-switching. [DOC release notes]
- Pricing cards show a short list; the full comparison table is below the fold. [LIVE]
- Plugin directory shows 6 per category, then "See X, Y, and more". [LIVE]
- Apps SDK inline card: "Show more: Use to disclose additional items"; "Expand: Use to open a fullscreen display mode". [DOC]

---

## 4. Density and prioritisation

Counts from the live page at 1440x900 unless tagged otherwise.

| Surface | Visible actions | Only on hover / in a menu |
|---|---|---|
| Empty screen, main area | 5: plus, text field, mic, voice, 1 chip | 5 tools behind plus |
| Empty screen, whole page | 20 interactive elements including 3 legal links (7 sidebar rows, toggle, logo, 3 log-in/sign-up buttons) | tooltips on icon buttons |
| Conversation, main area | composer (4) + per-message actions | "Scroll to bottom" appears only when off-screen |
| Per user message (guest) | 1: Copy | none |
| Per answer (guest) | 2: Copy response, Share | none |
| Per answer (logged-in mobile) [SHOT] | 6 icons | Branch, Add to project sources under "..." [DOC] |
| Sidebar row (guest) | 1 target: the row itself (icon + label) | none |
| Sidebar chat row (logged-in) [DOC] | title only | "more options menu (...)": Delete, Archive, Move to project, Share; drag to a project |
| Auth sheet | 3 provider buttons, 1 field, 1 primary button | none |
| Guest settings | 6 controls | language list inside a select |

Other observations:

- Every icon-only control measured 44x44 px hit area; sidebar rows are 36 px tall on desktop and 44 px in the narrow-viewport drawer. [LIVE]
- One filled (primary) button per view: Log in in the header, Continue in auth, Accept all in the cookie banner. Secondary choices are outlined or text.
- Message actions appear only after the answer completes, so nothing actionable sits under half-written text.

---

## 5. States

| State | What ChatGPT does | Source |
|---|---|---|
| Empty | A question as heading ("Where should we begin?"), focused composer, one suggestion chip | LIVE |
| Empty list | "No projects" in the Projects section rather than hiding the section | SHOT |
| Thinking | Single pulsing dot at the answer position; live region "Thinking"; send becomes stop within 0.3 s | LIVE |
| Streaming | Text appears in place; media reserved as placeholders; no forced scroll | LIVE |
| Done | Actions appear; stop reverts to send; live region "Response complete" | LIVE |
| Fullscreen app thinking | "The composer input 'shimmers' to show that a response is streaming"; the reply appears as "an ephemeral, truncated snippet ... above the composer" | DOC ui-guidelines |
| Network failure | Sending while offline produced, within 0.6 s, a card "Chat stopped unexpectedly" + **Retry** at the top of the thread and a second "Chat stopped unexpectedly Retry" line inside the composer. **The typed text stayed in the composer.** It did not auto-retry when the connection returned | LIVE |
| Generation error | "There was an error generating a response." -> "May be a one-time error, click 'Regenerate' button." Generic: "Something went wrong." | DOC https://help.openai.com/en/articles/7996703-troubleshooting-chatgpt-error-messages |
| Form error | "Email is not valid." inline under the field, on submit, value kept | LIVE |
| Tool limit | Banner above the composer: "You've reached your image creation limit." / "Upgrade to ChatGPT Plus or try again tomorrow after 9:17 AM." + **Get Plus** + dismiss x. States the fact, the exact reset time, and the two ways out | SHOT `official-shots/hc-3.png` |
| Chat full (Free) | "Context window full" / "Chat memory full"; offers to start a new chat with a summary, or an upgrade to continue; old chat stays readable | DOC https://help.openai.com/en/articles/20001639 |
| Rate limits | "ChatGPT will notify you when you reach an applicable limit"; "shows the reset timing in-product"; silent fallback to a smaller model for text chat | DOC free-tier FAQ, release notes |
| Locked feature (guest) | Greyed item under "Log in to use..."; click opens sign-up sheet. Sidebar "Deep research" opens an anchored explain-and-log-in card | LIVE |
| Destructive: discard guest chat | "Clear current chat?" names the consequence and offers the non-destructive alternative (Log in) beside the destructive one | LIVE |
| Destructive: delete chat | "Select Delete. Confirm the deletion." versus archive: "No confirmation is required." Bulk: "Review the confirmation message, then continue." "The Delete all chats action cannot be undone." | DOC https://help.openai.com/en/articles/8809935-deleting-and-archiving-chats-in-chatgpt |
| Destructive: files | Deleted files go to Trash with Restore / "Delete forever" / "Empty trash", each confirmed | DOC uploads article |
| Dictation failure | "ChatGPT automatically retries once, helping you finish recording without starting over" | DOC release notes |
| Silent data loss | Reloading a guest chat discards it with no warning (the only unprotected loss found) | LIVE |

---

## 6. Defaults and reduction of decisions

- **Model is chosen for the user.** Guests get no picker at all; Free/Go get one default; paid users choose an effort level (Instant to Pro), not a model name. [LIVE + DOC]
- **Layout is chosen.** Sidebar open on desktop, drawer on narrow screens; composer centred when empty, bottom when in a chat. Appearance defaults to "System", language to "Auto-detect". [LIVE]
- **Focus is placed.** The composer is focused on load, so typing works with no click. [LIVE]
- **What a guest can do with no account:** chat (one conversation at a time), web search, attach photos, dictate, copy, share a link, browse Images presets and the plugin directory, change appearance, language and the training opt-out. [LIVE + DOC]
- **What needs an account:** saving history, file upload, image creation, deep research, a second conversation. [LIVE]
- **When sign-in is asked for:** never before the first answer. It is offered passively in three fixed places (header buttons, sidebar card, plus-menu divider) and actively only at the moment the user reaches for a gated feature or is about to lose something ("Clear current chat?"). [LIVE] Regional exception: "some users may be asked to log in or sign up before sending a message." [DOC]
- **Log in and sign up are one decision**, resolved by the system after the email is typed. [LIVE]
- **Opt-outs default to on but are reachable by guests**: "Improve the model for everyone" is on by default and can be switched off without an account; "This setting is saved in your browser." [LIVE + DOC]
- **Safe action needs no confirmation, destructive one does**: archive is instant, delete confirms. [DOC]
- Third-party note on the same pattern: "Typing needs no account, and login prompts do not block the composer", with the criticism that the three log-in pitches list different benefits. [3P https://typenorm.com/articles/chatgpt-ux-teardown, captured 2026-09-28; that capture also reports a "ChatGPT" dropdown in the header that was not present in my session]

---

## 7. Words

All quoted exactly as seen.

| Where | Copy | Source |
|---|---|---|
| Empty-state heading | "Where should we begin?" | LIVE |
| Composer placeholder | "Ask ChatGPT"; with web search on: "Search the web"; Images page: "Describe a new image"; older build: "Message ChatGPT" | LIVE; SHOT |
| Suggestion chip | "What can I do here?" / "What can you do?" | LIVE |
| Plus button name | "Add files and more" | LIVE |
| Plus menu | "Add photos", "Web search", "Log in to use...", "Create image", "Deep research", "Add files" | LIVE |
| Composer buttons | "Start dictation", "Start Voice", "Send message", "Stop generating" | LIVE |
| Tool pill | "Web search, click to remove" | LIVE |
| Status announcements | "Thinking", "Response complete", "Response copied" | LIVE |
| Message actions | "Copy", "Copy response", "Share" | LIVE |
| Under the thread | "ChatGPT is AI and can make mistakes." (older: "ChatGPT can make mistakes. Check important info.") | LIVE; SHOT |
| Sidebar log-in card | "Get responses tailored to you" / "Log in to get answers based on saved chats, plus create images and upload files." | LIVE |
| Header | "Log in", "Sign up for free" | LIVE |
| Auth sheet | "Log in or sign up" / "You'll get smarter responses and can upload files, images, and more." / "Continue with Google" / "Continue" | LIVE |
| Auth pages | "Enter your password", "Forgot password?", "Log in with a one-time code", "Don't have an account? Sign up", "Create an account", "Already have an account? Log in" | LIVE |
| Validation | "Email is not valid." | LIVE |
| Destructive confirm | "Clear current chat?" / "To start a new chat, your current conversation will be discarded. Sign up or log in to save chats." / "Clear chat" | LIVE |
| Gated feature card | "Turn questions into research" / "Log in to run multi-step research, compare sources, and save cited reports to revisit later." | LIVE |
| Network error | "Chat stopped unexpectedly" / "Retry" | LIVE |
| Limit | "You've reached your image creation limit." / "Upgrade to ChatGPT Plus or try again tomorrow after 9:17 AM." / "Get Plus" | SHOT |
| Settings toggle | "Improve the model for everyone" / "Allow your content to be used to train our models, which makes ChatGPT better for you and everyone who uses it. We take steps to protect your privacy. Learn more" | LIVE |
| Temporary chat banner | "Temporary Chat" / "Memory is disabled for this chat, and it won't appear in your history." | SHOT |
| Pricing | "Get Free", "Get Go", "Get Plus", "Get Pro"; "Everything in Go and:"; "Your current plan" | LIVE; SHOT |
| Share dialog | title "Conversation"; "Copy link" | LIVE |
| Cookie banner | "We use cookies" / "Reject non-essential" / "Accept all" | LIVE |

Patterns in the wording:

- Buttons are verb + object and say what happens: "Clear chat", "Copy response", "Stop generating", "Add photos". The one generic label is "Continue", used only for moving forward in auth.
- Features are named by what the user gets, in plain words: Web search, Deep research, Create image, Temporary chat, Library, Projects, Search. Effort levels replace model numbers: Instant, Medium, High.
- Errors and limits are short, blame nobody, and end in an action. Limits state the exact time they lift.
- Gating copy names the benefit, not the restriction ("Log in to run multi-step research...").
- The confirmation dialog title is the question; the body is the consequence; the button repeats the verb from the title.
- Sentence case throughout; no exclamation marks in system copy.

---

## 8. OpenAI's stated UX principles

Primary source: **UI guidelines**, https://developers.openai.com/plugins/concepts/ui-guidelines (fetched 2026-11-25; the Apps SDK docs now live under `/plugins/`). [DOC]

### Use UI only when it helps

- "Use cards, carousels, fullscreen views, and other display modes only when visual interaction improves the workflow."
- "Add UI to the MCP server only when visual interaction materially improves part of the workflow." (https://developers.openai.com/plugins/plan/use-case)
- "Using these consistently helps experiences stay basic and predictable."

### Inline card

- When: "A single action or decision (for example, confirm a booking)"; "Small amounts of structured data (for example, a map, order summary, or quick status)"; "A fully self-contained widget or tool".
- "Limit primary actions per card: Support up to two actions maximum, with one primary CTA and one optional secondary CTA."
- "No deep navigation or multiple views within a card. Cards should not contain multiple drill-ins, tabs, or deeper navigation."
- "No nested scrolling. Cards should auto fit their content and prevent internal scrolling."
- "No duplicate inputs. Don't replicate ChatGPT features in a card."
- "States: Edits made are persisted."
- Follow-up text after a widget should "suggest edits, next steps, or related actions. Avoid content that is redundant with the card."

### Inline carousel

- When: "Presenting a small list of similar items"; "Items have more visual content and metadata than will fit in basic rows."
- "Keep to 3-8 items per carousel for readability."
- "Reduce metadata to the most relevant details, with three lines max."
- "Each card may have a single, optional CTA (for example, 'Book' or 'Play')."

### Fullscreen

- When: "Rich tasks that cannot be reduced to a single card"; "Browsing detailed content".
- "The ChatGPT composer remains overlaid, allowing users to continue 'talking to the app'".
- "Design your UX to work with the system composer. The composer is always present in fullscreen".
- "System close: Closes the sheet or view." (the exit is the system's, always in the same place).

### Picture-in-picture

- When: "Activities that run in parallel with conversation, such as a game, live collaboration, quiz, or learning session."
- "Close PiP automatically when the session ends."
- "Do not overload PiP with controls or static content better suited for inline or fullscreen."

### Conversational flow and what not to build

From "What makes a great ChatGPT app", https://developers.openai.com/blog/what-makes-a-great-chatgpt-app [DOC]:

- "the best apps look surprisingly small from the outside. They don't try to recreate the entire product."
- "You don't need to port every feature. You don't need a full navigation hierarchy."
- "You start asking 'What can we help with here?' instead of 'Where should the user go next?'"
- Vague intent: "Ask one or two clarifying questions at most, if needed. Produce something concrete quickly". "If they have to answer five questions before seeing anything useful, many will simply stop."
- Specific intent: "the app shouldn't ask the user to repeat themselves"; refinements "should feel like optional tuning, not required setup."
- Cold start: "Explain your app's role in one line", "Deliver useful output right away", "Offer a clear next step".
- "Avoid long, tunnel-like flows. Do your part of the job and hand control back to the conversation."
- Value test: does it let the user **know**, **do** or **show** something new? "If an app doesn't clearly move the needle on at least one of know/do/show, it tends to feel like it's not adding value".
- "If you struggle to summarize what the app does in one sentence, the model too will have a harder time understanding it."

From **Plugin guidelines**, https://developers.openai.com/plugins/plugin-guidelines [DOC]:

- "Errors, including unexpected ones, must be handled with clear messaging or fallback behaviors."
- "Side effects should never be hidden or implicit."
- "Tools should be safe to retry where possible, or explicitly indicate when retries may cause repeated effects."
- Not allowed: "static frames with no meaningful interaction", "Trial or demo plugins", advertising, upsell or checkout flows inside the UI ("Plugins must not display subscription plans, initiate new subscriptions, or promote upgrades").
- A plugin may "Explain that a certain feature is not available with the user's current plan", but not "Link directly to a checkout".
- "Provide experiences that directly address the user's request. Do not insert unrelated content, attempt to redirect the interaction".
- "If your MCP server requires authentication, the flow must be transparent and explicit."
- Coverage: "A plugin should not imply broad capability while supporting only a narrow slice of the expected workflow"; it should "explain what it cannot do and offer a useful next step." (use-case page)

Other official product statements [DOC]:

- Mobile sidebar: "To give you more space to view your most critical chats and projects, the sidebar menu is now simplified". (release notes, 2026-03-26)
- Logged-out mobile web: "Logged-out users now see a composer in the middle of the screen to avoid being blocked by popups."
- Model picker: "We've simplified the model picker to make it easier to choose the right level of reasoning."
- Intelligent UI: "when a simple text answer is the most useful response, ChatGPT can give you that." https://help.openai.com/en/articles/20001598-intelligent-ui-in-chatgpt

The separate "UX principles" page that used to sit at `/apps-sdk/concepts/ux-principles` now redirects to the use-case planning page; its original text could not be retrieved (see Not verified).

---

## 9. Mobile choices

- **Narrow-viewport web, guest** [LIVE]: header shrinks to a menu button and "Log in" (Sign up is dropped); composer stays centred. The drawer puts a search button at the top, the destinations in the middle, and moves the two most-used actions to the bottom edge: a filled "Chat" (new chat) button bottom-left and Settings bottom-right. Rows grow from 36 to 44 px. Tapping outside closes the drawer (the scrim is a full-screen "Close sidebar" button).
- **Native app chat screen** [SHOT App Store screenshots 1-2]: top bar has only a menu button on the left and new-chat + "..." on the right; no title. Composer at the bottom: plus, "Ask ChatGPT", mic, voice. Same control order as the web.
- **Voice runs inside the same thread** [SHOT + DOC]: the transcript continues as normal messages; the composer's right side becomes mute and an x to end; "Live can accept text and images in the same chat as your Voice conversation."
- **Model picker placement differs by platform** [DOC]: top of conversation on iOS/Android, inside the composer on web. In the new mobile experience: "Select the message box, then select the model name shown inside it."
- **Classic navigation** [DOC]: one sidebar behind "the menu icon (two horizontal lines)"; recents newest first; profile icon in the sidebar opens Settings; features "appear in a horizontal bar above your chats and projects". https://help.openai.com/en/articles/8142208
- **New experience (rolling out, 2026-11-19)** [DOC]: a bottom tab bar with Home and Explore; "you can pin favorites like Codex, Projects, and Images to the tab bar" by touch-and-hold > "Pin to tab bar"; "If the bar is full, choose a shortcut to replace." A Settings switch "New ChatGPT design" lets users go back. https://help.openai.com/en/articles/20001723
- **Gestures** [DOC + 3P]: press and hold a chat title in history > Delete; long-press on a message opens a contextual menu (Select Text, copy, edit) without overriding the standard gesture (NN/g).
- **Feedback** [DOC]: haptic feedback, on by default with a toggle; "Connected keyboards keep the composer focused".
- **Upgrade** [SHOT + DOC]: "Get Plus" pill at the top centre of the chat; also Settings > Upgrade. Purchases go through the store; "Restore purchases" in Settings.
- **Store positioning** [DOC store listings]: subtitle "Your everyday AI assistant" (iOS); "This official app is free, syncs your history across devices"; feature bullets are tasks, not technology ("Snap or upload a picture to transcribe a handwritten recipe"). Screenshot captions are verbs: "Create new worlds", "Talk it out anytime".

---

## Patterns worth copying

1. **Let people do the core task before asking for anything.** Guest lands on a focused composer; first answer needs 2 actions and 0 decisions; sign-up is never a gate. [LIVE; DOC home-page article]
2. **One entry point; everything else attaches to it.** Tools, files, model, voice and stop all live in or on the composer. OpenAI moved the model picker into it "so you can find and switch models from the same place where you write your prompt". [LIVE; DOC release notes]
3. **One slot, one job at a time.** The right-most composer button is voice when empty, send when there is text, stop while generating. The control the user needs next is always under the pointer. [LIVE]
4. **Show the current mode as a removable chip where the user is typing, and reword the placeholder to match.** "Web search x" pill + "Search the web". [LIVE]
5. **Acknowledge within 300 ms, in three ways at once.** Input clears, button becomes stop, a "Thinking" indicator appears at the exact spot the result will fill. Announce start, completion and copy to assistive tech ("Thinking", "Response complete", "Response copied"). [LIVE]
6. **Never move the page under the reader.** No auto-scroll during streaming; media reserved at final size; an on-demand "Scroll to bottom". [LIVE; DOC release notes]
7. **Show actions only when they can work, and keep the common ones always visible.** Copy/Share appear after the answer completes and need no hover; rare actions (Branch) go behind "More actions (...)". [LIVE; SHOT; DOC]
8. **Cap actions per unit.** Two per card ("one primary CTA and one optional secondary CTA"), one per carousel item, 3-8 items per carousel, one filled button per view. [DOC ui-guidelines; LIVE]
9. **Keep locked features visible, labelled and grouped, and make the click explain.** "Log in to use..." divider; clicking opens the sign-up sheet or an anchored card that names the benefit. Never a dead control. [LIVE]
10. **Confirm only what destroys; say the consequence; offer the way to keep it.** "Clear current chat?" + "will be discarded" + Clear chat / Log in. Archive: "No confirmation is required." Delete: confirm. [LIVE; DOC]
11. **On failure, keep the user's input and put Retry next to it.** Offline send left the draft in the composer and showed "Chat stopped unexpectedly / Retry" both in the thread and in the composer. [LIVE]
12. **A limit message states what, until when, and the two ways out.** "You've reached your image creation limit. Upgrade to ChatGPT Plus or try again tomorrow after 9:17 AM." + one button + dismiss. [SHOT]
13. **Merge decisions the system can make.** "Log in or sign up" is one sheet; the server decides after the email. Model choice is hidden for guests and reduced to effort names for everyone else. [LIVE; DOC]
14. **One field and one primary button per auth step; keep what was typed.** Email, then password on its own screen with the email shown and an "Edit" link; inline error keeps the value. [LIVE]
15. **Settings apply immediately, and each toggle carries one sentence of consequence.** No Save button; destructive rows separated and coloured. Guests see only the 6 settings that apply to them. [LIVE; SHOT; DOC]
16. **One search for everything, with a shortcut and type filters.** Sidebar Search or Ctrl/Cmd+K across chats, projects, images, documents; archived items stay findable. [DOC]
17. **Name things by outcome and label buttons verb + object.** Web search, Deep research, Temporary chat; "Clear chat", "Copy response", "Stop generating"; effort levels "Instant / Medium / High" instead of model numbers. [LIVE; DOC]
18. **Keep empty sections and say they are empty.** "No projects" under the Projects heading; empty chat = a question plus one suggestion. [SHOT; LIVE]
19. **Keep the main input present in every mode.** Fullscreen apps keep the composer overlaid; voice keeps the plus and text field; "No duplicate inputs". [DOC; SHOT]
20. **On small screens, move the top actions to the thumb and enlarge rows.** Drawer puts New chat and Settings at the bottom edge, rows 44 px; tab bar is user-pinnable with a replace-when-full rule. [LIVE; DOC]

---

## Not verified

- **Anything logged-in on the live site.** Sidebar order, settings tabs, model picker, message action row, chat-row menu, upgrade screen and limit banner come from Help Center text and official screenshots, some of which the Help Center itself labels as earlier layouts.
- **Enter to send.** In my headless session Enter inserted a newline and only the send button submitted. I could not confirm whether real desktop users get Enter-to-send on the guest page.
- **Stop mid-stream.** The stop control was seen but not clicked (only one question was sent); what remains of a partial answer is unknown.
- **The suggestion chip.** Not clicked (it would have sent a second message); whether it sends immediately or fills the composer is unknown.
- **Copy link.** Not clicked, to avoid creating a public link; the confirmation it shows is unknown.
- **Guest rate limit and guest upsell after several messages.** Not triggered.
- **Keyboard shortcut dialog.** Ctrl+/ did nothing for a guest. The official mention is a 2023 release note; the full list is third-party from 2023.
- **Delete-chat confirmation wording, rename/pin flow, profile menu items.** Docs describe the steps but not the dialog copy.
- **Edit-message flow details** (inline editor, version arrows) and the exact label of regenerate ("Regenerate" vs "Try again").
- **The retired Apps SDK "UX principles" page.** The URL now redirects to the use-case page; the Wayback Machine returned HTTP 429 and the one mirror found no longer resolves. Section 8 uses the current UI guidelines, plugin guidelines and the "great ChatGPT app" post instead.
- **Native mobile app behaviour.** From store screenshots and Help Center text only; nothing was run on a device. The narrow-viewport web observations are responsive web, not the app.
- **Header model dropdown for guests.** A third-party capture from 2026-09-28 reports one; it was absent on 2026-11-25. Possibly an A/B test or a removed feature.
- **Regional variation.** My session was routed through a non-US/EU exit; the Help Center says some regions must log in before sending.
- **Third-party teardowns of the logged-in UI** found were either out of date or text-only and were not relied on.
