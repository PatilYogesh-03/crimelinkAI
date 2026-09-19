import React, { useState } from 'react';
import { 
  Database, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  ShieldAlert,
  Download,
  Check,
  Eye,
  Cpu
} from 'lucide-react';
import { DataSourceItem } from '../types';

interface DataSourcesViewProps {
  dataSources: DataSourceItem[];
}

export const DataSourcesView: React.FC<DataSourcesViewProps> = ({ dataSources }) => {
  const [sources, setSources] = useState<DataSourceItem[]>(dataSources);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processStep, setProcessStep] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [selectedFileType, setSelectedFileType] = useState<string>('fir');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  // Sample unstructured text for extraction demo
  const sampleExtractionText = 
    "Rahul Sharma was observed meeting Ramesh Kumar near Warehouse A. The individual arrived in vehicle TS09AB1234 carrying a sealed dispatch envelope.";

  const handleProcessData = () => {
    setIsProcessing(true);
    const steps = [
      'Reading uploaded source files...',
      'Extracting entities with Named Entity Recognition...',
      'Cross-referencing aliases and resolving entities...',
      'Detecting multi-source topological relationships...',
      'Updating crime network graph topology...'
    ];

    let current = 0;
    setProcessStep(steps[0]);

    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setProcessStep(steps[current]);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setProcessStep('Processing complete. 4 new entities & 6 relationships synthesized.');
        // Increment records slightly
        setSources(prev => prev.map(s => ({
          ...s,
          recordCount: s.recordCount + 3
        })));
      }
    }, 900);
  };

  return (
    <div className="space-y-6 pb-12 text-left">
      {/* View Header */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Data Ingestion & Extraction Engine
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              117 TOTAL DOCUMENTS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ingest unstructured FIR text, cellular CDR logs, banking NEFT/RTGS dumps, and surveillance logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUploadModal(true)}
            id="upload-data-modal-btn"
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2"
          >
            <UploadCloud className="w-4 h-4" />
            <span>+ Upload Data</span>
          </button>

          <button
            onClick={handleProcessData}
            disabled={isProcessing}
            id="process-data-btn"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-cyan-400 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>{isProcessing ? 'Processing...' : 'Process Data'}</span>
          </button>
        </div>
      </div>

      {/* Live Processing Banner */}
      {processStep && (
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/50 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-300">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span>{processStep}</span>
          </div>
          {!isProcessing && (
            <span className="text-[10px] text-emerald-400 font-bold">SYNCHRONIZED</span>
          )}
        </div>
      )}

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {sources.map((source) => (
          <div
            key={source.id}
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                  {source.fileFormat}
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {source.status}
                </span>
              </div>
              <h3 className="text-xs font-bold text-white mt-2">
                {source.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {source.sampleSnippet}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-lg font-black font-mono text-white">
                {source.recordCount}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Processed
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 11: AI ENTITY EXTRACTION DEMO */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a1122] to-slate-950 border border-cyan-500/30 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Interactive AI Entity & Relation Extraction Engine
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
            NLP Pipeline Active
          </span>
        </div>

        {/* Unstructured Text Preview with highlighted entity chips */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 block font-bold">
            Raw Input Investigative Text (FIR / Surveillance Report):
          </span>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm leading-relaxed text-slate-300 font-serif">
            "<mark className="bg-rose-500/30 text-rose-200 px-1 py-0.5 rounded border border-rose-500/40 font-mono text-xs font-sans">Rahul Sharma</mark> was observed meeting <mark className="bg-rose-500/30 text-rose-200 px-1 py-0.5 rounded border border-rose-500/40 font-mono text-xs font-sans">Ramesh Kumar</mark> near <mark className="bg-purple-500/30 text-purple-200 px-1 py-0.5 rounded border border-purple-500/40 font-mono text-xs font-sans">Warehouse A</mark>. The individual arrived in vehicle <mark className="bg-amber-500/30 text-amber-200 px-1 py-0.5 rounded border border-amber-500/40 font-mono text-xs font-sans">TS09AB1234</mark> carrying a sealed dispatch envelope."
          </div>
        </div>

        {/* Extracted Entities Grid */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 block font-bold">
            Extracted Entities:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-rose-500/30">
              <span className="text-[10px] font-mono text-rose-400 block font-bold">PERSON</span>
              <div className="text-xs font-bold text-white mt-1">Rahul Sharma</div>
              <div className="text-[10px] font-mono text-emerald-400 mt-1">Confidence: 98%</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-rose-500/30">
              <span className="text-[10px] font-mono text-rose-400 block font-bold">PERSON</span>
              <div className="text-xs font-bold text-white mt-1">Ramesh Kumar</div>
              <div className="text-[10px] font-mono text-emerald-400 mt-1">Confidence: 96%</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-purple-500/30">
              <span className="text-[10px] font-mono text-purple-400 block font-bold">LOCATION</span>
              <div className="text-xs font-bold text-white mt-1">Warehouse A</div>
              <div className="text-[10px] font-mono text-emerald-400 mt-1">Confidence: 94%</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30">
              <span className="text-[10px] font-mono text-amber-400 block font-bold">VEHICLE</span>
              <div className="text-xs font-bold text-white mt-1">TS09AB1234</div>
              <div className="text-[10px] font-mono text-emerald-400 mt-1">Confidence: 99%</div>
            </div>
          </div>
        </div>

        {/* Synthesized Relationships */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 block font-bold">
            Discovered Graph Edges:
          </span>
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-rose-300 font-bold">Rahul Sharma</span>
                <span className="text-cyan-400">→ ASSOCIATED_WITH →</span>
                <span className="text-rose-300 font-bold">Ramesh Kumar</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Evidence: Surveillance Report 102</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-rose-300 font-bold">Rahul Sharma</span>
                <span className="text-amber-400">→ OPERATES / ARRIVED_IN →</span>
                <span className="text-amber-300 font-bold">TS09AB1234</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Evidence: Field Operative Delta Log</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-rose-300 font-bold">Rahul Sharma</span>
                <span className="text-purple-400">→ VISITED →</span>
                <span className="text-purple-300 font-bold">Warehouse A</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Evidence: Perimeter Visual Capture</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Upload Investigation Intelligence</h3>
              </div>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Document Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-400 font-bold">File Category:</label>
              <select
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white font-mono"
              >
                <option value="fir">FIR Document (.pdf, .txt)</option>
                <option value="cdr">Call Detail Records (.csv)</option>
                <option value="financial">Financial Transaction Ledger (.csv)</option>
                <option value="surveillance">Field Surveillance Narrative (.txt)</option>
                <option value="history">Criminal Antecedent Dossier (.json)</option>
              </select>
            </div>

            {/* Drop Zone */}
            <div className="p-8 rounded-2xl border-2 border-dashed border-slate-700 hover:border-cyan-400 bg-slate-950/60 text-center space-y-2 transition-colors cursor-pointer">
              <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="text-xs text-slate-300 font-medium">
                Drag and drop investigation files here, or click to browse
              </div>
              <p className="text-[10px] text-slate-500 font-mono">
                Supports PDF, CSV, TXT, JSON up to 50MB
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-750"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  handleProcessData();
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]"
              >
                Upload & Ingest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
