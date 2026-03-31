export const ADVISORIES = [
  {
    id: 1,
    slug: "cve-2025-rce-apache",
    title: "Critical RCE in Apache HTTP Server 2.4.x",
    excerpt:
      "A pre-authentication remote code execution vulnerability in Apache HTTP Server allows unauthenticated attackers to execute arbitrary commands via crafted HTTP requests.",
    date: "2025-03-18",
    tags: ["CVE", "RCE", "Apache"],
    severity: "Critical",
    severityColor: "#ff3b30",
  },
  {
    id: 2,
    slug: "red-team-playbook-2025",
    title: "Red Team Playbook: Living Off the Land in 2025",
    excerpt:
      "A deep dive into how modern red teams abuse native OS binaries and signed Microsoft tools to evade EDR solutions, with detection recommendations for blue teams.",
    date: "2025-03-10",
    tags: ["Red Team", "LOLBAS", "Evasion"],
    severity: "Informational",
    severityColor: "#60a5fa",
  },
  {
    id: 3,
    slug: "zero-trust-pitfalls",
    title: "Zero-Trust Architecture: Common Pitfalls We See in the Field",
    excerpt:
      "Based on 12 architecture reviews in Q1 2025, we document the most frequent misconfigurations that render zero-trust implementations ineffective.",
    date: "2025-02-28",
    tags: ["Architecture", "Zero-Trust"],
    severity: "High",
    severityColor: "#fb923c",
  },
  {
    id: 4,
    slug: "phishing-ai-campaigns",
    title: "AI-Generated Phishing: Detection at Scale",
    excerpt:
      "Our threat intelligence team analyzed over 40,000 phishing samples generated with LLMs. Here's what changed — and what defenders can do about it.",
    date: "2025-02-14",
    tags: ["Phishing", "Threat Intel", "AI"],
    severity: "High",
    severityColor: "#fb923c",
  },
  {
    id: 5,
    slug: "active-directory-attack-paths",
    title: "Active Directory Attack Paths: A Graph-Based Approach",
    excerpt:
      "Using BloodHound data from 30 engagements, we map the most traversed attack paths to Domain Admin and provide mitigation priorities.",
    date: "2025-01-30",
    tags: ["Active Directory", "Red Team"],
    severity: "Critical",
    severityColor: "#ff3b30",
  },
  {
    id: 6,
    slug: "supply-chain-npm-2025",
    title: "Supply Chain Attacks Targeting npm Packages in 2025",
    excerpt:
      "An analysis of 8 confirmed supply chain attacks affecting npm packages with over 1M weekly downloads, including indicators of compromise.",
    date: "2025-01-15",
    tags: ["Supply Chain", "Threat Intel"],
    severity: "High",
    severityColor: "#fb923c",
  },
];
