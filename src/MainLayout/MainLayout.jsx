import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const MainLayout = () => {

  const [userInfo, setUserInfo] = useState(null)

  const navigate = useNavigate();

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if(response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    }
    catch(error){
      if(error.response.status === 401){
        localStorage.clear();
        navigate('/login');
      }
    }
  }

  useEffect(() => {
    getUserInfo();
    return() => {}
  }, [])

  return (
    <div>
      <Navbar userInfo={userInfo}></Navbar>
      <div className="container mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
