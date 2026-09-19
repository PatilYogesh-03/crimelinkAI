import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Users, 
  Phone, 
  CreditCard, 
  Car, 
  MapPin, 
  Building, 
  Briefcase, 
  Sparkles, 
  ChevronRight, 
  ExternalLink,
  ShieldAlert,
  ArrowUpDown
} from 'lucide-react';
import { Entity, EntityType } from '../types';
import { getEntityColor } from '../utils/graphLayout';

interface EntitiesViewProps {
  entities: Entity[];
  selectedEntity: Entity | null;
  onSelectEntity: (entity: Entity) => void;
  onExplainImportance: (entity: Entity) => void;
}

export const EntitiesView: React.FC<EntitiesViewProps> = ({
  entities,
  selectedEntity,
  onSelectEntity,
  onExplainImportance
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'score' | 'connections' | 'centrality' | 'name'>('score');

  const tabs = [
    { id: 'all', label: 'All Entities', count: entities.length, icon: null },
    { id: 'person', label: 'Persons', count: entities.filter(e => e.type === 'person').length, icon: Users },
    { id: 'phone', label: 'Phones', count: entities.filter(e => e.type === 'phone').length, icon: Phone },
    { id: 'bank_account', label: 'Bank Accounts', count: entities.filter(e => e.type === 'bank_account').length, icon: CreditCard },
    { id: 'vehicle', label: 'Vehicles', count: entities.filter(e => e.type === 'vehicle').length, icon: Car },
    { id: 'location', label: 'Locations', count: entities.filter(e => e.type === 'location').length, icon: MapPin },
    { id: 'organization', label: 'Organizations', count: entities.filter(e => e.type === 'organization').length, icon: Building },
    { id: 'case', label: 'Cases', count: entities.filter(e => e.type === 'case').length, icon: Briefcase }
  ];

  const filteredEntities = useMemo(() => {
    return entities.filter(entity => {
      if (activeTab !== 'all' && entity.type !== activeTab) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = entity.name.toLowerCase().includes(query);
        const matchesRole = entity.role && entity.role.toLowerCase().includes(query);
        const matchesPhone = entity.associatedPhone && entity.associatedPhone.includes(query);
        const matchesVehicle = entity.associatedVehicle && entity.associatedVehicle.toLowerCase().includes(query);
        const matchesLoc = entity.location && entity.location.toLowerCase().includes(query);
        return matchesName || matchesRole || matchesPhone || matchesVehicle || matchesLoc;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'score') return b.importanceScore - a.importanceScore;
      if (sortBy === 'connections') return b.connectionsCount - a.connectionsCount;
      if (sortBy === 'centrality') return b.centralityScore - a.centralityScore;
      return a.name.localeCompare(b.name);
    });
  }, [entities, activeTab, searchQuery, sortBy]);

  return (
    <div className="space-y-5 pb-12 text-left">
      {/* View Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Entity Intelligence Registry
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              {entities.length} TOTAL ENTITIES
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Structured catalog of all people, communication lines, bank accounts, vehicles, and facilities.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative min-w-[200px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone, plate..."
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded-lg px-2 h-8">
            <ArrowUpDown className="w-3 h-3 text-slate-400" />
            <span className="text-[11px] text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none font-mono"
            >
              <option value="score">Importance Score</option>
              <option value="connections">Connections Count</option>
              <option value="centrality">Centrality Score</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Entities Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredEntities.map((entity) => {
          const color = getEntityColor(entity.type);
          const isSelected = selectedEntity?.id === entity.id;

          return (
            <div
              key={entity.id}
              onClick={() => onSelectEntity(entity)}
              className={`p-4 rounded-xl bg-slate-900/80 border transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'border-cyan-400 bg-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: color.bg }} 
                    />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {entity.type === 'person' ? 'PERSON OF INTEREST' : entity.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {entity.isBridge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        BRIDGE
                      </span>
                    )}
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                      Score: {entity.importanceScore}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mt-2">
                  {entity.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  {entity.role || entity.communityName}
                </p>

                {/* Sub details */}
                <div className="mt-3 space-y-1 text-xs font-mono">
                  {entity.associatedPhone && (
                    <div className="text-slate-400 flex items-center justify-between">
                      <span className="text-slate-500">Phone:</span>
                      <span className="text-cyan-300">{entity.associatedPhone}</span>
                    </div>
                  )}
                  {entity.associatedVehicle && (
                    <div className="text-slate-400 flex items-center justify-between">
                      <span className="text-slate-500">Vehicle:</span>
                      <span className="text-amber-300">{entity.associatedVehicle}</span>
                    </div>
                  )}
                  {entity.location && (
                    <div className="text-slate-400 flex items-center justify-between">
                      <span className="text-slate-500">Location:</span>
                      <span className="text-slate-300">{entity.location}</span>
                    </div>
                  )}
                </div>

                {/* Alert tags */}
                {entity.alerts.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap gap-1">
                    {entity.alerts.slice(0, 2).map((alert, idx) => (
                      <span 
                        key={idx} 
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 truncate max-w-full"
                      >
                        {alert}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-slate-500">
                  {entity.connectionsCount} Connections • Centrality {entity.centralityScore}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onExplainImportance(entity);
                  }}
                  className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Explain AI</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
