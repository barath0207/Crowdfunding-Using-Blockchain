Login.jsx.
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";


const Login = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const navigate = useNavigate();


 const handleSubmit = async (e) => {
  e.preventDefault();


  if (!email || !password) {
      setError("Please fill in all fields");
      return;
  }


  try {
   const response = await axios.post("http://localhost:5000/api/auth/login", { email, password },
{ withCredentials: true });


      alert("Login successful");
      console.log("Redirecting to dashboard...");


      navigate("/dashboard", { replace: true }); // Redirect to dashboard
  } catch (err) {

      setError(err.response?.data?.message || "Login failed, please try again.");
  }
 };


 return (
  <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
       <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">Login</h2>


       {error && <p className="text-red-500 text-center mb-4">{error}</p>}


       <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center mb-4">
         <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 text-2xl mr-4" />
         <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none
focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
         />
        </div>


        <div className="flex items-center mb-4">
         <FontAwesomeIcon icon={faLock} className="text-red-500 text-2xl mr-4" />
         <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none
focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
         />


        </div>


        <button
         type="submit"
        className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition
flex items-center justify-center gap-2"
        >
         <FontAwesomeIcon icon={faSignInAlt} className="text-white text-lg" />
         Login
        </button>
       </form>


       <div className="mt-4 text-center">
        <p className="text-gray-400">
         Don't have an account?{" "}
         <a href="/register" className="text-blue-500 hover:text-blue-400">
            Register here
         </a>
        </p>
       </div>
      </div>
     </div>
 );
};
