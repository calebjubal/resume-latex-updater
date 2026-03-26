"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
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
  loading: boolean;
  saving: boolean;
  lastSaved: Date | null;
  updateContact: (contact: ContactInfo) => void;
  updateSummary: (summary: SummaryInfo) => void;
  updateSkills: (skills: SkillCategory[]) => void;
  updateExperience: (experience: ExperienceEntry[]) => void;
  updateProjects: (projects: ProjectEntry[]) => void;
  updateEducation: (education: EducationEntry[]) => void;
  updateCertifications: (certifications: CertificationEntry[]) => void;
  updateAchievements: (achievements: AchievementEntry[]) => void;
  saveResume: () => Promise<void>;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(DEFAULT_RESUME);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const dataRef = useRef(data);
  dataRef.current = data;

  // Load resume from API on mount (syncs Clerk user + fetches resume)
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/resume");
        if (res.ok) {
          const json = await res.json();
          if (json.resume?.data) {
            setData(json.resume.data as ResumeData);
          }
        }
      } catch {
        // Silently fall back to DEFAULT_RESUME
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Save resume to API
  const saveResume = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/resume/save", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: dataRef.current }),
      });
      if (res.ok) {
        setLastSaved(new Date());
      }
    } catch {
      // Handle silently — could add error state later
    } finally {
      setSaving(false);
    }
  }, []);

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
        loading,
        saving,
        lastSaved,
        updateContact,
        updateSummary,
        updateSkills,
        updateExperience,
        updateProjects,
        updateEducation,
        updateCertifications,
        updateAchievements,
        saveResume,
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
