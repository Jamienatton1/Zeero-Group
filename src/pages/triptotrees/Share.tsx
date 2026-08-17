import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Mail, Send, ShieldCheck, TreePine, Link2 } from "lucide-react";
import { T2TLayout } from "@/components/triptotrees/T2TLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatKg, TRIP_TO_TREES_CONFIG } from "@/lib/tripToTrees";

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

type SentState = null | "for-me" | "myself";

export default function TripToTreesShare() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { trees?: number; kg?: number } };

  const trees = state?.trees ?? 0;
  const kg = state?.kg ?? trees * TRIP_TO_TREES_CONFIG.kgCo2ePerTree;

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
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
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
      <div className="mx-auto max-w-6xl space-y-5">
        <Link
          to="/trip-to-trees"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to overview
        </Link>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Share with traveller</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Send the tree total to the traveller and invite them to plant the trees.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          {/* Composer */}
          <div className="space-y-6">
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <TreePine className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-2xl font-semibold tracking-tight text-foreground">
                    {trees} trees
                  </p>
                  <p className="text-sm text-muted-foreground">covering {formatKg(kg)}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Traveller details</CardTitle>
                <CardDescription>Both fields are required before you can send.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="t2t-share-email">Traveller's email address</Label>
                  <Input
                    id="t2t-share-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    aria-invalid={!!emailError}
                    aria-describedby="t2t-share-email-error"
                    placeholder="traveller@example.com"
                    className="bg-card"
                  />
                  <p
                    id="t2t-share-email-error"
                    role="alert"
                    className={cn("text-xs text-destructive", !emailError && "sr-only")}
                  >
                    {emailError}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="t2t-share-name">Salutation / traveller's name</Label>
                  <Input
                    id="t2t-share-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jamie Natton"
                    className="bg-card"
                  />
                </div>

                <div className="flex gap-3 rounded-lg border border-border bg-muted/40 p-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <p className="text-xs text-muted-foreground">
                    We never market to or retain the traveller's email address, unless they opt in
                    after purchasing trees.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">How would you like to send it?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" aria-hidden />
                    <p className="text-sm font-medium">Send this email for me</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    We send the prepared, branded email straight to the traveller.
                  </p>
                  <Button className="mt-3 w-full gap-2" disabled={!canSend} onClick={() => setSent("for-me")}>
                    <Send className="h-4 w-4" aria-hidden />
                    Send this email for me
                  </Button>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-primary" aria-hidden />
                    <p className="text-sm font-medium">Send it myself</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    We email you a shareable 'plant your trees' link to paste into your own email client.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-3 w-full gap-2"
                    disabled={!canSend}
                    onClick={() => setSent("myself")}
                  >
                    <Link2 className="h-4 w-4" aria-hidden />
                    Send it myself
                  </Button>
                </div>

                {!canSend && (
                  <p className="text-xs text-muted-foreground">
                    Add a valid email address and a name to enable sending.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Email preview */}
          <Card className="lg:sticky lg:top-20">
            <CardHeader>
              <CardTitle className="text-base">Email preview</CardTitle>
              <CardDescription>This is what the traveller will receive.</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                aria-live="polite"
                className="max-h-[560px] overflow-y-auto rounded-xl border border-border bg-muted/40 p-4"
              >
                <div className="mx-auto max-w-md rounded-lg bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-border pb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <TreePine className="h-4 w-4" aria-hidden />
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-semibold">Trip to Trees</p>
                      <p className="text-[11px] text-muted-foreground">
                        Make travel planet &amp; people positive
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-5 text-sm text-foreground">
                    <p className="font-medium">Dear {name.trim() || "traveller"},</p>
                    <p>Thank you so much for booking your trip!</p>
                    <p>
                      We'd like you to know that we're in partnership with your travel advisor, who
                      supports sustainable and mindful travel.
                    </p>
                    <div className="rounded-lg bg-primary/10 p-4 text-center">
                      <p className="text-2xl font-semibold text-primary">{trees} trees</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        will make your trip planet &amp; people positive, covering {formatKg(kg)}
                      </p>
                    </div>
                    <div className="text-center">
                      <span className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                        Click here to plant your trees
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Travel can be a force for good — by planting trees in developing countries as you
                      travel, you help restore eco-systems, biodiversity and support local communities
                      through the dignity of employment.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Every tree is paired with a share of an investment into a United Nations Certified
                      Emissions Reduction renewable energy programme, essentially doubling our promise.
                    </p>
                    <Separator />
                    <p className="text-xs text-muted-foreground">
                      Best wishes,
                      <br />
                      The Trip to Trees team
                    </p>
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
