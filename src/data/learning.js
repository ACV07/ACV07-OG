import splunkDiagram from '../assets/splunk_diagram.png';
import wiresharkDiagram from '../assets/wireshark_diagram.png';
import nmapDiagram from '../assets/nmap_diagram.png';

export const learningData = {
  status: "IN PROGRESS",
  focus: "CYBERSECURITY TOOLS / NETWORK ANALYSIS",
  modules: [
    {
      id: "splunk",
      number: "01",
      title: "01 / SPLUNK ARCHITECTURE",
      description: "Learning how Splunk collects, indexes, searches, and visualizes machine data through its core architecture.",
      image: splunkDiagram,
      focus: "FOCUS: DATA INGESTION / INDEXING / SEARCH"
    },
    {
      id: "wireshark",
      number: "02",
      title: "02 / WIRESHARK",
      description: "Learning packet capture and protocol analysis by examining network traffic, packet structures, and communication flows.",
      image: wiresharkDiagram,
      focus: "FOCUS: PACKET CAPTURE / PROTOCOL ANALYSIS"
    },
    {
      id: "nmap",
      number: "03",
      title: "03 / NMAP",
      description: "Learning network reconnaissance through host discovery, port scanning, service identification, and basic enumeration.",
      image: nmapDiagram,
      focus: "FOCUS: RECONNAISSANCE / PORT SCANNING / ENUMERATION"
    }
  ]
};
