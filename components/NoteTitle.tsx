"use client";
import { updateNoteTitleAction } from "@/app/actions/notes";
import { useNoteList } from "@/app/providers/NoteListProvider";
import useDebounce from "@/hooks/useDebouncedFunction";
import { debounceTimeout } from "@/lib/constants";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  noteId: string;
  initialTitle: string;
};

function NoteTitle({ noteId, initialTitle }: Props) {
  const [title, setTitle] = useState(initialTitle);
  const noteIdParam = useSearchParams().get("noteId") || "";
  const debouncedTitle = useDebounce(title, debounceTimeout);
  const { noteList, setNotes } = useNoteList();

  useEffect(() => {
    if (noteIdParam === noteId) {
      setTitle(initialTitle);
    }
  }, [noteIdParam, noteId, setTitle, initialTitle]);

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
    console.log("tried calling update note title");
  }, [debouncedTitle]);

  return (
    <input
      className="font-bold"
      placeholder="Enter a title..."
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}

export default NoteTitle;
