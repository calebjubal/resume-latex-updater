"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useResume } from "@/lib/resume-context";
import { generateLatex } from "@/lib/latex-template";

export default function LatexPreview() {
  const { data } = useResume();
  const containerRef = useRef<HTMLDivElement>(null);
  const [compiling, setCompiling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latexSource, setLatexSource] = useState("");
  const [showSource, setShowSource] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const renderLatex = useCallback(async (latex: string) => {
    setCompiling(true);
    setError(null);
    try {
      // Dynamic import to avoid SSR issues
      const { parse, HtmlGenerator } = await import("latex.js");
      const generator = new HtmlGenerator({ hyphenate: false });
      const doc = parse(latex, { generator });
      const domFragment = doc.domFragment();

      if (containerRef.current) {
        containerRef.current.innerHTML = "";

        // Create a wrapper that applies latex.js styles
        const wrapper = document.createElement("div");

        // Get the latex.js default styles
        const styleElement = doc.stylesAndScripts("none");
        if (styleElement) {
          wrapper.appendChild(styleElement);
        }

        wrapper.appendChild(domFragment);
        containerRef.current.appendChild(wrapper);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "LaTeX compilation failed");
    } finally {
      setCompiling(false);
    }
  }, []);

  useEffect(() => {
    const latex = generateLatex(data);
    setLatexSource(latex);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      renderLatex(latex);
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [data, renderLatex]);

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
        <div className="flex items-center gap-2">
          <h2 className="font-heading text-sm font-semibold tracking-tight">
            Preview
          </h2>
          {compiling && (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              Compiling…
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowSource(!showSource)}
          className="rounded-md border border-border/60 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {showSource ? "Preview" : "LaTeX Source"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 mt-3 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
          {error}
        </div>
      )}

      {/* Content */}
      {showSource ? (
        <div className="flex-1 overflow-auto p-4">
          <pre className="whitespace-pre-wrap rounded-lg border border-border/60 bg-muted/30 p-4 font-mono text-xs leading-relaxed text-foreground">
            {latexSource}
          </pre>
        </div>
      ) : (
        <div className="flex-1 overflow-auto bg-muted/20 p-4">
          <div
            ref={containerRef}
            className="mx-auto w-full max-w-[210mm] rounded-lg border border-border bg-white p-6 shadow-sm"
            style={{ minHeight: "297mm", color: "#000" }}
          />
        </div>
      )}
    </div>
  );
}
