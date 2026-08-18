import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  HelpCircle,
  TreePine,
  User,
  LogOut,
  Bell,
  Settings,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { title: "Overview", url: "/trip-to-trees", icon: LayoutDashboard, end: true },
  { title: "Script", url: "/trip-to-trees/script", icon: FileText },
  { title: "FAQ", url: "/trip-to-trees/faq", icon: HelpCircle, newTab: true },
  { title: "Forest Info", url: "/trip-to-trees/forest-info", icon: TreePine },
  { title: "My Account", url: "/trip-to-trees/account", icon: User },
];

function UtilityBar() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="icon" aria-label="Notifications" className="text-muted-foreground hover:text-foreground">
        <Bell className="h-[18px] w-[18px]" aria-hidden />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Settings" className="text-muted-foreground hover:text-foreground">
        <Settings className="h-[18px] w-[18px]" aria-hidden />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Profile" className="text-muted-foreground hover:text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-brand-foreground">
              <User className="h-4 w-4" aria-hidden />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/trip-to-trees/account")}>
            <User className="mr-2 h-4 w-4" aria-hidden />
            Account settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/login")}>
            <LogOut className="mr-2 h-4 w-4" aria-hidden />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function T2TLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="t2t flex min-h-screen w-full bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col bg-rail px-4 py-6 md:flex">
        <div className="flex items-center gap-3 px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-brand-foreground">
            <TreePine className="h-5 w-5" aria-hidden />
          </span>
          <div className="leading-tight">
            <p className="text-[15px] font-semibold tracking-tight text-rail-foreground">Trip to Trees</p>
            <p className="text-[11px] text-rail-muted">Planet &amp; people positive</p>
          </div>
        </div>

        <nav aria-label="Main" className="mt-10">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.url}>
                {item.newTab ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rail-muted transition-colors hover:text-rail-foreground"
                  >
                    <item.icon className="h-[18px] w-[18px]" aria-hidden />
                    {item.title}
                    <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" aria-hidden />
                  </a>
                ) : (
                  <NavLink
                    to={item.url}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                        isActive
                          ? "font-semibold text-rail-foreground"
                          : "font-medium text-rail-muted hover:text-rail-foreground",
                      )
                    }
                  >
                    <item.icon className="h-[18px] w-[18px]" aria-hidden />
                    {item.title}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile nav */}
      <nav aria-label="Main" className="fixed bottom-0 left-0 right-0 z-30 flex bg-rail md:hidden">
        {navItems.map((item) =>
          item.newTab ? (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium text-rail-muted"
            >
              <item.icon className="h-4 w-4" aria-hidden />
              {item.title}
            </a>
          ) : (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium",
                  isActive ? "text-rail-foreground" : "text-rail-muted",
                )
              }
            >
              <item.icon className="h-4 w-4" aria-hidden />
              {item.title}
            </NavLink>
          )
        )}
      </nav>

      <main className="min-w-0 flex-1 px-4 pb-24 pt-6 sm:px-8 md:ml-60 md:pb-10">
        <UtilityBar />
        <div className="mt-4">{children}</div>
      </main>
    </div>
  );
}

export function T2TPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <T2TLayout>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </T2TLayout>
  );
}
