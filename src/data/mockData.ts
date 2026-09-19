import { Entity, Relationship, Community, Alert, TimelineEvent, DataSourceItem, CaseFile, TacticalLocation } from '../types';

export const COMMUNITIES: Community[] = [
  {
    id: 'A',
    name: 'Community A (North Logistics)',
    subtitle: 'Cross-District Transit & Safehouse Fleet',
    color: '#06b6d4', // Cyan
    entityCount: 28,
    bridgeEntities: ['Rahul Sharma'],
    keyFocus: 'Vehicle movement, warehouse rendezvous, encrypted phone lines'
  },
  {
    id: 'B',
    name: 'Community B (Financial Layering)',
    subtitle: 'Shell Entities & Corporate Mule Accounts',
    color: '#10b981', // Emerald
    entityCount: 24,
    bridgeEntities: ['Ramesh Kumar'],
    keyFocus: 'Structured layering, digital invoicing front, off-shore transfers'
  },
  {
    id: 'C',
    name: 'Community C (South Distribution)',
    subtitle: 'Ground Operations & Urban Drop Points',
    color: '#a855f7', // Purple
    entityCount: 25,
    bridgeEntities: ['Rahul Sharma', 'Ramesh Kumar'],
    keyFocus: 'Local cell coordination, cash couriers, transport terminals'
  }
];

export const CASES: CaseFile[] = [
  {
    id: 'case-nexus',
    name: 'Operation Nexus',
    code: 'FIR-2026/08/NX-991',
    status: 'Active',
    leadInvestigator: 'Insp. V. Rathore',
    unit: 'Cyber Crime & Organized Intel Unit',
    entitiesCount: 77,
    alertsCount: 7,
    communitiesCount: 3,
    lastUpdated: 'Today, 19:45 IST',
    priority: 'Critical',
    description: 'Multi-jurisdiction syndicate investigation tracking synthetic identity generation, bank layering chains, and covert logistics rendezvous across Hyderabad and Cyberabad corridors.'
  },
  {
    id: 'case-falcon',
    name: 'Operation Falcon',
    code: 'FIR-2025/11/FL-304',
    status: 'Archived',
    leadInvestigator: 'ACP S. Kulkarni',
    unit: 'Economic Offences Wing',
    entitiesCount: 34,
    alertsCount: 3,
    communitiesCount: 2,
    lastUpdated: '14 Jan 2026',
    priority: 'Standard',
    description: 'Archived investigation into export fraud and cross-border shell invoicing. Key insights archived into intelligence knowledge base.'
  },
  {
    id: 'case-horizon',
    name: 'Operation Horizon',
    code: 'FIR-2026/02/HZ-112',
    status: 'Active',
    leadInvestigator: 'DySP M. Qureshi',
    unit: 'Counter-Smuggling Special Cell',
    entitiesCount: 42,
    alertsCount: 9,
    communitiesCount: 3,
    lastUpdated: 'Yesterday, 22:10 IST',
    priority: 'Elevated',
    description: 'Interstate transport racket exploiting freight waybills and SIM mule chains between transport nodes.'
  }
];

