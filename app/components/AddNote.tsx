import { MdNoteAdd } from "react-icons/md";
import Modal from "./Modal";
import { FormEventHandler, useEffect, useState } from "react";
import { handleClientScriptLoad } from "next/script";
import INote from "@/types/notes";

interface AddNoteProps {
  notes: INote[],
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}

const AddNote: React.FC<AddNoteProps> = ({ notes, setNotes }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newNoteTitle, setNewNoteTitle] = useState<string>(""); 
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [closedWithCross, setClosedWithCross] = useState<boolean>(false);
  const [newNoteDescription, setNewNoteDescription] = useState<string>(""); 

  useEffect(() => {
    setClosedWithCross(false);
    console.log(closedWithCross);
  }, [closedWithCross]);

  const handleSubmitNewNote: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    saveNote(notes);
  }

  const saveNote = (notesArray: INote[]) => {
    setModalLoading(true)

    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newNoteTitle, content: newNoteDescription }),
    })
      .then((response) => response.json())
      .then((createdNote) => {
        setNotes([...notesArray, createdNote]);
        fetch('/api/notes')
          .then((response) => response.json())
          .then((data) => {
            setNotes(data);
            setModalLoading(false);
          });
          setNewNoteTitle("");
          setNewNoteDescription("");
          setModalOpen(false);
      });
  };


  return (
    <div>
      <button onClick={() => { setModalOpen(true) }}
        className="btn btn-primary w-2/6">
        Create note
        <MdNoteAdd className="ml-0.5" size={25} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} modalLoading={modalLoading} setClosedWithCross={setClosedWithCross}>
        <form onSubmit={handleSubmitNewNote}>
          <h3 className="font-bold text-lg">Add new Note</h3>
          <div className="modal-action">
            <div className="flex flex-wrap cursor-auto">
              <input type="text" value={newNoteTitle} onChange={e => setNewNoteTitle(e.target.value)} placeholder="Title" className="mb-4 input input-bordered w-full text-zinc-50" />
              <input type="text" value={newNoteDescription} onChange={e => setNewNoteDescription(e.target.value)} placeholder="Description" className="mb-4 input input-bordered w-full text-zinc-50" />
              <button onSubmit={e => handleSubmitNewNote} className="btn btn-outline btn-success">submit</button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AddNote;