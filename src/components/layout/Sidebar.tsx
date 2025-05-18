
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  Database,
  FileText,
  Users,
  Settings,
  Sliders,
  Paintbrush,
  Building,
  Mail,
  BookOpen,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Models", href: "/ai-models", icon: Bot },
  { name: "Chat Management", href: "/chats", icon: MessageSquare },
  { name: "Knowledge Base", href: "/knowledge", icon: Database },
  { name: "Widget", href: "/widget", icon: Sliders },
  { name: "Follow-Ups", href: "/follow-ups", icon: Mail },
  { name: "Prompt Templates", href: "/prompts", icon: FileText },
  { name: "Documentation", href: "/docs", icon: BookOpen },
  { name: "Users", href: "/users", icon: Users },
  { name: "Roles & Permissions", href: "/roles", icon: Settings },
  { name: "Branding", href: "/branding", icon: Paintbrush },
  { name: "Multi-Tenant", href: "/tenants", icon: Building },
  { name: "System Settings", href: "/settings", icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="bg-card border-r w-64 hidden md:block overflow-y-auto h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold">AI Chat Hub</h2>
      </div>
      <nav className="px-3 py-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all",
                  isActive
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
      <div className="p-6 mt-auto">
        <Button variant="outline" className="w-full">
          <Settings className="mr-2 h-4 w-4" />
          Help & Docs
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
