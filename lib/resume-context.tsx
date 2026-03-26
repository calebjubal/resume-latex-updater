"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_RESUME,
  type AchievementEntry,
  type CertificationEntry,
  type ContactInfo,
  type EducationEntry,
  type ExperienceEntry,
  type ProjectEntry,
  type ResumeData,
  type SkillCategory,
  type SummaryInfo,
} from "./default-resume";

interface ResumeContextValue {
  data: ResumeData;
  updateContact: (contact: ContactInfo) => void;
  updateSummary: (summary: SummaryInfo) => void;
  updateSkills: (skills: SkillCategory[]) => void;
  updateExperience: (experience: ExperienceEntry[]) => void;
  updateProjects: (projects: ProjectEntry[]) => void;
  updateEducation: (education: EducationEntry[]) => void;
  updateCertifications: (certifications: CertificationEntry[]) => void;
  updateAchievements: (achievements: AchievementEntry[]) => void;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(DEFAULT_RESUME);

  const updateContact = useCallback(
    (contact: ContactInfo) => setData((prev) => ({ ...prev, contact })),
    [],
  );
  const updateSummary = useCallback(
    (summary: SummaryInfo) => setData((prev) => ({ ...prev, summary })),
    [],
  );
  const updateSkills = useCallback(
    (skills: SkillCategory[]) => setData((prev) => ({ ...prev, skills })),
    [],
  );
  const updateExperience = useCallback(
    (experience: ExperienceEntry[]) =>
      setData((prev) => ({ ...prev, experience })),
    [],
  );
  const updateProjects = useCallback(
    (projects: ProjectEntry[]) => setData((prev) => ({ ...prev, projects })),
    [],
  );
  const updateEducation = useCallback(
    (education: EducationEntry[]) =>
      setData((prev) => ({ ...prev, education })),
    [],
  );
  const updateCertifications = useCallback(
    (certifications: CertificationEntry[]) =>
      setData((prev) => ({ ...prev, certifications })),
    [],
  );
  const updateAchievements = useCallback(
    (achievements: AchievementEntry[]) =>
      setData((prev) => ({ ...prev, achievements })),
    [],
  );

  return (
    <ResumeContext.Provider
      value={{
        data,
        updateContact,
        updateSummary,
        updateSkills,
        updateExperience,
        updateProjects,
        updateEducation,
        updateCertifications,
        updateAchievements,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within <ResumeProvider>");
  return ctx;
}
