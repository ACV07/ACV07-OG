import React from 'react';
import { learningData } from '../../data/learning';
import { SplunkDiagram, WiresharkDiagram, NmapDiagram } from './Diagrams';
import './Learning.css';

export default function Learning() {
  const renderDiagram = (id) => {
    switch (id) {
      case 'splunk':
        return <SplunkDiagram />;
      case 'wireshark':
        return <WiresharkDiagram />;
      case 'nmap':
        return <NmapDiagram />;
      default:
        return null;
    }
  };

  return (
    <section id="learning" className="editorial-learning">
      <div className="container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <div className="section-title-wrap">
            <span className="section-number">06 / ACADEMIC & SELF-LEARNING</span>
            <h2 className="section-title">LEARNING JOURNEY</h2>
          </div>
          <div className="section-meta">
            <span>CURRENT LEARNING</span><br />
            <span>SECURITY TOOLS & NETWORK ANALYSIS</span>
          </div>
        </div>

        {/* Top Status Bar */}
        <div className="learning-status-bar">
          <div className="status-badge-wrap">
            <span className="live-status-pulse"></span>
            <span className="status-badge-text">[ IN PROGRESS ]</span>
          </div>
          <div className="status-meta">
            <span className="mono-label">CURRENT FOCUS: </span>
            <span className="focus-val">{learningData.focus}</span>
          </div>
        </div>

        {/* 3 Learning Modules Grid */}
        <div className="learning-modules-grid">
          {learningData.modules.map((mod) => (
            <article key={mod.id} className="learning-module-card">
              {/* Module Header */}
              <div className="module-card-header">
                <h3 className="module-title">{mod.title}</h3>
              </div>

              {/* Module Description */}
              <p className="module-description">{mod.description}</p>

              {/* Interactive Animated SVG Working Model Diagram */}
              <div className="working-model-frame">
                <div className="diagram-wrapper">
                  {renderDiagram(mod.id)}
                </div>
              </div>

              {/* Module Metadata Footer */}
              <div className="module-footer-meta">
                <span className="mono-label">{mod.number} / TOOL STUDY</span>
                <span className="mono-label focus-text">{mod.focus}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
