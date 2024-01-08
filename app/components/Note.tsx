import INote from "@/types/notes";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FormEventHandler, useEffect, useState } from "react";
import Modal from "./Modal";

interface NoteProps {
  note: INote
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}

const Note: React.FC<NoteProps> = ({ note, setNotes }) => {
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [closedWithCross, setClosedWithCross] = useState<boolean>(false);
  const [noteTitleToEdit, setNoteTitleToEdit] = useState<string>(note.title);
  const [prevNoteTitleToEdit, setPrevNoteTitleToEdit] = useState<string>(note.title);
  const [noteDescriptionToEdit, setNoteDescriptionToEdit] = useState<string | null>(note.content);
  const [prevNoteDescriptionToEdit, setPrevNoteDescriptionToEdit] = useState<string | null>(note.content);

  useEffect(() => {
    setNoteTitleToEdit(prevNoteTitleToEdit);
    setNoteDescriptionToEdit(prevNoteDescriptionToEdit);
    setClosedWithCross(false);
    console.log(closedWithCross);
  }, [closedWithCross]);

  const handleSubmitEditNote: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    editNote(note.id);
  }

  const handleSubmitDeleteNote: FormEventHandler<HTMLFormElement> = (e) => {
    setNoteTitleToEdit("");
    setNoteDescriptionToEdit("");
    e.preventDefault();
    deleteNote(note.id);
  }

  const editNote = (noteId: number) => {
    setModalLoading(true)

    fetch('/api/notes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: noteId, title: noteTitleToEdit, content: noteDescriptionToEdit }),
    })
      .then((response) => response.json())
      .then((updateNote) => {
        console.log(updateNote)
        fetch('/api/notes')
          .then((response) => response.json())
          .then((data) => {
            setNotes(data);
            setModalLoading(false);
          });
        setPrevNoteTitleToEdit(noteTitleToEdit);
        setPrevNoteDescriptionToEdit(noteDescriptionToEdit);
        setOpenModalEdit(false);
      });
  };

  const deleteNote = (noteId: number) => {
    setModalLoading(true)

    fetch('/api/notes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: noteId }),
    })
      .then((response) => response.json())
      .then((updateNote) => {
        console.log(updateNote)
        fetch('/api/notes')
          .then((response) => response.json())
          .then((data) => {
            setNotes(data);
            setModalLoading(false);
          });
        setOpenModalEdit(false);
      });
  };

  return (
    <tr key={note.id}>
      <td></td>
      <td className="text-lg">{note.title}</td>
      <td className="text-lg">{note.content}</td>
      <td className="flex gap-5 justify-end">
        <MdEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25} />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} modalLoading={modalLoading} setClosedWithCross={setClosedWithCross}>
          <form onSubmit={handleSubmitEditNote}>
            <h3 className="font-bold text-lg">Edit Note</h3>
            <div className="modal-action">
              <div className="flex flex-wrap cursor-auto">
                <input type="text" value={noteTitleToEdit} onChange={e => setNoteTitleToEdit(e.target.value)} placeholder="Title" className="mb-4 input input-bordered w-full text-zinc-50" />
                <input type="text" value={noteDescriptionToEdit ?? ''} onChange={e => setNoteDescriptionToEdit(e.target.value)} placeholder="Description" className="mb-4 input input-bordered w-full text-zinc-50" />
                <button onSubmit={e => handleSubmitEditNote} className="btn btn-outline btn-success">submit</button>
              </div>
            </div>
          </form>
        </Modal>
        <FaTrashAlt onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={25} />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} modalLoading={modalLoading} setClosedWithCross={setClosedWithCross}>
          <form onSubmit={handleSubmitDeleteNote}>
            <h3 className="font-bold text-lg mb-4">Delete Note</h3>
            <button onSubmit={e => handleSubmitDeleteNote} className="btn btn-outline bg-red-800 text-gray-50">Are you sure you want to delete this Note?</button>
          </form>
        </Modal>
      </td>
    </tr>
  );
}

export default Note;