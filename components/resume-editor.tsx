"use client";

import { useState } from "react";
import { useResume } from "@/lib/resume-context";
import Contact from "./contact";
import Summary from "./summary";
import Skills from "./skills";
import Experience from "./experience";
import Projects from "./projects";
import Education from "./education";
import Certifications from "./certifications";
import Achievements from "./achievements";

const tabs = [
  { id: "contact", label: "Contact", icon: "👤" },
  { id: "summary", label: "Summary", icon: "📝" },
  { id: "skills", label: "Skills", icon: "🛠" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "certifications", label: "Certs", icon: "📜" },
  { id: "achievements", label: "Awards", icon: "🏆" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ResumeEditor() {
  const [activeTab, setActiveTab] = useState<TabId>("contact");
  const resume = useResume();

  const renderActiveForm = () => {
    switch (activeTab) {
      case "contact":
        return (
          <Contact
            data={resume.data.contact}
            onChange={resume.updateContact}
          />
        );
      case "summary":
        return (
          <Summary
            data={resume.data.summary}
            onChange={resume.updateSummary}
          />
        );
      case "skills":
        return (
          <Skills data={resume.data.skills} onChange={resume.updateSkills} />
        );
      case "experience":
        return (
          <Experience
            data={resume.data.experience}
            onChange={resume.updateExperience}
          />
        );
      case "projects":
        return (
          <Projects
            data={resume.data.projects}
            onChange={resume.updateProjects}
          />
        );
      case "education":
        return (
          <Education
            data={resume.data.education}
            onChange={resume.updateEducation}
          />
        );
      case "certifications":
        return (
          <Certifications
            data={resume.data.certifications}
            onChange={resume.updateCertifications}
          />
        );
      case "achievements":
        return (
          <Achievements
            data={resume.data.achievements}
            onChange={resume.updateAchievements}
          />
        );
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto border-b border-border/60 px-3 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active form */}
      <div className="flex-1 overflow-y-auto p-4">{renderActiveForm()}</div>
    </div>
  );
}
