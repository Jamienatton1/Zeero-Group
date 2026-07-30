import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { Bell, ShieldCheck, User } from "lucide-react";

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AdminLayout({ title, subtitle, actions, children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-admin-surface">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-[68px] shrink-0 bg-admin-nav px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-admin-accent" />
            <span className="text-admin-nav-foreground text-base font-semibold">Admin Panel</span>
            <span className="rounded-full bg-admin-accent/15 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.12em] text-admin-accent">
              ADMIN
            </span>
          </div>
          <div className="flex items-center gap-5 text-admin-nav-muted">
            <Bell className="w-[18px] h-[18px]" />
            <User className="w-[18px] h-[18px]" />
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
            </div>
            {actions}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
