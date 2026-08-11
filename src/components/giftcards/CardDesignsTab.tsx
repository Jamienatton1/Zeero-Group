import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Upload, QrCode } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const TEMPLATES = [
  { id: "t1", name: "Client thank-you", swatch: "bg-gradient-hero", uses: 24 },
  { id: "t2", name: "Event welcome", swatch: "bg-accent", uses: 11 },
  { id: "t3", name: "Team milestone", swatch: "bg-primary", uses: 6 },
  { id: "t4", name: "Supplier appreciation", swatch: "bg-sidebar-dark", uses: 2 },
];

export default function CardDesignsTab() {
  const [codeCount, setCodeCount] = useState("50");
  const [treesPerCode, setTreesPerCode] = useState("5");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
          <div>
            <CardTitle className="text-base">Saved templates</CardTitle>
            <p className="text-sm text-muted-foreground">Design, logo and message saved together for reuse.</p>
          </div>
          <Button size="sm">
            <Plus className="mr-1.5 h-4 w-4" /> New template
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                className="overflow-hidden rounded-lg border border-border text-left transition-colors hover:border-primary/40"
              >
                <div className={cn("h-24 w-full", t.swatch)} />
                <div className="space-y-1 p-3">
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <Badge variant="secondary" className="text-xs">
                    Used {t.uses}×
                  </Badge>
                </div>
              </button>
            ))}
            <button className="flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
              <Upload className="h-5 w-5" />
              Upload design
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <QrCode className="h-4 w-4" /> Tree codes
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Generate a batch of redeemable codes for teams using their own email system.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="code-count" className="mb-1.5 block text-sm font-medium">
                Number of codes
              </Label>
              <Input id="code-count" type="number" min={1} value={codeCount} onChange={(e) => setCodeCount(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="trees-per-code" className="mb-1.5 block text-sm font-medium">
                Trees per code
              </Label>
              <Input
                id="trees-per-code"
                type="number"
                min={1}
                value={treesPerCode}
                onChange={(e) => setTreesPerCode(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full" onClick={() => toast({ title: `${codeCount} tree codes generated` })}>
                Generate codes
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Codes are charged on generation and expire after 12 months.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
