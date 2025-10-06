import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import logo from '../../assets/logo.png'


const MarketScore = () => {
     const [reportData, setReportData] = useState(null);
        
        useEffect(() => {
            const storedData = localStorage.getItem('businessHealthReport-Vision');
            if (storedData) {
                setReportData(JSON.parse(storedData));
            }
        }, []);
        
        // Provide default values to prevent undefined errors
        const { totalVisionPoints = 0, mainVisionTotals = 0 } = reportData || {};
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-slate-200/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute bottom-10 left-20 w-72 h-72 bg-blue-50/50 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
            <div className="relative z-10">
                <Link to={'/'}><div className="flex justify-center items-center pt-8">

                <img 
                    src={logo} 
                    alt="" 
                    className="h-[200px] w-[300px]" 
                />
                </div></Link>
                <div className="mt-16 flex flex-col justify-center items-center px-4">
                    <div className="relative group">

                    {/* Animated Score Circle */}
                     <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/40 via-slate-400/30 to-blue-600/40 rounded-full blur opacity-60 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                     {/* Glass Morphism Score Container */}
                     <div className="relative bg-white/80 backdrop-blur-lg rounded-full border border-white/40 shadow-2xl p-12">
                     {/* Floating particles */}
                     <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400/60 rounded-full animate-ping"></div>
                     <div className="absolute top-4 right-4 w-3 h-3 bg-slate-400/60 rounded-full animate-ping delay-300"></div>
                     <div className="absolute bottom-4 left-4 w-3 h-3 bg-blue-400/60 rounded-full animate-ping delay-700"></div>
                     <div className="absolute bottom-4 right-4 w-3 h-3 bg-slate-400/60 rounded-full animate-ping delay-1000"></div>
                      <div className="text-center">
                                <p className="font-bold text-8xl text-blue-600 mb-4">{totalVisionPoints}</p>
                                <div className="w-32 h-1 bg-blue-400/50 mx-auto my-6 rounded-full"></div>
                                <p className="font-bold text-8xl text-blue-600">{mainVisionTotals}</p>
                            </div>
                     </div>
                </div> 
                {/* Score Description */}
                    {reportData && (
                        <div className="text-center mt-16 max-w-4xl">
                            <TypeAnimation
                                sequence={[
                                    "Your Total Score in Vision and Goal section is",
                                    500,
                                ]}
                                wrapper="p"
                                speed={50}
                                style={{ fontSize: '1.8em' }}
                                className="text-slate-700 font-medium mb-6"
                                repeat={Infinity}
                            />
                            
                            <div className="flex justify-center items-center gap-4 text-5xl font-bold mb-12">
                                <span className="text-blue-600 ">
                                    {totalVisionPoints}
                                </span>
                                <span className="text-slate-600 text-3xl">out of</span>
                                <span className="text-blue-600 ">
                                    {mainVisionTotals}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            {/* <div className="w-full max-w-md mx-auto mb-12">
                                <div className="bg-white/60 backdrop-blur-sm rounded-full h-4 border border-white/40 shadow-inner overflow-hidden">
                                    <div 
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{ 
                                            width: mainPositionTotals > 0 
                                                ? `${(totalPositionPoints / mainPositionTotals) * 100}%` 
                                                : '0%' 
                                        }}
                                    ></div>
                                </div>
                                <p className="text-slate-600 text-sm mt-2">
                                    {mainPositionTotals > 0 
                                        ? `${Math.round((totalPositionPoints / mainPositionTotals) * 100)}% completed` 
                                        : '0% completed'
                                    }
                                </p>
                            </div> */}

                            {/* Next Button */}
                            <Link to={'/strength'}>
                                <div className="flex justify-center items-center mb-10">
                                    <button className="relative group/btn overflow-hidden bg-gradient-to-r from-blue-600/90 to-blue-700/90 backdrop-blur-sm text-white font-bold text-xl cursor-pointer capitalize p-6 w-80 rounded-2xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 flex justify-center items-center gap-4 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105">
                                        <span className="relative z-10">Continue to Strategy and Strength section</span>
                                        <FaArrowRight className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                                    </button>
                                </div>
                            </Link>

                           
                        </div>
                    )}

                 {/* Loading State */}
                    {!reportData && (
                        <div className="text-center mt-16">
                            <div className="animate-pulse">
                                <div className="bg-white/60 rounded-2xl p-8 max-w-md mx-auto">
                                    <div className="h-8 bg-slate-300/50 rounded mb-4"></div>
                                    <div className="h-6 bg-slate-300/50 rounded mb-2"></div>
                                    <div className="h-6 bg-slate-300/50 rounded w-3/4 mx-auto"></div>
                                </div>
                            </div>
                        </div>
                    )}      
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

export default MarketScore;