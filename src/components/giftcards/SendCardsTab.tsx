import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Quote,
  Plus,
  Trash2,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  Circle,
  Image as ImageIcon,
  Type,
  Clock,
  Send,
  Info,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import {
  CO2E_PER_TREE,
  CsvRow,
  PRICE_PER_TREE,
  Recipient,
  formatUsd,
  isValidEmail,
  uid,
} from "./types";

export const STOCK_DESIGNS = [
  { id: "forest", name: "Forest Canopy", swatch: "bg-gradient-hero" },
  { id: "sapling", name: "New Sapling", swatch: "bg-accent" },
  { id: "meadow", name: "Meadow Light", swatch: "bg-primary" },
  { id: "roots", name: "Deep Roots", swatch: "bg-sidebar-dark" },
];

const SEND_TIMES = ["08:00", "09:00", "12:00", "15:00", "18:00"];

/* ------------------------------------------------------------------ */
/* Panel heading                                                       */
/* ------------------------------------------------------------------ */
function PanelHeader({ step, title, hint }: { step: number; title: string; hint?: string }) {
  return (
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center gap-3 text-lg">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {step}
        </span>
        {title}
      </CardTitle>
      {hint && <p className="pl-10 text-sm text-muted-foreground">{hint}</p>}
    </CardHeader>
  );
}

