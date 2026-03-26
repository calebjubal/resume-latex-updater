import { jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// ── Users ────────────────────────────────────────────────────────────
// Linked to Clerk via clerkId. Synced on first sign-in / webhook.
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// ── Resumes ──────────────────────────────────────────────────────────
// One resume per user. Stores the full ResumeData JSON so every
// section (contact, summary, skills, experience, …) is in one row.
export const resumesTable = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  data: jsonb("data").notNull(), // stores ResumeData JSON
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// ── LaTeX Snapshots ──────────────────────────────────────────────────
// Every time the user saves / updates their resume through the UI,
// a new row is inserted here with the generated LaTeX source.
// This gives a full history of LaTeX versions.
export const latexSnapshotsTable = pgTable("latex_snapshots", {
  id: serial("id").primaryKey(),
  resumeId: serial("resume_id")
    .notNull()
    .references(() => resumesTable.id, { onDelete: "cascade" }),
  latexSource: text("latex_source").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ── Type helpers ─────────────────────────────────────────────────────
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertResume = typeof resumesTable.$inferInsert;
export type SelectResume = typeof resumesTable.$inferSelect;

export type InsertLatexSnapshot = typeof latexSnapshotsTable.$inferInsert;
export type SelectLatexSnapshot = typeof latexSnapshotsTable.$inferSelect;