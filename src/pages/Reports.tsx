import { useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Filter,
  Search,
  X,
  Download,
  FileDown,
  Columns as ColumnsIcon,
  CalendarIcon,
  AlertTriangle,
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ReportErrorsView } from "@/components/reports/ReportErrorsView";
import { Header } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Row = {
  added: string;
  corporate: string;
  paxId: string;
  costCentre: string;
  tripDate: string;
  endDate: string;
  route: string;
  type: "Hotel" | "Rail" | "Flight";
  travelClass: string;
  haul: string;
  distance: number;
  co2: number;
  co2Cost: number; // in £
};

const CORPORATES = ["Software Com LTD", "Medigold", "DAC Beachcroft"];

const rows: Row[] = [
  { added: "12 Jun 26", corporate: "Software Com LTD", paxId: "PX-1042", costCentre: "CC-100", tripDate: "18 Jun 26", endDate: "18 Jun 26", route: "London Euston → Manchester Piccadilly", type: "Rail", travelClass: "Standard", haul: "Domestic", distance: 296, co2: 10.2, co2Cost: 0.18 },
  { added: "12 Jun 26", corporate: "Software Com LTD", paxId: "PX-1042", costCentre: "CC-100", tripDate: "18 Jun 26", endDate: "19 Jun 26", route: "Hilton Manchester Deansgate", type: "Hotel", travelClass: "Standard", haul: "N/A", distance: 0, co2: 17.4, co2Cost: 0.31 },
  { added: "14 Jun 26", corporate: "Medigold", paxId: "PX-2210", costCentre: "CC-204", tripDate: "22 Jun 26", endDate: "22 Jun 26", route: "London Kings Cross → Edinburgh Waverley", type: "Rail", travelClass: "First", haul: "Domestic", distance: 632, co2: 22.7, co2Cost: 0.41 },
  { added: "14 Jun 26", corporate: "Medigold", paxId: "PX-2210", costCentre: "CC-204", tripDate: "22 Jun 26", endDate: "24 Jun 26", route: "Radisson Blu Edinburgh", type: "Hotel", travelClass: "Standard", haul: "N/A", distance: 0, co2: 34.6, co2Cost: 0.62 },
  { added: "15 Jun 26", corporate: "DAC Beachcroft", paxId: "PX-3308", costCentre: "CC-311", tripDate: "24 Jun 26", endDate: "24 Jun 26", route: "London Heathrow → Amsterdam Schiphol", type: "Flight", travelClass: "Economy", haul: "Short", distance: 370, co2: 28.9, co2Cost: 0.52 },
  { added: "15 Jun 26", corporate: "DAC Beachcroft", paxId: "PX-3308", costCentre: "CC-311", tripDate: "24 Jun 26", endDate: "26 Jun 26", route: "NH Collection Amsterdam Barbizon", type: "Hotel", travelClass: "Standard", haul: "N/A", distance: 0, co2: 19.8, co2Cost: 0.36 },
  { added: "16 Jun 26", corporate: "Software Com LTD", paxId: "PX-1088", costCentre: "CC-101", tripDate: "26 Jun 26", endDate: "26 Jun 26", route: "Birmingham New Street → London Euston", type: "Rail", travelClass: "Standard", haul: "Domestic", distance: 181, co2: 6.3, co2Cost: 0.11 },
  { added: "17 Jun 26", corporate: "Medigold", paxId: "PX-2244", costCentre: "CC-207", tripDate: "27 Jun 26", endDate: "27 Jun 26", route: "London Paddington → Bristol Temple Meads", type: "Rail", travelClass: "Standard", haul: "Domestic", distance: 190, co2: 6.8, co2Cost: 0.12 },
  { added: "18 Jun 26", corporate: "DAC Beachcroft", paxId: "PX-3315", costCentre: "CC-314", tripDate: "29 Jun 26", endDate: "29 Jun 26", route: "London Heathrow → Frankfurt", type: "Flight", travelClass: "Business", haul: "Short", distance: 655, co2: 33.4, co2Cost: 0.60 },
  { added: "19 Jun 26", corporate: "Software Com LTD", paxId: "PX-1094", costCentre: "CC-102", tripDate: "01 Jul 26", endDate: "02 Jul 26", route: "Premier Inn Leeds City Centre", type: "Hotel", travelClass: "Standard", haul: "N/A", distance: 0, co2: 12.5, co2Cost: 0.22 },
  { added: "20 Jun 26", corporate: "Medigold", paxId: "PX-2260", costCentre: "CC-209", tripDate: "02 Jul 26", endDate: "02 Jul 26", route: "London Kings Cross → York", type: "Rail", travelClass: "Standard", haul: "Domestic", distance: 344, co2: 12.0, co2Cost: 0.21 },
  { added: "21 Jun 26", corporate: "DAC Beachcroft", paxId: "PX-3327", costCentre: "CC-318", tripDate: "03 Jul 26", endDate: "03 Jul 26", route: "Manchester Piccadilly → London Euston", type: "Rail", travelClass: "First", haul: "Domestic", distance: 296, co2: 9.8, co2Cost: 0.18 },
];

