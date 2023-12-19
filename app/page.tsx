import AddNote from "./components/AddNote";
import NoteList from "./components/NoteList";
import { sql } from "@vercel/postgres";


export default function Home() {
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Simple Todo List App</h1>
        <h2 className="text-1xl font-bold">Made by Clara &#60;3</h2>
        <AddNote />
      </div>
      <NoteList />
    </main>
  )
}
