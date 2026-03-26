import { eq } from "drizzle-orm";
import { db } from "../db";
import {
  usersTable,
  resumesTable,
  latexSnapshotsTable,
  type SelectUser,
  type SelectResume,
} from "../schema";

/** Delete a user and all associated data (cascades to resumes + snapshots). */
export async function deleteUser(userId: SelectUser["id"]) {
  await db.delete(usersTable).where(eq(usersTable.id, userId));
}

/** Delete a specific resume (cascades to its LaTeX snapshots). */
export async function deleteResume(resumeId: SelectResume["id"]) {
  await db.delete(resumesTable).where(eq(resumesTable.id, resumeId));
}