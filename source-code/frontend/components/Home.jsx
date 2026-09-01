export default Register;


Home.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faNewspaper, faUsers, faHandsHelping, faBullhorn, faChartLine } from
'@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import Footer from './Footer';
const Home = () => {
 // Sample data for crowdfunding tips, news, about, and feedbac


 const feedbacks = [
   { name: "John Doe", feedback: "This platform helped me raise funds for my startup!", icon:
faUsers,                                                                           imageUrl:
"https://i.pinimg.com/736x/42/47/3e/42473ebf3441c680fa2b82d31cb81e6f.jpg" },
   { name: "Jane Smith", feedback: "A great experience with a supportive community!", icon:
faUsers,                                                                        imageUrl:

"https://i.pinimg.com/736x/01/00/d1/0100d18d2381d9e968cc1ddfeeb7bc50.jpg" },
  { name: "Alice Johnson", feedback: "I love how easy it is to start a campaign!", icon: faUsers,
imageUrl: "https://i.pinimg.com/736x/2b/a3/db/2ba3dbc3473ac3906e0c7ffe42f86f85.jpg" },
 ];


 return (
  <div>
  <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-lg w-full">
       <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
         <div className="flex items-center">
            <h1 className="text-3xl font-bold text-purple-400">Startup Singam</h1>
            <FontAwesomeIcon icon={faEthereum} className="text-4xl text-purple-400 ml-4" />
         </div>
         <div className="flex">
       <button className="px-4 py-2 rounded-md text-sm font-medium bg-gray-700 text-white
hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
             Home
            </button>
        <a href='/about' ><button className="px-4 py-2 rounded-md text-sm font-medium bg-
gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 ml-
2">
             About
            </button></a>
        <a href='/contact'><button className="px-4 py-2 rounded-md text-sm font-medium bg-
gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 ml-
2">
             Contact
            </button></a>
            <a href='/dashboard'>
          <button className="px-4 py-2 rounded-md text-sm font-medium bg-purple-600 text-
white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 ml-2">
               Dashboard


            </button>
           </a>
         </div>
     </div>
    </div>
   </nav>


   {/* Banner Section */}
   <div className="flex justify-center mb-6">
    <img
        src="https://i.pinimg.com/1200x/14/fd/7e/14fd7e7256275b985ae29d6952ca0073.jpg" //
Replace with your banner image URL
     alt="Crowdfunding Banner"
     className="w-full h-auto rounded-lg"
    />
   </div>




   {/* Feedback Section */}
   <div className="max-w-7xl mx-auto px-4 mb-8">
    <h2 className="text-3xl font-bold text-purple-400 mb-4">User Feedback</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
     {feedbacks.map((feedback, index) => (
      <div key={index} className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500
rounded-lg p-4 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
          <div className="flex items-center mb-4">
           <FontAwesomeIcon icon={feedback.icon} className="text-3xl text-white mr-4" />
           <h3 className="text-xl font-semibold text-white">{feedback.name}</h3>
          </div>
          <img src={feedback.imageUrl} alt={feedback.name} className="w-full h-40 object-
cover rounded-lg mb-4" />
          <p className="text-gray-100">"{feedback.feedback}"</p>
         </div>


        ))}
       </div>
      </div>
     </div>
     <Footer />
     </div>
 );
