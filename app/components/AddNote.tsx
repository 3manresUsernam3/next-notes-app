import { MdNoteAdd } from "react-icons/md";

const AddNote = () => {
  return ( 
    <div>
      <button className="btn btn-primary w-2/6">Create note <MdNoteAdd className="ml-0.5" size={25} /></button>
    </div>
   );
}
 
export default AddNote;