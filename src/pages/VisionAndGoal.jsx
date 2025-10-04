import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { calculateVisionScores } from "../utility/goalAndVision";


const VisionAndGoal = () => {
    const navigate=useNavigate()
    const [goalVisionData,setGoalVisionData]=useState({
        hasVision: '',
        visionText: '',
        hasActionPlan: '',
        resourcePercentage: '',
        hasSkilledManpower: ''
      });

    const handleSubmit = (e) => {
        e.preventDefault();

        const goalScore = calculateVisionScores(goalVisionData);
        
        
        const mainVisionTotals=goalScore.mainVisionTotal
        console.log(mainVisionTotals);
        const totalVisionPoints =goalScore.totalVisionPoints;
        // Save to localStorage
      localStorage.setItem('businessHealthReport-Vision', JSON.stringify({ 
        
        goalScore,
        totalVisionPoints,
        mainVisionTotals,
      }));
       navigate('/visionScore');
        
     
        console.log(goalScore);
       
        console.log(totalVisionPoints);
        
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
                              {/* part 4 */}
                            <div className="flex flex-col items-start justify-center gap-4">
                              <p className="text-xl font-semibold text-green-500 mt-10">4. Organization Brain Checkup (Vision or Goal)</p>
                        <p className="text-lg font-semibold text-green-500">Without a clear vision, a company cannot grow well. You should clearly write down where you want to see your organization in the next 3/5 years.</p>
                        <label className="font-semibold">4.1 Do you have a written vision or SMART goal for the next 5 years?</label>
                         {['written', 'inMind', 'noUnderstanding'].map((option) => (
                         <label key={option} className="flex items-center gap-2">
                           <input
                             type="radio"
                             name="hasVision"
                             value={option}
                             checked={goalVisionData.hasVision === option}
                             onChange={(e) => setGoalVisionData({...goalVisionData, hasVision: e.target.value})}
                            //  required
                           />
                           {option === 'written' && 'Yes, written form'}
                           {option === 'inMind' && 'In mind but not written'}
                           {option === 'noUnderstanding' && "Don't understand SMART goals"}
                         </label>
                       ))}
                        <label className="font-semibold">4.2 Briefly write your vision or SMART goal for the next 5 years:</label>
                        <textarea type="text" name="visionText" value={goalVisionData.visionText} onChange={(e) => setGoalVisionData({...goalVisionData, visionText: e.target.value})} rows={4} id="" className="outline-2 p-2 w-1/2 h-[180px]"  />
                        <label className="font-semibold">4.3 Do you have an actionable plan to achieve your vision or goal?</label>
                        {['yes', 'no'].map((option) => (
                          <label key={option} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="hasActionPlan"
                              value={option}
                              checked={goalVisionData.hasActionPlan === option}
                              onChange={(e) => setGoalVisionData({...goalVisionData, hasActionPlan: e.target.value})}
                              // required
                            />
                            {option === 'yes' ? 'Yes, prepared plan' : 'No plan'}
                          </label>
                        ))}
                        <label className="font-semibold">4.4 What percentage of the required resources to achieve your vision or goal do you currently have?</label>
                         <div className="flex items-center gap-2">
                          <span>0%</span>
                          <input
                            type="range"
                            name="resourcePercentage"
                            min="0"
                            max="10"
                            value={goalVisionData.resourcePercentage}
                           onChange={(e) => setGoalVisionData({...goalVisionData, resourcePercentage: e.target.value})}
                            className="flex-1"
                            required
                          />
                          <span>100% ({goalVisionData.resourcePercentage || 0}/10)</span>
                         </div>
                         <label className="font-semibold">4.5 Do you have the skilled manpower required to achieve your vision or goal?</label>
                         {['yes', 'no'].map((option) => (
                          <label key={option} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="hasSkilledManpower"
                              value={option}
                              checked={goalVisionData.hasSkilledManpower === option}
                              onChange={(e) => setGoalVisionData({...goalVisionData, hasSkilledManpower: e.target.value})}
                              // required
                            />
                            {option === 'yes' ? 'Yes' : 'No'}
                          </label>
                        ))}
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

export default VisionAndGoal;