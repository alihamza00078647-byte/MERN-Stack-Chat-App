import { useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("Waqas");
  const [bio, setBio] = useState("Hello everyone, I'm using QuickChat");

  const onChangeHandler = (event) => {
    event.preventDefault();
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      {/* ---------- Left Side ----------*/}
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form onSubmit={onChangeHandler} className="flex flex-col gap-2 p-10 flex-1">
          <h3 className="text-lg">Profile Details</h3>

          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              onChange={(e) => setSelectedImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : assets.avatar_icon
              }
              alt="upload"
              className={`w-12 h-12 ${selectedImage && "rounded-full"}`}
            />
            upload profile image
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Your Name"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 "
            required
          />

          <textarea
            onChange={(e) => setName(e.target.value)}
            value={bio}
            placeholder="profile bio"
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            rows={4}
          ></textarea>

          <button
            type="submit"
            className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 cursor-pointer text-white rounded-md"
          >
            Save
          </button>
        </form>
        {/* ---------- Right Side ----------*/}
        <img src={assets.logo_icon} alt="logo" className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10' />
      </div>
    </div>
  );
}

export default Profile;
