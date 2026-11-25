The main screen is built: `index.html`, one file, no build step. Open it straight from disk.

**What it does**

- **Timer:** pick a project, optionally say what you are working on, press **Start timer** (or Enter). The same button becomes **Stop timer**. The running time also shows in the browser tab title.
- **Today:** every entry of the day, newest first, with project, note, start and end time, duration and the day's total. Each entry can be deleted, with a 5-second **Undo**.
- **This week:** hours per project (Monday to Sunday) as horizontal bars, sorted from most to least, with the exact time written next to each bar and the week's total.
- **New project:** choose "New project…" in the project list and type a name.
- Everything is saved in the browser (`localStorage`). A running timer survives a reload or a closed tab.

**Design choices** (from the design-system search for a freelancer time-tracking tool)

- Style: flat design, with no shadows or gradients.
- Colours: teal for structure and focus, orange only for the Start button, red for Stop.
- Font: Plus Jakarta Sans, loaded from Google Fonts, with a system font as fallback when offline.
- Chart: horizontal bars with direct labels, so the project is never told by colour alone.
- Layout: one column on a phone, timer on top and two columns below from 1024px.

**Checked**

In headless Chromium at 1440px and 375px: start, stop, reload while running, delete, undo, the empty-name error for a new project, and no horizontal scroll on a phone. No console errors.

**Not included, and what to know**

- The first time you open it, it shows sample projects and entries for this week so the screen is not empty. Clearing browser storage brings the samples back, so tell me if you want it to start empty and I will remove them.
- No editing of a past entry, no manual entry, no renaming or deleting a project, no dark mode, no export.
- Data lives in this one browser only. There is no account or sync, and clearing browser data erases it.
- An entry that runs past midnight counts fully on the day it started.
- The search tool's "pattern" result was a landing-page layout, which does not fit an app screen, so I did not use it. The app layout follows the tool's general rules instead.
- Not tested with a real screen reader, nor in Firefox or Safari.