export const ENTITIES: Entity[] = [
  // --- PERSONS (25) ---
  {
    id: 'p-rahul',
    name: 'Rahul Sharma',
    type: 'person',
    role: 'Key Bridge Entity / Logistics Coordinator',
    importanceScore: 92,
    connectionsCount: 17,
    centralityScore: 0.82,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    isBridge: true,
    isHighPriority: true,
    location: 'Hyderabad (Secunderabad / Jubilee Hills)',
    associatedPhone: '9000000001',
    associatedVehicle: 'TS09AB1234',
    knownLocations: ['Warehouse A', 'Office B', 'Residential Plot 14'],
    alerts: ['High network connectivity', 'Transaction association', 'Repeated location association', 'Bridge between 3 clusters'],
    lastActivity: 'AUG 03, 20:15 IST (CDR Ping near Warehouse A)',
    description: 'High-centrality subject detected in multiple surveillance logs and telecommunication spikes. Connects North Logistics (Comm A) with South Distribution (Comm C).',
    details: {
      casesInvolved: ['Operation Nexus'],
      frequentContacts: ['Ramesh Kumar (7x)', 'Arjun Rao (4x)', 'Suresh Patel (3x)'],
      riskIndicators: ['Rapid burner phone switching', 'Direct sighting at clandestine drop zone']
    },
    x: 480,
    y: 350
  },
  {
    id: 'p-ramesh',
    name: 'Ramesh Kumar',
    type: 'person',
    role: 'Financial Conduit / Corporate Signatory',
    importanceScore: 84,
    connectionsCount: 12,
    centralityScore: 0.74,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    isBridge: true,
    isHighPriority: true,
    location: 'Cyberabad (Banjara Hills)',
    associatedPhone: '9000000002',
    associatedVehicle: 'TS10CD5678',
    knownLocations: ['Office B', 'Cyber Park Hub'],
    alerts: ['High transaction frequency', 'Shell account signatory', 'Bridge entity'],
    lastActivity: 'AUG 03, 19:10 IST (NEFT batch initiation)',
    description: 'Authorized signatory for multiple shell accounts under Zenith Trading. Coordinates financial transfers and bridges Financial Layering (Comm B) with South Distribution (Comm C).',
    details: {
      casesInvolved: ['Operation Nexus', 'Operation Falcon'],
      frequentContacts: ['Rahul Sharma (7x)', 'Vikram Singh (5x)', 'Priya Sen (3x)'],
      riskIndicators: ['High velocity layered transactions', 'Shared corporate address']
    },
    x: 640,
    y: 430
  },
  {
    id: 'p-arjun',
    name: 'Arjun Rao',
    type: 'person',
    role: 'Transit Coordinator / Fleet Overseer',
    importanceScore: 71,
    connectionsCount: 8,
    centralityScore: 0.58,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    isHighPriority: true,
    location: 'Secunderabad',
    associatedPhone: '9876543210',
    associatedVehicle: 'DL04XY9988',
    knownLocations: ['Warehouse A', 'Transport Hub Central'],
    alerts: ['Repeated warehouse rendezvous', 'Communication spike with Rahul'],
    lastActivity: 'AUG 02, 22:10 IST (Warehouse A entry logged)',
    description: 'Manages transit drivers and local distribution points. Repeatedly identified in surveillance reports alongside Rahul Sharma at Warehouse A.',
    x: 490,
    y: 530
  },
  {
    id: 'p-vikram',
    name: 'Vikram Singh',
    type: 'person',
    role: 'Corporate Front Controller',
    importanceScore: 63,
    connectionsCount: 7,
    centralityScore: 0.51,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    location: 'Cyberabad',
    associatedPhone: '9112233445',
    associatedVehicle: 'MH12KJ4433',
    knownLocations: ['Office B', 'Cyber Park Hub'],
    alerts: ['Organization Alpha director', 'Layered transaction initiator'],
    lastActivity: 'AUG 01, 14:20 IST',
    description: 'Registered director of Organization Alpha and partner at Zenith Trading. Oversees fund dispersals to mule accounts.',
    x: 740,
    y: 360
  },
  {
    id: 'p-suresh',
    name: 'Suresh Patel',
    type: 'person',
    role: 'Regional Liaison - North Corridor',
    importanceScore: 58,
    connectionsCount: 6,
    centralityScore: 0.44,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    location: 'Medchal Outskirts',
    associatedPhone: '9667788990',
    knownLocations: ['Safehouse North', 'Warehouse A'],
    alerts: ['Repeated SIM switching'],
    lastActivity: 'AUG 02, 11:30 IST',
    x: 380,
    y: 290
  },
  {
    id: 'p-neha',
    name: 'Neha Verma',
    type: 'person',
    role: 'Accounts Handler & Waybill Invoicer',
    importanceScore: 54,
    connectionsCount: 5,
    centralityScore: 0.39,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    location: 'Secunderabad',
    associatedPhone: '9334455667',
    associatedVehicle: 'HR26BC8899',
    knownLocations: ['Safehouse North', 'Office B'],
    alerts: ['Associated with freight waybills'],
    lastActivity: 'AUG 03, 16:45 IST',
    x: 410,
    y: 410
  },
  {
    id: 'p-alok',
    name: 'Alok Nath',
    type: 'person',
    role: 'Safehouse Handler',
    importanceScore: 49,
    connectionsCount: 4,
    centralityScore: 0.35,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    location: 'Medchal',
    associatedPhone: '9223344556',
    knownLocations: ['Safehouse North'],
    alerts: ['Associated with vehicle KA01MN7711'],
    lastActivity: 'JUL 31, 23:10 IST',
    x: 440,
    y: 220
  },
  {
    id: 'p-priya',
    name: 'Priya Sen',
    type: 'person',
    role: 'Asset Shell Coordinator',
    importanceScore: 46,
    connectionsCount: 5,
    centralityScore: 0.33,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    location: 'Banjara Hills',
    associatedPhone: '9445566778',
    knownLocations: ['Office B'],
    alerts: ['Bank Account A003 authorized signatory'],
    lastActivity: 'AUG 02, 17:05 IST',
    x: 710,
    y: 520
  },
  {
    id: 'p-sanjay',
    name: 'Sanjay Gupta',
    type: 'person',
    role: 'Trade Clearing Agent',
    importanceScore: 45,
    connectionsCount: 4,
    centralityScore: 0.31,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    location: 'Cyberabad',
    associatedPhone: '9778899001',
    knownLocations: ['Port Terminal 3'],
    alerts: ['Port waybill authorization'],
    lastActivity: 'AUG 01, 10:15 IST',
    x: 770,
    y: 410
  },
  {
    id: 'p-karan',
    name: 'Karan Malhotra',
    type: 'person',
    role: 'Field Agent / Courier Supervisor',
    importanceScore: 42,
    connectionsCount: 4,
    centralityScore: 0.29,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    location: 'Secunderabad',
    associatedPhone: '9121314151',
    knownLocations: ['Warehouse A'],
    alerts: ['Field surveillance detection'],
    lastActivity: 'AUG 02, 19:40 IST',
    x: 350,
    y: 420
  },
  {
    id: 'p-amit',
    name: 'Amit Joshi',
    type: 'person',
    role: 'Banking Signatory Associate',
    importanceScore: 40,
    connectionsCount: 4,
    centralityScore: 0.28,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    location: 'Begumpet',
    associatedPhone: '9556677889',
    knownLocations: ['Office B'],
    alerts: ['Corporate resolution signatory'],
    lastActivity: 'AUG 01, 15:30 IST',
    x: 640,
    y: 270
  },
  {
    id: 'p-meena',
    name: 'Meena Kumari',
    type: 'person',
    role: 'Residential Safehouse Staff',
    importanceScore: 35,
    connectionsCount: 3,
    centralityScore: 0.23,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    location: 'Jubilee Hills',
    associatedPhone: '9141516171',
    knownLocations: ['Residential Plot 14'],
    alerts: ['Utility connection linkage'],
    lastActivity: 'JUL 30, 12:00 IST',
    x: 410,
    y: 590
  },
  {
    id: 'p-deepak',
    name: 'Deepak Mehra',
    type: 'person',
    role: 'Transport Broker',
    importanceScore: 38,
    connectionsCount: 4,
    centralityScore: 0.26,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    location: 'Central Hyderabad',
    associatedPhone: '9889900112',
    associatedVehicle: 'UP16AZ4321',
    knownLocations: ['Transport Hub Central'],
    alerts: ['Multiple interstate permits'],
    lastActivity: 'AUG 03, 14:15 IST',
    x: 630,
    y: 600
  },
  {
    id: 'p-manoj',
    name: 'Manoj Tiwari',
    type: 'person',
    role: 'Warehouse Gatekeeper',
    importanceScore: 34,
    connectionsCount: 3,
    centralityScore: 0.22,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    location: 'Secunderabad',
    associatedPhone: '9990011223',
    knownLocations: ['Warehouse A'],
    alerts: ['Night shift log discrepancy'],
    lastActivity: 'AUG 02, 23:55 IST',
    x: 540,
    y: 580
  },
  {
    id: 'p-pooja',
    name: 'Pooja Hegde',
    type: 'person',
    role: 'Financial Associate',
    importanceScore: 32,
    connectionsCount: 3,
    centralityScore: 0.21,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    location: 'Madhapur',
    alerts: ['Account A004 beneficiary relation'],
    lastActivity: 'AUG 01, 18:00 IST',
    x: 740,
    y: 580
  },
  {
    id: 'p-farhan',
    name: 'Farhan Khan',
    type: 'person',
    role: 'Freight Forwarding Coordinator',
    importanceScore: 31,
    connectionsCount: 3,
    centralityScore: 0.20,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    location: 'Port Area',
    knownLocations: ['Port Terminal 3'],
    alerts: ['Customs clearing linkage'],
    lastActivity: 'JUL 29, 09:20 IST',
    x: 800,
    y: 480
  },
  {
    id: 'p-simran',
    name: 'Simran Kaur',
    type: 'person',
    role: 'Office Assistant & Phone Custodian',
    importanceScore: 28,
    connectionsCount: 3,
    centralityScore: 0.18,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    location: 'Banjara Hills',
    knownLocations: ['Office B'],
    alerts: ['SIM registration intermediary'],
    lastActivity: 'AUG 02, 13:40 IST',
    x: 770,
    y: 650
  },
  {
    id: 'p-sunil',
    name: 'Sunil Verma',
    type: 'person',
    role: 'Transit Driver',
    importanceScore: 29,
    connectionsCount: 3,
    centralityScore: 0.19,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    location: 'Hyderabad South',
    associatedVehicle: 'TS10CD5678',
    knownLocations: ['Transport Hub Central'],
    alerts: ['Speed camera correlation with vehicle'],
    lastActivity: 'AUG 03, 08:30 IST',
    x: 580,
    y: 680
  },
  {
    id: 'p-vishal',
    name: 'Vishal Reddy',
    type: 'person',
    role: 'Transit Guard',
    importanceScore: 25,
    connectionsCount: 2,
    centralityScore: 0.16,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    location: 'Shamshabad',
    knownLocations: ['Warehouse A'],
    alerts: ['Known association with Arjun Rao'],
    lastActivity: 'AUG 02, 21:00 IST',
    x: 650,
    y: 690
  },
  {
    id: 'p-tarun',
    name: 'Tarun Roy',
    type: 'person',
    role: 'Courier Dispatcher',
    importanceScore: 24,
    connectionsCount: 2,
    centralityScore: 0.15,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    location: 'Kukatpally',
    knownLocations: ['Transport Hub Central'],
    alerts: ['Package delivery trail match'],
    lastActivity: 'AUG 01, 17:15 IST',
    x: 510,
    y: 680
  },
  {
    id: 'p-ritu',
    name: 'Ritu Sharma',
    type: 'person',
    role: 'Associate / Family Link',
    importanceScore: 26,
    connectionsCount: 2,
    centralityScore: 0.17,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    location: 'Jubilee Hills',
    knownLocations: ['Residential Plot 14'],
    alerts: ['Shared vehicle co-passenger'],
    lastActivity: 'JUL 28, 14:00 IST',
    x: 430,
    y: 490
  },
  {
    id: 'p-rajesh',
    name: 'Rajesh Khanna',
    type: 'person',
    role: 'Logistics Dispatcher',
    importanceScore: 22,
    connectionsCount: 2,
    centralityScore: 0.14,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    location: 'Sanath Nagar',
    alerts: ['Waybill timestamp match'],
    lastActivity: 'JUL 31, 11:20 IST',
    x: 370,
    y: 490
  },
  {
    id: 'p-ananya',
    name: 'Ananya Roy',
    type: 'person',
    role: 'Documentation Assistant',
    importanceScore: 21,
    connectionsCount: 2,
    centralityScore: 0.13,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    location: 'Ameerpet',
    knownLocations: ['Office B'],
    alerts: ['Digital stamp signatory'],
    lastActivity: 'AUG 01, 16:50 IST',
    x: 720,
    y: 230
  },
  {
    id: 'p-devendra',
    name: 'Devendra Yadav',
    type: 'person',
    role: 'Security Contractor',
    importanceScore: 20,
    connectionsCount: 2,
    centralityScore: 0.12,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    location: 'Medchal Industrial Area',
    knownLocations: ['Safehouse North'],
    alerts: ['Access badge usage correlation'],
    lastActivity: 'JUL 30, 20:00 IST',
    x: 320,
    y: 280
  },
  {
    id: 'p-ravi',
    name: 'Ravi Shankar',
    type: 'person',
    role: 'Billing Clerk',
    importanceScore: 19,
    connectionsCount: 2,
    centralityScore: 0.11,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    location: 'Secunderabad',
    knownLocations: ['Cyber Park Hub'],
    alerts: ['Tax receipt issuance anomaly'],
    lastActivity: 'AUG 02, 14:10 IST',
    x: 790,
    y: 290
  },

  // --- PHONE NUMBERS (18) ---
  {
    id: 'ph-9000000001',
    name: 'Phone 9000000001',
    type: 'phone',
    role: 'Rahul Primary Encrypted SIM',
    importanceScore: 88,
    connectionsCount: 9,
    centralityScore: 0.79,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    alerts: ['Multiple CDR pings at night', '47 calls/day spike on Aug 03'],
    lastActivity: 'AUG 03, 19:40 IST',
    details: { imei: '864209048123991' },
    x: 540,
    y: 300
  },
  {
    id: 'ph-9000000002',
    name: 'Phone 9000000002',
    type: 'phone',
    role: 'Ramesh Business Line',
    importanceScore: 82,
    connectionsCount: 8,
    centralityScore: 0.72,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Frequent coordination calls', 'Linked to Bank SMS notifications'],
    lastActivity: 'AUG 03, 19:40 IST',
    details: { imei: '864209048123992' },
    x: 590,
    y: 380
  },
  {
    id: 'ph-9876543210',
    name: 'Phone 9876543210',
    type: 'phone',
    role: 'Arjun Dedicated Fleet Line',
    importanceScore: 68,
    connectionsCount: 5,
    centralityScore: 0.54,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    alerts: ['Connected to Warehouse A cell tower'],
    lastActivity: 'AUG 02, 21:20 IST',
    x: 510,
    y: 490
  },
  {
    id: 'ph-9112233445',
    name: 'Phone 9112233445',
    type: 'phone',
    role: 'Vikram Corporate SIM',
    importanceScore: 56,
    connectionsCount: 4,
    centralityScore: 0.43,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['International roaming ping'],
    lastActivity: 'AUG 01, 14:00 IST',
    x: 690,
    y: 280
  },
  {
    id: 'ph-9667788990',
    name: 'Phone 9667788990',
    type: 'phone',
    role: 'Suresh North Line',
    importanceScore: 48,
    connectionsCount: 3,
    centralityScore: 0.35,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    alerts: ['Tower switch near Medchal'],
    lastActivity: 'AUG 02, 10:15 IST',
    x: 350,
    y: 330
  },
  {
    id: 'ph-9334455667',
    name: 'Phone 9334455667',
    type: 'phone',
    role: 'Neha Dispatch Line',
    importanceScore: 45,
    connectionsCount: 3,
    centralityScore: 0.31,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    alerts: ['High SMS frequency with accounts'],
    lastActivity: 'AUG 03, 16:30 IST',
    x: 440,
    y: 360
  },
  {
    id: 'ph-9223344556',
    name: 'Phone 9223344556',
    type: 'phone',
    role: 'Safehouse Relay SIM',
    importanceScore: 40,
    connectionsCount: 3,
    centralityScore: 0.28,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    alerts: ['Shared IMEI with 9202122232'],
    lastActivity: 'JUL 31, 23:00 IST',
    x: 420,
    y: 240
  },
  {
    id: 'ph-9445566778',
    name: 'Phone 9445566778',
    type: 'phone',
    role: 'Priya Banking Line',
    importanceScore: 44,
    connectionsCount: 3,
    centralityScore: 0.30,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Bank OTP recipient'],
    lastActivity: 'AUG 02, 16:55 IST',
    x: 660,
    y: 480
  },
  {
    id: 'ph-9778899001',
    name: 'Phone 9778899001',
    type: 'phone',
    role: 'Port Clearance SIM',
    importanceScore: 39,
    connectionsCount: 3,
    centralityScore: 0.26,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Harbor tower triangulation'],
    lastActivity: 'AUG 01, 09:45 IST',
    x: 730,
    y: 360
  },
  {
    id: 'ph-9121314151',
    name: 'Phone 9121314151',
    type: 'phone',
    role: 'Field Courier Phone',
    importanceScore: 36,
    connectionsCount: 2,
    centralityScore: 0.23,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    alerts: ['Burner pattern detected'],
    lastActivity: 'AUG 02, 18:50 IST',
    x: 320,
    y: 440
  },
  {
    id: 'ph-9556677889',
    name: 'Phone 9556677889',
    type: 'phone',
    role: 'Corporate Signatory SIM',
    importanceScore: 35,
    connectionsCount: 2,
    centralityScore: 0.22,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Linked to corporate KYC'],
    lastActivity: 'AUG 01, 15:10 IST',
    x: 630,
    y: 220
  },
  {
    id: 'ph-9141516171',
    name: 'Phone 9141516171',
    type: 'phone',
    role: 'Residential Landline Link',
    importanceScore: 30,
    connectionsCount: 2,
    centralityScore: 0.19,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    alerts: ['Broadband subscriber record'],
    lastActivity: 'JUL 30, 11:30 IST',
    x: 390,
    y: 560
  },
  {
    id: 'ph-9889900112',
    name: 'Phone 9889900112',
    type: 'phone',
    role: 'Interstate Transport SIM',
    importanceScore: 34,
    connectionsCount: 3,
    centralityScore: 0.22,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    alerts: ['Toll plaza cell handshake'],
    lastActivity: 'AUG 03, 13:40 IST',
    x: 620,
    y: 560
  },
  {
    id: 'ph-9990011223',
    name: 'Phone 9990011223',
    type: 'phone',
    role: 'Warehouse Gate Security Line',
    importanceScore: 32,
    connectionsCount: 2,
    centralityScore: 0.20,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    alerts: ['Fixed azimuth sector antenna'],
    lastActivity: 'AUG 02, 23:40 IST',
    x: 540,
    y: 540
  },
  {
    id: 'ph-9161718191',
    name: 'Phone 9161718191',
    type: 'phone',
    role: 'Transport Hub Logistics Line',
    importanceScore: 27,
    connectionsCount: 2,
    centralityScore: 0.17,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    alerts: ['Frequent short bursts'],
    lastActivity: 'AUG 02, 19:10 IST',
    x: 580,
    y: 630
  },
  {
    id: 'ph-9181920212',
    name: 'Phone 9181920212',
    type: 'phone',
    role: 'Office Reception Backup SIM',
    importanceScore: 25,
    connectionsCount: 2,
    centralityScore: 0.15,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Customer verification IVR records'],
    lastActivity: 'AUG 01, 16:30 IST',
    x: 740,
    y: 260
  },
  {
    id: 'ph-9101112131',
    name: 'Phone 9101112131',
    type: 'phone',
    role: 'Zenith Billing Direct Line',
    importanceScore: 26,
    connectionsCount: 2,
    centralityScore: 0.16,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Invoicing gateway automated SMS'],
    lastActivity: 'JUL 31, 18:20 IST',
    x: 690,
    y: 190
  },
  {
    id: 'ph-9202122232',
    name: 'Phone 9202122232',
    type: 'phone',
    role: 'Burner SIM (Shared Identifier)',
    importanceScore: 60,
    connectionsCount: 4,
    centralityScore: 0.45,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    alerts: ['Shared IMEI with 9223344556', 'Used by multiple individuals'],
    lastActivity: 'AUG 03, 12:15 IST',
    details: { imei: '864209048123991' },
    x: 350,
    y: 230
  },

  // --- BANK ACCOUNTS (12) ---
  {
    id: 'ba-a001',
    name: 'Bank Account A001',
    type: 'bank_account',
    role: 'Origin Mule Account',
    importanceScore: 78,
    connectionsCount: 4,
    centralityScore: 0.65,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Rapid fund injection', '₹85,000 outgoing transfer'],
    lastActivity: 'AUG 01, 19:10 IST',
    details: { accountNumber: 'HDFC-9912004810', riskIndicators: ['Layering sequence initiator'] },
    x: 580,
    y: 250
  },
  {
    id: 'ba-a002',
    name: 'Bank Account A002',
    type: 'bank_account',
    role: 'Intermediate Layer 1',
    importanceScore: 79,
    connectionsCount: 4,
    centralityScore: 0.66,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Immediate pass-through in 20 mins', '₹82,000 transfer to A003'],
    lastActivity: 'AUG 01, 19:30 IST',
    details: { accountNumber: 'ICIC-0038194412' },
    x: 630,
    y: 320
  },
  {
    id: 'ba-a003',
    name: 'Bank Account A003',
    type: 'bank_account',
    role: 'Intermediate Layer 2',
    importanceScore: 76,
    connectionsCount: 4,
    centralityScore: 0.63,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Structured split transfer', '₹79,000 transfer to A004'],
    lastActivity: 'AUG 01, 19:50 IST',
    details: { accountNumber: 'SBIN-0019283401' },
    x: 690,
    y: 450
  },
  {
    id: 'ba-a004',
    name: 'Bank Account A004',
    type: 'bank_account',
    role: 'Dispersion Hub Account',
    importanceScore: 74,
    connectionsCount: 4,
    centralityScore: 0.60,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['ATM cash withdrawals across 3 cities'],
    lastActivity: 'AUG 01, 20:45 IST',
    details: { accountNumber: 'AXIS-9920194812' },
    x: 730,
    y: 470
  },
  {
    id: 'ba-b101',
    name: 'Bank Account B101',
    type: 'bank_account',
    role: 'Apex Logistics Freight Escrow',
    importanceScore: 50,
    connectionsCount: 3,
    centralityScore: 0.38,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    alerts: ['Fictitious fuel charge entries'],
    lastActivity: 'JUL 31, 14:00 IST',
    x: 480,
    y: 260
  },
  {
    id: 'ba-b102',
    name: 'Bank Account B102',
    type: 'bank_account',
    role: 'Zenith Trading Commercial Current',
    importanceScore: 52,
    connectionsCount: 3,
    centralityScore: 0.40,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['High value circular transactions'],
    lastActivity: 'AUG 02, 11:20 IST',
    x: 670,
    y: 390
  },
  {
    id: 'ba-b103',
    name: 'Bank Account B103',
    type: 'bank_account',
    role: 'Corporate Salary Dispersal Cover',
    importanceScore: 45,
    connectionsCount: 2,
    centralityScore: 0.32,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Identical amounts sent to 12 SIM owners'],
    lastActivity: 'AUG 01, 10:00 IST',
    x: 640,
    y: 240
  },
  {
    id: 'ba-c201',
    name: 'Bank Account C201',
    type: 'bank_account',
    role: 'Transit Fuel & Toll Card Pool',
    importanceScore: 40,
    connectionsCount: 3,
    centralityScore: 0.28,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    alerts: ['FASTag auto-reload sync with fleet'],
    lastActivity: 'AUG 03, 07:15 IST',
    x: 750,
    y: 460
  },
  {
    id: 'ba-c202',
    name: 'Bank Account C202',
    type: 'bank_account',
    role: 'Shadow Holdings Capital Escrow',
    importanceScore: 43,
    connectionsCount: 2,
    centralityScore: 0.30,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Unexplained equity infusion'],
    lastActivity: 'JUL 29, 16:30 IST',
    x: 770,
    y: 530
  },
  {
    id: 'ba-c203',
    name: 'Bank Account C203',
    type: 'bank_account',
    role: 'South Courier Cash Pool',
    importanceScore: 38,
    connectionsCount: 2,
    centralityScore: 0.25,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    alerts: ['Daily cash limit hits'],
    lastActivity: 'AUG 02, 18:20 IST',
    x: 780,
    y: 590
  },
  {
    id: 'ba-d301',
    name: 'Bank Account D301',
    type: 'bank_account',
    role: 'Port Clearing Deposit',
    importanceScore: 35,
    connectionsCount: 2,
    centralityScore: 0.22,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Customs tariff refund routing'],
    lastActivity: 'AUG 01, 11:45 IST',
    x: 730,
    y: 200
  },
  {
    id: 'ba-d302',
    name: 'Bank Account D302',
    type: 'bank_account',
    role: 'Medchal Safehouse Maintenance',
    importanceScore: 32,
    connectionsCount: 2,
    centralityScore: 0.20,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    alerts: ['Direct utility bill debit'],
    lastActivity: 'JUL 28, 09:15 IST',
    x: 430,
    y: 190
  },

  // --- VEHICLES (8) ---
  {
    id: 'veh-ts09ab1234',
    name: 'Vehicle TS09AB1234',
    type: 'vehicle',
    role: 'Rahul Registered Sedan (Dark Grey)',
    importanceScore: 75,
    connectionsCount: 5,
    centralityScore: 0.62,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    alerts: ['ANPR camera hits at Warehouse A', 'Cross-district night travel'],
    lastActivity: 'AUG 02, 20:15 IST',
    details: { regNumber: 'TS09AB1234' },
    x: 490,
    y: 310
  },
  {
    id: 'veh-ts10cd5678',
    name: 'Vehicle TS10CD5678',
    type: 'vehicle',
    role: 'Ramesh Logistics Cargo Van',
    importanceScore: 70,
    connectionsCount: 5,
    centralityScore: 0.58,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    alerts: ['Multiple sightings with false freight manifest'],
    lastActivity: 'AUG 03, 08:30 IST',
    details: { regNumber: 'TS10CD5678' },
    x: 580,
    y: 520
  },
  {
    id: 'veh-ka01mn7711',
    name: 'Vehicle KA01MN7711',
    type: 'vehicle',
    role: 'Safehouse Relay SUV',
    importanceScore: 48,
    connectionsCount: 3,
    centralityScore: 0.36,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    alerts: ['Interstate border toll log'],
    lastActivity: 'JUL 31, 22:45 IST',
    x: 390,
    y: 260
  },
  {
    id: 'veh-dl04xy9988',
    name: 'Vehicle DL04XY9988',
    type: 'vehicle',
    role: 'Arjun Heavy Commercial Truck',
    importanceScore: 52,
    connectionsCount: 3,
    centralityScore: 0.40,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    alerts: ['Weight sensor discrepancy at weighbridge'],
    lastActivity: 'AUG 02, 21:50 IST',
    x: 470,
    y: 570
  },
  {
    id: 'veh-mh12kj4433',
    name: 'Vehicle MH12KJ4433',
    type: 'vehicle',
    role: 'Vikram Executive Sedan',
    importanceScore: 44,
    connectionsCount: 2,
    centralityScore: 0.32,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Parked at Cyber Park Hub during meetings'],
    lastActivity: 'AUG 01, 14:10 IST',
    x: 680,
    y: 400
  },
  {
    id: 'veh-hr26bc8899',
    name: 'Vehicle HR26BC8899',
    type: 'vehicle',
    role: 'Courier Delivery Pickup',
    importanceScore: 40,
    connectionsCount: 2,
    centralityScore: 0.28,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    alerts: ['Regular courier route deviation'],
    lastActivity: 'AUG 03, 16:15 IST',
    x: 430,
    y: 460
  },
  {
    id: 'veh-ap09qq1122',
    name: 'Vehicle AP09QQ1122',
    type: 'vehicle',
    role: 'Apex Logistics Refrigerated Van',
    importanceScore: 36,
    connectionsCount: 2,
    centralityScore: 0.25,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    alerts: ['GPS tracker turned off during transit'],
    lastActivity: 'JUL 30, 19:20 IST',
    x: 600,
    y: 180
  },
  {
    id: 'veh-up16az4321',
    name: 'Vehicle UP16AZ4321',
    type: 'vehicle',
    role: 'Interstate Transport Bus Cover',
    importanceScore: 38,
    connectionsCount: 2,
    centralityScore: 0.26,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    alerts: ['Carried undocumented cargo bundles'],
    lastActivity: 'AUG 03, 13:55 IST',
    x: 650,
    y: 570
  },

  // --- LOCATIONS (7) ---
  {
    id: 'loc-warehouse-a',
    name: 'Warehouse A',
    type: 'location',
    role: 'Prime Rendezvous Hub / Distribution Center',
    importanceScore: 90,
    connectionsCount: 11,
    centralityScore: 0.81,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    isHighPriority: true,
    location: 'Secunderabad Industrial Zone, Plot 42',
    alerts: ['3 persons repeatedly associated (Warehouse A)', 'Frequent night meetings', 'Signal blocker suspected'],
    lastActivity: 'AUG 02, 22:10 IST',
    description: 'Focal rendezvous location identified in Surveillance Report 102 & 21. Rahul Sharma, Ramesh Kumar, and Arjun Rao met here prior to the transaction sequence.',
    x: 520,
    y: 440
  },
  {
    id: 'loc-office-b',
    name: 'Office B',
    type: 'location',
    role: 'Financial Front Office / Invoicing Center',
    importanceScore: 78,
    connectionsCount: 8,
    centralityScore: 0.69,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    location: 'Banjara Hills, Road No. 12',
    alerts: ['Shared registered address of 3 shell companies'],
    lastActivity: 'AUG 02, 17:30 IST',
    description: 'Corporate office space hosting Zenith Trading and Organization Alpha. Serves as banking authorization base.',
    x: 640,
    y: 360
  },
  {
    id: 'loc-res-plot14',
    name: 'Residential Plot 14',
    type: 'location',
    role: 'Safehouse & Executive Residence',
    importanceScore: 62,
    connectionsCount: 4,
    centralityScore: 0.48,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    location: 'Jubilee Hills, Sector 3',
    alerts: ['Nightly presence of Vehicle TS09AB1234'],
    lastActivity: 'AUG 03, 02:15 IST',
    x: 450,
    y: 540
  },
  {
    id: 'loc-transport-hub',
    name: 'Transport Hub Central',
    type: 'location',
    role: 'Interstate Freight Yard & Parcel Depot',
    importanceScore: 68,
    connectionsCount: 6,
    centralityScore: 0.55,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    location: 'Outer Ring Road, Shamshabad Junction',
    alerts: ['Multiple logistics vans sighted concurrently'],
    lastActivity: 'AUG 03, 14:30 IST',
    x: 630,
    y: 630
  },
  {
    id: 'loc-cyber-park',
    name: 'Cyber Park Hub',
    type: 'location',
    role: 'Tech Front Incubator',
    importanceScore: 54,
    connectionsCount: 4,
    centralityScore: 0.42,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    location: 'HITEC City Phase 2',
    alerts: ['Proxy servers and VPN gateway pings'],
    lastActivity: 'AUG 01, 19:00 IST',
    x: 710,
    y: 300
  },
  {
    id: 'loc-port-terminal3',
    name: 'Port Terminal 3',
    type: 'location',
    role: 'Inland Container Depot (ICD)',
    importanceScore: 50,
    connectionsCount: 3,
    centralityScore: 0.38,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    location: 'Sanath Nagar Freight Terminal',
    alerts: ['Container misdeclaration record'],
    lastActivity: 'JUL 31, 16:45 IST',
    x: 790,
    y: 380
  },
  {
    id: 'loc-safehouse-north',
    name: 'Safehouse North',
    type: 'location',
    role: 'Clandestine Storage Facility',
    importanceScore: 58,
    connectionsCount: 4,
    centralityScore: 0.44,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    location: 'Medchal Rural Outskirts',
    alerts: ['Unregistered electricity draw spike'],
    lastActivity: 'AUG 02, 04:30 IST',
    x: 400,
    y: 230
  },

  // --- ORGANIZATIONS (4) ---
  {
    id: 'org-alpha',
    name: 'Organization Alpha',
    type: 'organization',
    role: 'Sanctioned Shell Entity / Holding Structure',
    importanceScore: 72,
    connectionsCount: 6,
    centralityScore: 0.60,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    isHighPriority: true,
    alerts: ['Shell entity holding 4 mule accounts', 'No commercial staff on record'],
    lastActivity: 'AUG 01, 19:40 IST',
    details: { orgType: 'Private Limited (Paper Company)' },
    x: 710,
    y: 390
  },
  {
    id: 'org-zenith',
    name: 'Zenith Trading',
    type: 'organization',
    role: 'Invoicing Front Company',
    importanceScore: 66,
    connectionsCount: 5,
    centralityScore: 0.53,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Bogus export invoicing pattern'],
    lastActivity: 'AUG 02, 11:00 IST',
    x: 660,
    y: 190
  },
  {
    id: 'org-apex',
    name: 'Apex Logistics',
    type: 'organization',
    role: 'Freight Carrier Cover',
    importanceScore: 60,
    connectionsCount: 5,
    centralityScore: 0.48,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    alerts: ['Vehicles TS09AB1234 & TS10CD5678 issued transit waybills'],
    lastActivity: 'AUG 03, 09:00 IST',
    x: 470,
    y: 240
  },
  {
    id: 'org-shadow',
    name: 'Shadow Holdings',
    type: 'organization',
    role: 'Asset Shell & Real Estate Front',
    importanceScore: 55,
    connectionsCount: 4,
    centralityScore: 0.42,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Purchased lease for Warehouse A and Office B'],
    lastActivity: 'JUL 29, 15:00 IST',
    x: 750,
    y: 500
  },

  // --- CASES (3) ---
  {
    id: 'case-nexus-node',
    name: 'Operation Nexus',
    type: 'case',
    role: 'Primary Investigation Target',
    importanceScore: 95,
    connectionsCount: 14,
    centralityScore: 0.95,
    communityId: 'A',
    communityName: 'Community A (North Logistics)',
    alerts: ['Active surveillance mandate', '7 detected suspicious patterns'],
    lastActivity: 'Today, 20:00 IST',
    x: 560,
    y: 140
  },
  {
    id: 'case-falcon-node',
    name: 'Operation Falcon',
    type: 'case',
    role: 'Cross-Referenced Financial Record',
    importanceScore: 65,
    connectionsCount: 6,
    centralityScore: 0.52,
    communityId: 'B',
    communityName: 'Community B (Financial Layering)',
    alerts: ['Shared bank account A002 link'],
    lastActivity: 'Archived Case File',
    x: 720,
    y: 130
  },
  {
    id: 'case-horizon-node',
    name: 'Operation Horizon',
    type: 'case',
    role: 'Interstate Smuggling Inquiry',
    importanceScore: 70,
    connectionsCount: 7,
    centralityScore: 0.58,
    communityId: 'C',
    communityName: 'Community C (South Distribution)',
    alerts: ['Vehicle TS10CD5678 cross-reference'],
    lastActivity: 'Yesterday, 22:10 IST',
    x: 800,
    y: 340
  }
];

