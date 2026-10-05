import React from 'react';
import { skillsData } from '../../data/skills';
import './Skills.css';

export default function Skills() {
  const leftColGroups = skillsData.slice(0, 2);
  const rightColGroups = skillsData.slice(2, 4);

  return (
    <section id="skills" className="editorial-skills">
      <div className="container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <div className="section-title-wrap">
            <span className="section-number">04 / CAPABILITIES</span>
            <h2 className="section-title">SKILLS</h2>
          </div>
          <div className="section-meta">
            <span>TECHNICAL CAPABILITIES & TOOLING</span><br />
            <span>PRACTICAL KNOWLEDGE & PROFICIENCY</span>
          </div>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="skills-editorial-grid">
          {/* Left Column */}
          <div className="skills-column">
            {leftColGroups.map((group, idx) => (
              <div key={idx} className="skills-category-block">
                <h3 className="category-title">{group.category}</h3>
                <div className="category-rows-list">
                  {group.skills.map((item, sIdx) => (
                    <div key={sIdx} className="skill-row-item">
                      <span className="skill-name-text">{item.name}</span>
                      <span className={`skill-level-text ${item.highlight ? 'highlight-active' : ''}`}>
                        {item.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="skills-column">
            {rightColGroups.map((group, idx) => (
              <div key={idx} className="skills-category-block">
                <h3 className="category-title">{group.category}</h3>
                <div className="category-rows-list">
                  {group.skills.map((item, sIdx) => (
                    <div key={sIdx} className="skill-row-item">
                      <span className="skill-name-text">{item.name}</span>
                      <span className={`skill-level-text ${item.highlight ? 'highlight-active' : ''}`}>
                        {item.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
