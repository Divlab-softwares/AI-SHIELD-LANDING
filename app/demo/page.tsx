import Link from "next/link";
import { ArrowLeft, Film, PlayCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Mascot, Particles } from "@/components/Ambient";
import { siteConfig } from "@/config/site";

export default function DemoPage() {
  return <main className="relative min-h-screen overflow-hidden"><Particles /><div className="orb left-1/2 top-20 -translate-x-1/2" /><header className="relative z-10 border-b border-white/5 bg-ink/70 backdrop-blur-xl"><div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5"><Link href="/"><Logo /></Link><Link href="/" className="button-secondary "><ArrowLeft size={16} /> Retour</Link></div></header>
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-20 text-center"><div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-cyan"><Film size={15} /> Démonstration officielle</div><h1 className="mx-auto mt-7 max-w-4xl font-display text-5xl font-semibold tracking-[-.05em] text-white sm:text-7xl">Voyez le bouclier<br /><span className="gradient-text">entrer en action.</span></h1><p className="mx-auto mt-6 max-w-2xl leading-7 text-slate-400">Découvrez comment AI-SHIELD aide un citoyen à analyser un contenu suspect, comprendre le verdict et agir de façon responsable.</p>
      <div id="video" className="video-shell relative mx-auto mt-14 max-w-5xl"><Mascot name="point" className="absolute -right-16 -top-28 z-20 hidden w-52 lg:block" /><video className="aspect-video w-full rounded-[1.5rem] bg-black" controls preload="metadata" poster="/screenshots/dashboard.svg"><source src={siteConfig.videoFile} type="video/mp4" />Votre navigateur ne prend pas en charge la vidéo.</video></div>
      {/* <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-white/10 bg-panel p-6 text-left"><div className="flex gap-4"><PlayCircle className="shrink-0 text-cyan" /><div><strong className="text-white">Ajouter votre vidéo</strong><p className="mt-2 text-sm leading-6 text-slate-500">Placez votre fichier sous <code className="text-cyan">public/video/demo#video.mp4</code>. Pour un autre nom, modifiez <code className="text-cyan">videoFile</code> dans <code className="text-cyan">config/site.ts</code>.</p></div></div></div> */}
    </section><footer className="relative z-10 border-t border-white/5 py-10 text-center text-sm text-slate-600">Une innovation camerounaise portée par DIVLAB 🇨🇲</footer>
  </main>;
}
