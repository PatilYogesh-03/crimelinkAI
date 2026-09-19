import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  Search, 
  Filter, 
  Sparkles, 
  Layers, 
  AlertTriangle,
  Users,
  Phone,
  CreditCard,
  Car,
  MapPin,
  Building,
  Briefcase,
  Check
} from 'lucide-react';
import { Entity, Relationship, EntityType, Community } from '../types';
import { ENTITY_COLORS, getEntityColor, getRelationshipColor } from '../utils/graphLayout';

interface NetworkGraphProps {
  entities: Entity[];
  relationships: Relationship[];
  communities: Community[];
  selectedEntity: Entity | null;
  onSelectEntity: (entity: Entity) => void;
  fullHeight?: boolean;
  onExplainImportance?: (entity: Entity) => void;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  entities,
  relationships,
  communities,
  selectedEntity,
  onSelectEntity,
  fullHeight = false,
  onExplainImportance
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Filters
  const [typeFilters, setTypeFilters] = useState<Record<EntityType, boolean>>({
    person: true,
    phone: true,
    bank_account: true,
    vehicle: true,
    location: true,
    organization: true,
    case: true
  });

  const [relFilters, setRelFilters] = useState<Record<string, boolean>>({
    called: true,
    transferred: true,
    visited: true,
    frequented: true,
    owns: true,
    associated: true,
    signatory: true
  });

  // Highlight modes
  const [highlightCommunities, setHighlightCommunities] = useState<boolean>(true);
  const [highlightKeyEntities, setHighlightKeyEntities] = useState<boolean>(false);
  const [highlightAnomalies, setHighlightAnomalies] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Dimensions of SVG canvas viewport
  const baseWidth = 1100;
  const baseHeight = fullHeight ? 780 : 560;

  // Filtered nodes
  const visibleEntities = useMemo(() => {
    return entities.filter(e => {
      if (!typeFilters[e.type]) return false;
      if (searchTerm.trim() && !e.name.toLowerCase().includes(searchTerm.toLowerCase()) && !(e.role && e.role.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }
      return true;
    });
  }, [entities, typeFilters, searchTerm]);

  const visibleEntityIds = useMemo(() => new Set(visibleEntities.map(e => e.id)), [visibleEntities]);

  // Filtered links
  const visibleRelationships = useMemo(() => {
    return relationships.filter(r => {
      if (!visibleEntityIds.has(r.source) || !visibleEntityIds.has(r.target)) return false;
      if (!relFilters[r.type]) return false;
      return true;
    });
  }, [relationships, visibleEntityIds, relFilters]);

  // Connected node IDs for active selection or hover
  const activeFocusId = selectedEntity?.id || hoveredNodeId;
  const connectedNodeIds = useMemo(() => {
    if (!activeFocusId) return null;
    const set = new Set<string>([activeFocusId]);
    relationships.forEach(r => {
      if (r.source === activeFocusId) set.add(r.target);
      if (r.target === activeFocusId) set.add(r.source);
    });
    return set;
  }, [activeFocusId, relationships]);

  // Zoom handlers
  const handleZoomIn = () => setZoom(prev => Math.min(2.5, prev + 0.15));
  const handleZoomOut = () => setZoom(prev => Math.max(0.4, prev - 0.15));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    setZoom(prev => Math.min(2.5, Math.max(0.4, prev + delta)));
  };

  // Quick action presets
  const handleFindCommunities = () => {
    setHighlightCommunities(true);
    setHighlightKeyEntities(false);
    setHighlightAnomalies(false);
  };

  const handleFindKeyEntities = () => {
    setHighlightKeyEntities(true);
    setHighlightCommunities(false);
    setHighlightAnomalies(false);
    // Find Rahul Sharma
    const rahul = entities.find(e => e.id === 'p-rahul');
    if (rahul) onSelectEntity(rahul);
  };

  const handleDetectAnomalies = () => {
    setHighlightAnomalies(true);
    setHighlightKeyEntities(false);
    setHighlightCommunities(false);
  };

