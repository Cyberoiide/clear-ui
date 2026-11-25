I built it: `index.html`, one file, opens straight from disk. It's a tracker I called Tally, for a freelancer juggling a handful of client projects.

**Design plan**

- **Colour.** Paper `#F2F4EF`, Sheet `#FFFFFF`, Ink `#17213B`, Graphite `#5C6478`, Rule `#D5D9D0`. Each project owns one colour (cobalt, brick, moss, plum, ochre), and those are the only accents.
- **Type.** One family, Archivo, used across its width axis: very condensed and heavy for the clock and headings, normal width for everything else.
- **Layout.** Left-aligned throughout, no cards.

```
Tally                                     Wednesday 25 November
+-------------------------------------------------------------+
| What are you working on?_______             1:15:25         |
| [Atlas] [Nordlys] [Hale] [Kiln] [Admin]     [Stop timer]    |
+-------------------------------------------------------------+
 08 ===####==|------------------------------------------- 18
 Today                    2h 47m | This week           15h 47m
 Checkout error states    1h 15m | Atlas Coffee  ########  7h
 Checkout page layout     1h 32m | Nordlys       ###       2h
```

- **Principle.** One loud thing: the timer band floods with the running project's colour, so you can tell from across the room whether the clock is on and for whom. Everything below stays quiet.

**What I changed after checking the plan against the brief**

My first pass was the usual tracker: white rounded cards, a purple accent and a monospace clock. That would fit any tracker, so I dropped the cards for two plain lists, let the projects supply the colour, and used a condensed clock face instead of mono.

**What it does**

- Pick a project, type what you're doing, **Start timer**. **Stop timer** files the entry under Today.
- **Start again** on any entry restarts the clock with the same project and description.
- The strip under the timer shows where today's hours fell, and grows live.
- This week totals hours per project, Monday to Sunday, including the running timer.
- Data is saved in the browser, so a running timer survives a reload. The tab title shows the elapsed time.

The first open is filled with a sample week so the screen isn't empty.

I checked it in headless Chromium at desktop and narrow widths, idle and running. I did not click through it by hand in a real browser.

Not built, because you didn't ask: editing or deleting entries, adding your own projects (the five are set in a list at the top of the script), rates and invoicing. An entry that runs past midnight counts for the day it started. Archivo loads from Google Fonts; offline it falls back to Helvetica or Arial.
