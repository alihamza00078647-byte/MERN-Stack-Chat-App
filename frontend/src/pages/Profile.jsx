import assets from "../assets/assets";

function Profile() {
  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      {/* ---------- Left Side ----------*/}
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form className="flex flex-col gap-2 p-10 flex-1">
          <h3 className="text-lg">Profile Details</h3>

          <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
            <input type="file" id="avatar" accept=".png, .jpg, .jpeg" hidden/>
            <img src={assets.avatar_icon} alt="" />
          </label>
        </form>
        {/* ---------- Right Side ----------*/}
        <img src="" alt="" />
      </div>
    </div>
  );
}

export default Profile;
