import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
import '../styles/OrchestratorLayout.css';

const initialNodes = [];
const initialEdges = [];

const SIDEBAR_WIDTH = 250;
const HEADER_HEIGHT = 100;

let id = 0;
const getId = () => `node_${id++}`;

function OrchestratorLayout() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [tabs, setTabs] = useState([{ id: 1, name: 'Layout 1' }]);
  const [activeTab, setActiveTab] = useState(1);
  const [nextTabId, setNextTabId] = useState(2);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('label');
      const nodeType = event.dataTransfer.getData('nodeType');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = {
        x: event.clientX - SIDEBAR_WIDTH,
        y: event.clientY - HEADER_HEIGHT,
      };

      const newNode = {
        id: getId(),
        type: 'default',
        position,
        data: { 
          label: label,
          type: type,
          nodeType: nodeType
        },
        style: {
          background: nodeType === 'platform' ? '#e0f2fe' : '#dbeafe',
          border: nodeType === 'platform' ? '2px solid #0369a1' : '1px solid #3b82f6',
          borderRadius: '8px',
          padding: '10px',
          minWidth: nodeType === 'platform' ? '200px' : '150px',
          minHeight: nodeType === 'platform' ? '150px' : '60px',
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const handleTabAdd = () => {
    const newTab = {
      id: nextTabId,
      name: `Layout ${nextTabId}`,
    };
    setTabs([...tabs, newTab]);
    setNextTabId(nextTabId + 1);
  };

  const handleTabSwitch = (tabId) => {
    setActiveTab(tabId);
  };

  const handleTabClose = (tabId) => {
    if (tabs.length === 1) return; // Keep at least one tab
    
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    if (activeTab === tabId) {
      const newActiveTab = newTabs[0];
      setActiveTab(newActiveTab.id);
    }
    setTabs(newTabs);
  };

  return (
    <div className="orchestrator-container">
      <div className="orchestrator-header">
        <h2>V-Orchestrator Layout Editor</h2>
        <p>Drag and drop models and simulation platforms to create your workflow</p>
      </div>
      
      <div className="tabs-container">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabSwitch(tab.id)}
          >
            <span>{tab.name}</span>
            {tabs.length > 1 && (
              <button
                className="tab-close"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTabClose(tab.id);
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button className="tab-add" onClick={handleTabAdd}>
          + New Layout
        </button>
      </div>

      <div className="orchestrator-workspace">
        <Sidebar />
        <div className="flow-container">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default OrchestratorLayout;
