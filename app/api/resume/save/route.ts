import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getResumeByClerkId } from "@/src/queries/select";
import { updateResumeData } from "@/src/queries/update";
import { createLatexSnapshot } from "@/src/queries/insert";
import { generateLatex } from "@/lib/latex-template";
import type { ResumeData } from "@/lib/default-resume";

/**
 * PUT /api/resume/save
 * Saves the resume data and creates a LaTeX snapshot.
 * Body: { data: ResumeData }
 */
export async function PUT(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const resumeData = body.data as ResumeData;

  if (!resumeData) {
    return NextResponse.json({ error: "Missing resume data" }, { status: 400 });
  }

  // Get existing resume
  const resume = await getResumeByClerkId(clerkId);
  if (!resume) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  // Update resume data
  const updated = await updateResumeData(resume.id, resumeData);

  // Create a LaTeX snapshot
  const latexSource = generateLatex(resumeData);
  await createLatexSnapshot({
    resumeId: resume.id,
    latexSource,
  });

  return NextResponse.json({ resume: updated });
}
