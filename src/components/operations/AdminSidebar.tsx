import {
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
  Bell,
  ReceiptText,
  FileDown,
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
    items: [
      { icon: ReceiptText, label: "Quotes", to: "/operations/quotes", match: "quotes" },
      { icon: FileDown, label: "Imports", to: "/operations/imports", match: "imports" },
    ],
  },
];

export function AdminSidebar() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const active =
    pathname === "/operations/quotes"
      ? "quotes"
      : pathname === "/operations/imports"
        ? "imports"
        : searchParams.get("tab") ?? "dashboard";


  return (
    <aside className="w-64 shrink-0 bg-admin-nav min-h-screen flex flex-col">
      <div className="h-[68px] flex items-center px-6">
        <span className="text-admin-nav-foreground text-xl font-semibold tracking-tight">
          ZEERO<span className="font-light text-admin-nav-muted">GROUP</span>
        </span>
      </div>

      <div className="px-6 py-4 border-y border-white/5">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-sm text-admin-nav-muted hover:text-admin-nav-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Exit Admin
        </Link>
      </div>

      <nav className="flex-1 py-5 overflow-y-auto">
        {groups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="px-6 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-admin-nav-muted">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.match;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className={cn(
                        "w-full flex items-center gap-3 px-6 py-2.5 transition-colors text-sm",
                        isActive
                          ? "bg-admin-nav-item-active text-admin-nav-foreground font-medium border-l-2 border-admin-accent pl-[22px]"
                          : "text-admin-nav-muted hover:text-admin-nav-foreground hover:bg-admin-nav-item"
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
    </aside>
  );
}
