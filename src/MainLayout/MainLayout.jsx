/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const MainLayout = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred.", error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
    return () => {};
  }, []);

  // Search Notes
  const onSearchNote = async (query) => {
    console.log("Search Query:", query);
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        console.log("search results:", response.data.notes)
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
      else{
        console.log("No matching notes found")
        setIsSearch(true);
        setAllNotes([]);
      }
    } 
    catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  return (
    <div>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
      <div className="container mx-auto">
        <Outlet context={{ allNotes, setAllNotes, getAllNotes }}></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
