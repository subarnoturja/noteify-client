/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TagInput from "../../components/Input/TagInput";
import axiosInstance from "../../utils/axiosInstance";


const AddEditNotes = ({ getAllNotes, noteData, type, closeModal }) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(type === "edit" && noteData) {
            setTitle(noteData?.title || "");
            setContent(noteData?.content || "");
            setTags(noteData?.tags || []);
        }
    }, [type, noteData])

    // Add Note
    const addNewNote = async () => {
        try{
            const response = await axiosInstance.post("/add-note", {
                title,
                content, 
                tags,
            })

            if(response.data && response.data.note){
                getAllNotes();
                closeModal();
            }
        }
        catch (error){
            if(error.response && 
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        }
    }

    // Edit Note
    const editNote = async () => {

        const noteId = noteData._id;

        try {
            const response = await axiosInstance.put('/edit-note/' + noteId, {
                title,
                content,
                tags,
            })

            if(response.data && response.data.note) {
                getAllNotes();
                closeModal();
            }
        }
        catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    }
 
    const handleAddNote = () => {
        if(!title) {
            setError("Please enter the Title")
            return;
        }

        if(!content) {
            setError("Please enter the content")
            return;
        }

        setError("");

        if(type === "edit") {
            editNote()
        } else {
            addNewNote()
        }
    }

    return (
        <div>
            <div className='flex flex-col gap-2'>
                <label className='input-label'>Title</label>
                <input 
                    type='text'
                    className='text-2xl text-slate-950 outline-none'
                    placeholder='Go To Gym At 5'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>Content</label>
                <textarea
                    type='text'
                    className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                    placeholder='Content'
                    rows={10}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>
            <div className='mt-3'>
                <label className='input-label'>Tags</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>
            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
            <button className='btn btn-primary w-full font-medium mt-5 p-3' 
            onClick={handleAddNote}
            >{ type === "edit" ? "Update Note" : "Add Note" }</button>

        </div>
    );
};

export default AddEditNotes;