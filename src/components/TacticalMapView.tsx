import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Layers, 
  ShieldAlert, 
  Users, 
  Car, 
  Clock, 
  ExternalLink,
  Building,
  Sparkles
} from 'lucide-react';
import { Entity } from '../types';

interface TacticalMapViewProps {
  entities: Entity[];
  onSelectEntity: (entity: Entity) => void;
}

export const TacticalMapView: React.FC<TacticalMapViewProps> = ({
  entities,
  onSelectEntity
}) => {
  const [selectedPinId, setSelectedPinId] = useState<string>('loc-warehouse-a');

  const tacticalLocations = [
    {
      id: 'loc-warehouse-a',
      name: 'Warehouse A (Secunderabad)',
      type: 'Staging Hub',
      coordinates: '17.4399° N, 78.4983° E',
      x: 38, // percentage for visual map
      y: 35,
      significance: 'Critical logistics staging depot with 8 documented visits by Rahul Sharma and 6 visits by Arjun Rao.',
      associatedEntities: ['Rahul Sharma', 'Arjun Rao', 'Ramesh Kumar', 'TS09AB1234'],
      lastSurveillance: '02-AUG-2026 21:20 IST',
      securityStatus: 'Active Stakeout'
    },
    {
      id: 'loc-office-b',
      name: 'Office B (Banjara Hills)',
      type: 'Corporate Front',
      coordinates: '17.4156° N, 78.4350° E',
      x: 65,
      y: 52,
      significance: 'Registered office of Zenith Trading Ltd. Signatory documents and banking tokens seized during audit.',
      associatedEntities: ['Ramesh Kumar', 'Vikram Singh', 'Zenith Trading Ltd'],
      lastSurveillance: '02-AUG-2026 14:00 IST',
      securityStatus: 'Monitored'
    },
    {
      id: 'loc-residential-14',
      name: 'Residential Plot 14 (Jubilee Hills)',
      type: 'Private Residence',
      coordinates: '17.4319° N, 78.4073° E',
      x: 25,
      y: 60,
      significance: 'Primary residence of Vikram Singh. High-security perimeter with surveillance counter-measures.',
      associatedEntities: ['Vikram Singh', 'Org Alpha'],
      lastSurveillance: '01-AUG-2026 10:15 IST',
      securityStatus: 'Discreet Watch'
    },
    {
      id: 'loc-transport-hub',
      name: 'Transport Hub Central (Kachiguda)',
      type: 'Transit Depot',
      coordinates: '17.3895° N, 78.4988° E',
      x: 52,
      y: 75,
      significance: 'Interstate cargo consolidation node linking Hyderabad to Bangalore dispatch corridors.',
      associatedEntities: ['Suresh Patel', 'Arjun Rao', 'AP11CD5678'],
      lastSurveillance: '03-AUG-2026 04:30 IST',
      securityStatus: 'Automated ANPR'
    },
    {
      id: 'loc-safehouse-north',
      name: 'Safehouse North (Medchal Outskirts)',
      type: 'Clandestine Stash',
      coordinates: '17.6297° N, 78.4812° E',
      x: 48,
      y: 18,
      significance: 'Isolated property identified through cellular tower triangulation during burst call sessions.',
      associatedEntities: ['Rahul Sharma', '9000000001'],
      lastSurveillance: '03-AUG-2026 19:40 IST',
      securityStatus: 'High Alert'
    }
  ];

  const activePin = tacticalLocations.find(l => l.id === selectedPinId) || tacticalLocations[0];

  return (
    <div className="space-y-6 pb-12 text-left">
      {/* View Header */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Tactical Surveillance Map
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              HYDERABAD METROPOLITAN ZONE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Geospatial correlation of staging points, corporate shell fronts, meeting sites, and transit routes.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20">
          <Layers className="w-4 h-4" />
          <span>5 Monitored Tactical Coordinates</span>
        </div>
      </div>

      {/* Main Map + Inspection Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stylized Cyber Map Canvas */}
        <div className="lg:col-span-8 relative h-[520px] rounded-2xl bg-[#070c17] border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center select-none">
          {/* Grid lines and radar circles */}
          <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
          <div className="absolute w-[450px] h-[450px] rounded-full border border-cyan-500/10 pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-cyan-500/20 pointer-events-none" />
          <div className="absolute w-[150px] h-[150px] rounded-full border border-cyan-500/30 pointer-events-none" />

          {/* Compass Rose */}
          <div className="absolute top-4 left-4 text-[10px] font-mono text-cyan-400/60 flex flex-col items-center">
            <span className="font-bold">N</span>
            <div className="w-0.5 h-6 bg-cyan-500/30" />
          </div>

          {/* Map Vector Lines between locations */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Route from Warehouse A to Banjara Hills */}
            <line x1="38%" y1="35%" x2="65%" y2="52%" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
            {/* Route from Warehouse A to Safehouse North */}
            <line x1="38%" y1="35%" x2="48%" y2="18%" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
            {/* Route from Banjara Hills to Transport Hub */}
            <line x1="65%" y1="52%" x2="52%" y2="75%" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
          </svg>

          {/* Interactive Tactical Pins */}
          {tacticalLocations.map((loc) => {
            const isSelected = selectedPinId === loc.id;
            return (
              <div
                key={loc.id}
                onClick={() => setSelectedPinId(loc.id)}
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              >
                {/* Ping ring */}
                <div className={`w-10 h-10 -ml-2 -mt-2 rounded-full absolute pointer-events-none ${
                  isSelected ? 'border-2 border-cyan-400 animate-ping' : 'opacity-0'
                }`} />

                {/* Pin Head */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shadow-xl transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 border-white scale-125 shadow-[0_0_20px_rgba(6,182,212,0.8)]'
                    : 'bg-slate-900/90 text-cyan-400 border-cyan-500/50 hover:scale-110 hover:border-cyan-400'
                }`}>
                  <MapPin className="w-4 h-4" />
                </div>

                {/* Pin Label */}
                <div className={`absolute left-1/2 -translate-x-1/2 top-9 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap border pointer-events-none transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-cyan-300 border-cyan-400 font-bold'
                    : 'bg-slate-950/80 text-slate-400 border-slate-800'
                }`}>
                  {loc.name.split(' ')[0]}
                </div>
              </div>
            );
          })}

          <div className="absolute bottom-3 left-3 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg text-[10px] font-mono text-slate-400 backdrop-blur">
            GEODATA: WGS84 • GRID RESOLUTION 50m • TOWER COVERAGE 99.2%
          </div>
        </div>

        {/* Selected Location Dossier */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                TACTICAL STAGING DOSSIER
              </span>
              <h2 className="text-base font-bold text-white mt-1">
                {activePin.name}
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {activePin.securityStatus}
            </span>
          </div>

          <div className="space-y-1 text-xs font-mono">
            <div className="text-slate-400 flex justify-between">
              <span className="text-slate-500">Coordinates:</span>
              <span className="text-slate-200">{activePin.coordinates}</span>
            </div>
            <div className="text-slate-400 flex justify-between">
              <span className="text-slate-500">Classification:</span>
              <span className="text-cyan-300">{activePin.type}</span>
            </div>
            <div className="text-slate-400 flex justify-between">
              <span className="text-slate-500">Last Observation:</span>
              <span className="text-slate-200">{activePin.lastSurveillance}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            {activePin.significance}
          </div>

          {/* Associated Entities */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 block font-bold">
              Correlated Entities at Site:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activePin.associatedEntities.map((entName, i) => {
                const ent = entities.find(e => e.name.toLowerCase() === entName.toLowerCase());
                return (
                  <button
                    key={i}
                    onClick={() => ent && onSelectEntity(ent)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono border border-slate-700 transition-colors"
                  >
                    {entName}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Geospatial hits require field officer verification before warrant drafting.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
