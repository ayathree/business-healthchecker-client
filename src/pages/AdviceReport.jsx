import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adviceData from '../utility/data.json';
import html2pdf from "html2pdf.js";

const AdviceReport = () => {
  const [reportData, setReportData] = useState(null);
  const [generatingPDF, setGeneratingPDF] = useState(false);

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

  const { scores, info, goalScore, strengthScore, bloodTestScore,heartScore, visibilityScore, statusScore, totalPoints } = reportData;

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

  


const generatePDF = async () => {
  const element = document.getElementById('report-content');
  
  // Add a class to indicate PDF generation (for any special styling)
  element.classList.add('generating-pdf');
  
  await new Promise(resolve => setTimeout(resolve, 1000)); // Increased timeout for better rendering

  const opt = {
    margin: 15, // Increased margin for better readability
    filename: `business_health_report_${Date.now()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      scrollY: 0,
      useCORS: true,
      ignoreElements: (element) => {
        // Skip interactive elements that might cause issues
        const styles = window.getComputedStyle(element);
        return styles.color.includes('oklch') ||
               styles.backgroundColor.includes('oklch');
        // if (element.tagName === 'BUTTON' || element.tagName === 'A') {
        //   return true;
        // }
        
      }
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true // Compress PDF for smaller file size
    },
    pagebreak: {
      avoid: ['.advice-item', '.sentiment-item'], // Avoid breaking individual advice items
      mode: ['css', 'legacy']
    }
  };

  setGeneratingPDF(true);
  try {
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('PDF generation failed:', error);
    alert('Failed to generate PDF. Please try again.');
  } finally {
    setGeneratingPDF(false);
    element.classList.remove('generating-pdf');
  }
};

  // Background color
  const getTierBackgroundColor = (tier) => {
    switch (tier) {
      case 'Critical': return '#fef2f2';     // red-50
      case 'Developing': return '#fffbeb';   // yellow-50
      case 'Good': return '#f0fdf4';         // green-50
      case 'Excellent': return '#eff6ff';    // blue-50
      default: return '#f9fafb';             // gray-50
    }
  };

  // Text color
  const getTierTextColor = (tier) => {
    switch (tier) {
      case 'Critical': return '#991b1b';     // red-800
      case 'Developing': return '#92400e';   // yellow-800
      case 'Good': return '#166534';         // green-800
      case 'Excellent': return '#1e40af';    // blue-800
      default: return '#1f2937';             // gray-800
    }
  };

  return (
    <div className="p-8" id="report-content">
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <p style={{
        fontSize: '32px',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#3b82f6', // blue-500
        margin: 0
      }} >plan<span style={{ color: '#ef4444' }}>B</span> solution</p>
           
      <h1 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#3b82f6', // blue-500
        margin: 0
      }}>Business Health Report</h1>
      </div>

      {/* Company Info */}
      <section className="mb-8 p-6 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
        <h2 className="text-xl font-semibold mb-4">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><span className="font-medium">Name:</span> {info.name}</p>
          <p><span className="font-medium">Organization:</span> {info.organization}</p>
          <p><span className="font-medium">Position:</span> {info.position}</p>
          <p><span className="font-medium">Service:</span> {info.service}</p>
        </div>
      </section>

      {/* Scores */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Assessment Results</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <p className="text-xl font-semibold mb-4">Total Score: {totalPoints}</p>
            <h3 className="text-lg font-medium text-blue-600 capitalize">Business Position/Status</h3>
            <p>Business Position/Status Score: {statusScore.percentage}%</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${statusScore.percentage}%` }}
              ></div>
            </div>
            <h3 className="text-lg font-medium text-blue-600 capitalize mt-4">Institutional eye, mouth and ear examination</h3>
            <p>Institutional eye, mouth and ear examination Score: {scores.percentage}%</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${scores.percentage}%` }}
              ></div>
            </div>
            <h3 className="text-lg font-medium text-blue-600 mt-4">Brain Checkup</h3>
            <p>Brain Checkup Score: {goalScore.percentage}%</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${goalScore.percentage}%` }}
              ></div>
            </div>
            <h3 className="text-lg font-medium text-blue-600 mt-4">Strength</h3>
            <p>Strength Score: {strengthScore.percentage}%</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${strengthScore.percentage}%` }}
              ></div>
            </div>
             <h3 className="text-lg font-medium text-blue-600 mt-4">Blood Test</h3>
            <p>Blood Test Score: {bloodTestScore.percentage}%</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${bloodTestScore.percentage}%` }}
              ></div>
            </div>
            <h3 className="text-lg font-medium text-blue-600 mt-4">Heart(Product)</h3>
            <p>Heart(Product) Score: {heartScore.percentage}%</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${heartScore.percentage}%` }}
              ></div>
            </div>
            <h3 className="text-lg font-medium text-blue-600 mt-4">Outlooking (Visibility)</h3>
            <p>Outlooking (Visibility) Score: {visibilityScore.percentage}%</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${visibilityScore.percentage}%` }}
              ></div>
            </div>
          </div>

          
        </div>
      </section>

      {/* Recommendations */}
      <section className="p-6 rounded-lg mb-8 space-y-10" style={{ backgroundColor: '#D3D3D3' }}>
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
         
        {statusAdvice ? (
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: getTierBackgroundColor(statusAdvice.tier),
              color: getTierTextColor(statusAdvice.tier),
              border: '1px solid #ccc'
            }}
          >
             <h3 className="text-2xl font-bold mb-2 capitalize">Business Position/Status</h3>
            <h3 className="text-lg font-medium mb-2">{statusAdvice.tier} Status</h3>
            <p className="mb-4">{statusAdvice.advice.message}</p>

            {statusAdvice.advice.specificActions?.length > 0 && (
              <>
                <h4 className="font-medium mb-2">Recommended Actions:</h4>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  {statusAdvice.advice.specificActions.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              </>
            )}

            {statusAdvice.advice.resources?.length > 0 && (
              <>
                <h4 className="font-medium mb-2">Helpful Resources:</h4>
                <div className="space-y-2">
                  {statusAdvice.advice.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1d4ed8', textDecoration: 'underline' }}
                    >
                      {resource.title}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-gray-500">No advice available for this score range.</p>
        )}

        {marketAdvice ? (
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: getTierBackgroundColor(marketAdvice.tier),
              color: getTierTextColor(marketAdvice.tier),
              border: '1px solid #ccc'
            }}
          >
             <h3 className="text-2xl font-bold mb-2 capitalize">Institutional eye, mouth and ear examination</h3>
            <h3 className="text-lg font-medium mb-2">{marketAdvice.tier} Status</h3>
            <p className="mb-4">{marketAdvice.advice.message}</p>

            {marketAdvice.advice.specificActions?.length > 0 && (
              <>
                <h4 className="font-medium mb-2">Recommended Actions:</h4>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  {marketAdvice.advice.specificActions.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              </>
            )}

            {marketAdvice.advice.resources?.length > 0 && (
              <>
                <h4 className="font-medium mb-2">Helpful Resources:</h4>
                <div className="space-y-2">
                  {marketAdvice.advice.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1d4ed8', textDecoration: 'underline' }}
                    >
                      {resource.title}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-gray-500">No advice available for this score range.</p>
        )}

        {visionAdvice ? (
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: getTierBackgroundColor(visionAdvice.tier),
              color: getTierTextColor(visionAdvice.tier),
              border: '1px solid #ccc'
            }}
          >
             <h3 className="text-2xl font-bold mb-2">Brain Checkup</h3>
            <h3 className="text-lg font-medium mb-2">{visionAdvice.tier} Status</h3>
            <p className="mb-4">{visionAdvice.advice.message}</p>

            {visionAdvice.advice.specificActions?.length > 0 && (
              <>
                {/* Sentiment-Based Advice Section */}

<section style={{ 
  padding: '24px', 
  borderRadius: '8px', 
  backgroundColor: "white", 
  marginBottom: '32px',
  border: '1px solid #93c5fd'
}}>
  
  <h1 className="text-2xl font-bold mb-6">Vision & Goals Analysis</h1>
      
  {/* Sentiment Summary */}
  <div className="mb-6 p-4 bg-gray-100 rounded">
    <h2 className="text-xl font-semibold mb-2">Sentiment Analysis</h2>
    <p>Overall Sentiment: <span className="capitalize font-medium">{goalScore.sentimentAnalysis?.sentiment || 'neutral'}</span></p>
    <p>Sentiment Score: {goalScore.sentimentAnalysis?.score?.toFixed(2) || '0.00'}</p>
    <p>Comparative Score: {goalScore.sentimentAnalysis?.comparative?.toFixed(3) || '0.000'}</p>
    <p>Word Count: {goalScore.sentimentAnalysis?.tokenCount || 0}</p>
  </div>
      
  {/* Detailed Advice */}
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Detailed Recommendations</h2>
        
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Vision Documentation</h3>
      <p>{goalScore.advice?.hasVision?.message}</p>
    </div>
        
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Vision Content</h3>
      <p>{goalScore.advice?.visionText?.message}</p>
      {goalScore.sentimentAnalysis && (
        <div className="mt-2 text-sm text-gray-600">
          <p>Positive words: {goalScore.sentimentAnalysis.positiveWords?.length || 0}</p>
          <p>Negative words: {goalScore.sentimentAnalysis.negativeWords?.length || 0}</p>
          <p>Tokens: {goalScore.sentimentAnalysis.tokens?.join(", ") || "None"}</p>
        </div>
      )}
    </div>
        
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Action Plan</h3>
      <p>{goalScore.advice?.hasActionPlan?.message}</p>
    </div>
        
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Resources</h3>
      <p>{goalScore.advice?.resourcePercentage?.message}</p>
    </div>
        
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Skilled Manpower</h3>
      <p>{goalScore.advice?.hasSkilledManpower?.message}</p>
    </div>
  </div>
</section>

              </>
            )}

            {visionAdvice.advice.resources?.length > 0 && (
              <>
                <h4 className="font-medium mb-2">Helpful Resources:</h4>
                <div className="space-y-2">
                  {visionAdvice.advice.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1d4ed8', textDecoration: 'underline' }}
                    >
                      {resource.title}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-gray-500">No advice available for this score range.</p>
        )}
        {strengthAdvice ? (
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: getTierBackgroundColor(strengthAdvice.tier),
              color: getTierTextColor(strengthAdvice.tier),
              border: '1px solid #ccc'
            }}
          >
             <h3 className="text-2xl font-bold mb-2">Strength</h3>
            <h3 className="text-lg font-medium mb-2">{strengthAdvice.tier} Status</h3>
            <p className="mb-4">{strengthAdvice.advice.message}</p>

            {strengthAdvice.advice.specificActions?.length > 0 && (
              <>
                <h4 className="font-medium mb-2">Recommended Actions:</h4>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  {strengthAdvice.advice.specificActions.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              </>
            )}

            {strengthAdvice.advice.resources?.length > 0 && (
              <>
                <h4 className="font-medium mb-2">Helpful Resources:</h4>
                <div className="space-y-2">
                  {strengthAdvice.advice.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1d4ed8', textDecoration: 'underline' }}
                    >
                      {resource.title}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-gray-500">No advice available for this score range.</p>
        )}
        {bloodTestAdvice ? (
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: getTierBackgroundColor(bloodTestAdvice.tier),
              color: getTierTextColor(bloodTestAdvice.tier),
              border: '1px solid #ccc'
            }}
          >
             <h3 className="text-2xl font-bold mb-2">Blood Test</h3>
            <h3 className="text-lg font-medium mb-2">{bloodTestAdvice.tier} Status</h3>
            <p className="mb-4">{bloodTestAdvice.advice.message}</p>

             <section style={{ 
  padding: '24px', 
  borderRadius: '8px', 
  backgroundColor: "white", 
  marginBottom: '32px',
  border: '1px solid #93c5fd'
}}>
  
  <h1 className="text-2xl font-bold mb-6">Financial Health Analysis (Blood Test)</h1>
      
  {/* Financial Health Summary */}
  <div className="mb-6 p-4 bg-blue-50 rounded">
    <h2 className="text-xl font-semibold mb-2">Financial Health Overview</h2>
    <p>Overall Score: <span className="font-medium">{bloodTestScore?.percentage || 0}%</span></p>
    <p>Total Points: <span className="font-medium">{bloodTestScore?.totalPoints || 0}/30</span></p>
    <p>Financial Awareness Level: <span className="capitalize font-medium">{
      bloodTestScore?.percentage >= 80 ? 'Excellent' :
      bloodTestScore?.percentage >= 60 ? 'Good' :
      bloodTestScore?.percentage >= 40 ? 'Fair' : 'Needs Improvement'
    }</span></p>
  </div>
      
  {/* Detailed Financial Metrics */}
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Financial Metrics Analysis</h2>
        
    {/* Monthly Revenue */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Average Monthly Revenue</h3>
      <p className="text-gray-700 mb-2">{bloodTestScore?.advice?.avgMonthlyRevenue?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600">
        <p>Score: {bloodTestScore?.avgMonthlyRevenue || 0}/3</p>
        <p>Sentiment: <span className="capitalize">{bloodTestScore?.advice?.avgMonthlyRevenue?.sentiment || 'neutral'}</span></p>
        <p>Confidence: {(bloodTestScore?.advice?.avgMonthlyRevenue?.confidence * 100 || 0).toFixed(0)}%</p>
      </div>
    </div>
        
    {/* Profit Margin */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Gross Profit Margin</h3>
      <p className="text-gray-700 mb-2">{bloodTestScore?.advice?.grossProfitMargin?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600">
        <p>Score: {bloodTestScore?.grossProfitMargin || 0}/3</p>
        <p>Sentiment: <span className="capitalize">{bloodTestScore?.advice?.grossProfitMargin?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    {/* Fixed Costs */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Monthly Fixed Costs</h3>
      <p className="text-gray-700 mb-2">{bloodTestScore?.advice?.monthlyFixedCosts?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600">
        <p>Score: {bloodTestScore?.monthlyFixedCosts || 0}/3</p>
        <p>Sentiment: <span className="capitalize">{bloodTestScore?.advice?.monthlyFixedCosts?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    {/* Loan Information */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Loan Management</h3>
      <p className="text-gray-700 mb-2">{bloodTestScore?.advice?.loanInstallment?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600">
        <p>Score: {bloodTestScore?.loanInstallment || 0}/3</p>
        <p>Sentiment: <span className="capitalize">{bloodTestScore?.advice?.loanInstallment?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    {/* Production Capacity */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Daily Production Capacity</h3>
      <p className="text-gray-700 mb-2">{bloodTestScore?.advice?.dailyProduction?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600">
        <p>Score: {bloodTestScore?.dailyProduction || 0}/3</p>
        <p>Sentiment: <span className="capitalize">{bloodTestScore?.advice?.dailyProduction?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    {/* Investment */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Total Investment</h3>
      <p className="text-gray-700 mb-2">{bloodTestScore?.advice?.totalInvestment?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600">
        <p>Score: {bloodTestScore?.totalInvestment || 0}/3</p>
        <p>Sentiment: <span className="capitalize">{bloodTestScore?.advice?.totalInvestment?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    {/* Assets */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Total Assets</h3>
      <p className="text-gray-700 mb-2">{bloodTestScore?.advice?.totalAssets?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600">
        <p>Score: {bloodTestScore?.totalAssets || 0}/3</p>
        <p>Sentiment: <span className="capitalize">{bloodTestScore?.advice?.totalAssets?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    {/* Customer Metrics */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Customer Base (Q4 2021)</h3>
      <p className="text-gray-700 mb-2">{bloodTestScore?.advice?.customersQ4_2021?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600">
        <p>Score: {bloodTestScore?.customersQ4_2021 || 0}/3</p>
        <p>Sentiment: <span className="capitalize">{bloodTestScore?.advice?.customersQ4_2021?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Customer Base (Q1 2022)</h3>
      <p className="text-gray-700 mb-2">{bloodTestScore?.advice?.customersQ1_2022?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600">
        <p>Score: {bloodTestScore?.customersQ1_2022 || 0}/3</p>
        <p>Sentiment: <span className="capitalize">{bloodTestScore?.advice?.customersQ1_2022?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
  </div>

  {/* Overall Financial Health Recommendation */}
  {bloodTestScore?.percentage !== undefined && (
    <div className="mt-8 p-4 border rounded" style={{
      backgroundColor: bloodTestScore.percentage >= 70 ? '#f0fdf4' : 
                       bloodTestScore.percentage >= 40 ? '#fffbeb' : '#fef2f2',
      borderColor: bloodTestScore.percentage >= 70 ? '#bbf7d0' : 
                   bloodTestScore.percentage >= 40 ? '#fde68a' : '#fecaca'
    }}>
      <h3 className="font-semibold text-lg mb-2">Overall Financial Health Recommendation</h3>
      <p className="text-gray-700">
        {bloodTestScore.percentage >= 70 ? 
          "Your financial health appears strong! Maintain regular tracking and consider strategic investments for growth." :
         bloodTestScore.percentage >= 40 ? 
          "Your financial awareness is developing. Focus on improving data tracking and financial planning." :
          "Immediate attention needed for financial management. Consider professional financial consultation."
        }
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Based on your overall score of {bloodTestScore.percentage}%
      </p>
    </div>
  )}
</section>

            {bloodTestAdvice.advice.resources?.length > 0 && (
              <>
                <h4 className="font-medium mb-2">Helpful Resources:</h4>
                <div className="space-y-2">
                  {bloodTestAdvice.advice.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1d4ed8', textDecoration: 'underline' }}
                    >
                      {resource.title}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-gray-500">No advice available for this score range.</p>
        )}
        {heartAdvice ? (
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: getTierBackgroundColor(heartAdvice.tier),
              color: getTierTextColor(heartAdvice.tier),
              border: '1px solid #ccc'
            }}
          >
             <h3 className="text-2xl font-bold mb-2">Heart(Product)</h3>
            <h3 className="text-lg font-medium mb-2">{heartAdvice.tier} Status</h3>
            <p className="mb-4">{heartAdvice.advice.message}</p>

            {heartAdvice.advice.specificActions?.length > 0 && (
              <>
                <h4 className="font-medium mb-2">Recommended Actions:</h4>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  {heartAdvice.advice.specificActions.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              </>
            )}

            {heartAdvice.advice.resources?.length > 0 && (
              <>
                <h4 className="font-medium mb-2">Helpful Resources:</h4>
                <div className="space-y-2">
                  {heartAdvice.advice.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1d4ed8', textDecoration: 'underline' }}
                    >
                      {resource.title}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-gray-500">No advice available for this score range.</p>
        )}
        {visibilityAdvice ? (
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: getTierBackgroundColor(visibilityAdvice.tier),
              color: getTierTextColor(visibilityAdvice.tier),
              border: '1px solid #ccc'
            }}
          >
             <h3 className="text-2xl font-bold mb-2">Outlooking (Visibility)</h3>
            <h3 className="text-lg font-medium mb-2">{visibilityAdvice.tier} Status</h3>
            <p className="mb-4">{visibilityAdvice.advice.message}</p>

            {visibilityAdvice.advice.specificActions?.length > 0 && (
              <>
                <h4 className="font-medium mb-2">Recommended Actions:</h4>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  {visibilityAdvice.advice.specificActions.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              </>
            )}

            {visibilityAdvice.advice.resources?.length > 0 && (
              <>
                <h4 className="font-medium mb-2">Helpful Resources:</h4>
                <div className="space-y-2">
                  {visibilityAdvice.advice.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1d4ed8', textDecoration: 'underline' }}
                    >
                      {resource.title}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-gray-500">No advice available for this score range.</p>
        )}
      </section>



      {/* PDF Button */}
      <div>

      <button
        onClick={generatePDF}
        disabled={generatingPDF}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 cursor-pointer"
      >
        {generatingPDF ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              {/* Optional spinner */}
            </svg>
            Generating...
          </>
        ) : (
          'Download PDF Report'
        )}
      </button>
      </div>
    </div>
  );
};

export default AdviceReport;
