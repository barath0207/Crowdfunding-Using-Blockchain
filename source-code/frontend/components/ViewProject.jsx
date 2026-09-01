export default Home;




View Project.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 faEye,
 faHandHoldingUsd,
 faBullseye,
 faCheckCircle,
 faTimes,
 faCalendarAlt,
 faUser,
 faInfoCircle,
 faChartPie,
 faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';


const ViewProjects = () => {

const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [donationAmounts, setDonationAmounts] = useState({});
const [activeDonationId, setActiveDonationId] = useState(null);
const [donationDetails, setDonationDetails] = useState(null);
const [showDonationModal, setShowDonationModal] = useState(false);
const [selectedProject, setSelectedProject] = useState(null);
const [showProjectModal, setShowProjectModal] = useState(false);
const [showStatsModal, setShowStatsModal] = useState(false);
const [ethPrice, setEthPrice] = useState(0);
const [alert, setAlert] = useState({ show: false, message: "", type: "" });


useEffect(() => {
 const fetchProjects = async () => {
  try {
      const response = await axios.get("http://localhost:5000/api/project/view-all-projects", {
          withCredentials: true,
      });


      if (response.status === 200) {
          setProjects(response.data.projects);
          const initialAmounts = {};
          response.data.projects.forEach(project => {
           initialAmounts[project._id] = { usd: "", eth: "" };
          });
          setDonationAmounts(initialAmounts);
      }
  } catch (error) {
      setError(error.response?.data?.message || "Error fetching projects.");
  } finally {
      setLoading(false);
  }
 };

  const fetchEthPrice = async () => {
      try {
                                             const          response        =          await
axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
          setEthPrice(response.data.ethereum.usd);
      } catch (error) {
          console.error("Error fetching ETH price:", error);
      }
  };


  fetchProjects();
  fetchEthPrice();
 }, []);


 const showAlert = (message, type = "error") => {
  setAlert({ show: true, message, type });
  setTimeout(() => setAlert({ show: false, message: "", type: "" }), 5000);
 };


 const handleViewProject = (project) => {
  setSelectedProject(project);
  setShowProjectModal(true);
 };


 const handleDonate = async (projectId) => {
  const amount = parseFloat(donationAmounts[projectId].usd);
  const project = projects.find(p => p._id === projectId);


  // Check if project is fully funded
  if (project.currentAmount >= project.targetAmount) {
      showAlert("This project is already fully funded!", "error");
      return;
  }

  // Check if amount is valid
  if (!amount || amount <= 0) {
      showAlert("Please enter a valid donation amount", "error");
      return;
  }


  // Check if donation would exceed the target amount
  const remainingAmount = project.targetAmount - project.currentAmount;
  if (amount > remainingAmount) {
   showAlert(`You can donate maximum ${remainingAmount.toFixed(2)} USD to fully fund this
project`, "warning");
      return;
  }


  try {
      setActiveDonationId(projectId);
      const response = await axios.post(
       `http://localhost:5000/api/project/donate/${projectId}`,
       { amount: Number(amount) },
       { withCredentials: true }
      );


      const updatedProject = response.data.project;
      setProjects(prevProjects =>
       prevProjects.map(project =>
           project._id === updatedProject._id ? updatedProject : project
       )
      );


      setDonationDetails({
       username: response.data.user?.username || "Anonymous",
       amount: amount,
       txHash: response.data.txHash || "0x123...abc",

      projectTitle: updatedProject.title
     });


     setDonationAmounts(prev => ({ ...prev, [projectId]: { usd: "", eth: "" } }));
     setError("");
     setShowDonationModal(true);
 } catch (error) {
     showAlert(error.response?.data?.message || "Error donating to project", "error");
 } finally {
     setActiveDonationId(null);
 }
};


const handleDonationAmountChange = (projectId, value, type) => {
 const newAmounts = { ...donationAmounts };
 const numericValue = parseFloat(value) || 0;


 if (type === "usd") {
     newAmounts[projectId].usd = value;
     newAmounts[projectId].eth = ethPrice > 0 ? (numericValue / ethPrice).toFixed(6) : "0";
 } else {
     newAmounts[projectId].eth = value;
     newAmounts[projectId].usd = (numericValue * ethPrice).toFixed(2);
 }


 setDonationAmounts(newAmounts);
};


const calculateProgress = (current, target) => {
 return Math.min(Math.round((current / target) * 100), 100);
};


const closeModal = () => {
 setShowDonationModal(false);

     setDonationDetails(null);
 };


 const closeProjectModal = () => {
     setShowProjectModal(false);
     setSelectedProject(null);
 };


 const closeStatsModal = () => {
     setShowStatsModal(false);
 };


 const totalProjects = projects.length;
 const totalAmountRaised = projects.reduce((acc, project) => acc + (project.currentAmount || 0),
0);


 if (loading) {
     return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <div className="text-xl text-purple-400 animate-pulse">Loading Projects...</div>
      </div>
     );
 }


 if (error) {
     return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <div className="text-xl text-red-400">{error}</div>
      </div>
     );
 }


 return (
     <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">

   {/* Alert Notification */}
   {alert.show && (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
        alert.type === "error" ? "bg-red-600" : "bg-yellow-600"
    } text-white max-w-md`}>
        <div className="flex items-center">
         <FontAwesomeIcon
          icon={alert.type === "error" ? faTimes : faExclamationTriangle}
          className="mr-2"
         />
         <span>{alert.message}</span>
        </div>
    </div>
   )}


   {/* Stats Modal */}
   {showStatsModal && (
     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50
p-4">
        <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
         <button
          onClick={closeStatsModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
         >
          <FontAwesomeIcon icon={faTimes} size="lg" />
         </button>


         <h3 className="text-2xl font-bold text-white mb-4">Project Statistics</h3>
         <div className="space-y-4">
          <div className="flex justify-between">
              <span className="text-gray-400">Total Projects:</span>
              <span className="text-white font-medium">{totalProjects}</span>
          </div>
          <div className="flex justify-between">

             <span className="text-gray-400">Total Amount Raised:</span>
                   <span className="text-white font-medium">{totalAmountRaised.toFixed(2)}
USD</span>
          </div>
         </div>
        </div>
    </div>
   )}


   {/* Donation Success Modal */}
   {showDonationModal && donationDetails && (
     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50
p-4">
        <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
         <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
         >
          <FontAwesomeIcon icon={faTimes} size="lg" />
         </button>


         <div className="text-center mb-6">
          <FontAwesomeIcon
             icon={faCheckCircle}
             className="text-green-500 text-5xl mb-4"
          />
          <h3 className="text-2xl font-bold text-white mb-2">Donation Successful!</h3>
          <p className="text-gray-300">Thank you for your support</p>
         </div>


         <div className="space-y-4">
          <div className="flex justify-between">
             <span className="text-gray-400">Project:</span>
             <span className="text-white font-medium">{donationDetails.projectTitle}</span>


          </div>


          <div className="flex justify-between">
             <span className="text-gray-400">Donor:</span>
             <span className="text-white font-medium">{donationDetails.username}</span>
          </div>


          <div className="flex justify-between">
             <span className="text-gray-400">Amount:</span>
             <span className="text-white font-medium flex items-center">
              <FontAwesomeIcon icon={faEthereum} className="mr-1" />
              {donationDetails.amount} USD
             </span>
          </div>


          <div className="flex justify-between items-center">
             <span className="text-gray-400">Transaction:</span>
             <span className="text-purple-400 font-mono text-sm truncate max-w-[180px]">
              {donationDetails.txHash}
             </span>
          </div>
         </div>


         <button
          onClick={closeModal}
         className="w-full mt-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md
transition"
         >
          Close
         </button>
        </div>
    </div>
   )}



   {/* Project Details Modal */}
   {showProjectModal && selectedProject && (
     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50
p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative">
       <button
        onClick={closeProjectModal}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
       >
        <FontAwesomeIcon icon={faTimes} size="lg" />
       </button>


       <div className="flex flex-col md:flex-row gap-6">
        {selectedProject.imageUrl && (
           <div className="md:w-1/2">
             <img
              src={selectedProject.imageUrl}
              alt={selectedProject.title}
              className="w-full h-64 object-cover rounded-lg"
             />
           </div>
        )}


        <div className="md:w-1/2">
           <h2 className="text-2xl font-bold text-white mb-4">{selectedProject.title}</h2>


           <div className="space-y-4">
             <div className="flex items-center text-gray-300">
              <FontAwesomeIcon icon={faUser} className="mr-2 w-4" />
              <span>Created by: {selectedProject.creator?.username || "Unknown"}</span>
             </div>


             <div className="flex items-center text-gray-300">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 w-4" />

                                                            <span>Created       on:     {new
Date(selectedProject.createdAt).toLocaleDateString()}</span>
          </div>


          <div className="pt-4">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
             <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
             Description
            </h3>
            <p className="text-gray-300">{selectedProject.description}</p>
          </div>


          <div className="pt-4">
            <div className="flex justify-between text-sm text-gray-300 mb-1">
             <span>
              <FontAwesomeIcon icon={faEthereum} className="mr-1" />
              {selectedProject.currentAmount || 0} raised
             </span>
             <span>
              <FontAwesomeIcon icon={faEthereum} className="mr-1" />
              {selectedProject.targetAmount} goal
             </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
             <div
                                                            className={`h-2.5     rounded-full
${calculateProgress(selectedProject.currentAmount || 0, selectedProject.targetAmount) >= 100 ?
'bg-green-500' : 'bg-purple-500'}`}
                      style={{ width: `${calculateProgress(selectedProject.currentAmount || 0,
selectedProject.targetAmount)}%` }}
             ></div>
            </div>
            <div className="text-right mt-1 text-xs text-gray-400">
                                    {calculateProgress(selectedProject.currentAmount    ||   0,
selectedProject.targetAmount)}% funded

             </div>
            </div>


            <div className="pt-4">
             <div className="flex flex-col space-y-4">
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-
none">
                <span className="text-gray-400">$</span>
               </div>
               <input
                type="number"
                min="1"
                max={selectedProject.targetAmount - (selectedProject.currentAmount || 0)}
                className="w-full pl-8 px-4 py-2 bg-gray-700 border border-gray-600 rounded-
md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Donation amount (USD)"
                value={donationAmounts[selectedProject._id]?.usd || ""}
                          onChange={(e) => handleDonationAmountChange(selectedProject._id,
e.target.value, "usd")}
               />
              </div>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-
none">
                <FontAwesomeIcon icon={faEthereum} className="text-gray-400" />
               </div>
               <input
                type="number"
                min="0"
                     max={(selectedProject.targetAmount - (selectedProject.currentAmount || 0)) /
ethPrice}
                step="0.000001"
                className="w-full pl-8 px-4 py-2 bg-gray-700 border border-gray-600 rounded-
md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"

                   placeholder="Donation amount (ETH)"
                   value={donationAmounts[selectedProject._id]?.eth || ""}
                           onChange={(e) => handleDonationAmountChange(selectedProject._id,
e.target.value, "eth")}
                 />
              </div>
             </div>


             <button
              onClick={() => handleDonate(selectedProject._id)}
           disabled={activeDonationId === selectedProject._id || selectedProject.currentAmount
>= selectedProject.targetAmount}
                className={`w-full mt-2 py-2 text-white rounded-md transition flex items-center
justify-center ${
                  activeDonationId === selectedProject._id || selectedProject.currentAmount >=
selectedProject.targetAmount
                   ? 'bg-purple-800 cursor-not-allowed'
                   : 'bg-purple-600 hover:bg-purple-700'
              }`}
             >
              {activeDonationId === selectedProject._id ? (
                 'Processing...'
              ) : selectedProject.currentAmount >= selectedProject.targetAmount ? (
                 'Project Fully Funded'
              ):(
                 <>
                   <FontAwesomeIcon icon={faHandHoldingUsd} className="mr-2" />
                   Donate Now
                 </>
              )}
             </button>
           </div>
          </div>
         </div>
       </div>

        </div>
    </div>
   )}


   <div className="max-w-7xl mx-auto">
    <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-purple-400">
          <FontAwesomeIcon icon={faBullseye} className="mr-2" />
          Explore Projects
        </h2>
        <button
          onClick={() => setShowStatsModal(true)}
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-
center"
        >
          <FontAwesomeIcon icon={faChartPie} className="mr-2" />
          View Stats
        </button>
    </div>


    {projects.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          No projects available yet. Be the first to create one!
        </div>
    )}


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const progress = calculateProgress(project.currentAmount || 0, project.targetAmount);
          const isFunded = progress >= 100;
          const remainingAmount = project.targetAmount - (project.currentAmount || 0);


          return (
            <div key={project._id} className="bg-gray-800 rounded-lg shadow-lg hover:shadow-

xl transition-all duration-300 overflow-hidden">
         {project.imageUrl && (
           <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover"
           />
         )}


         <div className="p-6">
           <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
           <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>


           <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>
                 <FontAwesomeIcon icon={faEthereum} className="mr-1" />
                 {project.currentAmount || 0} raised
                </span>
                <span>
                 <FontAwesomeIcon icon={faEthereum} className="mr-1" />
                 {project.targetAmount} goal
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                 className={`h-2.5 rounded-full ${isFunded ? 'bg-green-500' : 'bg-purple-500'}`}
                 style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-right mt-1 text-xs text-gray-400">
                {progress}% funded
              </div>
           </div>

          <div className="flex justify-between text-gray-300 text-sm mb-4">
           <div>
            <FontAwesomeIcon icon={faHandHoldingUsd} className="mr-1" />
            {project.donations?.length || 0} donations
           </div>
           {isFunded && (
            <div className="text-green-400">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                Funded!
            </div>
           )}
          </div>


          <div className="space-y-3">
           <button
            onClick={() => handleViewProject(project)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md
transition flex items-center justify-center"
           >
            <FontAwesomeIcon icon={faEye} className="mr-2" />
            View Details
           </button>


           {!isFunded && (
            <div className="space-y-2">
                <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-
none">
                  <span className="text-gray-400">$</span>
                 </div>
                 <input
                  type="number"
                  min="1"


                    max={remainingAmount}
                className="w-full pl-8 px-4 py-2 bg-gray-700 border border-gray-600 rounded-
md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder={`Max ${remainingAmount.toFixed(2)} USD`}
                    value={donationAmounts[project._id]?.usd || ""}
                     onChange={(e) => handleDonationAmountChange(project._id, e.target.value,
"usd")}
                />
               </div>
               <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-
none">
                    <FontAwesomeIcon icon={faEthereum} className="text-gray-400" />
                </div>
                <input
                    type="number"
                    min="0"
                    max={remainingAmount / ethPrice}
                    step="0.000001"
                className="w-full pl-8 px-4 py-2 bg-gray-700 border border-gray-600 rounded-
md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder={`Max ${(remainingAmount / ethPrice).toFixed(6)} ETH`}
                    value={donationAmounts[project._id]?.eth || ""}
                     onChange={(e) => handleDonationAmountChange(project._id, e.target.value,
"eth")}
                />
               </div>


               <button
                onClick={() => handleDonate(project._id)}
                disabled={activeDonationId === project._id || isFunded}
                      className={`w-full py-2 text-white rounded-md transition flex items-center
justify-center ${
                    activeDonationId === project._id || isFunded
                     ? 'bg-purple-800 cursor-not-allowed'

                           : 'bg-purple-600 hover:bg-purple-700'
                      }`}
