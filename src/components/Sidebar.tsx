import React from 'react';
import { 
  LayoutDashboard, 
  Share2, 
  Users, 
  GitFork, 
  AlertTriangle, 
  Clock, 
  Database, 
  Bot, 
  MapPin, 
  Briefcase, 
  Settings as SettingsIcon,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  clusterCount?: number;
  entityCount?: number;
  alertCount?: number;
  docCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  clusterCount = 3,
  entityCount = 25,
  alertCount = 7,
  docCount = 117
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'network',
      label: 'Network Analysis',
      icon: Share2,
      badge: `${clusterCount} Clusters`,
      badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
    },
    {
      id: 'entities',
      label: 'Entities',
      icon: Users,
      badge: `${entityCount}+`,
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700'
    },
    {
      id: 'relationships',
      label: 'Relationship Explorer',
      icon: GitFork,
      badge: null
    },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: AlertTriangle,
      badge: `${alertCount} High`,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    },
    {
      id: 'timeline',
      label: 'Timeline',
      icon: Clock,
      badge: null
    },
    {
      id: 'datasources',
      label: 'Data Sources',
      icon: Database,
      badge: `${docCount} Docs`,
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700'
    },
    {
      id: 'ai-investigator',
      label: 'AI Investigator',
      icon: Bot,
      badge: 'Live',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 font-bold'
    },
    {
      id: 'map',
      label: 'Tactical Map',
      icon: MapPin,
      badge: null
    },
    {
      id: 'case-management',
      label: 'Case Management',
      icon: Briefcase,
      badge: null
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: SettingsIcon,
      badge: null
    }
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800/80 bg-[#080d18] flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 select-none">
      <div className="p-3.5 space-y-4 overflow-y-auto">
        <div>
          <div className="px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase text-slate-400 font-semibold">
            INTELLIGENCE SUITE
          </div>
          <nav className="space-y-1 mt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="p-3.5 border-t border-slate-800/80 bg-slate-900/30">
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-1">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Investigative Notice</span>
          </div>
          <p className="text-[11px] text-amber-200/80 leading-relaxed">
            AI-generated insights are investigative leads and require human verification.
          </p>
        </div>
      </div>
    </aside>
  );
};
