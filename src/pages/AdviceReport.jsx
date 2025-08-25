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

            <section style={{ 
  padding: '24px', 
  borderRadius: '8px', 
  backgroundColor: "white", 
  marginBottom: '32px',
  border: '1px solid #10b981' // Green border for market section
}}>
  
  <h1 className="text-2xl font-bold mb-6">Market & Customers Analysis</h1>
      
  {/* Market Health Summary */}
  <div className="mb-6 p-4 bg-green-50 rounded">
    <h2 className="text-xl font-semibold mb-2">Market Position Overview</h2>
    <p>Overall Score: <span className="font-medium">{scores?.percentage || 0}%</span></p>
    <p>Total Points: <span className="font-medium">{scores?.totalPoints || 0}/21</span></p>
    <p>Market Understanding: <span className="capitalize font-medium">{
      scores?.percentage >= 80 ? 'Excellent' :
      scores?.percentage >= 60 ? 'Strong' :
      scores?.percentage >= 40 ? 'Developing' : 'Limited'
    }</span></p>
  </div>
      
  {/* Detailed Market Metrics */}
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Market Intelligence Analysis</h2>
        
    {/* Market Scope */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Market Scope Definition</h3>
      <p className="text-gray-700 mb-2">{scores?.advice?.marketScope?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Scope Level: {scores?.marketScope || 0}/3</p>
        <p>Performance: <span className="capitalize">{scores?.advice?.marketScope?.performance || 'none'}</span></p>
        <p>Sentiment: <span className="capitalize">{scores?.advice?.marketScope?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    {/* Market Size */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Market Size Potential</h3>
      <p className="text-gray-700 mb-2">{scores?.advice?.marketSize?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Size Score: {scores?.marketSize || 0}/3</p>
        <p>Estimated Size: {scores?.advice?.marketSize?.value?.toLocaleString() || 'Unknown'}</p>
        <p>Performance: <span className="capitalize">{scores?.advice?.marketSize?.performance || 'none'}</span></p>
      </div>
    </div>
        
    {/* Market Trend */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Market Trends</h3>
      <p className="text-gray-700 mb-2">{scores?.advice?.marketTrend?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Trend Score: {scores?.marketTrend || 0}/3</p>
        <p>Market Direction: <span className="capitalize">{scores?.advice?.marketTrend?.performance || 'unknown'}</span></p>
        <p>Sentiment: <span className="capitalize">{scores?.advice?.marketTrend?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    {/* Target Customer */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Target Customer Clarity</h3>
      <p className="text-gray-700 mb-2">{scores?.advice?.targetCustomer?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Targeting Score: {scores?.targetCustomer || 0}/3</p>
        <p>Approach: <span className="capitalize">{scores?.advice?.targetCustomer?.performance || 'undefined'}</span></p>
        <p>Sentiment: <span className="capitalize">{scores?.advice?.targetCustomer?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    {/* Monthly Customers */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Customer Volume</h3>
      <p className="text-gray-700 mb-2">{scores?.advice?.monthlyCustomers?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Volume Score: {scores?.monthlyCustomers || 0}/3</p>
        <p>Monthly Customers: {scores?.advice?.monthlyCustomers?.value?.toLocaleString() || 0}</p>
        <p>Performance: <span className="capitalize">{scores?.advice?.monthlyCustomers?.performance || 'none'}</span></p>
      </div>
    </div>

    {/* Repeat Customers */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Customer Loyalty</h3>
      <p className="text-gray-700 mb-2">{scores?.advice?.repeatCustomers?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Loyalty Score: {scores?.repeatCustomers || 0}/3</p>
        <p>Repeat Rate: {scores?.advice?.repeatCustomers?.value || 0}%</p>
        <p>Performance: <span className="capitalize">{scores?.advice?.repeatCustomers?.performance || 'none'}</span></p>
        <p>Sentiment: <span className="capitalize">{scores?.advice?.repeatCustomers?.sentiment || 'neutral'}</span></p>
      </div>
    </div>

    {/* Competitors */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Competitive Landscape</h3>
      <p className="text-gray-700 mb-2">{scores?.advice?.competitors?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Competition Score: {scores?.competitors || 0}/3</p>
        <p>Competitors: {scores?.advice?.competitors?.value?.toLocaleString() || 0}</p>
        <p>Intensity: <span className="capitalize">{scores?.advice?.competitors?.performance || 'none'}</span></p>
        <p>Sentiment: <span className="capitalize">{scores?.advice?.competitors?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
  </div>

  {/* Overall Market Recommendation */}
  {scores?.percentage !== undefined && (
    <div className="mt-8 p-4 border rounded" style={{
      backgroundColor: scores.percentage >= 80 ? '#ecfdf5' : 
                       scores.percentage >= 60 ? '#f0fdf4' : '#fffbeb',
      borderColor: scores.percentage >= 80 ? '#a7f3d0' : 
                   scores.percentage >= 60 ? '#bbf7d0' : '#fde68a'
    }}>
      <h3 className="font-semibold text-lg mb-2">Overall Market Strategy</h3>
      <p className="text-gray-700">
        {scores.percentage >= 80 ? 
          "Exceptional market understanding! Strong positioning with clear customer focus and competitive awareness." :
         scores.percentage >= 60 ? 
          "Solid market knowledge! Good foundation with opportunities for deeper market penetration." :
         scores.percentage >= 40 ?
          "Developing market awareness. Focus on customer research and competitive analysis." :
          "Limited market understanding. Prioritize market research and customer definition."
        }
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Based on your overall score of {scores.percentage}%
      </p>
      
      {/* Priority recommendations */}
      <div className="mt-4 text-sm">
        <p className="font-medium">Key Focus Areas:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          {scores.marketScope < 2 && <li>Define market scope and segments more precisely</li>}
          {scores.marketSize < 2 && <li>Conduct thorough market size analysis</li>}
          {scores.targetCustomer < 2 && <li>Develop detailed customer profiles</li>}
          {scores.monthlyCustomers < 2 && <li>Increase customer acquisition efforts</li>}
          {scores.repeatCustomers < 2 && <li>Implement customer retention strategies</li>}
          {scores.competitors < 2 && <li>Analyze competitive landscape thoroughly</li>}
        </ul>
      </div>
    </div>
  )}

  {/* Market Success Tips */}
  <div className="mt-6 p-4 bg-green-50 rounded">
    <h3 className="font-semibold text-lg mb-2">📊 Market Intelligence Tips</h3>
    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
      <li>Conduct regular market research and competitor analysis</li>
      <li>Develop detailed customer personas and journey maps</li>
      <li>Monitor market trends and adapt strategies accordingly</li>
      <li>Track customer acquisition costs and lifetime value</li>
      <li>Implement customer feedback systems continuously</li>
      <li>Analyze win/loss reasons for better positioning</li>
      <li>Stay updated on industry developments and regulations</li>
    </ul>
  </div>

  {/* Sentiment Insights */}
  {Object.values(scores?.advice || {}).some(advice => advice.sentiment !== 'neutral') && (
    <div className="mt-6 p-4 bg-emerald-50 rounded">
      <h3 className="font-semibold text-lg mb-2">🎯 Market Sentiment Insights</h3>
      <p className="text-sm text-gray-700">
        {Object.values(scores?.advice || {}).filter(a => a.sentiment === 'positive').length > 0 &&
          "Positive market sentiment detected - leverage favorable conditions for growth!"}
        {Object.values(scores?.advice || {}).filter(a => a.sentiment === 'negative').length > 0 &&
          " Some cautious market signals noted - monitor conditions and adapt strategies."}
      </p>
    </div>
  )}
</section>

            {scores.advice.resources?.length > 0 && (
              <>
                <h4 className="font-medium mb-2">Helpful Resources:</h4>
                <div className="space-y-2">
                  {scores.advice.resources.map((resource, index) => (
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

            <section style={{ 
  padding: '24px', 
  borderRadius: '8px', 
  backgroundColor: "white", 
  marginBottom: '32px',
  border: '1px solid #fecaca' // Red border for heart section
}}>
  
  <h1 className="text-2xl font-bold mb-6">Product Analysis (Heart)</h1>
      
  {/* Product Health Summary */}
  <div className="mb-6 p-4 bg-red-50 rounded">
    <h2 className="text-xl font-semibold mb-2">Product Health Overview</h2>
    <p>Overall Score: <span className="font-medium">{heartScore?.percentage || 0}%</span></p>
    <p>Total Points: <span className="font-medium">{heartScore?.totalPoints || 0}/15</span></p>
    <p>Product Strength: <span className="capitalize font-medium">{
      heartScore?.percentage >= 80 ? 'Excellent' :
      heartScore?.percentage >= 60 ? 'Strong' :
      heartScore?.percentage >= 40 ? 'Adequate' : 'Needs Improvement'
    }</span></p>
  </div>
      
  {/* Detailed Product Metrics */}
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Product Features Analysis</h2>
        
    {/* Unique Features */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Unique Features</h3>
      <p className="text-gray-700 mb-2">{heartScore?.advice?.uniqueFeatures?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600">
        <p>Score: {heartScore?.uniqueFeatures || 0}/3</p>
        <p>Sentiment: <span className="capitalize">{heartScore?.advice?.uniqueFeatures?.sentiment || 'neutral'}</span></p>
        <p>Confidence: {(heartScore?.advice?.uniqueFeatures?.confidence * 100 || 0).toFixed(0)}%</p>
      </div>
    </div>
        
    {/* Customer Satisfaction */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Customer Satisfaction</h3>
      <p className="text-gray-700 mb-2">{heartScore?.advice?.customerSatisfaction?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600">
        <p>Score: {heartScore?.customerSatisfaction || 0}/3</p>
        <p>Sentiment: <span className="capitalize">{heartScore?.advice?.customerSatisfaction?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    {/* Packaging & Branding */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Packaging & Branding</h3>
      <p className="text-gray-700 mb-2">{heartScore?.advice?.packagingBranding?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600">
        <p>Score: {heartScore?.packagingBranding || 0}/3</p>
        <p>Sentiment: <span className="capitalize">{heartScore?.advice?.packagingBranding?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    {/* Pricing Policy */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Pricing Policy</h3>
      <p className="text-gray-700 mb-2">{heartScore?.advice?.pricingPolicy?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600">
        <p>Score: {heartScore?.pricingPolicy || 0}/3</p>
        <p>Sentiment: <span className="capitalize">{heartScore?.advice?.pricingPolicy?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    {/* Date Labeling */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Date Labeling & Quality Control</h3>
      <p className="text-gray-700 mb-2">{heartScore?.advice?.dateLabeling?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600">
        <p>Score: {heartScore?.dateLabeling || 0}/3</p>
        <p>Sentiment: <span className="capitalize">{heartScore?.advice?.dateLabeling?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
  </div>

  {/* Overall Product Health Recommendation */}
  {heartScore?.percentage !== undefined && (
    <div className="mt-8 p-4 border rounded" style={{
      backgroundColor: heartScore.percentage >= 80 ? '#fef2f2' : 
                       heartScore.percentage >= 60 ? '#fefce8' : '#f0fdf4',
      borderColor: heartScore.percentage >= 80 ? '#fecaca' : 
                   heartScore.percentage >= 60 ? '#fde68a' : '#bbf7d0'
    }}>
      <h3 className="font-semibold text-lg mb-2">Overall Product Health Recommendation</h3>
      <p className="text-gray-700">
        {heartScore.percentage >= 80 ? 
          "Your product heart is strong! Excellent features, satisfaction, and positioning in the market." :
         heartScore.percentage >= 60 ? 
          "Good product foundation! Focus on enhancing unique features and customer experience." :
         heartScore.percentage >= 40 ?
          "Adequate product performance. Consider strategic improvements in differentiation and quality." :
          "Product needs immediate attention. Focus on core features, quality control, and customer satisfaction."
        }
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Based on your overall score of {heartScore.percentage}%
      </p>
      {heartScore.percentage < 60 && (
        <div className="mt-3 text-sm">
          <p className="font-medium">Priority Areas:</p>
          <ul className="list-disc list-inside mt-1">
            {heartScore.uniqueFeatures < 2 && <li>Develop unique selling propositions</li>}
            {heartScore.customerSatisfaction < 2 && <li>Improve customer satisfaction</li>}
            {heartScore.packagingBranding < 2 && <li>Enhance branding and packaging</li>}
            {heartScore.pricingPolicy < 2 && <li>Optimize pricing strategy</li>}
            {heartScore.dateLabeling < 2 && <li>Strengthen quality control</li>}
          </ul>
        </div>
      )}
    </div>
  )}

  {/* Product Success Tips */}
  <div className="mt-6 p-4 bg-blue-50 rounded">
    <h3 className="font-semibold text-lg mb-2">💡 Product Success Tips</h3>
    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
      <li>Regularly gather and act on customer feedback</li>
      <li>Continuously innovate and improve your product features</li>
      <li>Invest in professional packaging and consistent branding</li>
      <li>Monitor competitors and adjust pricing strategically</li>
      <li>Maintain strict quality control standards</li>
    </ul>
  </div>
</section>

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

            <section style={{ 
  padding: '24px', 
  borderRadius: '8px', 
  backgroundColor: "white", 
  marginBottom: '32px',
  border: '1px solid #6366f1' // Purple border for visibility section
}}>
  
  <h1 className="text-2xl font-bold mb-6">Visibility & Social Media Analysis</h1>
      
  {/* Visibility Summary */}
  <div className="mb-6 p-4 bg-indigo-50 rounded">
    <h2 className="text-xl font-semibold mb-2">Online Presence Overview</h2>
    <p>Overall Score: <span className="font-medium">{visibilityScore?.percentage || 0}%</span></p>
    <p>Total Points: <span className="font-medium">{visibilityScore?.totalPoints || 0}/15</span></p>
    <p>Digital Presence: <span className="capitalize font-medium">{
      visibilityScore?.percentage >= 80 ? 'Excellent' :
      visibilityScore?.percentage >= 60 ? 'Strong' :
      visibilityScore?.percentage >= 40 ? 'Developing' : 'Limited'
    }</span></p>
  </div>
      
  {/* Detailed Visibility Metrics */}
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Platform Performance Analysis</h2>
        
    {/* Facebook Likes */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Facebook Presence</h3>
      <p className="text-gray-700 mb-2">{visibilityScore?.advice?.facebookLikes?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Likes: {visibilityScore?.advice?.facebookLikes?.value?.toLocaleString() || 0}</p>
        <p>Score: {visibilityScore?.facebookLikes || 0}/3</p>
        <p>Performance: <span className="capitalize">{visibilityScore?.advice?.facebookLikes?.performance || 'none'}</span></p>
        <p>Sentiment: <span className="capitalize">{visibilityScore?.advice?.facebookLikes?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    {/* Instagram Followers */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Instagram Reach</h3>
      <p className="text-gray-700 mb-2">{visibilityScore?.advice?.instagramFollowers?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Followers: {visibilityScore?.advice?.instagramFollowers?.value?.toLocaleString() || 0}</p>
        <p>Score: {visibilityScore?.instagramFollowers || 0}/3</p>
        <p>Performance: <span className="capitalize">{visibilityScore?.advice?.instagramFollowers?.performance || 'none'}</span></p>
        <p>Sentiment: <span className="capitalize">{visibilityScore?.advice?.instagramFollowers?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    {/* YouTube Subscribers */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">YouTube Channel</h3>
      <p className="text-gray-700 mb-2">{visibilityScore?.advice?.youtubeSubscribers?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Subscribers: {visibilityScore?.advice?.youtubeSubscribers?.value?.toLocaleString() || 0}</p>
        <p>Score: {visibilityScore?.youtubeSubscribers || 0}/3</p>
        <p>Performance: <span className="capitalize">{visibilityScore?.advice?.youtubeSubscribers?.performance || 'none'}</span></p>
        <p>Sentiment: <span className="capitalize">{visibilityScore?.advice?.youtubeSubscribers?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
        
    {/* Post Reach */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Content Reach</h3>
      <p className="text-gray-700 mb-2">{visibilityScore?.advice?.postReach?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Average Reach: {visibilityScore?.advice?.postReach?.value?.toLocaleString() || 0}</p>
        <p>Score: {visibilityScore?.postReach || 0}/3</p>
        <p>Performance: <span className="capitalize">{visibilityScore?.advice?.postReach?.performance || 'none'}</span></p>
        <p>Sentiment: <span className="capitalize">{visibilityScore?.advice?.postReach?.sentiment || 'neutral'}</span></p>
      </div>
    </div>

    {/* Engagement Rate */}
    <div className="p-4 border rounded">
      <h3 className="font-medium text-lg">Audience Engagement</h3>
      <p className="text-gray-700 mb-2">{visibilityScore?.advice?.engagementRate?.message || 'No analysis available'}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Engagement Rate: {visibilityScore?.advice?.engagementRate?.value || 0}%</p>
        <p>Score: {visibilityScore?.engagementRate || 0}/3</p>
        <p>Performance: <span className="capitalize">{visibilityScore?.advice?.engagementRate?.performance || 'none'}</span></p>
        <p>Sentiment: <span className="capitalize">{visibilityScore?.advice?.engagementRate?.sentiment || 'neutral'}</span></p>
      </div>
    </div>
  </div>

  {/* Overall Visibility Recommendation */}
  {visibilityScore?.percentage !== undefined && (
    <div className="mt-8 p-4 border rounded" style={{
      backgroundColor: visibilityScore.percentage >= 80 ? '#eef2ff' : 
                       visibilityScore.percentage >= 60 ? '#f5f3ff' : '#faf5ff',
      borderColor: visibilityScore.percentage >= 80 ? '#c7d2fe' : 
                   visibilityScore.percentage >= 60 ? '#ddd6fe' : '#e9d5ff'
    }}>
      <h3 className="font-semibold text-lg mb-2">Overall Visibility Strategy</h3>
      <p className="text-gray-700">
        {visibilityScore.percentage >= 80 ? 
          "Exceptional online presence! Strong across all platforms with great engagement." :
         visibilityScore.percentage >= 60 ? 
          "Solid digital footprint! Focus on consistency and engagement to reach next level." :
         visibilityScore.percentage >= 40 ?
          "Developing online presence. Prioritize platform selection and content consistency." :
          "Limited digital visibility. Start with 1-2 platforms and build consistent presence."
        }
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Based on your overall score of {visibilityScore.percentage}%
      </p>
      
      {/* Platform-specific recommendations */}
      <div className="mt-4 text-sm">
        <p className="font-medium">Platform Focus Areas:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          {visibilityScore.facebookLikes < 2 && <li>Boost Facebook engagement with regular content</li>}
          {visibilityScore.instagramFollowers < 2 && <li>Grow Instagram with visual storytelling</li>}
          {visibilityScore.youtubeSubscribers < 2 && <li>Develop YouTube content strategy</li>}
          {visibilityScore.postReach < 2 && <li>Improve content reach through optimization</li>}
          {visibilityScore.engagementRate < 2 && <li>Increase audience interaction and engagement</li>}
        </ul>
      </div>
    </div>
  )}

  {/* Social Media Success Tips */}
  <div className="mt-6 p-4 bg-indigo-50 rounded">
    <h3 className="font-semibold text-lg mb-2">📱 Social Media Success Tips</h3>
    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
      <li>Post consistently (3-5 times per week per platform)</li>
      <li>Use high-quality visuals and engaging captions</li>
      <li>Respond to comments and messages promptly</li>
      <li>Use relevant hashtags and trending topics</li>
      <li>Analyze performance metrics regularly</li>
      <li>Collaborate with influencers in your niche</li>
      <li>Run targeted ads to boost visibility</li>
    </ul>
  </div>

  {/* Sentiment Insights */}
  {Object.values(visibilityScore?.advice || {}).some(advice => advice.sentiment !== 'neutral') && (
    <div className="mt-6 p-4 bg-purple-50 rounded">
      <h3 className="font-semibold text-lg mb-2">🎯 Audience Sentiment Insights</h3>
      <p className="text-sm text-gray-700">
        {Object.values(visibilityScore?.advice || {}).filter(a => a.sentiment === 'positive').length > 0 &&
          "Positive audience sentiment detected on some platforms - leverage this engagement!"}
        {Object.values(visibilityScore?.advice || {}).filter(a => a.sentiment === 'negative').length > 0 &&
          " Some negative sentiment noted - monitor feedback and address concerns proactively."}
      </p>
    </div>
  )}
</section>

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
