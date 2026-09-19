import React, { useState } from 'react';
import { 
  GitFork, 
  ArrowRight, 
  Sparkles, 
  Phone, 
  MapPin, 
  FileText, 
  CreditCard, 
  ShieldAlert, 
  Search,
  CheckCircle2,
  ExternalLink,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Entity, Relationship } from '../types';
import { getEntityColor } from '../utils/graphLayout';

interface RelationshipExplorerViewProps {
  entities: Entity[];
  relationships: Relationship[];
  initialEntityA?: Entity | null;
  initialEntityB?: Entity | null;
  onSelectEntity: (entity: Entity) => void;
}

export const RelationshipExplorerView: React.FC<RelationshipExplorerViewProps> = ({
  entities,
  relationships,
  initialEntityA,
  initialEntityB,
  onSelectEntity
}) => {
  // Pre-fill with Rahul Sharma and Ramesh Kumar as requested in Section 6
  const defaultA = initialEntityA || entities.find(e => e.id === 'p-rahul') || entities[0];
  const defaultB = initialEntityB || entities.find(e => e.id === 'p-ramesh') || entities[1];

  const [entityAId, setEntityAId] = useState<string>(defaultA?.id || '');
  const [entityBId, setEntityBId] = useState<string>(defaultB?.id || '');
  const [aiExplained, setAiExplained] = useState<boolean>(true);
  const [selectedEvidenceFile, setSelectedEvidenceFile] = useState<string | null>(null);

  const entityA = entities.find(e => e.id === entityAId);
  const entityB = entities.find(e => e.id === entityBId);

  // Find direct relationship
  const directRel = relationships.find(
    r => (r.source === entityAId && r.target === entityBId) ||
         (r.source === entityBId && r.target === entityAId)
  );

  // Evidence files
  const evidenceFiles = [
    { name: 'CDR_00482.csv', type: 'Call Detail Record', desc: '7 incoming/outgoing calls logged across 48 hours' },
    { name: 'Surveillance_Report_102.txt', type: 'Field Surveillance', desc: 'Direct face-to-face rendezvous documented at Warehouse A rear dock' },
    { name: 'Transaction_008.csv', type: 'Banking Ledger', desc: 'Layered fund dispersion executed within 40 minutes of meeting' }
  ];

  return (
    <div className="space-y-6 pb-12 text-left">
      {/* View Header */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Relationship & Link Explorer
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              PATH CORRELATION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Analyze direct and multi-hop connections between any two entities in the criminal network.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
          Algorithms: Shortest Path, Louvain Bridge, CDR Cross-Correlation
        </div>
      </div>

      {/* Entity Selector Pair */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Entity A Selector */}
          <div className="md:col-span-5 space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              INVESTIGATIVE ENTITY A
            </label>
            <select
              value={entityAId}
              onChange={(e) => setEntityAId(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white font-medium focus:outline-none focus:border-cyan-500"
            >
              {entities.map(e => (
                <option key={e.id} value={e.id}>
                  {e.name} ({e.type.toUpperCase()}) - Score: {e.importanceScore}
                </option>
              ))}
            </select>
            {entityA && (
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Role:</span>
                  <span className="text-cyan-300">{entityA.role || entityA.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Community:</span>
                  <span className="text-slate-300">{entityA.communityName}</span>
                </div>
              </div>
            )}
          </div>

          {/* Connection Indicator in middle */}
          <div className="md:col-span-1 flex justify-center py-2">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <GitFork className="w-5 h-5" />
            </div>
          </div>

          {/* Entity B Selector */}
          <div className="md:col-span-5 space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              INVESTIGATIVE ENTITY B
            </label>
            <select
              value={entityBId}
              onChange={(e) => setEntityBId(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white font-medium focus:outline-none focus:border-cyan-500"
            >
              {entities.map(e => (
                <option key={e.id} value={e.id}>
                  {e.name} ({e.type.toUpperCase()}) - Score: {e.importanceScore}
                </option>
              ))}
            </select>
            {entityB && (
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Role:</span>
                  <span className="text-cyan-300">{entityB.role || entityB.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Community:</span>
                  <span className="text-slate-300">{entityB.communityName}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Direct Connection & Evidence Breakdown Result */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-[#080d1a] border border-cyan-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold">
              LINK ANALYSIS RESULT
            </span>
            <h2 className="text-lg font-black text-white mt-0.5 flex items-center gap-2">
              <span>CONNECTION FOUND:</span>
              <span className="text-cyan-300">{entityA?.name}</span>
              <span className="text-slate-500">↔</span>
              <span className="text-cyan-300">{entityB?.name}</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
              Confidence: 94% Direct Correlation
            </span>
            <button
              onClick={() => setAiExplained(!aiExplained)}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explain Connection</span>
            </button>
          </div>
        </div>

        {/* AI Connection Explanation Card */}
        {aiExplained && (
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>AI Investigative Link Synthesis</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              "<strong>{entityA?.name}</strong> and <strong>{entityB?.name}</strong> show direct operational coordination. Their communication frequency increases sharply before major fund movements, and both individuals were documented meeting at Warehouse A on August 2 preceding the financial structuring sequence."
            </p>
          </div>
        )}

        {/* Observed Connection Evidence Breakdown */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-bold">
            Observed Relational Factors:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">7 Phone Calls Between Entities</div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Logged in CDR records between numbers 9000000001 and 9000000002 across Aug 01-03.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">1 Shared Location (Warehouse A)</div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Both individuals logged presence at Warehouse A, Secunderabad within a 2-hour window.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">1 Field Surveillance Report</div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Visual confirmation of physical handover of manifest envelopes by Unit Delta operatives.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">1 Associated Transaction Chain</div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Interconnected through corporate entities Zenith Trading & accounts A001 through A004.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Evidence Files List */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 font-bold">
            Evidence Files Corroborating Link ({evidenceFiles.length}):
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {evidenceFiles.map(file => (
              <div
                key={file.name}
                onClick={() => setSelectedEvidenceFile(file.name)}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300">{file.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{file.type}</div>
                <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{file.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Hop Path Visualizer */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Multi-Hop Intermediate Pathway Explorer</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">2-Hop & 3-Hop Graph Hops</span>
          </div>

          <div className="p-4 rounded-xl bg-[#090e1a] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 overflow-x-auto py-2">
              <span className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold shrink-0">
                {entityA?.name || 'Rahul Sharma'}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono shrink-0">
                Vehicle TS09AB1234
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-mono shrink-0">
                Warehouse A
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono shrink-0">
                Zenith Trading Ltd
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold shrink-0">
                {entityB?.name || 'Ramesh Kumar'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Indirect physical and financial corroboration confirmed through corporate signatory records and security perimeter logs.
            </p>
          </div>
        </div>

        {/* Verification Notice */}
        <div className="flex items-center gap-2 text-amber-400 text-xs font-mono pt-2 border-t border-slate-800">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>Investigation Notice: AI link predictions represent relational correlations and require evidentiary audit before filing.</span>
        </div>
      </div>
    </div>
  );
};
