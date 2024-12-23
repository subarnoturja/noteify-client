/* eslint-disable no-unused-vars */
import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/Cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [allNotes, setAllNotes] = useState([])

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  // Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if(response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    }
    catch (error){
      console.log("An unexpected error occurred.")
    }
  }

  useEffect(() => {
      getAllNotes();
      return() => {};
    }, [])

  const handleOpenModal = (type, noteDetails = null) => {
    setOpenAddEditModal({
      isShown: true,
      type,
      data: noteDetails,
    })
  }

  // Close the modal
  const handleCloseModal = () => {
    setOpenAddEditModal({
      isShown: false,
      type: "add",
      data: null,
    })
  }

  const handleEdit = (noteDetails) => {
    handleOpenModal("edit", noteDetails);
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {allNotes.map((item) => (
          <NoteCard
          key={item._id}
          title={item.title}
          date={item.createdOn}
          content={item.content}
          tags={item.tags}
          isPinned={item.isPinned}
          onEdit={() => handleEdit(item)}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
        ))}
      </div>
      <button
        className="w-16 h-16 btn flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => handleOpenModal("add")}
      >
        <MdAdd className="text-[32px] text-white"></MdAdd>
      </button>
      {openAddEditModal.isShown && (
        <dialog id="my_modal_3" className="modal" open>
        <div className="modal-box">
          <form method="dialog">
            <button 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseModal}
            >
              ✕
            </button>
          </form>
          <AddEditNotes
          getAllNotes={getAllNotes}
          closeModal={handleCloseModal}
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          ></AddEditNotes>
        </div>
      </dialog>
      )}
    </>
  );
};

export default Home;



// type={openAddEditModal.type}
// noteData={openAddEditModal.data}