import { useState } from "react";
import { calculateStrengthScores } from "../utility/strength";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";


const StrengthStrategy = () => {
     const [strengthFormData, setStrengthFormData] = useState({
        employeeCount: '',
        skillLevel: 5, // Default to middle value
        operationalResilience: '',
        marketingPlan: '',
        usesSoftware: ''
      });

      const navigate=useNavigate()

     const handleSubmit = (e) => {
         e.preventDefault();
        
         const strengthScore = calculateStrengthScores(strengthFormData);
         
         const mainStrengthTotals=strengthScore.mainStrengthTotal
         console.log(mainStrengthTotals);
          const totalStrengthPoints = strengthScore.totalStrengthPoints
        
         // Save to localStorage
       localStorage.setItem('businessHealthReport-Strength', JSON.stringify({ 
        
         strengthScore,
         
         totalStrengthPoints,
         mainStrengthTotals,
        
         timestamp: new Date().toISOString() // Optional: add timestamp
       }));
        navigate('/strengthScore');
         
       
         console.log(strengthScore);
        
         console.log(totalStrengthPoints);
         
       };
       
     const handleChange = (e) => {
    const { name, value } = e.target;
    setStrengthFormData(prev => ({
      ...prev,
      [name]: name === 'skillLevel' ? parseInt(value) : value
    }));
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
                                   {/* part 5 */}
                             <div className="flex flex-col items-start justify-center gap-4">
                              <p className="text-xl font-semibold text-[#803232] mt-10">5. Strength (Employees / System / Strategy)</p>
                        <p className="text-lg font-semibold text-[#803232]">For any organization to achieve its goals, the first requirement is the right strategy, and skilled manpower to execute it. Tell us about your organization’s strategy and workforce.</p>
                        <label className="font-semibold">5.1 How many employees do you have in your organization? (excluding yourself)</label>
                         <input 
                          type="number" 
                          name="employeeCount"
                          value={strengthFormData.employeeCount}
                          onChange={handleChange}
                          className="border rounded-lg p-2 w-full md:w-1/2"
                          min="0"
                        />
                         <label className="font-semibold">5.2 Rate the skill level of your employees.</label>
                             <div className="flex items-center gap-4 w-full md:w-1/2">
                              <span className="text-sm text-gray-500">1 (Low)</span>
                              <input
                                type="range"
                                name="skillLevel"
                                min="1"
                                max="10"
                                value={strengthFormData.skillLevel}
                                onChange={handleChange}
                                className="flex-1"
                              />
                              <span className="text-sm text-gray-500">10 (High)</span>
                            </div>
                            <div className="text-center mt-1 text-blue-600 font-medium">
                              Current: {strengthFormData.skillLevel}/10
                            </div>
                         <label className="font-semibold">5.3 In your absence, can your organization operate without any disruption?</label>
                         <div className="space-y-2">
                           {[
                             { value: "yes", label: "Yes, it can run without any problem", score: 3 },
                             { value: "somewhat", label: "It can run to some extent, but not for long", score: 1 },
                             { value: "no", label: "No, without me the organization would shut down", score: 0 }
                           ].map((option) => (
                             <label key={option.value} className="flex items-center gap-2">
                               <input
                                 type="radio"
                                 name="operationalResilience"
                                 value={option.value}
                                 checked={strengthFormData.operationalResilience === option.value}
                                 onChange={handleChange}
                                 className="h-4 w-4"
                               />
                               {option.label}
                             </label>
                           ))}
                         </div>
                         <label className="font-semibold">5.4 Does your organization follow any strategic marketing plan?</label> 
                         <div className="space-y-2">
                            {[
                              { value: "yes", label: "Yes, everything is done according to the plan", score: 3 },
                              { value: "no", label: "No, we do not follow any strategic planning in that way", score: 1 },
                              { value: "none", label: "No strategic marketing plan has been created", score: 0 }
                            ].map((option) => (
                              <label key={option.value} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name="marketingPlan"
                                  value={option.value}
                                  checked={strengthFormData.marketingPlan === option.value}
                                  onChange={handleChange}
                                  className="h-4 w-4"
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>

                         <label className="font-semibold">5.5 Do you use any software to manage your organization?</label>
                        <div className="space-y-2">
                                  {[
                                    { value: "yes", label: "Yes, we use software", score: 3 },
                                    { value: "no", label: "No, we do not use any software", score: 0 }
                                  ].map((option) => (
                                    <label key={option.value} className="flex items-center gap-2">
                                      <input
                                        type="radio"
                                        name="usesSoftware"
                                        value={option.value}
                                        checked={strengthFormData.usesSoftware === option.value}
                                        onChange={handleChange}
                                        className="h-4 w-4"
                                      />
                                      {option.label}
                                    </label>
                                  ))}
                                </div>
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

export default StrengthStrategy;