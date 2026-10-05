import React from 'react';
import './About.css';

export default function About() {
  const focusAreas = [
    {
      num: '01',
      title: 'CLOUD SECURITY',
      desc: 'Architecting least-privilege cloud IAM policies, securing AWS/GCP infrastructure, and auditing microservice container isolation.'
    },
    {
      num: '02',
      title: 'ETHICAL HACKING',
      desc: 'Systematic reconnaissance, web application security auditing, Smali code dynamic patching, and vulnerability identification.'
    },
    {
      num: '03',
      title: 'NETWORK SECURITY',
      desc: 'Packet inspection, eBPF network filtering, custom Nmap scripting, and perimeter firewall policy hardening.'
    },
    {
      num: '04',
      title: 'SECURITY OPERATIONS (SOC)',
      desc: 'Log aggregation in Wazuh/Splunk SIEM, crafting detection rules against MITRE ATT&CK vectors, and response automation.'
    },
    {
      num: '05',
      title: 'THREAT DETECTION',
      desc: 'Analyzing attack telemetry, identifying anomalous payload signatures, and engineering automated threat mitigation hooks.'
    }
  ];

  return (
    <section id="about" className="editorial-about">
      <div className="container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <div className="section-title-wrap">
            <span className="section-number">02 / DOSSIER INTRO</span>
            <h2 className="section-title">WHO I AM</h2>
          </div>
          <div className="section-meta">
            <span>FIELD JOURNAL // PROFILE</span><br />
            <span>SPECIALIZATION: SECURITY & SYSTEMS</span>
          </div>
        </div>

        {/* Big Statement Text (GertiX Inspired) */}
        <div className="about-hero-statement">
          <div className="statement-sub">ADRIAN CHERIAN</div>
          <h3 className="statement-main">
            Cybersecurity researcher dedicated to dissecting how complex systems fail, 
            how adversaries exploit hidden trust boundaries, and how truly resilient, 
            self-defending infrastructure can be built from first principles.
          </h3>
        </div>

        <div className="editorial-line"></div>

        {/* Editorial Focus Areas Index */}
        <div className="focus-areas-wrapper">
          <div className="focus-header">
            <span className="mono-label">PRIMARY FOCUS DISCIPLINES</span>
            <span className="mono-label">[ INDEX 01 — 05 ]</span>
          </div>

          <div className="focus-index-list">
            {focusAreas.map((area) => (
              <div key={area.num} className="focus-item">
                <div className="focus-left">
                  <span className="focus-num">{area.num}</span>
                  <h4 className="focus-title">{area.title}</h4>
                </div>
                <div className="focus-right">
                  <p className="focus-desc">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
