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
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
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
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Work out how many trees cover a trip, then gift them or invite the traveller to plant them.
            </p>
          </div>
          <Button className="gap-2" onClick={() => toast({ title: "Buy more trees", description: "Tree purchasing is coming soon." })}>
            <Plus className="h-4 w-4" aria-hidden />
            Buy more trees
          </Button>
        </div>

        <section aria-label="Account summary" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricTile icon={Gift} label="Trees gifted" value={ACCOUNT.treesGifted} />
          <MetricTile icon={TreePine} label="Trees in my account" value={ACCOUNT.treesInAccount} />
          <MetricTile icon={Users} label="Trees purchased by travellers" value={ACCOUNT.treesPurchasedByTravellers} />
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Trip calculator</CardTitle>
              <CardDescription>
                Everything updates live — there is no calculate button.
              </CardDescription>
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

              <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-3">
                <Checkbox
                  id="t2t-return"
                  checked={returnTrip}
                  onCheckedChange={(v) => setReturnTrip(v === true)}
                  className="mt-0.5"
                />
                <div>
                  <Label htmlFor="t2t-return" className="cursor-pointer">Return trip</Label>
                  <p className="text-xs text-muted-foreground">
                    Tick if the traveller is coming back — the distance is counted twice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6 lg:sticky lg:top-20">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Trees required</CardTitle>
              </CardHeader>
              <CardContent>
                {!result.valid ? (
                  <div className="rounded-lg border border-dashed border-border p-6 text-center">
                    <Leaf className="mx-auto h-6 w-6 text-muted-foreground" aria-hidden />
                    <p className="mt-3 text-sm font-medium text-foreground">Nothing to calculate yet</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Choose a mode of travel, a trip from and to, and at least one traveller.
                    </p>
                  </div>
                ) : (
                  <div aria-live="polite" className="space-y-4">
                    <div className="rounded-xl bg-primary/10 p-5 text-center">
                      <p className="text-4xl font-semibold tracking-tight text-primary">
                        {result.trees} trees
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        to cover {formatKg(result.totalKg)}
                      </p>
                    </div>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Distance</dt>
                        <dd className="font-medium">{result.distanceKm.toLocaleString("en-GB")} km</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Travel emissions</dt>
                        <dd className="font-medium">{formatKg(result.travelKg)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Accommodation emissions</dt>
                        <dd className="font-medium">{formatKg(result.stayKg)}</dd>
                      </div>
                      <div className="flex justify-between border-t border-border pt-2">
                        <dt className="text-muted-foreground">Cost if you gift them</dt>
                        <dd className="font-semibold">{formatUsd(result.cost)}</dd>
                      </div>
                    </dl>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">What next?</CardTitle>
                <CardDescription>Choose one — they are two outcomes of the same calculation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-primary" aria-hidden />
                    <p className="text-sm font-medium">Gift trees</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    You pay for the trees as a thank-you for the booking.
                  </p>
                  <Button
                    className="mt-3 w-full gap-2"
                    disabled={!result.valid}
                    onClick={() =>
                      toast({
                        title: `Gifting ${result.trees} trees`,
                        description: `${formatUsd(result.cost)} — checkout coming soon.`,
                      })
                    }
                  >
                    Gift {result.valid ? result.trees : ""} trees
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-primary" aria-hidden />
                    <p className="text-sm font-medium">Share with traveller</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Send the traveller their tree total and invite them to pay.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-3 w-full gap-2"
                    disabled={!result.valid}
                    onClick={() =>
                      navigate("/trip-to-trees/share", {
                        state: { trees: result.trees, kg: result.totalKg },
                      })
                    }
                  >
                    Share with traveller
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                </div>

                {!result.valid && (
                  <p className="text-xs text-muted-foreground">
                    Complete the calculator to unlock these actions.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </T2TLayout>
  );
}
