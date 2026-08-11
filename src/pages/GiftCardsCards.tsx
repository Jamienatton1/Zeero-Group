import { Fragment, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Eye,
  Info,
  Search,
  Check,
  TreePine,
  Trash2,





} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { PRICE_PER_TREE, formatUsd, uid } from "@/components/giftcards/types";
import { PrivacyInfo } from "@/components/giftcards/PrivacyInfo";

interface CardRow {
  id: string;
  email: string;
  message: string;
  fromCompany: string;
  fromEmail: string;
  trees: number;
}

const NAMES = [
  "amelia.hughes", "james.ward", "priya.nair", "lucas.moreau", "sofia.rossi",
  "noah.becker", "grace.oconnor", "hiro.tanaka", "elena.petrova", "daniel.smith",
  "maya.patel", "oliver.grant", "clara.mendes", "felix.jansen", "ines.duarte",
  "tom.harris", "yara.haddad", "erik.lund", "nina.kowalski", "sam.reilly",
  "leah.brooks", "marco.bianchi", "zoe.fletcher", "adam.novak",
];

const MESSAGES = [
  "Thank you for joining us at the Annual Summit. We have planted trees in your name as a small thank you for helping us keep the event low carbon.",
  "A little something from all of us — trees planted in your name to offset your journey to the conference.",
  "Season's greetings from the team. Instead of a card, we planted trees in your honour this year.",
  "Thanks for a brilliant year of partnership. These trees are planted in your name as our way of saying thank you.",
];

const STEPS: { label: string; to?: string }[] = [
  { label: "Create cards", to: "/gift-cards" },
  { label: "Your cards" },
  { label: "Pay & send" },
];

const MOCK_CARDS: CardRow[] = NAMES.map((n, i) => ({
  id: uid(),
  email: `${n}@example.com`,
  message: MESSAGES[i % MESSAGES.length],
  fromCompany: "Zeero Events",
  fromEmail: "gifts@zeerogroup.com",
  trees: i % 3 === 0 ? 3 : 2,
}));

type SortKey = keyof Omit<CardRow, "id">;

