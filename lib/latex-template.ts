import type { ResumeData } from "./default-resume";

/**
 * Escape LaTeX special characters in a string.
 */
function esc(text: string): string {
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/[&%$#_{}]/g, (ch) => `\\${ch}`)
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
}

/**
 * Generate a complete LaTeX document string from resume data.
 *
 * Uses ONLY basic LaTeX features supported by latex.js:
 * - documentclass, begin/end document
 * - center, itemize, tabular
 * - textbf, textit, large, LARGE, small, hrule
 * - section, subsection (which latex.js renders)
 */
export function generateLatex(data: ResumeData): string {
  const { contact, summary, skills, experience, projects, education, certifications, achievements } = data;

  const lines: string[] = [];

  lines.push(String.raw`\documentclass[11pt]{article}`);
  lines.push("");
  lines.push(String.raw`\begin{document}`);
  lines.push("");

  // ── Contact Header ─────────────────────────────────────────
  lines.push(String.raw`\begin{center}`);
  lines.push(String.raw`{\LARGE \textbf{${esc(contact.name)}}} \\`);
  lines.push(String.raw`{\large ${esc(contact.title)}} \\[4pt]`);

  const contactParts: string[] = [];
  if (contact.email) contactParts.push(esc(contact.email));
  if (contact.phone) contactParts.push(esc(contact.phone));
  if (contact.location) contactParts.push(esc(contact.location));
  if (contact.linkedin) contactParts.push(esc(contact.linkedin));
  if (contact.github) contactParts.push(esc(contact.github));
  if (contact.website) contactParts.push(esc(contact.website));
  lines.push(String.raw`{\small ${contactParts.join(" | ")}}`);

  lines.push(String.raw`\end{center}`);
  lines.push("");
  lines.push(String.raw`\hrule`);
  lines.push("");

  // ── Summary ────────────────────────────────────────────────
  if (summary.text) {
    lines.push(String.raw`\section*{Summary}`);
    lines.push(esc(summary.text));
    lines.push("");
  }

  // ── Skills ─────────────────────────────────────────────────
  if (skills.length > 0) {
    lines.push(String.raw`\section*{Skills}`);
    for (const cat of skills) {
      lines.push(
        String.raw`\textbf{${esc(cat.category)}:} ${cat.items.map(esc).join(", ")} \\`,
      );
    }
    lines.push("");
  }

  // ── Experience ─────────────────────────────────────────────
  if (experience.length > 0) {
    lines.push(String.raw`\section*{Experience}`);
    for (const entry of experience) {
      lines.push(
        String.raw`\textbf{${esc(entry.role)}} -- ${esc(entry.company)}, ${esc(entry.location)} \\`,
      );
      lines.push(
        String.raw`\textit{${esc(entry.startDate)} -- ${esc(entry.endDate)}}`,
      );
      const validBullets = entry.bullets.filter((b) => b.trim());
      if (validBullets.length > 0) {
        lines.push(String.raw`\begin{itemize}`);
        for (const b of validBullets) {
          lines.push(String.raw`\item ${esc(b)}`);
        }
        lines.push(String.raw`\end{itemize}`);
      }
      lines.push("");
    }
  }

  // ── Projects ───────────────────────────────────────────────
  if (projects.length > 0) {
    lines.push(String.raw`\section*{Projects}`);
    for (const p of projects) {
      const tech = p.techStack.map(esc).join(", ");
      lines.push(
        String.raw`\textbf{${esc(p.name)}} \textit{(${tech})} \\`,
      );
      lines.push(esc(p.description));
      lines.push("");
    }
  }

  // ── Education ──────────────────────────────────────────────
  if (education.length > 0) {
    lines.push(String.raw`\section*{Education}`);
    for (const e of education) {
      lines.push(
        String.raw`\textbf{${esc(e.degree)}} \\`,
      );
      lines.push(
        String.raw`\textit{${esc(e.institution)}, ${esc(e.location)}} -- ${esc(e.startDate)} to ${esc(e.endDate)}`,
      );
      if (e.gpa) {
        lines.push(String.raw` \\ GPA: ${esc(e.gpa)}`);
      }
      if (e.coursework && e.coursework.length > 0) {
        lines.push(
          String.raw` \\ \textit{Coursework:} ${e.coursework.map(esc).join(", ")}`,
        );
      }
      lines.push("");
    }
  }

  // ── Certifications ─────────────────────────────────────────
  if (certifications.length > 0) {
    lines.push(String.raw`\section*{Certifications}`);
    for (const c of certifications) {
      lines.push(
        String.raw`\textbf{${esc(c.name)}} -- ${esc(c.issuer)} (${esc(c.date)}) \\`,
      );
    }
    lines.push("");
  }

  // ── Achievements ───────────────────────────────────────────
  if (achievements.length > 0) {
    lines.push(String.raw`\section*{Achievements}`);
    lines.push(String.raw`\begin{itemize}`);
    for (const a of achievements) {
      lines.push(
        String.raw`\item \textbf{${esc(a.title)}} -- ${esc(a.description)}`,
      );
    }
    lines.push(String.raw`\end{itemize}`);
    lines.push("");
  }

  lines.push(String.raw`\end{document}`);

  return lines.join("\n");
}
