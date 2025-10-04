import { useState } from "react";
import { Zoom } from "react-awesome-reveal";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { calculateInfrastructureScores } from "../utility/status";


const BusinessPosition = () => {
    const navigate=useNavigate()
   

      const [statusData, setStatusData] = useState({
    tradeLicense: '',
    bankAccount: '',
    officeShowroom: '',
    website: '',
    socialMedia: [],
    marketplace: ''
  }); 

      const handleSubmit = (e) => {
          e.preventDefault();
          
          const statusScore = calculateInfrastructureScores(statusData)
          
          
          const mainPositionTotals= statusScore.mainPositionTotal 
          console.log(mainPositionTotals);
           const totalPositionPoints =  statusScore.totalPositionPoints 
          
          // Save to localStorage
        localStorage.setItem('businessHealthReport-BusinessPosition', JSON.stringify({ 
           
          statusScore,
         
          totalPositionPoints,
          mainPositionTotals,
          
          
          
        }));
         navigate('/positionScore');
          
        
          console.log(statusScore);
         
          console.log(totalPositionPoints);
          
        };

        const socialMediaOptions = [
    'Facebook', 'Instagram', 'WhatsApp', 'TikTok',
    'YouTube', 'Twitter', 'LinkedIn', 'Pinterest'
  ]; 
      
        const handleStatusChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setStatusData(prev => ({
        ...prev,
        socialMedia: checked
          ? [...prev.socialMedia, value]
          : prev.socialMedia.filter(item => item !== value)
      }));
    } else {
      setStatusData(prev => ({ ...prev, [name]: value }));
    }
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
                            {/* part 2 */}
                        <div className="flex flex-col items-start justify-center gap-4 mt-6">
                           <p className="text-xl font-semibold text-red-400">2. Business Position/Status:</p>
                        <p className="text-lg text-red-400">Business legal documents, positioning, and related information.</p>
                              {/* 2.1 Trade License */}
      <label className="font-semibold">2.1 Do you have a trade license?</label>
      <div className="flex flex-col gap-4">
        {['Yes', 'No', 'Yes, but it is not updated'].map(option => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="radio"
              name="tradeLicense"
              value={option}
              checked={statusData.tradeLicense === option}
              onChange={handleStatusChange}
            />
            {option}
          </label>
        ))}
      </div>

      {/* 2.2 Bank Account */}
      <label className="font-semibold">2.2 Do you have a bank account in the name of the organization?</label>
      <div className="flex flex-col gap-4">
        {['Yes', 'No'].map(option => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="radio"
              name="bankAccount"
              value={option}
              checked={statusData.bankAccount === option}
              onChange={handleStatusChange}
            />
            {option}
          </label>
        ))}
      </div>

      {/* 2.3 Office/Showroom */}
      <label className="font-semibold">2.3 Do you have an offline office or showroom?</label>
      <div className="flex flex-col gap-4">
        {['Yes', 'No'].map(option => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="radio"
              name="officeShowroom"
              value={option}
              checked={statusData.officeShowroom === option}
              onChange={handleStatusChange}
            />
            {option}
          </label>
        ))}
      </div>

      {/* 2.4 Website */}
      <label className="font-semibold">2.4 Do you have a website?</label>
      <div className="flex fle-col gap-4">
        {['Yes', 'No'].map(option => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="radio"
              name="website"
              value={option}
              checked={statusData.website === option}
              onChange={handleStatusChange}
            />
            {option}
          </label>
        ))}
      </div>

      {/* 2.5 Social Media (Checkbox) */}
      <label className="font-semibold">2.5 On which social media platforms does your business have an account?</label>
      <div className="grid grid-cols-2 gap-2">
        {socialMediaOptions.map(platform => (
          <label key={platform} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="socialMedia"
              value={platform}
              checked={statusData.socialMedia.includes(platform)}
              onChange={handleStatusChange}
            />
            {platform}
          </label>
        ))}
      </div>

      {/* 2.6 Marketplace */}
      <label className="font-semibold">2.6 Do you have an account on Daraz or similar marketplaces?</label>
      <div className="flex flex-col gap-4">
        {['Yes', 'No'].map(option => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="radio"
              name="marketplace"
              value={option}
              checked={statusData.marketplace === option}
              onChange={handleStatusChange}
            />
            {option}
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

export default BusinessPosition;