import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  ArrowRight,
  ShieldAlert,
  Compass
} from 'lucide-react';
import { Entity } from '../types';

interface DemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tabId: string) => void;
  onSelectEntity: (entity: Entity) => void;
  onExplainImportance: (entity: Entity) => void;
  entities: Entity[];
}

interface Step {
  title: string;
  badge: string;
  description: string;
  highlightAction: string;
  actionText: string;
  execute: () => void;
}

export const DemoTourModal: React.FC<DemoTourModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectEntity,
  onExplainImportance,
  entities
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  if (!isOpen) return null;

  const rahul = entities.find(e => e.id === 'p-rahul') || entities[0];
  const ramesh = entities.find(e => e.id === 'p-ramesh') || entities[1];

  const steps: Step[] = [
    {
      title: "1. Executive Dashboard & Metrics",
      badge: "OVERVIEW",
      description: "Welcome to CRIMELINK AI. Start by exploring the overall network stats: 25 Persons of Interest, 18 Phone Numbers, 12 Bank Accounts, 8 Vehicles, and 7 Locations synthesized across fragmented reports.",
      highlightAction: "Showing high-level metrics cards and operational summary.",
      actionText: "View Dashboard Stats",
      execute: () => onNavigate('dashboard')
    },
    {
      title: "2. Topological Clusters & Communities",
      badge: "GRAPH TOPOLOGY",
      description: "Louvain community detection reveals 3 distinct operational cells: Community A (North Logistics), Community B (Financial Layering), and Community C (South Distribution).",
      highlightAction: "Highlighting network clusters and community boundaries.",
      actionText: "Open Network Analysis",
      execute: () => onNavigate('network')
    },
    {
      title: "3. Inspect Key Bridge Entity (Rahul Sharma)",
      badge: "DOSSIER INSPECTION",
      description: "Rahul Sharma is identified as a critical bridge entity linking logistics cells to mule disbursement accounts. Clicking his node opens his investigative dossier.",
      highlightAction: "Selecting Rahul Sharma and opening his right-side dossier.",
      actionText: "Inspect Rahul Sharma",
      execute: () => {
        onNavigate('network');
        if (rahul) onSelectEntity(rahul);
      }
    },
    {
      title: "4. Explain Importance (AI Insight)",
      badge: "EXPLAINABLE AI",
      description: "Investigators must understand the 'why'. The AI synthesizes: 17 connections, 3 communities bridged, multiple CDR records, 4 surveillance logs, and 91% confidence with source evidence.",
      highlightAction: "Opening AI-Generated Investigative Insight Card.",
      actionText: "Trigger 'Explain Importance'",
      execute: () => {
        if (rahul) onExplainImportance(rahul);
      }
    },
    {
      title: "5. 'Why Are These Two Connected?'",
      badge: "RELATIONSHIP EXPLORER",
      description: "Analyze the operational tie between Rahul Sharma and Ramesh Kumar: 7 direct phone calls, 1 shared location (Warehouse A), 1 surveillance handover report, and linked transaction trails.",
      highlightAction: "Loading Relationship Explorer with Rahul Sharma ↔ Ramesh Kumar.",
      actionText: "Go to Relationship Explorer",
      execute: () => onNavigate('relationships')
    },
    {
      title: "6. Suspicious Pattern Detection",
      badge: "ANOMALIES & ALERTS",
      description: "The system automatically detects money laundering chains (A001 → A002 → A003 → A004, ₹85K → ₹82K → ₹79K), communication spikes (47 calls/day vs normal 5), and burner device IMEI sharing.",
      highlightAction: "Inspecting high-priority alert cards.",
      actionText: "View Anomaly Alerts",
      execute: () => onNavigate('alerts')
    },
    {
      title: "7. Chronological Incident Timeline",
      badge: "TIMELINE RECONSTRUCTION",
      description: "Trace how events evolved from initial CDR coordination on Aug 01, through rapid fund structuring, vehicle arrivals, to the Aug 02 midnight rendezvous at Warehouse A.",
      highlightAction: "Loading multi-channel investigation timeline.",
      actionText: "Open Case Timeline",
      execute: () => onNavigate('timeline')
    },
    {
      title: "8. AI Investigation Assistant",
      badge: "CONVERSATIONAL INTEL",
      description: "Investigators can query the case in natural language: 'Who are the key people?', 'Why is Rahul Sharma important?', or 'Are there suspicious financial trails?' with grounded evidence citations.",
      highlightAction: "Opening live conversational AI investigator.",
      actionText: "Open AI Assistant",
      execute: () => onNavigate('ai-investigator')
    },
    {
      title: "9. Human Verification & Legal Disclaimer",
      badge: "COMPLIANCE & ETHICS",
      description: "CRIMELINK AI operates under strict evidentiary ethics: entities are labeled 'Persons of Interest', and all AI outputs clearly state: 'AI-generated insights are investigative leads and require human verification.'",
      highlightAction: "Reviewing legal compliance framework.",
      actionText: "Finish Demo Tour",
      execute: () => onNavigate('dashboard')
    }
  ];

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextIdx = currentStep + 1;
      setCurrentStep(nextIdx);
      steps[nextIdx].execute();
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevIdx = currentStep - 1;
      setCurrentStep(prevIdx);
      steps[prevIdx].execute();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-slate-900 border border-cyan-500/50 rounded-2xl shadow-[0_0_35px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col text-left"
        id="demo-tour-modal"
      >
        {/* Tour Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Compass className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  3-MINUTE HACKATHON DEMO WALKTHROUGH
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-0.5">
                {step.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tour Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase">
              {step.badge}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {step.description}
          </p>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div className="text-[11px] font-mono text-cyan-300">
              Target Action: <strong>{step.highlightAction}</strong>
            </div>
            <button
              onClick={step.execute}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold border border-cyan-500/40 transition-colors"
            >
              {step.actionText}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1 pt-2">
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tour Footer Controls */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 text-xs font-semibold flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Exit Tour
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <span>{currentStep === steps.length - 1 ? 'Complete Tour' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
