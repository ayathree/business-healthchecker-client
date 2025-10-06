import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adviceData from '../utility/data.json';

const AdviceReport = () => {
  const [basicData, setBasicData] = useState(null);
  const [positionData,setPositionData]=useState(null);
  const [marketData,setMarketData]=useState(null);
  const [visionData,setVisionData]=useState(null);
  const [strengthData,setStrengthData]=useState(null);
  const [bloodTestData,setBloodTestData]=useState(null);
  const[productData,setProductData]=useState(null);
  const[visibilityData,setVisibilityData]=useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('businessHealthReport-Basic');
    if (storedData) {
      setBasicData(JSON.parse(storedData));
    }
  }, []);
   useEffect(() => {
    const storedData = localStorage.getItem('businessHealthReport-BusinessPosition');
    if (storedData) {
      setPositionData(JSON.parse(storedData));
    }
  }, []);
   useEffect(() => {
    const storedData = localStorage.getItem('businessHealthReport-MarketScope');
    if (storedData) {
      setMarketData(JSON.parse(storedData));
    }
  }, []);
  useEffect(() => {
    const storedData = localStorage.getItem('businessHealthReport-Vision');
    if (storedData) {
      setVisionData(JSON.parse(storedData));
    }
  }, []);
   useEffect(() => {
    const storedData = localStorage.getItem('businessHealthReport-Strength');
    if (storedData) {
      setStrengthData(JSON.parse(storedData));
    }
  }, []);
   useEffect(() => {
    const storedData = localStorage.getItem('businessHealthReport-BloodTest');
    if (storedData) {
      setBloodTestData(JSON.parse(storedData));
    }
  }, []);
   useEffect(() => {
    const storedData = localStorage.getItem('businessHealthReport-Product');
    if (storedData) {
      setProductData(JSON.parse(storedData));
    }
  }, []);
   useEffect(() => {
    const storedData = localStorage.getItem('businessHealthReport-OutLooking');
    if (storedData) {
      setVisibilityData(JSON.parse(storedData));
    }
  }, []);

  const downloadPDF = () => {
    window.print();
  };

  if (!basicData) {
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

  const { info} = basicData;
  const { statusScore,totalPositionPoints,mainPositionTotals}=positionData;
  const{ scores, totalMarketPoints,mainMarketTotals}=marketData;
  const{ goalScore,totalVisionPoints,mainVisionTotals}=visionData;
  const{strengthScore,totalStrengthPoints,mainStrengthTotals}=strengthData;
   const{ bloodTestScore,totalBloodTestPoints,mainBloodTestTotals}=bloodTestData;
   const{heartScore,totalProductPoints,mainProductTotals}=productData;
   const{visibilityScore,totalVisibilityPoints,mainVisibilityTotals}=visibilityData

const mainTotals=mainBloodTestTotals+mainMarketTotals+mainPositionTotals+mainProductTotals+mainStrengthTotals+mainVisibilityTotals+mainVisionTotals;

const totalPoints=totalBloodTestPoints+totalMarketPoints+totalPositionPoints+totalProductPoints+totalStrengthPoints+totalStrengthPoints+totalVisibilityPoints+totalVisionPoints;

   
  const getAdviceForScore = (category, percentage) => {
    const categoryData = adviceData.find(item => item.category === category);
    if (!categoryData) return null;

    return categoryData.scoreTiers.find(tier =>
      percentage >= tier.minScore && percentage <= tier.maxScore
    ) || null;
  };

  const marketAdvice = getAdviceForScore("Market and Customer", scores.percentage);
  const visionAdvice = getAdviceForScore("Goal And Vision", goalScore.percentage);
  const strengthAdvice = getAdviceForScore("Strength (Employees / System / Strategy)", strengthScore.percentage);
  const bloodTestAdvice = getAdviceForScore("Blood Test (Finance / Productivity / Growth)", bloodTestScore.percentage);
  const heartAdvice = getAdviceForScore("Product (Heart)", heartScore.percentage);
  const visibilityAdvice = getAdviceForScore("Outlooking (Visibility)", visibilityScore.percentage);
  const statusAdvice = getAdviceForScore("Business Position/Status", statusScore.percentage);

  return (
    <>
      {/* Print styles for PDF */}
      <style>
        {`
          @media print {
            @page {
              size: portrait;
              margin: 0.5in;
            }
            
            body, html {
              width: 100% !important;
              height: auto !important;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
              color: black !important;
              font-family: Arial, sans-serif !important;
              font-size: 12pt;
            }
            
            .screen-only {
              display: none !important;
            }
            
            .print-only {
              display: block !important;
            }
            
            #pdf-content, #pdf-content * {
              visibility: visible;
            }
            
            #pdf-content {
              position: relative !important;
              width: 100% !important;
              left: 0 !important;
              top: 0 !important;
              padding: 0 !important;
              margin: 0 !important;
              background: white !important;
            }
            
            .page-break {
              page-break-after: always;
            }
            
            .avoid-break {
              page-break-inside: avoid;
            }
            
            /* Improve text readability */
            h1, h2, h3, h4, h5, h6 {
              color: #000 !important;
              page-break-after: avoid;
            }
            
            p, li {
              color: #000 !important;
              line-height: 1.4;
            }
            
            /* Remove backgrounds for better printing */
            .bg-blue-50, .bg-gray-50 {
              background: white !important;
            }
            
            /* Ensure images print correctly */
            img {
              max-width: 100% !important;
              height: auto !important;
            }
            
            /* Header styling */
            .report-header {
              border-bottom: 2px solid #000;
              padding-bottom: 15px;
              margin-bottom: 20px;
              text-align: center;
            }
            
            /* Section styling */
            .section {
              margin-bottom: 25px;
              padding: 15px;
            }
            
            /* Fix list styling */
            ol, ul {
              margin-left: 20px;
            }
            
            li {
              margin-bottom: 8px;
            }
            
            /* Table styling for scores */
            .score-table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            
            .score-table th, .score-table td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            
            .score-table th {
              background-color: #f2f2f2;
            }
            
            /* Progress bar for print */
            .print-progress {
              height: 20px;
              background-color: #f0f0f0;
              border-radius: 10px;
              margin: 5px 0;
            }
            
            .print-progress-bar {
              height: 100%;
              border-radius: 10px;
            }
          }
          
          /* Screen styles */
          @media screen {
            .print-only {
              display: none !important;
            }
            
            .screen-only {
              display: block;
            }
          }
        `}
      </style>

        

      {/* Screen version - original design */}
      <div className="screen-only p-8 bg-blue-50">
        {/* Original header section */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
          <Link to={'/'}><div>
            <img 
              src="https://i.ibb.co.com/KzWNyxsQ/Chat-GPT-Image-Sep-1-2025-11-23-34-AM.png" 
              alt="" 
              style={{
                width: '300px',
                height: '200px'
              }} 
            />
          </div></Link>
          <div style={{ width: '300px' }}></div>
          {/* <div style={{ width: '300px' }}></div> */}
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
                padding: '16px',
                marginLeft: '0.5rem'
              }}>
                {totalPoints} / {mainTotals}
              </span>
            </p>
          </div>
        </div>

        {/* Original company info section */}
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

        {/* Original scores section */}
        <section className="flex justify-center items-center bg-gray-50">
          <div className="grid grid-cols-3 grid-rows-7 gap-0">
            {/* Left column - progress bars */}
            <div className="flex flex-col gap-6 row-span-7 space-y-3 ">
              {/* Progress bars */}
              <div className="flex items-center gap-2 mt-16">
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-red-400 h-6 rounded-full"
                    style={{ width: `${statusScore.percentage}%` }}
                  ></div>
                </div>
                <p className="text-lg font-bold">{statusScore.percentage}%</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-green-500 h-6 rounded-full"
                    style={{ width: `${goalScore.percentage}%` }}
                  ></div>
                </div>
                <p className="text-lg font-bold">{goalScore.percentage}%</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-orange-400 h-6 rounded-full"
                    style={{ width: `${scores.percentage}%` }}
                  ></div>
                </div>
                <p className="text-lg font-bold">{scores.percentage}%</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-[#803232] h-6 rounded-full"
                    style={{ width: `${strengthScore.percentage}%` }}
                  ></div>
                </div>
                <p className="text-lg font-bold">{strengthScore.percentage}%</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-blue-400 h-6 rounded-full"
                    style={{ width: `${heartScore.percentage}%` }}
                  ></div>
                </div>
                <p className="text-lg font-bold">{heartScore.percentage}%</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-red-800 h-6 rounded-full"
                    style={{ width: `${bloodTestScore.percentage}%` }}
                  ></div>
                </div>
                <p className="text-lg font-bold">{bloodTestScore.percentage}%</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-[#54275c] h-6 rounded-full"
                    style={{ width: `${visibilityScore.percentage}%` }}
                  ></div>
                </div>
                <p className="text-lg font-bold">{visibilityScore.percentage}%</p>
              </div>
            </div>

            {/* Middle column - image */}
            <div className="row-span-7 flex justify-center items-center">
              <img
                src="https://i.ibb.co.com/0j7gJRff/Whats-App-Image-2025-09-01-at-13-26-13-8a3ce716.jpg"
                alt="Business health chart"
                className="h-[550px] object-contain"
              />
            </div>

            {/* Right column - labels */}
            <div className="flex flex-col gap-6 row-span-7 space-y-3 ">
              <p className="text-xm font-bold text-red-400 mt-16">
                Business Preparation, Legals & Positions
              </p>
              <p className="text-xm font-bold text-green-500">
                Business Vision, Planning, & Action Plan
              </p>
              <p className="text-xm font-bold text-orange-400">
                
                Market Size & Customers
              </p>
              <p className="text-xm font-bold text-[#803232]">
                Business Strategy, System & Manpower
              </p>
              <p className="text-lg font-bold text-blue-400">
                 Your Products & Supply Chain
              </p>
              <p className="text-lg font-bold text-red-800">
               
                Profit, Productivity & Growth
              </p>
              <p className="text-lg font-bold text-[#54275c]">
                Visibility, Engagement & Conversion
              </p>
            </div>
          </div>
        </section>

        {/* Original recommendations section */}
        <div>
          <h2 className="text-5xl font-semibold m-10 text-center">Recommendations</h2>
          <section className="flex justify-center items-center ">
            <div className="grid grid-cols-3 grid-rows-7 gap-6">
              {/* Left column */}
              <div className="flex flex-col gap-6 row-span-7 space-y-3 ">
                <div className="h-[250px]"></div>

                
                <div className="">
                  <p className="text-lg font-bold text-green-500">
                    {visionAdvice?.tier} Status
                  </p>
                  <ol className="list-disc pl-6 text-green-500">
                    <li className="text-xm font-semibold text-green-500">{goalScore.advice?.hasVision?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-green-500">{goalScore.advice?.visionText?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-green-500">{goalScore.advice?.hasActionPlan?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-green-500">{goalScore.advice?.resourcePercentage?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-green-500">{goalScore.advice?.hasSkilledManpower?.message || 'No analysis available'}</li>
                  </ol>
                </div>

                <div className="h-[0px]"></div>

                <div className="">
                  <p className="text-lg font-bold text-[#803232] ">
                    {strengthAdvice?.tier} Status
                  </p>
                  <ol className="list-disc pl-6 text-[#803232]">
                    <li className="text-xm font-semibold text-[#803232]">{strengthScore?.advice?.employeeCount?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-[#803232]">{strengthScore?.advice?.employeeSkills?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-[#803232]">{strengthScore?.advice?.operationalResilience?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-[#803232]">{strengthScore?.advice?.marketingPlan?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-[#803232]">{strengthScore?.advice?.softwareUsage?.message || 'No analysis available'}</li>
                  </ol>
                </div>

                <div className="flex items-center gap-2"></div>

                
                <div className="">
                  <p className="text-lg font-bold text-red-800">
                    {bloodTestAdvice?.tier} Status
                  </p>
                  <ol className="list-disc pl-6 text-red-800">
                    <li className="text-xm font-semibold text-red-800">{bloodTestScore?.advice?.avgMonthlyRevenue?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-red-800">{bloodTestScore?.advice?.grossProfitMargin?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-red-800">{bloodTestScore?.advice?.monthlyFixedCosts?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-red-800">{bloodTestScore?.advice?.loanInstallment?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-red-800">{bloodTestScore?.advice?.dailyProduction?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-red-800">{bloodTestScore?.advice?.totalInvestment?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-red-800">{bloodTestScore?.advice?.totalAssets?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-red-800">{bloodTestScore?.advice?.customersQ4_2021?.message || 'No analysis available'}</li>
                  </ol>
                </div>

                <div className="flex items-center gap-2"></div>
              </div>

              {/* Middle column - image */}
              <div className="row-span-7 flex justify-center items-center">
                <img
                  src="https://i.ibb.co.com/0j7gJRff/Whats-App-Image-2025-09-01-at-13-26-13-8a3ce716.jpg"
                  alt="Business health chart"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-6 row-span-7 space-y-3  ">
                <div className="">
                  <p className="text-lg font-bold text-red-400">
                    {statusAdvice?.tier} Status
                  </p>
                  <ol className="list-disc pl-6 text-red-400">
                    <li className="text-xm font-semibold text-red-400">{statusScore?.advice?.tradeLicense?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-red-400">{statusScore?.advice?.bankAccount?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-red-400">{statusScore?.advice?.officeShowroom?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-red-400">{statusScore?.advice?.website?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-red-400">{statusScore?.advice?.socialMedia?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-red-400">{statusScore?.advice?.marketplace?.message || 'No analysis available'}</li>
                  </ol>
                </div>
                <p className=""></p>
                <div className="">
                  <p className="text-lg font-bold text-orange-400 ">
                    {marketAdvice?.tier} Status
                  </p>
                  <ol className="list-disc pl-6 text-orange-400">
                    <li className="text-xm font-semibold text-orange-400">{scores?.advice?.marketScope?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-orange-400">{scores?.advice?.marketSize?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-orange-400">{scores?.advice?.marketTrend?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-orange-400">{scores?.advice?.targetCustomer?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-orange-400">{scores?.advice?.monthlyCustomers?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-orange-400">{scores?.advice?.repeatCustomers?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-orange-400">{scores?.advice?.competitors?.message || 'No analysis available'}</li>
                  </ol>
                </div>
                
                <p className=""></p>
                <div className="">
                  <p className="text-lg font-bold text-blue-400">
                    {heartAdvice?.tier} Status
                  </p>
                  <ol className="list-disc pl-6 text-blue-400">
                    <li className="text-xm font-semibold text-blue-400">{heartScore?.advice?.uniqueFeatures?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-blue-400">{heartScore?.advice?.customerSatisfaction?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-blue-400">{heartScore?.advice?.packagingBranding?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-blue-400">{heartScore?.advice?.pricingPolicy?.message || 'No analysis available'}</li>
                    <li className="text-xm font-semibold text-blue-400">{heartScore?.advice?.dateLabeling?.message || 'No analysis available'}</li>
                  </ol>
                </div>
                
                <p className=""></p>
                <div className="">
                  <p className="text-lg font-bold text-[#54275c]">
                    {visibilityAdvice?.tier} Status
                  </p>
                  <ol className="list-disc pl-6 text-[#54275c]">
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
      </div>

      {/* Download button - only shown on screen */}
        <div className="screen-only flex justify-center items-center mt-4 mb-8">
          <div className="flex justify-center items-center">
            <button 
            onClick={downloadPDF} 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Download PDF Report
          </button>
          </div>
        </div>

     
      

      {/* PDF version - hidden on screen, only shows when printing */}
      <div id="pdf-content" className="print-only">
        <div className="report-header">
          <h1>Business Health Check-up Report</h1>
          <p>Generated on {new Date().toLocaleDateString()}</p>
        </div>

        <div className="section avoid-break">
          <h2>Company Information</h2>
          <table className="score-table">
            <tbody>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{info.name}</td>
              </tr>
              <tr>
                <td><strong>Organization:</strong></td>
                <td>{info.organization}</td>
              </tr>
              <tr>
                <td><strong>Position:</strong></td>
                <td>{info.position}</td>
              </tr>
              <tr>
                <td><strong>Service:</strong></td>
                <td>{info.service}</td>
              </tr>
              <tr>
                <td><strong>Total Score:</strong></td>
                <td>{totalPoints} / {mainTotals}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="section page-break avoid-break">
          <h2>Business Health Scores</h2>
          <table className="score-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Business Preparation, Legals & Positions</td>
                <td>{statusScore.percentage}%</td>
              </tr>
              <tr>
                <td>Market Size & Customers</td>
                <td>{scores.percentage}%</td>
              </tr>
              <tr>
                <td>Business Vision, Planning, & Action Plan</td>
                <td>{goalScore.percentage}%</td>
              </tr>
              <tr>
                <td>Business Strategy, System & Manpower</td>
                <td>{strengthScore.percentage}%</td>
              </tr>
              <tr>
                <td>Profit, Productivity & Growth</td>
                <td>{bloodTestScore.percentage}%</td>
              </tr>
              <tr>
                <td>Your Products & Supply Chain</td>
                <td>{heartScore.percentage}%</td>
              </tr>
              <tr>
                <td>Visibility, Engagement & Conversion</td>
                <td>{visibilityScore.percentage}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="section page-break">
          <h2>Recommendations</h2>
          
          <div className="avoid-break">
            <h3><strong>Market & Customers: {marketAdvice?.tier || 'N/A'} Status</strong></h3>
            <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
              {Object.values(scores?.advice || {}).map((advice, index) => (
                <li key={index}>{advice.message || 'No analysis available'}</li>
              ))}
            </ul>
          </div>
          
          <div className="avoid-break">
            <h3><strong>Business Strength: {strengthAdvice?.tier || 'N/A'} Status</strong></h3>
            <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
              {Object.values(strengthScore?.advice || {}).map((advice, index) => (
                <li key={index}>{advice.message || 'No analysis available'}</li>
              ))}
            </ul>
          </div>
          
          <div className="avoid-break">
            <h3><strong>Product & Supply: {heartAdvice?.tier || 'N/A'} Status</strong></h3>
            <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
              {Object.values(heartScore?.advice || {}).map((advice, index) => (
                <li key={index}>{advice.message || 'No analysis available'}</li>
              ))}
            </ul>
          </div>
          
          <div className="avoid-break">
            <h3><strong>Business Position: {statusAdvice?.tier || 'N/A'} Status</strong></h3>
            <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
              {Object.values(statusScore?.advice || {}).map((advice, index) => (
                <li key={index}>{advice.message || 'No analysis available'}</li>
              ))}
            </ul>
          </div>
          
          <div className="avoid-break">
            <h3><strong>Vision & Planning: {visionAdvice?.tier || 'N/A'} Status</strong></h3>
            <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
              {Object.values(goalScore?.advice || {}).map((advice, index) => (
                <li key={index}>{advice.message || 'No analysis available'}</li>
              ))}
            </ul>
          </div>
          
          <div className="avoid-break">
            <h3><strong>Finance & Growth: {bloodTestAdvice?.tier || 'N/A'} Status</strong></h3>
            <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
              {Object.values(bloodTestScore?.advice || {}).map((advice, index) => (
                <li key={index}>{advice.message || 'No analysis available'}</li>
              ))}
            </ul>
          </div>
          
          <div className="avoid-break">
            <h3><strong>Visibility & Engagement: {visibilityAdvice?.tier || 'N/A'} Status</strong></h3>
            <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
              {Object.values(visibilityScore?.advice || {}).map((advice, index) => (
                <li key={index}>{advice.message || 'No analysis available'}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section avoid-break">
          <p className="text-center"><strong>Confidential Business Report - For Internal Use Only</strong></p>
          <p className="text-center">Generated by PlanB Business Health Checker</p>
        </div>
      </div>


    </>
  );
};

export default AdviceReport;