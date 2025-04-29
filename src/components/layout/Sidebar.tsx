
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from './ThemeToggle';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Palette, 
  Wrench, 
  FileText, 
  Database, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Brain,
  Code,
  Users,
  FolderPlus,
  Tag,
  FileKey,
  Building,
  SlidersHorizontal
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, collapsed }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
          isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'hover:bg-accent hover:text-accent-foreground'
        } ${collapsed ? 'justify-center' : ''}`
      }
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={`h-screen bg-sidebar border-r border-border flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="font-semibold text-xl flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <span className="text-foreground">AI Chat Hub</span>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
        )}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="flex-1 py-4 overflow-y-auto">
        <div className="px-3 mb-1 flex items-center">
          {!collapsed && <p className="text-xs font-medium text-muted-foreground mb-2">MAIN</p>}
        </div>
        <NavItem to="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" collapsed={collapsed} />
        <NavItem to="/chat" icon={<MessageSquare className="h-5 w-5" />} label="Chat Management" collapsed={collapsed} />
        <NavItem to="/widget" icon={<Code className="h-5 w-5" />} label="Widget Builder" collapsed={collapsed} />
        
        <div className="px-3 mt-6 mb-1 flex items-center">
          {!collapsed && <p className="text-xs font-medium text-muted-foreground mb-2">AI CONFIGURATION</p>}
        </div>
        <NavItem to="/ai-models" icon={<Brain className="h-5 w-5" />} label="AI Models" collapsed={collapsed} />
        <NavItem to="/prompts" icon={<FileText className="h-5 w-5" />} label="Prompt Templates" collapsed={collapsed} />
        <NavItem to="/knowledge" icon={<Database className="h-5 w-5" />} label="Knowledge Base" collapsed={collapsed} />
        <NavItem to="/follow-ups" icon={<FileKey className="h-5 w-5" />} label="Follow-Up Builder" collapsed={collapsed} />
        
        <div className="px-3 mt-6 mb-1 flex items-center">
          {!collapsed && <p className="text-xs font-medium text-muted-foreground mb-2">CUSTOMIZATION</p>}
        </div>
        <NavItem to="/branding" icon={<Palette className="h-5 w-5" />} label="Branding Manager" collapsed={collapsed} />
        <NavItem to="/appearance" icon={<Palette className="h-5 w-5" />} label="Appearance" collapsed={collapsed} />
        <NavItem to="/behavior" icon={<Wrench className="h-5 w-5" />} label="Behavior" collapsed={collapsed} />
        
        <div className="px-3 mt-6 mb-1 flex items-center">
          {!collapsed && <p className="text-xs font-medium text-muted-foreground mb-2">MANAGEMENT</p>}
        </div>
        <NavItem to="/analytics" icon={<BarChart3 className="h-5 w-5" />} label="Analytics" collapsed={collapsed} />
        <NavItem to="/users" icon={<Users className="h-5 w-5" />} label="User Management" collapsed={collapsed} />
        <NavItem to="/tenants" icon={<Building className="h-5 w-5" />} label="Multi-Tenant" collapsed={collapsed} />
        <NavItem to="/security" icon={<Shield className="h-5 w-5" />} label="Security" collapsed={collapsed} />
      </div>
      
      <div className="p-4 border-t border-border">
        <NavItem to="/settings" icon={<Settings className="h-5 w-5" />} label="Settings" collapsed={collapsed} />
      </div>
    </div>
  );
};

export default Sidebar;
