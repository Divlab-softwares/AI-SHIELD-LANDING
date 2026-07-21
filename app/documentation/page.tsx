import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
