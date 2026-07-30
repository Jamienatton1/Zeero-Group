import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { Badge } from "@/components/ui/badge";

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AdminLayout({ title, subtitle, actions, children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary text-[10px] tracking-widest">
                  ADMIN
                </Badge>
              </div>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
            {actions}
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
}
