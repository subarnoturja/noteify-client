/* eslint-disable no-unused-vars */
import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/Cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [allNotes, setAllNotes] = useState([])
  
  // eslint-disable-next-line no-unused-vars
  // const [openAddEditModal, setOpenAddEditModal] = useState({
  //   isShown: false,
  //   type: "add",
  //   data: null,
  // });

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

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {allNotes.map((item, index) => (
          <NoteCard
          key={item._id}
          title={item.title}
          date={item.createdOn}
          content={item.content}
          tags={item.tags}
          isPinned={item.isPinned}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
        ))}
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
          ></AddEditNotes>
        </div>
      </dialog>
    </>
  );
};

export default Home;



// type={openAddEditModal.type}
// noteData={openAddEditModal.data}