import React from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Users, 
  ArrowRight, 
  ExternalLink,
  Shield,
  FolderOpen
} from 'lucide-react';
import { CaseFile } from '../types';

interface CaseManagementViewProps {
  cases: CaseFile[];
  currentCase: CaseFile;
  onSelectCase: (c: CaseFile) => void;
  onNavigate: (tabId: string) => void;
}

export const CaseManagementView: React.FC<CaseManagementViewProps> = ({
  cases,
  currentCase,
  onSelectCase,
  onNavigate
}) => {
  return (
    <div className="space-y-6 pb-12 text-left">
      {/* View Header */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Case & Inquiry Dossier Management
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              {cases.length} REGISTERED INQUIRIES
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Organize multi-agency criminal intelligence portfolios, assign leads, and monitor investigation milestones.
          </p>
        </div>
      </div>

      {/* Case Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cases.map((c) => {
          const isActive = c.id === currentCase.id;
          return (
            <div
              key={c.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-900 border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {c.code}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${
                    c.status === 'Active'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {c.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mt-3">
                  {c.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {c.description}
                </p>

                <div className="mt-4 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span className="text-slate-500">Lead Investigator:</span>
                    <span className="text-slate-200">{c.leadInvestigator}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span className="text-slate-500">Entities Profiled:</span>
                    <span className="text-cyan-300 font-bold">{c.entitiesCount}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span className="text-slate-500">Active Alerts:</span>
                    <span className="text-emerald-300 font-bold">{c.alertsCount}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span className="text-slate-500">Last Updated:</span>
                    <span className="text-slate-300">{c.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                {isActive ? (
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
                  >
                    <FolderOpen className="w-4 h-4" />
                    <span>Currently Active Dossier</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onSelectCase(c);
                      onNavigate('dashboard');
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <span>Switch to this Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
