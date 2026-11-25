Before I build anything, here are three ways to structure the screen. They differ in layout, not in looks; the wireframes are grayscale on purpose. Pick one, or mix parts, and I will build it.

**What I assumed** (tell me if any is wrong, they would change the structure):

- One freelancer uses this all day, mostly on a laptop, sometimes on a phone.
- One timer runs at a time.
- A project name includes the client ("Kestrel Bikes webshop"); there is no separate client list.
- This is the only screen for now, so there is no sidebar or navigation to screens that do not exist.
- Data lives in the browser (localStorage), since there is no backend.

**What I left off the screen:** editing or deleting an entry, manual time entry, rates and money, reports, per-day breakdown of the week, tags. None is needed to start, stop and look.

The wireframes are in `first-reply.html`. In short:

### 1. Timer bar, then the day, week beside it (recommended)

```
+------------------------------------------------------------------+
| Time tracker                                          Wed 25 Nov |
+------------------------------------------------------------------+
| [What are you working on?] [Kestrel Bikes v] 0:00:00 [Start timer]|
|                                                                  |
| Today                        4h 05m | This week           19h 40m|
| Checkout flow   13:10-14:40  1h 30m | Kestrel Bikes        9h 15m|
|   Kestrel Bikes                     | ====================       |
| Logo options    10:50-12:15  1h 25m | Atelier Morel        6h 05m|
|   Atelier Morel                     | =============              |
| Invoices        09:00-10:10  1h 10m | Admin                4h 20m|
|   Admin                             | =========                  |
+------------------------------------------------------------------+
```

- **Idea:** one bar at the top is the timer; today's entries are under it; the week's hours per project are in a column on the right.
- **Start a timer:** 1 click (the last project is already selected), 2 to switch project.
- **Best at:** all three things you asked for visible at once, with the timer always in the same place.
- **Costs:** the week column is narrow, so it shows a total per project and nothing per day. On a phone the week sits below the day.

### 2. Projects are the timer

```
+------------------------------------------------------------------+
| Time tracker                                  This week  19h 40m |
+------------------------------------------------------------------+
| Kestrel Bikes   running 0:42:17            9h 15m   [Stop timer] |
| Atelier Morel                              6h 05m   [Start]      |
| Halden Clinic                              0h 00m   [Start]      |
| Admin                                      4h 20m   [Start]      |
|                                                                  |
| Today                                                     4h 05m |
| Kestrel Bikes                        13:10-14:40          1h 30m |
| Atelier Morel                        10:50-12:15          1h 25m |
+------------------------------------------------------------------+
```

- **Idea:** the list of projects, each with its hours this week, is the control: press a project to start it, press again to stop.
- **Start a timer:** 1 click on any project, no picker.
- **Best at:** switching between a few projects many times a day.
- **Costs:** every row carries a button, there is nowhere to say what you worked on, and past about eight projects today's entries fall off the screen.

### 3. Big clock with two tabs

```
+------------------------------------------------------------------+
| Time tracker                                          Wed 25 Nov |
+------------------------------------------------------------------+
|                            0:42:17                               |
|              [Checkout flow]  [Kestrel Bikes v]                  |
|                         [Stop timer]                             |
|  Today | This week                                               |
|  ------                                                          |
|  Checkout flow   Kestrel Bikes       13:10-14:40          1h 30m |
|  Logo options    Atelier Morel       10:50-12:15          1h 25m |
+------------------------------------------------------------------+
```

- **Idea:** the clock takes the top of the screen; today and this week are two tabs under it.
- **Start a timer:** 1 click, 2 to switch project.
- **Best at:** phones, and glancing at the clock.
- **Costs:** today and this week are never visible together, so checking the week is a click every time.

**My recommendation: direction 1.** It is the only one that shows the timer, the day and the week together, which is exactly the list you gave, and it starts a timer in one click. Direction 2 is faster to switch projects but loses the description and does not scale; direction 3 hides one of your three things at all times.

Which one do you want? I will not write the UI until you choose.
