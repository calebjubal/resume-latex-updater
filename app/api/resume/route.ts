import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { upsertUser, createResume } from "@/src/queries/insert";
import { getResumeByClerkId, getUserByClerkId } from "@/src/queries/select";
import { DEFAULT_RESUME } from "@/lib/default-resume";

/**
 * GET /api/resume
 * Syncs the Clerk user to Neon (upsert), then returns their resume.
 * If no resume exists yet, creates one with DEFAULT_RESUME.
 */
export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Sync Clerk user → Neon
  const clerkUser = await currentUser();
  const user = await upsertUser({
    clerkId,
    email: clerkUser?.emailAddresses[0]?.emailAddress ?? "",
    name: `${clerkUser?.firstName ?? ""} ${clerkUser?.lastName ?? ""}`.trim() || null,
  });

  // Fetch or create resume
  let resume = await getResumeByClerkId(clerkId);
  if (!resume) {
    resume = await createResume({
      userId: user.id,
      data: DEFAULT_RESUME,
    });
  }

  return NextResponse.json({ resume });
}
