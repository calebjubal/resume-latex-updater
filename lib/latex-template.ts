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
 * Uses only packages supported by latex.js: geometry, enumitem, hyperref, etc.
 */
export function generateLatex(data: ResumeData): string {
  const { contact, summary, skills, experience, projects, education, certifications, achievements } = data;

  const lines: string[] = [];

  // ── Preamble ───────────────────────────────────────────────
  lines.push(String.raw`\documentclass[11pt,a4paper]{article}`);
  lines.push(String.raw`\usepackage[margin=0.6in]{geometry}`);
  lines.push(String.raw`\usepackage{enumitem}`);
  lines.push(String.raw`\usepackage{hyperref}`);
  lines.push(String.raw`\pagestyle{empty}`);
  lines.push(String.raw`\setlength{\parindent}{0pt}`);
  lines.push("");

  // ── Helper commands ────────────────────────────────────────
  lines.push(String.raw`\newcommand{\sepline}{\vspace{2pt}\hrule\vspace{4pt}}`);
  lines.push(String.raw`\newcommand{\sectiontitle}[1]{\vspace{8pt}{\large\textbf{#1}}\sepline}`);
  lines.push("");

  // ── Document ───────────────────────────────────────────────
  lines.push(String.raw`\begin{document}`);
  lines.push("");

  // ── Contact Header ─────────────────────────────────────────
  lines.push(String.raw`\begin{center}`);
  lines.push(String.raw`{\LARGE\textbf{${esc(contact.name)}}} \\[2pt]`);
  lines.push(String.raw`{\large ${esc(contact.title)}} \\[4pt]`);

  const contactParts: string[] = [];
  if (contact.email) contactParts.push(esc(contact.email));
  if (contact.phone) contactParts.push(esc(contact.phone));
  if (contact.location) contactParts.push(esc(contact.location));
  if (contact.linkedin) contactParts.push(esc(contact.linkedin));
  if (contact.github) contactParts.push(esc(contact.github));
  if (contact.website) contactParts.push(esc(contact.website));
  lines.push(contactParts.join(" $|$ "));

  lines.push(String.raw`\end{center}`);
  lines.push("");

  // ── Summary ────────────────────────────────────────────────
  if (summary.text) {
    lines.push(String.raw`\sectiontitle{Summary}`);
    lines.push(esc(summary.text));
    lines.push("");
  }

  // ── Skills ─────────────────────────────────────────────────
  if (skills.length > 0) {
    lines.push(String.raw`\sectiontitle{Skills}`);
    for (const cat of skills) {
      lines.push(
        String.raw`\textbf{${esc(cat.category)}:} ${cat.items.map(esc).join(", ")} \\`,
      );
    }
    lines.push("");
  }

  // ── Experience ─────────────────────────────────────────────
  if (experience.length > 0) {
    lines.push(String.raw`\sectiontitle{Experience}`);
    for (const entry of experience) {
      lines.push(
        String.raw`\textbf{${esc(entry.role)}} \hfill ${esc(entry.startDate)} -- ${esc(entry.endDate)} \\`,
      );
      lines.push(
        String.raw`\textit{${esc(entry.company)}, ${esc(entry.location)}} \\`,
      );
      if (entry.bullets.length > 0) {
        lines.push(String.raw`\begin{itemize}[leftmargin=1.2em,nosep]`);
        for (const b of entry.bullets) {
          lines.push(String.raw`  \item ${esc(b)}`);
        }
        lines.push(String.raw`\end{itemize}`);
      }
      lines.push(String.raw`\vspace{4pt}`);
    }
    lines.push("");
  }

  // ── Projects ───────────────────────────────────────────────
  if (projects.length > 0) {
    lines.push(String.raw`\sectiontitle{Projects}`);
    for (const p of projects) {
      const tech = p.techStack.map(esc).join(", ");
      lines.push(
        String.raw`\textbf{${esc(p.name)}} \hfill \textit{${tech}} \\`,
      );
      lines.push(esc(p.description));
      lines.push(String.raw`\vspace{4pt}`);
    }
    lines.push("");
  }

  // ── Education ──────────────────────────────────────────────
  if (education.length > 0) {
    lines.push(String.raw`\sectiontitle{Education}`);
    for (const e of education) {
      lines.push(
        String.raw`\textbf{${esc(e.degree)}} \hfill ${esc(e.startDate)} -- ${esc(e.endDate)} \\`,
      );
      lines.push(
        String.raw`\textit{${esc(e.institution)}, ${esc(e.location)}}`,
      );
      if (e.gpa) {
        lines.push(String.raw` \\ GPA: ${esc(e.gpa)}`);
      }
      if (e.coursework && e.coursework.length > 0) {
        lines.push(
          String.raw` \\ \textit{Coursework:} ${e.coursework.map(esc).join(", ")}`,
        );
      }
      lines.push(String.raw`\vspace{4pt}`);
    }
    lines.push("");
  }

  // ── Certifications ─────────────────────────────────────────
  if (certifications.length > 0) {
    lines.push(String.raw`\sectiontitle{Certifications}`);
    for (const c of certifications) {
      lines.push(
        String.raw`\textbf{${esc(c.name)}} -- ${esc(c.issuer)} \hfill ${esc(c.date)} \\`,
      );
    }
    lines.push("");
  }

  // ── Achievements ───────────────────────────────────────────
  if (achievements.length > 0) {
    lines.push(String.raw`\sectiontitle{Achievements}`);
    lines.push(String.raw`\begin{itemize}[leftmargin=1.2em,nosep]`);
    for (const a of achievements) {
      lines.push(
        String.raw`  \item \textbf{${esc(a.title)}} -- ${esc(a.description)}`,
      );
    }
    lines.push(String.raw`\end{itemize}`);
    lines.push("");
  }

  lines.push(String.raw`\end{document}`);

  return lines.join("\n");
}
