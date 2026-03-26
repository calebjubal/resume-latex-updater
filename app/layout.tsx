import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Raleway } from "next/font/google";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "./globals.css";

const notoSansHeading = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume LaTeX Updater",
  description: "A protected workspace for updating and exporting your resume.",
};

const clerkAppearance = {
  variables: {
    colorPrimary: "var(--primary)",
    colorText: "var(--foreground)",
    colorTextSecondary: "var(--muted-foreground)",
    colorBackground: "var(--card)",
    colorInputBackground: "var(--background)",
    colorInputText: "var(--foreground)",
    colorDanger: "var(--destructive)",
    borderRadius: "var(--radius)",
    fontFamily: "var(--font-sans)",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none",
    card: "rounded-3xl border border-border bg-card text-card-foreground shadow-xl",
    pageScrollBox: "p-0",
    headerTitle: "font-heading text-3xl tracking-tight text-foreground",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButton: cn(
      buttonVariants({ size: "lg", variant: "outline" }),
      "h-11 w-full justify-center",
    ),
    socialButtonsBlockButtonText: "font-medium text-foreground",
    dividerLine: "bg-border",
    dividerText: "text-muted-foreground",
    formFieldLabel: "text-sm font-medium text-foreground",
    formFieldInput:
      "h-11 rounded-lg border border-input bg-background text-foreground shadow-sm",
    formFieldInputShowPasswordButton:
      "text-muted-foreground hover:text-foreground",
    formFieldAction: "text-primary hover:text-primary/80",
    formButtonPrimary: cn(
      buttonVariants({ size: "lg" }),
      "h-11 w-full justify-center shadow-none",
    ),
    footerActionLink: "font-medium text-primary hover:text-primary/80",
    formResendCodeLink: "text-primary hover:text-primary/80",
    identityPreviewText: "text-foreground",
    identityPreviewEditButton: "text-primary hover:text-primary/80",
    otpCodeFieldInput:
      "h-11 rounded-lg border border-input bg-background text-foreground",
    alert: "rounded-xl border border-border bg-background text-foreground",
    formFieldWarningText: "text-destructive",
    formFieldSuccessText: "text-primary",
    footer: "bg-transparent",
    navbar: "hidden",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        raleway.variable,
        notoSansHeading.variable,
      )}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <ClerkProvider appearance={clerkAppearance}>{children}</ClerkProvider>
      </body>
    </html>
  );
}
