import { Fragment, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight, ChevronsUpDown, TreePine } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PrivacyInfo } from "@/components/giftcards/PrivacyInfo";
import { cn } from "@/lib/utils";
import { CO2E_PER_TREE, PRICE_PER_TREE, formatUsd } from "@/components/giftcards/types";

/* ---------------- Mock data ---------------- */

const ORDER = { cards: 24, trees: 56 };

/** Mocked from Organisation Management — "card" or "invoice". */
const ORGANISATION = {
  name: "Zeero Events",
  paymentMethod: "card" as "card" | "invoice",
  billing: {
    line1: "18 Marina Court",
    line2: "",
    city: "Valletta",
    postcode: "VLT 1234",
    country: "Malta",
  },
};

const COUNTRIES = [
  "Australia", "Austria", "Belgium", "Canada", "Denmark", "Finland", "France", "Germany",
  "Greece", "Ireland", "Italy", "Malta", "Netherlands", "New Zealand", "Norway", "Poland",
  "Portugal", "Spain", "Sweden", "Switzerland", "United Arab Emirates", "United Kingdom",
  "United States",
];

const STEPS: { label: string; to?: string }[] = [
  { label: "Create cards", to: "/gift-cards" },
  { label: "Your cards", to: "/gift-cards/cards" },
  { label: "Pay & send" },
];

const PREVIEW_CARDS = [
  { email: "amelia.hughes@example.com", from: "Zeero Events", trees: 3, message: "Thank you for joining us at the Annual Summit. We have planted trees in your name as a small thank you for helping us keep the event low carbon." },
  { email: "james.ward@example.com", from: "Zeero Events", trees: 2, message: "A little something from all of us — trees planted in your name to offset your journey to the conference." },
  { email: "priya.nair@example.com", from: "Zeero Events", trees: 2, message: "Season's greetings from the team. Instead of a card, we planted trees in your honour this year." },
];

/* ---------------- Page ---------------- */

type BillingField = "line1" | "city" | "postcode" | "country";

