import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { calculateVisionScores } from "../utility/goalAndVision";
import { TypeAnimation } from "react-type-animation";
import logo from '../assets/logo.png'
const VisionAndGoal = () => {
    const navigate = useNavigate();
    const [goalVisionData, setGoalVisionData] = useState({
        hasVision: '',
        visionText: '',
        hasActionPlan: '',
        resourcePercentage: '',
        hasSkilledManpower: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const goalScore = calculateVisionScores(goalVisionData);
        const mainVisionTotals = goalScore.mainVisionTotal;
        const totalVisionPoints = goalScore.totalVisionPoints;
        
        // Save to localStorage
        localStorage.setItem('businessHealthReport-Vision', JSON.stringify({ 
            goalScore,
            totalVisionPoints,
            mainVisionTotals,
        }));
        navigate('/visionScore');
    };  

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-slate-200/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute bottom-10 left-20 w-72 h-72 bg-blue-50/50 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
            
            <div className="relative z-10">
                {/* Header Section */}
                 <Link to={'/'}><div className="flex justify-center items-center pt-8">
                     <img src={logo} alt="" className="h-[200px] w-[300px]" />
                  </div></Link>

                <div className="mt-8">
                    <p className="text-2xl text-center font-bold capitalize text-slate-800">Vision & Goal Assessment</p>
                    <div className="flex justify-center items-center mb-10">
                        <TypeAnimation
                            sequence={[
                                "Define your organization's vision and strategic goals for future growth.",
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
                        <form onSubmit={handleSubmit} className="w-full max-w-4xl">
                            {/* Glass Morphism Container with Animated Border */}
                            <div className="relative group">
                                {/* Animated Gradient Border */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/40 via-slate-400/30 to-blue-600/40 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                                
                                {/* Glass Morphism Form */}
                                <div className="relative p-8 bg-white/80 backdrop-blur-lg rounded-xl border border-white/40 shadow-2xl">
                                    {/* Floating particles effect */}
                                    <div className="absolute top-2 left-2 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"></div>
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-slate-400/60 rounded-full animate-ping delay-300"></div>
                                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-400/60 rounded-full animate-ping delay-700"></div>
                                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-slate-400/60 rounded-full animate-ping delay-1000"></div>
                                    
                                    <div className="flex flex-col items-start justify-center gap-8">
                                       

                                        {/* 4.1 Vision/Goal */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">
                                                4.1 Do you have a written vision or SMART goal for the next 5 years?
                                            </label>
                                            <div className="flex flex-col gap-3">
                                                {[
                                                    { value: 'written', label: 'Yes, written form' },
                                                    { value: 'inMind', label: 'In mind but not written' },
                                                    { value: 'noUnderstanding', label: "Don't understand SMART goals" }
                                                ].map((option) => (
                                                    <label key={option.value} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                                        <input
                                                            className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                                            type="radio"
                                                            name="hasVision"
                                                            value={option.value}
                                                            checked={goalVisionData.hasVision === option.value}
                                                            onChange={(e) => setGoalVisionData({...goalVisionData, hasVision: e.target.value})}
                                                        />
                                                        <span className="text-slate-700 font-medium">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 4.2 Vision Text */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">
                                                4.2 Briefly write your vision or SMART goal for the next 5 years:
                                            </label>
                                            <textarea 
                                                type="text" 
                                                name="visionText" 
                                                value={goalVisionData.visionText} 
                                                onChange={(e) => setGoalVisionData({...goalVisionData, visionText: e.target.value})} 
                                                rows={6} 
                                                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner resize-none"
                                                placeholder="Describe your vision and goals for the next 5 years..."
                                            />
                                        </div>

                                        {/* 4.3 Action Plan */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">
                                                4.3 Do you have an actionable plan to achieve your vision or goal?
                                            </label>
                                            <div className="flex flex-col gap-3">
                                                {[
                                                    { value: 'yes', label: 'Yes, prepared plan' },
                                                    { value: 'no', label: 'No plan' }
                                                ].map((option) => (
                                                    <label key={option.value} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                                        <input
                                                            className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                                            type="radio"
                                                            name="hasActionPlan"
                                                            value={option.value}
                                                            checked={goalVisionData.hasActionPlan === option.value}
                                                            onChange={(e) => setGoalVisionData({...goalVisionData, hasActionPlan: e.target.value})}
                                                        />
                                                        <span className="text-slate-700 font-medium">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 4.4 Resource Percentage */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">
                                                4.4 What percentage of the required resources to achieve your vision or goal do you currently have?
                                            </label>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-slate-600 font-medium min-w-12">0%</span>
                                                    <input
                                                        type="range"
                                                        name="resourcePercentage"
                                                        min="0"
                                                        max="10"
                                                        value={goalVisionData.resourcePercentage}
                                                        onChange={(e) => setGoalVisionData({...goalVisionData, resourcePercentage: e.target.value})}
                                                        className="flex-1 h-3 bg-white/60 rounded-lg appearance-none cursor-pointer slider"
                                                        required
                                                    />
                                                    <span className="text-slate-600 font-medium min-w-20">
                                                        100% ({goalVisionData.resourcePercentage || 0}/10)
                                                    </span>
                                                </div>
                                                <div className="text-center">
                                                    <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                                                        Current: {goalVisionData.resourcePercentage ? goalVisionData.resourcePercentage * 10 : 0}%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 4.5 Skilled Manpower */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">
                                                4.5 Do you have the skilled manpower required to achieve your vision or goal?
                                            </label>
                                            <div className="flex flex-col gap-3">
                                                {[
                                                    { value: 'yes', label: 'Yes' },
                                                    { value: 'no', label: 'No' }
                                                ].map((option) => (
                                                    <label key={option.value} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                                        <input
                                                            className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                                            type="radio"
                                                            name="hasSkilledManpower"
                                                            value={option.value}
                                                            checked={goalVisionData.hasSkilledManpower === option.value}
                                                            onChange={(e) => setGoalVisionData({...goalVisionData, hasSkilledManpower: e.target.value})}
                                                        />
                                                        <span className="text-slate-700 font-medium">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
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
                
                /* Custom slider styling */
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 24px;
                    width: 24px;
                    border-radius: 50%;
                    background: #2563eb;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                }
                
                .slider::-moz-range-thumb {
                    height: 24px;
                    width: 24px;
                    border-radius: 50%;
                    background: #2563eb;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                }
            `}</style>
        </div>
    );
};

export default VisionAndGoal;