"use client";

import type { CertificationEntry } from "@/lib/default-resume";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: CertificationEntry[];
  onChange: (data: CertificationEntry[]) => void;
}

const emptyEntry: CertificationEntry = {
  name: "",
  issuer: "",
  date: "",
  credentialId: "",
};

export default function Certifications({ data, onChange }: Props) {
  const updateField = (
    index: number,
    field: keyof CertificationEntry,
    value: string,
  ) => {
    const next = [...data];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const addEntry = () => onChange([...data, { ...emptyEntry }]);
  const removeEntry = (index: number) =>
    onChange(data.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      {data.map((cert, i) => (
        <div
          key={i}
          className="rounded-lg border border-border/60 bg-muted/20 p-3"
        >
          <div className="mb-3 flex items-start justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              Certification {i + 1}
            </p>
            <button
              type="button"
              onClick={() => removeEntry(i)}
              className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Remove certification"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={cert.name}
              placeholder="Certification name"
              onChange={(e) => updateField(i, "name", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={cert.issuer}
                placeholder="Issuer"
                onChange={(e) => updateField(i, "issuer", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="text"
                value={cert.date}
                placeholder="Date"
                onChange={(e) => updateField(i, "date", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <input
              type="text"
              value={cert.credentialId ?? ""}
              placeholder="Credential ID (optional)"
              onChange={(e) => updateField(i, "credentialId", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEntry}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Plus className="size-3.5" />
        Add Certification
      </button>
    </div>
  );
}