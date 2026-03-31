import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Activity,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const menuItems = [
  { id: "dashboard", label: "工作台", icon: LayoutDashboard, path: "/" },
  { id: "customers", label: "客户管理", icon: Users, path: "/customers" },
  { id: "activities", label: "跟进记录", icon: Activity, path: "/activities" },
  { id: "pipeline", label: "销售漏斗", icon: BarChart3, path: "/pipeline" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-14 px-4 border-b">
        {!collapsed && (
          <span className="font-semibold text-foreground">CRM 系统</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(false)}
          className="md:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.id}
              to={item.path === "/" ? "/" : item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-3 left-3 z-50 md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-card h-screen sticky top-0 transition-all duration-300",
          collapsed ? "w-16" : "w-60"
        )}
      >
        <NavContent />
      </aside>

      {/* Mobile sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <NavContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
