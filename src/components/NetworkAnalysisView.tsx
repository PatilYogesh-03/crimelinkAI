import React, { useState } from 'react';
import { 
  Share2, 
  Layers, 
  Sparkles, 
  AlertTriangle, 
  Download, 
  Filter, 
  Sliders, 
  RefreshCw,
  Info,
  Maximize2
} from 'lucide-react';
import { Entity, Relationship, Community } from '../types';
import { NetworkGraph } from './NetworkGraph';

interface NetworkAnalysisViewProps {
  entities: Entity[];
  relationships: Relationship[];
  communities: Community[];
  selectedEntity: Entity | null;
  onSelectEntity: (entity: Entity) => void;
  onExplainImportance: (entity: Entity) => void;
}

export const NetworkAnalysisView: React.FC<NetworkAnalysisViewProps> = ({
  entities,
  relationships,
  communities,
  selectedEntity,
  onSelectEntity,
  onExplainImportance
}) => {
  const [activeCommunityFilter, setActiveCommunityFilter] = useState<string | null>(null);

  const filteredEntities = activeCommunityFilter 
    ? entities.filter(e => e.communityName === activeCommunityFilter || e.isBridge)
    : entities;

  return (
    <div className="space-y-4 pb-12 text-left">
      {/* Workstation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Network Analysis Workstation
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              HIGH DENSITY
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual topological link analysis, Louvain community detection, and bridge entity identification.
          </p>
        </div>

        {/* Communities Quick Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveCommunityFilter(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              activeCommunityFilter === null
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Clusters ({communities.length})
          </button>

          {communities.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCommunityFilter(c.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                activeCommunityFilter === c.name
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 font-bold'
                  : 'border-slate-700 bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {c.name.replace('Community ', '')} ({c.entityCount})
            </button>
          ))}
        </div>
      </div>

      {/* Network Graph in Full Workstation Height */}
      <NetworkGraph
        entities={filteredEntities}
        relationships={relationships}
        communities={communities}
        selectedEntity={selectedEntity}
        onSelectEntity={onSelectEntity}
        onExplainImportance={onExplainImportance}
        fullHeight={true}
      />

      {/* Analytical Findings Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Cluster Breakdown */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Community Topology Breakdown</span>
          </div>
          <div className="space-y-2">
            {communities.map((comm) => (
              <div key={comm.id} className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs">
                <div className="flex justify-between items-center font-bold text-slate-200">
                  <span>{comm.name}</span>
                  <span className="font-mono text-cyan-400">{comm.entityCount} members</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{comm.subtitle}</p>
                <div className="text-[10px] text-slate-500 font-mono mt-1">
                  Key Coordinator: <strong className="text-slate-300">{comm.bridgeEntities.join(', ') || 'Operational Hub'}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bridge Entity Intelligence */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Key Bridge Entities</span>
          </div>
          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Entities that connect disparate functional cells. Severing or monitoring these nodes disrupts cross-cell coordination.
          </p>
          <div className="space-y-2">
            <div 
              onClick={() => {
                const r = entities.find(e => e.id === 'p-rahul');
                if (r) onSelectEntity(r);
              }}
              className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 hover:border-amber-400 cursor-pointer transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-300">Rahul Sharma</span>
                <span className="text-[10px] font-mono px-1.5 rounded bg-amber-500/20 text-amber-300">
                  Score: 92
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Bridges North Logistics cell to South Distribution and Financial Layering.
              </p>
            </div>

            <div 
              onClick={() => {
                const r = entities.find(e => e.id === 'p-ramesh');
                if (r) onSelectEntity(r);
              }}
              className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-cyan-300">Ramesh Kumar</span>
                <span className="text-[10px] font-mono px-1.5 rounded bg-cyan-500/20 text-cyan-300">
                  Score: 84
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Bridges corporate corporate front entities to mule disbursement accounts.
              </p>
            </div>
          </div>
        </div>

        {/* Graph Centrality Distribution */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Investigative Graph Centrality</span>
            </div>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Degree centrality, betweenness, and eigenvector scores are computed using graph analysis algorithms to prioritize lead verification.
            </p>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Network Density:</span>
                <span className="text-cyan-400">0.142 (Sparse Modular)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Modularity Index (Q):</span>
                <span className="text-cyan-400">0.684 (High Clustering)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Average Degree:</span>
                <span className="text-cyan-400">4.12 links / node</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-[11px] text-slate-400">
            Graph analysis flags structural brokers between decentralized nodes without assuming guilt.
          </div>
        </div>
      </div>
    </div>
  );
};
