import React from 'react';
import { projects } from '../../data/projects';
import './Work.css';

export default function Work() {
  return (
    <section id="work" className="editorial-work">
      <div className="container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <div className="section-title-wrap">
            <span className="section-number">05 / SELECTED PROJECTS & SYSTEMS</span>
            <h2 className="section-title">WORK</h2>
          </div>
          <div className="section-meta">
            <span>PROJECT CASE FILES</span><br />
            <span>SELECTED DEVELOPMENT & SYSTEMS</span>
          </div>
        </div>

        {/* 2x2 Case File Grid */}
        <div className="work-case-grid">
          {projects.map((proj) => {
            const titleLines = proj.title.split('\n');
            return (
              <article key={proj.id} className="case-file-card">
                <div className="case-header-bar">
                  <div className="case-id-wrap">
                    <span className="case-label">CASE // </span>
                    <span className="case-num-highlight">{proj.number}</span>
                  </div>
                  <span className="mono-label category-tag">{proj.category}</span>
                </div>

                <div className="case-title-area">
                  <h3 className="case-title">
                    {titleLines.map((line, i) => (
                      <span key={i} className="title-block">{line}</span>
                    ))}
                  </h3>
                </div>

                <p className="case-summary">{proj.summary}</p>

                <div className="case-action-bar">
                  <a 
                    href={proj.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="case-repo-btn"
                  >
                    <span>OPEN REPOSITORY</span>
                    <span className="repo-arrow">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
