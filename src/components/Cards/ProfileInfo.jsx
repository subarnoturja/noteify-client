/* eslint-disable react/prop-types */
import { FaRegUserCircle } from "react-icons/fa";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo) {
    return (
      <div className="avatar">
        <FaRegUserCircle size={28} />
      </div>
    ); // Fallback UI while `userInfo` is loading
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(userInfo.fullName || "Unknown")}
      </div>
      <div>
        <p className="text-sm font-medium">
          {userInfo.fullName || "Unknown User"}
        </p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
