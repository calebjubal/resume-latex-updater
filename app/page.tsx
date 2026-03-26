import Achievements from "@/components/achievements";
import Certifications from "@/components/certifications";
import Contact from "@/components/contact";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Summary from "@/components/summary";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <h1>Resume Latex Updater</h1>
        <br />
      </nav>

      <section>
        <Contact />
      </section>

      <section>
        <Summary />
      </section>

      <section>
        <Skills />
      </section>

      <section>
        <Experience />
      </section>

      <section>
        <Projects />
      </section>

      <section>
        <Education />
      </section>

      <section>
        <Certifications />
      </section>

      <section>
        <Achievements />
      </section>

      <br />
      <footer>
        <h1>Resume Latex Updater</h1>
      </footer>
    </div>
  );
}
