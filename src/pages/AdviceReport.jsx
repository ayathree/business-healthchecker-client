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

  const { scores, info } = reportData;

  const getAdviceForScore = (category, percentage) => {
    const categoryData = adviceData.find(item => item.category === category);
    if (!categoryData) return null;

    return categoryData.scoreTiers.find(tier =>
      percentage >= tier.minScore && percentage <= tier.maxScore
    ) || null;
  };

  const marketAdvice = getAdviceForScore("Market and Customer", scores.percentage);
  console.log("Market Advice:", marketAdvice); // helpful debug

  const generatePDF = async () => {
    const element = document.getElementById('report-content');
    await new Promise(resolve => setTimeout(resolve, 500)); // wait for rendering

    const opt = {
      margin: 10,
      filename: `business_report_${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        scrollY: 0,
        useCORS: true,
        ignoreElements: (element) => {
          const styles = window.getComputedStyle(element);
          return styles.color.includes('oklch') ||
            styles.backgroundColor.includes('oklch');
        }
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: {
      avoid: ['.avoid-break'],
      mode: ['css', 'legacy']  // handles both tailwind/flex layouts and normal HTML
    }
    };

    setGeneratingPDF(true);
    html2pdf().set(opt).from(element).save().finally(() => {
      setGeneratingPDF(false);
    });
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
            <p className="text-xl font-semibold mb-4">Total Score: {scores.totalPoints}</p>
            <h3 className="text-lg font-medium text-blue-600">Market & Customers</h3>
            <p>Score: {scores.percentage}%</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${scores.percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <h4 className="font-medium">Market Scope</h4>
              <p>{scores.marketScope}/3</p>
            </div>
            <div>
              <h4 className="font-medium">Market Size</h4>
              <p>{scores.marketSize}/3</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="p-6 rounded-lg mb-8" style={{ backgroundColor: '#eff6ff' }}>
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>

        {marketAdvice ? (
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: getTierBackgroundColor(marketAdvice.tier),
              color: getTierTextColor(marketAdvice.tier),
              border: '1px solid #ccc'
            }}
          >
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
      </section>

      {/* PDF Button */}
      <div>

      <button
        onClick={generatePDF}
        disabled={generatingPDF}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
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
