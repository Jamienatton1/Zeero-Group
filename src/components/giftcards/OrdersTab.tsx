import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "Scheduled" | "Sent" | "Draft" | "Bounced";

interface Order {
  ref: string;
  name: string;
  created: string;
  recipients: number;
  trees: number;
  delivery: string;
  opened: number;
  status: Status;
}

const ORDERS: Order[] = [
  { ref: "GC-1042", name: "Summit welcome gift", created: "04 Aug 2026", recipients: 248, trees: 1240, delivery: "12 Aug 2026", opened: 0, status: "Scheduled" },
  { ref: "GC-1038", name: "Client thank-you Q3", created: "22 Jul 2026", recipients: 64, trees: 320, delivery: "24 Jul 2026", opened: 78, status: "Sent" },
  { ref: "GC-1035", name: "Partner conference", created: "11 Jul 2026", recipients: 512, trees: 2560, delivery: "15 Jul 2026", opened: 61, status: "Sent" },
  { ref: "GC-1031", name: "Team milestone", created: "02 Jul 2026", recipients: 18, trees: 90, delivery: "—", opened: 0, status: "Draft" },
  { ref: "GC-1027", name: "Supplier appreciation", created: "18 Jun 2026", recipients: 40, trees: 200, delivery: "20 Jun 2026", opened: 12, status: "Bounced" },
];

const statusStyles: Record<Status, string> = {
  Scheduled: "bg-accent/15 text-accent hover:bg-accent/15",
  Sent: "bg-primary/10 text-primary hover:bg-primary/10",
  Draft: "bg-muted text-muted-foreground hover:bg-muted",
  Bounced: "bg-destructive/10 text-destructive hover:bg-destructive/10",
};

const actionFor: Record<Status, string> = {
  Scheduled: "Edit",
  Sent: "View",
  Draft: "Resume",
  Bounced: "Resend",
};

export default function OrdersTab() {
  const [filter, setFilter] = useState<string>("all");
  const rows = filter === "all" ? ORDERS : ORDERS.filter((o) => o.status === filter);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="text-base">Orders</CardTitle>
          <p className="text-sm text-muted-foreground">
            Scheduled orders can be edited or cancelled up until their send date.
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[170px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="Sent">Sent</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Bounced">Bounced</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
            <Gift className="mb-3 h-8 w-8 text-muted-foreground" />
            <p className="font-medium text-foreground">No orders with this status</p>
            <p className="text-sm text-muted-foreground">Try a different filter, or send your first gift cards.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Recipients</TableHead>
                  <TableHead className="text-right">Trees</TableHead>
                  <TableHead>Delivery</TableHead>
                  <TableHead className="w-[160px]">Opened</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((o) => (
                  <TableRow key={o.ref}>
                    <TableCell>
                      <p className="font-medium text-foreground">{o.name}</p>
                      <p className="text-xs text-muted-foreground">{o.ref}</p>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{o.created}</TableCell>
                    <TableCell className="text-right text-sm">{o.recipients}</TableCell>
                    <TableCell className="text-right text-sm">{o.trees.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{o.delivery}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={o.opened} className="h-1.5 w-20" />
                        <span className="text-xs text-muted-foreground">{o.opened}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(statusStyles[o.status])}>{o.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        {actionFor[o.status]}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
