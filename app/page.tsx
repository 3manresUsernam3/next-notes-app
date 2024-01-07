'use client';

import AddNote from "./components/AddNote";
import NoteList from "./components/NoteList";
import { useEffect, useState } from "react";
import Note from '../types/notes';


export default function Home() {

  const [notes, setNotes] = useState<Note[]>([]);
  const [deleteDeviceDialog, setDeleteDeviceDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notes')
      .then((response) => response.json())
      .then((data) => {
        setNotes(data)
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ?
        (<div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
          <h2 className="text-center">Loading your website :3</h2>
          <span className="loading loading-spinner loading-lg"></span>
        </div>) : (<main className="max-w-4xl mx-auto mt-4">
          <div className="text-center my-5 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Simple Todo List App</h1>
            <h2 className="text-1xl font-bold">Made by Clara &#60;3</h2>
            <AddNote notes={notes} setNotes={setNotes} />
          </div>
          <div>
            <NoteList notes={notes} setNotes={setNotes} />
          </div>
        </main>)}
    </div>
  )
}
