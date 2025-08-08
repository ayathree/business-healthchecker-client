import { useState } from "react";
import { calculateMarketScores } from "../utility/scoreCalculation";
import { Link, useNavigate } from "react-router-dom";


const InputForm = () => {
    const navigate=useNavigate()

const[formData,setFormData]=useState({
    marketScope: "",       // Multiple choice (1-3)
    marketSize: "",        // Numeric input
    marketTrend: "",       // Multiple choice (1-3)
    targetCustomer: "",    // Multiple choice (0-3)
    monthlyCustomers: "",  // Numeric input
    repeatCustomers: "",   // Percentage input
    competitors: ""        // Numeric input
})  

const handleSubmit = (e) => {
    e.preventDefault();
    const scores = calculateMarketScores(formData);
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
    info,
    timestamp: new Date().toISOString() // Optional: add timestamp
  }));
   navigate('/adviceReport');
    
    console.log(scores);
    console.log(info);
    
  };
  
    return (
        <div>
            <p className="text-4xl text-center font-bold capitalize text-blue-500 mt-16">plan<span className="text-red-500">B</span> solution</p>
            <p className="text-xl text-center font-bold capitalize mt-2">business health checker</p>
            <div className="mt-16 ">
                <p className="text-xl text-center font-bold capitalize mt-2">please fill up this form</p>
                <div className="flex justify-center items-center mt-2">
                        <form onSubmit={handleSubmit} action="" className="">
                      <div className=" border-2 border-blue-500 w-[70vw] h-100% py-10 px-20 flex flex-col items-start justify-center gap-4 mt-2 ">
                            {/* part 1 */}
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
                            {/* part 2 */}
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