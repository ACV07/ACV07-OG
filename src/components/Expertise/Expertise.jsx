import React from 'react';
import './Expertise.css';

export default function Expertise() {
  const expertiseDomains = [
    {
      num: '01',
      title: 'OFFENSIVE SECURITY',
      subtitle: 'Penetration Testing & Vulnerability Assessment',
      summary: 'Simulating adversary tactics to discover hidden vulnerabilities before malicious actors exploit them.',
      capabilities: ['Penetration Testing', 'Reconnaissance & OSINT', 'Network Assessment', 'Web & Mobile Security', 'Smali Bytecode Patching'],
      tools: 'Nmap / Burp Suite / Frida / Metasploit'
    },
    {
      num: '02',
      title: 'CLOUD SECURITY',
      subtitle: 'Infrastructure & IAM Access Architecture',
      summary: 'Building least-privilege cloud environments, automated security guardrails, and container isolation.',
      capabilities: ['Cloud Infrastructure', 'Identity & Access (IAM)', 'Security Architecture', 'Terraform Sentinel', 'S3 Policy Hardening'],
      tools: 'AWS / GCP / Docker / Prowler / Terraform'
    },
    {
      num: '03',
      title: 'SOC & DETECTION',
      subtitle: 'SIEM Operations & Telemetry Analysis',
      summary: 'Engineering real-time log ingestion parsers, alert triage playbooks, and MITRE ATT&CK detection coverage.',
      capabilities: ['SIEM Engineering', 'Log Telemetry Analysis', 'Threat Detection Rules', 'Incident Response Playbooks', 'Wazuh Alert Triage'],
      tools: 'Wazuh SIEM / Splunk / Suricata IDS / Python'
    },
    {
      num: '04',
      title: 'NETWORK SECURITY',
      subtitle: 'Protocol Analysis & Traffic Filtering',
      summary: 'Low-level packet inspection, eBPF kernel hooks, and automated zero-trust perimeter enforcement.',
      capabilities: ['TCP/IP Stack Mechanics', 'Network Reconnaissance', 'Traffic Analysis & PCAP', 'eBPF Kernel Filtering', 'Firewall Policy Rules'],
      tools: 'Wireshark / eBPF / iptables / Scapy'
    }
  ];

  const kpis = [
    { value: '50K+', label: 'DAILY EVENTS LOGGED' },
    { value: '<1ms', label: 'PACKET INSPECTION LATENCY' },
    { value: '100%', label: 'LEAST-PRIVILEGE AUDITED' },
    { value: '01', label: 'TECHNICAL FIELD DOSSIER' }
  ];

  return (
    <section id="security" className="editorial-expertise">
      <div className="container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <div className="section-title-wrap">
            <span className="section-number">03 / CAPABILITIES</span>
            <h2 className="section-title">SECURITY EXPERTISE</h2>
          </div>
          <div className="section-meta">
            <span>INDEX OF TECHNICAL DISCIPLINE</span><br />
            <span>OPERATIONAL FIELD MATRIX</span>
          </div>
        </div>

        {/* KPI Grid Matrix (GertiX Inspired Statement Block) */}
        <div className="kpi-matrix-wrapper">
          <div className="kpi-matrix-grid">
            {kpis.map((kpi, idx) => (
              <div key={idx} className="kpi-matrix-card">
                <span className="kpi-val">{kpi.value}</span>
                <span className="kpi-lbl">{kpi.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Index List */}
        <div className="expertise-index-grid">
          {expertiseDomains.map((domain) => (
            <div key={domain.num} className="expertise-index-card">
              <div className="card-top">
                <span className="domain-num">{domain.num}</span>
                <span className="mono-label">{domain.tools}</span>
              </div>

              <h3 className="domain-title">{domain.title}</h3>
              <h4 className="domain-sub">{domain.subtitle}</h4>

              <p className="domain-summary">{domain.summary}</p>

              <div className="capabilities-tags">
                {domain.capabilities.map((cap, i) => (
                  <span key={i} className="mono-tag">{cap}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
