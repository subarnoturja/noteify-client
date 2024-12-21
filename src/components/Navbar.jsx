import { Link, useNavigate } from "react-router-dom";
import ProfileInfo from "./Cards/ProfileInfo";

const Navbar = () => {

    const navigate = useNavigate();

   const onLogout = () => {
    navigate('/login');
   }

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <Link to='/'>
        <h2 className="text-xl font-medium text-black py-2">Noteify</h2>
      </Link>
      <ProfileInfo onLogout={onLogout}></ProfileInfo>
    </div>
  );
};

export default Navbar;
