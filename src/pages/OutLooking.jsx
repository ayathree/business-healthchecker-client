import { useState } from "react";
import { calculateVisibilityScores } from "../utility/visibility";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import logo from '../assets/logo.png'
import { TypeAnimation } from "react-type-animation";


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
       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-slate-200/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute bottom-10 left-20 w-72 h-72 bg-blue-50/50 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
                   <div className="relative z-10">
                  <div className="flex justify-center items-center pt-8">
                   <img src={logo} alt="" className="h-[200px] w-[300px]" />
                </div>
                  <div className="mt-8 ">
                      {/* <p className="text-2xl text-center font-bold capitalize text-slate-800">Out Looking (Visibility)</p> */}
                       <div className="flex justify-center items-center mb-10">
                        <TypeAnimation
                            sequence={[
                                "Out Looking (Visibility)",
                                500,
                            ]}
                            wrapper="p"
                            speed={50}
                            style={{ fontSize: '1.5em' }}
                            className="text-slate-700 text-center font-medium"
                            repeat={Infinity}
                        />
                    </div>
                      <div className="flex justify-center items-center mt-4 px-4">
                              <form onSubmit={handleSubmit} action="" className="w-full max-w-4xl">
                                {/* Glass Morphism Container with Animated Border */}
                            <div className=" relative group ">
                               {/* Animated Gradient Border */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/40 via-slate-400/30 to-blue-600/40 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                                 {/* Glass Morphism Form */}
                            {/* part 8 */}
                             <div className="relative p-8 bg-white/80 backdrop-blur-lg rounded-xl border border-white/40 shadow-2xl">
                             {/* Floating particles effect */}
                                    <div className="absolute top-2 left-2 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"></div>
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-slate-400/60 rounded-full animate-ping delay-300"></div>
                                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-400/60 rounded-full animate-ping delay-700"></div>
                                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-slate-400/60 rounded-full animate-ping delay-1000"></div>
                               <div className="flex flex-col items-start justify-center gap-6">
                                {/* Form Fields with Glass Inputs */}
                                <div className="w-full">
                                  {/* 8.1 Facebook Likes */}
                              <label className="font-semibold text-lg text-slate-800 block mb-2">
                                8.1 Number of Facebook Page Likes of your organization?
                              </label>
                              <input
                                type="text"
                                name="facebookLikes"
                                value={visibilityData.facebookLikes}
                                onChange={handleVisibilityInputChange}
                                placeholder="Enter number"
                                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                              />
                             </div>
                             <div className="w-full">
                             {/* 8.2 Instagram Followers */}
                              <label className="font-semibold text-lg text-slate-800 block mb-2">
                                8.2 Number of Instagram Followers of your organization?
                              </label>
                              <input
                                type="text"
                                name="instagramFollowers"
                                value={visibilityData.instagramFollowers}
                                onChange={handleVisibilityInputChange}
                                placeholder="Enter number"
                                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                              />
                             </div>
                             <div className="w-full">
                             {/* 8.3 YouTube Subscribers */}
                              <label className="font-semibold text-lg text-slate-800 block mb-2">
                                8.3 Number of YouTube Subscribers of your organization?
                              </label>
                              <input
                                type="text"
                                name="youtubeSubscribers"
                                value={visibilityData.youtubeSubscribers}
                                onChange={handleVisibilityInputChange}
                                placeholder="Enter number"
                                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                              />
                             </div>
                             <div className="w-full">
                            {/* 8.4 Post Reach */}
                              <label className="font-semibold text-lg text-slate-800 block mb-2">
                                8.4 Average number of post reach?
                              </label>
                              <input
                                type="text"
                                name="postReach"
                                value={visibilityData.postReach}
                                onChange={handleVisibilityInputChange}
                                placeholder="Enter number"
                                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                              />
                             </div>
                             </div> 
                             </div>     
                             </div>
                        {/* Glass Morphism Button */}
                            <div className="mt-8 flex justify-center items-center mb-10">
                                <button className="relative group/btn overflow-hidden bg-gradient-to-r from-blue-600/90 to-blue-700/90 backdrop-blur-sm text-white font-bold text-lg cursor-pointer capitalize p-4 w-full max-w-md rounded-xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 flex justify-center items-center gap-3 hover:from-blue-700 hover:to-blue-800">
                                    <span className="relative z-10">Get The Score</span>
                                    <FaArrowRight className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                                </button>
                            </div>
                        </form>
                      </div>
                  </div>
                </div>
                 <style jsx>{`
                @keyframes tilt {
                    0%, 100% {
                        transform: rotate(0deg) scale(1);
                    }
                    25% {
                        transform: rotate(1deg) scale(1.01);
                    }
                    75% {
                        transform: rotate(-1deg) scale(1.01);
                    }
                }
                .animate-tilt {
                    animation: tilt 10s infinite linear;
                }
            `}</style>
                  
              </div>
    );
};

export default OutLooking;