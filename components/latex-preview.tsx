"use client";

import { useResume } from "@/lib/resume-context";
import { generateLatex } from "@/lib/latex-template";
import { useState } from "react";
import type { ResumeData } from "@/lib/default-resume";

function ResumeDocument({ data }: { data: ResumeData }) {
  const { contact, summary, skills, experience, projects, education, certifications, achievements } = data;

  return (
    <div className="resume-document font-serif text-[11pt] leading-[1.4] text-black">
      {/* Contact Header */}
      <div className="mb-1 text-center">
        <h1 className="text-[20pt] font-bold leading-tight">{contact.name}</h1>
        <p className="text-[13pt]">{contact.title}</p>
        <p className="mt-1 text-[9pt] text-gray-700">
          {[
            contact.email,
            contact.phone,
            contact.location,
            contact.linkedin,
            contact.github,
            contact.website,
          ]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </div>
      <hr className="my-2 border-t border-black" />

      {/* Summary */}
      {summary.text && (
        <section className="mb-3">
          <h2 className="mb-1 border-b border-gray-400 text-[13pt] font-bold">
            Summary
          </h2>
          <p className="text-[10pt]">{summary.text}</p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-3">
          <h2 className="mb-1 border-b border-gray-400 text-[13pt] font-bold">
            Skills
          </h2>
          {skills.map((cat) => (
            <p key={cat.category} className="text-[10pt]">
              <strong>{cat.category}:</strong> {cat.items.join(", ")}
            </p>
          ))}
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-3">
          <h2 className="mb-1 border-b border-gray-400 text-[13pt] font-bold">
            Experience
          </h2>
          {experience.map((entry, i) => (
            <div key={i} className="mb-2">
              <div className="flex items-baseline justify-between">
                <strong className="text-[10.5pt]">{entry.role}</strong>
                <span className="text-[9pt] italic">
                  {entry.startDate} — {entry.endDate}
                </span>
              </div>
              <p className="text-[10pt] italic text-gray-800">
                {entry.company}, {entry.location}
              </p>
              {entry.bullets.filter((b) => b.trim()).length > 0 && (
                <ul className="ml-5 mt-0.5 list-disc">
                  {entry.bullets
                    .filter((b) => b.trim())
                    .map((b, j) => (
                      <li key={j} className="text-[9.5pt] leading-snug">
                        {b}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-3">
          <h2 className="mb-1 border-b border-gray-400 text-[13pt] font-bold">
            Projects
          </h2>
          {projects.map((p, i) => (
            <div key={i} className="mb-1.5">
              <p className="text-[10.5pt]">
                <strong>{p.name}</strong>{" "}
                <span className="italic text-gray-700">
                  ({p.techStack.join(", ")})
                </span>
              </p>
              <p className="text-[9.5pt]">{p.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-3">
          <h2 className="mb-1 border-b border-gray-400 text-[13pt] font-bold">
            Education
          </h2>
          {education.map((e, i) => (
            <div key={i} className="mb-1">
              <div className="flex items-baseline justify-between">
                <strong className="text-[10.5pt]">{e.degree}</strong>
                <span className="text-[9pt] italic">
                  {e.startDate} — {e.endDate}
                </span>
              </div>
              <p className="text-[10pt] italic text-gray-800">
                {e.institution}, {e.location}
              </p>
              {e.gpa && (
                <p className="text-[9.5pt]">GPA: {e.gpa}</p>
              )}
              {e.coursework && e.coursework.length > 0 && (
                <p className="text-[9.5pt]">
                  <em>Coursework:</em> {e.coursework.join(", ")}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-3">
          <h2 className="mb-1 border-b border-gray-400 text-[13pt] font-bold">
            Certifications
          </h2>
          {certifications.map((c, i) => (
            <p key={i} className="text-[10pt]">
              <strong>{c.name}</strong> — {c.issuer} ({c.date})
            </p>
          ))}
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-3">
          <h2 className="mb-1 border-b border-gray-400 text-[13pt] font-bold">
            Achievements
          </h2>
          <ul className="ml-5 list-disc">
            {achievements.map((a, i) => (
              <li key={i} className="text-[9.5pt] leading-snug">
                <strong>{a.title}</strong> — {a.description}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default function LatexPreview() {
  const { data } = useResume();
  const [showSource, setShowSource] = useState(false);
  const latexSource = generateLatex(data);

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
        <h2 className="font-heading text-sm font-semibold tracking-tight">
          Preview
        </h2>
        <button
          type="button"
          onClick={() => setShowSource(!showSource)}
          className="rounded-md border border-border/60 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {showSource ? "Preview" : "LaTeX Source"}
        </button>
      </div>

      {/* Content */}
      {showSource ? (
        <div className="flex-1 overflow-auto p-4">
          <pre className="whitespace-pre-wrap rounded-lg border border-border/60 bg-muted/30 p-4 font-mono text-xs leading-relaxed text-foreground">
            {latexSource}
          </pre>
        </div>
      ) : (
        <div className="flex-1 overflow-auto bg-gray-100 p-6">
          <div
            className="mx-auto rounded border border-gray-300 bg-white shadow-md"
            style={{
              width: "210mm",
              minHeight: "297mm",
              padding: "20mm 18mm",
            }}
          >
            <ResumeDocument data={data} />
          </div>
        </div>
      )}
    </div>
  );
}
