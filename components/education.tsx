"use client";

import type { EducationEntry } from "@/lib/default-resume";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: EducationEntry[];
  onChange: (data: EducationEntry[]) => void;
}

const emptyEntry: EducationEntry = {
  degree: "",
  institution: "",
  location: "",
  startDate: "",
  endDate: "",
  gpa: "",
  coursework: [],
};

export default function Education({ data, onChange }: Props) {
  const updateField = (
    index: number,
    field: keyof Omit<EducationEntry, "coursework">,
    value: string,
  ) => {
    const next = [...data];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const updateCoursework = (index: number, value: string) => {
    const next = [...data];
    next[index] = {
      ...next[index],
      coursework: value.split(",").map((s) => s.trimStart()),
    };
    onChange(next);
  };

  const addEntry = () => onChange([...data, { ...emptyEntry, coursework: [] }]);
  const removeEntry = (index: number) =>
    onChange(data.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      {data.map((entry, i) => (
        <div
          key={i}
          className="rounded-lg border border-border/60 bg-muted/20 p-3"
        >
          <div className="mb-3 flex items-start justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              Education {i + 1}
            </p>
            <button
              type="button"
              onClick={() => removeEntry(i)}
              className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Remove entry"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={entry.degree}
              placeholder="Degree"
              onChange={(e) => updateField(i, "degree", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="text"
              value={entry.institution}
              placeholder="Institution"
              onChange={(e) => updateField(i, "institution", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={entry.location}
                placeholder="Location"
                onChange={(e) => updateField(i, "location", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="text"
                value={entry.startDate}
                placeholder="Start"
                onChange={(e) => updateField(i, "startDate", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="text"
                value={entry.endDate}
                placeholder="End"
                onChange={(e) => updateField(i, "endDate", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <input
              type="text"
              value={entry.gpa ?? ""}
              placeholder="GPA (optional)"
              onChange={(e) => updateField(i, "gpa", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="text"
              value={entry.coursework?.join(", ") ?? ""}
              placeholder="Relevant coursework (comma-separated)"
              onChange={(e) => updateCoursework(i, e.target.value)}
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
        Add Education
      </button>
    </div>
  );
}