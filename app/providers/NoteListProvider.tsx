"use client";

import { Note } from "@prisma/client";
import { createContext, useContext, useState } from "react";

type NoteListProviderType = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

export const NoteListProviderContext = createContext<NoteListProviderType>({
  notes: [],
  setNotes: () => {},
});

function NoteListProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

  return (
    <NoteListProviderContext.Provider value={{ notes, setNotes }}>
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
