import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Building2, Users, Calendar, Activity } from "lucide-react";
import { format } from "date-fns";

interface Organisation {
  id: string;
  name: string;
  plan: string;
  status: "trial" | "active" | "cancelled";
  trialEndDate: string | null;
  eventsCreated: number;
  lastActivity: string;
  createdDate: string;
  members: { name: string; email: string; role: string; lastActive: string }[];
  activityLog: { user: string; action: string; date: string }[];
}

const mockOrganisations: Organisation[] = [
  {
    id: "1", name: "GreenFest Ltd", plan: "Pro", status: "active", trialEndDate: null,
    eventsCreated: 34, lastActivity: "2026-03-10", createdDate: "2025-06-15",
    members: [
      { name: "Sarah Johnson", email: "sarah@greenfest.com", role: "Owner", lastActive: "2026-03-10" },
      { name: "Tom Baker", email: "tom@greenfest.com", role: "Member", lastActive: "2026-03-08" },
    ],
    activityLog: [
      { user: "Sarah Johnson", action: "Created event", date: "2026-03-10" },
      { user: "Tom Baker", action: "Login", date: "2026-03-08" },
      { user: "Sarah Johnson", action: "Generated report", date: "2026-03-07" },
    ],
  },
  {
    id: "2", name: "EcoSummit Co", plan: "Core", status: "trial", trialEndDate: "2026-03-11",
    eventsCreated: 2, lastActivity: "2026-03-09", createdDate: "2025-11-20",
    members: [
      { name: "Lisa Chen", email: "lisa@ecosummit.co", role: "Owner", lastActive: "2026-03-09" },
    ],
    activityLog: [
      { user: "Lisa Chen", action: "Created event", date: "2026-03-09" },
      { user: "Lisa Chen", action: "Login", date: "2026-03-05" },
    ],
  },
  {
    id: "3", name: "Blue Horizon Events", plan: "Enterprise", status: "active", trialEndDate: null,
    eventsCreated: 112, lastActivity: "2026-03-11", createdDate: "2024-09-01",
    members: [
      { name: "James Wright", email: "james@bluehorizon.events", role: "Owner", lastActive: "2026-03-11" },
      { name: "Amy Park", email: "amy@bluehorizon.events", role: "Admin", lastActive: "2026-03-11" },
      { name: "Dan Ellis", email: "dan@bluehorizon.events", role: "Member", lastActive: "2026-03-10" },
    ],
    activityLog: [
      { user: "Amy Park", action: "Created event", date: "2026-03-11" },
      { user: "James Wright", action: "Login", date: "2026-03-11" },
      { user: "Dan Ellis", action: "Generated report", date: "2026-03-10" },
    ],
  },
  {
    id: "4", name: "Nordic Travel Group", plan: "Core", status: "trial", trialEndDate: "2026-03-13",
    eventsCreated: 0, lastActivity: "2026-03-06", createdDate: "2026-02-28",
    members: [
      { name: "Erik Svensson", email: "erik@nordictravel.com", role: "Owner", lastActive: "2026-03-06" },
    ],
    activityLog: [
      { user: "Erik Svensson", action: "Login", date: "2026-03-06" },
    ],
  },
  {
    id: "5", name: "Sustainable Stays", plan: "Pro", status: "trial", trialEndDate: "2026-03-14",
    eventsCreated: 5, lastActivity: "2026-03-10", createdDate: "2026-02-14",
    members: [
      { name: "Maria Garcia", email: "maria@sustainablestays.com", role: "Owner", lastActive: "2026-03-10" },
      { name: "Carlos Ruiz", email: "carlos@sustainablestays.com", role: "Member", lastActive: "2026-03-09" },
    ],
    activityLog: [
      { user: "Maria Garcia", action: "Created event", date: "2026-03-10" },
      { user: "Carlos Ruiz", action: "Login", date: "2026-03-09" },
    ],
  },
  {
    id: "6", name: "CarbonZero Inc", plan: "Core", status: "cancelled", trialEndDate: null,
    eventsCreated: 8, lastActivity: "2026-01-15", createdDate: "2025-03-10",
    members: [
      { name: "Alex Kim", email: "alex@carbonzero.io", role: "Owner", lastActive: "2026-01-15" },
    ],
    activityLog: [
      { user: "Alex Kim", action: "Login", date: "2026-01-15" },
    ],
  },
];

