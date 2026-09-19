import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Filter, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldAlert,
  ExternalLink,
  Search
} from 'lucide-react';
import { Alert, Entity } from '../types';

interface AlertsViewProps {
  alerts: Alert[];
  entities: Entity[];
  onSelectEntity: (entity: Entity) => void;
  onNavigateToGraphWithEntities: (entityIds: string[]) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts,
  entities,
  onSelectEntity,
  onNavigateToGraphWithEntities
}) => {
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [selectedAlertId, setSelectedAlertId] = useState<string>(alerts[0]?.id || '');

  const filteredAlerts = alerts.filter(a => {
    if (severityFilter === 'all') return true;
    return a.severity.toLowerCase() === severityFilter.toLowerCase();
  });

  const selectedAlert = alerts.find(a => a.id === selectedAlertId) || alerts[0];

  const getSeverityBadge = (sev: string) => {
    switch (sev.toLowerCase()) {
      case 'high':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'low':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 pb-12 text-left">
      {/* View Header */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Suspicious Pattern & Anomaly Detection
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {alerts.length} ALERTS ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Automated heuristic and graph anomaly detection uncovering money laundering chains, burner devices, and rendezvous.
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded-xl p-1">
          {['all', 'high', 'medium', 'low'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-all ${
                severityFilter === sev
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Main Alerts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of Alerts */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
          {filteredAlerts.map(alert => {
            const isSelected = alert.id === selectedAlert?.id;
            return (
              <div
                key={alert.id}
                onClick={() => setSelectedAlertId(alert.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-850 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${getSeverityBadge(alert.severity)}`}>
                    {alert.severity} PRIORITY
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {alert.timeWindow}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-white mt-2">
                  {alert.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {alert.description}
                </p>

                <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{alert.entitiesInvolved.length} entities involved</span>
                  <span className="text-cyan-400 font-semibold">{alert.category}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Alert Dossier Inspector */}
        {selectedAlert && (
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${getSeverityBadge(selectedAlert.severity)}`}>
                    {selectedAlert.severity} SEVERITY
                  </span>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {selectedAlert.category}
                  </span>
                </div>
                <h2 className="text-lg font-black text-white mt-2">
                  {selectedAlert.title}
                </h2>
                <div className="text-xs font-mono text-slate-400 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Observation Window: {selectedAlert.timeWindow}</span>
                </div>
              </div>

              <button
                onClick={() => onNavigateToGraphWithEntities(selectedAlert.entitiesInvolved)}
                className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)] shrink-0 flex items-center gap-1.5"
              >
                <span>Investigate in Graph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Pattern Description */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs leading-relaxed text-slate-200">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1 font-bold">
                Pattern Analysis:
              </span>
              {selectedAlert.description}
            </div>

            {/* Entities Involved */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 block font-bold">
                Entities Linked to Pattern ({selectedAlert.entitiesInvolved.length}):
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedAlert.entitiesInvolved.map(entityId => {
                  const ent = entities.find(e => e.id === entityId);
                  return (
                    <button
                      key={entityId}
                      onClick={() => ent && onSelectEntity(ent)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs text-slate-200 flex items-center gap-2 transition-colors group"
                    >
                      <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                      <span className="font-semibold text-white">{ent?.name || entityId}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({ent?.type || 'entity'})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Recommended Investigative Action */}
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>AI Recommended Operational Next Step</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                Issue section 91 notice to intermediary financial institutions for accounts {selectedAlert.entitiesInvolved.join(', ')} and issue formal preservation orders on associated cell tower azimuths.
              </p>
            </div>

            {/* Corroborating Evidence Files */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 block font-bold">
                Corroborating Evidentiary Files ({selectedAlert.evidenceFiles.length}):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedAlert.evidenceFiles.map(file => (
                  <div
                    key={file}
                    className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs font-mono text-slate-200"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{file}</span>
                    </div>
                    <span className="text-[10px] text-cyan-400">Verified</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notice Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-amber-400 text-xs font-mono">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>AI alerts require investigator corroboration before courtroom submission.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
