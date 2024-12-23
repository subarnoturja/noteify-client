import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const MainLayout = () => {

  const [userInfo, setUserInfo] = useState(null)
  const [isSearch, setIsSearch] = useState(false)
  const [allNotes, setAllNotes] = useState([])

  const navigate = useNavigate();

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if(response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    }
    catch (error) {
      if(error.response.status === 401){
        localStorage.clear();
        navigate('/login');
      }
    }
  }

  useEffect(() => {
    getUserInfo();
  }, [])

  //
  const getAllNotes = async () => {
    if(!isSearch) {
      try{
        const response = await axiosInstance.get("/get-all-notes");
        if(response.data && response.data.notes) {
          setAllNotes(response.data.notes);
        }
      }
      catch (error) {
        console.log("error fetching notes:", error);
      }
    }
  }  

  // Search Notes
  const onSearchNote = async (query) => {
    if(query.trim()) {
      try {
        const response = await axiosInstance.get('/search-notes', {
          params: { query }
        })
  
        if(response.data && response.data.notes) {
          setAllNotes(response.data.notes);
          setIsSearch(true);
        }
      }
      catch(error) {
        console.log(error);
      }
    }
    else {
      setIsSearch(false);
      getAllNotes();
    }     
  }
  useEffect(() => {
    if (!isSearch) {
      getAllNotes();
    }
  }, [isSearch]);
  
    return (
    <div>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} />
      <div className="container mx-auto">
        <Outlet context={{isSearch, allNotes}}></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
