import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <Image src="/logo.svg" alt="Logo AI-SHIELD" width={42} height={42} priority />
      {!compact && <span><strong className="block font-display text-lg leading-none text-white">AI-SHIELD</strong><small className="mt-1 block text-[9px] font-bold uppercase tracking-[.2em] text-cyan">by DIVLAB</small></span>}
    </span>
  );
}
