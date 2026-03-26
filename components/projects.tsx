"use client";

import type { ProjectEntry } from "@/lib/default-resume";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: ProjectEntry[];
  onChange: (data: ProjectEntry[]) => void;
}

const emptyProject: ProjectEntry = {
  name: "",
  techStack: [],
  description: "",
  link: "",
  github: "",
};

export default function Projects({ data, onChange }: Props) {
  const updateField = (
    index: number,
    field: keyof Omit<ProjectEntry, "techStack">,
    value: string,
  ) => {
    const next = [...data];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const updateTechStack = (index: number, value: string) => {
    const next = [...data];
    next[index] = {
      ...next[index],
      techStack: value.split(",").map((s) => s.trimStart()),
    };
    onChange(next);
  };

  const addProject = () => onChange([...data, { ...emptyProject }]);
  const removeProject = (index: number) =>
    onChange(data.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      {data.map((project, i) => (
        <div
          key={i}
          className="rounded-lg border border-border/60 bg-muted/20 p-3"
        >
          <div className="mb-3 flex items-start justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              Project {i + 1}
            </p>
            <button
              type="button"
              onClick={() => removeProject(i)}
              className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Remove project"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={project.name}
              placeholder="Project name"
              onChange={(e) => updateField(i, "name", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm font-medium text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="text"
              value={project.techStack.join(", ")}
              placeholder="Tech stack (comma-separated)"
              onChange={(e) => updateTechStack(i, e.target.value)}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <textarea
              rows={2}
              value={project.description}
              placeholder="Brief description…"
              onChange={(e) => updateField(i, "description", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs leading-relaxed text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={project.github ?? ""}
                placeholder="GitHub URL"
                onChange={(e) => updateField(i, "github", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="text"
                value={project.link ?? ""}
                placeholder="Live URL"
                onChange={(e) => updateField(i, "link", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground shadow-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addProject}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Plus className="size-3.5" />
        Add Project
      </button>
    </div>
  );
}