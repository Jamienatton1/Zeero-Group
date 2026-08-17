import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, HelpCircle, TreePine, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Overview", url: "/trip-to-trees", icon: LayoutDashboard, end: true },
  { title: "Script", url: "/trip-to-trees/script", icon: FileText },
  { title: "FAQ", url: "/trip-to-trees/faq", icon: HelpCircle },
  { title: "Forest Info", url: "/trip-to-trees/forest-info", icon: TreePine },
  { title: "My Account", url: "/trip-to-trees/account", icon: User },
];

export function T2TLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="t2t min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <TreePine className="h-5 w-5" aria-hidden />
          </span>
          <div className="leading-tight">
            <p className="text-base font-semibold tracking-tight text-foreground">Trip to Trees</p>
            <p className="text-xs text-muted-foreground">Make travel planet &amp; people positive</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="gap-2" onClick={() => navigate("/login")}>
          <LogOut className="h-4 w-4" aria-hidden />
          Log out
        </Button>
      </header>


      <div className="flex">
        <nav aria-label="Main" className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 border-r border-border bg-card p-3 md:block">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.url}>
                <NavLink
                  to={item.url}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )
                  }
                >
                  <item.icon className="h-4 w-4" aria-hidden />
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile nav */}
        <nav aria-label="Main" className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-border bg-card md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-medium",
                  isActive ? "text-primary" : "text-muted-foreground",
                )
              }
            >
              <item.icon className="h-4 w-4" aria-hidden />
              {item.title}
            </NavLink>
          ))}
        </nav>

        <main className="min-w-0 flex-1 p-4 pb-20 sm:p-6 md:pb-6">{children}</main>
      </div>
    </div>
  );
}

export function T2TPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <T2TLayout>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </T2TLayout>
  );
}
