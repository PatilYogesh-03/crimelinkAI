export type EntityType = 
  | 'person'
  | 'phone'
  | 'bank_account'
  | 'vehicle'
  | 'location'
  | 'organization'
  | 'case';

export type RelationshipType = 
  | 'called'
  | 'owns'
  | 'transferred'
  | 'visited'
  | 'associated'
  | 'signatory'
  | 'frequented';

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  role?: string;
  importanceScore: number; // 0 - 100
  connectionsCount: number;
  centralityScore: number; // 0.0 - 1.0
  communityId: 'A' | 'B' | 'C';
  communityName: string;
  isBridge?: boolean;
  isHighPriority?: boolean;
  location?: string;
  associatedPhone?: string;
  associatedVehicle?: string;
  knownLocations?: string[];
  alerts: string[];
  lastActivity: string;
  description?: string;
  x?: number; // Graph positioning
  y?: number;
  // Extra metadata
  details?: {
    imei?: string;
    accountNumber?: string;
    regNumber?: string;
    orgType?: string;
    frequentContacts?: string[];
    casesInvolved?: string[];
    riskIndicators?: string[];
  };
}

export interface Relationship {
  id: string;
  source: string; // Entity id
  target: string; // Entity id
  type: RelationshipType;
  label: string;
  count?: number;
  amount?: string;
  confidence: number; // e.g. 94%
  evidenceSources: string[];
  timestamp?: string;
  notes?: string;
}

export interface Community {
  id: 'A' | 'B' | 'C';
  name: string;
  subtitle: string;
  color: string;
  entityCount: number;
  bridgeEntities: string[];
  keyFocus: string;
}

export interface Alert {
  id: string;
  title: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'financial' | 'communication' | 'location' | 'identifier';
  description: string;
  timeWindow: string;
  date: string;
  entitiesInvolved: string[]; // Entity IDs
  patternDetails: string[];
  evidenceFiles: string[];
  status: 'Active' | 'Under Review' | 'Resolved';
  actionLabel: string;
}

export interface TimelineEvent {
  id: string;
  date: string; // e.g. 'AUG 01'
  time: string; // e.g. '18:30'
  title: string;
  category: 'communication' | 'financial' | 'location' | 'vehicle' | 'case';
  entities: string[]; // Entity names
  description: string;
  evidence: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface DataSourceItem {
  id: string;
  title: string;
  type: 'FIR' | 'CDR' | 'Financial' | 'Surveillance' | 'CriminalHistory';
  recordCount: number;
  fileFormat: string;
  status: 'Processed' | 'Indexing' | 'Pending';
  lastIngested: string;
  confidence: string;
  sampleSnippet: string;
}

export interface CaseFile {
  id: string;
  name: string;
  code: string;
  status: 'Active' | 'Archived' | 'Under Review';
  leadInvestigator: string;
  unit: string;
  entitiesCount: number;
  alertsCount: number;
  lastUpdated: string;
  priority: 'Critical' | 'Elevated' | 'Standard';
  description: string;
  communitiesCount: number;
}

export interface TacticalLocation {
  id: string;
  name: string;
  category: string;
  address: string;
  coordinates: [number, number]; // [x, y] in percentage or mock coordinates
  associatedEntities: string[];
  visitCount: number;
  relatedCases: string[];
  surveillanceNotes: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  suggestedAction?: {
    type: 'open_graph' | 'open_entity' | 'open_timeline' | 'open_alert';
    targetId?: string;
    label: string;
  };
  evidenceSources?: string[];
  confidence?: number;
  factors?: string[];
}
