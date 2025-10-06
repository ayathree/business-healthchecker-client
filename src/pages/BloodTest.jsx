import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { calculateBloodTestScores } from "../utility/bloodTest";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import { TypeAnimation } from "react-type-animation";


const BloodTest = () => {
    const navigate=useNavigate()
    const currentYear = new Date().getFullYear();
   const [bloodTestFormData, setBloodTestFormData] = useState({
       avgMonthlyRevenue: '',
       grossProfitMargin: '',
       monthlyFixedCost: '',
       hasLoan: '',
       loanInstallment: '',
       ownerSalary: '',
       dailyProduction: '',
       totalInvestment: '',
       totalAssets: '',
       customersQ4_2021: '',
       customersQ1_2025: ''
     }); 

     const handleSubmit = (e) => {
         e.preventDefault();
         
         const bloodTestScore= calculateBloodTestScores(bloodTestFormData);
        
         const mainBloodTestTotals= bloodTestScore.mainBloodTestTotal 
         console.log(mainBloodTestTotals);
          const totalBloodTestPoints = bloodTestScore.totalBloodTestPoints
         
         // Save to localStorage
       localStorage.setItem('businessHealthReport-BloodTest', JSON.stringify({ 
         
         bloodTestScore,
         
         totalBloodTestPoints,
         mainBloodTestTotals,
         
         
         
       }));
        navigate('/bloodTestScore');
         
        
         console.log(bloodTestScore);
        
         console.log(totalBloodTestPoints);
         
       };


     const handleBloodTestInputChange = (e) => {
    const { name, value } = e.target;
    setBloodTestFormData(prev => ({ ...prev, [name]: value }));
  };
  
  
    return (
       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
         {/* Background decorative elements */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-slate-200/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute bottom-10 left-20 w-72 h-72 bg-blue-50/50 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
                    <div className="relative z-10">
                  <Link to={'/'}> <div className="flex justify-center items-center pt-8">
                   <img src={logo} alt="" className="h-[200px] w-[300px]" />
                </div></Link>
                   <div className="mt-8">
                       <p className="text-2xl text-center font-bold capitalize text-slate-800">Blood Test (Finance / Productivity / Growth)</p>
                       <div className="flex justify-center items-center mb-10">
                        <TypeAnimation
                            sequence={[
                                "Profit in business is like blood. If you keep making a loss every month, your business will suffer from 'anemia' If this situation continues for a long time, the business will eventually weaken and shut down.",
                                500,
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
                             <div className=" relative group">
                               {/* Animated Gradient Border */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/40 via-slate-400/30 to-blue-600/40 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                                {/* Glass Morphism Form */}
                                <div className="relative p-8 bg-white/80 backdrop-blur-lg rounded-xl border border-white/40 shadow-2xl">
                                    {/* Floating particles effect */}
                                    <div className="absolute top-2 left-2 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"></div>
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-slate-400/60 rounded-full animate-ping delay-300"></div>
                                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-400/60 rounded-full animate-ping delay-700"></div>
                                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-slate-400/60 rounded-full animate-ping delay-1000"></div>
                           {/* part 6 */}
                             <div className="flex flex-col items-start justify-center gap-6">
                       {/* Form Fields with Glass Inputs */}
                       <div className="w-full">
                      <label className="font-semibold text-lg text-slate-800 block mb-2">6.1 What is your average monthly sales revenue?(Please provide the average of your total sales for the last three months.)</label>
                      <input 
                         type="number" 
                         value={bloodTestFormData.avgMonthlyRevenue} 
                         onChange={handleBloodTestInputChange} 
                         name="avgMonthlyRevenue" 
                         className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner" 
                         placeholder="provide the average"
                       />

                       </div>
                       <div className="w-full">
                        <label className="font-semibold text-lg text-slate-800 block mb-2">6.2 What is your gross profit margin on sold products?(Selling Price − (Purchase Price + Packaging + Shipping). Write as a percentage.)</label>
                       <input 
                         type="number" 
                         value={bloodTestFormData.grossProfitMargin} 
                         onChange={handleBloodTestInputChange} 
                         name="grossProfitMargin" 
                         className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner" 
                         placeholder="write as a percentage"
                       />

                       </div>
                       <div className="w-full">
                       <label className="font-semibold text-lg text-slate-800 block mb-2">6.3 What is your organization's monthly fixed cost? (excluding your own salary)(Office rent + utilities + staff salaries, etc. — expenses that must be paid every month.)</label>
                       <input 
                         type="number" 
                         value={bloodTestFormData.monthlyFixedCost} 
                         onChange={handleBloodTestInputChange} 
                         name="monthlyFixedCost" 
                         className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner" 
                         placeholder="organization's monthly fixed cost"
                       />
                       </div>
                       <div className="w-full">
                       <label className="font-semibold text-lg text-slate-800 block mb-2">6.4 Do you have any loans?</label>
                       <select 
                         value={bloodTestFormData.hasLoan} 
                         onChange={handleBloodTestInputChange} 
                         name="hasLoan" 
                         className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                       >
                         <option value="">Select</option>
                         <option value="yes">Yes</option>
                         <option value="no">No</option>
                       </select>
                       
                       {bloodTestFormData.hasLoan === 'yes' && (
                         <>
                           <label className="font-semibold text-lg text-slate-800 block mb-2">If yes, what is the monthly installment amount?</label>
                           <input 
                             type="number" 
                             value={bloodTestFormData.loanInstallment} 
                             onChange={handleBloodTestInputChange} 
                             name="loanInstallment" 
                             className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner" 
                           />
                         </>
                       )}
                       </div>
                       <div className="w-full">
                       <label className="font-semibold text-lg text-slate-800 block mb-2">6.5 How much salary or honorarium do you take?</label>
                       <input 
                         type="number" 
                         value={bloodTestFormData.ownerSalary} 
                         onChange={handleBloodTestInputChange} 
                         name="ownerSalary" 
                         className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner" 
                         placeholder="your salary or honorarium"
                       />
                       </div>
                       <div className="w-full">
                         <label className="font-semibold text-lg text-slate-800 block mb-2">6.6 What is your organization's daily production capacity for your main product?(How much of the product can you produce per day?)</label>
                       <input 
                         type="number" 
                         value={bloodTestFormData.dailyProduction} 
                         onChange={handleBloodTestInputChange} 
                         name="dailyProduction" 
                         className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner" 
                         placeholder="product can you produce per day"
                       />
                       </div>
                       <div className="w-full">
                       <label className="font-semibold text-lg text-slate-800 block mb-2">6.7 Total amount of your investment:(How much capital have you invested so far? (Do not include reinvested profit from the business.))</label> 
                       <input 
                         type="number" 
                         value={bloodTestFormData.totalInvestment} 
                         onChange={handleBloodTestInputChange} 
                         name="totalInvestment" 
                         className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                         placeholder="capital you have invested" 
                       />
                       </div>
                       <div className="w-full">
                       <label className="font-semibold text-lg text-slate-800 block mb-2">6.8 What is the current total value of your organization's assets?(Include machinery, technology, goodwill, etc.)</label>
                       <input 
                         type="number" 
                         value={bloodTestFormData.totalAssets} 
                         onChange={handleBloodTestInputChange} 
                         name="totalAssets" 
                         className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner" 
                         placeholder=" current total value of organization's assets"
                       />
                       </div>
                       <div className="w-full">
                       <label className="font-semibold text-lg text-slate-800 block mb-2">6.9 In 2021 (Q4) (Oct'21 - Dec'21), how many total customers purchased products?(Total number of customers over 3 months. If the same customer bought multiple times, count each purchase separately.)</label>
                       <input 
                         type="number" 
                         value={bloodTestFormData.customersQ4_2021} 
                         onChange={handleBloodTestInputChange} 
                         name="customersQ4_2021" 
                         className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner" 
                         placeholder="Total number of customers"
                       />
                       </div>
                       <div className="w-full">
                       <label className="font-semibold text-lg text-slate-800 block mb-2">6.10 In {currentYear} (Q1) (Jan'{currentYear.toString().slice(-2)} - Mar'{currentYear.toString().slice(-2)}), how many total customers purchased products?  (Total number of customers over 3 months. If the same customer bought multiple times, count each purchase separately.)</label>
                       <input 
                         type="number" 
                         value={bloodTestFormData.customersQ1_2025} 
                         onChange={handleBloodTestInputChange} 
                         name="customersQ1_2025" 
                         className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner" 
                         placeholder="Total number of customers"
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

export default BloodTest;