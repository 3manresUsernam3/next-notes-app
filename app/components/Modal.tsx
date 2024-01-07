interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
  modalLoading: boolean;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children, modalLoading }) => {
  return (
    <dialog id="my_modal_3" className={`modal ${modalOpen ? "modal-open" : ""}`}>
      {modalLoading ? (<div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
        <div className="modal-box">
          <h2 className="text-center">Processing your request</h2>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>) : (
        <div className="modal-box">
          <form method="dialog">
            <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {children}
        </div>
      )}
    </dialog>
  );
}

export default Modal;