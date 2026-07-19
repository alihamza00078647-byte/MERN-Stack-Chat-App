import { useState } from "react";
import assets from "../assets/assets";



function Login() {

    const [currState, setCurrState] = useState('Sign up');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [isDataSubmit, setIsDataSubmit] = useState(false);


    return (
        <div className="min-h-screen bg-cover bg-center flex justify-center items-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
            {/* --------- Left --------- */}
            <img src={assets.logo_big} alt=""className="w-[min(30vh, 250px)]" />

            {/* --------- Right --------- */}

            <form className="border-2 bg-white/2 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg">
                <h2 className="font-medium text-2xl flex justify-between items-center">
                    {currState}
                    <img src={assets.arrow_icon} alt="" className="w-5 cursor-pointer" />
                </h2>

                {currState === "Sign up" && !isDataSubmit &&
                    <input type="text" id="" className="p-2 border border-gray-500 rounded-md focus:outline-none " placeholder="username" required/> 
                }

                {!isDataSubmit && <input onChange={()=> setEmail(email.target.value)} type="email" className="p-2 border border-gray-500 rounded-md focus:outline-none " placeholder="Email" required/>}


            </form>

        </div>
    )
}


export default Login;