const GiftCardsCheckout = () => {
  const navigate = useNavigate();

  const [billing, setBilling] = useState({ ...ORGANISATION.billing });
  const [saveDefault, setSaveDefault] = useState(true);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [countryOpen, setCountryOpen] = useState(false);

  const [payment, setPayment] = useState({ number: "", expiry: "", cvc: "", name: "" });
  const [poNumber, setPoNumber] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const totalCost = ORDER.trees * PRICE_PER_TREE;
  const co2 = ORDER.trees * CO2E_PER_TREE;

  const billingErrors = useMemo(() => {
    const e: Partial<Record<BillingField, string>> = {};
    if (!billing.line1.trim()) e.line1 = "Address line 1 is required";
    if (!billing.city.trim()) e.city = "City is required";
    if (!billing.postcode.trim()) e.postcode = "Post/ZIP code is required";
    if (!billing.country.trim()) e.country = "Country is required";
    return e;
  }, [billing]);

  const paymentErrors = useMemo(() => {
    if (ORGANISATION.paymentMethod !== "card") return {} as Record<string, string>;
    const e: Record<string, string> = {};
    const digits = payment.number.replace(/\s/g, "");
    if (!/^\d{13,19}$/.test(digits)) e.number = "Enter a valid card number";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiry.trim())) e.expiry = "Use MM/YY";
    if (!/^\d{3,4}$/.test(payment.cvc.trim())) e.cvc = "3 or 4 digits";
    if (!payment.name.trim()) e.name = "Name on card is required";
    return e;
  }, [payment]);

  const canCheckout =
    Object.keys(billingErrors).length === 0 && Object.keys(paymentErrors).length === 0;

  const markTouched = (key: string) => setTouched((t) => ({ ...t, [key]: true }));
  const errorFor = (key: string, errors: Record<string, string | undefined>) =>
    touched[key] ? errors[key] : undefined;

  const FieldError = ({ message }: { message?: string }) =>
    message ? <p className="mt-1 text-xs text-destructive">{message}</p> : null;

  const Req = () => <span className="text-destructive"> *</span>;

  const previewCard = PREVIEW_CARDS[previewIndex];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Gift Cards" subtitle="Send trees as a gift — one recipient or thousands" />

        <main className="flex-1 overflow-auto px-8 pb-12 pt-8">
          <div className="mx-auto max-w-6xl space-y-6">
            {/* Header block */}
            <div className="mx-auto max-w-3xl space-y-2 text-center">
              <div className="flex justify-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <TreePine className="h-5 w-5" />
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Give a gift of planting a tree for our planet
              </h1>
              <p className="text-sm text-foreground">
                Price per tree US$3.50 — put as many trees in a card as you wish.
              </p>
              <p className="text-xs text-muted-foreground">
                Every tree we plant comes with a United Nations certified investment in renewable energy.
              </p>
            </div>

            {/* Stepper */}
            <div className="mx-auto flex max-w-[720px] items-center pb-2">
              {STEPS.map((step, i) => {
                const state = i < 2 ? "done" : "current";
                const circle = (
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
                      "border-primary bg-primary text-primary-foreground",
                    )}
                  >
                    {state === "done" ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                );
                const label = (
                  <span
                    className={cn(
                      "whitespace-nowrap text-sm",
                      state === "current" ? "font-semibold text-foreground" : "text-foreground",
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
                    {i < STEPS.length - 1 && <span className="mx-3 h-px flex-1 bg-primary" />}
                  </Fragment>
                );
              })}
            </div>

            {/* Panels */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Summary */}
              <Card className="shadow-sm">
                <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
                  <h2 className="text-sm font-semibold text-foreground">Summary</h2>
                  <button
                    type="button"
                    onClick={() => navigate("/gift-cards/cards")}
                    className="text-xs font-medium text-primary underline underline-offset-2 hover:opacity-80"
                  >
                    Edit cards
                  </button>
                </div>
                <CardContent className="p-5">
                  <dl className="space-y-3 text-sm">
                    {[
                      ["Total cards", String(ORDER.cards)],
                      ["Total trees", String(ORDER.trees)],
                      ["Price per tree", formatUsd(PRICE_PER_TREE)],
                      ["Estimated CO2", `${co2.toFixed(2)} t`],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between gap-4">
                        <dt className="text-muted-foreground">{label}</dt>
                        <dd className="font-medium text-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <Separator className="my-4" />
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">{formatUsd(totalCost)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Billing address */}
              <Card className="shadow-sm">
                <div className="border-b border-border/60 px-5 py-3">
                  <h2 className="text-sm font-semibold text-foreground">Billing address</h2>
                  <p className="text-xs text-muted-foreground">Prefilled from your company profile</p>
                </div>
                <CardContent className="space-y-4 p-5">
                  <div>
                    <Label htmlFor="line1">
                      Address line 1<Req />
                    </Label>
                    <Input
                      id="line1"
                      value={billing.line1}
                      onChange={(e) => setBilling((b) => ({ ...b, line1: e.target.value }))}
                      onBlur={() => markTouched("line1")}
                      className="mt-1.5"
                      aria-invalid={!!errorFor("line1", billingErrors)}
                    />
                    <FieldError message={errorFor("line1", billingErrors)} />
                  </div>
                  <div>
                    <Label htmlFor="line2">Address line 2</Label>
                    <Input
                      id="line2"
                      value={billing.line2}
                      onChange={(e) => setBilling((b) => ({ ...b, line2: e.target.value }))}
                      className="mt-1.5"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="city">
                        City<Req />
                      </Label>
                      <Input
                        id="city"
                        value={billing.city}
                        onChange={(e) => setBilling((b) => ({ ...b, city: e.target.value }))}
                        onBlur={() => markTouched("city")}
                        className="mt-1.5"
                        aria-invalid={!!errorFor("city", billingErrors)}
                      />
                      <FieldError message={errorFor("city", billingErrors)} />
                    </div>
                    <div>
                      <Label htmlFor="postcode">
                        Post/ZIP code<Req />
                      </Label>
                      <Input
                        id="postcode"
                        value={billing.postcode}
                        onChange={(e) => setBilling((b) => ({ ...b, postcode: e.target.value }))}
                        onBlur={() => markTouched("postcode")}
                        className="mt-1.5"
                        aria-invalid={!!errorFor("postcode", billingErrors)}
                      />
                      <FieldError message={errorFor("postcode", billingErrors)} />
                    </div>
                  </div>
                  <div>
                    <Label>
                      Country<Req />
                    </Label>
                    <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={countryOpen}
                          className="mt-1.5 w-full justify-between font-normal"
                          onBlur={() => markTouched("country")}
                        >
                          {billing.country || "Select country"}
                          <ChevronsUpDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search country" />
                          <CommandList>
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                              {COUNTRIES.map((c) => (
                                <CommandItem
                                  key={c}
                                  value={c}
                                  onSelect={() => {
                                    setBilling((b) => ({ ...b, country: c }));
                                    setCountryOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      billing.country === c ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {c}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FieldError message={errorFor("country", billingErrors)} />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Checkbox
                      id="save-default"
                      checked={saveDefault}
                      onCheckedChange={(v) => setSaveDefault(v === true)}
                    />
                    <Label htmlFor="save-default" className="text-sm font-normal text-muted-foreground">
                      Save this as our default billing address
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment */}
            <Card className="shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-5 py-3">
                <h2 className="text-sm font-semibold text-foreground">Payment</h2>
                {/* TEMPORARY DEMO SCAFFOLDING — remove once Organisation Management provides paymentMethod */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Demo: view as</span>
                  <div className="flex rounded-md border border-border p-0.5">
                    {(["invoice", "card"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPaymentMethod(m)}
                        className={cn(
                          "rounded px-2.5 py-1 text-xs font-medium capitalize transition-colors",
                          paymentMethod === m
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                {paymentMethod === "card" ? (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="lg:col-span-2">
                        <Label htmlFor="card-number">
                          Card number<Req />
                        </Label>
                        <div className="relative mt-1.5">
                          <Input
                            id="card-number"
                            inputMode="numeric"
                            placeholder="1234 5678 9012 3456"
                            value={payment.number}
                            onChange={(e) => setPayment((p) => ({ ...p, number: e.target.value }))}
                            onBlur={() => markTouched("number")}
                            className="pr-28"
                            aria-invalid={!!errorFor("number", paymentErrors)}
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center gap-1">
                            {(["Visa", "MC", "Amex"] as const).map((brand) => (
                              <span
                                key={brand}
                                className={cn(
                                  "rounded border px-1.5 py-0.5 text-[10px] font-semibold transition-colors",
                                  detectedBrand === brand
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border text-muted-foreground/50"
                                )}
                              >
                                {brand}
                              </span>
                            ))}
                          </div>
                        </div>
                        <FieldError message={errorFor("number", paymentErrors)} />
                      </div>
                      <div>
                        <Label htmlFor="card-expiry">
                          Expiry<Req />
                        </Label>
                        <Input
                          id="card-expiry"
                          placeholder="MM/YY"
                          value={payment.expiry}
                          onChange={(e) => setPayment((p) => ({ ...p, expiry: e.target.value }))}
                          onBlur={() => markTouched("expiry")}
                          className="mt-1.5"
                          aria-invalid={!!errorFor("expiry", paymentErrors)}
                        />
                        <FieldError message={errorFor("expiry", paymentErrors)} />
                      </div>
                      <div>
                        <Label htmlFor="card-cvc">
                          CVC<Req />
                        </Label>
                        <Input
                          id="card-cvc"
                          placeholder="123"
                          value={payment.cvc}
                          onChange={(e) => setPayment((p) => ({ ...p, cvc: e.target.value }))}
                          onBlur={() => markTouched("cvc")}
                          className="mt-1.5"
                          aria-invalid={!!errorFor("cvc", paymentErrors)}
                        />
                        <FieldError message={errorFor("cvc", paymentErrors)} />
                      </div>
                      <div className="sm:col-span-2 lg:col-span-4">
                        <Label htmlFor="card-name">
                          Name on card<Req />
                        </Label>
                        <Input
                          id="card-name"
                          value={payment.name}
                          onChange={(e) => setPayment((p) => ({ ...p, name: e.target.value }))}
                          onBlur={() => markTouched("name")}
                          className="mt-1.5 sm:max-w-sm"
                          aria-invalid={!!errorFor("name", paymentErrors)}
                        />
                        <FieldError message={errorFor("name", paymentErrors)} />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Payments are processed securely by our payment provider. We do not store your
                      card details.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 rounded-lg bg-muted/50 px-4 py-3">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">You will be invoiced</p>
                        <p className="text-xs text-muted-foreground">
                          30 day payment terms · Invoice sent to accounts@softwarecom.co.uk
                        </p>
                      </div>
                    </div>
                    <div className="sm:max-w-sm">
                      <Label htmlFor="po">PO number (optional)</Label>
                      <Input
                        id="po"
                        maxLength={50}
                        value={poNumber}
                        onChange={(e) => setPoNumber(e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your organisation is set up for invoiced billing. Contact your admin to change
                      this.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </main>

        {/* Sticky action bar */}
        <div className="border-t border-border bg-card shadow-[0_-2px_8px_hsl(var(--foreground)/0.06)]">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-8 py-3">
            <div>
              <p className="text-xs text-muted-foreground">
                {ORDER.cards} cards · {ORDER.trees} trees
              </p>
              <p className="text-lg font-bold text-foreground">Total {formatUsd(totalCost)}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" onClick={() => navigate("/gift-cards/cards")}>
                Previous
              </Button>
              <Button variant="outline" onClick={() => { setPreviewIndex(0); setPreviewOpen(true); }}>
                Preview your card
              </Button>
              <Button disabled={!canCheckout}>Checkout</Button>
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

          <div className="overflow-hidden rounded-lg border border-border">
            <div className="h-32 w-full bg-gradient-to-br from-primary/80 to-primary" />
            <div className="space-y-3 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {previewCard.from}
              </p>
              <p className="text-sm text-foreground">{previewCard.message}</p>
              <Separator />
              <p className="text-sm font-medium text-foreground">
                {previewCard.trees} trees planted in your name
              </p>
              <p className="text-xs text-muted-foreground">To: {previewCard.email}</p>
            </div>
          </div>

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
              Card {previewIndex + 1} of {PREVIEW_CARDS.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next card"
              disabled={previewIndex >= PREVIEW_CARDS.length - 1}
              onClick={() => setPreviewIndex((i) => Math.min(PREVIEW_CARDS.length - 1, i + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GiftCardsCheckout;
