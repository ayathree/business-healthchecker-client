import { useState } from "react";
import { calculateMarketScores } from "../utility/scoreCalculation";
import { Link, useNavigate } from "react-router-dom";
import { calculateVisionScores } from "../utility/goalAndVision";
import { calculateStrengthScores } from "../utility/strength";
import { calculateBloodTestScores } from "../utility/bloodTest";
import { calculateHeartScores } from "../utility/heart";



const InputForm = () => {
    const navigate=useNavigate()
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

const[formData,setFormData]=useState({
    marketScope: "",       // Multiple choice (1-3)
    marketSize: "",        // Numeric input
    marketTrend: "",       // Multiple choice (1-3)
    targetCustomer: "",    // Multiple choice (0-3)
    monthlyCustomers: "",  // Numeric input
    repeatCustomers: "",   // Percentage input
    competitors: "",        // Numeric input
})  

const [goalVisionData,setGoalVisionData]=useState({
    hasVision: '',
    visionText: '',
    hasActionPlan: '',
    resourcePercentage: '',
    hasSkilledManpower: ''
  });


  const [strengthFormData, setStrengthFormData] = useState({
    employeeCount: '',
    skillLevel: 5, // Default to middle value
    operationalResilience: '',
    marketingPlan: '',
    usesSoftware: ''
  });

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

  const [heartData, setHeartData] = useState({
    uniqueFeatures: '',
    customerSatisfaction: '',
    packagingBranding: '',
    pricingPolicy: '',
    dateLabeling: '',
  });

const handleChange = (e) => {
    const { name, value } = e.target;
    setStrengthFormData(prev => ({
      ...prev,
      [name]: name === 'skillLevel' ? parseInt(value) : value
    }));
  };

  const handleBloodTestInputChange = (e) => {
    const { name, value } = e.target;
    setBloodTestFormData(prev => ({ ...prev, [name]: value }));
  };

   const handleHeartInputChange = (e) => {
    const { name, value } = e.target;
    setHeartData(prev => ({
      ...prev,
      [name]: value
    }));
  }




const handleSubmit = (e) => {
    e.preventDefault();
    const scores = calculateMarketScores(formData);
    const goalScore = calculateVisionScores(goalVisionData);
    const strengthScore = calculateStrengthScores(strengthFormData);
    const bloodTestScore= calculateBloodTestScores(bloodTestFormData);
    const heartScore=calculateHeartScores(heartData)
   
     const totalPoints = scores.totalPoints + goalScore.totalPoints + strengthScore.totalPoints + bloodTestScore.totalPoints + heartScore.totalPoints;
    const form = e.target;
    const name = form.name.value;
    const organization = form.organization.value;
    const position = form.position.value;
    const service = form.service.value;
    const address = form.address.value;
    const number = form.number.value;
    const year = form.year.value;
    const info={name,position,organization,service,address,number,year}
    // Save to localStorage
  localStorage.setItem('businessHealthReport', JSON.stringify({ 
    scores, 
    goalScore,
    strengthScore,
    bloodTestScore,
    heartScore,
    totalPoints,
    info,
    timestamp: new Date().toISOString() // Optional: add timestamp
  }));
   navigate('/adviceReport');
    
    console.log(scores);
    console.log(goalScore);
    console.log(strengthScore);
    console.log(bloodTestScore);
    console.log(heartScore);
    console.log(info);
    console.log(totalPoints);
    
  };
  
    return (
        <div>
            <p className="text-4xl text-center font-bold capitalize text-blue-500 mt-16">plan<span className="text-red-500">B</span> solution</p>
            <p className="text-xl text-center font-bold capitalize mt-2">business health checker</p>
            <div className="mt-16 ">
                <p className="text-xl text-center font-bold capitalize mt-2">please fill up this form</p>
                <div className="flex justify-center items-center mt-2">
                        <form onSubmit={handleSubmit} action="" className="">
                      <div className=" border-2 border-blue-500 w-[70vw] h-100% py-10 px-20  mt-2 ">
                            {/* part 1 */}
                        <div className="flex flex-col items-start justify-center gap-4">
                          <p className="text-xl font-semibold text-blue-500">1. Basic Information:</p>
                        <p className="text-lg text-blue-500">Please provide detailed information about your business.</p>
                            <label htmlFor="" className="font-semibold">1.1 Your Name:</label>
                            <input type="text" name="name" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">1.2 Name of the Organization:</label>
                            <input type="text" name="organization" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">1.3 Your Designation/Position:</label>
                            <input type="text" name="position" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">1.4 What type of product or service do you provide?</label>
                            <input type="text" name="service" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">1.5 Business Address:</label>
                            <input type="text" name="address" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">1.6 Phone Number:</label>
                            <input type="text" name="number" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">1.7 Business Start Date or Year:</label>
                            <input type="text" name="year" id="" className="outline-2 p-2 w-1/2"  />
                        </div>
                            {/* part 2 */}
                            <div className="flex flex-col items-start justify-center gap-4">
                              <p className="text-xl font-semibold text-blue-500 mt-10">2. Examining the Eyes, Ears, and Mouth of the Organization (Market & Customer)</p>
                        <p className="text-lg font-semibold text-blue-500">Who is your ideal customer? Which market is ideal for you?</p>
                        <p  className="text-lg text-blue-500">Keep in mind that someone who tries to make a product for everyone, ends up making it for no one.Identify and understand your ideal customer.</p>
                            <label className="font-semibold">2.1 Where is your product's potential market?</label>
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
                            <label htmlFor="" className="font-semibold">2.2 Approximately how many customers exist in your potential market?(Enter estimated number in thousands/lakhs)</label>
                            <input type="number" value={formData.marketSize} onChange={(e) => setFormData({...formData, marketSize: e.target.value})} name="" id="" className="outline-2 p-2 w-1/2"  />
                            <label className="font-semibold">2.3 Is your market expanding or contracting?</label>
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
                            <label className="font-semibold">2.4 Have you identified your target customer profile?</label>
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
                            <label htmlFor="" className="font-semibold">2.5 Average number of customers purchasing your product monthly?(Enter approximate number)</label>
                            <input type="number" value={formData.monthlyCustomers} onChange={(e) => setFormData({...formData, monthlyCustomers: e.target.value})} name="" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">2.6 What percentage of your monthly customers are repeat buyers?</label>
                            <input type="text" value={formData.repeatCustomers} onChange={(e) => setFormData({...formData, repeatCustomers: e.target.value})} name="" id="" className="outline-2 p-2 w-1/2"  />
                            <label htmlFor="" className="font-semibold">2.7 How many competitors operate in your potential market?(Enter number of businesses selling similar products)</label>
                            <input type="number" value={formData.competitors} onChange={(e) => setFormData({...formData, competitors: e.target.value})} name="" id="" className="outline-2 p-2 w-1/2"  />
                            </div>
                            {/* part 3 */}
                            <div className="flex flex-col items-start justify-center gap-4">
                              <p className="text-xl font-semibold text-blue-500 mt-10">3. Organization Brain Checkup (Vision or Goal)</p>
                        <p className="text-lg font-semibold text-blue-500">Without a clear vision, a company cannot grow well. You should clearly write down where you want to see your organization in the next 3/5 years.</p>
                        <label className="font-semibold">3.1 Do you have a written vision or SMART goal for the next 5 years?</label>
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
                        <label className="font-semibold">3.2 Briefly write your vision or SMART goal for the next 5 years:</label>
                        <textarea type="text" name="visionText" value={goalVisionData.visionText} onChange={(e) => setGoalVisionData({...goalVisionData, visionText: e.target.value})} rows={4} id="" className="outline-2 p-2 w-1/2 h-[180px]"  />
                        <label className="font-semibold">3.3 Do you have an actionable plan to achieve your vision or goal?</label>
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
                        <label className="font-semibold">3.4 What percentage of the required resources to achieve your vision or goal do you currently have?</label>
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
                         <label className="font-semibold">3.5 Do you have the skilled manpower required to achieve your vision or goal?</label>
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
                             {/* part 4 */}
                             <div className="flex flex-col items-start justify-center gap-4">
                              <p className="text-xl font-semibold text-blue-500 mt-10">4. Strength (Employees / System / Strategy)</p>
                        <p className="text-lg font-semibold text-blue-500">For any organization to achieve its goals, the first requirement is the right strategy, and skilled manpower to execute it. Tell us about your organization’s strategy and workforce.</p>
                        <label className="font-semibold">4.1 How many employees do you have in your organization? (excluding yourself)</label>
                         <input 
                          type="number" 
                          name="employeeCount"
                          value={strengthFormData.employeeCount}
                          onChange={handleChange}
                          className="border rounded-lg p-2 w-full md:w-1/2"
                          min="0"
                        />
                         <label className="font-semibold">4.2 Rate the skill level of your employees.</label>
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
                         <label className="font-semibold">4.3 In your absence, can your organization operate without any disruption?</label>
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
                         <label className="font-semibold">4.4 Does your organization follow any strategic marketing plan?</label> 
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

                         <label className="font-semibold">4.5 Do you use any software to manage your organization?</label>
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
                            {/* part 5 */}
                             <div className="flex flex-col items-start justify-center gap-4">
                       <p className="text-xl font-semibold text-blue-500 mt-10">5. Blood Test (Finance / Productivity / Growth)</p>
                       <p className="text-lg font-semibold text-blue-500">Profit in business is like blood. If you keep making a loss every month, your business will suffer from "anemia." If this situation continues for a long time, the business will eventually weaken and shut down.</p>
                       
                       <label className="font-semibold">5.1 What is your average monthly sales revenue?(Please provide the average of your total sales for the last three months.)</label>
                       <input 
                         type="number" 
                         value={formData.avgMonthlyRevenue} 
                         onChange={handleBloodTestInputChange} 
                         name="avgMonthlyRevenue" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">5.2 What is your gross profit margin on sold products?(Selling Price − (Purchase Price + Packaging + Shipping). Write as a percentage.)</label>
                       <input 
                         type="number" 
                         value={formData.grossProfitMargin} 
                         onChange={handleBloodTestInputChange} 
                         name="grossProfitMargin" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">5.3 What is your organization's monthly fixed cost? (excluding your own salary)(Office rent + utilities + staff salaries, etc. — expenses that must be paid every month.)</label>
                       <input 
                         type="number" 
                         value={formData.monthlyFixedCost} 
                         onChange={handleBloodTestInputChange} 
                         name="monthlyFixedCost" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">5.4 Do you have any loans?</label>
                       <select 
                         value={formData.hasLoan} 
                         onChange={handleBloodTestInputChange} 
                         name="hasLoan" 
                         className="outline-2 p-2 w-1/2"
                       >
                         <option value="">Select</option>
                         <option value="yes">Yes</option>
                         <option value="no">No</option>
                       </select>
                       
                       {formData.hasLoan === 'yes' && (
                         <>
                           <label className="font-semibold">If yes, what is the monthly installment amount?</label>
                           <input 
                             type="number" 
                             value={formData.loanInstallment} 
                             onChange={handleBloodTestInputChange} 
                             name="loanInstallment" 
                             className="outline-2 p-2 w-1/2" 
                           />
                         </>
                       )}
                       
                       <label className="font-semibold">5.5 How much salary or honorarium do you take?</label>
                       <input 
                         type="number" 
                         value={formData.ownerSalary} 
                         onChange={handleBloodTestInputChange} 
                         name="ownerSalary" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">5.6 What is your organization's daily production capacity for your main product?(How much of the product can you produce per day?)</label>
                       <input 
                         type="number" 
                         value={formData.dailyProduction} 
                         onChange={handleBloodTestInputChange} 
                         name="dailyProduction" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">5.7 Total amount of your investment:(How much capital have you invested so far? (Do not include reinvested profit from the business.))</label> 
                       <input 
                         type="number" 
                         value={formData.totalInvestment} 
                         onChange={handleBloodTestInputChange} 
                         name="totalInvestment" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">5.8 What is the current total value of your organization's assets?(Include machinery, technology, goodwill, etc.)</label>
                       <input 
                         type="number" 
                         value={formData.totalAssets} 
                         onChange={handleBloodTestInputChange} 
                         name="totalAssets" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">5.9 In 2021 (Q4) (Oct'21 - Dec'21), how many total customers purchased products?(Total number of customers over 3 months. If the same customer bought multiple times, count each purchase separately.)</label>
                       <input 
                         type="number" 
                         value={formData.customersQ4_2021} 
                         onChange={handleBloodTestInputChange} 
                         name="customersQ4_2021" 
                         className="outline-2 p-2 w-1/2" 
                       />
                       
                       <label className="font-semibold">5.10 In {currentYear} (Q1) (Jan'{currentYear.toString().slice(-2)} - Mar'{currentYear.toString().slice(-2)}), how many total customers purchased products?  (Total number of customers over 3 months. If the same customer bought multiple times, count each purchase separately.)</label>
                       <input 
                         type="number" 
                         value={formData.customersQ1_2025} 
                         onChange={handleBloodTestInputChange} 
                         name="customersQ1_2025" 
                         className="outline-2 p-2 w-1/2" 
                       />
                             </div>
                             {/* part 6 */}
                             <div className="flex flex-col items-start justify-center gap-4">
                       <p className="text-xl font-semibold text-blue-500 mt-10">6. Product (Heart)</p>
                       <p className="text-lg font-semibold text-blue-500">No matter what else you do, in the end, it is your product that builds a relationship with your customer. If the product is not right, all your efforts and investments can fail. Therefore, create your product in such a way that your customers can be 100% satisfied.</p>
                       
                      {/* 6.1 Unique Features */}
                            <label className="font-semibold">
                              6.1 Does your product have any unique features that your competitors' products do not?
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
                              6.2 Do you believe your product is able to meet the needs of your target customers?
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
                              6.3 Does your product packaging represent your brand?
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
                              6.4 Does your product follow a smart pricing policy?
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
                              6.5 Does your product include a manufacturing date and expiration date on the label?
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
                            <button className="bg-blue-500 text-white font-bold text-lg cursor-pointer btn hover:bg-slate-500 hover:text-black capitalize p-2 w-1/2 outline-2">submit</button>
                        </div>
                        </form>
                </div>
              

            </div>
        </div>
    );
};

export default InputForm;