/* ------------------------------------------------------------------ */
/* Panel 1 — recipients                                                */
/* ------------------------------------------------------------------ */
function OneByOne({
  rows,
  setRows,
  activeId,
  setActiveId,
  onSwitchToCsv,
}: {
  rows: Recipient[];
  setRows: (r: Recipient[]) => void;
  activeId: string;
  setActiveId: (id: string) => void;
  onSwitchToCsv: () => void;
}) {
  const update = (id: string, patch: Partial<Recipient>) =>
    setRows(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const handleEmailChange = (id: string, value: string) => {
    const parts = value.split(/[\s,;]+/).filter(Boolean);
    if (parts.length > 1) {
      const index = rows.findIndex((r) => r.id === id);
      const base = rows[index];
      const created = parts.map((email) => ({
        id: uid(),
        email,
        trees: base.trees,
        message: base.message,
      }));
      setRows([...rows.slice(0, index), ...created, ...rows.slice(index + 1)]);
      setActiveId(created[created.length - 1].id);
      return;
    }
    update(id, { email: value, error: undefined });
  };

  const remove = (id: string) => {
    const next = rows.filter((r) => r.id !== id);
    setRows(next);
    if (activeId === id) setActiveId(next[next.length - 1].id);
  };

  const addCard = () => {
    const previous = rows[rows.length - 1];
    const created: Recipient = {
      id: uid(),
      email: "",
      trees: 1,
      message: previous?.message ?? "",
    };
    setRows([...rows, created]);
    setActiveId(created.id);
  };

  return (
    <div className="space-y-3">
      {rows.map((row, index) => {
        const expanded = row.id === activeId;

        if (!expanded) {
          return (
            <div
              key={row.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2"
            >
              <p className="truncate text-sm text-foreground">
                <span className="font-medium">Card {index + 1}</span>
                <span className="text-muted-foreground">
                  {" · "}
                  {row.email || "No email yet"}
                  {" · "}
                  {row.trees} {row.trees === 1 ? "tree" : "trees"}
                </span>
              </p>
              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8" onClick={() => setActiveId(row.id)}>
                  <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label={`Delete card ${index + 1}`}
                  disabled={rows.length === 1}
                  onClick={() => remove(row.id)}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          );
        }

        return (
          <div key={row.id} className="space-y-4 rounded-lg border border-primary bg-primary/[0.03] p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Card {index + 1}</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label={`Delete card ${index + 1}`}
                disabled={rows.length === 1}
                onClick={() => remove(row.id)}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>

            <div>
              <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Recipient email
              </Label>
              <Input
                type="email"
                placeholder="name@company.com"
                value={row.email}
                onChange={(e) => handleEmailChange(row.id, e.target.value)}
                onBlur={() =>
                  update(row.id, {
                    error:
                      row.email.trim() && !isValidEmail(row.email)
                        ? "Not a valid email address"
                        : undefined,
                  })
                }
                className={cn(row.error && "border-destructive focus-visible:ring-destructive")}
              />
              {row.error && <p className="mt-1 text-xs text-destructive">{row.error}</p>}
            </div>

            <div className="sm:max-w-[160px]">
              <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Trees
              </Label>
              <Input
                type="number"
                min={1}
                value={row.trees}
                onChange={(e) => update(row.id, { trees: Math.max(1, Number(e.target.value) || 1) })}
              />
            </div>

            <div>
              <Label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Message
              </Label>
              <MessageEditor
                key={row.id}
                value={row.message}
                onChange={(html) => update(row.id, { message: html })}
              />
            </div>
          </div>
        );
      })}

      <Button variant="outline" size="sm" onClick={addCard}>
        <Plus className="mr-1.5 h-4 w-4" /> Add another card
      </Button>

      {rows.length > 10 && (
        <p className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4 shrink-0" />
          Sending to a lot of people?{" "}
          <button className="font-medium text-primary underline-offset-2 hover:underline" onClick={onSwitchToCsv}>
            Upload a CSV instead
          </button>
        </p>
      )}
    </div>
  );
}

const validateCsvRow = (row: Omit<CsvRow, "errors">): CsvRow => {
  const errors: CsvRow["errors"] = {};
  if (!row.email.trim()) errors.email = "Email is required";
  else if (!isValidEmail(row.email)) errors.email = "Not a valid email address";
  const trees = Number(row.trees);
  if (!row.trees.trim() || !Number.isInteger(trees) || trees < 1)
    errors.trees = "Trees must be a whole number";
  return { ...row, errors };
};

const MOCK_CSV: CsvRow[] = [
  { email: "amina.khan@northwind.com", name: "Amina Khan", trees: "5", message: "" },
  { email: "tom.reilly@northwind.com", name: "Tom Reilly", trees: "5", message: "Thanks Tom!" },
  { email: "sara.blake@northwind", name: "Sara Blake", trees: "3", message: "" },
  { email: "", name: "Unknown", trees: "2", message: "" },
  { email: "jo.moss@northwind.com", name: "Jo Moss", trees: "two", message: "" },
  { email: "dev.patel@northwind.com", name: "Dev Patel", trees: "10", message: "" },
  { email: "lena.fischer@northwind.com", name: "Lena Fischer", trees: "4", message: "" },
].map((r) => validateCsvRow({ ...r, id: uid() }));

function CsvMode({
  rows,
  setRows,
  onSwitchToManual,
}: {
  rows: CsvRow[];
  setRows: (r: CsvRow[]) => void;
  onSwitchToManual: () => void;
}) {
  const [dragging, setDragging] = useState(false);

  const load = () => {
    setRows(MOCK_CSV.map((r) => ({ ...r, id: uid() })));
    toast({ title: "CSV parsed", description: "7 rows read, 3 duplicate emails merged." });
  };

  const ready = rows.filter((r) => !r.skipped && Object.keys(r.errors).length === 0).length;
  const broken = rows.filter((r) => !r.skipped && Object.keys(r.errors).length > 0).length;

  const edit = (id: string, key: "email" | "trees", value: string) =>
    setRows(rows.map((r) => (r.id === id ? validateCsvRow({ ...r, [key]: value }) : r)));

  if (rows.length === 0) {
    return (
      <div className="space-y-4">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            load();
          }}
          className={cn(
            "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40 px-6 py-12 text-center transition-colors",
            dragging && "border-primary bg-primary/5"
          )}
        >
          <FileSpreadsheet className="mb-3 h-8 w-8 text-muted-foreground" />
          <p className="font-medium text-foreground">Drop your CSV here</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Columns: email, name, trees, message (message optional and overrides the global one)
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button size="sm" onClick={load}>
              <Upload className="mr-1.5 h-4 w-4" /> Choose file
            </Button>
            <Button size="sm" variant="outline" onClick={() => toast({ title: "Template downloaded" })}>
              <Download className="mr-1.5 h-4 w-4" /> Download template
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Only a handful of people?{" "}
          <button className="font-medium text-primary underline-offset-2 hover:underline" onClick={onSwitchToManual}>
            Add them one by one
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-primary/10 text-primary hover:bg-primary/10">{ready} rows ready</Badge>
        <Badge
          className={cn(
            "bg-destructive/10 text-destructive hover:bg-destructive/10",
            broken === 0 && "bg-muted text-muted-foreground hover:bg-muted"
          )}
        >
          {broken} rows need fixing
        </Badge>
        <Badge variant="secondary">3 duplicate emails merged</Badge>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead className="w-[160px]">Name</TableHead>
              <TableHead className="w-[110px]">Trees</TableHead>
              <TableHead className="w-[110px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.slice(0, 10).map((row) => {
              const bad = Object.keys(row.errors).length > 0 && !row.skipped;
              return (
                <TableRow key={row.id} className={cn(bad && "bg-destructive/5")}>
                  <TableCell className="align-top">
                    <Input
                      value={row.email}
                      onChange={(e) => edit(row.id, "email", e.target.value)}
                      className={cn("h-8", row.errors.email && !row.skipped && "border-destructive")}
                    />
                    {row.errors.email && !row.skipped && (
                      <p className="mt-1 text-xs text-destructive">{row.errors.email}</p>
                    )}
                  </TableCell>
                  <TableCell className="align-top text-sm text-muted-foreground">{row.name || "—"}</TableCell>
                  <TableCell className="align-top">
                    <Input
                      value={row.trees}
                      onChange={(e) => edit(row.id, "trees", e.target.value)}
                      className={cn("h-8", row.errors.trees && !row.skipped && "border-destructive")}
                    />
                    {row.errors.trees && !row.skipped && (
                      <p className="mt-1 text-xs text-destructive">{row.errors.trees}</p>
                    )}
                  </TableCell>
                  <TableCell className="align-top">
                    {row.skipped ? (
                      <Badge variant="secondary">Skipped</Badge>
                    ) : bad ? (
                      <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/10">Needs fixing</Badge>
                    ) : (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/10">Ready</Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => toast({ title: "Fix the highlighted cells above" })}
          disabled={broken === 0}
        >
          Fix rows in place
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={broken === 0}
          onClick={() =>
            setRows(
              rows.map((r) => (Object.keys(r.errors).length > 0 ? { ...r, skipped: true } : r))
            )
          }
        >
          Skip the {broken} bad rows
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setRows([])}>
          Upload a different file
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Panel 2 — the card                                                  */
/* ------------------------------------------------------------------ */
function MessageEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) ref.current.innerHTML = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const run = (command: string, value?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, value);
    onChange(ref.current?.innerHTML ?? "");
  };

  const insertTag = (tag: string) => {
    ref.current?.focus();
    document.execCommand("insertText", false, tag);
    onChange(ref.current?.innerHTML ?? "");
  };

  return (
    <div className="rounded-lg border border-border">
      <div className="flex flex-wrap items-center gap-1 border-b border-border p-1.5">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => run("bold")} aria-label="Bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => run("italic")} aria-label="Italic">
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => run("formatBlock", "<h3>")}
          aria-label="Heading"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => run("formatBlock", "<blockquote>")}
          aria-label="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-5" />
        {["{{first_name}}", "{{company}}", "{{trees}}"].map((tag) => (
          <Button key={tag} variant="outline" size="sm" className="h-7 px-2 text-xs" onClick={() => insertTag(tag)}>
            {tag}
          </Button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        data-placeholder="Write your message…"
        className="min-h-[140px] px-3 py-2 text-sm text-foreground outline-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main tab                                                            */
/* ------------------------------------------------------------------ */
export default function SendCardsTab() {
  const firstCard = useRef(uid()).current;
  const [mode, setMode] = useState<"manual" | "csv">("manual");
  const [manualRows, setManualRows] = useState<Recipient[]>([
    { id: firstCard, email: "", trees: 1, message: "" },
  ]);
  const [activeCardId, setActiveCardId] = useState(firstCard);
  const [csvRows, setCsvRows] = useState<CsvRow[]>([]);

  const [design, setDesign] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [replyTo, setReplyTo] = useState("events@zeerogroup.com");

  const [delivery, setDelivery] = useState<"now" | "later">("now");
  const [sendDate, setSendDate] = useState("");
  const [sendTime, setSendTime] = useState("09:00");

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const cards = useMemo(() => {
    if (mode === "manual") {
      return manualRows.map((r) => ({ email: r.email, trees: r.trees, message: r.message }));
    }
    return csvRows
      .filter((r) => !r.skipped)
      .map((r) => ({ email: r.email, trees: Number(r.trees) || 0, message: r.message }));
  }, [mode, manualRows, csvRows]);

  const valid = useMemo(() => cards.filter((c) => isValidEmail(c.email)), [cards]);

  const totalTrees = valid.reduce((sum, r) => sum + r.trees, 0);
  const total = totalTrees * PRICE_PER_TREE;
  const blocked =
    mode === "csv" && csvRows.some((r) => !r.skipped && Object.keys(r.errors).length > 0);

  const anyMessage = cards.some((c) => (c.message ?? "").replace(/<[^>]*>/g, "").trim().length > 0);

  const checklist = [
    { label: "Recipients added", done: valid.length > 0 },
    { label: "Design chosen", done: !!design },
    { label: "Message written", done: anyMessage },
    { label: "Delivery set", done: delivery === "now" || !!sendDate },
  ];

  const previewCards = cards.length > 0 ? cards : [{ email: "", trees: 1, message: "" }];
  const current = previewCards[Math.min(previewIndex, previewCards.length - 1)];
  const resolve = (html: string) =>
    (html || "<p class='text-muted-foreground'>Your message appears here…</p>")
      .replace(/\{\{first_name\}\}/g, "Anna")
      .replace(/\{\{company\}\}/g, logo || "Zeero Group")
      .replace(/\{\{trees\}\}/g, String(current.trees));


  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      {/* ---------------- form ---------------- */}
      <div className="space-y-6">
        <Card>
          <PanelHeader step={1} title="Who's receiving?" />
          <CardContent className="space-y-5">
            <div className="inline-flex rounded-lg bg-muted p-1">
              {(
                [
                  ["manual", "Add one by one"],
                  ["csv", "Upload a list (CSV)"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setMode(value)}
                  className={cn(
                    "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                    mode === value
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {mode === "manual" ? (
              <OneByOne
                rows={manualRows}
                setRows={setManualRows}
                activeId={activeCardId}
                setActiveId={setActiveCardId}
                onSwitchToCsv={() => setMode("csv")}
              />
            ) : (
              <CsvMode rows={csvRows} setRows={setCsvRows} onSwitchToManual={() => setMode("manual")} />
            )}
          </CardContent>
        </Card>

        <Card>
          <PanelHeader step={2} title="The card" />
          <CardContent className="space-y-6">
            <div>
              <Label className="mb-2 block text-sm font-medium">Design</Label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {STOCK_DESIGNS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDesign(d.id)}
                    className={cn(
                      "overflow-hidden rounded-lg border-2 text-left transition-colors",
                      design === d.id ? "border-primary" : "border-border hover:border-primary/40"
                    )}
                  >
                    <div className={cn("h-20 w-full", d.swatch)} />
                    <p className="px-2 py-1.5 text-xs font-medium text-foreground">{d.name}</p>
                  </button>
                ))}
                <button
                  onClick={() => setDesign("upload")}
                  className={cn(
                    "flex h-[calc(5rem+30px)] flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed text-xs font-medium text-muted-foreground transition-colors",
                    design === "upload" ? "border-primary text-primary" : "border-border hover:border-primary/40"
                  )}
                >
                  <ImageIcon className="h-5 w-5" />
                  Upload your own
                </button>
                <button
                  onClick={() => setDesign("text")}
                  className={cn(
                    "flex h-[calc(5rem+30px)] flex-col items-center justify-center gap-1 rounded-lg border-2 text-xs font-medium text-muted-foreground transition-colors",
                    design === "text" ? "border-primary text-primary" : "border-border hover:border-primary/40"
                  )}
                >
                  <Type className="h-5 w-5" />
                  No image / text only
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-2 block text-sm font-medium">Company logo (optional)</Label>
                <Button variant="outline" className="w-full justify-start" onClick={() => setLogo("Zeero Group")}>
                  <Upload className="mr-2 h-4 w-4" />
                  {logo ? `${logo} logo uploaded` : "Upload logo"}
                </Button>
              </div>
              <div>
                <Label htmlFor="reply-to" className="mb-2 block text-sm font-medium">
                  Reply-to email
                </Label>
                <Input id="reply-to" type="email" value={replyTo} onChange={(e) => setReplyTo(e.target.value)} />
              </div>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Message</Label>
              <MessageEditor onChange={setMessage} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <PanelHeader step={3} title="Delivery" />
          <CardContent>
            <RadioGroup value={delivery} onValueChange={(v) => setDelivery(v as "now" | "later")} className="space-y-3">
              <label
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                  delivery === "now" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                )}
              >
                <RadioGroupItem value="now" className="mt-0.5" />
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Send className="h-4 w-4" /> Send as soon as I pay
                  </p>
                  <p className="text-sm text-muted-foreground">Cards go out within a few minutes of payment.</p>
                </div>
              </label>

              <label
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                  delivery === "later" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                )}
              >
                <RadioGroupItem value="later" className="mt-0.5" />
                <div className="w-full">
                  <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Clock className="h-4 w-4" /> Schedule for later
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Payment is taken now, delivery happens on the chosen date.
                  </p>
                  {delivery === "later" && (
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="send-date" className="mb-1.5 block text-xs font-medium">
                          Send date
                        </Label>
                        <Input
                          id="send-date"
                          type="date"
                          value={sendDate}
                          onChange={(e) => setSendDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="mb-1.5 block text-xs font-medium">Send time</Label>
                        <Select value={sendTime} onValueChange={setSendTime}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {SEND_TIMES.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      {/* ---------------- summary rail ---------------- */}
      <div className="lg:sticky lg:top-6 lg:self-start">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Preview & summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="overflow-hidden rounded-lg border border-border">
              <div
                className={cn(
                  "h-24 w-full",
                  STOCK_DESIGNS.find((d) => d.id === design)?.swatch ?? "bg-muted"
                )}
              />
              <div className="space-y-2 p-3">
                {logo && (
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{logo}</p>
                )}
                <div
                  className="text-sm text-foreground [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-2 [&_h3]:font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: message || "<p class='text-muted-foreground'>Your message appears here…</p>",
                  }}
                />
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Recipients</span>
                <span className="font-medium text-foreground">{valid.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total trees</span>
                <span className="font-medium text-foreground">{totalTrees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price per tree</span>
                <span className="font-medium text-foreground">{formatUsd(PRICE_PER_TREE)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated CO₂e offset</span>
                <span className="font-medium text-foreground">
                  {(totalTrees * CO2E_PER_TREE).toFixed(2)} t
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold text-foreground">
                <span>Total</span>
                <span>{formatUsd(total)}</span>
              </div>
            </div>

            <div className="rounded-lg bg-muted px-3 py-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payment method</span>
                <button className="text-xs font-medium text-primary hover:underline">Change</button>
              </div>
              <p className="font-medium text-foreground">Invoice (30 days)</p>
              <p className="text-xs text-muted-foreground">Inherited from Organisation Management</p>
            </div>

            <div className="space-y-1.5">
              {checklist.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  {item.done ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={item.done ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Button
                className="w-full"
                disabled={valid.length === 0 || blocked}
                onClick={() => toast({ title: "Order ready to review", description: formatUsd(total) })}
              >
                Review & place order · {formatUsd(total)}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => toast({ title: "Draft saved" })}>
                Save as draft
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Recipient emails are deleted after sending, per GDPR.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
