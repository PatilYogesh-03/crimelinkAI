import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Sliders, 
  ShieldAlert, 
  Database, 
  Cpu, 
  Lock, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [minConfidence, setMinConfidence] = useState<number>(75);
  const [communityThreshold, setCommunityThreshold] = useState<number>(0.65);
  const [darkRadarGlow, setDarkRadarGlow] = useState<boolean>(true);
  const [auditLogging, setAuditLogging] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 text-left max-w-4xl">
      {/* View Header */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Intelligence System Settings
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              OPERATIONAL CONFIG
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure graph layout physics, heuristic thresholds, and evidentiary compliance rules.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)] flex items-center gap-2"
        >
          {saved ? <CheckCircle2 className="w-4 h-4" /> : <Sliders className="w-4 h-4" />}
          <span>{saved ? 'Settings Saved' : 'Apply Configuration'}</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* Model Thresholds */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase">
            <Cpu className="w-4 h-4" />
            <span>AI Inference & Confidence Thresholds</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-300 font-mono mb-1">
                <span>Minimum Entity Linking Confidence:</span>
                <span className="text-cyan-400 font-bold">{minConfidence}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={minConfidence}
                onChange={(e) => setMinConfidence(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Entities with link confidence below {minConfidence}% will require manual operator confirmation.
              </p>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-xs text-slate-300 font-mono mb-1">
                <span>Louvain Community Resolution Index:</span>
                <span className="text-cyan-400 font-bold">{communityThreshold}</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="1.2"
                step="0.05"
                value={communityThreshold}
                onChange={(e) => setCommunityThreshold(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Controls cluster granularity. Lower values yield broader mega-cells, higher values yield tight tactical pods.
              </p>
            </div>
          </div>
        </div>

        {/* Security & Audit */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase">
            <ShieldAlert className="w-4 h-4" />
            <span>Compliance & Evidentiary Chain of Custody</span>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer">
              <div>
                <div className="text-white font-semibold">Enable Cryptographic Audit Trail</div>
                <div className="text-slate-400 text-[11px]">Log SHA-256 hash digests for every extracted relationship and view query.</div>
              </div>
              <input
                type="checkbox"
                checked={auditLogging}
                onChange={(e) => setAuditLogging(e.target.checked)}
                className="w-4 h-4 accent-cyan-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer">
              <div>
                <div className="text-white font-semibold">High-Contrast Intelligence Cyber UI Glow</div>
                <div className="text-slate-400 text-[11px]">Render animated pulses on key bridge nodes and anomaly links.</div>
              </div>
              <input
                type="checkbox"
                checked={darkRadarGlow}
                onChange={(e) => setDarkRadarGlow(e.target.checked)}
                className="w-4 h-4 accent-cyan-500"
              />
            </label>
          </div>
        </div>

        {/* Prototype Notice */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 font-mono">
          System Build: CRIMELINK-AI v2.4.0-PROTOTYPE | Synthetic Data Engine Active | No Real Police System Integration
        </div>
      </div>
    </div>
  );
};
