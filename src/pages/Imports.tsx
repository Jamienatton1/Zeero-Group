import { useState } from "react";
import { AdminLayout } from "@/components/operations/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Search,
  SlidersHorizontal,
  Upload,
  MoreHorizontal,
  FileText,
  Download,
  RefreshCw,
  CheckCircle2,
  Trash2,
  Mail,
  AlertTriangle,
  Paperclip,
} from "lucide-react";

type ImportStatus = "Imported" | "Queued" | "Processing" | "Failed";

interface ImportJob {
  id: string;
  added: string;
  source: string;
  partner?: string;
  corporate: string;
  file: string;
  valid: number;
  total: number;
  skippedRule: number;
  duplicates: number;
  processed: number;
  status: ImportStatus;
  hasQuote?: boolean;
}

const jobs: ImportJob[] = [
  {
    id: "1",
    added: "06 Aug 2026, 11:00",
    source: "reportscheduler-noreply@us.fcm.travel",
    partner: "FC Corporate Traveller UK",
    corporate: "IEAGHG",
    file: "flight-centre/20260806-SJ2PR04MB889592DD0EE6E40DE42D4489E9D22-Trees4Travel.XLSX",
    valid: 2,
    total: 2,
    skippedRule: 0,
    duplicates: 0,
    processed: 2,
    status: "Imported",
    hasQuote: true,
  },
  {
    id: "2",
    added: "06 Aug 2026, 10:47",
    source: "SFTP (Clarity)",
    corporate: "Unknown",
    file: "0726 People Plus - Hotel Sustainability Summary.xlsx",
    valid: 7,
    total: 7,
    skippedRule: 0,
    duplicates: 0,
    processed: 0,
    status: "Queued",
  },
  {
    id: "3",
    added: "06 Aug 2026, 10:47",
    source: "SFTP (Clarity)",
    corporate: "Unknown",
    file: "0726 People Plus - Air Sustainability Summary.xlsx",
    valid: 2,
    total: 2,
    skippedRule: 0,
    duplicates: 0,
    processed: 0,
    status: "Queued",
  },
  {
    id: "4",
    added: "06 Aug 2026, 10:47",
    source: "SFTP (Clarity)",
    corporate: "People Plus",
    file: "0726 People Plus - Rail Sustainability Summary.xlsx",
    valid: 214,
    total: 229,
    skippedRule: 9,
    duplicates: 6,
    processed: 120,
    status: "Processing",
  },
  {
    id: "5",
    added: "06 Aug 2026, 10:47",
    source: "SFTP (Clarity)",
    corporate: "Practice Plus",
    file: "0726 Practice Plus - Air Sustainability Summary.xlsx",
    valid: 0,
    total: 0,
    skippedRule: 0,
    duplicates: 0,
    processed: 0,
    status: "Failed",
  },
  {
    id: "6",
    added: "06 Aug 2026, 10:47",
    source: "SFTP (Clarity)",
    partner: "Clarity",
    corporate: "Practice Plus",
    file: "0726 Practice Plus - Hotel Sustainability Summary.xlsx",
    valid: 36,
    total: 39,
    skippedRule: 2,
    duplicates: 1,
    processed: 39,
    status: "Imported",
    hasQuote: true,
  },
  {
    id: "7",
    added: "06 Aug 2026, 10:47",
    source: "SFTP (Clarity)",
    partner: "Clarity",
    corporate: "Practice Plus",
    file: "0726 Practice Plus - Rail Sustainability Summary.xlsx",
    valid: 588,
    total: 615,
    skippedRule: 15,
    duplicates: 12,
    processed: 0,
    status: "Queued",
  },
  {
    id: "8",
    added: "06 Aug 2026, 10:47",
    source: "SFTP (Clarity)",
    corporate: "Medigold",
    file: "0726 Medigold - Hotel Sustainability Summary.xlsx",
    valid: 3,
    total: 3,
    skippedRule: 0,
    duplicates: 0,
    processed: 3,
    status: "Imported",
  },
];

const statusStyles: Record<ImportStatus, string> = {
  Imported: "bg-primary/10 text-primary border-primary/20",
  Queued: "bg-muted text-muted-foreground border-border",
  Processing: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  Failed: "bg-destructive/10 text-destructive border-destructive/20",
};

const alertChips = [
  { label: "Missing emails", count: 4, icon: Mail },
  { label: "Import error", count: 2, icon: AlertTriangle },
  { label: "Xero error", count: 1, icon: AlertTriangle },
  { label: "Contribution emails error", count: 3, icon: Mail },
];

