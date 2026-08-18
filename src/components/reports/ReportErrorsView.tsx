import { useState } from "react";
import {
  ArrowLeft,
  AlertTriangle,
  FileWarning,
  RefreshCw,
  Download,
  FileSpreadsheet,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type ErrorRow = {
  rowNumber: number;
  errors: string[];
  worksheetName?: string;
  corporateName?: string;
  flightNumber?: string;
  carrier?: string;
  carrierIata?: string;
  departureDate?: string;
  returnDate?: string;
  transportType?: string;
  accommodationType?: string;
  departureLocationIata?: string;
  arrivalLocationIata?: string;
};

const errorRows: ErrorRow[] = [
  {
    rowNumber: 614,
    errors: [
      "CorporateName (Account name) : Required",
      "DepartureDate (Departure / checkin date) : Required",
      "ReturnDate (Departure / checkin date) : Required",
    ],
    worksheetName: "Sheet1",
  },
];

const skippedRows: ErrorRow[] = [
  {
    rowNumber: 7,
    errors: [],
    corporateName: "Britannia Europe Account",
    carrier: "British Airways",
    departureDate: "23/04/2025",
    returnDate: "23/04/2025",
    transportType: "EconomyFlight",
    departureLocationIata: "LHR",
    arrivalLocationIata: "JFK",
  },
  {
    rowNumber: 19,
    errors: [],
    corporateName: "Britannia Europe Account",
    carrier: "Aegean Airline",
    departureDate: "30/10/2025",
    returnDate: "30/10/2025",
    transportType: "EconomyFlight",
    departureLocationIata: "LGW",
    arrivalLocationIata: "ATH",
  },
  {
    rowNumber: 24,
    errors: [],
    corporateName: "Sunways Travel",
    carrier: "Lufthansa",
    departureDate: "02/11/2025",
    returnDate: "06/11/2025",
    transportType: "BusinessFlight",
    departureLocationIata: "MAN",
    arrivalLocationIata: "FRA",
  },
];

const CORPORATES = ["ABC Test Jan 22", "Software Com LTD", "Medigold", "DAC Beachcroft"];

const COLUMNS: { key: keyof ErrorRow; label: string }[] = [
  { key: "worksheetName", label: "WorksheetName" },
  { key: "corporateName", label: "CorporateName" },
  { key: "flightNumber", label: "FlightNumber" },
  { key: "carrier", label: "Carrier" },
  { key: "carrierIata", label: "CarrierIATA" },
  { key: "departureDate", label: "DepartureDate" },
  { key: "returnDate", label: "ReturnDate" },
  { key: "transportType", label: "TransportType" },
  { key: "accommodationType", label: "AccommodationType" },
  { key: "departureLocationIata", label: "DepartureLocationIATA" },
  { key: "arrivalLocationIata", label: "ArrivalLocationIATA" },
];

interface Props {
  onBack: () => void;
  organisation?: string;
  fileName?: string;
}

export function ReportErrorsView({
  onBack,
  organisation = "Sunways",
  fileName = "20260814-CWXP123MB49674F8706C01D980A2F3174DEDA2-TIND_T4T_20FEB25 to 20FEB26.csv",
}: Props) {
  const [corporate, setCorporate] = useState<string>(CORPORATES[0]);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="bg-metric-card rounded-xl shadow-card border border-border p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Import rules
            </Button>
            <IconAction icon={<FileWarning className="h-4 w-4" />} label="Download error file" />
            <IconAction icon={<Download className="h-4 w-4" />} label="Download original file" />
            <IconAction icon={<RefreshCw className="h-4 w-4" />} label="Re-run import" />

            <div className="flex-1" />

            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
              <span>
                <span className="font-semibold text-foreground">Organisation: </span>
                <span className="text-muted-foreground">{organisation}</span>
              </span>
              <span className="max-w-[520px] truncate">
                <span className="font-semibold text-foreground">File name: </span>
                <span className="text-primary">{fileName}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Missing corporate resolver */}
        <div className="bg-metric-card rounded-xl shadow-card border border-border p-6 space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                There are rows with no corporate name, please choose a corporate for those rows:
              </p>
              <p className="text-sm text-muted-foreground">
                The selected account will be applied to every affected row before re-processing.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Select value={corporate} onValueChange={setCorporate}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Choose corporate" />
              </SelectTrigger>
              <SelectContent>
                {CORPORATES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm">Save</Button>
            <IconAction icon={<Plus className="h-4 w-4" />} label="Add new corporate" />
          </div>
        </div>

        {/* Rows with errors */}
        <ErrorTable
          title="Rows with errors"
          count={errorRows.length}
          tone="error"
          rows={errorRows}
          showErrors
        />

        {/* Skipped rows */}
        <ErrorTable
          title="Skipped rows"
          count={21}
          tone="warning"
          rows={skippedRows}
          showErrors={false}
        />
      </div>
    </TooltipProvider>
  );
}

function IconAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function ErrorTable({
  title,
  count,
  tone,
  rows,
  showErrors,
}: {
  title: string;
  count: number;
  tone: "error" | "warning";
  rows: ErrorRow[];
  showErrors: boolean;
}) {
  return (
    <div className="bg-metric-card rounded-xl shadow-card border border-border overflow-hidden">
      <div className="p-6 border-b border-border flex items-center gap-3">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <Badge
          className={
            tone === "error"
              ? "bg-destructive/10 text-destructive border-0 hover:bg-destructive/10"
              : "bg-amber-100 text-amber-800 border-0 hover:bg-amber-100"
          }
        >
          {count}
        </Badge>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4 font-semibold text-sm text-foreground whitespace-nowrap">
                RowNumber
              </th>
              <th className="text-left p-4 font-semibold text-sm text-foreground whitespace-nowrap">
                ValidationErrors
              </th>
              {COLUMNS.map((c) => (
                <th
                  key={c.key as string}
                  className="text-left p-4 font-semibold text-sm text-foreground whitespace-nowrap"
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.rowNumber} className="border-b border-border hover:bg-muted/25">
                <td className="p-4 text-sm font-medium text-foreground align-top">
                  {r.rowNumber}
                </td>
                <td className="p-4 text-sm align-top min-w-[280px]">
                  {showErrors && r.errors.length > 0 ? (
                    <ul className="space-y-1">
                      {r.errors.map((e) => (
                        <li key={e} className="text-destructive">
                          {e}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                {COLUMNS.map((c) => (
                  <td
                    key={c.key as string}
                    className="p-4 text-sm text-foreground whitespace-nowrap align-top"
                  >
                    {(r[c.key] as string) || <span className="text-muted-foreground">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
