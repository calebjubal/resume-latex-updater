import { eq, desc } from "drizzle-orm";
import { db } from "../db";
import {
  usersTable,
  resumesTable,
  latexSnapshotsTable,
  type SelectUser,
} from "../schema";

/** Get a user by their Clerk ID. */
export async function getUserByClerkId(clerkId: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, clerkId));
  return user ?? null;
}

/** Get a user's resume (the most recent one). */
export async function getResumeByUserId(userId: SelectUser["id"]) {
  const [resume] = await db
    .select()
    .from(resumesTable)
    .where(eq(resumesTable.userId, userId))
    .orderBy(desc(resumesTable.updatedAt))
    .limit(1);
  return resume ?? null;
}

/** Get a user's resume by their Clerk ID (convenience). */
export async function getResumeByClerkId(clerkId: string) {
  const user = await getUserByClerkId(clerkId);
  if (!user) return null;
  return getResumeByUserId(user.id);
}

/** Get LaTeX snapshot history for a resume (newest first). */
export async function getLatexSnapshots(resumeId: number, limit = 20) {
  return db
    .select()
    .from(latexSnapshotsTable)
    .where(eq(latexSnapshotsTable.resumeId, resumeId))
    .orderBy(desc(latexSnapshotsTable.createdAt))
    .limit(limit);
}
