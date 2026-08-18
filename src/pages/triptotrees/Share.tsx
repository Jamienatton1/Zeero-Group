import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, ShieldCheck, TreePine, Link2 } from "lucide-react";
import { T2TLayout } from "@/components/triptotrees/T2TLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { formatKg, TRIP_TO_TREES_CONFIG } from "@/lib/tripToTrees";
import T4TLogo from "@/assets/T4Tlogo.png";

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

type SentState = null | "for-me" | "myself";

export default function TripToTreesShare() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { trees?: number; kg?: number } };

  const initialTrees = state?.trees ?? 0;
  const [trees, setTrees] = useState(initialTrees);
  const kg = trees * TRIP_TO_TREES_CONFIG.kgCo2ePerTree;

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [name, setName] = useState("");
  const [sent, setSent] = useState<SentState>(null);

  const emailError = useMemo(() => {
    if (!emailTouched) return "";
    if (!email.trim()) return "Enter the traveller's email address.";
    if (!isValidEmail(email)) return "Enter a valid email address.";
    return "";
  }, [email, emailTouched]);

  const canSend = trees > 0 && isValidEmail(email) && name.trim().length > 0;

  if (sent) {
    return (
      <T2TLayout>
        <div className="mx-auto max-w-xl pt-10">
          <Card>
            <CardContent className="p-8 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <CheckCircle2 className="h-6 w-6" aria-hidden />
              </span>
              <h1 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                {sent === "for-me" ? "Email sent to the traveller" : "Your shareable link is on its way"}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {sent === "for-me"
                  ? `We've emailed ${name.trim()} at ${email.trim()} with their ${trees}-tree gift invitation.`
                  : `We've emailed you a 'plant your trees' link for ${name.trim()} to paste into your own email.`}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button onClick={() => navigate("/trip-to-trees")}>Back to overview</Button>
                <Button variant="outline" onClick={() => setSent(null)}>
                  Send another
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </T2TLayout>
    );
  }

  return (
    <T2TLayout>
      <div className="mx-auto max-w-6xl space-y-6 pb-8">
        <Link
          to="/trip-to-trees"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Dashboard
        </Link>

        {/* Header box */}
        <Card className="overflow-hidden border-0 shadow-card">
          <CardContent className="flex flex-col items-center justify-center gap-3 bg-white py-8 text-center">
            <div className="flex items-center gap-3">
              <img src={T4TLogo} alt="Trees4Travel" className="h-12 w-auto" />
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Gift Trees</h1>
            </div>
            <p className="text-lg font-medium text-muted-foreground">Make Travel Planet &amp; People Positive</p>
            <div className="mt-2 h-1 w-40 rounded-full bg-gradient-to-r from-amber-400 to-emerald-600" />
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Composer */}
          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-6 p-6">
                {/* Trees */}
                <div className="grid gap-2 sm:grid-cols-[80px_1fr] sm:items-center">
                  <Label htmlFor="t2t-share-trees" className="text-sm font-bold uppercase tracking-wide text-foreground">
                    Trees:
                  </Label>
                  <div className="space-y-1">
                    <Input
                      id="t2t-share-trees"
                      type="number"
                      min={0}
                      value={trees}
                      onChange={(e) => setTrees(Math.max(0, parseInt(e.target.value || "0", 10)))}
                      className="border-0 border-b border-border bg-transparent px-0 text-lg font-medium shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <p className="text-xs text-muted-foreground">Add how many trees you want to gift.</p>
                  </div>
                </div>

                {/* Email */}
                <div className="grid gap-2 sm:grid-cols-[80px_1fr] sm:items-center">
                  <Label htmlFor="t2t-share-email" className="text-sm font-bold uppercase tracking-wide text-foreground">
                    Email:
                  </Label>
                  <div className="space-y-1">
                    <Input
                      id="t2t-share-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setEmailTouched(true)}
                      aria-invalid={!!emailError}
                      aria-describedby="t2t-share-email-error"
                      placeholder="john_smith@trees4travel.com"
                      className="border-0 border-b border-border bg-transparent px-0 text-lg font-medium shadow-none placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <p
                      id="t2t-share-email-error"
                      role="alert"
                      className={cn("text-xs text-destructive", !emailError && "sr-only")}
                    >
                      {emailError}
                    </p>
                    <p className={cn("text-xs text-muted-foreground", emailError && "sr-only")}>Add your client's email.</p>
                  </div>
                </div>

                {/* To / Salutation */}
                <div className="grid gap-2 sm:grid-cols-[80px_1fr] sm:items-center">
                  <Label htmlFor="t2t-share-name" className="text-sm font-bold uppercase tracking-wide text-foreground">
                    To:
                  </Label>
                  <div className="space-y-1">
                    <Input
                      id="t2t-share-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dear Mr. Harold"
                      className="border-0 border-b border-border bg-transparent px-0 text-lg font-medium shadow-none placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <p className="text-xs text-muted-foreground">Add a salutation for your client.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy note */}
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-sm">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
              <p className="text-sm leading-relaxed text-foreground">
                Please be assured we would never market to or keep your travellers email information unless they agree to receive our newsletters after the purchase of any trees.
              </p>
            </div>

            {/* Send options */}
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-xl font-semibold text-foreground">Option 1</p>
              </div>
              <Button
                disabled={!canSend}
                onClick={() => setSent("for-me")}
                className="group relative w-full gap-3 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-600 py-6 text-base font-semibold text-white shadow-md hover:opacity-95 disabled:from-muted disabled:to-muted disabled:text-muted-foreground"
              >
                <Mail className="h-5 w-5" aria-hidden />
                Send this prepared email
                <ArrowRight className="ml-auto h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </Button>

              <div className="text-center">
                <p className="text-xl font-semibold text-foreground">Option 2</p>
              </div>
              <Button
                disabled={!canSend}
                onClick={() => setSent("myself")}
                className="group relative w-full gap-3 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-600 py-6 text-base font-semibold text-white shadow-md hover:opacity-95 disabled:from-muted disabled:to-muted disabled:text-muted-foreground"
              >
                <Link2 className="h-5 w-5" aria-hidden />
                Send my own email
                <ArrowRight className="ml-auto h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </Button>
              <p className="text-center text-sm font-medium text-foreground">
                Trees4Travel will email you a link 'RECEIVE YOUR TREE GIFT' which you can add to your own personal email.
              </p>

              {!canSend && (
                <p className="text-center text-xs text-muted-foreground">
                  Add a valid email address and a name to enable sending.
                </p>
              )}
            </div>
          </div>

          {/* Email preview */}
          <Card className="overflow-hidden border-0 shadow-card-lg lg:sticky lg:top-20">
            <CardContent className="p-0">
              <div className="max-h-[720px] overflow-y-auto">
                {/* Preview card */}
                <div className="bg-white p-6">
                  {/* Top foliage banner */}
                  <div className="relative overflow-hidden rounded-t-xl bg-emerald-900 px-6 py-8 text-center">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-emerald-500" />
                      <div className="absolute -right-6 top-2 h-28 w-28 rounded-full bg-emerald-400" />
                      <div className="bottom-0 left-1/3 h-16 w-16 rounded-full bg-amber-300" />
                    </div>
                    <div className="relative z-10 mx-auto flex max-w-xs flex-col items-center gap-2">
                      <img src={T4TLogo} alt="Trees4Travel" className="h-10 w-auto" />
                      <p className="text-sm font-semibold text-white">Trees4Travel</p>
                      <p className="text-xs text-emerald-100">Making Travel Planet &amp; People Positive</p>
                    </div>
                  </div>

                  <div className="space-y-5 border-x border-b border-border px-6 pb-8 pt-6 text-center">
                    <p className="text-sm font-semibold italic text-foreground">
                      Your Travel Advisor has gifted you {trees} TREES to help you begin rebalancing your carbon footprint.
                    </p>

                    <span className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm">
                      CLICK HERE TO RECEIVE YOUR TREE
                    </span>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Let's continue to experience our amazing world but with a more thoughtful approach, whilst simultaneously planting &amp; maintaining forests to remove CO2 from the air. This simple, yet powerful act, is the start of your journey into restoring natural eco-systems, supporting nature &amp; communities. Together we can reverse climate change, creating a safer, more sustainable planet.
                    </p>

                    <p className="text-sm text-foreground">
                      Best Wishes from,
                      <br />
                      The Trees4Travel Team
                    </p>
                  </div>

                  {/* Bottom foliage banner */}
                  <div className="relative overflow-hidden rounded-b-xl bg-emerald-900 px-6 py-6">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute -left-2 bottom-0 h-20 w-20 rounded-full bg-emerald-500" />
                      <div className="absolute -right-4 bottom-2 h-24 w-24 rounded-full bg-emerald-400" />
                      <div className="bottom-0 left-1/2 h-14 w-14 rounded-full bg-amber-300" />
                    </div>
                    <div className="relative z-10 flex items-center justify-center gap-2 text-emerald-100">
                      <TreePine className="h-5 w-5" aria-hidden />
                      <span className="text-sm font-medium">Planet &amp; People Positive</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </T2TLayout>
  );
}
