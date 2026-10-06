import React from 'react';
import { participationData } from '../../data/participation';
import './Participation.css';

export default function Participation() {
  return (
    <section id="participation" className="editorial-participation">
      <div className="container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <div className="section-title-wrap">
            <h2 className="section-title">PARTICIPATION</h2>
          </div>
          <div className="section-meta">
            <span>COMPETITIONS / TECH FESTS / RESEARCH</span><br />
            <span>RECORD OF TECHNICAL ENGAGEMENT</span>
          </div>
        </div>

        {/* 2x2 Editorial Archive Grid */}
        <div className="participation-grid">
          {participationData.map((item) => (
            <article key={item.num} className="participation-card">
              <div className="part-card-top">
                <span className="part-num">{item.num}</span>
                <span className="mono-tag category-tag">{item.category}</span>
              </div>

              <div className="part-body">
                <h3 className="part-title">{item.title}</h3>
                <p className="part-description">{item.description}</p>
              </div>

              {item.tags && item.tags.length > 0 && (
                <div className="part-tags">
                  {item.tags.map((tag, idx) => {
                    const isHighlight = tag.toUpperCase().includes('PRIZE');
                    return (
                      <span 
                        key={idx} 
                        className={`tech-outline-tag ${isHighlight ? 'tag-highlight' : ''}`}
                      >
                        [ {tag.toUpperCase()} ]
                      </span>
                    );
                  })}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
