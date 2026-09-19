import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  FileText, 
  ShieldAlert, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Flame
} from 'lucide-react';
import { Entity } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  confidence?: number;
  entities?: string[];
  evidence?: string[];
  timestamp: string;
}

interface AIInvestigatorViewProps {
  entities: Entity[];
  onSelectEntity: (entity: Entity) => void;
}

export const AIInvestigatorView: React.FC<AIInvestigatorViewProps> = ({
  entities,
  onSelectEntity
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Investigative Assistant initialized for Operation Nexus. I have cross-indexed 25 entities, 50 relationship links, 7 suspicious anomaly patterns, and 117 source documents. How can I assist your case inquiry?",
      timestamp: '21:45 IST'
    },
    {
      id: 'm-2',
      sender: 'user',
      text: "Who are the key people in this network?",
      timestamp: '21:46 IST'
    },
    {
      id: 'm-3',
      sender: 'ai',
      text: "Based on topological centrality and cross-source corroboration, the key entities in Operation Nexus are:\n\n1. Rahul Sharma (Importance: 92, Centrality: 0.82) — Acts as the pivotal bridge linking North Logistics to South Distribution and mule fund accounts.\n2. Ramesh Kumar (Importance: 84, Centrality: 0.76) — Primary financial signatory overseeing Zenith Trading Ltd shell accounts.\n3. Arjun Rao (Importance: 71) — Direct warehouse handler coordinating physical transport dispatches.\n4. Vikram Singh (Importance: 63) — Director overseeing Org Alpha corporate front.",
      confidence: 93,
      entities: ['Rahul Sharma', 'Ramesh Kumar', 'Arjun Rao', 'Vikram Singh'],
      evidence: ['CDR_00482.csv', 'FIR_103.pdf', 'MCA_ROC_Zenith.pdf'],
      timestamp: '21:46 IST'
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const suggestedQuestions = [
    "Why is Rahul Sharma important?",
    "Are there any suspicious financial transactions?",
    "What connects Rahul Sharma to Ramesh Kumar?",
    "Summarize the timeline of events.",
    "Which entities act as bridges between communities?"
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = '';
      let confidence = 91;
      let relevantEntities: string[] = [];
      let evidenceList: string[] = [];

      const lower = text.toLowerCase();
      if (lower.includes('rahul') && lower.includes('ramesh')) {
        aiResponseText = "Rahul Sharma and Ramesh Kumar show direct operational coordination. Their communication frequency increases sharply before major transactions (7 calls logged in CDR_00482.csv). Both individuals were documented meeting at Warehouse A on August 2 preceding the ₹85,000 layering sequence.";
        confidence = 94;
        relevantEntities = ['Rahul Sharma', 'Ramesh Kumar', 'Warehouse A'];
        evidenceList = ['CDR_00482.csv', 'Surveillance_Report_102.txt', 'Transaction_008.csv'];
      } else if (lower.includes('rahul') && lower.includes('important')) {
        aiResponseText = "Rahul Sharma is designated high priority because: (1) He holds 17 network connections across 3 communities, (2) Acts as a bridge between logistics and financial laundering cells, (3) Operates vehicle TS09AB1234 logged at clandestine meeting sites, and (4) Correlated across 4 independent surveillance logs.";
        confidence = 92;
        relevantEntities = ['Rahul Sharma', 'TS09AB1234', 'Warehouse A'];
        evidenceList = ['FIR_103.pdf', 'Surveillance_21.txt', 'TowerDump_Secunderabad.csv'];
      } else if (lower.includes('financial') || lower.includes('transaction')) {
        aiResponseText = "Yes. A high-priority anomaly was detected on August 1: Accounts A001 → A002 → A003 → A004 executed rapid structuring transfers (₹85,000 → ₹82,000 → ₹79,000) within a 40-minute window, followed by final cash withdrawals at Banjar Hills ATM.";
        confidence = 96;
        relevantEntities = ['Account A001', 'Account A002', 'Account A003', 'Account A004', 'Ramesh Kumar'];
        evidenceList = ['Transaction_008.csv', 'Bank_Statement_A001.pdf', 'ATM_CCTV_Banjara.mp4'];
      } else if (lower.includes('timeline')) {
        aiResponseText = "Key incident sequence:\n• 01-AUG 18:30: CDR coordination call between Rahul and Ramesh.\n• 01-AUG 19:10-19:50: Rapid 3-tier layering transfer ₹85K through mule accounts.\n• 01-AUG 20:15: Vehicle TS09AB1234 logs arrival at Warehouse A.\n• 02-AUG 21:20: In-person meeting documented at Warehouse A.\n• 03-AUG 19:40: Communication spike (47 calls/day vs normal 5).";
        confidence = 95;
        relevantEntities = ['Rahul Sharma', 'Ramesh Kumar', 'Warehouse A', 'TS09AB1234'];
        evidenceList = ['CDR_00482.csv', 'Transaction_008.csv', 'Surveillance_Report_102.txt'];
      } else if (lower.includes('bridge')) {
        aiResponseText = "Two primary structural bridges have been computed by the network algorithm:\n1. Rahul Sharma (Links Community A North Logistics to Community C South Distribution)\n2. Ramesh Kumar (Links Community B Corporate/Finance to transit operations).\nTargeting these two entities fragments cross-community command flow.";
        confidence = 91;
        relevantEntities = ['Rahul Sharma', 'Ramesh Kumar'];
        evidenceList = ['Topological_Betweenness_Report.json', 'MCA_ROC_Zenith.pdf'];
      } else {
        aiResponseText = `Correlating network dossier for inquiry "${text}". Cross-referenced against FIR_103.pdf and CDR call trees. The investigative topology reveals direct operational ties linking warehouse dispatches in Secunderabad to bank layering accounts held under Zenith Trading Ltd.`;
        confidence = 88;
        relevantEntities = ['Rahul Sharma', 'Ramesh Kumar', 'Warehouse A'];
        evidenceList = ['FIR_103.pdf', 'CDR_00482.csv'];
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        confidence,
        entities: relevantEntities,
        evidence: evidenceList,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="space-y-4 pb-12 text-left">
      {/* View Header */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              AI Investigation Assistant
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold">
              GROUNDED IN CASE DOSSIER
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ask questions in natural language. Answers are corroborated with evidence files and confidence metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>Insights require human investigator verification</span>
        </div>
      </div>

      {/* Suggested Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-[11px] font-mono uppercase text-slate-500 shrink-0">Quick Queries:</span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-slate-300 text-xs font-medium whitespace-nowrap transition-colors hover:text-cyan-300 hover:border-cyan-500/40"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl min-h-[480px] max-h-[600px] overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-2xl rounded-2xl p-4 sm:p-5 space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-cyan-600/30 border border-cyan-500/40 text-white'
                  : 'bg-[#0a1122] border border-slate-800 text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                  {msg.sender === 'ai' ? (
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-slate-200 text-[10px] font-bold">
                      VR
                    </div>
                  )}
                  <span className="text-xs font-bold font-mono">
                    {msg.sender === 'ai' ? 'CRIMELINK INTELLIGENCE' : 'INSPECTOR RATHORE'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {msg.timestamp}
                </span>
              </div>

              {/* Message Body */}
              <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-normal">
                {msg.text}
              </p>

              {/* Metadata row if AI response */}
              {msg.sender === 'ai' && msg.confidence && (
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Analytical Confidence:</span>
                    <span className="text-cyan-400 font-bold">{msg.confidence}%</span>
                  </div>

                  {/* Entities linked */}
                  {msg.entities && msg.entities.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Entities:</span>
                      {msg.entities.map((entName, i) => {
                        const ent = entities.find(e => e.name.toLowerCase() === entName.toLowerCase());
                        return (
                          <button
                            key={i}
                            onClick={() => ent && onSelectEntity(ent)}
                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-mono border border-slate-700"
                          >
                            {entName}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Evidence cited */}
                  {msg.evidence && msg.evidence.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Evidence:</span>
                      {msg.evidence.map((file, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-700">
                          {file}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 p-3 bg-slate-800/40 rounded-xl w-fit">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Correlating graph nodes & evidence files...</span>
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask anything about Operation Nexus entities, locations, calls, bank trails..."
          className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none font-mono"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputPrompt.trim() || isTyping}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 text-xs font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)] flex items-center gap-1.5"
        >
          <span>Ask AI</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
