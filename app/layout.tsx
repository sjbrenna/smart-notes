import type { Metadata } from "next";
import "./styles/globals.css";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import NoteProvider from "./providers/NoteProvider";
import NoteListProvider from "./providers/NoteListProvider";
import { getUser } from "@/lib/supabase/server";
import { prisma } from "@/prisma/prisma";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Smart Notes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  const notes = user
    ? await prisma.note.findMany({
        where: {
          authorId: user.id,
        },
        orderBy: {
          updatedAt: "desc",
        },
      })
    : [];

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", figtree.variable)}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NoteListProvider initialNotes={notes}>
            <NoteProvider>
              <SidebarProvider>
                <AppSidebar />
                <div className="flex min-h-screen w-full flex-col">
                  <Header />
                  <main className="flex flex-1 flex-col px-4 pt-6 xl:px-8">
                    {children}
                  </main>
                </div>
              </SidebarProvider>

              <Toaster />
            </NoteProvider>
          </NoteListProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
