/* eslint-disable no-unused-vars */
import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/Cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";

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

  // Delete Note
  const handleDelete = async (noteId) => {
    Swal.fire({
      title: "Are you sure you want to delete this note?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.delete(`/delete-note/${noteId}`);
          if(response.data) {
            getAllNotes();
            toast.success("Successfully Deleted!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        }
        catch (error) {
          console.error("failed to delete the note:", error);
        }
      } else if (result.isDenied) {
        Swal.fire("Delete operation is cancelled", "", "info");
      }
    });
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
          onDelete={() => handleDelete(item._id)}
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