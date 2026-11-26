# Context menus

Use a context menu for actions on an item already in view, such as changing an issue's status from
its row. A normal click can still open the issue. The menu keeps the list in view and lets the user
finish a small task where they started it.

## What Linear shows

- In the Linear issue-list screenshot used for this pattern, the invoking row stays highlighted. The compact menu
  starts with editable properties such as Status, Priority and Assignee. Faint dividers separate
  related commands, shortcuts line up on the right, and a separate arrow signals a submenu.
  Delete sits in the final group. Use these hierarchy cues with the product's own actions and tokens.
- Linear documents that the same issue properties can be changed through keyboard shortcuts,
  the command menu or right-click, including for multiple selected issues. Putting the shortcut
  beside the command teaches it at the moment it matters. [Linear issue docs](https://linear.app/docs/creating-issues#select-issues)
- Linear's design post describes keeping a submenu open while the pointer takes a diagonal
  path into it. A triangular safe area protects the path even when it crosses a sibling row.
  [Linear's contextual menu write-up](https://linear.app/now/invisible-details)

## Design the action and its scope

- Offer right-click on the item and an accessible, discoverable More actions button. On dense
  desktop lists it can appear on hover and keyboard focus. On touch, keep a tap target available.
  Use a target-specific accessible name such as “Actions for issue ABC-123”.
- Keep the invoking item highlighted while the menu is open. If the invoked item belongs to a
  multi-selection, act on that selection and expose its count. If it is outside the selection,
  scope the menu to that item and distinguish it from the selected rows.
- Put frequent edits first and group less common commands by intent. Keep direct commands such
  as Copy link a single activation from the menu. Use one submenu level for short sets of choices,
  such as Status. Mark a shared current value as checked. When values differ, show and announce
  a mixed state with no shared value checked. If a bulk command applies to only some selected
  items, explain the restriction before activation. Use a searchable picker for long lists and
  an appropriate popover or dialog for forms.
- Reuse the same labels, command handlers and permission rules across right-click, More actions
  and shortcuts. Show shortcut hints only for functionality that works in that context. Use
  the current platform's modifier labels. Separate destructive actions at the end and give
  reversible changes an Undo where supported. Update the row or selection and surface failures.

## Make it work with pointer, keyboard and touch

- Anchor right-click menus to the pointer and button or keyboard menus to the invoking element.
  Keep the full menu in the viewport by shifting or flipping it. Constrain height and let the
  menu scroll when necessary. Position a desktop submenu next to its parent item and flip it
  when space runs out. On narrow touch layouts, use tap and a single panel with Back if a
  side-by-side submenu would crowd the viewport.
- Keep the open parent item highlighted. For hover-open submenus, use the menu component's
  pointer-intent behavior if available. Protect movement toward the submenu's near edge, including
  when it flips left. Release the protection when the pointer moves away so another command
  remains easy to reach. Opening with a click, tap or key works independently of hover.
- Use a menu primitive that implements the WAI-ARIA menu patterns. Support the Context Menu key
  or Shift+F10 on a focused item where available. Move focus into the menu on open. Arrow keys
  navigate, Enter activates, and Right Arrow opens a submenu in a left-to-right interface.
  Left Arrow or Escape from a submenu returns to its parent item. Escape from the root restores
  focus to the invoking item or button. If an action removes it, focus a sensible neighbor.
  Outside interaction dismisses the menu while respecting the clicked target. Preserve native
  context menus on editable text, links and other surfaces outside the intended row trigger.
  [WAI-ARIA menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)
  [WAI-ARIA menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- Use the raised surface, floating shadow, compact rows and separators from
  [the UI reference](ui.md). Keep icons, labels, shortcut hints and submenu arrows aligned.
  Provide a visible keyboard focus state and use the design system's larger touch targets.

## Verify the interaction

- With a mouse, open at each viewport edge. Move diagonally from Status toward the first and
  last values, then move away to another parent action. Repeat with the submenu flipped.
- With a keyboard, open, choose a value, back out one level, and dismiss. Check where focus lands
  after deleting a row. With a screen reader, check the trigger name, menu items and checked state.
- At phone width, open through More actions, choose a value and navigate back from a submenu.
- Test a single row, a row inside the selection and one outside it. Check the actual affected
  items, the visible feedback and Undo where offered.
