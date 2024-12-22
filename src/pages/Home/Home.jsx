import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/Cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import { useState } from "react";

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <NoteCard
          title="Meeting on 7th April"
          date="3rd April"
          content="Meeting on 7th April Meeting on 7th April"
          tags="#Meeting"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        ></NoteCard>
      </div>
      <button
        className="w-16 h-16 btn flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <MdAdd className="text-[32px] text-white"></MdAdd>
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          ></AddEditNotes>
        </div>
      </dialog>
    </>
  );
};

export default Home;
