import { useState } from "react";
import { AdminLayout } from "@/components/operations/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Search,
  MoreHorizontal,
  FileText,
  Users,
  ReceiptText,
  Download,
  Archive,
  Trash2,
  Send,
  CreditCard,
  RefreshCw,
  Plus,
  X,
  MinusCircle,
} from "lucide-react";

type XeroStatus = "Approved" | "Paid" | "Voided";

interface Quote {
  id: string;
  created: string;
  type: string;
  dateRange: string;
  partner: string;
  partnerEmail: string;
  company: string;
  subTotal: string;
  co2: string;
  invoice?: {
    created: string;
    dueDate: string;
    number: string;
    total: string;
    status: XeroStatus;
  };
}

const quotes: Quote[] = [
  {
    id: "q1",
    created: "13 Jul 2026",
    type: "TRAVEL",
    dateRange: "01 Jun 2026 – 31 Jul 2026",
    partner: "Clarity",
    partnerEmail: "jamie.natton@example.com",
    company: "Clarity",
    subTotal: "£4,450.00",
    co2: "365.02",
  },
  {
    id: "q2",
    created: "10 Jul 2026",
    type: "TRAVEL",
    dateRange: "01 Jun 2026 – 30 Jun 2026",
    partner: "Travel Counsellors",
    partnerEmail: "Automatic",
    company: "Acumetis",
    subTotal: "£174.20",
    co2: "10.76",
  },
  {
    id: "q3",
    created: "10 Jul 2026",
    type: "TRAVEL",
    dateRange: "01 Jun 2026 – 30 Jun 2026",
    partner: "TravelPerk",
    partnerEmail: "Automatic",
    company: "QA Higher Education",
    subTotal: "£91.00",
    co2: "5.56",
    invoice: {
      created: "15 Jul 2026",
      dueDate: "14 Aug 2026",
      number: "260715001449735603",
      total: "£109.20",
      status: "Approved",
    },
  },
  {
    id: "q4",
    created: "10 Jul 2026",
    type: "TRAVEL",
    dateRange: "01 Jun 2026 – 30 Jun 2026",
    partner: "TravelPerk",
    partnerEmail: "Automatic",
    company: "QA Ltd",
    subTotal: "£171.60",
    co2: "10.66",
    invoice: {
      created: "15 Jul 2026",
      dueDate: "14 Aug 2026",
      number: "260715001393785996",
      total: "£205.92",
      status: "Approved",
    },
  },
  {
    id: "q5",
    created: "10 Jul 2026",
    type: "TRAVEL",
    dateRange: "01 Jun 2026 – 30 Jun 2026",
    partner: "FC Corporate Travel",
    partnerEmail: "Automatic",
    company: "Tysers CT",
    subTotal: "£4,737.20",
    co2: "298.58",
    invoice: {
      created: "15 Jul 2026",
      dueDate: "14 Aug 2026",
      number: "260715001338346424",
      total: "£5,684.64",
      status: "Approved",
    },
  },
  {
    id: "q6",
    created: "10 Jul 2026",
    type: "TRAVEL",
    dateRange: "01 Apr 2026 – 30 Jun 2026",
    partner: "Meon Valley",
    partnerEmail: "Automatic",
    company: "Sleek Events",
    subTotal: "£280.80",
    co2: "17.35",
  },
  {
    id: "q7",
    created: "10 Jul 2026",
    type: "TRAVEL",
    dateRange: "01 Jan 2026 – 30 Jun 2026",
    partner: "Uniglobe Carter",
    partnerEmail: "Automatic",
    company: "Uptown Events",
    subTotal: "£2.60",
    co2: "0.04",
    invoice: {
      created: "15 Jul 2026",
      dueDate: "14 Aug 2026",
      number: "260715001293799464",
      total: "£3.12",
      status: "Voided",
    },
  },
  {
    id: "q8",
    created: "10 Jul 2026",
    type: "TRAVEL",
    dateRange: "01 Jun 2026 – 30 Jun 2026",
    partner: "FC Corporate Traveller",
    partnerEmail: "Automatic",
    company: "Circle Cardiovascular",
    subTotal: "C$123.20",
    co2: "4.42",
    invoice: {
      created: "15 Jul 2026",
      dueDate: "14 Aug 2026",
      number: "260715001236110064",
      total: "C$147.84",
      status: "Paid",
    },
  },
  {
    id: "q9",
    created: "10 Jul 2026",
    type: "TRAVEL",
    dateRange: "01 Jun 2026 – 30 Jun 2026",
    partner: "TravelPerk",
    partnerEmail: "Automatic",
    company: "S&W Group",
    subTotal: "£564.20",
    co2: "35.40",
    invoice: {
      created: "15 Jul 2026",
      dueDate: "14 Aug 2026",
      number: "260715001179330086",
      total: "£677.04",
      status: "Paid",
    },
  },
  {
    id: "q10",
    created: "10 Jul 2026",
    type: "TRAVEL",
    dateRange: "01 Jun 2026 – 30 Jun 2026",
    partner: "FC Business Australia",
    partnerEmail: "Automatic",
    company: "OMC International",
    subTotal: "AU$209.10",
    co2: "6.55",
  },
];

