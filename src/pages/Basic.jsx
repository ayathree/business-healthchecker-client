import { Zoom } from "react-awesome-reveal";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import logo from '../assets/logo.png'

const Basic = () => {
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const organization = form.organization.value;
        const position = form.position.value;
        const service = form.service.value;
        const address = form.address.value;
        const number = form.number.value;
        const year = form.year.value;
        const info = { name, position, organization, service, address, number, year };
        
        localStorage.setItem('businessHealthReport-Basic', JSON.stringify({ 
            info,
            timestamp: new Date().toISOString()
        }));
        navigate('/position');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-slate-200/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute bottom-10 left-20 w-72 h-72 bg-blue-50/50 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
            
            <div className="relative z-10">
                <Link to={'/'}><div className="flex justify-center items-center pt-8 cursor-pointer">
                   <img src={logo} alt="" className="h-[200px] w-[300px]" />
                </div></Link>
                
                <div className="mt-8">
                    <p className="text-2xl text-center font-bold capitalize text-slate-800">Basic Information</p>
                    <div className="flex justify-center items-center mb-10">
                        <TypeAnimation
                            sequence={[
                                "Please provide detailed information about your business.",
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
                                    
                                    <div className="flex flex-col items-start justify-center gap-6">
                                        {/* Form Fields with Glass Inputs */}
                                        <div className="w-full">
                                            <label htmlFor="name" className="font-semibold text-lg text-slate-800 block mb-2">1.1 Your Name:</label>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                                                placeholder="Enter your full name"
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="w-full">
                                            <label htmlFor="organization" className="font-semibold text-lg text-slate-800 block mb-2">1.2 Name of the Organization:</label>
                                            <input 
                                                type="text" 
                                                name="organization" 
                                                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                                                placeholder="Enter organization name"
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="w-full">
                                            <label htmlFor="position" className="font-semibold text-lg text-slate-800 block mb-2">1.3 Your Designation/Position:</label>
                                            <input 
                                                type="text" 
                                                name="position" 
                                                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                                                placeholder="Enter your position"
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="w-full">
                                            <label htmlFor="service" className="font-semibold text-lg text-slate-800 block mb-2">1.4 What type of product or service do you provide?</label>
                                            <input 
                                                type="text" 
                                                name="service" 
                                                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                                                placeholder="Describe your product/service"
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="w-full">
                                            <label htmlFor="address" className="font-semibold text-lg text-slate-800 block mb-2">1.5 Business Address:</label>
                                            <input 
                                                type="text" 
                                                name="address" 
                                                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                                                placeholder="Enter business address"
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="w-full">
                                            <label htmlFor="number" className="font-semibold text-lg text-slate-800 block mb-2">1.6 Phone Number:</label>
                                            <input 
                                                type="text" 
                                                name="number" 
                                                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                                                placeholder="Enter phone number"
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="w-full">
                                            <label htmlFor="year" className="font-semibold text-lg text-slate-800 block mb-2">1.7 Business Start Date or Year:</label>
                                            <input 
                                                type="text" 
                                                name="year" 
                                                className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                                                placeholder="Enter start year/date"
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Glass Morphism Button */}
                            <div className="mt-8 flex justify-center items-center mb-10">
                                <button className="relative group/btn overflow-hidden bg-gradient-to-r from-blue-600/90 to-blue-700/90 backdrop-blur-sm text-white font-bold text-lg cursor-pointer capitalize p-4 w-full max-w-md rounded-xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 flex justify-center items-center gap-3 hover:from-blue-700 hover:to-blue-800">
                                    <span className="relative z-10">Next</span>
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

export default Basic;