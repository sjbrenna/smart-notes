import { Note } from "@/app/schema-types";

function NotePreview({ note }: { note: Note }) {
  return <div id={note.id + ": " + note.title}></div>;
}

export default NotePreview;