const statusStyles: Record<XeroStatus, string> = {
  Approved: "bg-primary/10 text-primary border-primary/25",
  Paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Voided: "bg-destructive/10 text-destructive border-destructive/25",
};

function XeroStatusBadge({ status }: { status: XeroStatus }) {
  return (
    <Badge variant="outline" className={cn("rounded-full font-medium", statusStyles[status])}>
      {status}
    </Badge>
  );
}

const initialRecipients = [
  { name: "Jamie Natton", email: "jamie.natton@example.com" },
  { name: "Accounts Team", email: "accounts@example.com" },
];

const Quotes = () => {
  const [pageSize, setPageSize] = useState("10");
  const [createdBy, setCreatedBy] = useState("me");
  const [search, setSearch] = useState("");
  const [toggles, setToggles] = useState({
    creditNotes: false,
    archived: false,
    discarded: false,
    xero: true,
  });

  const [detailQuote, setDetailQuote] = useState<Quote | null>(null);
  const [invoiceQuote, setInvoiceQuote] = useState<Quote | null>(null);
  const [recipientsQuote, setRecipientsQuote] = useState<Quote | null>(null);
  const [recipients, setRecipients] = useState(initialRecipients);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const toggleItems: { key: keyof typeof toggles; label: string }[] = [
    { key: "creditNotes", label: "Show credit notes" },
    { key: "archived", label: "Show archived quotes" },
    { key: "discarded", label: "Show discarded quotes" },
    { key: "xero", label: "Fetch Xero invoices" },
  ];

  const openInvoiceModal = (q: Quote) => {
    setDetailQuote(null);
    setInvoiceQuote(q);
  };

  return (
    <AdminLayout title="Quotes" subtitle="Quotes, recipients and linked Xero invoices">
      <div className="space-y-6">
        {/* Filter bar */}
        <Card>
          <CardContent className="p-6 space-y-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-wrap items-end gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Show entries</Label>
                  <Select value={pageSize} onValueChange={setPageSize}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["10", "25", "50", "100"].map((n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Created by</Label>
                  <Select value={createdBy} onValueChange={setCreatedBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="me">Me</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                      <SelectItem value="automatic">Automatic process</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Actions</Label>
                  <div className="flex gap-2">
                    <Button>Quote generation manager</Button>
                    <Button variant="outline">View generated quotes</Button>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search quotes…"
                    className="pl-9 w-[240px]"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {toggleItems.map((t) => (
                <div key={t.key} className="flex items-center gap-2">
                  <Switch
                    id={t.key}
                    checked={toggles[t.key]}
                    onCheckedChange={(v) => setToggles((s) => ({ ...s, [t.key]: v }))}
                  />
                  <Label htmlFor={t.key} className="text-sm font-normal">
                    {t.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Master list */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[130px]">Created</TableHead>
                  <TableHead className="w-[200px]">Date range</TableHead>
                  <TableHead>Partner</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead className="text-right w-[120px]">Sub total</TableHead>
                  <TableHead className="text-right w-[100px]">CO₂ (tn)</TableHead>
                  <TableHead className="w-[210px]">Invoice</TableHead>
                  <TableHead className="w-[160px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((q) => (
                  <TableRow
                    key={q.id}
                    onClick={() => setDetailQuote(q)}
                    className={cn(
                      "cursor-pointer",
                      detailQuote?.id === q.id && "bg-muted/60 hover:bg-muted/60"
                    )}
                  >
                    <TableCell className="py-3">
                      <div className="text-sm font-medium text-foreground">{q.created}</div>
                      <Badge
                        variant="outline"
                        className="mt-1 rounded-full bg-secondary text-secondary-foreground border-border text-[10px] tracking-wide"
                      >
                        {q.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-sm">{q.dateRange}</TableCell>
                    <TableCell className="py-3">
                      <div className="text-sm font-medium">{q.partner}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[180px]">
                        {q.partnerEmail}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-sm">{q.company}</TableCell>
                    <TableCell className="py-3 text-right text-sm font-medium">{q.subTotal}</TableCell>
                    <TableCell className="py-3 text-right text-sm">{q.co2}</TableCell>
                    <TableCell className="py-3">
                      {q.invoice ? (
                        <div className="flex flex-col items-start gap-1">
                          <XeroStatusBadge status={q.invoice.status} />
                          <span className="text-xs text-muted-foreground">
                            Due {q.invoice.dueDate}
                          </span>
                        </div>
                      ) : (
                        <div
                          className="flex items-center gap-2 rounded-md border border-dashed border-border bg-muted/40 px-2 py-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MinusCircle className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <span className="text-xs text-muted-foreground">Not invoiced</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-xs"
                            onClick={() => setInvoiceQuote(q)}
                          >
                            Create invoice
                          </Button>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" className="gap-1.5">
                          <FileText className="w-4 h-4" />
                          View report
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Quote actions">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-60">
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View report
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setRecipientsQuote(q)}>
                              <Users className="mr-2 h-4 w-4" />
                              Manage recipients
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setInvoiceQuote(q)}>
                              <ReceiptText className="mr-2 h-4 w-4" />
                              Create invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download emissions report
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Archive className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-4">
              <p className="text-sm text-muted-foreground">Showing 1 to 10 of 2,002 entries</p>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" disabled>
                  Previous
                </Button>
                {["1", "2", "3", "4", "5"].map((p) => (
                  <Button key={p} variant={p === "1" ? "default" : "ghost"} size="sm" className="w-9">
                    {p}
                  </Button>
                ))}
                <span className="px-2 text-muted-foreground">…</span>
                <Button variant="ghost" size="sm" className="w-12">
                  201
                </Button>
                <Button variant="ghost" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>




      {/* Create invoice confirmation */}
      <Dialog open={!!invoiceQuote} onOpenChange={(o) => !o && setInvoiceQuote(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create invoice</DialogTitle>
            <DialogDescription>
              Review the details before creating this invoice in Xero.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Company</span>
              <span className="font-medium">{invoiceQuote?.company}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">{invoiceQuote?.subTotal}</span>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground mb-2">Recipients</p>
              <ul className="space-y-1">
                {recipients.map((r) => (
                  <li key={r.email} className="flex justify-between gap-4">
                    <span>{r.name}</span>
                    <span className="text-muted-foreground truncate">{r.email}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button variant="ghost" onClick={() => setInvoiceQuote(null)}>
              Cancel
            </Button>
            <Button variant="outline">Create without sending</Button>
            <Button>Create &amp; send invoice</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage recipients */}
      <Dialog open={!!recipientsQuote} onOpenChange={(o) => !o && setRecipientsQuote(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage recipients</DialogTitle>
            <DialogDescription>
              People who receive quotes and invoices for {recipientsQuote?.company}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            {recipients.map((r) => (
              <div
                key={r.email}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{r.email}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${r.name}`}
                  onClick={() => setRecipients((s) => s.filter((x) => x.email !== r.email))}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {recipients.length === 0 && (
              <p className="text-sm text-muted-foreground">No recipients yet.</p>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2 items-end">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Name</Label>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Full name" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Email address</Label>
              <Input
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="name@company.com"
              />
            </div>
            <Button
              className="gap-1.5"
              onClick={() => {
                if (!newName || !newEmail) return;
                setRecipients((s) => [...s, { name: newName, email: newEmail }]);
                setNewName("");
                setNewEmail("");
              }}
            >
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setRecipientsQuote(null)}>
              Cancel
            </Button>
            <Button onClick={() => setRecipientsQuote(null)}>Save recipients</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Quotes;
