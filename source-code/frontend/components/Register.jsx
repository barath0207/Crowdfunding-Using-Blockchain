export default Login;
Register.jsx.
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
// Import icons



const Register = () => {
 const [username, setUsername] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate(); // Initialize useNavigate hook


 const handleSubmit = async (e) => {
  e.preventDefault();


  try {
      await axios.post("http://localhost:5000/api/auth/register", {
       username,
       email,
       password,
      });


      alert("User registered successfully");


      // Redirect to login page after successful registration
      navigate("/login"); // Redirect to the login page
  } catch (error) {
      console.log(error.response?.data);
  }
 };


 return (
  <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
       <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">Register</h2>
       <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Input Field with Icon */}
        <div className="flex items-center space-x-4 mb-4">
            <FontAwesomeIcon icon={faUser} className="text-yellow-400 text-2xl" />
            <input

       type="text"
       value={username}
       onChange={(e) => setUsername(e.target.value)}
       placeholder="Username"
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none
focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
      />
     </div>


     {/* Email Input Field with Icon */}
     <div className="flex items-center space-x-4 mb-4">
      <FontAwesomeIcon icon={faEnvelope} className="text-green-400 text-2xl" />
      <input
       type="email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       placeholder="Email"
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none
focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
      />
     </div>


     {/* Password Input Field with Icon */}
     <div className="flex items-center space-x-4 mb-4">
      <FontAwesomeIcon icon={faLock} className="text-blue-400 text-2xl" />
      <input
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       placeholder="Password"
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none
focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
      />
     </div>


        {/* Register Button with Icon and Hover Effect */}
        <button
         type="submit"
         className="w-full py-3 bg-blue-500 text-white rounded-md flex items-center justify-
center space-x-3 hover:bg-blue-600 transition"
        >
         <span>Register</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-white text-lg group-
hover:text-gray-300 transition" />
        </button>
       </form>
      </div>
     </div>
 );
};
