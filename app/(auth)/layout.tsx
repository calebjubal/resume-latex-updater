import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background px-4 py-10 sm:px-6">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden rounded-3xl border border-border/60 bg-card/80 p-8 shadow-xl backdrop-blur lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-4">
            <Link
              href="/"
              className="font-heading text-sm font-semibold uppercase tracking-[0.32em] text-primary"
            >
              Resume LaTeX Updater
            </Link>
            <div className="space-y-3">
              <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance text-foreground">
                Sign in to continue shaping your next resume.
              </h1>
              <p className="max-w-xl text-base text-muted-foreground">
                Your editor stays behind authentication so resume drafts,
                experience updates, and export prep stay in one secure
                workspace.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-border bg-background/80 p-5">
              <p className="text-sm font-medium text-foreground">
                One focused workspace
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Keep contact details, summary, experience, education, and
                achievements together.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background/80 p-5">
              <p className="text-sm font-medium text-foreground">
                Shared design tokens
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                The sign-in flow now inherits the same shadcn-based palette,
                spacing, and typography as the rest of the app.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-md">{children}</div>
        </section>
      </div>
    </main>
  );
}
