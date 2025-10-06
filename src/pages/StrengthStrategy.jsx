import { useState } from "react";
import { calculateStrengthScores } from "../utility/strength";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import logo from '../assets/logo.png'

const StrengthStrategy = () => {
    const [strengthFormData, setStrengthFormData] = useState({
        employeeCount: '',
        skillLevel: 5, // Default to middle value
        operationalResilience: '',
        marketingPlan: '',
        usesSoftware: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const strengthScore = calculateStrengthScores(strengthFormData);
        const mainStrengthTotals = strengthScore.mainStrengthTotal;
        const totalStrengthPoints = strengthScore.totalStrengthPoints;
        
        // Save to localStorage
        localStorage.setItem('businessHealthReport-Strength', JSON.stringify({ 
            strengthScore,
            totalStrengthPoints,
            mainStrengthTotals,
            timestamp: new Date().toISOString()
        }));
        navigate('/strengthScore');
    };
       
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStrengthFormData(prev => ({
            ...prev,
            [name]: name === 'skillLevel' ? parseInt(value) : value
        }));
    };  

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-slate-200/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute bottom-10 left-20 w-72 h-72 bg-blue-50/50 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
            
            <div className="relative z-10">
               <Link to={'/'}><div className="flex justify-center items-center pt-8">
                  <img src={logo} alt="" className="h-[200px] w-[300px]" />
               </div></Link>

                <div className="mt-8">
                    <p className="text-2xl text-center font-bold capitalize text-slate-800">Strength & Strategy Assessment</p>
                    <div className="flex justify-center items-center mb-10">
                        <TypeAnimation
                            sequence={[
                                "Evaluate your organization's workforce, systems, and strategic capabilities.",
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
                                      

                                        {/* 5.1 Employee Count */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">
                                                5.1 How many employees do you have in your organization? (excluding yourself)
                                            </label>
                                            <input 
                                                type="number" 
                                                name="employeeCount"
                                                value={strengthFormData.employeeCount}
                                                onChange={handleChange}
                                                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                                                placeholder="Enter number of employees"
                                                min="0"
                                            />
                                        </div>

                                        {/* 5.2 Skill Level */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">
                                                5.2 Rate the skill level of your employees.
                                            </label>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-slate-600 font-medium min-w-16">1 (Low)</span>
                                                    <input
                                                        type="range"
                                                        name="skillLevel"
                                                        min="1"
                                                        max="10"
                                                        value={strengthFormData.skillLevel}
                                                        onChange={handleChange}
                                                        className="flex-1 h-3 bg-white/60 rounded-lg appearance-none cursor-pointer slider"
                                                    />
                                                    <span className="text-slate-600 font-medium min-w-20">10 (High)</span>
                                                </div>
                                                <div className="text-center">
                                                    <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                                                        Current: {strengthFormData.skillLevel}/10
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 5.3 Operational Resilience */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">
                                                5.3 In your absence, can your organization operate without any disruption?
                                            </label>
                                            <div className="flex flex-col gap-3">
                                                {[
                                                    { value: "yes", label: "Yes, it can run without any problem" },
                                                    { value: "somewhat", label: "It can run to some extent, but not for long" },
                                                    { value: "no", label: "No, without me the organization would shut down" }
                                                ].map((option) => (
                                                    <label key={option.value} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                                        <input
                                                            className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                                            type="radio"
                                                            name="operationalResilience"
                                                            value={option.value}
                                                            checked={strengthFormData.operationalResilience === option.value}
                                                            onChange={handleChange}
                                                        />
                                                        <span className="text-slate-700 font-medium">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 5.4 Marketing Plan */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">
                                                5.4 Does your organization follow any strategic marketing plan?
                                            </label>
                                            <div className="flex flex-col gap-3">
                                                {[
                                                    { value: "yes", label: "Yes, everything is done according to the plan" },
                                                    { value: "no", label: "No, we do not follow any strategic planning in that way" },
                                                    { value: "none", label: "No strategic marketing plan has been created" }
                                                ].map((option) => (
                                                    <label key={option.value} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                                        <input
                                                            className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                                            type="radio"
                                                            name="marketingPlan"
                                                            value={option.value}
                                                            checked={strengthFormData.marketingPlan === option.value}
                                                            onChange={handleChange}
                                                        />
                                                        <span className="text-slate-700 font-medium">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 5.5 Software Usage */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">
                                                5.5 Do you use any software to manage your organization?
                                            </label>
                                            <div className="flex flex-col gap-3">
                                                {[
                                                    { value: "yes", label: "Yes, we use software" },
                                                    { value: "no", label: "No, we do not use any software" }
                                                ].map((option) => (
                                                    <label key={option.value} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                                        <input
                                                            className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                                            type="radio"
                                                            name="usesSoftware"
                                                            value={option.value}
                                                            checked={strengthFormData.usesSoftware === option.value}
                                                            onChange={handleChange}
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

export default StrengthStrategy;