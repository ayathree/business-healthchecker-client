import { FaArrowRight } from "react-icons/fa";
import { calculateHeartScores } from "../utility/heart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


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
       
        const mainTotals=heartScore.mainTotal
        console.log(mainTotals);
         const totalPoints = heartScore.totalPoints 
       
        // Save to localStorage
      localStorage.setItem('businessHealthReport-Product', JSON.stringify({ 
        
        heartScore,
       
        totalPoints,
        mainTotals,
        
        
       
      }));
       navigate('/productScore');
        
       
        console.log(heartScore);
       
        console.log(totalPoints);
        
      };
      const handleHeartInputChange = (e) => {
    const { name, value } = e.target;
    setHeartData(prev => ({
      ...prev,
      [name]: value
    }));
  }
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
                        {/* part 7 */}
                             <div className="flex flex-col items-start justify-center gap-4">
                       <p className="text-xl font-semibold text-blue-500 mt-10">7. Product (Heart)</p>
                       <p className="text-lg font-semibold text-blue-500">No matter what else you do, in the end, it is your product that builds a relationship with your customer. If the product is not right, all your efforts and investments can fail. Therefore, create your product in such a way that your customers can be 100% satisfied.</p>
                       
                      {/* 6.1 Unique Features */}
                            <label className="font-semibold">
                              7.1 Does your product have any unique features that your competitors' products do not?
                              (Quality, price, packaging, convenience, features — it can be anything.)
                            </label>
                            <select
                              value={heartData.uniqueFeatures}
                              onChange={handleHeartInputChange}
                              name="uniqueFeatures" 
                              className="outline-2 p-2 w-1/2"
                            >
                              <option value="">Select</option>
                              <option value="yes">Yes, it does.</option>
                              <option value="no">No, it does not. I have not been able to make anything unique yet.</option>
                            </select>
                      
                            {/* 6.2 Customer Satisfaction */}
                            <label className="font-semibold">
                              7.2 Do you believe your product is able to meet the needs of your target customers?
                              (Are customers 100% satisfied?)
                            </label>
                            <select
                              value={heartData.customerSatisfaction}
                              onChange={handleHeartInputChange}
                              name="customerSatisfaction"
                              className="outline-2 p-2 w-1/2"
                            >
                              <option value="">Select</option>
                              <option value="yes">Yes, it is capable.</option>
                              <option value="somewhat">Customers are somewhat satisfied, but there is room for improvement.</option>
                              <option value="no">No, we are not getting good reviews from customers.</option>
                            </select>
                      
                            {/* 6.3 Packaging Branding */}
                            <label className="font-semibold">
                              7.3 Does your product packaging represent your brand?
                              (When sending the product, do you use custom-designed packets, shopping bags, etc.?)
                            </label>
                            <select
                              value={heartData.packagingBranding}
                              onChange={handleHeartInputChange}
                              name="packagingBranding"
                              className="outline-2 p-2 w-1/2"
                            >
                              <option value="">Select</option>
                              <option value="custom">Yes, all my products are sent with custom packaging.</option>
                              <option value="stickers">I only use stickers with my own brand.</option>
                              <option value="market">No, I buy packets from the market and send products in them.</option>
                            </select>
                      
                            {/* 6.4 Pricing Policy */}
                            <label className="font-semibold">
                              7.4 Does your product follow a smart pricing policy?
                              (Have you created a pricing strategy that supports your main action plan?)
                            </label>
                            <select
                              value={heartData.pricingPolicy}
                              onChange={handleHeartInputChange}
                              name="pricingPolicy"
                              className="outline-2 p-2 w-1/2"
                            >
                              <option value="">Select</option>
                              <option value="smart">Yes, we follow a smart pricing policy.</option>
                              <option value="costPlus">We price products based on cost plus a profit margin.</option>
                              <option value="no">No, we do not have a strategic pricing policy.</option>
                            </select>
                      
                            {/* 6.5 Date Labeling */}
                            <label className="font-semibold">
                              7.5 Does your product include a manufacturing date and expiration date on the label?
                            </label>
                            <select
                              value={heartData.dateLabeling}
                              onChange={handleHeartInputChange}
                              name="dateLabeling"
                              className="outline-2 p-2 w-1/2"
                            >
                              <option value="">Select</option>
                              <option value="yes">Yes, it does.</option>
                              <option value="never">My product never expires.</option>
                              <option value="no">No, it does not.</option>
                            </select>
                       
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

export default Product;