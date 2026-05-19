import { Note } from "@prisma/client";
import { Link } from "lucide-react";

function NotePreview({ note }: { note: Note }) {
  return <div id={note.id + ": " + note.title}></div>;
}

export default NotePreview;
