import React from 'react';
import { experiences } from '../../data/experience';
import './Experience.css';

export default function Experience() {
  return (
    <section id="experience" className="editorial-experience">
      <div className="container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <div className="section-title-wrap">
            <h2 className="section-title">EXPERIENCE</h2>
          </div>
          <div className="section-meta">
            <span>CHRONOLOGICAL INDEX</span><br />
            <span>PRACTICAL CYBERSECURITY & ROLES</span>
          </div>
        </div>

        {/* Compact Three-Column Editorial Experience Archive */}
        <div className="experience-archive-list">
          {experiences.map((exp) => (
            <article key={exp.id} className="experience-archive-row">
              {/* Column 1: Date */}
              <div className="exp-col-date">
                <span className="exp-date-text">{exp.date}</span>
              </div>

              {/* Column 2: Company Logo & Name */}
              <div className="exp-col-company">
                <div className="logo-badge-container">
                  <img 
                    src={exp.logo} 
                    alt={`${exp.company} logo`} 
                    className="company-logo-img"
                    loading="lazy"
                  />
                </div>
                <span className="company-name">{exp.company}</span>
              </div>

              {/* Column 3: Role, Description & Focus Tags */}
              <div className="exp-col-details">
                <h3 className="role-title">{exp.role}</h3>
                <p className="role-description">{exp.description}</p>

                <div className="role-tags-row">
                  {exp.tags.map((tag, idx) => (
                    <span key={idx} className="mono-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
