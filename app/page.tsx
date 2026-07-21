import Image from "next/image";
import {
  Activity, ArrowDownToLine, ArrowRight, Bot, BrainCircuit, CheckCircle2,
  Database, ExternalLink, FileText, Globe2, LockKeyhole, Mail,
  Menu, Play, Radar, Server, ShieldCheck, Smartphone, Sparkles, Zap, Flag,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/Logo";
import { Mascot, Particles } from "@/components/Ambient";
import { JuryGuide } from "@/components/JuryGuide";

const features = [
  { icon: Radar, title: "Deepfakes démasqués", text: "Détecte les manipulations audio et vidéo qui menacent la confiance dans l’espace public." },
  { icon: BrainCircuit, title: "Documents vérifiés", text: "Analyse les documents officiels pour repérer falsifications et incohérences." },
  { icon: Zap, title: "Langues locales comprises", text: "Observe les contenus en français, camfranglais et langues locales avec le contexte du pays." },
  { icon: Flag, title: "Vigilance patriotique", text: "Permet aux citoyens de signaler les contenus suspects et de protéger leur communauté." },
];

const stack = [
  { icon: Smartphone, number: "01", title: "Application citoyenne", text: "Le bouclier dans la poche pour analyser, vérifier et signaler en quelques gestes.", tags: ["Flutter", "Android"], href: siteConfig.links.apk },
  { icon: Globe2, number: "02", title: "Centre de contrôle", text: "La vigie DIVLAB qui consolide les signalements, risques et tendances du cyberespace camerounais. Lance des sensibilisations.", tags: ["ERP", "Dashboard"], href: siteConfig.links.erp },
  { icon: Server, number: "03", title: "Backend & IA", text: "L’orchestrateur intelligent sélectionne les modèles adaptés, organise les analyses et produit une décision explicable. Son code source reste privé afin de protéger l’architecture et les mécanismes de défense.", tags: ["FastAPI", "IA", "Accès privé"], href: "/documentation" },
];

const actions = [
  { label: "Télécharger l'APK", href: siteConfig.links.apk, icon: ArrowDownToLine, primary: true },
  { label: "Accéder à l'ERP", href: siteConfig.links.erp, icon: ExternalLink },
  { label: "Documentation", href: siteConfig.links.documentation, icon: FileText },
  { label: "Voir la démo", href: siteConfig.links.video, icon: Play },
];

export default function Home() {
  return (
    <main id="top" className="overflow-hidden"><Particles /><JuryGuide />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top"><Logo /></a>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#solution">Mission</a><a href="#ecosysteme">Écosystème</a><a href="#apercus">Aperçus</a><a href="#divlab">DIVLAB</a>
          </nav>
          <a href={siteConfig.links.apk} className="hidden items-center gap-2 rounded-full bg-cyan px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-white sm:inline-flex"><ArrowDownToLine size={17} /><span className="flex flex-col leading-tight"><span>Tester l'application</span><span className="text-[10px] font-semibold opacity-70">Poids : {siteConfig.apkSize}</span></span></a>
          <a href="#ecosysteme" className="mobile-nav-link sm:hidden">Visiter <ArrowRight size={14} /></a>
        </div>
      </header>

      <section className="hero-grid relative min-h-[860px] pt-40">
        <div className="orb left-1/2 top-20 -translate-x-1/2" />
        <div className="relative mx-auto max-w-7xl px-5 text-center lg:px-8">
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-2 text-xs font-semibold uppercase tracking-[.2em] text-cyan"><Sparkles size={14} />{siteConfig.eyebrow}</div>
          <h1 className="mx-auto max-w-5xl font-display text-5xl font-semibold leading-[1.04] tracking-[-.045em] text-white sm:text-7xl lg:text-[88px]">
            Protéger le vrai.<br /><span className="gradient-text">Défendre le Cameroun.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">{siteConfig.description}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={siteConfig.links.apk} className="button-primary"><ArrowDownToLine size={18} /><span className="flex flex-col items-start leading-tight"><span>Télécharger l'APK</span><span className="text-[10px] font-semibold opacity-70">Poids : {siteConfig.apkSize}</span></span></a>
            <a href={siteConfig.links.video} className="button-secondary"><Play size={18} fill="currentColor" /> Voir la démonstration</a>
          </div>
          <div className="hero-device pointer-events-none absolute -right-8 -top-14 opacity-90"><div className="phone-float"><Image src="/screenshots/mobile.svg" alt="Application ARGUS" width={235} height={470} className="rounded-[2.5rem] border-[8px] border-slate-800 shadow-2xl" /></div><Mascot name="welcome" className="absolute -bottom-20 -left-32 w-48 " /></div>
          <Mascot name="guardian" className="hero-mobile-mascot" />
          <div className="relative mx-auto mt-20 max-w-5xl rounded-[2rem] border border-white/10 bg-white/[.035] p-3 shadow-glow backdrop-blur">
            <div className="dashboard-mock rounded-[1.4rem] border border-white/10 p-5 text-left sm:p-7">
              <div className="mb-8 flex items-center justify-between"><Logo /><span className="flex items-center gap-2 text-xs text-cyan"><span className="h-2 w-2 animate-pulse rounded-full bg-cyan" /> VIGIE DIVLAB ACTIVE</span></div>
              <div className="grid gap-4 md:grid-cols-3">
                {[{ label: "Score de sécurité", value: "94/100", icon: ShieldCheck }, { label: "Menaces neutralisées", value: "1 284", icon: LockKeyhole }, { label: "Événements analysés", value: "48.9K", icon: Activity }].map(({ label, value, icon: Icon }) => <div key={label} className="rounded-2xl border border-white/10 bg-ink/70 p-5"><Icon className="mb-5 text-cyan" /><div className="font-display text-3xl font-semibold text-white">{value}</div><div className="mt-1 text-sm text-slate-500">{label}</div></div>)}
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-[1.6fr_1fr]"><div className="h-40 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(67,244,200,.08),transparent)] p-5"><div className="text-sm text-slate-400">Activité de sécurité</div><div className="chart-line mt-8" /></div><div className="rounded-2xl border border-white/10 bg-ink/70 p-5"><div className="text-sm text-slate-400">Dernière analyse</div><div className="mt-5 flex items-center gap-3"><CheckCircle2 className="text-cyan" /><span className="text-white">Aucune menace critique</span></div></div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="solution" className="section-pad border-t border-white/5">
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8"><Mascot name="think" className="section-mascot solution-mascot" />
          <div className="grid gap-14 lg:grid-cols-2 lg:items-end"><div><p className="kicker">Notre mission</p><h2 className="section-title">L’IA ne doit pas devenir une arme contre la vérité et la cohésion nationale.</h2></div><p className="text-lg leading-8 text-slate-400">Faux documents, deepfakes, désinformation et manipulation des langues locales fragilisent la confiance. ARGUS donne aux Camerounais les moyens de vérifier avant de croire, de comprendre avant de partager et de signaler pour protéger.</p></div>
          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{features.map(({ icon: Icon, title, text }) => <article key={title} className="card"><span className="icon-box"><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section id="origine" className="section-pad border-y border-white/5 bg-cyan/[.025]">
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[.75fr_1.25fr] lg:px-8">
          <div className="argus-eye" aria-hidden="true"><Image src="/logo.svg" alt="" width={250} height={250}/><span className="argus-orbit"/></div>
          <div><p className="kicker">Pourquoi ARGUS ?</p><h2 className="section-title">Cent yeux pour ne jamais perdre la menace de vue.</h2><p className="mt-6 text-lg leading-8 text-slate-400">Dans la mythologie grecque, <strong className="text-white">Argus Panoptès</strong> est un gardien doté de cent yeux. Même lorsqu’une partie de ses yeux se repose, les autres demeurent éveillés. Le PROJET ARGUS reprend cette image de vigilance permanente : plusieurs outils et modèles d’intelligence artificielle observent différents signaux, confrontent leurs analyses et veillent ensemble sur le citoyen dans le cyberespace camerounais.</p><p className="mt-5 text-sm font-semibold uppercase tracking-[.18em] text-cyan">Voir · Vérifier · Comprendre · Protéger</p></div>
        </div>
      </section>

      <section id="ecosysteme" className="section-pad bg-white/[.018]">
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8"><Mascot name="doublePoint" className="section-mascot ecosystem-mascot" /><div className="max-w-3xl"><p className="kicker">Votre parcours commence ici</p><h2 className="section-title">Trois portes d’entrée. Un projet complet.</h2><p className="mt-5 max-w-2xl leading-7 text-slate-400">Chaque carte ouvre une composante réellement testable du projet dans un nouvel onglet. Commencez par l’application, poursuivez avec l’ERP, puis découvrez le moteur backend.</p></div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">{stack.map(({ icon: Icon, number, title, text, tags, href }) => <a target="_blank" rel="noreferrer" href={href} key={title} className="ecosystem-card group relative overflow-hidden rounded-3xl border border-white/10 bg-panel p-8"><ExternalLink className="absolute right-6 top-6 text-slate-600 transition group-hover:text-cyan" size={20} /><span className="absolute right-6 top-4 font-display text-7xl font-bold text-white/[.035]">{number}</span><span className="icon-box"><Icon /></span><h3 className="mt-10 font-display text-2xl font-semibold text-white">{title}</h3><p className="mt-4 leading-7 text-slate-400">{text}</p><div className="mt-8 flex gap-2">{tags.map(tag => <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">{tag}</span>)}</div></a>)}</div>
          <div className="mt-12 flex flex-wrap gap-3">{actions.map(({ label, href, icon: Icon, primary }) => <a key={label} href={href} className={primary ? "button-primary" : "button-secondary"}><Icon size={17} /><span className="flex flex-col items-start leading-tight"><span>{label}</span>{href === siteConfig.links.apk && <span className="text-[10px] font-semibold opacity-70">Poids : {siteConfig.apkSize}</span>}</span></a>)}</div>
        </div>
      </section>

      <section id="apercus" className="section-pad">
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8"><Mascot name="point" className="section-mascot preview-mascot" /><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="kicker">Le produit en action</p><h2 className="section-title">Une expérience claire.<br />Une défense sans friction.</h2></div><p className="max-w-md text-slate-400">Application citoyenne, centre de contrôle et rapports IA : les trois interfaces d’un même bouclier numérique.</p></div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">{siteConfig.screenshots.map((shot, i) => <figure key={shot.title} className={i === 1 ? "screenshot-card md:translate-y-8" : "screenshot-card"}><Image src={shot.image} alt={shot.title} width={800} height={560} className="h-auto w-full rounded-2xl border border-white/10" /><figcaption className="mt-5"><strong className="font-display text-lg text-white">{shot.title}</strong><span className="mt-1 block text-sm text-slate-500">{shot.subtitle}</span></figcaption></figure>)}</div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-[1.3fr_.7fr] lg:px-8"><div className="rounded-[2rem] border border-cyan/20 bg-cyan/[.055] p-8 sm:p-12"><Bot className="text-cyan" size={36} /><h2 className="mt-8 font-display text-3xl font-semibold text-white sm:text-4xl">Prêt à découvrir ARGUS ?</h2><p className="mt-4 max-w-xl text-slate-400">Testez l'application et explorez le centre de contrôle avec notre compte de démonstration.</p><div className="mt-8 flex flex-wrap gap-3"><a href={siteConfig.links.apk} className="button-primary"><ArrowDownToLine size={18} /><span className="flex flex-col items-start leading-tight"><span>Tester maintenant</span><span className="text-[10px] font-semibold opacity-70">Poids : {siteConfig.apkSize}</span></span></a><a href={siteConfig.links.erp} className="button-secondary">Ouvrir l'ERP</a></div></div>
          <div className="rounded-[2rem] border border-white/10 bg-panel p-8 sm:p-10"><div className="flex items-center gap-3 text-cyan"><Database /><span className="font-semibold">Compte admin pour le jury</span></div><div className="mt-8 space-y-5"><div><span className="text-xs uppercase tracking-wider text-slate-600">Email</span><p className="mt-1 text-white">{siteConfig.demo.email}</p></div><div><span className="text-xs uppercase tracking-wider text-slate-600">Mot de passe</span><p className="mt-1 text-white">{siteConfig.demo.password}</p></div></div></div>
        </div>
      </section>

      <section id="divlab" className="section-pad border-t border-white/5">
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8"><Mascot name="builder" className="absolute -right-4 -top-50 hidden w-64 md:block" /><div className="max-w-4xl"><p className="kicker">Déployé par DIVLAB</p><h2 className="section-title">L’innovation locale au service de la souveraineté numérique.</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">DIVLAB est une startup camerounaise d’innovation numérique. Avec ARGUS, nous construisons une technologie responsable, ancrée dans nos langues, nos usages et notre ambition collective : un cyberespace camerounais plus sûr, plus lucide et plus résilient.</p><div className="mt-8 flex flex-wrap gap-3"><a href={`https://divlabs-tech.com`} target="_blank" rel="noreferrer" className="button-primary">Découvrir DIVLAB <ExternalLink size={17} /></a><a href={`https://divlabs-tech.com/#contact`} target="_blank" rel="noreferrer" className="button-secondary"><Mail size={17} /> Nous contacter</a></div></div></div>
      </section>

      <footer className="border-t border-white/5 py-10"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 text-sm text-slate-600 sm:flex-row lg:px-8"><Logo /><p>© 2026 DIVLAB · PROJET ARGUS — Made in Cameroon 🇨🇲</p><div className="flex gap-5"><span title="Code source confidentiel">Projet propriétaire</span><a href="/documentation">Documentation</a></div></div></footer>
    </main>
  );
}
