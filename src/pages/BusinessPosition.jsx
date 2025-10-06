import { useState } from "react";
import { Zoom } from "react-awesome-reveal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { calculateInfrastructureScores } from "../utility/status";
import logo from '../assets/logo.png'
import { TypeAnimation } from "react-type-animation";

const BusinessPosition = () => {
    const navigate = useNavigate()
   
    const [statusData, setStatusData] = useState({
        tradeLicense: '',
        bankAccount: '',
        officeShowroom: '',
        website: '',
        socialMedia: [],
        marketplace: ''
    }); 

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const statusScore = calculateInfrastructureScores(statusData)
        const mainPositionTotals = statusScore.mainPositionTotal 
        const totalPositionPoints = statusScore.totalPositionPoints 
        
        // Save to localStorage
        localStorage.setItem('businessHealthReport-BusinessPosition', JSON.stringify({ 
            statusScore,
            totalPositionPoints,
            mainPositionTotals,
        }));
        navigate('/positionScore');
    };

    const socialMediaOptions = [
        'Facebook', 'Instagram', 'WhatsApp', 'TikTok',
        'YouTube', 'Twitter', 'LinkedIn', 'Pinterest'
    ]; 
      
    const handleStatusChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            setStatusData(prev => ({
                ...prev,
                socialMedia: checked
                ? [...prev.socialMedia, value]
                : prev.socialMedia.filter(item => item !== value)
            }));
        } else {
            setStatusData(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden ">
            {/* Background decorative elements */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-slate-200/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute bottom-10 left-20 w-72 h-72 bg-blue-50/50 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
            
            <div className="relative z-10">
                {/* Header Section */}
                <Link to={'/'}><div className="flex justify-center items-center pt-8 cursor-pointer">
                <img src={logo} alt="" className="h-[200px] w-[300px]" />
                </div></Link>

                <div className="mt-8">
                    <p className="text-2xl text-center font-bold capitalize text-slate-800">Business Position/Status</p>
                    <div className="flex justify-center items-center mb-10">
                        <TypeAnimation
                            sequence={[
                                "Business legal documents, positioning, and related information.",
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
                                        {/* 2.1 Trade License */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">2.1 Do you have a trade license?</label>
                                            <div className="flex flex-col gap-3">
                                                {['Yes', 'No', 'Yes, but it is not updated'].map(option => (
                                                    <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                                        <input
                                                            className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                                            type="radio"
                                                            name="tradeLicense"
                                                            value={option}
                                                            checked={statusData.tradeLicense === option}
                                                            onChange={handleStatusChange}
                                                        />
                                                        <span className="text-slate-700 font-medium">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 2.2 Bank Account */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">2.2 Do you have a bank account in the name of the organization?</label>
                                            <div className="flex flex-col gap-3">
                                                {['Yes', 'No'].map(option => (
                                                    <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                                        <input
                                                            className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                                            type="radio"
                                                            name="bankAccount"
                                                            value={option}
                                                            checked={statusData.bankAccount === option}
                                                            onChange={handleStatusChange}
                                                        />
                                                        <span className="text-slate-700 font-medium">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 2.3 Office/Showroom */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">2.3 Do you have an offline office or showroom?</label>
                                            <div className="flex flex-col gap-3">
                                                {['Yes', 'No'].map(option => (
                                                    <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                                        <input
                                                            className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                                            type="radio"
                                                            name="officeShowroom"
                                                            value={option}
                                                            checked={statusData.officeShowroom === option}
                                                            onChange={handleStatusChange}
                                                        />
                                                        <span className="text-slate-700 font-medium">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 2.4 Website */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">2.4 Do you have a website?</label>
                                            <div className="flex flex-col gap-3">
                                                {['Yes', 'No'].map(option => (
                                                    <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                                        <input
                                                            className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                                            type="radio"
                                                            name="website"
                                                            value={option}
                                                            checked={statusData.website === option}
                                                            onChange={handleStatusChange}
                                                        />
                                                        <span className="text-slate-700 font-medium">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 2.5 Social Media (Checkbox) */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">2.5 On which social media platforms does your business have an account?</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {socialMediaOptions.map(platform => (
                                                    <label key={platform} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                                        <input
                                                            className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                                            type="checkbox"
                                                            name="socialMedia"
                                                            value={platform}
                                                            checked={statusData.socialMedia.includes(platform)}
                                                            onChange={handleStatusChange}
                                                        />
                                                        <span className="text-slate-700 font-medium">{platform}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 2.6 Marketplace */}
                                        <div className="w-full">
                                            <label className="font-semibold text-lg text-slate-800 block mb-4">2.6 Do you have an account on Daraz or similar marketplaces?</label>
                                            <div className="flex flex-col gap-3">
                                                {['Yes', 'No'].map(option => (
                                                    <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                                        <input
                                                            className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                                            type="radio"
                                                            name="marketplace"
                                                            value={option}
                                                            checked={statusData.marketplace === option}
                                                            onChange={handleStatusChange}
                                                        />
                                                        <span className="text-slate-700 font-medium">{option}</span>
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
            `}</style>
        </div>
    );
};

export default BusinessPosition;