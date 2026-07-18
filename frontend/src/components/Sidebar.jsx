import { useNavigate } from "react-router-dom";
import assets, { userDummyData } from "../assets/assets";

function Sidebar({ selectedUser, setSelectedUser }) {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-x-scroll text-white ${selectedUser ? "max-md:hidden" : ""}`}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="max-w-40" />

          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="logo"
              className="max-w-5 cursor-pointer"
            />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md border border-gray-600 bg-[#282142] text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t bg-gray-500" />
              <p className="cursor-pointer text-sm">Logout</p>
            </div>
          </div>
        </div>

        <div className="bg-[#282124] flex items-center gap-2 py-3 px-4 mt-5 rounded-full">
          <img src={assets.search_icon} alt="search" className="w-3" />
          <input
            type="text"
            placeholder="Search User..."
            className="bg-transparent border-none outline-none text-xs text-white placeholder-[#c8c8c8] flex-1"
          />
        </div>
      </div>

      <div className="flex flex-col">
        {userDummyData.map((user, index) => (
          <div key={index} onClick={() => {setSelectedUser(user)}} className={`relative flex items-center gap-2 p-2 pl-4 cursor-pointer rounded max-md:text-sm ${selectedUser?._id === user._id && "bg-[#282142]/50"}`}>
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=""
              className="w-[35px] rounded-full aspect-[1/1]"
            />
            <div className="flex flex-col leading-5">
              <p className="">{user.fullName}</p>
              {index < 3 ? (
                <span className="text-green-600 text-xs">Online</span>
              ) : (
                <span className="text-neutral-400 text-xs">Offline</span>
              )}
            </div>
            {index > 2 && (
              <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                {index}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
