import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { calculateMarketScores } from '../utility/scoreCalculation';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { TypeAnimation } from 'react-type-animation';

const Market = () => {
    const navigate=useNavigate()
    const[formData,setFormData]=useState({
        marketScope: "",       // Multiple choice (1-3)
        marketSize: "",        // Numeric input
        marketTrend: "",       // Multiple choice (1-3)
        targetCustomer: "",    // Multiple choice (0-3)
        monthlyCustomers: "",  // Numeric input
        repeatCustomers: "",   // Percentage input
        competitors: "",        // Numeric input
    })
    
    const handleSubmit = (e) => {
        e.preventDefault();
       
        const scores = calculateMarketScores(formData);
        
        
        const mainMarketTotals=scores.mainMarketTotal
        console.log(mainMarketTotals);
         const totalMarketPoints = scores.totalMarketPoints
        
        // Save to localStorage
      localStorage.setItem('businessHealthReport-MarketScope', JSON.stringify({ 
       
        scores, 
        
        totalMarketPoints,
        mainMarketTotals,
       
      }));
       navigate('/marketScore');
        
      
        console.log(scores);
        
        console.log(totalMarketPoints);
        
      };
    return (
       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-slate-200/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute bottom-10 left-20 w-72 h-72 bg-blue-50/50 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
            <div className='relative z-10'>
              {/* Header Section */}
              <div className="flex justify-center items-center pt-8">
              <img src={logo} alt="" className="h-[200px] w-[300px]" />
              </div>

            </div>
             
            <div className="mt-8">
                <p className="text-2xl text-center font-bold capitalize text-slate-800">Examining the Eyes, Ears, and Mouth of the Organization (Market & Customer)
                 
                </p>
                <div className="flex justify-center items-center mb-10">
                        <TypeAnimation
                            sequence={[
                                "Who is your ideal customer? Which market is ideal for you?Keep in mind that someone who tries to make a product for everyone, ends up making it for no one.Identify and understand your ideal customer.",
                                500,
                                ""
                            ]}
                            wrapper="p"
                            speed={50}
                            style={{ fontSize: '1em' }}
                            className="text-slate-700 text-center font-medium"
                            repeat={Infinity}
                        />
                    </div>
                <div className="flex justify-center items-center mt-4 px-4">
                        <form onSubmit={handleSubmit} action="" className="w-full max-w-4xl">
                          {/* Glass Morphism Container with Animated Border */}
                      <div className="relative group">
                        {/* Animated Gradient Border */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/40 via-slate-400/30 to-blue-600/40 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                                {/* Glass Morphism Form */}
                       {/* part 3 */}
                            <div className="relative p-8 bg-white/80 backdrop-blur-lg rounded-xl border border-white/40 shadow-2xl">
                            {/* Floating particles effect */}
                                    <div className="absolute top-2 left-2 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"></div>
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-slate-400/60 rounded-full animate-ping delay-300"></div>
                                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-400/60 rounded-full animate-ping delay-700"></div>
                                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-slate-400/60 rounded-full animate-ping delay-1000"></div>
                             <div className='flex flex-col items-start justify-center gap-8'>
                              <div className='w-full'>
                                <label className="font-semibold text-lg text-slate-800 block mb-4">3.1 Where is your product's potential market?</label>
                           <div className="flex flex-col gap-2">
                              <label className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200'>
                                <input
                                  type="radio"  // Use radio for single selection
                                  name="marketScope"  // Same name for grouping
                                  value="1"
                                  checked={formData.marketScope === "1"}
                                  onChange={(e) => setFormData({...formData, marketScope: e.target.value})}
                                  className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                />
                                Regional market
                              </label>
                              <label className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200'>
                                <input
                                  type="radio"
                                  name="marketScope"
                                  value="2"
                                  checked={formData.marketScope === "2"}
                                  onChange={(e) => setFormData({...formData, marketScope: e.target.value})}
                                  className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                />
                                National market
                              </label>
                              <label className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200'>
                                <input
                                  type="radio"
                                  name="marketScope"
                                  value="3"
                                  checked={formData.marketScope === "3"}
                                  onChange={(e) => setFormData({...formData, marketScope: e.target.value})}
                                  className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                />
                                International market
                              </label>
                            </div>


                              </div>
                              <div className='w-full'>
                                 <label htmlFor="" className="font-semibold text-lg text-slate-800 block mb-2">3.2 Approximately how many customers exist in your potential market?(Enter estimated number in thousands/lakhs)</label>
                            <input type="number" value={formData.marketSize} onChange={(e) => setFormData({...formData, marketSize: e.target.value})} name="" id="" className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner" placeholder="Enter estimated number" />
                              </div>
                              <div className='w-full'>
                                <label className="font-semibold text-lg text-slate-800 block mb-4">3.3 Is your market expanding or contracting?</label>
                            <div className="flex flex-col gap-2">
                              <label className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200'>
                                <input
                                  type="radio"
                                  name="marketTrend"
                                  value="3"
                                  checked={formData.marketTrend === "3"}
                                  onChange={(e) => setFormData({...formData, marketTrend: e.target.value})}
                                  className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                />
                                Expanding market
                              </label>
                              <label className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200'>
                                <input
                                  type="radio"
                                  name="marketTrend"
                                  value="2"
                                  checked={formData.marketTrend === "2"}
                                  onChange={(e) => setFormData({...formData, marketTrend: e.target.value})}
                                  className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                />
                                Stable market
                              </label>
                              <label className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200'>
                                <input
                                  type="radio"
                                  name="marketTrend"
                                  value="1"
                                  checked={formData.marketTrend === "1"}
                                  onChange={(e) => setFormData({...formData, marketTrend: e.target.value})}
                                  className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                />
                                Contracting market
                              </label>
                            </div>
                              </div>
                              <div className='w-full'>
                                <label className="font-semibold text-lg text-slate-800 block mb-4">3.4 Have you identified your target customer profile?</label>
                            <div className="flex flex-col gap-2">
                              <label className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200'>
                                <input
                                  type="radio"
                                  name="targetCustomer"
                                  value="3"
                                  checked={formData.targetCustomer === "3"}
                                  onChange={(e) => setFormData({...formData, targetCustomer: e.target.value})}
                                  className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                />
                                Yes, I've identified my potential customers
                              </label>
                              <label className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200'>
                                <input
                                  type="radio"
                                  name="targetCustomer"
                                  value="1"
                                  checked={formData.targetCustomer === "1"}
                                  onChange={(e) => setFormData({...formData, targetCustomer: e.target.value})}
                                  className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                />
                                Everyone is my customer
                              </label>
                              <label className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200'>
                                <input
                                  type="radio"
                                  name="targetCustomer"
                                  value="0"
                                  checked={formData.targetCustomer === "0"}
                                  onChange={(e) => setFormData({...formData, targetCustomer: e.target.value})}
                                  className="w-5 h-5 text-blue-600 bg-white/80 border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                />
                                Don't know how to identify customers
                              </label>
                            </div>
                              </div>
                              <div className='w-full'>
                                <label htmlFor="" className="font-semibold text-lg text-slate-800 block mb-2">3.5 Average number of customers purchasing your product monthly?(Enter approximate number)</label>
                            <input type="number" value={formData.monthlyCustomers} onChange={(e) => setFormData({...formData, monthlyCustomers: e.target.value})} name="" id="" className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner" placeholder='Enter approximate number'  />

                              </div>
                              <div className='w-full'>
                                <label htmlFor="" className="font-semibold text-lg text-slate-800 block mb-2">3.6 What percentage of your monthly customers are repeat buyers?</label>
                            <input type="text" value={formData.repeatCustomers} onChange={(e) => setFormData({...formData, repeatCustomers: e.target.value})} name="" id="" className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner" placeholder='Enter Percentage'  />
                              </div>
                              <div className='w-full'>
                                <label htmlFor="" className="font-semibold text-lg text-slate-800 block mb-2">3.7 How many competitors operate in your potential market?(Enter number of businesses selling similar products)</label>
                            <input type="number" value={formData.competitors} onChange={(e) => setFormData({...formData, competitors: e.target.value})} name="" id="" className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner" placeholder='Enter number ' />


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

export default Market;