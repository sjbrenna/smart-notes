"use client";
import { updateNoteTitleAction } from "@/app/actions/notes";
import { useNoteList } from "@/app/providers/NoteListProvider";
import useDebounce from "@/hooks/useDebouncedFunction";
import { debounceTimeout } from "@/lib/constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  noteId: string;
  initialTitle: string;
};

function NoteTitle({ noteId, initialTitle }: Props) {
  const [title, setTitle] = useState(initialTitle);
  const debouncedTitle = useDebounce(title, debounceTimeout);
  const { setNotes } = useNoteList();

  //update title in sidebar
  useEffect(() => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, title: title } : note,
      ),
    );
  }, [title, setNotes, noteId]);

  useEffect(() => {
    updateNoteTitleAction(noteId, debouncedTitle);
  }, [debouncedTitle, noteId]);

  return (
    <input
      className="w-full font-bold"
      placeholder="Enter a title..."
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}

export default NoteTitle;
