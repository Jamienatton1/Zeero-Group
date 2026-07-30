import {
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
  Bell,
  ReceiptText,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const groups = [
  {
    label: "Overview",
    items: [{ icon: LayoutDashboard, label: "Dashboard", to: "/operations?tab=dashboard", match: "dashboard" }],
  },
  {
    label: "Customers",
    items: [
      { icon: Building2, label: "Organisations", to: "/operations?tab=organisations", match: "organisations" },
      { icon: Users, label: "Users", to: "/operations?tab=users", match: "users" },
    ],
  },
  {
    label: "Finance",
    items: [{ icon: BarChart3, label: "Revenue", to: "/operations?tab=revenue", match: "revenue" }],
  },
  {
    label: "Communications",
    items: [{ icon: Bell, label: "Notifications", to: "/operations?tab=notifications", match: "notifications" }],
  },
  {
    label: "Operations",
    items: [{ icon: ReceiptText, label: "Quotes", to: "/operations/quotes", match: "quotes" }],
  },
];

export function AdminSidebar() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const active =
    pathname === "/operations/quotes" ? "quotes" : searchParams.get("tab") ?? "dashboard";

  return (
    <aside className="w-64 shrink-0 bg-sidebar-dark min-h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-item">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-primary-foreground font-semibold">Zeero Group</span>
              <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-primary">
                ADMIN
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Platform admin panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {groups.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="px-6 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.match;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className={cn(
                        "w-full flex items-center gap-3 px-6 py-2.5 transition-colors text-sm font-medium",
                        isActive
                          ? "bg-sidebar-item-active text-primary-foreground"
                          : "text-muted-foreground hover:text-primary-foreground hover:bg-sidebar-item"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-item p-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Zeero Events
        </Link>
      </div>
    </aside>
  );
}
