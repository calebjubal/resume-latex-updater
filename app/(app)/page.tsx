"use client";

import dynamic from "next/dynamic";
import { ResumeProvider } from "@/lib/resume-context";

const ResumeEditor = dynamic(() => import("@/components/resume-editor"), {
  ssr: false,
});

const LatexPreview = dynamic(() => import("@/components/latex-preview"), {
  ssr: false,
});

export default function Home() {
  return (
    <ResumeProvider>
      <div className="flex h-[calc(100vh-4rem)] gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Left panel – Editor */}
        <div className="w-[420px] shrink-0 border-r border-border/60 overflow-hidden flex flex-col">
          <ResumeEditor />
        </div>

        {/* Right panel – Preview */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <LatexPreview />
        </div>
      </div>
    </ResumeProvider>
  );
}
