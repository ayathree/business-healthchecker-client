import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { calculateBloodTestScores } from "../utility/bloodTest";
import { useNavigate } from "react-router-dom";


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
       <div className="bg-blue-50">
                    <div className="flex justify-center items-center">
       
                   <img src="https://i.ibb.co.com/KzWNyxsQ/Chat-GPT-Image-Sep-1-2025-11-23-34-AM.png" alt="" className="h-[200px] w-[300px]" />
                 </div>
                   <div className="mt-16 ">
                       <p className="text-xl text-center font-bold capitalize mt-2">please fill up this form</p>
                       <div className="flex justify-center items-center mt-2">
                               <form onSubmit={handleSubmit} action="" className="">
                             <div className=" border-2 border-blue-500 w-[70vw] h-100% py-10 px-20  mt-2 ">
                           {/* part 6 */}
                             <div className="flex flex-col items-start justify-center gap-4">
                       <p className="text-xl font-semibold text-red-800 mt-10">6. Blood Test (Finance / Productivity / Growth)</p>
                       <p className="text-lg font-semibold text-red-800">Profit in business is like blood. If you keep making a loss every month, your business will suffer from "anemia." If this situation continues for a long time, the business will eventually weaken and shut down.</p>
                       
                       <label className="font-semibold">6.1 What is your average monthly sales revenue?(Please provide the average of your total sales for the last three months.)</label>
                       <input 
                         type="number" 
                         value={bloodTestFormData.avgMonthlyRevenue} 
                         onChange={handleBloodTestInputChange} 
                         name="avgMonthlyRevenue" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">6.2 What is your gross profit margin on sold products?(Selling Price − (Purchase Price + Packaging + Shipping). Write as a percentage.)</label>
                       <input 
                         type="number" 
                         value={bloodTestFormData.grossProfitMargin} 
                         onChange={handleBloodTestInputChange} 
                         name="grossProfitMargin" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">6.3 What is your organization's monthly fixed cost? (excluding your own salary)(Office rent + utilities + staff salaries, etc. — expenses that must be paid every month.)</label>
                       <input 
                         type="number" 
                         value={bloodTestFormData.monthlyFixedCost} 
                         onChange={handleBloodTestInputChange} 
                         name="monthlyFixedCost" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">6.4 Do you have any loans?</label>
                       <select 
                         value={bloodTestFormData.hasLoan} 
                         onChange={handleBloodTestInputChange} 
                         name="hasLoan" 
                         className="outline-2 p-2 w-1/2"
                       >
                         <option value="">Select</option>
                         <option value="yes">Yes</option>
                         <option value="no">No</option>
                       </select>
                       
                       {bloodTestFormData.hasLoan === 'yes' && (
                         <>
                           <label className="font-semibold">If yes, what is the monthly installment amount?</label>
                           <input 
                             type="number" 
                             value={bloodTestFormData.loanInstallment} 
                             onChange={handleBloodTestInputChange} 
                             name="loanInstallment" 
                             className="outline-2 p-2 w-1/2" 
                           />
                         </>
                       )}
                       
                       <label className="font-semibold">6.5 How much salary or honorarium do you take?</label>
                       <input 
                         type="number" 
                         value={bloodTestFormData.ownerSalary} 
                         onChange={handleBloodTestInputChange} 
                         name="ownerSalary" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">6.6 What is your organization's daily production capacity for your main product?(How much of the product can you produce per day?)</label>
                       <input 
                         type="number" 
                         value={bloodTestFormData.dailyProduction} 
                         onChange={handleBloodTestInputChange} 
                         name="dailyProduction" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">6.7 Total amount of your investment:(How much capital have you invested so far? (Do not include reinvested profit from the business.))</label> 
                       <input 
                         type="number" 
                         value={bloodTestFormData.totalInvestment} 
                         onChange={handleBloodTestInputChange} 
                         name="totalInvestment" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">6.8 What is the current total value of your organization's assets?(Include machinery, technology, goodwill, etc.)</label>
                       <input 
                         type="number" 
                         value={bloodTestFormData.totalAssets} 
                         onChange={handleBloodTestInputChange} 
                         name="totalAssets" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">6.9 In 2021 (Q4) (Oct'21 - Dec'21), how many total customers purchased products?(Total number of customers over 3 months. If the same customer bought multiple times, count each purchase separately.)</label>
                       <input 
                         type="number" 
                         value={bloodTestFormData.customersQ4_2021} 
                         onChange={handleBloodTestInputChange} 
                         name="customersQ4_2021" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">6.10 In {currentYear} (Q1) (Jan'{currentYear.toString().slice(-2)} - Mar'{currentYear.toString().slice(-2)}), how many total customers purchased products?  (Total number of customers over 3 months. If the same customer bought multiple times, count each purchase separately.)</label>
                       <input 
                         type="number" 
                         value={bloodTestFormData.customersQ1_2025} 
                         onChange={handleBloodTestInputChange} 
                         name="customersQ1_2025" 
                         className="outline-2 p-2 w-1/2" 
                       />
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

export default BloodTest;