const ALL_COLUMNS = [
  { key: "added", label: "Added", defaultVisible: true },
  { key: "corporate", label: "Corporate", defaultVisible: true },
  { key: "paxId", label: "PAX ID", defaultVisible: false },
  { key: "costCentre", label: "Cost Centre", defaultVisible: false },
  { key: "tripDate", label: "Trip Date", defaultVisible: true },
  { key: "endDate", label: "End Date", defaultVisible: true },
  { key: "route", label: "Route/Accommodation", defaultVisible: true },
  { key: "type", label: "Type", defaultVisible: true },
  { key: "travelClass", label: "Class", defaultVisible: true },
  { key: "haul", label: "Haul", defaultVisible: false },
  { key: "distance", label: "Distance (km)", defaultVisible: true },
  { key: "co2", label: "CO2 (kg)", defaultVisible: true },
  { key: "co2Cost", label: "CO2 Cost (£)", defaultVisible: true },
] as const;

type ColKey = typeof ALL_COLUMNS[number]["key"];

const typeBadgeStyles: Record<Row["type"], string> = {
  Hotel: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  Rail: "bg-primary/10 text-primary hover:bg-primary/10",
  Flight: "bg-amber-100 text-amber-800 hover:bg-amber-100",
};

const Reports = () => {
  const [accountFilter, setAccountFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [search, setSearch] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [visibleCols, setVisibleCols] = useState<Record<ColKey, boolean>>(
    () =>
      ALL_COLUMNS.reduce((acc, c) => {
        acc[c.key] = c.defaultVisible;
        return acc;
      }, {} as Record<ColKey, boolean>)
  );

  const parseDate = (s: string) => new Date(s + " UTC");

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (accountFilter !== "all" && r.corporate !== accountFilter) return false;
      if (startDate && parseDate(r.tripDate) < startDate) return false;
      if (endDate && parseDate(r.tripDate) > endDate) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !r.route.toLowerCase().includes(q) &&
          !r.corporate.toLowerCase().includes(q) &&
          !r.paxId.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [accountFilter, startDate, endDate, search]);

  const clearFilters = () => {
    setAccountFilter("all");
    setStartDate(undefined);
    setEndDate(undefined);
    setSearch("");
  };

  const summary = useMemo(() => {
    const types: Array<{ label: string; match: Row["type"][]; unitLabel: string }> = [
      { label: "Accommodation", match: ["Hotel"], unitLabel: "Nights" },
      { label: "Flight", match: ["Flight"], unitLabel: "Sectors" },
      { label: "Rail", match: ["Rail"], unitLabel: "Sectors" },
    ];
    const groups = types.map((t) => {
      const items = filtered.filter((r) => t.match.includes(r.type));
      const distance = items.reduce((s, r) => s + r.distance, 0);
      const co2 = items.reduce((s, r) => s + r.co2, 0);
      const price = items.reduce((s, r) => s + r.co2Cost, 0);
      const pnrs = new Set(items.map((r) => r.paxId)).size;
      const trees = Math.ceil(co2 / 20);
      const dates = items.map((r) => parseDate(r.tripDate)).sort((a, b) => +a - +b);
      const endDates = items.map((r) => parseDate(r.endDate)).sort((a, b) => +a - +b);
      const start = dates[0];
      const end = endDates[endDates.length - 1];
      const days = start && end ? Math.max(1, Math.round((+end - +start) / 86400000) + 1) : 0;
      return {
        label: t.label,
        units: items.length,
        unitLabel: t.unitLabel,
        pnrs,
        distance,
        co2,
        trees,
        price,
        avPnr: pnrs ? price / pnrs : 0,
        avMonth: price, // single-month sample
        start,
        end,
        days,
      };
    });
    const total = {
      units: groups.reduce((s, g) => s + g.units, 0),
      pnrs: groups.reduce((s, g) => s + g.pnrs, 0),
      distance: groups.reduce((s, g) => s + g.distance, 0),
      co2: groups.reduce((s, g) => s + g.co2, 0),
      trees: groups.reduce((s, g) => s + g.trees, 0),
      price: groups.reduce((s, g) => s + g.price, 0),
    };
    return { groups, total };
  }, [filtered]);

  const renderCell = (r: Row, key: ColKey) => {
    switch (key) {
      case "type":
        return (
          <Badge className={cn("font-medium px-2.5 py-0.5 border-0", typeBadgeStyles[r.type])}>
            {r.type}
          </Badge>
        );
      case "distance":
        return r.distance.toLocaleString();
      case "co2":
        return r.co2.toFixed(1);
      case "co2Cost":
        return `£${r.co2Cost.toFixed(2)}`;
      default:
        return (r as any)[key];
    }
  };

  const visibleColumnDefs = ALL_COLUMNS.filter((c) => visibleCols[c.key]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Reports"
          subtitle="Analyse travel and accommodation emissions across your corporate accounts"
        />
        <main className="flex-1 overflow-auto p-8 space-y-6">
          {showErrors ? (
            <ReportErrorsView onBack={() => setShowErrors(false)} />
          ) : (
          <>
          {/* Import error banner */}
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 flex flex-wrap items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div className="flex-1 min-w-[240px]">
              <p className="text-sm font-semibold text-foreground">
                1 row with errors and 21 skipped rows in your latest import
              </p>
              <p className="text-sm text-muted-foreground">
                These records are excluded from the report below until they are resolved.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowErrors(true)}>
              View errors
            </Button>
          </div>

          {/* Filter bar */}

          <div className="bg-metric-card rounded-xl shadow-card border border-border p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="text-base font-semibold text-foreground">FILTERS:</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Account:</span>
                <Select value={accountFilter} onValueChange={setAccountFilter}>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="All accounts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All accounts</SelectItem>
                    {CORPORATES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">From:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-40 justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd MMM yy") : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">To:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-40 justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd MMM yy") : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Search route, corporate, PAX ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Actions row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">
              Showing {filtered.length} of {rows.length} records
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <ColumnsIcon className="h-4 w-4 mr-2" />
                    Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {ALL_COLUMNS.map((c) => (
                    <DropdownMenuCheckboxItem
                      key={c.key}
                      checked={visibleCols[c.key]}
                      onCheckedChange={(v) =>
                        setVisibleCols((prev) => ({ ...prev, [c.key]: !!v }))
                      }
                      onSelect={(e) => e.preventDefault()}
                    >
                      {c.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline">
                <FileDown className="h-4 w-4 mr-2" />
                Download CSV
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-metric-card rounded-xl shadow-card border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    {visibleColumnDefs.map((c) => (
                      <th
                        key={c.key}
                        className="text-left p-4 font-semibold text-sm text-foreground whitespace-nowrap"
                      >
                        {c.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr
                      key={i}
                      className="border-b border-border hover:bg-muted/25 transition-colors"
                    >
                      {visibleColumnDefs.map((c) => (
                        <td
                          key={c.key}
                          className="p-4 text-sm text-foreground whitespace-nowrap"
                        >
                          {renderCell(r, c.key)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={visibleColumnDefs.length}
                        className="p-8 text-center text-muted-foreground text-sm"
                      >
                        No records match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground italic">
              This quote does not take into consideration any existing traveller or corporate balances on account.
            </p>
            <div className="bg-metric-card rounded-xl shadow-card border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Summary by Type</h2>
                <p className="text-sm text-muted-foreground">
                  Aggregated totals for the current filter selection
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      {[
                        "Type",
                        "Sectors/Nights",
                        "PNRs",
                        "Distance (kms)",
                        "CO2 (kgs)",
                        "Trees",
                        "Price",
                        "Av./PNR",
                        "Av./Month",
                        "Start Date",
                        "End Date",
                        "Days",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left p-4 font-semibold text-sm text-foreground whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {summary.groups.map((g) => (
                      <tr key={g.label} className="border-b border-border">
                        <td className="p-4 text-sm font-medium text-foreground">{g.label}</td>
                        <td className="p-4 text-sm text-foreground">
                          {g.units} {g.unitLabel.toLowerCase()}
                        </td>
                        <td className="p-4 text-sm text-foreground">{g.pnrs}</td>
                        <td className="p-4 text-sm text-foreground">
                          {g.distance.toLocaleString()}
                        </td>
                        <td className="p-4 text-sm text-foreground">{g.co2.toFixed(1)}</td>
                        <td className="p-4 text-sm text-foreground">{g.trees}</td>
                        <td className="p-4 text-sm text-foreground">£{g.price.toFixed(2)}</td>
                        <td className="p-4 text-sm text-foreground">£{g.avPnr.toFixed(2)}</td>
                        <td className="p-4 text-sm text-foreground">£{g.avMonth.toFixed(2)}</td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {g.start ? format(g.start, "dd MMM yy") : "—"}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {g.end ? format(g.end, "dd MMM yy") : "—"}
                        </td>
                        <td className="p-4 text-sm text-foreground">{g.days}</td>
                      </tr>
                    ))}
                    <tr className="bg-primary/5 font-semibold">
                      <td className="p-4 text-sm text-foreground">Total</td>
                      <td className="p-4 text-sm text-foreground">{summary.total.units}</td>
                      <td className="p-4 text-sm text-foreground">{summary.total.pnrs}</td>
                      <td className="p-4 text-sm text-foreground">
                        {summary.total.distance.toLocaleString()}
                      </td>
                      <td className="p-4 text-sm text-foreground">
                        {summary.total.co2.toFixed(1)}
                      </td>
                      <td className="p-4 text-sm text-foreground">{summary.total.trees}</td>
                      <td className="p-4 text-sm text-foreground">
                        £{summary.total.price.toFixed(2)}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground" colSpan={5}>
                        —
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </>
          )}
        </main>

      </div>
    </div>
  );
};

export default Reports;
