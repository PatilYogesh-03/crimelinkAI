import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldAlert, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  Lock,
  Download,
  AlertCircle
} from 'lucide-react';
import { Entity } from '../types';
import { getEntityColor } from '../utils/graphLayout';

interface ExplainImportanceModalProps {
  entity: Entity | null;
  isOpen: boolean;
  onClose: () => void;
  onViewEvidenceFile?: (filename: string) => void;
}

export const ExplainImportanceModal: React.FC<ExplainImportanceModalProps> = ({
  entity,
  isOpen,
  onClose,
  onViewEvidenceFile
}) => {
  const [selectedFileSnippet, setSelectedFileSnippet] = useState<string | null>(null);

  if (!isOpen || !entity) return null;

  const color = getEntityColor(entity.type);

  // Generate dynamic or pre-scripted factors
  const isRahul = entity.id === 'p-rahul';
  const isRamesh = entity.id === 'p-ramesh';
  const isWarehouse = entity.id === 'loc-warehouse-a';

  const factors = isRahul ? [
    'He has 17 network connections across persons, communication lines, and logistical fronts.',
    'He is connected to 3 detected communities (North Logistics, Financial Layering, and South Distribution).',
    'He acts as a potential bridge between Community A and Community C.',
    'His associated phone (9000000001) appears in multiple CDR records with high call frequency.',
    'He appears in 4 distinct field surveillance reports near key staging hubs.',
    'His associated entities participate in an anomalous financial transaction sequence (A001 → A002).'
  ] : isRamesh ? [
    'Authorized signatory across multiple shell companies operating under Zenith Trading.',
    'Directly coordinates with Rahul Sharma (7 recorded calls in CDR_00482.csv).',
    'Initiated ₹85,000 layering transaction trail across accounts A001 through A004.',
    'Acts as a potential bridge entity between Community B (Finance) and Community C (Transit).',
    'Documented meeting at Warehouse A with logistics coordinators prior to fund movements.'
  ] : isWarehouse ? [
    'Focal rendezvous location identified across 3 separate surveillance operations.',
    'Rahul Sharma logged 8 site visits and Arjun Rao logged 6 site visits.',
    'Off-hours meetings coincide with financial disbursement time windows.',
    'High frequency of heavy transit vehicles with obscured manifests.'
  ] : [
    `${entity.connectionsCount} direct relationships registered within the current case topology.`,
    `Assigned to ${entity.communityName} with analytical centrality of ${entity.centralityScore}.`,
    `Corroborated across digital records and surveillance dossiers.`,
    `Part of active investigation cluster in Operation Nexus.`
  ];

  const confidence = isRahul ? 91 : (isRamesh ? 89 : (isWarehouse ? 94 : 85));

  const evidenceFiles = isRahul 
    ? ['CDR_00482.csv', 'FIR_103.pdf', 'Surveillance_21.txt', 'Transaction_008.csv']
    : isRamesh
    ? ['Transaction_008.csv', 'MCA_ROC_Zenith.pdf', 'CDR_00482.csv', 'CommercialLease_OfficeB.pdf']
    : ['Surveillance_Report_102.txt', 'Surveillance_21.txt', 'Warehouse_Visitor_Log.csv', 'TowerDump_Secunderabad.csv'];

  const fileContents: Record<string, string> = {
    'CDR_00482.csv': 'TIMESTAMP,SOURCE_CALLER,DEST_CALLER,DURATION,CELL_ID,AZIMUTH\n2026-08-01 18:30:12,9000000001,9000000002,142s,HYD-SEC-092,120°\n2026-08-02 21:20:44,9000000002,9876543210,88s,HYD-BANJ-104,240°\n2026-08-03 19:40:05,9000000001,9000000002,24s,HYD-SEC-092,120° [BURST CALL]',
    'FIR_103.pdf': 'CRIME INVESTIGATION DOCKET - PS CYBER CRIME & ORGANIZED FRAUD\nFIR NO: 103/2026 | DATED: 28/07/2026\nSUBJECT: Identity hijacking, mule bank account leasing, and interstate logistics layering.\nNAMED ENTITIES: Rahul Sharma (Logistics Coordinator), Vikram Singh (Director, Org Alpha), Zenith Trading.',
    'Surveillance_21.txt': 'OPERATIONAL LOG - FIELD UNIT DELTA\nDATE: 01-AUG-2026 20:15 IST\nLOCATION: Warehouse A, Secunderabad Industrial Zone\nOBSERVATION: Subject Rahul Sharma arrived in dark grey sedan TS09AB1234. Entered rear loading bay carrying documents. Exited 21:05 IST.',
    'Transaction_008.csv': 'TXN_ID,DATE,TIME,DEBIT_ACC,CREDIT_ACC,AMOUNT_INR,CHANNEL,FLAG\nTXN8819001,2026-08-01,19:10,A001,A002,85000,NEFT,RAPID_VELOCITY\nTXN8820014,2026-08-01,19:30,A002,A003,82000,RTGS,STRUCTURED_FEE\nTXN8821099,2026-08-01,19:50,A003,A004,79000,IMPS,FINAL_DISPERSION'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        id="explain-importance-modal"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                INVESTIGATIVE INSIGHT
              </div>
              <h3 className="text-base font-bold text-white">
                Why is {entity.name} important?
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-left">
          {/* Target Profile Summary Badge */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color.bg }} />
              <div>
                <span className="text-sm font-bold text-slate-100">{entity.name}</span>
                <span className="text-xs text-slate-400 ml-2">({entity.type.toUpperCase()})</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-200">
                Centrality: <strong className="text-cyan-300">{entity.centralityScore}</strong>
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                Score: <strong>{entity.importanceScore}</strong>
              </span>
            </div>
          </div>

          {/* Core Reasoning Factors */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Analytical Rationale & Observed Factors:</span>
            </div>
            <div className="space-y-2 p-3.5 rounded-xl bg-[#090e1a] border border-slate-800">
              <p className="text-xs text-slate-300 leading-relaxed font-medium mb-2">
                <span className="text-cyan-400 font-bold">{entity.name}</span> is identified as a high-priority investigative entity based on multi-source graph correlation:
              </p>
              <ul className="space-y-2">
                {factors.map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                    <span className="text-cyan-400 font-bold mt-0.5">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Confidence Gauge */}
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                AI ANALYTICAL CONFIDENCE
              </div>
              <div className="text-lg font-mono font-extrabold text-cyan-400">
                {confidence}%
              </div>
            </div>
            <div className="w-48 bg-slate-700/60 h-2.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500" 
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>

          {/* Evidence Citations */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Corroborating Evidence Files ({evidenceFiles.length}):</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {evidenceFiles.map(file => (
                <button
                  key={file}
                  onClick={() => setSelectedFileSnippet(file)}
                  className={`p-2.5 rounded-xl border text-left transition-all group ${
                    selectedFileSnippet === file
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                      : 'bg-slate-800/60 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="text-[11px] font-mono font-semibold truncate group-hover:text-cyan-300">
                    {file}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <span>Inspect</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </div>
                </button>
              ))}
            </div>

            {/* Evidence File Snippet Inspector */}
            {selectedFileSnippet && fileContents[selectedFileSnippet] && (
              <div className="mt-3 p-3 rounded-xl bg-black/80 border border-cyan-500/40 text-left font-mono">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 mb-2">
                  <span className="text-xs font-bold text-cyan-300">{selectedFileSnippet}</span>
                  <button 
                    onClick={() => setSelectedFileSnippet(null)}
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    Close snippet
                  </button>
                </div>
                <pre className="text-[11px] text-slate-300 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                  {fileContents[selectedFileSnippet]}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer with Verification Notice */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-medium">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>AI output is an investigative lead. Requires human verification.</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
