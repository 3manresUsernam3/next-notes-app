import INote from "@/types/notes";
import Note from "./Note"

interface NoteListProps {
  notes: INote[]
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}

const NoteList: React.FC<NoteListProps> = ({ notes, setNotes }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>title</th>
            <th>content</th>
            <th className="flex justify-end" >Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes
            .sort((a, b) => a.id - b.id)
            .map(note => (
              <Note key={note.id} note={note} setNotes={setNotes} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default NoteList;