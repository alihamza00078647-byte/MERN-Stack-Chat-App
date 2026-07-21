import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import {Toaster} from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {
  const {userAuth} = useContext(AuthContext);



  return (
    <>
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
    </>
  )
}

export default App;