const GiftCardsCards = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<CardRow[]>(MOCK_CARDS);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("email");
  const [sortAsc, setSortAsc] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<CardRow | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const rows = q
      ? cards.filter((c) =>
          [c.email, c.message, c.fromCompany, c.fromEmail, String(c.trees)]
            .join(" ")
            .toLowerCase()
            .includes(q),
        )
      : cards;
    return [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortAsc ? cmp : -cmp;
    });
  }, [cards, search, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  const totalTrees = cards.reduce((s, c) => s + (Number(c.trees) || 0), 0);
  const totalCost = totalTrees * PRICE_PER_TREE;

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const updateCard = (id: string, patch: Partial<CardRow>) =>
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const openPreviewFor = (id: string) => {
    const idx = cards.findIndex((c) => c.id === id);
    setPreviewIndex(Math.max(0, idx));
    setPreviewOpen(true);
  };

  const SortHead = ({ label, sortField, className }: { label: string; sortField: SortKey; className?: string }) => (
    <TableHead className={className}>
      <button
        type="button"
        onClick={() => toggleSort(sortField)}
        className={cn(
          "inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground",
          className?.includes("text-right") && "flex-row-reverse",
        )}
      >
        {label}
        {sortKey === sortField ? (
          sortAsc ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3 opacity-30" />
        )}
      </button>
    </TableHead>
  );

  const previewCard = cards[Math.min(previewIndex, Math.max(0, cards.length - 1))];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Gift Cards" subtitle="Send trees as a gift — one recipient or thousands" />

        <main className="flex-1 overflow-auto px-8 pb-32 pt-8">
          <div className="mx-auto max-w-6xl space-y-4">
            {/* Hero */}
            <div className="overflow-hidden rounded-xl border border-border bg-primary/5">
              <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <TreePine className="h-5 w-5" />
                  </span>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                      Give A Gift Of Planting A Tree For Our Planet
                    </h1>
                    <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                      Review your cards, edit any details, then continue to checkout.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-6 rounded-lg border border-border bg-card px-5 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Cards</p>
                    <p className="text-lg font-bold text-foreground">{cards.length}</p>
                  </div>
                  <Separator orientation="vertical" className="h-auto" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Trees</p>
                    <p className="text-lg font-bold text-foreground">{totalTrees}</p>
                  </div>
                  <Separator orientation="vertical" className="h-auto" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Total</p>
                    <p className="text-lg font-bold text-primary">{formatUsd(totalCost)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper */}
            <div className="mx-auto flex max-w-[720px] items-center pb-2">
              {STEPS.map((step, i) => {
                const state = i < 1 ? "done" : i === 1 ? "current" : "todo";
                const circle = (
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
                      state === "todo"
                        ? "border-border bg-transparent text-muted-foreground"
                        : "border-primary bg-primary text-primary-foreground",
                    )}
                  >
                    {state === "done" ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                );
                const label = (
                  <span
                    className={cn(
                      "text-sm whitespace-nowrap",
                      state === "current"
                        ? "font-semibold text-foreground"
                        : state === "done"
                          ? "text-foreground"
                          : "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </span>
                );
                return (
                  <Fragment key={step.label}>
                    {state === "done" && step.to ? (
                      <button
                        type="button"
                        onClick={() => navigate(step.to!)}
                        className="flex items-center gap-2 rounded-md transition-opacity hover:opacity-80"
                      >
                        {circle}
                        {label}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        {circle}
                        {label}
                      </div>
                    )}
                    {i < STEPS.length - 1 && (
                      <span
                        className={cn(
                          "mx-3 h-px flex-1",
                          i === 0 ? "bg-primary" : "bg-border",
                        )}
                      />
                    )}
                  </Fragment>
                );
              })}
            </div>

            <Card className="shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-foreground">Your cards</h2>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {cards.length}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Show</span>
                    <Select
                      value={String(pageSize)}
                      onValueChange={(v) => {
                        setPageSize(Number(v));
                        setPage(1);
                      }}
                    >
                      <SelectTrigger className="h-8 w-[72px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[10, 25, 50, 100].map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span>entries</span>
                  </div>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                      }}
                      placeholder="Search cards"
                      className="h-8 w-56 pl-8"
                    />
                  </div>
                </div>
              </div>


              <CardContent className="p-0">
                {cards.length === 0 ? (
                  <div className="flex flex-col items-center gap-3 py-16 text-center">
                    <p className="text-sm font-medium text-foreground">No cards yet</p>
                    <p className="text-sm text-muted-foreground">
                      All cards have been removed from this order.
                    </p>
                    <Button variant="outline" onClick={() => navigate("/gift-cards")}>
                      Back to Send cards
                    </Button>
                  </div>
                ) : (
                  <TooltipProvider delayDuration={100}>
                    <Table className="table-fixed">
                      <TableHeader>
                        <TableRow className="border-border/60 hover:bg-transparent">
                          <SortHead label="To email" sortField="email" className="w-[22%]" />
                          <SortHead label="Message" sortField="message" className="w-[40%]" />
                          <SortHead label="From" sortField="fromCompany" className="w-[20%]" />
                          <SortHead label="Trees" sortField="trees" className="w-[10%] text-right" />
                          <TableHead className="w-[8%] text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pageRows.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                              No cards match “{search}”.
                            </TableCell>
                          </TableRow>
                        )}
                        {pageRows.map((row) => (
                          <Fragment key={row.id}>
                            <TableRow
                              className="cursor-pointer border-border/60 transition-colors hover:bg-muted/50"
                              onClick={() => setExpandedId((id) => (id === row.id ? null : row.id))}
                            >
                              <TableCell className="py-4 text-sm font-medium text-foreground">
                                <span className="block truncate">{row.email}</span>
                              </TableCell>
                              <TableCell className="py-4 text-sm text-muted-foreground">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="block truncate">{row.message}</span>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="max-w-sm">
                                    {row.message}
                                  </TooltipContent>
                                </Tooltip>
                              </TableCell>
                              <TableCell className="py-4">
                                <span className="block truncate text-sm text-foreground">{row.fromCompany}</span>
                                <span className="block truncate text-xs text-muted-foreground">{row.fromEmail}</span>
                              </TableCell>
                              <TableCell className="py-4 text-right">
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                  {row.trees} {row.trees === 1 ? "tree" : "trees"}
                                </span>
                              </TableCell>
                              <TableCell className="py-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                                        aria-label="Preview card"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openPreviewFor(row.id);
                                        }}
                                      >
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Preview card</TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                        aria-label="Remove card"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setPendingDelete(row);
                                        }}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Remove card</TooltipContent>
                                  </Tooltip>
                                </div>
                              </TableCell>
                            </TableRow>

                            {expandedId === row.id && (
                              <TableRow className="border-border/60 bg-muted/40 hover:bg-muted/40">
                                <TableCell colSpan={5} className="p-4">

                                  <div className="grid gap-4 md:grid-cols-[2fr_120px]">
                                    <div className="space-y-1.5">
                                      <Label className="text-xs">Recipient email</Label>
                                      <Input
                                        value={row.email}
                                        onChange={(e) => updateCard(row.id, { email: e.target.value })}
                                      />
                                    </div>
                                    <div className="space-y-1.5">
                                      <Label className="text-xs">Trees</Label>
                                      <Input
                                        type="number"
                                        min={1}
                                        value={row.trees}
                                        onChange={(e) =>
                                          updateCard(row.id, { trees: Math.max(1, Number(e.target.value) || 1) })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-1.5 md:col-span-2">
                                      <Label className="text-xs">Message</Label>
                                      <Textarea
                                        rows={3}
                                        value={row.message}
                                        onChange={(e) => updateCard(row.id, { message: e.target.value })}
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-3 flex justify-end">
                                    <Button variant="outline" size="sm" onClick={() => setExpandedId(null)}>
                                      Done
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TooltipProvider>
                )}
              </CardContent>

              {cards.length > 0 && (
                <>
                  <Separator />
                  <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <p className="text-sm text-muted-foreground">
                      Showing {filtered.length === 0 ? 0 : start + 1} to{" "}
                      {Math.min(start + pageSize, filtered.length)} of {filtered.length} entries
                    </p>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                      >
                        Previous
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <Button
                          key={n}
                          variant={n === currentPage ? "default" : "outline"}
                          size="sm"
                          className="w-9"
                          onClick={() => setPage(n)}
                        >
                          {n}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Card>

          </div>
        </main>

        {/* Sticky action bar */}
        <div className="border-t border-border bg-card shadow-[0_-2px_8px_hsl(var(--foreground)/0.06)]">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-8 py-3">
            <div>
              <p className="text-xs text-muted-foreground">
                {cards.length} {cards.length === 1 ? "card" : "cards"} · {totalTrees} trees
              </p>
              <p className="text-lg font-bold text-foreground">Total {formatUsd(totalCost)}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" onClick={() => navigate("/gift-cards")}>
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={cards.length === 0}
                onClick={() => {
                  setPreviewIndex(0);
                  setPreviewOpen(true);
                }}
              >
                Preview your card
              </Button>
              <Button disabled={cards.length === 0} onClick={() => navigate("/gift-cards/checkout")}>
                Next
              </Button>
              <PrivacyInfo />
            </div>
          </div>
        </div>
      </div>


      {/* Preview modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Card preview</DialogTitle>
          </DialogHeader>

          {previewCard && (
            <div className="overflow-hidden rounded-lg border border-border">
              <div className="h-32 w-full bg-gradient-to-br from-primary/80 to-primary" />
              <div className="space-y-3 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {previewCard.fromCompany}
                </p>
                <p className="text-sm text-foreground">{previewCard.message}</p>
                <Separator />
                <p className="text-sm font-medium text-foreground">
                  {previewCard.trees} {previewCard.trees === 1 ? "tree" : "trees"} planted in your name
                </p>
                <p className="text-xs text-muted-foreground">To: {previewCard.email}</p>
              </div>
            </div>
          )}

          {cards.length > 1 && (
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous card"
                disabled={previewIndex === 0}
                onClick={() => setPreviewIndex((i) => Math.max(0, i - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Card {previewIndex + 1} of {cards.length}
              </span>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next card"
                disabled={previewIndex >= cards.length - 1}
                onClick={() => setPreviewIndex((i) => Math.min(cards.length - 1, i + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this card?</AlertDialogTitle>
            <AlertDialogDescription>
              The card for {pendingDelete?.email} will be removed from this order and the totals updated.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingDelete) {
                  setCards((prev) => prev.filter((c) => c.id !== pendingDelete.id));
                  setExpandedId(null);
                }
                setPendingDelete(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GiftCardsCards;
