import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { calculateMarketScores } from '../utility/scoreCalculation';
import { useNavigate } from 'react-router-dom';

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
        
        
        const mainTotals=scores.mainTotal
        console.log(mainTotals);
         const totalPoints = scores.totalPoints
        
        // Save to localStorage
      localStorage.setItem('businessHealthReport-MarketScope', JSON.stringify({ 
       
        scores, 
        
        totalPoints,
        mainTotals,
       
      }));
       navigate('/marketScore');
        
      
        console.log(scores);
        
        console.log(totalPoints);
        
      };
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
                       {/* part 3 */}
                            <div className="flex flex-col items-start justify-center gap-4">
                              <p className="text-xl font-semibold text-orange-400 mt-10">3. Examining the Eyes, Ears, and Mouth of the Organization (Market & Customer)</p>
                        <p className="text-lg font-semibold text-orange-400">Who is your ideal customer? Which market is ideal for you?</p>
                        <p  className="text-lg text-orange-400">Keep in mind that someone who tries to make a product for everyone, ends up making it for no one.Identify and understand your ideal customer.</p>
                            <label className="font-semibold">3.1 Where is your product's potential market?</label>
                           <div className="flex flex-col gap-2">
                              <label>
                                <input
                                  type="radio"  // Use radio for single selection
                                  name="marketScope"  // Same name for grouping
                                  value="1"
                                  checked={formData.marketScope === "1"}
                                  onChange={(e) => setFormData({...formData, marketScope: e.target.value})}
                                  className="mr-2"
                                />
                                Regional market
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="marketScope"
                                  value="2"
                                  checked={formData.marketScope === "2"}
                                  onChange={(e) => setFormData({...formData, marketScope: e.target.value})}
                                  className="mr-2"
                                />
                                National market
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="marketScope"
                                  value="3"
                                  checked={formData.marketScope === "3"}
                                  onChange={(e) => setFormData({...formData, marketScope: e.target.value})}
                                  className="mr-2"
                                />
                                International market
                              </label>
                            </div>
                            <label htmlFor="" className="font-semibold">3.2 Approximately how many customers exist in your potential market?(Enter estimated number in thousands/lakhs)</label>
                            <input type="number" value={formData.marketSize} onChange={(e) => setFormData({...formData, marketSize: e.target.value})} name="" id="" className="outline-2 p-2 w-1/2"  />
                            <label className="font-semibold">3.3 Is your market expanding or contracting?</label>
                            <div className="flex flex-col gap-2">
                              <label>
                                <input
                                  type="radio"
                                  name="marketTrend"
                                  value="3"
                                  checked={formData.marketTrend === "3"}
                                  onChange={(e) => setFormData({...formData, marketTrend: e.target.value})}
                                  className="mr-2"
                                />
                                Expanding market
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="marketTrend"
                                  value="2"
                                  checked={formData.marketTrend === "2"}
                                  onChange={(e) => setFormData({...formData, marketTrend: e.target.value})}
                                  className="mr-2"
                                />
                                Stable market
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="marketTrend"
                                  value="1"
                                  checked={formData.marketTrend === "1"}
                                  onChange={(e) => setFormData({...formData, marketTrend: e.target.value})}
                                  className="mr-2"
                                />
                                Contracting market
                              </label>
                            </div>
                            <label className="font-semibold">3.4 Have you identified your target customer profile?</label>
                            <div className="flex flex-col gap-2">
                              <label>
                                <input
                                  type="radio"
                                  name="targetCustomer"
                                  value="3"
                                  checked={formData.targetCustomer === "3"}
                                  onChange={(e) => setFormData({...formData, targetCustomer: e.target.value})}
                                  className="mr-2"
                                />
                                Yes, I've identified my potential customers
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="targetCustomer"
                                  value="1"
                                  checked={formData.targetCustomer === "1"}
                                  onChange={(e) => setFormData({...formData, targetCustomer: e.target.value})}
                                  className="mr-2"
                                />
                                Everyone is my customer
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="targetCustomer"
                                  value="0"
                                  checked={formData.targetCustomer === "0"}
                                  onChange={(e) => setFormData({...formData, targetCustomer: e.target.value})}
                                  className="mr-2"
                                />
                                Don't know how to identify customers
                              </label>
                            </div>
                            <label htmlFor="" className="font-semibold">3.5 Average number of customers purchasing your product monthly?(Enter approximate number)</label>
                            <input type="number" value={formData.monthlyCustomers} onChange={(e) => setFormData({...formData, monthlyCustomers: e.target.value})} name="" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">3.6 What percentage of your monthly customers are repeat buyers?</label>
                            <input type="text" value={formData.repeatCustomers} onChange={(e) => setFormData({...formData, repeatCustomers: e.target.value})} name="" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">3.7 How many competitors operate in your potential market?(Enter number of businesses selling similar products)</label>
                            <input type="number" value={formData.competitors} onChange={(e) => setFormData({...formData, competitors: e.target.value})} name="" id="" className="outline-2 p-2 w-1/2"  />
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

export default Market;