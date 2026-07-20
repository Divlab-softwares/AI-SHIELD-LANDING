export const siteConfig = {
  name: "AI-SHIELD",
  eyebrow: "Projet Hackathon - SIN 2026",
  headline: "L'intelligence qui protège votre monde numérique.",
  description:
    "Une plateforme de cybersécurité augmentée par l'IA qui analyse, détecte et aide à neutraliser les menaces avant qu'elles ne deviennent critiques.",
  contactEmail: "divlabsoftware@gmail.com",
  links: {
    apk: "#",
    erp: "https://aishield-erp.divlabs-tech.com/",
    documentation: "/documentation",
    video: "/demo#video",
  },
  demo: {
    email: "demo@aishield.divlab",
    password: "AIShieldDemo2026!",
  },
  team: [
    { name: "Votre nom", role: "Product & AI" },
    { name: "Membre 2", role: "Mobile & Backend" },
    { name: "Membre 3", role: "Design & Cybersecurity" },
  ],
  screenshots: [
    { title: "Application mobile", subtitle: "Analyse de menace en temps réel et dénonciations", image: "/screenshots/mobile.svg" },
    { title: "Centre de contrôle", subtitle: "Vue globale des incidents, sensibilisations recolte des donnees et utilisation des informations cles", image: "/screenshots/dashboard.png" },
    { title: "Rapports intelligents", subtitle: "Décisions guidées par l'IA et l'orchestreur intelligent.", image: "/screenshots/report.svg" },
  ],
  videoFile: "https://youtu.be/fLCkzWtdCII?si=lCZrjRKkzuG1PDVa"
} as const;
