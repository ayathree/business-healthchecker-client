// Import the sentiment library
import Sentiment from 'sentiment';

// Initialize sentiment analyzer once
const sentimentAnalyzer = new Sentiment();

const mainBloodTestTotal=30

// Helper function to analyze sentiment for financial/business text
function analyzeFinancialSentiment(text) {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return {
      score: 0,
      comparative: 0,
      sentiment: 'neutral',
      confidence: 0,
      tokenCount: 0
    };
  }
  
  // Use the sentiment library for analysis
  const result = sentimentAnalyzer.analyze(text);
  
  // Determine sentiment category
  let sentimentCategory = 'neutral';
  if (result.comparative > 0.1) sentimentCategory = 'positive';
  else if (result.comparative < -0.1) sentimentCategory = 'negative';
  
  // Calculate confidence based on score strength
  const confidence = Math.min(1, Math.abs(result.comparative) * 10);
  
  return {
    score: result.score,
    comparative: result.comparative,
    sentiment: sentimentCategory,
    confidence: confidence,
    tokenCount: result.words.length,
    tokens: result.words
  };
}

// Generate financial advice based on sentiment and content analysis
function generateFinancialAdvice(question, answer, value = null) {
  // Analyze sentiment of the answer
  const sentiment = analyzeFinancialSentiment(answer);
  
  const adviceTemplates = {
    // Revenue and financial metrics
    'avgMonthlyRevenue': {
      positive: "Strong revenue reporting! Clear financial tracking shows good business awareness.",
      neutral: "Revenue data provided. Consider more precise tracking for better insights.",
      negative: "Revenue reporting needs improvement. Accurate financial data is crucial for decision-making."
    },
    'grossProfitMargin': {
      positive: "Excellent profit margin awareness! Understanding margins is key to profitability.",
      neutral: "Margin information provided. Regular margin analysis can drive better pricing strategies.",
      negative: "Profit margin clarity needed. Focus on understanding your true costs and pricing."
    },
    'monthlyFixedCosts': {
      positive: "Great cost awareness! Knowing fixed costs helps with financial planning and stability.",
      neutral: "Cost information noted. Detailed cost tracking can reveal optimization opportunities.",
      negative: "Cost understanding needs improvement. Fixed costs significantly impact cash flow."
    },
    
    // Loans and financial obligations
    'loanInstallment': {
      positive: "Good loan management awareness! Understanding debt obligations is crucial for financial health.",
      neutral: "Loan information provided. Regular debt review helps maintain financial stability.",
      negative: "Loan clarity needed. Debt management is essential for business sustainability."
    },
    
    // Operational metrics
    'dailyProduction': {
      positive: "Excellent production awareness! Capacity understanding drives operational efficiency.",
      neutral: "Production data provided. Detailed capacity tracking can improve resource allocation.",
      negative: "Production clarity needed. Understanding capacity constraints is key to growth."
    },
    
    // Investment and assets
    'totalInvestment': {
      positive: "Strong investment tracking! Good awareness of capital deployment and business value.",
      neutral: "Investment information provided. Regular investment review supports strategic decisions.",
      negative: "Investment clarity needed. Understanding capital structure is vital for growth planning."
    },
    'totalAssets': {
      positive: "Excellent asset awareness! Good understanding of business valuation and resource allocation.",
      neutral: "Asset information provided. Comprehensive asset tracking supports financial management.",
      negative: "Asset clarity needed. Understanding your asset base is crucial for financial health."
    },
    
    // Customer metrics
    'customersQ4_2021': {
      positive: "Great customer tracking! Understanding historical trends informs future strategies.",
      neutral: "Customer data provided. Detailed customer analytics can reveal growth opportunities.",
      negative: "Customer clarity needed. Tracking customer metrics is essential for business development."
    },
    'customersQ1_2022': {
      positive: "Excellent recent customer awareness! Current data drives immediate business decisions.",
      neutral: "Customer information provided. Regular customer tracking supports adaptive strategies.",
      negative: "Recent customer clarity needed. Up-to-date metrics are crucial for responsive management."
    }
  };

  // Get the appropriate advice based on question and sentiment
  const template = adviceTemplates[question];
  if (template) {
    return {
      message: template[sentiment.sentiment],
      sentiment: sentiment.sentiment,
      confidence: sentiment.confidence,
      score: sentiment.comparative
    };
  }
  
  return {
    message: "Thank you for the financial information. Regular tracking of this metric supports better business decisions.",
    sentiment: 'neutral',
    confidence: 0.5,
    score: 0
  };
}

// Score calculation logic for Business Metrics section (6.1-6.10)
export function calculateBloodTestScores(formData) {
  const scores = {
    avgMonthlyRevenue: 0,
    grossProfitMargin: 0,
    monthlyFixedCosts: 0,
    loanInstallment: 0,
    ownerSalary: 0,
    dailyProduction: 0,
    totalInvestment: 0,
    totalAssets: 0,
    customersQ4_2021: 0,
    customersQ1_2022: 0,
    totalBloodTestPoints: 0,
    percentage: 0
  };

  const advice = {};

  // Helper function to calculate score based on sentiment and content quality
  const calculateScore = (answer, question) => {
    if (!answer || answer.trim().length === 0) return 0;
    
    const sentiment = analyzeFinancialSentiment(answer);
    const lengthScore = Math.min(3, Math.floor(answer.length / 10)); // Reward detailed answers
    const numericScore = /\d/.test(answer) ? 2 : 0; // Reward numeric data
    
    // Base score on sentiment strength and content quality
    let score = 0;
    
    if (sentiment.sentiment === 'positive') score = 2 + lengthScore + numericScore;
    else if (sentiment.sentiment === 'neutral') score = 1 + lengthScore + numericScore;
    else score = lengthScore; // Negative sentiment gets minimal points
    
    // Generate advice
    advice[question] = generateFinancialAdvice(question, answer);
    
    return Math.min(3, Math.max(0, score));
  };

  // Calculate scores using sentiment analysis
  scores.avgMonthlyRevenue = calculateScore(formData.avgMonthlyRevenue, 'avgMonthlyRevenue');
  scores.grossProfitMargin = calculateScore(formData.grossProfitMargin, 'grossProfitMargin');
  scores.monthlyFixedCosts = calculateScore(formData.monthlyFixedCosts, 'monthlyFixedCosts');
  scores.loanInstallment = calculateScore(formData.loanInstallment, 'loanInstallment');
  scores.ownerSalary = calculateScore(formData.ownerSalary, 'ownerSalary');
  scores.dailyProduction = calculateScore(formData.dailyProduction, 'dailyProduction');
  scores.totalInvestment = calculateScore(formData.totalInvestment, 'totalInvestment');
  scores.totalAssets = calculateScore(formData.totalAssets, 'totalAssets');
  scores.customersQ4_2021 = calculateScore(formData.customersQ4_2021, 'customersQ4_2021');
  scores.customersQ1_2022 = calculateScore(formData.customersQ1_2022, 'customersQ1_2022');

  // Calculate total points (max 30)
  const totalBloodTestPoints = Object.values(scores)
    .filter(val => typeof val === 'number')
    .reduce((sum, score) => sum + score, 0);

  // Convert to percentage
  scores.percentage = Math.round((totalBloodTestPoints / mainBloodTestTotal) * 100);
  scores.totalBloodTestPoints = totalBloodTestPoints;
  scores.advice = advice;

  return {...scores,mainBloodTestTotal};
}

// Simple function to get financial advice for any metric
export function getFinancialAdvice(metricName, answer) {
  return generateFinancialAdvice(metricName, answer);
}