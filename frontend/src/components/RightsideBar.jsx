import assets, { imagesDummyData } from "../assets/assets";

function RightSideBar({ selectedUser, setSelectedUser }) {
  return (
    selectedUser && (
      <div
        className={`bg-[#8185B2]/10 text-white w-full h-full flex flex-col overflow-hidden ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-scroll">
          <div className="pt-3 flex flex-col gap-2 text-xs font-light mx-auto">
            <img
              src={selectedUser?.profilePic || assets.avatar_icon}
              alt=""
              className="w-20 aspect-[1/1] rounded-full mx-auto"
            />
            <h1 className="px-10 text-xl font-medium flex items-center justify-center gap-2">
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
              {selectedUser.fullName}
            </h1>
            <p className="mx-10 text-center">{selectedUser.bio}</p>
          </div>

          <hr className="border-[#ffffff50] my-4" />

          <div className="px-5 text-xs">
            <p>Media</p>
            <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
              {imagesDummyData.map((url, index) => (
                <div
                  key={index}
                  onClick={() => window.open(url)}
                  className="cursor-pointer rounded"
                >
                  <img src={url} alt="media" className="rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logout button pinned at bottom, no longer overlapping content */}
        <button className="shrink-0 my-4 bg-gradient-to-r from-purple-400 to-violet-600 text-sm text-white border-none font-light py-2 px-20 rounded-full cursor-pointer mx-auto">
          Logout
        </button>
      </div>
    )
  );
}

export default RightSideBar;