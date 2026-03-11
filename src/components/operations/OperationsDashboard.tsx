import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, TrendingUp, Calendar, AlertTriangle, Activity } from "lucide-react";

const signupMetrics = {
  last7Days: 12,
  last30Days: 47,
};

const trialMetrics = {
  activeTrials: 18,
  expiringToday: 2,
  expiring3Days: 5,
  expiring7Days: 9,
};

const revenueMetrics = {
  mrr: 4830,
  arr: 57960,
  payingOrgs: 34,
};

const activationMetrics = {
  totalEvents: 1247,
  eventsLast7: 89,
  eventsLast30: 312,
  orgsWithEvents: 28,
  orgsWithoutEvents: 24,
};

const expiringTrials = [
  { name: "GreenFest Ltd", daysLeft: 0 },
  { name: "EcoSummit Co", daysLeft: 0 },
  { name: "Blue Horizon Events", daysLeft: 1 },
  { name: "Nordic Travel Group", daysLeft: 2 },
  { name: "Sustainable Stays", daysLeft: 3 },
];

export function OperationsDashboard() {
  return (
    <div className="space-y-6">
      {/* Signup & Trial Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={<Building2 className="w-4 h-4" />} label="Signups (7d)" value={signupMetrics.last7Days} />
        <MetricCard icon={<Building2 className="w-4 h-4" />} label="Signups (30d)" value={signupMetrics.last30Days} />
        <MetricCard icon={<Users className="w-4 h-4" />} label="Active Trials" value={trialMetrics.activeTrials} />
        <MetricCard icon={<AlertTriangle className="w-4 h-4" />} label="Expiring Today" value={trialMetrics.expiringToday} variant="warning" />
      </div>

      {/* Revenue Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard icon={<TrendingUp className="w-4 h-4" />} label="MRR" value={`£${revenueMetrics.mrr.toLocaleString()}`} />
        <MetricCard icon={<TrendingUp className="w-4 h-4" />} label="ARR" value={`£${revenueMetrics.arr.toLocaleString()}`} />
        <MetricCard icon={<Building2 className="w-4 h-4" />} label="Paying Organisations" value={revenueMetrics.payingOrgs} />
      </div>

      {/* Activation & Trials Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Activation */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Product Activation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total events (all time)</span>
              <span className="font-medium text-foreground">{activationMetrics.totalEvents.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Events (last 7 days)</span>
              <span className="font-medium text-foreground">{activationMetrics.eventsLast7}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Events (last 30 days)</span>
              <span className="font-medium text-foreground">{activationMetrics.eventsLast30}</span>
            </div>
            <div className="border-t pt-3 mt-3 flex justify-between text-sm">
              <span className="text-muted-foreground">Orgs with ≥1 event</span>
              <span className="font-medium text-primary">{activationMetrics.orgsWithEvents}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Orgs with no events</span>
              <span className="font-medium text-destructive">{activationMetrics.orgsWithoutEvents}</span>
            </div>
          </CardContent>
        </Card>

        {/* Expiring Trials */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Expiring Trials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {expiringTrials.map((trial) => (
              <div key={trial.name} className="flex items-center justify-between text-sm py-1.5 border-b last:border-0">
                <span className="text-foreground font-medium">{trial.name}</span>
                <Badge variant={trial.daysLeft === 0 ? "destructive" : "secondary"} className="text-xs">
                  {trial.daysLeft === 0 ? "Today" : `${trial.daysLeft}d left`}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, variant }: { icon: React.ReactNode; label: string; value: string | number; variant?: "warning" }) {
  return (
    <Card className={variant === "warning" ? "border-destructive/30 bg-destructive/5" : ""}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          {icon}
          <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
        </div>
        <p className={`text-2xl font-bold ${variant === "warning" ? "text-destructive" : "text-foreground"}`}>
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
