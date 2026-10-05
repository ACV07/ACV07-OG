import React, { useEffect } from 'react';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="modal-header-bar">
          <div className="modal-header-left">
            <span className="modal-num">{project.number}</span>
            <span className="modal-badge">{project.badge}</span>
            <span className="modal-date">{project.date}</span>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close Project Dossier">
            <span className="close-text">[ CLOSE ESC ]</span>
            <span className="close-icon">×</span>
          </button>
        </div>

        <div className="modal-content-scroll">
          {/* Title Hero */}
          <div className="modal-title-section">
            <span className="mono-label">PROJECT DOSSIER // REVISION 2026</span>
            <h1 className="modal-project-title">{project.title}</h1>
            <p className="modal-project-subtitle">{project.subtitle}</p>
          </div>

          {/* Featured Visual Header */}
          <div className="modal-image-frame">
            <img src={project.image} alt={project.title} className="modal-img" />
            <div className="modal-image-overlay">
              <span className="mono-tag">CLASSIFIED RESEARCH LOG</span>
              <span className="mono-tag">{project.category}</span>
            </div>
          </div>

          {/* Two-Column Editorial Details */}
          <div className="modal-grid">
            {/* Main Column */}
            <div className="modal-main-col">
              <section className="dossier-section">
                <h3 className="dossier-heading">01 / OBJECTIVE</h3>
                <p className="dossier-text">{project.objective}</p>
              </section>

              <section className="dossier-section">
                <h3 className="dossier-heading">02 / THE PROBLEM</h3>
                <p className="dossier-text">{project.problem}</p>
              </section>

              <section className="dossier-section">
                <h3 className="dossier-heading">03 / ARCHITECTURAL APPROACH</h3>
                <p className="dossier-text">{project.approach}</p>
              </section>

              <section className="dossier-section highlight-box">
                <h3 className="dossier-heading">04 / KEY SECURITY FINDINGS & IMPACT</h3>
                <ul className="findings-list">
                  {project.securityFindings.map((finding, idx) => (
                    <li key={idx} className="finding-item">
                      <span className="finding-bullet">›</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="dossier-section">
                <h3 className="dossier-heading">05 / SYSTEM RESULT & DEPLOYMENT</h3>
                <p className="dossier-text">{project.result}</p>
              </section>

              <section className="dossier-section">
                <h3 className="dossier-heading">06 / KEY TECHNICAL LEARNINGS</h3>
                <p className="dossier-text">{project.learnings}</p>
              </section>
            </div>

            {/* Sidebar Column */}
            <div className="modal-sidebar-col">
              <div className="sidebar-block">
                <span className="mono-label">TECHNOLOGY STACK</span>
                <div className="tech-stack-list">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="mono-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="sidebar-block">
                <span className="mono-label">SECURITY TOOLING USED</span>
                <div className="tools-list">
                  {project.tools.map((tool, i) => (
                    <div key={i} className="tool-row">
                      <span className="tool-bullet">•</span>
                      <span className="tool-name">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sidebar-block">
                <span className="mono-label">DISCIPLINE CATEGORY</span>
                <span className="sidebar-val">{project.category}</span>
              </div>

              <div className="sidebar-block">
                <span className="mono-label">STATUS</span>
                <span className="sidebar-status-tag">[ COMPLETED & VERIFIED ]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
