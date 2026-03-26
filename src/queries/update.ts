import { eq } from "drizzle-orm";
import { db } from "../db";
import { resumesTable, type SelectResume } from "../schema";
import type { ResumeData } from "@/lib/default-resume";

/** Update resume data (the JSONB column). */
export async function updateResumeData(
  resumeId: SelectResume["id"],
  data: ResumeData,
) {
  const [updated] = await db
    .update(resumesTable)
    .set({ data })
    .where(eq(resumesTable.id, resumeId))
    .returning();
  return updated;
}
