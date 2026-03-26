import { db } from "../db";
import { usersTable, resumesTable, latexSnapshotsTable } from "../schema";
import type { InsertUser, InsertResume, InsertLatexSnapshot } from "../schema";

/** Upsert a Clerk user — insert if new, update name/email if existing. */
export async function upsertUser(data: InsertUser) {
  const [user] = await db
    .insert(usersTable)
    .values(data)
    .onConflictDoUpdate({
      target: usersTable.clerkId,
      set: { email: data.email, name: data.name },
    })
    .returning();
  return user;
}

/** Create a new resume for a user. */
export async function createResume(data: InsertResume) {
  const [resume] = await db.insert(resumesTable).values(data).returning();
  return resume;
}

/** Insert a LaTeX snapshot for a resume. */
export async function createLatexSnapshot(data: InsertLatexSnapshot) {
  const [snapshot] = await db
    .insert(latexSnapshotsTable)
    .values(data)
    .returning();
  return snapshot;
}