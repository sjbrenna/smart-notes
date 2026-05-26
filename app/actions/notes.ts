"use server";

import { getUser } from "@/lib/supabase/server";
import { handleError } from "@/lib/utils";
import { prisma } from "@/prisma/prisma";

export const updateNoteAction = async (noteId: string, content: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to update a note");

    await prisma.note.update({
      where: { id: noteId },
      data: { content },
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
export async function createNoteAction(uuid: string) {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to create a note");
    const note = await prisma.note.create({
      data: {
        id: uuid,
        authorId: user.id,
        title: "",
        content: "",
      },
    });
    return note;
  } catch (err) {
    throw err;
  }
}

export const deleteNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to delete a note");

    await prisma.note.delete({
      where: { id: noteId, authorId: user.id },
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const updateNoteTitleAction = async (
  noteId: string,
  newTitle: string,
) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to edit a note's title");
    console.log("updated title to: " + newTitle);
    await prisma.note.update({
      where: {
        id: noteId,
        authorId: user.id,
      },
      data: {
        title: newTitle,
      },
    });
  } catch (error) {
    return handleError(error);
  }
};
