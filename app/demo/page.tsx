import Link from "next/link";
import { ArrowLeft, Film } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Mascot, Particles } from "@/components/Ambient";
import { siteConfig } from "@/config/site";

export default function DemoPage() {
  return <main className="relative min-h-screen overflow-hidden"><Particles /><div className="orb left-1/2 top-20 -translate-x-1/2" /><header className="relative z-10 border-b border-white/5 bg-ink/70 backdrop-blur-xl"><div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5"><Link href="/"><Logo /></Link><Link href="/" className="button-secondary "><ArrowLeft size={16} /> Retour</Link></div></header>
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-20 text-center"><div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-cyan"><Film size={15} /> Démonstration officielle</div><h1 className="mx-auto mt-7 max-w-4xl font-display text-5xl font-semibold tracking-[-.05em] text-white sm:text-7xl">Voyez le gardien<br /><span className="gradient-text">entrer en action.</span></h1><p className="mx-auto mt-6 max-w-2xl leading-7 text-slate-400">Découvrez comment ARGUS aide un citoyen à analyser un contenu suspect, comprendre le verdict et agir de façon responsable.</p>
      <div id="video" className="video-shell relative mx-auto mt-14 max-w-sm"><Mascot name="point" className="absolute -right-40 -top-28 z-20 hidden w-52 lg:block" /><iframe className="aspect-[9/16] w-full rounded-[1.5rem] bg-black" src={siteConfig.videoEmbedUrl} title="Démonstration officielle d'ARGUS" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
    </section><footer className="relative z-10 border-t border-white/5 py-10 text-center text-sm text-slate-600">Une innovation camerounaise portée par DIVLAB 🇨🇲</footer>
  </main>;
}
