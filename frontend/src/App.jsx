import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { userAuth } = useContext(AuthContext);

  return (
    <>
      <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
        <Toaster />
        <Routes>
          <Route path="/" element={userAuth ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={userAuth ? <Navigate to="/" /> : <Login />} />
          <Route
            path="/profile"
            element={userAuth ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
