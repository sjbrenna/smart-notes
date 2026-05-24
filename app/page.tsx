import NoteTitle from "@/components/NoteTitle";
import NewNoteButton from "@/components/ui/NewNoteButton";
import NoteTextInput from "@/components/ui/NoteTextInput";
import { getUser } from "@/lib/supabase/server";
import { prisma } from "@/prisma/prisma";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function HomePage({ searchParams }: Props) {
  const noteIdParam = (await searchParams).noteId;

  const user = await getUser();

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || "";

  const note = await prisma.note.findUnique({
    where: { id: noteId, authorId: user?.id },
  });

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-between gap-2">
        <NoteTitle noteId={noteId} initialTitle={note?.title || ""} />
        <NewNoteButton user={user} />
      </div>
      <NoteTextInput noteId={noteId} startingNoteText={note?.content || ""} />
    </div>
  );
}

export default HomePage;
