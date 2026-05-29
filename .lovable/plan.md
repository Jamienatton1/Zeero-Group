## Goal
Improve the day selection UX on the Food & Beverage page:
1. Replace the horizontal scrolling strip with a grid that adapts to the number of event days.
2. Add a "Copy from previous day" action on the Meals and Beverages tabs.

## Changes (frontend only — `src/pages/FoodDrink.tsx`)

### 1. Day selector → adaptive grid (max 5 per row)

Day pills become equal-width grid cells. The number of columns is chosen based on the total event day count so rows balance nicely:

| Days | Columns | Layout |
|------|---------|--------|
| 1–5  | = days  | single row |
| 6    | 3       | 3 + 3 |
| 7    | 5       | 5 + 2 |
| 8    | 4       | 4 + 4 |
| 9    | 5       | 5 + 4 |
| 10   | 5       | 5 + 5 |
| 11+  | 5       | wraps onto further rows of 5 |

Implementation:
- Compute `cols` from `eventDates.length` using the table above.
- Apply via an inline `gridTemplateColumns: repeat(${cols}, minmax(0, 1fr))` style on the wrapper (Tailwind can't express dynamic counts).
- Remove the `overflow-x-auto` scroll wrapper and `min-w-[96px]` / `whitespace-nowrap`.
- Day card visual stays the same: compact pill with abbreviated weekday + date + month (e.g. "Tue 20 Aug"), Meals + Bev status dots, active state = `border-emerald-700 border-2 bg-emerald-50`.

### 2. Copy from previous day

Add a small action row immediately above the per-day inputs on each tab (not inside `DaySelector`):
- Outline button "Copy from previous day" with lucide `Copy` icon.
- Meals tab copies previous day's `meals`; Beverages tab copies previous day's `drinks`.
- Disabled on the first event day; helper caption "From: {prev day label}" when enabled.
- Toast confirmation on click.

Previous date = `eventDates[eventDates.indexOf(selectedDate) - 1]`. Deep-clone the slice before assigning into `foodDrinkData`.

## Out of scope
- No backend/data-model changes.
- No restyling of the meal/beverage input cards or the Overview tab.
