"use client";

import type { SummaryInfo } from "@/lib/default-resume";

interface Props {
  data: SummaryInfo;
  onChange: (data: SummaryInfo) => void;
}

export default function Summary({ data, onChange }: Props) {
  return (
    <div>
      <label
        htmlFor="summary-text"
        className="mb-1 block text-xs font-medium text-muted-foreground"
      >
        Professional Summary
      </label>
      <textarea
        id="summary-text"
        rows={6}
        value={data.text}
        placeholder="A brief summary of your professional background…"
        onChange={(e) => onChange({ text: e.target.value })}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm leading-relaxed text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}