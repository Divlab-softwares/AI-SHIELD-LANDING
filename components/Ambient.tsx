import Image from "next/image";

const dots = Array.from({ length: 26 }, (_, i) => i);
const links = Array.from({ length: 7 }, (_, i) => i);

export function Particles() {
  return <div className="cyber-field" aria-hidden>
    <div className="cyber-scan" />
    <div className="cyber-radar cyber-radar-a"/><div className="cyber-radar cyber-radar-b"/>
    <div className="particles">{dots.map(i => <i key={i} style={{ "--i": i } as React.CSSProperties}/>)}</div>
    <div className="data-links">{links.map(i => <b key={i} style={{ "--i": i } as React.CSSProperties}/>)}</div>
  </div>;
}

export function Mascot({ name, className = "", label = "Mascotte AI-SHIELD" }: { name: string; className?: string; label?: string }) {
  return <Image unoptimized src={`/animations/mascot/${name}.webp`} alt={label} width={240} height={240} className={`mascot ${className}`} />;
}