const getStatusBadge = (status: Organisation["status"]) => {
  switch (status) {
    case "trial":
      return <Badge className="bg-chart-tertiary/15 text-chart-tertiary border-chart-tertiary/30">Trial</Badge>;
    case "active":
      return <Badge className="bg-primary/15 text-primary border-primary/30">Active</Badge>;
    case "cancelled":
      return <Badge variant="secondary" className="text-muted-foreground">Cancelled</Badge>;
  }
};

export function OperationsOrganisations() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [selectedOrg, setSelectedOrg] = useState<Organisation | null>(null);

  const filtered = mockOrganisations.filter((org) => {
    if (search && !org.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (planFilter !== "all" && org.plan !== planFilter) return false;
    if (statusFilter !== "all" && org.status !== statusFilter) return false;
    if (eventFilter === "has" && org.eventsCreated === 0) return false;
    if (eventFilter === "none" && org.eventsCreated > 0) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search organisations..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={planFilter} onValueChange={setPlanFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Plan" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="Core">Core</SelectItem>
            <SelectItem value="Pro">Pro</SelectItem>
            <SelectItem value="Enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="trial">Trial</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={eventFilter} onValueChange={setEventFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Events" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="has">Has Events</SelectItem>
            <SelectItem value="none">No Events</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organisation</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trial End</TableHead>
                <TableHead className="text-right">Events</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((org) => (
                <TableRow key={org.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedOrg(org)}>
                  <TableCell className="font-medium text-primary">{org.name}</TableCell>
                  <TableCell>{org.plan}</TableCell>
                  <TableCell>{getStatusBadge(org.status)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {org.trialEndDate ? format(new Date(org.trialEndDate), "dd MMM yyyy") : "—"}
                  </TableCell>
                  <TableCell className="text-right">{org.eventsCreated}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{format(new Date(org.lastActivity), "dd MMM yyyy")}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{format(new Date(org.createdDate), "dd MMM yyyy")}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No organisations found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Organisation Detail Dialog */}
      <Dialog open={!!selectedOrg} onOpenChange={(open) => !open && setSelectedOrg(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedOrg && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  {selectedOrg.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Overview */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Plan</p>
                    <p className="font-medium text-foreground">{selectedOrg.plan}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Status</p>
                    <div className="mt-0.5">{getStatusBadge(selectedOrg.status)}</div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Events Created</p>
                    <p className="font-medium text-foreground">{selectedOrg.eventsCreated}</p>
                  </div>
                  {selectedOrg.trialEndDate && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Trial Ends</p>
                      <p className="font-medium text-foreground">{format(new Date(selectedOrg.trialEndDate), "dd MMM yyyy")}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Last Activity</p>
                    <p className="font-medium text-foreground">{format(new Date(selectedOrg.lastActivity), "dd MMM yyyy")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Created</p>
                    <p className="font-medium text-foreground">{format(new Date(selectedOrg.createdDate), "dd MMM yyyy")}</p>
                  </div>
                </div>

                {/* Members */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" /> Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Last Active</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrg.members.map((m) => (
                          <TableRow key={m.email}>
                            <TableCell className="font-medium">{m.name}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{m.email}</TableCell>
                            <TableCell><Badge variant="secondary">{m.role}</Badge></TableCell>
                            <TableCell className="text-muted-foreground text-sm">{format(new Date(m.lastActive), "dd MMM yyyy")}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Activity Log */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" /> Activity Log
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {selectedOrg.activityLog.map((entry, i) => (
                      <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b last:border-0">
                        <div>
                          <span className="font-medium text-foreground">{entry.user}</span>
                          <span className="text-muted-foreground"> — {entry.action}</span>
                        </div>
                        <span className="text-muted-foreground text-xs">{format(new Date(entry.date), "dd MMM yyyy")}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
