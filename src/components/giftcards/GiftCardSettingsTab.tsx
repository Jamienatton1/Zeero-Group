import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

const SETTINGS = [
  { label: "Payment method", value: "Invoice (30 days)" },
  { label: "Price per tree", value: "US$3.50" },
  { label: "Default reply-to", value: "events@zeerogroup.com" },
  { label: "Who can send gift cards", value: "Owners and Billing users" },
  { label: "Approval threshold", value: "Approval required over 500 trees" },
];

export default function GiftCardSettingsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Lock className="h-4 w-4" /> Inherited settings
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          These values come from Organisation Management. Only an organisation admin can change them.
        </p>
      </CardHeader>
      <CardContent>
        <dl className="divide-y divide-border">
          {SETTINGS.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
              <dt className="text-sm text-muted-foreground">{s.label}</dt>
              <dd className="text-sm font-medium text-foreground">{s.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