export const RELATIONSHIPS: Relationship[] = [
  // Direct Key Bridge Link
  {
    id: 'r-1',
    source: 'p-rahul',
    target: 'p-ramesh',
    type: 'called',
    label: 'called (7x)',
    count: 7,
    confidence: 94,
    evidenceSources: ['CDR_00482.csv', 'FIR_103.pdf', 'Surveillance_21.txt', 'Transaction_008.csv'],
    notes: '7 phone calls between registered SIMs; met at Warehouse A; synchronous with bank transfers.'
  },
  // Rahul Identifiers & Assets
  {
    id: 'r-2',
    source: 'p-rahul',
    target: 'ph-9000000001',
    type: 'associated',
    label: 'associated with (SIM subscriber)',
    confidence: 99,
    evidenceSources: ['KYC_Airtel_90001.pdf', 'CDR_00482.csv']
  },
  {
    id: 'r-3',
    source: 'p-rahul',
    target: 'veh-ts09ab1234',
    type: 'owns',
    label: 'registered owner',
    confidence: 98,
    evidenceSources: ['RTA_Vehicle_TS09AB.pdf', 'TollLog_NH44.csv']
  },
  {
    id: 'r-4',
    source: 'p-rahul',
    target: 'loc-warehouse-a',
    type: 'visited',
    label: 'visited (8x)',
    count: 8,
    confidence: 92,
    evidenceSources: ['Surveillance_Report_102.txt', 'TowerDump_Secunderabad.csv']
  },
  {
    id: 'r-5',
    source: 'p-rahul',
    target: 'loc-office-b',
    type: 'visited',
    label: 'visited (3x)',
    count: 3,
    confidence: 88,
    evidenceSources: ['CCTV_BanjaraHills_0802.mp4', 'Surveillance_21.txt']
  },
  {
    id: 'r-6',
    source: 'p-rahul',
    target: 'loc-res-plot14',
    type: 'frequented',
    label: 'frequents (residence)',
    confidence: 95,
    evidenceSources: ['FIR_103.pdf', 'UtilityBill_Jubilee.pdf']
  },
  {
    id: 'r-7',
    source: 'p-rahul',
    target: 'p-arjun',
    type: 'called',
    label: 'called (4x)',
    count: 4,
    confidence: 91,
    evidenceSources: ['CDR_00482.csv', 'Surveillance_Report_102.txt']
  },
  {
    id: 'r-8',
    source: 'p-rahul',
    target: 'org-apex',
    type: 'associated',
    label: 'contracted liaison',
    confidence: 87,
    evidenceSources: ['Apex_Waybill_Directory.pdf']
  },
  {
    id: 'r-9',
    source: 'p-rahul',
    target: 'ba-a001',
    type: 'signatory',
    label: 'beneficial controller',
    confidence: 89,
    evidenceSources: ['Transaction_008.csv', 'BankKYC_HDFC.pdf']
  },

  // Ramesh Links
  {
    id: 'r-10',
    source: 'p-ramesh',
    target: 'ph-9000000002',
    type: 'associated',
    label: 'associated with (SIM subscriber)',
    confidence: 99,
    evidenceSources: ['KYC_Jio_90002.pdf']
  },
  {
    id: 'r-11',
    source: 'p-ramesh',
    target: 'veh-ts10cd5678',
    type: 'owns',
    label: 'primary operator',
    confidence: 93,
    evidenceSources: ['RTA_Vehicle_TS10CD.pdf']
  },
  {
    id: 'r-12',
    source: 'p-ramesh',
    target: 'ba-a002',
    type: 'transferred',
    label: 'transferred money (₹85K)',
    amount: '₹85,000',
    confidence: 97,
    evidenceSources: ['Transaction_008.csv', 'FinTrail_0801.csv']
  },
  {
    id: 'r-13',
    source: 'p-ramesh',
    target: 'loc-office-b',
    type: 'frequented',
    label: 'frequents (office manager)',
    confidence: 94,
    evidenceSources: ['CommercialLease_OfficeB.pdf', 'Surveillance_21.txt']
  },
  {
    id: 'r-14',
    source: 'p-ramesh',
    target: 'org-zenith',
    type: 'signatory',
    label: 'authorized signatory',
    confidence: 96,
    evidenceSources: ['MCA_ROC_Zenith.pdf']
  },
  {
    id: 'r-15',
    source: 'p-ramesh',
    target: 'p-vikram',
    type: 'called',
    label: 'called (5x)',
    count: 5,
    confidence: 89,
    evidenceSources: ['CDR_00482.csv']
  },
  {
    id: 'r-16',
    source: 'p-ramesh',
    target: 'p-arjun',
    type: 'called',
    label: 'called (3x)',
    count: 3,
    confidence: 88,
    evidenceSources: ['CDR_00482.csv', 'Timeline_Aug02.txt']
  },
  {
    id: 'r-17',
    source: 'p-ramesh',
    target: 'loc-warehouse-a',
    type: 'visited',
    label: 'visited (4x)',
    count: 4,
    confidence: 89,
    evidenceSources: ['Surveillance_Report_102.txt']
  },

  // Arjun Rao Links
  {
    id: 'r-18',
    source: 'p-arjun',
    target: 'ph-9876543210',
    type: 'associated',
    label: 'associated line',
    confidence: 95,
    evidenceSources: ['CDR_Tower_Arjun.csv']
  },
  {
    id: 'r-19',
    source: 'p-arjun',
    target: 'loc-warehouse-a',
    type: 'visited',
    label: 'visited (6x)',
    count: 6,
    confidence: 94,
    evidenceSources: ['Surveillance_Report_102.txt', 'Warehouse_Visitor_Log.csv']
  },
  {
    id: 'r-20',
    source: 'p-arjun',
    target: 'veh-dl04xy9988',
    type: 'owns',
    label: 'fleet driver record',
    confidence: 91,
    evidenceSources: ['DL_Commercial_Fleet.pdf']
  },
  {
    id: 'r-21',
    source: 'p-arjun',
    target: 'loc-transport-hub',
    type: 'frequented',
    label: 'frequents (dispatcher)',
    confidence: 90,
    evidenceSources: ['Logistics_Depot_Log.txt']
  },
  {
    id: 'r-22',
    source: 'p-arjun',
    target: 'p-deepak',
    type: 'called',
    label: 'called (6x)',
    count: 6,
    confidence: 87,
    evidenceSources: ['CDR_SouthCorridor.csv']
  },

  // Vikram Singh & Org Alpha
  {
    id: 'r-23',
    source: 'p-vikram',
    target: 'org-alpha',
    type: 'signatory',
    label: 'managing director',
    confidence: 98,
    evidenceSources: ['MCA_Filing_Alpha.pdf', 'FIR_103.pdf']
  },
  {
    id: 'r-24',
    source: 'p-vikram',
    target: 'ph-9112233445',
    type: 'associated',
    label: 'corporate phone link',
    confidence: 92,
    evidenceSources: ['KYC_Vikram.pdf']
  },
  {
    id: 'r-25',
    source: 'p-vikram',
    target: 'veh-mh12kj4433',
    type: 'owns',
    label: 'registered sedan',
    confidence: 96,
    evidenceSources: ['RTA_MH12.pdf']
  },
  {
    id: 'r-26',
    source: 'p-vikram',
    target: 'loc-office-b',
    type: 'frequented',
    label: 'head office base',
    confidence: 95,
    evidenceSources: ['Surveillance_21.txt']
  },
  {
    id: 'r-27',
    source: 'org-alpha',
    target: 'ba-a002',
    type: 'owns',
    label: 'corporate account holder',
    confidence: 99,
    evidenceSources: ['BankStatement_ICICI.pdf']
  },
  {
    id: 'r-28',
    source: 'org-alpha',
    target: 'org-shadow',
    type: 'associated',
    label: 'holding subsidiary',
    confidence: 88,
    evidenceSources: ['AuditReport_2025.pdf']
  },

  // Layered Financial Chain: A001 -> A002 -> A003 -> A004
  {
    id: 'r-29',
    source: 'ba-a001',
    target: 'ba-a002',
    type: 'transferred',
    label: 'transferred ₹85,000 (19:10)',
    amount: '₹85,000',
    confidence: 99,
    evidenceSources: ['Transaction_008.csv', 'NEFT_Batch_8819.csv'],
    notes: 'Stage 1 layering in rapid window'
  },
  {
    id: 'r-30',
    source: 'ba-a002',
    target: 'ba-a003',
    type: 'transferred',
    label: 'transferred ₹82,000 (19:30)',
    amount: '₹82,000',
    confidence: 99,
    evidenceSources: ['Transaction_008.csv', 'RTGS_Batch_8820.csv'],
    notes: 'Stage 2 layering after ₹3,000 deduction'
  },
  {
    id: 'r-31',
    source: 'ba-a003',
    target: 'ba-a004',
    type: 'transferred',
    label: 'transferred ₹79,000 (19:50)',
    amount: '₹79,000',
    confidence: 99,
    evidenceSources: ['Transaction_008.csv', 'IMPS_Batch_8821.csv'],
    notes: 'Stage 3 final dispersion to cash withdrawal hub'
  },
  {
    id: 'r-32',
    source: 'ba-a003',
    target: 'p-priya',
    type: 'signatory',
    label: 'mandate holder',
    confidence: 92,
    evidenceSources: ['SBI_Corporate_Resolution.pdf']
  },
  {
    id: 'r-33',
    source: 'ba-a004',
    target: 'p-pooja',
    type: 'associated',
    label: 'ATM proxy beneficiary',
    confidence: 86,
    evidenceSources: ['CCTV_ATM_Madhapur.mp4']
  },

  // Community A North Logistics Links
  {
    id: 'r-34',
    source: 'p-suresh',
    target: 'loc-safehouse-north',
    type: 'frequented',
    label: 'frequents (safehouse keeper)',
    confidence: 91,
    evidenceSources: ['Surveillance_SafehouseNorth.txt']
  },
  {
    id: 'r-35',
    source: 'p-suresh',
    target: 'p-rahul',
    type: 'called',
    label: 'called (3x)',
    count: 3,
    confidence: 88,
    evidenceSources: ['CDR_00482.csv']
  },
  {
    id: 'r-36',
    source: 'p-alok',
    target: 'loc-safehouse-north',
    type: 'frequented',
    label: 'safehouse staff',
    confidence: 90,
    evidenceSources: ['FIR_103.pdf']
  },
  {
    id: 'r-37',
    source: 'p-alok',
    target: 'veh-ka01mn7711',
    type: 'owns',
    label: 'driver log',
    confidence: 87,
    evidenceSources: ['TollLog_Medchal.csv']
  },
  {
    id: 'r-38',
    source: 'p-neha',
    target: 'org-apex',
    type: 'associated',
    label: 'accounts clerk',
    confidence: 93,
    evidenceSources: ['Waybill_Registry.pdf']
  },
  {
    id: 'r-39',
    source: 'p-karan',
    target: 'loc-warehouse-a',
    type: 'visited',
    label: 'visited (4x)',
    count: 4,
    confidence: 85,
    evidenceSources: ['Surveillance_Report_102.txt']
  },

  // Community C Distribution Fleet
  {
    id: 'r-40',
    source: 'p-deepak',
    target: 'loc-transport-hub',
    type: 'frequented',
    label: 'transport broker base',
    confidence: 92,
    evidenceSources: ['Shamshabad_Hub_Permit.pdf']
  },
  {
    id: 'r-41',
    source: 'p-deepak',
    target: 'veh-up16az4321',
    type: 'owns',
    label: 'bus permit holder',
    confidence: 89,
    evidenceSources: ['RTA_Permit_UP16.pdf']
  },
  {
    id: 'r-42',
    source: 'p-manoj',
    target: 'loc-warehouse-a',
    type: 'frequented',
    label: 'security gatekeeper',
    confidence: 95,
    evidenceSources: ['Security_Roster_WarehouseA.csv']
  },
  {
    id: 'r-43',
    source: 'p-sunil',
    target: 'veh-ts10cd5678',
    type: 'owns',
    label: 'van driver roster',
    confidence: 90,
    evidenceSources: ['Waybill_Delivery_Ramesh.pdf']
  },
  {
    id: 'r-44',
    source: 'p-vishal',
    target: 'p-arjun',
    type: 'associated',
    label: 'transit guard escort',
    confidence: 86,
    evidenceSources: ['Surveillance_Report_102.txt']
  },

  // Case Anchor Links (to primary active cases)
  {
    id: 'r-45',
    source: 'case-nexus-node',
    target: 'p-rahul',
    type: 'associated',
    label: 'Primary Subject of Interest',
    confidence: 99,
    evidenceSources: ['FIR-2026/08/NX-991']
  },
  {
    id: 'r-46',
    source: 'case-nexus-node',
    target: 'p-ramesh',
    type: 'associated',
    label: 'Financial Conduit Subject',
    confidence: 99,
    evidenceSources: ['FIR-2026/08/NX-991']
  },
  {
    id: 'r-47',
    source: 'case-nexus-node',
    target: 'loc-warehouse-a',
    type: 'associated',
    label: 'Search Warrant Location',
    confidence: 98,
    evidenceSources: ['Warrant_NX_0801.pdf']
  },
  {
    id: 'r-48',
    source: 'case-nexus-node',
    target: 'ba-a001',
    type: 'associated',
    label: 'Frozen Account Inquiry',
    confidence: 97,
    evidenceSources: ['FreezeNotice_HDFC_0802.pdf']
  },
  {
    id: 'r-49',
    source: 'case-falcon-node',
    target: 'org-zenith',
    type: 'associated',
    label: 'Archived Tax Inquiry',
    confidence: 94,
    evidenceSources: ['FL-304_Report.pdf']
  },
  {
    id: 'r-50',
    source: 'case-horizon-node',
    target: 'veh-ts10cd5678',
    type: 'associated',
    label: 'Vehicle Waybill Correlation',
    confidence: 91,
    evidenceSources: ['HZ-112_Docket.pdf']
  }
];

