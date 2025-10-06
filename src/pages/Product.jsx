import { FaArrowRight } from "react-icons/fa";
import { calculateHeartScores } from "../utility/heart";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from '../assets/logo.png'
import { TypeAnimation } from "react-type-animation";


const Product = () => {
    const navigate=useNavigate()
     const [heartData, setHeartData] = useState({
        uniqueFeatures: '',
        customerSatisfaction: '',
        packagingBranding: '',
        pricingPolicy: '',
        dateLabeling: '',
      });
    const handleSubmit = (e) => {
        e.preventDefault();
       
        const heartScore=calculateHeartScores(heartData)
       
        const mainProductTotals=heartScore.mainProductTotal
        console.log(mainProductTotals);
         const totalProductPoints = heartScore.totalProductPoints 
       
        // Save to localStorage
      localStorage.setItem('businessHealthReport-Product', JSON.stringify({ 
        
        heartScore,
       
        totalProductPoints,
        mainProductTotals,
        
        
       
      }));
       navigate('/productScore');
        
       
        console.log(heartScore);
       
        console.log(totalProductPoints);
        
      };
      const handleHeartInputChange = (e) => {
    const { name, value } = e.target;
    setHeartData(prev => ({
      ...prev,
      [name]: value
    }));
  }
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
                   <div className="mt-8 ">
                       <p className="text-2xl text-center font-bold capitalize text-slate-800">Product (Heart)</p>
                        <div className="flex justify-center items-center mb-10">
                        <TypeAnimation
                            sequence={[
                                "No matter what else you do, in the end, it is your product that builds a relationship with your customer. If the product is not right, all your efforts and investments can fail. Therefore, create your product in such a way that your customers can be 100% satisfied.",
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
                             <div className=" relative group ">
                              {/* Animated Gradient Border */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/40 via-slate-400/30 to-blue-600/40 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                                {/* Glass Morphism Form */}
                        {/* part 7 */}
                             <div className="relative p-8 bg-white/80 backdrop-blur-lg rounded-xl border border-white/40 shadow-2xl">
                             {/* Floating particles effect */}
                                    <div className="absolute top-2 left-2 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"></div>
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-slate-400/60 rounded-full animate-ping delay-300"></div>
                                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-400/60 rounded-full animate-ping delay-700"></div>
                                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-slate-400/60 rounded-full animate-ping delay-1000"></div>
                       <div className="flex flex-col items-start justify-center gap-6">
                        <div className="w-full">
                       {/* 6.1 Unique Features */}
                            <label className="font-semibold text-lg text-slate-800 block mb-2">
                              7.1 Does your product have any unique features that your competitors' products do not?
                              (Quality, price, packaging, convenience, features — it can be anything.)
                            </label>
                            <select
                              value={heartData.uniqueFeatures}
                              onChange={handleHeartInputChange}
                              name="uniqueFeatures" 
                              className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                            >
                              <option value="">Select</option>
                              <option value="yes">Yes, it does.</option>
                              <option value="no">No, it does not. I have not been able to make anything unique yet.</option>
                            </select>

                        </div>
                        <div className="w-full">
                           {/* 6.2 Customer Satisfaction */}
                            <label className="font-semibold text-lg text-slate-800 block mb-2">
                              7.2 Do you believe your product is able to meet the needs of your target customers?
                              (Are customers 100% satisfied?)
                            </label>
                            <select
                              value={heartData.customerSatisfaction}
                              onChange={handleHeartInputChange}
                              name="customerSatisfaction"
                              className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                            >
                              <option value="">Select</option>
                              <option value="yes">Yes, it is capable.</option>
                              <option value="somewhat">Customers are somewhat satisfied, but there is room for improvement.</option>
                              <option value="no">No, we are not getting good reviews from customers.</option>
                            </select>

                        </div>
                        <div className="w-full">
                            {/* 6.3 Packaging Branding */}
                            <label className="font-semibold text-lg text-slate-800 block mb-2">
                              7.3 Does your product packaging represent your brand?
                              (When sending the product, do you use custom-designed packets, shopping bags, etc.?)
                            </label>
                            <select
                              value={heartData.packagingBranding}
                              onChange={handleHeartInputChange}
                              name="packagingBranding"
                              className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                            >
                              <option value="">Select</option>
                              <option value="custom">Yes, all my products are sent with custom packaging.</option>
                              <option value="stickers">I only use stickers with my own brand.</option>
                              <option value="market">No, I buy packets from the market and send products in them.</option>
                            </select>

                        </div>
                        <div className="w-full">
                         {/* 6.4 Pricing Policy */}
                            <label className="font-semibold text-lg text-slate-800 block mb-2">
                              7.4 Does your product follow a smart pricing policy?
                              (Have you created a pricing strategy that supports your main action plan?)
                            </label>
                            <select
                              value={heartData.pricingPolicy}
                              onChange={handleHeartInputChange}
                              name="pricingPolicy"
                              className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                            >
                              <option value="">Select</option>
                              <option value="smart">Yes, we follow a smart pricing policy.</option>
                              <option value="costPlus">We price products based on cost plus a profit margin.</option>
                              <option value="no">No, we do not have a strategic pricing policy.</option>
                            </select>
                        </div>
                        <div className="w-full">
                         {/* 6.5 Date Labeling */}
                            <label className="font-semibold text-lg text-slate-800 block mb-2">
                              7.5 Does your product include a manufacturing date and expiration date on the label?
                            </label>
                            <select
                              value={heartData.dateLabeling}
                              onChange={handleHeartInputChange}
                              name="dateLabeling"
                              className="w-full p-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl outline-none focus:bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-slate-600 text-slate-800 shadow-inner"
                            >
                              <option value="">Select</option>
                              <option value="yes">Yes, it does.</option>
                              <option value="never">My product never expires.</option>
                              <option value="no">No, it does not.</option>
                            </select>

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

export default Product;