import { Entity, Relationship, EntityType } from '../types';

export const ENTITY_COLORS: Record<EntityType, { bg: string; border: string; text: string; glow: string; badge: string }> = {
  person: {
    bg: '#f43f5e', // Rose/Pink
    border: '#fb7185',
    text: '#ffe4e6',
    glow: 'rgba(244, 63, 94, 0.4)',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
  },
  phone: {
    bg: '#06b6d4', // Cyan
    border: '#22d3ee',
    text: '#cffafe',
    glow: 'rgba(6, 182, 212, 0.4)',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  },
  bank_account: {
    bg: '#10b981', // Emerald
    border: '#34d399',
    text: '#d1fae5',
    glow: 'rgba(16, 185, 129, 0.4)',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
  vehicle: {
    bg: '#f59e0b', // Amber
    border: '#fbbf24',
    text: '#fef3c7',
    glow: 'rgba(245, 158, 11, 0.4)',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  },
  location: {
    bg: '#a855f7', // Purple
    border: '#c084fc',
    text: '#f3e8ff',
    glow: 'rgba(168, 85, 247, 0.4)',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
  },
  organization: {
    bg: '#0284c7', // Sky Blue
    border: '#38bdf8',
    text: '#e0f2fe',
    glow: 'rgba(2, 132, 199, 0.4)',
    badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30'
  },
  case: {
    bg: '#6366f1', // Indigo
    border: '#818cf8',
    text: '#e0e7ff',
    glow: 'rgba(99, 102, 241, 0.4)',
    badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
  }
};

export function getEntityColor(type: EntityType) {
  return ENTITY_COLORS[type] || ENTITY_COLORS.person;
}

export function getRelationshipColor(type: string): string {
  switch (type) {
    case 'called':
      return '#06b6d4'; // Cyan
    case 'transferred':
      return '#10b981'; // Emerald
    case 'visited':
    case 'frequented':
      return '#a855f7'; // Purple
    case 'owns':
      return '#f59e0b'; // Amber
    case 'signatory':
      return '#3b82f6'; // Blue
    default:
      return '#64748b'; // Slate
  }
}
