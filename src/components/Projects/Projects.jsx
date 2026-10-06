import React, { useState } from 'react';
import { projects } from '../../data/projects';
import ProjectModal from '../ProjectModal/ProjectModal';
import './Projects.css';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="editorial-projects">
      <div className="container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <div className="section-title-wrap">
            <h2 className="section-title">SECURITY PROJECTS</h2>
          </div>
          <div className="section-meta">
            <span>TECHNICAL FIELD DOSSIERS</span><br />
            <span>CLICK PROJECT FOR FULL ARCHITECTURE LOG</span>
          </div>
        </div>

        {/* Large Editorial Project List */}
        <div className="projects-editorial-list">
          {projects.map((proj) => (
            <article 
              key={proj.id} 
              className="project-editorial-row"
              onClick={() => setSelectedProject(proj)}
            >
              {/* Row Header Information */}
              <div className="project-row-info">
                <div className="info-top">
                  <span className="project-number">{proj.number}</span>
                  <span className="mono-label">[ {proj.category} ]</span>
                  <span className="project-badge">{proj.badge}</span>
                </div>

                <div className="info-main">
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-subtitle">{proj.subtitle}</p>
                </div>

                <p className="project-summary">{proj.summary}</p>

                <div className="project-tech-row">
                  <span className="mono-label">TECHNOLOGY / ARCHITECTURE:</span>
                  <div className="tech-tags">
                    {proj.technologies.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="mono-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="project-action">
                  <span className="action-text">INSPECT DOSSIER LOG</span>
                  <span className="action-arrow">→</span>
                </div>
              </div>

              {/* Large Visual Frame (GertiX Post Style) */}
              <div className="project-visual-frame">
                <div className="frame-inner">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="project-image" 
                    loading="lazy" 
                  />
                  <div className="frame-overlay">
                    <span className="frame-tag">CLICK TO EXPAND FIELD LOG</span>
                    <span className="frame-num">{proj.number}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Render Detail Modal when clicked */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
