"use client";

import { ArrowRight, FileText, Play, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

export function JuryGuide() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return <aside className="jury-guide" aria-label="Guide de découverte du projet">
    <button onClick={() => setOpen(false)} className="jury-close" aria-label="Fermer"><X size={17} /></button>
    <div className="jury-icon"><ShieldCheck /></div>
    <div className="min-w-0 flex-1"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-cyan">Bienvenue, membres du jury</p><h2 className="mt-1 font-display text-lg font-semibold text-white">Vous êtes sur la vitrine de présentation d’AI-SHIELD.</h2><p className="mt-1 text-xs leading-5 text-slate-400">Le produit se découvre à travers l’application citoyenne, l’ERP et le moteur IA.</p><div className="mt-3 flex flex-wrap gap-2"><a href="#ecosysteme" className="jury-main-link">Commencer la visite <ArrowRight size={14} /></a><a href="/documentation" className="jury-link"><FileText size={13} /> Documentation</a><a href="/demo#video" className="jury-link"><Play size={13} /> Démonstration</a></div></div>
  </aside>;
}
