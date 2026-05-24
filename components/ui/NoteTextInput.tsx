"use client";

import { useSearchParams } from "next/navigation";
import { Textarea } from "./textarea";
import { ChangeEvent, useEffect } from "react";
import { debounceTimeout } from "@/lib/constants";
import useNote from "@/hooks/useNote";
import { updateNoteAction } from "@/app/actions/notes";
import useDebounce from "@/hooks/useDebouncedFunction";

type Props = {
  noteId: string;
  startingNoteText: string;
};

let updateTimeout: NodeJS.Timeout;

function NoteTextInput({ noteId, startingNoteText }: Props) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  const { noteText, setNoteText } = useNote();

  const debouncedNoteText = useDebounce(noteText, debounceTimeout);

  useEffect(() => {
    if (noteIdParam === noteId) {
      setNoteText(startingNoteText);
    }
  }, [noteIdParam, noteId, setNoteText, startingNoteText]);

  useEffect(() => {
    updateNoteAction(noteId, debouncedNoteText);
    console.log("performed update");
  }, [debouncedNoteText]);

  return (
    <Textarea
      value={noteText}
      onChange={(e) => setNoteText(e.target.value)}
      placeholder="Type your note here.."
      className="placeholder:text-muted-foreground mb-4 h-full max-w-4xl resize-none border p-4 focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  );
}

export default NoteTextInput;
