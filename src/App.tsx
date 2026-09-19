import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { NetworkAnalysisView } from './components/NetworkAnalysisView';
import { EntitiesView } from './components/EntitiesView';
import { RelationshipExplorerView } from './components/RelationshipExplorerView';
import { AlertsView } from './components/AlertsView';
import { TimelineView } from './components/TimelineView';
import { DataSourcesView } from './components/DataSourcesView';
import { AIInvestigatorView } from './components/AIInvestigatorView';
import { TacticalMapView } from './components/TacticalMapView';
import { CaseManagementView } from './components/CaseManagementView';
import { SettingsView } from './components/SettingsView';
import { EntityDetailDrawer } from './components/EntityDetailDrawer';
import { ExplainImportanceModal } from './components/ExplainImportanceModal';
import { DemoTourModal } from './components/DemoTourModal';

import { 
  ENTITIES, 
  RELATIONSHIPS, 
  COMMUNITIES, 
  ALERTS, 
  TIMELINE_EVENTS, 
  DATA_SOURCES, 
  CASES 
} from './data/mockData';
import { Entity, CaseFile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [currentCase, setCurrentCase] = useState<CaseFile>(CASES[0]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [explainEntity, setExplainEntity] = useState<Entity | null>(null);
  const [isExplainModalOpen, setIsExplainModalOpen] = useState<boolean>(false);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState<boolean>(false);
  const [relExplorerA, setRelExplorerA] = useState<Entity | null>(null);
  const [relExplorerB, setRelExplorerB] = useState<Entity | null>(null);
  const [timelineFilterEntityId, setTimelineFilterEntityId] = useState<string | null>(null);

  // Handlers
  const handleSelectEntity = (entity: Entity) => {
    setSelectedEntity(entity);
  };

  const handleCloseEntityDrawer = () => {
    setSelectedEntity(null);
  };

  const handleExplainImportance = (entity: Entity) => {
    setExplainEntity(entity);
    setIsExplainModalOpen(true);
  };

  const handleViewEvidence = (entity: Entity) => {
    setExplainEntity(entity);
    setIsExplainModalOpen(true);
  };

  const handleExplainConnection = (entity: Entity) => {
    // If entity is Rahul, pair with Ramesh; otherwise pair with Rahul
    const partner = entity.id === 'p-rahul' 
      ? ENTITIES.find(e => e.id === 'p-ramesh') || ENTITIES[1]
      : ENTITIES.find(e => e.id === 'p-rahul') || ENTITIES[0];

    setRelExplorerA(entity);
    setRelExplorerB(partner);
    setActiveTab('relationships');
  };

  const handleViewTimeline = (entity: Entity) => {
    setTimelineFilterEntityId(entity.id);
    setActiveTab('timeline');
  };

  const handleNavigateToGraphWithEntities = (entityIds: string[]) => {
    const firstEntity = ENTITIES.find(e => entityIds.includes(e.id));
    if (firstEntity) {
      setSelectedEntity(firstEntity);
    }
    setActiveTab('network');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-sans antialiased">
      {/* 1. Header */}
      <Header
        currentCase={currentCase}
        cases={CASES}
        onSelectCase={setCurrentCase}
        alerts={ALERTS}
        entities={ENTITIES}
        onSelectEntity={handleSelectEntity}
        onNavigate={(tab) => {
          setActiveTab(tab);
          if (tab !== 'timeline') setTimelineFilterEntityId(null);
        }}
        onStartDemoTour={() => setIsDemoTourOpen(true)}
      />

      {/* 2. Main Body Container with Sidebar and Content */}
      <div className="flex-1 flex w-full relative">
        {/* Left Fixed Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            if (tab !== 'timeline') setTimelineFilterEntityId(null);
          }}
          clusterCount={COMMUNITIES.length}
          entityCount={ENTITIES.length}
          alertCount={ALERTS.length}
          docCount={117}
        />

        {/* Center Main Stage View */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <DashboardView
              currentCase={currentCase}
              entities={ENTITIES}
              relationships={RELATIONSHIPS}
              communities={COMMUNITIES}
              alerts={ALERTS}
              selectedEntity={selectedEntity}
              onSelectEntity={handleSelectEntity}
              onExplainImportance={handleExplainImportance}
              onNavigate={setActiveTab}
              onStartDemoTour={() => setIsDemoTourOpen(true)}
            />
          )}

          {activeTab === 'network' && (
            <NetworkAnalysisView
              entities={ENTITIES}
              relationships={RELATIONSHIPS}
              communities={COMMUNITIES}
              selectedEntity={selectedEntity}
              onSelectEntity={handleSelectEntity}
              onExplainImportance={handleExplainImportance}
            />
          )}

          {activeTab === 'entities' && (
            <EntitiesView
              entities={ENTITIES}
              selectedEntity={selectedEntity}
              onSelectEntity={handleSelectEntity}
              onExplainImportance={handleExplainImportance}
            />
          )}

          {activeTab === 'relationships' && (
            <RelationshipExplorerView
              entities={ENTITIES}
              relationships={RELATIONSHIPS}
              initialEntityA={relExplorerA}
              initialEntityB={relExplorerB}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {activeTab === 'alerts' && (
            <AlertsView
              alerts={ALERTS}
              entities={ENTITIES}
              onSelectEntity={handleSelectEntity}
              onNavigateToGraphWithEntities={handleNavigateToGraphWithEntities}
            />
          )}

          {activeTab === 'timeline' && (
            <TimelineView
              events={TIMELINE_EVENTS}
              entities={ENTITIES}
              onSelectEntity={handleSelectEntity}
              filteredEntityId={timelineFilterEntityId}
            />
          )}

          {activeTab === 'datasources' && (
            <DataSourcesView dataSources={DATA_SOURCES} />
          )}

          {activeTab === 'ai-investigator' && (
            <AIInvestigatorView
              entities={ENTITIES}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {activeTab === 'map' && (
            <TacticalMapView
              entities={ENTITIES}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {activeTab === 'case-management' && (
            <CaseManagementView
              cases={CASES}
              currentCase={currentCase}
              onSelectCase={setCurrentCase}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}
        </main>

        {/* Right Slide-Over Entity Dossier Drawer */}
        {selectedEntity && (
          <EntityDetailDrawer
            entity={selectedEntity}
            onClose={handleCloseEntityDrawer}
            onExplainImportance={handleExplainImportance}
            onViewEvidence={handleViewEvidence}
            onExplainConnection={handleExplainConnection}
            onViewTimeline={handleViewTimeline}
            relationships={RELATIONSHIPS}
          />
        )}
      </div>

      {/* 3. Global AI Explain Importance Modal */}
      <ExplainImportanceModal
        entity={explainEntity}
        isOpen={isExplainModalOpen}
        onClose={() => setIsExplainModalOpen(false)}
      />

      {/* 4. Global Hackathon Guided 3-Minute Demo Tour */}
      <DemoTourModal
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        onNavigate={setActiveTab}
        onSelectEntity={handleSelectEntity}
        onExplainImportance={handleExplainImportance}
        entities={ENTITIES}
      />
    </div>
  );
}
