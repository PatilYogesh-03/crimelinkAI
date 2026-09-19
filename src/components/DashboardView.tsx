import React from 'react';
import { 
  Users, 
  Phone, 
  CreditCard, 
  Car, 
  MapPin, 
  Briefcase, 
  AlertTriangle, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Share2, 
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { Entity, Relationship, Community, Alert, CaseFile } from '../types';
import { NetworkGraph } from './NetworkGraph';
import { getEntityColor } from '../utils/graphLayout';

interface DashboardViewProps {
  currentCase: CaseFile;
  entities: Entity[];
  relationships: Relationship[];
  communities: Community[];
  alerts: Alert[];
  selectedEntity: Entity | null;
  onSelectEntity: (entity: Entity) => void;
  onExplainImportance: (entity: Entity) => void;
  onNavigate: (tabId: string) => void;
  onStartDemoTour: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentCase,
  entities,
  relationships,
  communities,
  alerts,
  selectedEntity,
  onSelectEntity,
  onExplainImportance,
  onNavigate,
  onStartDemoTour
}) => {
  // Metric counts
  const personsCount = entities.filter(e => e.type === 'person').length;
  const phonesCount = entities.filter(e => e.type === 'phone').length;
  const accountsCount = entities.filter(e => e.type === 'bank_account').length;
  const vehiclesCount = entities.filter(e => e.type === 'vehicle').length;
  const locationsCount = entities.filter(e => e.type === 'location').length;
  const casesCount = entities.filter(e => e.type === 'case').length;

  // Top network entities sorted by importance score
  const topEntities = [...entities]
    .filter(e => e.type === 'person')
    .sort((a, b) => b.importanceScore - a.importanceScore)
    .slice(0, 5);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Hero Intelligence Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-[#0a1224] to-slate-950 p-6 lg:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-3xl text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                CRIMELINK AI INTELLIGENCE PLATFORM
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                ACTIVE CASE: {currentCase.name.toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Connecting the Hidden. Revealing the Network.
            </h1>
            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
              AI-powered criminal network intelligence converting fragmented FIRs, CDR calls, bank layering trails, and surveillance into actionable relationship graphs.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onStartDemoTour}
              id="explore-investigation-btn"
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>Explore Investigation</span>
            </button>
            <button
              onClick={() => onNavigate('network')}
              id="view-network-btn"
              className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span>View Network</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top-Level Statistics (Data Processed) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Persons */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition-all text-left group">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">PERSONS</span>
            <Users className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white">{personsCount}</div>
          <div className="text-[10px] text-rose-400 font-mono mt-0.5 font-semibold">PERSONS OF INTEREST</div>
        </div>

        {/* Phones */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all text-left group">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">PHONES</span>
            <Phone className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white">{phonesCount}</div>
          <div className="text-[10px] text-cyan-400 font-mono mt-0.5 font-semibold">SUBSCRIBER LINES</div>
        </div>

        {/* Bank Accounts */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all text-left group">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">BANK ACCOUNTS</span>
            <CreditCard className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white">{accountsCount}</div>
          <div className="text-[10px] text-emerald-400 font-mono mt-0.5 font-semibold">MULE & ESCROWS</div>
        </div>

        {/* Vehicles */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all text-left group">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">VEHICLES</span>
            <Car className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white">{vehiclesCount}</div>
          <div className="text-[10px] text-amber-400 font-mono mt-0.5 font-semibold">TRANSIT FLEET</div>
        </div>

        {/* Locations */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all text-left group">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">LOCATIONS</span>
            <MapPin className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white">{locationsCount}</div>
          <div className="text-[10px] text-purple-400 font-mono mt-0.5 font-semibold">STAGING SITES</div>
        </div>

        {/* Cases */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all text-left group">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">CASES</span>
            <Briefcase className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white">{casesCount}</div>
          <div className="text-[10px] text-indigo-400 font-mono mt-0.5 font-semibold">ACTIVE & ARCHIVED</div>
        </div>
      </div>

      {/* 3. Sub-Metrics Cards (Alerts, Communities, Bridges) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Suspicious Patterns */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 to-slate-900/80 border border-rose-500/30 flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-semibold">
                SUSPICIOUS PATTERNS
              </div>
              <div className="text-xl font-black text-white">
                {alerts.length} Active Alerts
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('alerts')}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold border border-rose-500/40 transition-colors"
          >
            Review Alerts
          </button>
        </div>

        {/* Detected Communities */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-slate-900/80 border border-cyan-500/30 flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                COMMUNITIES
              </div>
              <div className="text-xl font-black text-white">
                {communities.length} Detected Clusters
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('network')}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold border border-cyan-500/40 transition-colors"
          >
            View Clusters
          </button>
        </div>

        {/* Potential Bridge Entities */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 to-slate-900/80 border border-amber-500/30 flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                NETWORK BRIDGES
              </div>
              <div className="text-xl font-black text-white">
                2 Potential Bridges
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              const rahul = entities.find(e => e.id === 'p-rahul');
              if (rahul) onSelectEntity(rahul);
              onNavigate('network');
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold border border-amber-500/40 transition-colors"
          >
            Inspect Bridges
          </button>
        </div>
      </div>

      {/* 4. Centerpiece: Investigation Network Graph */}
      <div className="space-y-2 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Investigation Network
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                INTERACTIVE GRAPH
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any node (e.g. <strong className="text-cyan-400 cursor-pointer" onClick={() => {
                const r = entities.find(e => e.id === 'p-rahul');
                if (r) onSelectEntity(r);
              }}>Rahul Sharma</strong>, <strong className="text-purple-400 cursor-pointer" onClick={() => {
                const w = entities.find(e => e.id === 'loc-warehouse-a');
                if (w) onSelectEntity(w);
              }}>Warehouse A</strong>) to inspect its dossier & explain AI importance.
            </p>
          </div>

          <button
            onClick={() => onNavigate('network')}
            className="self-start sm:self-auto text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 py-1 px-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all"
          >
            <span>Full Workstation View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* The Graph Canvas */}
        <NetworkGraph
          entities={entities}
          relationships={relationships}
          communities={communities}
          selectedEntity={selectedEntity}
          onSelectEntity={onSelectEntity}
          onExplainImportance={onExplainImportance}
        />
      </div>

      {/* 5. Bottom Two Columns: Top Network Entities & Detected Suspicious Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
        {/* Top Network Entities */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  TOP NETWORK ENTITIES
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                BY CENTRALITY
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 mb-4">
              Analytical network importance scores (not a criminality score).
            </p>

            <div className="space-y-2.5">
              {topEntities.map((entity, index) => (
                <div
                  key={entity.id}
                  onClick={() => onSelectEntity(entity)}
                  className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/40 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 font-mono text-xs font-bold text-slate-300 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                      {index + 1}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                        <span>{entity.name}</span>
                        {entity.isBridge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            Bridge
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {entity.connectionsCount} Connections • {entity.role || entity.communityName}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-black font-mono text-cyan-400">
                      Score: {entity.importanceScore}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Centrality: {entity.centralityScore}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-800/80">
            <button
              onClick={() => onNavigate('entities')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              Explore all {entities.length} network entities in registry →
            </button>
          </div>
        </div>

        {/* Detected Suspicious Patterns */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  DETECTED SUSPICIOUS PATTERNS
                </h3>
              </div>
              <button 
                onClick={() => onNavigate('alerts')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
              >
                <span>View all 7 alerts</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {/* Pattern 1 */}
              <div 
                onClick={() => onNavigate('alerts')}
                className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/70 hover:border-rose-500/50 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                    HIGH PRIORITY
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">AUG 01, 19:40</span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1.5">Unusual Transaction Chain</h4>
                <div className="text-[11px] font-mono text-cyan-300 bg-slate-950/70 p-1.5 rounded mt-1 border border-slate-800">
                  A001 → A002 → A003 → A004 | ₹85,000 → ₹82,000 → ₹79,000
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Detected rapid structuring within a short 40-minute window across 4 accounts.
                </p>
              </div>

              {/* Pattern 2 */}
              <div 
                onClick={() => onNavigate('alerts')}
                className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/70 hover:border-amber-500/50 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    MEDIUM PRIORITY
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">AUG 03, 19:40</span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1.5">Communication Spike Ahead of Movement</h4>
                <div className="text-[11px] text-slate-300 mt-0.5 font-mono">
                  Normal: <span className="text-slate-400">5 calls/day</span> | Observed: <span className="text-amber-400 font-bold">47 calls/day</span>
                </div>
              </div>

              {/* Pattern 3 */}
              <div 
                onClick={() => onNavigate('alerts')}
                className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/70 hover:border-amber-500/50 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    MEDIUM PRIORITY
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">AUG 02, 22:10</span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1.5">Shared Location Rendezvous</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  3 persons (Rahul, Ramesh, Arjun) repeatedly associated with Warehouse A during off-hours.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>AI alerts are investigative leads requiring human verification.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
