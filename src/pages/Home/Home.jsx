import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/Cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import { useState } from "react";
import ReactModal from "react-modal";

const Home = () => {

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
      <button className="w-16 h-16 btn flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {
        setOpenAddEditModal({ isShown: true, type: "add", data: null });
      }}>
        <MdAdd className="text-[32px] text-white"></MdAdd>
      </button>
      <ReactModal 
      isOpen={openAddEditModal.isShown}
      onRequestClose={() => {}}
      style={{
        overlay: {
            backgroundColor: "rgba(0,0,0,2)",
        },
      }}
      contentLabel=""
      className="w-[40px] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
      <AddEditNotes></AddEditNotes>
      </ReactModal>
    </>
  );
};

export default Home;
