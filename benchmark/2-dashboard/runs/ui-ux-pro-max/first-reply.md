I built the dashboard as a single `index.html` (inline CSS and JS, no build step, opens from `file://`, filled with sample data for November 2026).

**Design direction (from the ui-ux-pro-max database)**

- **Style: Data-Dense Dashboard**, light mode. The automatic design-system run suggested Glassmorphism with a landing-page layout ("Hero + Features + CTA"), which does not fit a dashboard, so I retried once with a product search. That matched "Analytics Dashboard" and its primary style, Data-Dense Dashboard, which is what I used.
- **Colours:** blue `#2563EB` for data, orange `#EA580C` only to mark the biggest drop-off, slate text on a near-white background. Green and red always come with an arrow and a sign, never colour alone.
- **Type:** Fira Sans for text, Fira Code for numbers (tabular figures).
- **Charts:** line chart for the revenue trend, a labelled stage list for the trial funnel, a sortable table for cancellations.

**What is on the page**

1. **Four key numbers:** MRR this month with the change against October, paying customers, share of trials that paid, and cancellations.
2. **Monthly recurring revenue:** 12-month line chart. Hover, tap or use the arrow keys to read each month; the same data is available as a table.
3. **What moved MRR:** new customers, upgrades, downgrades and cancellations, adding up to the net change.
4. **Where trials drop off:** five steps from "started a trial" to "paid first invoice", with the number lost between each step and the biggest drop highlighted.
5. **Customers who cancelled this month:** name, plan, MRR lost, how long they were a customer, date and reason. Sortable by any column, exportable as CSV. On a phone it becomes a list of cards.

**Not included:** navigation to other screens, dark mode, date-range or day/week switching, real data loading (so no loading or error states).

**Checked:** rendered in headless Chromium at 1440x900 and 390x844. **Not checked:** keyboard and screen-reader behaviour in a real browser, the CSV download, and the web fonts (the page falls back to system fonts offline).
