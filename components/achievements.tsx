"use client";

import type { AchievementEntry } from "@/lib/default-resume";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: AchievementEntry[];
  onChange: (data: AchievementEntry[]) => void;
}

export default function Achievements({ data, onChange }: Props) {
  const updateField = (
    index: number,
    field: keyof AchievementEntry,
    value: string,
  ) => {
    const next = [...data];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const addEntry = () =>
    onChange([...data, { title: "", description: "" }]);
  const removeEntry = (index: number) =>
    onChange(data.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      {data.map((achievement, i) => (
        <div
          key={i}
          className="rounded-lg border border-border/60 bg-muted/20 p-3"
        >
          <div className="mb-3 flex items-start justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              Achievement {i + 1}
            </p>
            <button
              type="button"
              onClick={() => removeEntry(i)}
              className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Remove achievement"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={achievement.title}
              placeholder="Achievement title"
              onChange={(e) => updateField(i, "title", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm font-medium text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <textarea
              rows={2}
              value={achievement.description}
              placeholder="Description…"
              onChange={(e) => updateField(i, "description", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs leading-relaxed text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
        Add Achievement
      </button>
    </div>
  );
}