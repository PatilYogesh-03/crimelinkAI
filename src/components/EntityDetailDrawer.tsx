import React from 'react';
import { 
  X, 
  Sparkles, 
  FileText, 
  GitFork, 
  Clock, 
  MapPin, 
  Phone, 
  Car, 
  AlertTriangle, 
  Layers, 
  Share2, 
  Activity,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { Entity, Relationship } from '../types';
import { getEntityColor } from '../utils/graphLayout';

interface EntityDetailDrawerProps {
  entity: Entity | null;
  onClose: () => void;
  onExplainImportance: (entity: Entity) => void;
  onViewEvidence: (entity: Entity) => void;
  onExplainConnection: (entity: Entity) => void;
  onViewTimeline: (entity: Entity) => void;
  onSelectRelatedEntity?: (entityId: string) => void;
  relationships?: Relationship[];
}

export const EntityDetailDrawer: React.FC<EntityDetailDrawerProps> = ({
  entity,
  onClose,
  onExplainImportance,
  onViewEvidence,
  onExplainConnection,
  onViewTimeline,
  relationships = []
}) => {
  if (!entity) return null;

  const color = getEntityColor(entity.type);

  // Filter direct relations
  const directRelationships = relationships.filter(
    r => r.source === entity.id || r.target === entity.id
  );

  return (
    <aside 
      className="w-full sm:w-96 shrink-0 border-l border-slate-800/90 bg-[#080d18] flex flex-col h-full overflow-hidden shadow-2xl transition-all select-none animate-in slide-in-from-right duration-200"
      id="entity-detail-drawer"
    >
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: color.bg }} 
          />
          <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400 font-bold">
            {entity.type === 'person' ? 'PERSON OF INTEREST' : 'INVESTIGATIVE ENTITY'}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Close Dossier"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-left">
        {/* Entity Title & Role */}
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            {entity.name}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">
            {entity.role || `${entity.type.toUpperCase()} • ${entity.communityName}`}
          </p>
          {entity.isBridge && (
            <span className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Potential Network Bridge
            </span>
          )}
        </div>

        {/* Action Buttons Cluster */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onExplainImportance(entity)}
            id="explain-importance-btn"
            className="col-span-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explain Importance</span>
          </button>

          <button
            onClick={() => onViewEvidence(entity)}
            id="view-evidence-btn"
            className="py-2 px-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Evidence</span>
          </button>

          <button
            onClick={() => onExplainConnection(entity)}
            id="explain-connection-btn"
            className="py-2 px-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <GitFork className="w-3.5 h-3.5 text-emerald-400" />
            <span>Explain Connection</span>
          </button>

          <button
            onClick={() => onViewTimeline(entity)}
            id="view-timeline-btn"
            className="col-span-2 py-2 px-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>View Timeline</span>
          </button>
        </div>

        {/* Network Metrics Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Connections</div>
            <div className="text-lg font-bold text-white mt-0.5">{entity.connectionsCount}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Centrality</div>
            <div className="text-lg font-bold text-cyan-400 mt-0.5">{entity.centralityScore}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Communities</div>
            <div className="text-lg font-bold text-purple-400 mt-0.5">{entity.isBridge ? 3 : 1}</div>
          </div>
        </div>

        {/* Core Dossier Attributes */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            DOSSIER IDENTIFIERS
          </div>

          {entity.location && (
            <div className="flex items-start gap-2 text-xs">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400">Location:</span>
                <div className="text-slate-200 font-medium">{entity.location}</div>
              </div>
            </div>
          )}

          {entity.associatedPhone && (
            <div className="flex items-start gap-2 text-xs">
              <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400">Associated Phone:</span>
                <div className="text-cyan-300 font-mono font-semibold">{entity.associatedPhone}</div>
              </div>
            </div>
          )}

          {entity.associatedVehicle && (
            <div className="flex items-start gap-2 text-xs">
              <Car className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400">Associated Vehicle:</span>
                <div className="text-amber-300 font-mono font-semibold">{entity.associatedVehicle}</div>
              </div>
            </div>
          )}

          {entity.knownLocations && entity.knownLocations.length > 0 && (
            <div className="flex items-start gap-2 text-xs">
              <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400">Known Locations:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {entity.knownLocations.map((loc, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-purple-300 font-mono text-[10px] border border-slate-700">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Suspicious Alerts */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              Associated Alerts ({entity.alerts.length})
            </span>
          </div>
          <div className="space-y-1.5">
            {entity.alerts.map((alert, idx) => (
              <div 
                key={idx}
                className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2 text-xs text-rose-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span>{alert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Network Connections List */}
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              Immediate Links ({directRelationships.length})
            </span>
          </div>
          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {directRelationships.map((r) => (
              <div
                key={r.id}
                className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs flex items-center justify-between"
              >
                <span className="text-slate-300 font-mono text-[11px] truncate max-w-[170px]">
                  {r.label}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  {r.confidence}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Last Activity */}
        <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-400">
          <span className="text-slate-500 font-mono block">LAST INTELLIGENCE LOG:</span>
          <span className="text-slate-300 font-mono mt-0.5 block">{entity.lastActivity}</span>
        </div>
      </div>
    </aside>
  );
};