function RecordsCell({ job }: { job: ImportJob }) {
  const total = Math.max(job.total, job.valid + job.skippedRule + job.duplicates, 1);
  const pct = (n: number) => `${(n / total) * 100}%`;
  const hasProblems = job.skippedRule > 0 || job.duplicates > 0;

  return (
    <div className="w-[190px] space-y-1.5">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="bg-primary" style={{ width: pct(job.valid) }} />
        <div className="bg-amber-500" style={{ width: pct(job.skippedRule) }} />
        <div className="bg-muted-foreground/40" style={{ width: pct(job.duplicates) }} />
      </div>
      <div className="flex items-center gap-3 text-[11px]">
        <span className="flex items-center gap-1 text-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {job.valid} valid
        </span>
        <span
          className={cn(
            "flex items-center gap-1",
            job.skippedRule > 0 ? "font-medium text-amber-700" : "text-muted-foreground"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          {job.skippedRule} rule
        </span>
        <span
          className={cn(
            "flex items-center gap-1",
            job.duplicates > 0 ? "font-medium text-foreground" : "text-muted-foreground"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
          {job.duplicates} dupes
        </span>
      </div>
      {!hasProblems && job.total === 0 && (
        <p className="text-[11px] text-destructive">No records read from file</p>
      )}
    </div>
  );
}

function RowActions({ job }: { job: ImportJob }) {
  const canResume = job.status === "Queued" || job.status === "Failed";
  const inProgress = job.status === "Processing" || job.status === "Queued";

  return (
    <div className="flex items-center justify-end gap-1">
      {job.hasQuote ? (
        <Button variant="outline" size="sm" className="h-8">
          <FileText className="mr-1.5 h-3.5 w-3.5" />
          View quote
        </Button>
      ) : canResume ? (
        <Button variant="outline" size="sm" className="h-8">
          <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
          Resume
        </Button>
      ) : (
        <Button variant="outline" size="sm" className="h-8">
          <Download className="mr-1.5 h-3.5 w-3.5" />
          File
        </Button>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-popover">
          {job.hasQuote && (
            <>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                View quote
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Download quote
              </DropdownMenuItem>
            </>
          )}
          {canResume && (
            <DropdownMenuItem>
              <RefreshCw className="mr-2 h-4 w-4" />
              Resume file processing
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Download className="mr-2 h-4 w-4" />
            Download file
          </DropdownMenuItem>
          {inProgress && (
            <DropdownMenuItem>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark as complete
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Remove import and file
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const Imports = () => {
  const [activeChips, setActiveChips] = useState<string[]>([]);

  const toggleChip = (label: string) =>
    setActiveChips((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );

  return (
    <AdminLayout title="Imports" subtitle="Travel data files from TMCs and corporates">
      <Card className="mb-4 rounded-xl shadow-card">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Select>
              <SelectTrigger className="h-9 w-[220px]">
                <SelectValue placeholder="All organisations" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All organisations</SelectItem>
                <SelectItem value="clarity">Clarity</SelectItem>
                <SelectItem value="fcm">FC Corporate Traveller UK</SelectItem>
                <SelectItem value="travelperk">TravelPerk</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center">
              <div className="flex h-9 w-[230px] items-center gap-2 rounded-l-md border border-r-0 border-input bg-background px-3 text-sm text-muted-foreground">
                <Paperclip className="h-3.5 w-3.5" />
                Choose file
              </div>
              <Button variant="outline" size="sm" className="h-9 rounded-none border-r-0">
                Browse
              </Button>
              <Button size="sm" className="h-9 rounded-l-none">
                <Upload className="mr-1.5 h-3.5 w-3.5" />
                Upload
              </Button>
            </div>

            <Select>
              <SelectTrigger className="h-9 w-[170px]">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="imported">Imported</SelectItem>
                <SelectItem value="queued">Queued</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" className="h-9 w-9">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>

            <div className="relative ml-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search imports" className="h-9 w-[240px] pl-9" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
            <span className="text-xs text-muted-foreground">Filter by problem:</span>
            {alertChips.map((chip) => {
              const Icon = chip.icon;
              const active = activeChips.includes(chip.label);
              return (
                <button
                  key={chip.label}
                  onClick={() => toggleChip(chip.label)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors",
                    active
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {chip.label}
                  <span className="rounded-full bg-muted px-1.5 text-[10px] font-medium text-foreground">
                    {chip.count}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[210px] text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Added
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Agent / Corporate
                </TableHead>
                <TableHead className="w-[210px] text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Records
                </TableHead>
                <TableHead className="w-[90px] text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Processed
                </TableHead>
                <TableHead className="w-[120px] text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="w-[190px] text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => {
                const problem = job.status === "Failed";
                return (
                  <TableRow
                    key={job.id}
                    className={cn("align-top", problem && "bg-destructive/[0.04]")}
                  >
                    <TableCell className="py-4">
                      <p className="text-sm font-medium text-foreground">{job.added}</p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">{job.source}</p>
                    </TableCell>
                    <TableCell className="py-4">
                      <p className="text-sm text-foreground">
                        {job.partner && (
                          <span className="text-muted-foreground">{job.partner} · </span>
                        )}
                        {job.corporate}
                      </p>
                      <p className="mt-0.5 max-w-[340px] truncate text-xs text-muted-foreground">
                        {job.file}
                      </p>
                    </TableCell>
                    <TableCell className="py-4">
                      <RecordsCell job={job} />
                    </TableCell>
                    <TableCell className="py-4 text-sm text-foreground">{job.processed}</TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className={cn("font-medium", statusStyles[job.status])}>
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <RowActions job={job} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Show</span>
              <Select defaultValue="10">
                <SelectTrigger className="h-8 w-[72px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span>entries · Showing 1 to 10 of 1,248</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-8">
                Previous
              </Button>
              {["1", "2", "3", "…", "125"].map((p, i) => (
                <Button
                  key={`${p}-${i}`}
                  variant={p === "1" ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  {p}
                </Button>
              ))}
              <Button variant="outline" size="sm" className="h-8">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default Imports;
