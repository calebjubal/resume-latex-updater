import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="min-w-0">
            <Link
              href="/"
              className="font-heading text-lg font-semibold tracking-tight text-foreground"
            >
              Resume LaTeX Updater
            </Link>
            <p className="hidden text-sm text-muted-foreground sm:block">
              Secure workspace for tailoring and exporting your resume.
            </p>
          </div>
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "size-10 rounded-full ring-2 ring-border ring-offset-2 ring-offset-background",
                  userButtonPopoverCard:
                    "rounded-2xl border border-border bg-popover text-popover-foreground shadow-xl",
                  userButtonPopoverActionButton:
                    "rounded-lg text-foreground hover:bg-muted",
                  userButtonPopoverActionButtonIcon: "text-muted-foreground",
                  userButtonPopoverFooter: "hidden",
                },
              }}
            />
          </Show>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        {children}
      </main>
    </div>
  );
}