  const handleResetGraph = () => {
    setTypeFilters({
      person: true,
      phone: true,
      bank_account: true,
      vehicle: true,
      location: true,
      organization: true,
      case: true
    });
    setRelFilters({
      called: true,
      transferred: true,
      visited: true,
      frequented: true,
      owns: true,
      associated: true,
      signatory: true
    });
    setHighlightCommunities(true);
    setHighlightKeyEntities(false);
    setHighlightAnomalies(false);
    setSearchTerm('');
    handleResetZoom();
  };

  // Node Icon Helper
  const getNodeIcon = (type: EntityType) => {
    switch (type) {
      case 'person': return Users;
      case 'phone': return Phone;
      case 'bank_account': return CreditCard;
      case 'vehicle': return Car;
      case 'location': return MapPin;
      case 'organization': return Building;
      case 'case': return Briefcase;
    }
  };

  // Entity lookup map
  const entityMap = useMemo(() => {
    const map = new Map<string, Entity>();
    entities.forEach(e => map.set(e.id, e));
    return map;
  }, [entities]);

  return (
    <div className="relative w-full rounded-2xl bg-[#090e1a] border border-slate-800/90 shadow-2xl overflow-hidden flex flex-col select-none">
      {/* Top Controls Toolbar */}
      <div className="p-3 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur flex flex-wrap items-center justify-between gap-3 z-10">
        {/* Search in graph */}
        <div className="flex items-center gap-2 flex-1 min-w-[220px] max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter graph node name..."
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
            />
          </div>
        </div>

        {/* Action Analysis Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={handleFindCommunities}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              highlightCommunities
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Find Communities</span>
          </button>

          <button
            onClick={handleFindKeyEntities}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              highlightKeyEntities
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Find Key Entities</span>
          </button>

          <button
            onClick={handleDetectAnomalies}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              highlightAnomalies
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.2)]'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/60'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Detect Anomalies</span>
          </button>

          <button
            onClick={handleResetGraph}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/60 flex items-center gap-1"
            title="Reset Filters and View"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Graph</span>
          </button>
        </div>
      </div>

      {/* Interactive Canvas Area */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className={`relative w-full overflow-hidden cursor-grab active:cursor-grabbing bg-[#080d18] bg-grid-pattern ${
          fullHeight ? 'h-[720px]' : 'h-[540px]'
        }`}
      >
        {/* Floating Zoom Controls (Top Left) */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-lg p-1 shadow-lg backdrop-blur">
          <button 
            onClick={handleZoomIn}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            onClick={handleZoomOut}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button 
            onClick={handleResetZoom}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            title="Fit to Screen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono text-slate-400 px-2 border-l border-slate-800">
            {Math.round(zoom * 100)}%
          </span>
        </div>

        {/* Floating Bridge Entities Badge */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-cyan-950/80 border border-cyan-500/40 rounded-xl px-3 py-1.5 shadow-[0_0_15px_rgba(6,182,212,0.2)] backdrop-blur">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <div className="text-xs">
            <span className="font-semibold text-cyan-300">2 Bridge Entities Detected</span>
            <span className="text-slate-400 ml-1.5 hidden sm:inline font-mono text-[11px]">Rahul Sharma & Ramesh Kumar</span>
          </div>
        </div>

        {/* Floating Legend for Entity Types (Bottom Left) */}
        <div className="absolute bottom-3 left-3 z-20 bg-slate-900/90 border border-slate-800/80 rounded-xl p-2.5 shadow-xl backdrop-blur hidden md:block max-w-xs">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
            <span>Entity Types</span>
            <span className="text-cyan-400 font-bold">{visibleEntities.length} Nodes</span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
            {(['person', 'phone', 'bank_account', 'vehicle', 'location', 'organization', 'case'] as EntityType[]).map(type => {
              const c = getEntityColor(type);
              const active = typeFilters[type];
              return (
                <button
                  key={type}
                  onClick={() => setTypeFilters(prev => ({ ...prev, [type]: !prev[type] }))}
                  className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded transition-all text-left ${
                    active ? 'opacity-100 hover:bg-slate-800' : 'opacity-40 line-through'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.bg }} />
                  <span className="capitalize text-slate-300 truncate">
                    {type === 'bank_account' ? 'Bank Account' : type}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SVG Network Canvas */}
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${baseWidth} ${baseHeight}`}
          className="w-full h-full"
        >
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} transform-origin="center">
            {/* Community Hulls / Clusters Background */}
            {highlightCommunities && (
              <g className="community-clusters pointer-events-none">
                {/* Community A - North Logistics */}
                <ellipse
                  cx="430"
                  cy="330"
                  rx="160"
                  ry="130"
                  fill="rgba(6, 182, 212, 0.05)"
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  opacity="0.6"
                />
                <text x="310" y="190" fill="#06b6d4" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600" opacity="0.8">
                  COMMUNITY A (North Logistics)
                </text>

                {/* Community B - Financial Layering */}
                <ellipse
                  cx="700"
                  cy="370"
                  rx="170"
                  ry="150"
                  fill="rgba(16, 185, 129, 0.05)"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  opacity="0.6"
                />
                <text x="630" y="210" fill="#10b981" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600" opacity="0.8">
                  COMMUNITY B (Financial Layering)
                </text>

                {/* Community C - South Distribution */}
                <ellipse
                  cx="570"
                  cy="580"
                  rx="170"
                  ry="110"
                  fill="rgba(168, 85, 247, 0.05)"
                  stroke="#a855f7"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  opacity="0.6"
                />
                <text x="500" y="690" fill="#a855f7" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600" opacity="0.8">
                  COMMUNITY C (South Distribution)
                </text>
              </g>
            )}

            {/* Connecting Edges / Relationships */}
            <g className="edges">
              {visibleRelationships.map(rel => {
                const sourceNode = entityMap.get(rel.source);
                const targetNode = entityMap.get(rel.target);
                if (!sourceNode || !targetNode || sourceNode.x === undefined || sourceNode.y === undefined || targetNode.x === undefined || targetNode.y === undefined) {
                  return null;
                }

                const isConnectedToActive = connectedNodeIds
                  ? connectedNodeIds.has(rel.source) && connectedNodeIds.has(rel.target)
                  : false;

                const isDimmed = activeFocusId && !isConnectedToActive;
                const edgeColor = getRelationshipColor(rel.type);
                const isHighlightChain = highlightAnomalies && (rel.id === 'r-29' || rel.id === 'r-30' || rel.id === 'r-31');

                const midX = (sourceNode.x + targetNode.x) / 2;
                const midY = (sourceNode.y + targetNode.y) / 2;

                return (
                  <g key={rel.id} className="transition-opacity duration-300">
                    <line
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isHighlightChain ? '#f43f5e' : (isConnectedToActive ? '#38bdf8' : edgeColor)}
                      strokeWidth={isHighlightChain ? 3.5 : (isConnectedToActive ? 2.5 : (rel.count ? 2 : 1.2))}
                      strokeDasharray={rel.type === 'called' ? '4 3' : isHighlightChain ? '6 3' : 'none'}
                      opacity={isDimmed ? 0.15 : (isConnectedToActive ? 1 : 0.65)}
                    />

                    {/* Edge Label for key relationships */}
                    {(isConnectedToActive || isHighlightChain || rel.id === 'r-1' || rel.id === 'r-29') && (
                      <g transform={`translate(${midX}, ${midY})`}>
                        <rect
                          x="-42"
                          y="-10"
                          width="84"
                          height="18"
                          rx="4"
                          fill="#0b1324"
                          stroke={isHighlightChain ? '#f43f5e' : edgeColor}
                          strokeWidth="1"
                          opacity="0.9"
                        />
                        <text
                          x="0"
                          y="2"
                          textAnchor="middle"
                          fill={isHighlightChain ? '#fda4af' : '#e2e8f0'}
                          fontSize="9"
                          fontFamily="JetBrains Mono"
                          fontWeight="600"
                        >
                          {rel.amount ? rel.amount : rel.label.slice(0, 14)}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>

            {/* Nodes */}
            <g className="nodes">
              {visibleEntities.map(entity => {
                if (entity.x === undefined || entity.y === undefined) return null;

                const isSelected = selectedEntity?.id === entity.id;
                const isHovered = hoveredNodeId === entity.id;
                const isConnected = connectedNodeIds?.has(entity.id);
                const isDimmed = activeFocusId && !isConnected;
                const isKeyEntity = highlightKeyEntities && (entity.id === 'p-rahul' || entity.id === 'p-ramesh' || entity.id === 'loc-warehouse-a');
                const isAnomaly = highlightAnomalies && (entity.id === 'ba-a001' || entity.id === 'ba-a002' || entity.id === 'ba-a003' || entity.id === 'ba-a004');

                const colors = getEntityColor(entity.type);
                const nodeRadius = entity.importanceScore > 80 ? 20 : (entity.importanceScore > 60 ? 16 : 12);
                const IconComponent = getNodeIcon(entity.type);

                return (
                  <g
                    key={entity.id}
                    transform={`translate(${entity.x}, ${entity.y})`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEntity(entity);
                    }}
                    onMouseEnter={() => setHoveredNodeId(entity.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className="cursor-pointer transition-all duration-200"
                    opacity={isDimmed ? 0.2 : 1}
                  >
                    {/* Pulsing ring for Bridge or Selected Entities */}
                    {(entity.isBridge || isSelected || isKeyEntity || isAnomaly) && (
                      <circle
                        r={nodeRadius + 8}
                        fill="none"
                        stroke={isAnomaly ? '#f43f5e' : (entity.isBridge ? '#06b6d4' : colors.border)}
                        strokeWidth="1.5"
                        strokeDasharray={entity.isBridge ? '4 2' : 'none'}
                        className="animate-pulse"
                        opacity="0.8"
                      />
                    )}

                    {/* Node Core Background */}
                    <circle
                      r={nodeRadius}
                      fill={colors.bg}
                      stroke={isSelected ? '#ffffff' : colors.border}
                      strokeWidth={isSelected ? 3 : 1.8}
                      className="shadow-lg"
                    />

                    {/* Node Center Icon */}
                    <foreignObject
                      x={-nodeRadius * 0.6}
                      y={-nodeRadius * 0.6}
                      width={nodeRadius * 1.2}
                      height={nodeRadius * 1.2}
                      className="pointer-events-none"
                    >
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <IconComponent className="w-3.5 h-3.5 drop-shadow" />
                      </div>
                    </foreignObject>

                    {/* Node Label */}
                    <text
                      x="0"
                      y={nodeRadius + 14}
                      textAnchor="middle"
                      fill={isSelected ? '#38bdf8' : (isHovered ? '#ffffff' : '#cbd5e1')}
                      fontSize={nodeRadius > 16 ? 11 : 9}
                      fontWeight={isSelected || isHovered || entity.isBridge ? '700' : '500'}
                      fontFamily="Plus Jakarta Sans"
                      className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] select-none pointer-events-none"
                    >
                      {entity.name}
                    </text>

                    {/* Subtitle label for high-importance nodes */}
                    {(entity.isBridge || entity.importanceScore > 80 || isSelected) && (
                      <text
                        x="0"
                        y={nodeRadius + 26}
                        textAnchor="middle"
                        fill="#06b6d4"
                        fontSize="8"
                        fontFamily="JetBrains Mono"
                        fontWeight="600"
                        className="drop-shadow select-none pointer-events-none"
                      >
                        {entity.isBridge ? 'Key Bridge Entity' : (entity.role ? entity.role.slice(0, 18) : '')}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </g>
        </svg>

        {/* Selected Entity Quick Actions Bar (Bottom Right inside Canvas) */}
        {selectedEntity && (
          <div className="absolute bottom-3 right-3 z-20 bg-slate-900/95 border border-slate-700 rounded-xl p-3 shadow-2xl backdrop-blur max-w-sm flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getEntityColor(selectedEntity.type).bg }} />
                <span className="text-xs font-bold text-white">{selectedEntity.name}</span>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20">
                  {selectedEntity.connectionsCount} links
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Importance Score: <span className="text-white font-bold">{selectedEntity.importanceScore}</span> • Centrality: {selectedEntity.centralityScore}
              </div>
            </div>

            {onExplainImportance && (
              <button
                onClick={() => onExplainImportance(selectedEntity)}
                className="px-2.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shrink-0 transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explain AI</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
