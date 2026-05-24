"use client";

import { Note } from "../schema-types";
import { createContext, useContext, useState } from "react";

type NoteListProviderType = {
  noteList: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

export const NoteListProviderContext = createContext<NoteListProviderType>({
  noteList: [],
  setNotes: () => {},
});

function NoteListProvider({
  children,
  initialNotes,
}: {
  children: React.ReactNode;
  initialNotes: Note[];
}) {
  const [noteList, setNotes] = useState<Note[]>(initialNotes);

  return (
    <NoteListProviderContext.Provider value={{ noteList, setNotes }}>
      {children}
    </NoteListProviderContext.Provider>
  );
}

export default NoteListProvider;

export function useNoteList() {
  const context = useContext(NoteListProviderContext);
  if (!context) {
    throw new Error("useNoteList must be used inside provider");
  }
  return context;
}
