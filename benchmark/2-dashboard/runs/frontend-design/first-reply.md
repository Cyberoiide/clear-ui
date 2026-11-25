I built the dashboard as one file, `index.html`. It opens straight from disk and fills itself with sample data. Here is the plan I worked from, what I changed after checking it against your brief, and what is on the screen.

## Who it is for

A founder of a small SaaS, checking in on the month. The page has one job: answer your three questions in the order you asked them, in sentences you could read aloud. The sample company is Loomwork, a booking tool for fitness studios, so the trial steps and customer names are concrete. The app itself is called Keel in the sample.

## Design plan

**Colour**

| Name | Hex | Used for |
|---|---|---|
| Spruce | `#10332C` | The revenue band, all text and bars on the light area |
| Chalk | `#F1F4EE` | Page background |
| Mint | `#9BE0BF` | Revenue gained |
| Rose | `#F4A3B8` | Revenue lost, on the dark band |
| Berry | `#A3214C` | Revenue lost, as text on the light area |
| Marigold | `#F5C542` | The answer: net change, and the worst trial step |

**Type.** One family, Bricolage Grotesque. It is narrowed and heavy for the headline and section headings, and at normal width for everything else. Sizes: 13, 14, 16, 22, 30, then up to 62 for the headline.

**Layout.** Left aligned throughout. Each section has a narrow column for the heading and a one-paragraph answer, and a wide column for the evidence.

```
+--------------------------------------------------------------+
| Keel  Overview Customers Trials Settings      Loomwork, Nov  |
|                                                              |
| Recurring revenue is       [new] [upg]                       |
| $48,210 a month, $2,340          [dwn] [cancel]   [net]      |
| more than October.         ---------------------------------  |
+--------------------------------------------------------------+
| Where trials stop    Started a trial     ################ 412 |
| 103 of 412 paid...   Set up their studio ###########///// 301 |
|                        137 stopped here                       |
+--------------------------------------------------------------+
| Who cancelled        Customer   Plan  Was paying  Reason      |
| 9 left, $1,680...    Harbor...  Team  -$390       Switched    |
+--------------------------------------------------------------+
```

**Principles**

1. Every section opens with the answer as a sentence, then shows the evidence.
2. Revenue is shown as a bridge from October to November, because "how it changed" is four movements, and a single percentage hides them.
3. Marigold appears twice, both times on the thing you should look at first.

## What I changed after reviewing the plan

- **Dropped the big number with a small label and a percentage chip.** That is what every analytics page does. The headline is now a sentence, and the bridge beside it carries the detail.
- **Dropped the row of identical rounded cards.** The three questions are different shapes: a bridge, a funnel, a list. Each gets its own form, with no card boxes or shadows.
- **Dropped a monospace face for figures and capitalised labels.** Numbers sit in the same family with fixed-width digits, and labels are sentence case.
- **Dropped the 12-month trend line.** You asked about this month. It is easy to add.

## What is on the screen

- **Recurring revenue.** $48,210 a month, $2,340 more than October. Five bars: new customers, upgrades, downgrades, cancellations, net change. Each bar starts where the previous one ended. The bars grow in once on load, and stay still if your system asks for reduced motion.
- **Where trials stop.** Five steps from "started a trial" to "paid the first invoice", for trials that started in October. Between each pair of steps it says how many stopped. The worst step is marked: 137 trials set up their studio but never published a booking page.
- **Who cancelled.** Nine customers with plan, what they were paying, how long they had been a customer, the date, and the reason they gave. You can order it by largest first or most recent first. The summary separates the two whose card failed from those who chose to leave.

On a phone the bridge turns on its side and the table becomes a stacked list.

## What I did not do

- The Customers, Trials and Settings links and the month in the header are placeholders. They go nowhere.
- The font loads from Google Fonts. Offline, the page falls back to a system font.
- All data is sample data written into the file. Tell me where your real numbers live and I will wire them in.
