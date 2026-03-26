import Achievements from "@/components/achievements";
import Certifications from "@/components/certifications";
import Contact from "@/components/contact";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Summary from "@/components/summary";

const sections = [
  {
    title: "Contact",
    description: "Keep your personal details and links current.",
    content: <Contact />,
  },
  {
    title: "Summary",
    description: "Refine the headline and story behind your profile.",
    content: <Summary />,
  },
  {
    title: "Skills",
    description:
      "Highlight the tools and strengths you want recruiters to notice.",
    content: <Skills />,
  },
  {
    title: "Experience",
    description: "Tune your impact statements and responsibilities.",
    content: <Experience />,
  },
  {
    title: "Projects",
    description: "Showcase the work that best supports your next role.",
    content: <Projects />,
  },
  {
    title: "Education",
    description: "Keep coursework, degrees, and credentials organized.",
    content: <Education />,
  },
  {
    title: "Certifications",
    description: "Track certifications & continuing education in one place.",
    content: <Certifications />,
  },
  {
    title: "Achievements",
    description: "Capture awards, wins, and meaningful milestones.",
    content: <Achievements />,
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
          Protected workspace
        </p>
        <div className="mt-3 space-y-3">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Build and refine your resume from one place.
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Update each section below, keep your resume content organized, and
            prepare your LaTeX export from a single authenticated dashboard.
          </p>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-semibold tracking-tight">
                {section.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {section.description}
              </p>
            </div>
            <div className="mt-4 text-sm text-foreground">
              {section.content}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
