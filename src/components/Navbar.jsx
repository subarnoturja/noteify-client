/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import ProfileInfo from "./Cards/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";
import { useState } from "react";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear()
    navigate("/login");
    window.location.reload();
  };

  const handleSearch = () => {
    if(searchQuery) {
      onSearchNote(searchQuery);
    }
    else{
      onSearchNote("");
    }
  }

  const onClearSearch = () => {
    setSearchQuery("")
    handleClearSearch();
  }

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow mb-6">
      <Link to="/">
        <h2 className="text-xl font-medium text-black py-2">Noteify</h2>
      </Link>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      ></SearchBar>
      <ProfileInfo userInfo={userInfo} onLogout={onLogout}></ProfileInfo>
    </div>
  );
};

export default Navbar;
