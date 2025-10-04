import { useState } from "react";
import { calculateVisibilityScores } from "../utility/visibility";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";


const OutLooking = () => {
    const navigate=useNavigate()
   const [visibilityData, setVisibilityData] = useState({
    facebookLikes: '',
    instagramFollowers: '',
    youtubeSubscribers: '',
    postReach: ''
  });
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const visibilityScore=calculateVisibilityScores(visibilityData)
        
        const mainVisibilityTotals=visibilityScore.mainVisibilityTotal 
        console.log(mainVisibilityTotals);
         const totalVisibilityPoints = visibilityScore.totalVisibilityPoints
        
        // Save to localStorage
      localStorage.setItem('businessHealthReport-OutLooking', JSON.stringify({ 
        
        visibilityScore,
        totalVisibilityPoints,
        mainVisibilityTotals,
       
      }));
       navigate('/visibility');
        
       
        console.log(visibilityScore);
       
        console.log(totalVisibilityPoints);
        
      }; 
      
        const handleVisibilityInputChange = (e) => {
    const { name, value } = e.target;
    setVisibilityData(prev => ({
      ...prev,
      [name]: value.replace(/\D/g, '') // Allow only numbers
    }));
  };
    return (
       <div className="bg-blue-50">
                   <div className="flex justify-center items-center">
      
                  <img src="https://i.ibb.co.com/KzWNyxsQ/Chat-GPT-Image-Sep-1-2025-11-23-34-AM.png" alt="" className="h-[200px] w-[300px]" />
                </div>
                  <div className="mt-16 ">
                      <p className="text-xl text-center font-bold capitalize mt-2">please fill up this form</p>
                      <div className="flex justify-center items-center mt-2">
                              <form onSubmit={handleSubmit} action="" className="">
                            <div className=" border-2 border-blue-500 w-[70vw] h-100% py-10 px-20  mt-2 ">
                            {/* part 8 */}
                             <div className="flex flex-col items-start justify-center gap-4">
                               <p className="text-xl font-semibold text-[#54275c] mt-10">8. Out Looking (Visibility)</p>
                              {/* 8.1 Facebook Likes */}
                              <label className="font-semibold">
                                8.1 Number of Facebook Page Likes of your organization?
                              </label>
                              <input
                                type="text"
                                name="facebookLikes"
                                value={visibilityData.facebookLikes}
                                onChange={handleVisibilityInputChange}
                                placeholder="Enter number"
                                className="outline-2 p-2 w-1/2"
                              />
                              
                        
                              {/* 8.2 Instagram Followers */}
                              <label className="font-semibold">
                                8.2 Number of Instagram Followers of your organization?
                              </label>
                              <input
                                type="text"
                                name="instagramFollowers"
                                value={visibilityData.instagramFollowers}
                                onChange={handleVisibilityInputChange}
                                placeholder="Enter number"
                                className="outline-2 p-2 w-1/2"
                              />
                              
                        
                              {/* 8.3 YouTube Subscribers */}
                              <label className="font-semibold">
                                8.3 Number of YouTube Subscribers of your organization?
                              </label>
                              <input
                                type="text"
                                name="youtubeSubscribers"
                                value={visibilityData.youtubeSubscribers}
                                onChange={handleVisibilityInputChange}
                                placeholder="Enter number"
                                className="outline-2 p-2 w-1/2"
                              />
                        
                              {/* 8.4 Post Reach */}
                              <label className="font-semibold">
                                8.4 Average number of post reach?
                              </label>
                              <input
                                type="text"
                                name="postReach"
                                value={visibilityData.postReach}
                                onChange={handleVisibilityInputChange}
                                placeholder="Enter number"
                                className="outline-2 p-2 w-1/2"
                              />
                             </div>      
                                               
                      </div>
                        <div className="mt-10 flex justify-center items-center mb-10">
                            <button className="bg-blue-500 text-white font-bold text-lg cursor-pointer btn hover:bg-slate-500 hover:text-black capitalize p-2 w-1/2 outline-2 flex justify-center items-center gap-3 ">next
                            <FaArrowRight className=""></FaArrowRight></button>
                        </div>
                        </form>
                      </div>
                  </div>
                  
              </div>
    );
};

export default OutLooking;