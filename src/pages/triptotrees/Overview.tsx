import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, differenceInCalendarDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  CalendarIcon,
  Gift,
  Leaf,
  Send,
  TreePine,
  Users,
  Plus,
  ArrowRight,
} from "lucide-react";
import { T2TLayout } from "@/components/triptotrees/T2TLayout";
import { LocationSelect } from "@/components/triptotrees/LocationSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  TRIP_TO_TREES_CONFIG,
  calculateTrip,
  formatKg,
  formatUsd,
} from "@/lib/tripToTrees";

const ACCOUNT = {
  treesGifted: 128,
  treesInAccount: 10,
  treesPurchasedByTravellers: 46,
};

function MetricTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof TreePine;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-surface-muted px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-data-soft text-data-foreground">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold tracking-tight text-data-foreground">{value}</p>
      </div>
    </div>
  );
}


export default function TripToTreesOverview() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<string>("plane_economy");
  const [returnTrip, setReturnTrip] = useState(true);
  const [from, setFrom] = useState<string>();
  const [to, setTo] = useState<string>();
  const [range, setRange] = useState<DateRange | undefined>();
  const [accommodation, setAccommodation] = useState("hotel");
  const [travellers, setTravellers] = useState("2");

  const nights = useMemo(() => {
    if (!range?.from || !range?.to) return 0;
    return Math.max(0, differenceInCalendarDays(range.to, range.from));
  }, [range]);

  const result = useMemo(
    () =>
      calculateTrip({
        mode,
        returnTrip,
        from,
        to,
        nights,
        accommodation,
        travellers: Number(travellers),
      }),
    [mode, returnTrip, from, to, nights, accommodation, travellers],
  );

  const dateLabel = range?.from
    ? range.to
      ? `${format(range.from, "d MMM yyyy")} – ${format(range.to, "d MMM yyyy")}`
      : format(range.from, "d MMM yyyy")
    : "Select travel dates";

  return (
    <T2TLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-data-foreground">Trip to Trees</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Overview</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Work out how many trees cover a trip, then gift them or invite the traveller to plant them.
            </p>
          </div>
          <Button className="gap-2" onClick={() => toast({ title: "Buy more trees", description: "Tree purchasing is coming soon." })}>
            <Plus className="h-4 w-4" aria-hidden />
            Buy more trees
          </Button>
        </header>

        <section aria-label="Account summary" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <MetricTile icon={Gift} label="Trees gifted" value={ACCOUNT.treesGifted} />
          <MetricTile icon={TreePine} label="Trees in my account" value={ACCOUNT.treesInAccount} />
          <MetricTile icon={Users} label="Trees purchased by travellers" value={ACCOUNT.treesPurchasedByTravellers} />
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
          <Card className="border-border bg-surface shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Trip calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="t2t-mode">Mode of travel</Label>
                  <Select value={mode} onValueChange={setMode}>
                    <SelectTrigger id="t2t-mode" className="bg-card">
                      <SelectValue placeholder="Select a mode of travel" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRIP_TO_TREES_CONFIG.travelModes.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="t2t-travellers">Number of travellers</Label>
                  <Input
                    id="t2t-travellers"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    step={1}
                    value={travellers}
                    onChange={(e) => setTravellers(e.target.value)}
                    aria-invalid={Number(travellers) < 1}
                    aria-describedby="t2t-travellers-error"
                    className="bg-card"
                  />
                  <p
                    id="t2t-travellers-error"
                    role="alert"
                    className={cn("text-xs text-destructive", Number(travellers) >= 1 && "sr-only")}
                  >
                    {Number(travellers) >= 1 ? "" : "Enter at least one traveller."}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="t2t-from">Trip from</Label>
                  <LocationSelect id="t2t-from" value={from} onChange={setFrom} disabledValue={to} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="t2t-to">Trip to</Label>
                  <LocationSelect id="t2t-to" value={to} onChange={setTo} disabledValue={from} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="t2t-dates">Travel dates</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="t2t-dates"
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start gap-2 bg-card font-normal",
                          !range?.from && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="h-4 w-4" aria-hidden />
                        {dateLabel}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={range}
                        onSelect={setRange}
                        numberOfMonths={1}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-muted-foreground">
                    {nights > 0 ? `${nights} night${nights === 1 ? "" : "s"} of accommodation` : "Used to work out nights of accommodation."}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="t2t-accommodation">Accommodation type</Label>
                  <Select value={accommodation} onValueChange={setAccommodation}>
                    <SelectTrigger id="t2t-accommodation" className="bg-card">
                      <SelectValue placeholder="Select accommodation" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRIP_TO_TREES_CONFIG.accommodationTypes.map((a) => (
                        <SelectItem key={a.value} value={a.value}>
                          {a.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
                <Label htmlFor="t2t-return" className="cursor-pointer text-sm font-medium">
                  Return trip
                </Label>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex">
                        <Switch
                          id="t2t-return"
                          checked={returnTrip}
                          onCheckedChange={setReturnTrip}
                        />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="left">Counts the distance twice</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6 lg:sticky lg:top-24">
            <section aria-label="Trees required">
              {!result.valid ? (
                <div className="rounded-xl border border-dashed border-border p-5 text-center">
                  <Leaf className="mx-auto h-5 w-5 text-muted-foreground" aria-hidden />
                  <p className="mt-2 text-sm font-medium text-foreground">Nothing to calculate yet</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Choose a mode of travel, a trip from and to, and at least one traveller.
                  </p>
                </div>
              ) : (
                <div aria-live="polite" className="rounded-2xl bg-data-soft p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-data-foreground">
                    Trees required
                  </p>
                  <p className="mt-2 text-6xl font-semibold leading-none tracking-tight text-data-foreground">
                    {result.trees}
                  </p>
                  <p className="mt-2 text-sm text-data-foreground/80">
                    trees to cover {formatKg(result.totalKg)}
                  </p>

                  <dl className="mt-5 space-y-2 border-t border-data/20 pt-4 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Distance</dt>
                      <dd className="font-medium text-foreground">
                        {result.distanceKm.toLocaleString("en-GB")} km
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Travel emissions</dt>
                      <dd className="font-medium text-foreground">{formatKg(result.travelKg)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Accommodation emissions</dt>
                      <dd className="font-medium text-foreground">{formatKg(result.stayKg)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-data/20 pt-2">
                      <dt className="text-muted-foreground">Cost if you gift them</dt>
                      <dd className="font-semibold text-foreground">{formatUsd(result.cost)}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </section>

            <section aria-label="Next steps" className="space-y-4">
              <h2 className="text-sm font-semibold text-foreground">What next?</h2>

              <div className="space-y-1.5">
                <Button
                  className="w-full gap-2"
                  disabled={!result.valid}
                  onClick={() =>
                    toast({
                      title: `Gifting ${result.trees} trees`,
                      description: `${formatUsd(result.cost)} — checkout coming soon.`,
                    })
                  }
                >
                  <Gift className="h-4 w-4" aria-hidden />
                  Gift {result.valid ? result.trees : ""} trees
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
                <p className="text-xs text-muted-foreground">
                  You pay for the trees as a thank-you for the booking.
                </p>
              </div>

              <div className="space-y-1.5">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  disabled={!result.valid}
                  onClick={() =>
                    navigate("/trip-to-trees/share", {
                      state: { trees: result.trees, kg: result.totalKg },
                    })
                  }
                >
                  <Send className="h-4 w-4" aria-hidden />
                  Share with traveller
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
                <p className="text-xs text-muted-foreground">
                  Send the traveller their tree total and invite them to pay.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </T2TLayout>
  );
}

