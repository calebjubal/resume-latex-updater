"use client";

import type { ExperienceEntry } from "@/lib/default-resume";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: ExperienceEntry[];
  onChange: (data: ExperienceEntry[]) => void;
}

const emptyEntry: ExperienceEntry = {
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  bullets: [""],
};

export default function Experience({ data, onChange }: Props) {
  const updateEntry = (
    index: number,
    field: keyof Omit<ExperienceEntry, "bullets">,
    value: string,
  ) => {
    const next = [...data];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const updateBullet = (entryIdx: number, bulletIdx: number, value: string) => {
    const next = [...data];
    const bullets = [...next[entryIdx].bullets];
    bullets[bulletIdx] = value;
    next[entryIdx] = { ...next[entryIdx], bullets };
    onChange(next);
  };

  const addBullet = (entryIdx: number) => {
    const next = [...data];
    next[entryIdx] = {
      ...next[entryIdx],
      bullets: [...next[entryIdx].bullets, ""],
    };
    onChange(next);
  };

  const removeBullet = (entryIdx: number, bulletIdx: number) => {
    const next = [...data];
    next[entryIdx] = {
      ...next[entryIdx],
      bullets: next[entryIdx].bullets.filter((_, i) => i !== bulletIdx),
    };
    onChange(next);
  };

  const addEntry = () => onChange([...data, { ...emptyEntry, bullets: [""] }]);
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
              Experience {i + 1}
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

          <div className="grid gap-2 sm:grid-cols-2">
            <input
              type="text"
              value={entry.role}
              placeholder="Role / Title"
              onChange={(e) => updateEntry(i, "role", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="text"
              value={entry.company}
              placeholder="Company"
              onChange={(e) => updateEntry(i, "company", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="text"
              value={entry.location}
              placeholder="Location"
              onChange={(e) => updateEntry(i, "location", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={entry.startDate}
                placeholder="Start"
                onChange={(e) => updateEntry(i, "startDate", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="text"
                value={entry.endDate}
                placeholder="End"
                onChange={(e) => updateEntry(i, "endDate", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Bullets */}
          <div className="mt-3 space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">Bullets</p>
            {entry.bullets.map((bullet, bi) => (
              <div key={bi} className="flex gap-1.5">
                <input
                  type="text"
                  value={bullet}
                  placeholder="Achievement or responsibility…"
                  onChange={(e) => updateBullet(i, bi, e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => removeBullet(i, bi)}
                  className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  aria-label="Remove bullet"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addBullet(i)}
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <Plus className="size-3" />
              Add bullet
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEntry}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Plus className="size-3.5" />
        Add Experience
      </button>
    </div>
  );
}