import { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [currState, setCurrState] = useState("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmit, setIsDataSubmit] = useState(false);

  const { Login } = useContext(AuthContext);

  // Handle data on form submit
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currState === "signup" && !isDataSubmit) {
      setIsDataSubmit(true);
      return;
    }

    Login(currState === "signup" ? "signup" : "Login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* --------- Left --------- */}
      <img src={assets.logo_big} alt="" className="w-[min(30vh, 250px)]" />


      {/* --------- Right --------- */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/2 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmit && (
            <img
              onClick={() => setIsDataSubmit(false)}
              src={assets.arrow_icon}
              alt="back"
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {currState === "signup" && !isDataSubmit && (
          <input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            className="p-2 border border-gray-500 rounded-md focus:outline-none "
            placeholder="username"
            required
          />
        )}

        {!isDataSubmit && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="p-2 border border-gray-500 rounded-md focus:outline-none "
              placeholder="Email"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="p-2 border border-gray-500 rounded-md focus:outline-none "
              placeholder="Passsword"
              required
            />
          </>
        )}

        {currState === "signup" && isDataSubmit && (
          <textarea
            placeholder="Bio"
            rows={4}
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 cursor-pointer text-white rounded-md"
        >
          {currState === "signup" ? "Create Account" : "Login"}
        </button>

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <input type="checkbox" required />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="flex flex-col gap-2">
          {currState === "signup" ? (
            <p
              className="text-sm text-gray-600"
              onClick={() => setCurrState("Login")}
            >
              Already have an Account?{" "}
              <span className="font-medium text-sm text-violet-600 cursor-pointer">
                Login
              </span>
            </p>
          ) : (
            <p
              className="text-sm text-gray-600"
              onClick={() => setCurrState("signup")}
            >
              Create an Account{" "}
              <span className="font-medium text-sm text-violet-600 cursor-pointer">
                signup
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
