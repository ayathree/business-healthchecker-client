import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adviceData from '../utility/data.json';


const AdviceReport = () => {
  const [reportData, setReportData] = useState(null);
  

  useEffect(() => {
    const storedData = localStorage.getItem('businessHealthReport');
    if (storedData) {
      setReportData(JSON.parse(storedData));
    }
  }, []);

  if (!reportData) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500">No report found</h2>
        <p>Please complete the business health check form first.</p>
        <Link to="/" className="text-blue-500 underline mt-4 inline-block">
          Go to Form
        </Link>
      </div>
    );
  }

  const { scores, info, goalScore, strengthScore, bloodTestScore, heartScore, visibilityScore, statusScore, totalPoints, mainTotals } = reportData;
   
  console.log(mainTotals);
  
 
  const getAdviceForScore = (category, percentage) => {
    const categoryData = adviceData.find(item => item.category === category);
    if (!categoryData) return null;

    return categoryData.scoreTiers.find(tier =>
      percentage >= tier.minScore && percentage <= tier.maxScore
    ) || null;
  };

  const marketAdvice = getAdviceForScore("Market and Customer", scores.percentage);
  console.log("Market Advice:", marketAdvice); // helpful debug

    const visionAdvice = getAdviceForScore("Goal And Vision", goalScore.percentage);
  console.log("Vision Advice:", visionAdvice); // helpful debug

  const strengthAdvice = getAdviceForScore("Strength (Employees / System / Strategy)", strengthScore.percentage);
  console.log("Strength Advice:", strengthAdvice); // helpful debug

  const bloodTestAdvice = getAdviceForScore("Blood Test (Finance / Productivity / Growth)", bloodTestScore.percentage);
  console.log("blood test Advice:", bloodTestAdvice); // helpful debug

   const heartAdvice = getAdviceForScore("Product (Heart)", heartScore.percentage);
  console.log("heart Advice:", heartAdvice); // helpful debug

  const visibilityAdvice = getAdviceForScore("Outlooking (Visibility)", visibilityScore.percentage);
  console.log("visibility Advice:", visibilityAdvice); // helpful debug

  const statusAdvice = getAdviceForScore("Business Position/Status", statusScore.percentage);
  console.log("visibility Advice:", statusAdvice); // helpful debug

  





  return (
    <div className="p-8 bg-blue-50  " id="">
      
      <div style={{
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  

}}>
  <div>
    <img 
      src="https://i.ibb.co.com/KzWNyxsQ/Chat-GPT-Image-Sep-1-2025-11-23-34-AM.png" 
      alt="" 
      style={{
        width: '300px',
        height: '200px'
      }} 
    />
  </div>
  <div style={{ width: '300px' }}></div>
  <div style={{ width: '300px' }}></div>
  <div>
    <p style={{
      fontSize: '2.25rem',
      fontWeight: '600',
      marginBottom: '1rem'
    }}>
      Total Score: 
      <span style={{
        border: '2px solid black',
        borderRadius: '9999px',
        backgroundColor: '#fecaca',
        padding: '20px',
        marginLeft: '0.5rem'
      }}>
        {totalPoints} / {mainTotals}
      </span>
    </p>
  </div>
</div>

      {/* Company Info */}
      <section style={{
  margin: '2.5rem 0',
  padding: '1.5rem',
  backgroundColor: '#e5e7eb'
}}>
  <div className="grid grid-cols-2 justify-center items-center gap-4">
    <div>
      <h2 style={{
        fontSize: '2.25rem',
        fontWeight: '600',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>Primary Data</h2>
      <hr style={{
        border: '5px solid #2563eb',
        margin: '20px auto',
        width: '250px'
      }} />
    </div>
   
    <div>
      <p style={{fontWeight: '700'}}>
        <span style={{fontWeight: '500'}}>Name:</span> {info.name}
      </p>
      <p style={{fontWeight: '700'}}>
        <span style={{fontWeight: '500'}}>Organization:</span> {info.organization}
      </p>
      <p style={{fontWeight: '700'}}>
        <span style={{fontWeight: '500'}}>Position:</span> {info.position}
      </p>
      <p style={{fontWeight: '700'}}>
        <span style={{fontWeight: '500'}}>Service:</span> {info.service}
      </p>
    </div>
  </div>
</section>

{/* scores */}
<section className="flex justify-center items-center bg-gray-50">
 <div className="grid grid-cols-3 grid-rows-7 gap-6">
  {/* Left column - progress bars */}
  <div className="flex flex-col gap-6 row-span-7 space-y-3 ">
    {/* Progress bar 1 */}
    <div className="flex items-center gap-2 mt-16">
      <div className="w-1/2 bg-gray-200 rounded-full h-6">
        <div
          className="bg-red-400 h-6 rounded-full"
          style={{ width: `${statusScore.percentage}%` }}
        ></div>
      </div>
      <p className="text-lg font-bold">{statusScore.percentage}%</p>
    </div>

    {/* Progress bar 2 */}
    <div className="flex items-center gap-2">
      <div className="w-1/2 bg-gray-200 rounded-full h-6">
        <div
          className="bg-green-500 h-6 rounded-full"
          style={{ width: `${scores.percentage}%` }}
        ></div>
      </div>
      <p className="text-lg font-bold">{scores.percentage}%</p>
    </div>

    {/* Progress bar 3 */}
    <div className="flex items-center gap-2">
      <div className="w-1/2 bg-gray-200 rounded-full h-6">
        <div
          className="bg-orange-400 h-6 rounded-full"
          style={{ width: `${goalScore.percentage}%` }}
        ></div>
      </div>
      <p className="text-lg font-bold">{goalScore.percentage}%</p>
    </div>

    {/* Progress bar 4 */}
    <div className="flex items-center gap-2">
      <div className="w-1/2 bg-gray-200 rounded-full h-6">
        <div
          className="bg-[#803232] h-6 rounded-full"
          style={{ width: `${strengthScore.percentage}%` }}
        ></div>
      </div>
      <p className="text-lg font-bold">{strengthScore.percentage}%</p>
    </div>

    {/* Progress bar 5 */}
    <div className="flex items-center gap-2">
      <div className="w-1/2 bg-gray-200 rounded-full h-6">
        <div
          className="bg-blue-400 h-6 rounded-full"
          style={{ width: `${bloodTestScore.percentage}%` }}
        ></div>
      </div>
      <p className="text-lg font-bold">{bloodTestScore.percentage}%</p>
    </div>

    {/* Progress bar 6 */}
    <div className="flex items-center gap-2">
      <div className="w-1/2 bg-gray-200 rounded-full h-6">
        <div
          className="bg-red-800 h-6 rounded-full"
          style={{ width: `${heartScore.percentage}%` }}
        ></div>
      </div>
      <p className="text-lg font-bold">{heartScore.percentage}%</p>
    </div>

    {/* Progress bar 7 */}
    <div className="flex items-center gap-2">
      <div className="w-1/2 bg-gray-200 rounded-full h-6">
        <div
          className="bg-[#54275c] h-6 rounded-full"
          style={{ width: `${visibilityScore.percentage}%` }}
        ></div>
      </div>
      <p className="text-lg font-bold">{visibilityScore.percentage}%</p>
    </div>
  </div>

  {/* Middle column - image (spans 7 rows so it aligns) */}
  <div className="row-span-7 flex justify-center items-center">
    <img
      src="https://i.ibb.co.com/0j7gJRff/Whats-App-Image-2025-09-01-at-13-26-13-8a3ce716.jpg"
      alt="Business health chart"
      className="h-[550px] object-contain"
    />
  </div>

  {/* Right column - labels */}
  <div className="flex flex-col gap-6 row-span-7 space-y-3 ">
    <p className="text-lg font-bold text-red-400 mt-16">
      Business Preparation, Legals & Positions
    </p>
    <p className="text-lg font-bold text-green-500">
      Market Size & Customers
    </p>
    <p className="text-lg font-bold text-orange-400">
      Business Vision, Planning, & Action Plan
    </p>
    <p className="text-lg font-bold text-[#803232]">
      Business Strategy, System & Manpower
    </p>
    <p className="text-lg font-bold text-blue-400">
      Profit, Productivity & Growth
    </p>
    <p className="text-lg font-bold text-red-800">
      Your Products & Supply Chain
    </p>
    <p className="text-lg font-bold text-[#54275c]">
      Visibility, Engagement & Conversion
    </p>
  </div>
</div>


</section>
777
{/* recommendation 1 */}
  <div>
     <h2 className="text-5xl font-semibold m-10 text-center">Recommendations</h2>
<section className="flex justify-center items-center ">
 <div className="grid grid-cols-3 grid-rows-7 gap-6">
  {/* Left column - progress bars */}
  <div className="flex flex-col gap-6 row-span-7 space-y-3 ">
    {/* Progress bar 1 */}
    <div className="h-[250px]">
      
     
    </div>

    {/* Progress bar 2 */}
    <div className="">
      <p className="text-lg font-bold text-green-500 ">
      {marketAdvice.tier} Status
    </p>
    <ol className="list-disc pl-6  text-green-500">
      <li className="text-xm font-semibold text-green-500">{scores?.advice?.marketScope?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-green-500">{scores?.advice?.marketSize?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-green-500">{scores?.advice?.marketTrend?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-green-500">{scores?.advice?.targetCustomer?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-green-500">{scores?.advice?.monthlyCustomers?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-green-500">{scores?.advice?.repeatCustomers?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-green-500">{scores?.advice?.competitors?.message || 'No analysis available'}</li>
    </ol>
     </div>

    {/* Progress bar 3 */}
    <div className="h-[0px]">
      
    </div>

    {/* Progress bar 4 */}
     <div className="">
      <p className="text-lg font-bold text-[#803232] ">
      {strengthAdvice.tier} Status
    </p>
    <ol className="list-disc pl-6  text-[#803232]">
      <li className="text-xm font-semibold text-[#803232]">{strengthScore?.advice?.employeeCount?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-[#803232]">{strengthScore?.advice?.employeeSkills?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-[#803232]">{strengthScore?.advice?.operationalResilience?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-[#803232]">{strengthScore?.advice?.marketingPlan?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-[#803232]">{strengthScore?.advice?.softwareUsage?.message || 'No analysis available'}</li>
    </ol>
     </div>

    {/* Progress bar 5 */}
    <div className="flex items-center gap-2">
     
    </div>

    {/* Progress bar 6 */}
    <div className="">
      <p className="text-lg font-bold text-red-800">
      {heartAdvice.tier} Status
    </p>
    <ol className="list-disc pl-6  text-red-800">
      <li className="text-xm font-semibold text-red-800">{heartScore?.advice?.uniqueFeatures?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-red-800">{heartScore?.advice?.customerSatisfaction?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-red-800">{heartScore?.advice?.packagingBranding?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-red-800">{heartScore?.advice?.pricingPolicy?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-red-800">{heartScore?.advice?.dateLabeling?.message || 'No analysis available'}</li>
    </ol>
     </div>

    {/* Progress bar 7 */}
    <div className="flex items-center gap-2">
      
    </div>
  </div>

  {/* Middle column - image (spans 7 rows so it aligns) */}
  <div className="row-span-7 flex justify-center items-center">
    <img
      src="https://i.ibb.co.com/0j7gJRff/Whats-App-Image-2025-09-01-at-13-26-13-8a3ce716.jpg"
      alt="Business health chart"
      className="max-h-full max-w-full object-contain"
    />
  </div>

  {/* Right column - labels */}
  <div className="flex flex-col gap-6 row-span-7 space-y-3  ">
    <div className="">
      <p className="text-lg font-bold text-red-400">
      {statusAdvice.tier} Status
    </p>
    <ol className="list-disc pl-6  text-red-400">
      <li className="text-xm font-semibold text-red-400">{statusScore?.advice?.tradeLicense?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-red-400">{statusScore?.advice?.bankAccount?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-red-400">{statusScore?.advice?.officeShowroom?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-red-400">{statusScore?.advice?.website?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-red-400">{statusScore?.advice?.socialMedia?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-red-400">{statusScore?.advice?.marketplace?.message || 'No analysis available'}</li>
    </ol>
    </div>
    <p className="">
      
    </p>
    <div className="">
      <p className="text-lg font-bold text-orange-400">
      {visionAdvice.tier} Status
    </p>
    <ol className="list-disc pl-6  text-orange-400">
      <li className="text-xm font-semibold text-orange-400">{goalScore.advice?.hasVision?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-orange-400">{goalScore.advice?.visionText?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-orange-400">{goalScore.advice?.hasActionPlan?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-orange-400">{goalScore.advice?.resourcePercentage?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-orange-400">{goalScore.advice?.hasSkilledManpower?.message || 'No analysis available'}</li>
    </ol>
     </div>
    <p className="">
     
    </p>
    <div className="">
      <p className="text-lg font-bold text-blue-400">
      {bloodTestAdvice.tier} Status
    </p>
    <ol className="list-disc pl-6  text-blue-400">
      <li className="text-xm font-semibold text-blue-400">{bloodTestScore?.advice?.avgMonthlyRevenue?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-blue-400">{bloodTestScore?.advice?.grossProfitMargin?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-blue-400">{bloodTestScore?.advice?.monthlyFixedCosts?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-blue-400">{bloodTestScore?.advice?.loanInstallment?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-blue-400">{bloodTestScore?.advice?.dailyProduction?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-blue-400">{bloodTestScore?.advice?.totalInvestment?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-blue-400">{bloodTestScore?.advice?.totalAssets?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-blue-400">{bloodTestScore?.advice?.customersQ4_2021?.message || 'No analysis available'}</li>
    </ol>
     </div>
    <p className="">
      
    </p>
    <div className="">
      <p className="text-lg font-bold text-[#54275c]">
      {visibilityAdvice.tier} Status
    </p>
    <ol className="list-disc pl-6  text-[#54275c]">
      <li className="text-xm font-semibold text-[#54275c]">{visibilityScore?.advice?.facebookLikes?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-[#54275c]">{visibilityScore?.advice?.instagramFollowers?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-[#54275c]">{visibilityScore?.advice?.youtubeSubscribers?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-[#54275c]">{visibilityScore?.advice?.postReach?.message || 'No analysis available'}</li>
      <li className="text-xm font-semibold text-[#54275c]">{visibilityScore?.advice?.engagementRate?.message || 'No analysis available'}</li>
      
    </ol>
     </div>
  </div>
</div>


</section>
  </div>

  {/* PDF Button */}
  <div className="flex justify-center items-center mt-20">
  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 cursor-pointer">
    Download
  </button>
  </div>
  </div>
  );
};

export default AdviceReport;
