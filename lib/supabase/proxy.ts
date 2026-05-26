import { prisma } from "@/prisma/prisma";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Ensure session is loaded early
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname, searchParams } = new URL(request.url);

  // -------------------------
  // Auth route redirect
  // -------------------------
  const isAuthRoute = pathname === "/login" || pathname === "/sign-up";

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // -------------------------
  // Protect note access
  // -------------------------
  const urlNoteId = searchParams.get("noteId");

  if (urlNoteId) {
    if (!user) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const note = await prisma.note.findFirst({
      where: {
        id: urlNoteId,
        authorId: user.id,
      },
    });

    if (!note) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // -------------------------
  // Auto-redirect to newest note
  // -------------------------
  if (!urlNoteId && pathname === "/" && user) {
    const newestNote = await prisma.note.findFirst({
      where: {
        authorId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
      },
    });

    const newestNoteId = newestNote?.id;

    if (newestNoteId) {
      const url = request.nextUrl.clone();
      url.searchParams.set("noteId", newestNoteId);
      return NextResponse.redirect(url);
    }
  }

  return response;
}