export const ALERTS: Alert[] = [
  {
    id: 'alert-1',
    title: 'Unusual Transaction Chain',
    severity: 'HIGH',
    category: 'financial',
    description: 'Rapid sequential fund transfer detected across four accounts within a 40-minute window with fractional fee deductions: ₹85,000 → ₹82,000 → ₹79,000.',
    timeWindow: 'AUG 01, 19:10 - 19:50 IST',
    date: 'AUG 01, 2026',
    entitiesInvolved: ['ba-a001', 'ba-a002', 'ba-a003', 'ba-a004', 'p-ramesh'],
    patternDetails: [
      'Account A001 → Account A002: ₹85,000 via NEFT at 19:10',
      'Account A002 → Account A003: ₹82,000 via RTGS at 19:30',
      'Account A003 → Account A004: ₹79,000 via IMPS at 19:50',
      'Account A004 initiated immediate ATM cash withdrawals'
    ],
    evidenceFiles: ['Transaction_008.csv', 'NEFT_Batch_8819.csv', 'FinTrail_0801.csv'],
    status: 'Active',
    actionLabel: 'Investigate Financial Trail'
  },
  {
    id: 'alert-2',
    title: 'Communication Spike',
    severity: 'MEDIUM',
    category: 'communication',
    description: 'Abnormal call volume surge between key suspects. Baseline frequency is 5 calls/day; observed 47 calls/day ahead of warehouse movement.',
    timeWindow: 'AUG 03, 17:00 - 20:00 IST',
    date: 'AUG 03, 2026',
    entitiesInvolved: ['p-rahul', 'p-ramesh', 'ph-9000000001', 'ph-9000000002'],
    patternDetails: [
      'Baseline average: 5 calls/day over last 30 days',
      'Observed surge: 47 calls within single 24-hour cycle',
      'Call duration median shifted from 180s to 22s (alert burst signaling)',
      'Concurrent cell tower handovers between Secunderabad & Banjara Hills'
    ],
    evidenceFiles: ['CDR_00482.csv', 'TowerDump_Secunderabad.csv'],
    status: 'Active',
    actionLabel: 'View Call Network'
  },
  {
    id: 'alert-3',
    title: 'Shared Location Rendezvous',
    severity: 'MEDIUM',
    category: 'location',
    description: '3 high-importance entities repeatedly associated with Warehouse A during off-hours with corresponding vehicle ANPR confirmations.',
    timeWindow: 'AUG 01 - AUG 03, Recurring',
    date: 'AUG 02, 2026',
    entitiesInvolved: ['p-rahul', 'p-ramesh', 'p-arjun', 'loc-warehouse-a', 'veh-ts09ab1234'],
    patternDetails: [
      'Rahul Sharma logged 8 site visits via surveillance log',
      'Arjun Rao confirmed on-site during 6 distinct intervals',
      'Ramesh Kumar arrived 15 minutes after financial transfer execution',
      'Vehicle TS09AB1234 ANPR hit matches gate entry time stamps'
    ],
    evidenceFiles: ['Surveillance_Report_102.txt', 'Surveillance_21.txt', 'Warehouse_Visitor_Log.csv'],
    status: 'Active',
    actionLabel: 'View Location Connections'
  },
  {
    id: 'alert-4',
    title: 'Shared Identifier Anomaly',
    severity: 'HIGH',
    category: 'identifier',
    description: 'Multiple investigative entities associated with the same phone hardware IMEI (864209048123991) using swapped SIM cards.',
    timeWindow: 'JUL 31 - AUG 03, 2026',
    date: 'AUG 03, 2026',
    entitiesInvolved: ['p-rahul', 'p-alok', 'ph-9000000001', 'ph-9202122232'],
    patternDetails: [
      'IMEI 864209048123991 hosted IMSI 404459000000001 (Phone 9000000001)',
      'Same handset activated burner SIM 9202122232 within 6 hours',
      'Hardware location remained static at Medchal Safehouse during swap',
      'Classic burner handset rotation indicator'
    ],
    evidenceFiles: ['CDR_00482.csv', 'IMEI_Hardware_Audit.csv'],
    status: 'Active',
    actionLabel: 'Investigate Identifier'
  },
  {
    id: 'alert-5',
    title: 'High Network Centrality Bridge',
    severity: 'HIGH',
    category: 'communication',
    description: 'Rahul Sharma identified with betweenness centrality of 0.82 connecting disparate logistics and distribution communities.',
    timeWindow: 'Continuous Analytical Assessment',
    date: 'AUG 03, 2026',
    entitiesInvolved: ['p-rahul', 'p-ramesh'],
    patternDetails: [
      'Connects Community A (North Logistics) with Community C (South Distribution)',
      'Direct control over 17 immediate connections',
      'Single point of communicative vulnerability for syndicate coordination'
    ],
    evidenceFiles: ['Network_Topology_Audit.json'],
    status: 'Active',
    actionLabel: 'Inspect Bridge Graph'
  },
  {
    id: 'alert-6',
    title: 'Off-Book Corporate Invoicing',
    severity: 'LOW',
    category: 'financial',
    description: 'Zenith Trading issued 14 invoices to Apex Logistics with zero corresponding freight delivery confirmations at Port Terminal 3.',
    timeWindow: 'JUL 28 - AUG 02, 2026',
    date: 'AUG 02, 2026',
    entitiesInvolved: ['org-zenith', 'org-apex', 'p-vikram', 'p-neha'],
    patternDetails: [
      'Invoiced amount ₹42,50,000 without customs bills of entry',
      'Waybill timestamps conflict with vehicle GPS locations'
    ],
    evidenceFiles: ['MCA_ROC_Zenith.pdf', 'Apex_Waybill_Directory.pdf'],
    status: 'Under Review',
    actionLabel: 'Review Documents'
  },
  {
    id: 'alert-7',
    title: 'GPS Transponder Blackout Window',
    severity: 'LOW',
    category: 'location',
    description: 'Vehicle AP09QQ1122 GPS telematics went dark for 180 minutes while entering Secunderabad Industrial Zone.',
    timeWindow: 'JUL 30, 19:20 - 22:20 IST',
    date: 'JUL 30, 2026',
    entitiesInvolved: ['veh-ap09qq1122', 'loc-warehouse-a'],
    patternDetails: [
      'Speed sensor indicated steady 45 km/h before signal cut',
      'Re-emerged near Outer Ring Road with loaded cargo weight'
    ],
    evidenceFiles: ['Telematics_AP09QQ.json'],
    status: 'Active',
    actionLabel: 'Inspect GPS Trace'
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  // AUG 01
  {
    id: 't-1',
    date: 'AUG 01',
    time: '18:30 IST',
    title: 'Rahul Sharma called Ramesh Kumar',
    category: 'communication',
    entities: ['Rahul Sharma', 'Ramesh Kumar'],
    description: 'Outgoing voice call logged from Phone 9000000001 to Phone 9000000002. Duration: 142 seconds. Cell tower triangulation placed Rahul near Secunderabad and Ramesh near Banjara Hills.',
    evidence: 'CDR_00482.csv (Line 412)',
    priority: 'HIGH'
  },
  {
    id: 't-2',
    date: 'AUG 01',
    time: '19:10 IST',
    title: '₹85,000 Transaction from Account A001 to A002',
    category: 'financial',
    entities: ['Bank Account A001', 'Bank Account A002', 'Ramesh Kumar'],
    description: 'Immediate electronic fund transfer initiated. Sender: Origin Mule Account A001. Receiver: Intermediate Layer Account A002 (Zenith Trading / Organization Alpha associated).',
    evidence: 'Transaction_008.csv (Ref: NEFT8819001)',
    priority: 'HIGH'
  },
  {
    id: 't-3',
    date: 'AUG 01',
    time: '19:30 IST',
    title: '₹82,000 Subsequent Transfer from A002 to A003',
    category: 'financial',
    entities: ['Bank Account A002', 'Bank Account A003', 'Vikram Singh'],
    description: 'Structured split transfer executed within 20 minutes of initial receipt. Classic layering velocity indicator.',
    evidence: 'Transaction_008.csv (Ref: RTGS8820014)',
    priority: 'HIGH'
  },
  {
    id: 't-4',
    date: 'AUG 01',
    time: '20:15 IST',
    title: 'Rahul Sharma visited Warehouse A',
    category: 'location',
    entities: ['Rahul Sharma', 'Warehouse A', 'Vehicle TS09AB1234'],
    description: 'Surveillance unit documented dark grey sedan (TS09AB1234) entering Warehouse A premises. Subject exited vehicle carrying leather briefcase.',
    evidence: 'Surveillance_21.txt (Log Entry 14)',
    priority: 'MEDIUM'
  },
  // AUG 02
  {
    id: 't-5',
    date: 'AUG 02',
    time: '21:20 IST',
    title: 'Ramesh Kumar called Arjun Rao',
    category: 'communication',
    entities: ['Ramesh Kumar', 'Arjun Rao'],
    description: 'Encrypted communication channel handover. Ramesh contacted transit overseer Arjun Rao. Call lasted 88 seconds.',
    evidence: 'CDR_00482.csv (Line 618)',
    priority: 'MEDIUM'
  },
  {
    id: 't-6',
    date: 'AUG 02',
    time: '22:10 IST',
    title: 'Arjun Rao visited Warehouse A',
    category: 'location',
    entities: ['Arjun Rao', 'Warehouse A', 'Vehicle DL04XY9988'],
    description: 'Arjun Rao arrived at Warehouse A driving Heavy Commercial Truck DL04XY9988. Observed meeting Rahul Sharma at back loading dock.',
    evidence: 'Surveillance_Report_102.txt (Section 3)',
    priority: 'HIGH'
  },
  // AUG 03
  {
    id: 't-7',
    date: 'AUG 03',
    time: '19:40 IST',
    title: 'Communication activity increased significantly',
    category: 'communication',
    entities: ['Rahul Sharma', 'Ramesh Kumar', 'Suresh Patel'],
    description: 'Network anomaly detected: 47 calls recorded in 24 hours compared to normal baseline of 5 calls/day. Rapid coordination pings across multiple cell towers.',
    evidence: 'CDR_00482.csv (Spike Analysis)',
    priority: 'HIGH'
  },
  {
    id: 't-8',
    date: 'AUG 03',
    time: '20:30 IST',
    title: 'New transaction sequence detected',
    category: 'financial',
    entities: ['Bank Account A003', 'Bank Account A004', 'Priya Sen'],
    description: '₹79,000 dispersion transfer into ATM cash pool account A004. First cash withdrawal initiated in Madhapur at 20:45 IST.',
    evidence: 'Transaction_008.csv (Ref: IMPS8821099)',
    priority: 'HIGH'
  }
];

export const DATA_SOURCES: DataSourceItem[] = [
  {
    id: 'ds-fir',
    title: 'FIR Reports',
    type: 'FIR',
    recordCount: 12,
    fileFormat: 'PDF / OCR Scans',
    status: 'Processed',
    lastIngested: 'Today, 18:30 IST',
    confidence: '98.4%',
    sampleSnippet: 'FIR No. 103/2026 PS Cyber Crime: Complainant states funds siphoned through shell enterprise Zenith Trading under control of Vikram Singh and associates.'
  },
  {
    id: 'ds-cdr',
    title: 'CDR Records',
    type: 'CDR',
    recordCount: 50,
    fileFormat: 'CSV / Telecom Dumps',
    status: 'Processed',
    lastIngested: 'Today, 19:15 IST',
    confidence: '99.9%',
    sampleSnippet: 'CDR_00482.csv: 9000000001 -> 9000000002, 18:30:12, Duration: 142s, Cell ID: HYD-SEC-092, Azimuth: 120 deg.'
  },
  {
    id: 'ds-fin',
    title: 'Financial Transactions',
    type: 'Financial',
    recordCount: 30,
    fileFormat: 'CSV / Core Banking Logs',
    status: 'Processed',
    lastIngested: 'Today, 19:35 IST',
    confidence: '99.1%',
    sampleSnippet: 'TXN_008.csv: A001 -> A002 INR 85,000 (19:10); A002 -> A003 INR 82,000 (19:30); A003 -> A004 INR 79,000 (19:50).'
  },
  {
    id: 'ds-surv',
    title: 'Surveillance Reports',
    type: 'Surveillance',
    recordCount: 10,
    fileFormat: 'TXT / Field Intelligence Logs',
    status: 'Processed',
    lastIngested: 'Today, 17:45 IST',
    confidence: '94.2%',
    sampleSnippet: 'Surveillance Report 102: Rahul Sharma was observed meeting Ramesh Kumar near Warehouse A. The individual arrived in vehicle TS09AB1234.'
  },
  {
    id: 'ds-hist',
    title: 'Criminal History & Dossiers',
    type: 'CriminalHistory',
    recordCount: 15,
    fileFormat: 'Database Dockets / CCTNS',
    status: 'Processed',
    lastIngested: 'Yesterday, 14:00 IST',
    confidence: '96.5%',
    sampleSnippet: 'Dossier Ref D-9941: Ramesh Kumar previously implicated as signatory in 2025 shell invoicing probe (Operation Falcon).'
  }
];

export const TACTICAL_LOCATIONS: TacticalLocation[] = [
  {
    id: 'loc-1',
    name: 'Warehouse A',
    category: 'Prime Rendezvous & Cargo Hub',
    address: 'Plot 42, Secunderabad Industrial Zone, Telangana 500003',
    coordinates: [34, 48], // Percent on tactical map
    associatedEntities: ['Rahul Sharma', 'Ramesh Kumar', 'Arjun Rao', 'Manoj Tiwari', 'Vehicle TS09AB1234'],
    visitCount: 8,
    relatedCases: ['Operation Nexus'],
    surveillanceNotes: 'Primary covert staging site. Frequent night meetings between 20:00 and 23:00 IST. High frequency of heavy vehicles with disguised manifests.',
    riskLevel: 'HIGH'
  },
  {
    id: 'loc-2',
    name: 'Office B',
    category: 'Corporate Front / Shell Head Office',
    address: 'Road No. 12, Banjara Hills, Hyderabad 500034',
    coordinates: [58, 42],
    associatedEntities: ['Ramesh Kumar', 'Vikram Singh', 'Priya Sen', 'Simran Kaur', 'Zenith Trading'],
    visitCount: 14,
    relatedCases: ['Operation Nexus', 'Operation Falcon'],
    surveillanceNotes: 'Registered address for Zenith Trading and Organization Alpha. Serves as banking authorization base. Digital signatures maintained on premise.',
    riskLevel: 'HIGH'
  },
  {
    id: 'loc-3',
    name: 'Residential Plot 14',
    category: 'Executive Safehouse',
    address: 'Plot 14, Sector 3, Jubilee Hills, Hyderabad 500033',
    coordinates: [42, 65],
    associatedEntities: ['Rahul Sharma', 'Ritu Sharma', 'Meena Kumari', 'Vehicle TS09AB1234'],
    visitCount: 19,
    relatedCases: ['Operation Nexus'],
    surveillanceNotes: 'High-security private residence. Rahul Sharma stays overnight after warehouse meets. CCTV cameras installed along all perimeter walls.',
    riskLevel: 'MEDIUM'
  },
  {
    id: 'loc-4',
    name: 'Transport Hub Central',
    category: 'Interstate Cargo & Fleet Depot',
    address: 'Outer Ring Road, Shamshabad Junction, Telangana 501218',
    coordinates: [72, 75],
    associatedEntities: ['Arjun Rao', 'Deepak Mehra', 'Sunil Verma', 'Vehicle TS10CD5678', 'Vehicle UP16AZ4321'],
    visitCount: 22,
    relatedCases: ['Operation Nexus', 'Operation Horizon'],
    surveillanceNotes: 'Interstate cargo transshipment point. Trucks from Karnataka, Maharashtra, and Andhra Pradesh dock here for fast repackaging.',
    riskLevel: 'HIGH'
  },
  {
    id: 'loc-5',
    name: 'Safehouse North',
    category: 'Rural Clandestine Transit Staging',
    address: 'Village Survey 88, Medchal Outskirts, Telangana 501401',
    coordinates: [22, 28],
    associatedEntities: ['Suresh Patel', 'Alok Nath', 'Devendra Yadav', 'Vehicle KA01MN7711'],
    visitCount: 6,
    relatedCases: ['Operation Nexus'],
    surveillanceNotes: 'Isolated farm property with perimeter sensors. Handset IMEI switches frequently coincide with stays at this location.',
    riskLevel: 'MEDIUM'
  },
  {
    id: 'loc-6',
    name: 'Cyber Park Hub',
    category: 'Tech Incubator Front',
    address: 'Phase 2, HITEC City, Madhapur, Hyderabad 500081',
    coordinates: [68, 32],
    associatedEntities: ['Vikram Singh', 'Ravi Shankar', 'Organization Alpha'],
    visitCount: 9,
    relatedCases: ['Operation Nexus'],
    surveillanceNotes: 'High-speed encrypted fiber lines. Used for initiating automated internet banking scripts and layer disbursements.',
    riskLevel: 'LOW'
  }
];

// Pre-scripted AI responses for the AI Investigator
export const AI_INVESTIGATOR_PRESETS = [
  {
    question: 'Why is Rahul Sharma important?',
    answer: `Rahul Sharma has one of the highest network connectivity and centrality scores in the current investigation.

Observed analytical factors:
• 17 direct network connections across persons, phones, bank accounts, and locations.
• Connected to all 3 detected network communities.
• Acts as a potential bridge between Community A (North Logistics) and Community C (South Distribution).
• 7 recorded phone calls with financial conduit Ramesh Kumar.
• Appears in 4 distinct field surveillance reports.
• Repeatedly associated with Warehouse A (8 logged visits) and vehicle TS09AB1234.
• Associated entities participate in the rapid financial layering sequence.`,
    confidence: 91,
    evidenceSources: ['CDR_00482.csv', 'FIR_103.pdf', 'Surveillance_21.txt', 'Transaction_008.csv'],
    factors: ['High betweenness centrality (0.82)', 'Multi-community spanning', 'Synchronous communication & fund transfers']
  },
  {
    question: 'Show connections between Rahul and Ramesh.',
    answer: `Rahul Sharma and Ramesh Kumar exhibit a robust multi-source relational bond:

Direct evidence breakdown:
• Telecommunications: 7 recorded voice calls between primary handsets (9000000001 & 9000000002) in CDR_00482.csv.
• Physical Co-location: Joint meeting observed at Warehouse A prior to financial disbursements (Surveillance Report 102).
• Financial Synchronization: Call at 18:30 on AUG 01 preceded Ramesh initiating ₹85,000 transfer from Account A001 by exactly 40 minutes.
• Shared Corporate Infrastructure: Both are documented authorized users under the Zenith Trading and Apex Logistics ecosystem.`,
    confidence: 94,
    evidenceSources: ['CDR_00482.csv', 'Surveillance_Report_102.txt', 'Transaction_008.csv'],
    factors: ['7 direct phone calls', '1 shared warehouse rendezvous', '1 synchronized transaction sequence']
  },
  {
    question: 'What suspicious patterns were detected?',
    answer: `The analytical engine flagged 7 active suspicious patterns in Operation Nexus:

1. Unusual Transaction Chain (HIGH): ₹85,000 → ₹82,000 → ₹79,000 layered across Accounts A001-A004 within 40 minutes.
2. Communication Spike (MEDIUM): Sudden surge to 47 calls/day vs baseline of 5 calls/day on AUG 03.
3. Shared Identifier (HIGH): Same physical hardware IMEI 864209048123991 associated with two separate suspect phone numbers.
4. Shared Location Rendezvous (MEDIUM): Off-hours concurrent meetings at Warehouse A by 3 key subjects.
5. Network Bridge Vulnerability (HIGH): Two key bridge entities (Rahul Sharma & Ramesh Kumar) mediating inter-cluster flow.`,
    confidence: 96,
    evidenceSources: ['Transaction_008.csv', 'CDR_00482.csv', 'Surveillance_Report_102.txt', 'IMEI_Hardware_Audit.csv'],
    factors: ['High-velocity layering', 'Communication burst', 'SIM swapping on single IMEI']
  },
  {
    question: 'Which entities connect multiple communities?',
    answer: `Community clustering analysis isolated 2 primary "Potential Bridge Entities":

1. Rahul Sharma:
   - Primary Bridge between Community A (North Logistics) and Community C (South Distribution).
   - Mediates movement of transit vehicles from northern safehouses to urban distribution hubs.

2. Ramesh Kumar:
   - Primary Bridge between Community B (Financial Layering) and Community C (South Distribution).
   - Manages fund disbursements that finance ground fleet drivers and courier operators.

Removal or interdiction of these bridge entities would disrupt 83% of cross-cluster operational coordination.`,
    confidence: 89,
    evidenceSources: ['Network_Topology_Audit.json', 'Community_Analysis_Report.pdf'],
    factors: ['Betweenness centrality > 0.70', 'Cross-cluster edge density > 65%']
  },
  {
    question: 'What happened before the transaction sequence?',
    answer: `Reconstructing the 60-minute window prior to the ₹85,000 transfer on AUG 01:

• 18:30 IST: Rahul Sharma phoned Ramesh Kumar (142s duration). Rahul was pinged near Secunderabad; Ramesh was at Office B.
• 18:55 IST: CCTV camera at Banjara Hills captured Ramesh Kumar accessing the online banking portal from corporate terminal.
• 19:10 IST: Account A001 initiated ₹85,000 transfer to Account A002.
• 20:15 IST: Rahul Sharma arrived at Warehouse A in Vehicle TS09AB1234 to verify cargo staging.`,
    confidence: 93,
    evidenceSources: ['CDR_00482.csv', 'Transaction_008.csv', 'Surveillance_21.txt'],
    factors: ['Temporal proximity (< 40 mins)', 'Direct telecommunication trigger', 'Follow-up on-site inspection']
  },
  {
    question: 'Show evidence supporting the Rahul-Ramesh relationship.',
    answer: `The relationship between Rahul Sharma and Ramesh Kumar is validated across 4 independent intelligence streams:

1. CDR Records: CDR_00482.csv (7 incoming/outgoing calls, average duration 96s).
2. Surveillance: Surveillance Report 102 & Report 21 (Physical in-person meeting logged at Warehouse A on AUG 01 & AUG 02).
3. Financial Data: Transaction_008.csv (Synchronized layering sequence between accounts linked to both individuals).
4. Police Documentation: FIR No. 103/2026 (Both cited in multi-mule identity syndicate chargesheet).`,
    confidence: 94,
    evidenceSources: ['CDR_00482.csv', 'Surveillance_Report_102.txt', 'Transaction_008.csv', 'FIR_103.pdf'],
    factors: ['Multi-source corroboration', 'Zero single-point-of-failure dependency']
  }
];
