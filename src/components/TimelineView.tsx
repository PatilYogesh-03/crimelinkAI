import React, { useState } from 'react';
import { 
  Clock, 
  Filter, 
  Phone, 
  CreditCard, 
  Car, 
  MapPin, 
  AlertTriangle, 
  FileText, 
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { TimelineEvent, Entity } from '../types';

interface TimelineViewProps {
  events: TimelineEvent[];
  entities: Entity[];
  onSelectEntity: (entity: Entity) => void;
  filteredEntityId?: string | null;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  events,
  entities,
  onSelectEntity,
  filteredEntityId
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const days = ['all', '01-AUG-2026', '02-AUG-2026', '03-AUG-2026'];
  const categories = ['all', 'Communication', 'Financial', 'Location', 'Vehicle', 'Alert'];

  const filteredEvents = events.filter(e => {
    if (selectedDay !== 'all') {
      if (!e.date.includes(selectedDay)) return false;
    }
    if (selectedCategory !== 'all') {
      if (e.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    }
    if (filteredEntityId) {
      if (!e.entities.includes(filteredEntityId)) return false;
    }
    return true;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'communication': return Phone;
      case 'financial': return CreditCard;
      case 'location': return MapPin;
      case 'vehicle': return Car;
      case 'alert': return AlertTriangle;
      default: return Clock;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'communication': return 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30';
      case 'financial': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'location': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'vehicle': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'alert': return 'text-rose-400 bg-rose-500/20 border-rose-500/30';
      default: return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 pb-12 text-left">
      {/* View Header */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Chronological Incident Timeline
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              {filteredEvents.length} INCIDENTS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Reconstruct operational activity from initial contact to financial structuring and rendezvous.
          </p>
        </div>

        {/* Date Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded-xl p-1 overflow-x-auto">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-all whitespace-nowrap ${
                selectedDay === day
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {day === 'all' ? 'All Dates' : day}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {cat === 'all' ? 'All Channels' : cat}
          </button>
        ))}
      </div>

      {/* Vertical Timeline List */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-6 ml-3 sm:ml-4">
        {filteredEvents.map((evt, idx) => {
          const Icon = getCategoryIcon(evt.category);
          const colorClass = getCategoryColor(evt.category);

          return (
            <div key={evt.id} className="relative group">
              {/* Timeline dot */}
              <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border flex items-center justify-center bg-slate-950 ${colorClass}`}>
                <Icon className="w-3 h-3" />
              </div>

              {/* Event Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-lg space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      {evt.date} • {evt.time}
                    </span>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase ${colorClass}`}>
                      {evt.category}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400">
                    Source: <strong className="text-slate-300">{evt.evidence}</strong>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug">
                  {evt.title}
                </h3>
                <p className="text-xs text-slate-300/90 leading-relaxed">
                  {evt.description}
                </p>

                {/* Involved entities pills */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono uppercase text-slate-500">Entities Linked:</span>
                  {evt.entities.map(entityId => {
                    const ent = entities.find(e => e.id === entityId);
                    return (
                      <button
                        key={entityId}
                        onClick={() => ent && onSelectEntity(ent)}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-[11px] border border-slate-700 transition-colors"
                      >
                        {ent?.name || entityId}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
