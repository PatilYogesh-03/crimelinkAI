import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  Search, 
  Bell, 
  ChevronDown, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle2, 
  PlayCircle,
  ExternalLink,
  X
} from 'lucide-react';
import { CaseFile, Entity, Alert } from '../types';

interface HeaderProps {
  currentCase: CaseFile;
  cases: CaseFile[];
  onSelectCase: (caseItem: CaseFile) => void;
  alerts: Alert[];
  entities: Entity[];
  onSelectEntity: (entity: Entity) => void;
  onNavigate: (tabId: string) => void;
  onStartDemoTour: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCase,
  cases,
  onSelectCase,
  alerts,
  entities,
  onSelectEntity,
  onNavigate,
  onStartDemoTour,
}) => {
  const [caseMenuOpen, setCaseMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const caseMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (caseMenuRef.current && !caseMenuRef.current.contains(event.target as Node)) {
        setCaseMenuOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search entities
  const searchResults = searchQuery.trim() === '' ? [] : entities.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.role && e.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (e.associatedPhone && e.associatedPhone.includes(searchQuery)) ||
    (e.associatedVehicle && e.associatedVehicle.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 6);

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-slate-800/80 bg-[#070b14]/90 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between gap-4">
      {/* Brand & Subtitle */}
      <div className="flex items-center gap-3 shrink-0">
        <div 
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="brand-logo-btn"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] group-hover:border-cyan-400 transition-colors">
            <Shield className="w-5 h-5 text-cyan-400" />
            <div className="absolute inset-0 rounded-xl bg-cyan-400/10 animate-pulse pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-wider text-white">
                CRIMELINK <span className="text-cyan-400">AI</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono tracking-widest uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 rounded">
                PROTOTYPE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-tight hidden sm:block">
              Criminal Network Intelligence & Link Analysis
            </p>
          </div>
        </div>
      </div>

      {/* Global Search Bar */}
      <div ref={searchRef} className="relative flex-1 max-w-lg hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            id="global-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            placeholder="Search entities, IMEI, bank accounts, vehicles..."
            className="w-full h-9 pl-9 pr-14 rounded-lg bg-slate-900/80 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono"
          />
          {searchQuery ? (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800/80 border border-slate-700/60 rounded">
              ⌘K
            </kbd>
          )}
        </div>

        {/* Search Results Dropdown */}
        {searchFocused && searchQuery.trim() !== '' && (
          <div className="absolute top-11 left-0 w-full bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50 max-h-80 overflow-y-auto">
            <div className="px-3 py-1 text-[11px] uppercase tracking-wider text-slate-400 font-mono">
              Matching Intelligence Entities ({searchResults.length})
            </div>
            {searchResults.length === 0 ? (
              <div className="px-4 py-3 text-xs text-slate-400">
                No entities found matching "{searchQuery}"
              </div>
            ) : (
              searchResults.map(entity => (
                <button
                  key={entity.id}
                  onClick={() => {
                    onSelectEntity(entity);
                    setSearchFocused(false);
                    setSearchQuery('');
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-slate-800/70 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <div>
                      <div className="text-xs font-medium text-slate-200 group-hover:text-cyan-300">
                        {entity.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {entity.role || entity.type} • {entity.connectionsCount} connections
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Score: {entity.importanceScore}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 lg:gap-3.5">
        {/* Guided Hackathon Tour Button */}
        <button
          onClick={onStartDemoTour}
          id="hackathon-tour-btn"
          className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-medium transition-all shadow-[0_0_12px_rgba(6,182,212,0.15)] hover:shadow-[0_0_16px_rgba(6,182,212,0.3)]"
          title="Interactive 3-minute hackathon walkthrough matching evaluation criteria"
        >
          <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Demo Tour</span>
        </button>

        {/* Case Selector Dropdown */}
        <div ref={caseMenuRef} className="relative">
          <button
            onClick={() => setCaseMenuOpen(!caseMenuOpen)}
            id="case-selector-dropdown-btn"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-colors"
          >
            <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">CASE:</span>
            <span className="font-semibold text-slate-200 max-w-[130px] sm:max-w-none truncate">
              {currentCase.name}
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Active
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {caseMenuOpen && (
            <div className="absolute right-0 top-11 w-64 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800">
                Active Dossiers & Inquiries
              </div>
              {cases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCase(c);
                    setCaseMenuOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left hover:bg-slate-800/80 flex items-start justify-between transition-colors ${
                    c.id === currentCase.id ? 'bg-cyan-500/10 border-l-2 border-cyan-400' : ''
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{c.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{c.code}</div>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    c.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {c.status}
                  </span>
                </button>
              ))}
              <div className="px-3 pt-2 border-t border-slate-800">
                <button 
                  onClick={() => {
                    onNavigate('case-management');
                    setCaseMenuOpen(false);
                  }}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  Manage all case files <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div ref={notifMenuRef} className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            id="notifications-bell-btn"
            className="relative p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
            title="Active Intelligence Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-11 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-4 py-2 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-slate-200">Suspicious Pattern Alerts</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">
                  {alerts.length} High Priority
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                {alerts.slice(0, 4).map(alert => (
                  <div 
                    key={alert.id}
                    onClick={() => {
                      onNavigate('alerts');
                      setNotificationsOpen(false);
                    }}
                    className="p-3 hover:bg-slate-800/60 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-200">{alert.title}</span>
                      <span className="text-[9px] font-mono text-rose-400 bg-rose-500/10 px-1 rounded border border-rose-500/20">
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                      {alert.description}
                    </p>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">
                      {alert.timeWindow}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-3 pt-2 border-t border-slate-800 text-center">
                <button
                  onClick={() => {
                    onNavigate('alerts');
                    setNotificationsOpen(false);
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium py-1"
                >
                  View all {alerts.length} suspicious alerts →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Investigator Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-xs text-cyan-300">
            VR
          </div>
          <div className="hidden lg:block text-left">
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-slate-200">Insp. V. Rathore</span>
              <UserCheck className="w-3 h-3 text-cyan-400" />
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Cyber Crime Intel Unit
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
