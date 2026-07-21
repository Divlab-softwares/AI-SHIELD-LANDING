import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { ArrowDown, ArrowLeft, Ban, Bot, BrainCircuit, CheckCircle2, Cloud, FileScan, Gauge, Globe2, Languages, Network, ShieldCheck, Smartphone, TriangleAlert } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { Logo } from "@/components/Logo";
import { Particles } from "@/components/Ambient";

export const metadata = {
  title: "Documentation — Projet ARGUS",
  description: "Documentation générale du projet AI SHIELD / ARGUS.",
};

export default async function DocumentationPage() {
  const readmePath = path.join(process.cwd(), "README.md");
  const markdown = await readFile(readmePath, "utf8");

  return (
    <main className="min-h-screen overflow-hidden">
      <Particles />
      <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
          <Link href="/" aria-label="Retour à l’accueil">
            <Logo />
          </Link>
          <Link href="/" className="button-secondary">
            <ArrowLeft size={16} /> Retour au site
          </Link>
        </div>
      </header>

      <article className="doc-content markdown-document relative mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <section className="doc-diagrams" aria-labelledby="visual-title">
          <div className="diagram-heading"><span>Repères visuels</span><h1 id="visual-title">Comprendre ARGUS en trois schémas</h1><p>Du signal observé jusqu’à la décision, voici comment les différentes couches du projet collaborent.</p></div>
          <figure className="diagram-panel"><figcaption><span>01</span><div><strong>Pipeline générale de protection</strong><small>Deux entrées, un moteur de décision, une réponse explicable.</small></div></figcaption><div className="pipeline-diagram"><div className="diagram-inputs"><div className="diagram-node"><Smartphone/><strong>Partage volontaire</strong><small>Image · audio · vidéo · document</small></div><div className="diagram-node"><Network/><strong>Bouclier réseau</strong><small>URL · domaine · IP · protocole</small></div></div><div className="diagram-arrow"><ArrowDown/><span>événements normalisés</span></div><div className="diagram-node diagram-node-accent"><Gauge/><strong>Event Bus + Decision Engine</strong><small>Fusion des règles, de la réputation et des scores IA</small></div><div className="diagram-arrow"><ArrowDown/><span>décision justifiée</span></div><div className="diagram-outcomes"><div className="outcome allow"><CheckCircle2/><strong>Autoriser</strong><small>Score 0–34</small></div><div className="outcome warn"><TriangleAlert/><strong>Avertir</strong><small>Score 35–69</small></div><div className="outcome block"><Ban/><strong>Bloquer</strong><small>Score 70–100</small></div></div></div></figure>
          <figure className="diagram-panel"><figcaption><span>02</span><div><strong>L’Orchestrateur IA</strong><small>Il choisit l’ordre des analyses et confronte trois regards spécialisés.</small></div></figcaption><div className="orchestrator-diagram"><div className="orchestrator-core"><Bot/><strong>Orchestrateur ARGUS</strong><small>Contexte · batterie · connexion · type de menace</small></div><div className="model-grid"><div className="model-node"><FileScan/><b>Modèle forensique</b><small>Falsification, ELA et OCR</small></div><div className="model-node"><BrainCircuit/><b>Modèle média</b><small>Deepfake, image, voix et vidéo</small></div><div className="model-node"><Languages/><b>Modèle linguistique</b><small>Français, camfranglais et langues locales</small></div></div><div className="fusion-line"><span/><strong>Fusion des verdicts</strong><span/></div><div className="final-verdict"><ShieldCheck/><div><strong>Verdict explicable</strong><small>Un score, des raisons et une action recommandée</small></div></div></div></figure>
          <figure className="diagram-panel"><figcaption><span>03</span><div><strong>Architecture distribuée</strong><small>Les composants restent spécialisés mais partagent le même système de vigilance.</small></div></figcaption><div className="architecture-diagram"><div className="arch-node"><Smartphone/><strong>Application ARGUS</strong><small>Analyse et protection citoyenne</small></div><div className="arch-link"><i/><span>API sécurisée</span><i/></div><div className="arch-node arch-main"><BrainCircuit/><strong>Backend & IA</strong><small>FastAPI · règles · modèles · décisions</small></div><div className="arch-link"><i/><span>Données contrôlées</span><i/></div><div className="arch-split"><div className="arch-node"><Cloud/><strong>Supabase</strong><small>Signalements et stockage</small></div><div className="arch-node"><Globe2/><strong>ERP DIVLAB</strong><small>Supervision et sensibilisation</small></div></div></div></figure>
        </section>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug]}
          components={{
            a: ({ href, children, node: _node, ...props }) => {
              const external = href?.startsWith("http");
              return (
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  {...props}
                >
                  {children}
                </a>
              );
            },
            input: ({ type, node: _node, ...props }) => (
              <input type={type} disabled={type === "checkbox"} {...props} />
            ),
            table: ({ children, node: _node, ...props }) => (
              <div className="markdown-table-wrap">
                <table {...props}>{children}</table>
              </div>
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </article>

      <footer className="border-t border-white/5 py-10 text-center text-sm text-slate-600">
        PROJET ARGUS — une initiative DIVLAB · Cameroun
      </footer>
    </main>
  );
}
