"use client";

import type { SkillCategory } from "@/lib/default-resume";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: SkillCategory[];
  onChange: (data: SkillCategory[]) => void;
}

export default function Skills({ data, onChange }: Props) {
  const updateCategory = (index: number, field: "category" | "items", value: string) => {
    const next = [...data];
    if (field === "category") {
      next[index] = { ...next[index], category: value };
    } else {
      next[index] = { ...next[index], items: value.split(",").map((s) => s.trimStart()) };
    }
    onChange(next);
  };

  const addCategory = () => {
    onChange([...data, { category: "", items: [] }]);
  };

  const removeCategory = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {data.map((cat, i) => (
        <div
          key={i}
          className="rounded-lg border border-border/60 bg-muted/20 p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <input
              type="text"
              value={cat.category}
              placeholder="Category name"
              onChange={(e) => updateCategory(i, "category", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => removeCategory(i)}
              className="ml-2 shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Remove category"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
          <input
            type="text"
            value={cat.items.join(", ")}
            placeholder="Comma-separated skills"
            onChange={(e) => updateCategory(i, "items", e.target.value)}
            className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addCategory}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Plus className="size-3.5" />
        Add Category
      </button>
    </div>
  );
}