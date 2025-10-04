// Import the sentiment library
import Sentiment from 'sentiment';

// Initialize sentiment analyzer once
const sentimentAnalyzer = new Sentiment();

const mainProductTotal=15

// Helper function to analyze sentiment for product/service text
function analyzeProductSentiment(text) {
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

// Generate product/service advice based on sentiment and content analysis
function generateProductAdvice(question, answer, additionalData = null) {
  // Analyze sentiment of the answer if it's text-based
  let sentiment = { sentiment: 'neutral', confidence: 0.5 };
  
  if (typeof answer === 'string' && answer.trim().length > 0) {
    sentiment = analyzeProductSentiment(answer);
  }

  const adviceTemplates = {
    'uniqueFeatures': {
      positive: "Excellent! Unique features differentiate your product and create competitive advantage.",
      neutral: "Consider developing unique features to stand out in the market.",
      negative: "Product differentiation is crucial. Focus on developing unique selling propositions."
    },
    'customerSatisfaction': {
      positive: "Outstanding customer satisfaction! This indicates strong product-market fit.",
      neutral: "Customer satisfaction is good but could be improved with better feedback mechanisms.",
      negative: "Address customer satisfaction issues promptly to maintain market position."
    },
    'packagingBranding': {
      positive: "Excellent packaging and branding! Strong visual identity enhances perceived value.",
      neutral: "Packaging and branding are adequate but could be strengthened for better market presence.",
      negative: "Consider investing in professional packaging and branding to improve market appeal."
    },
    'pricingPolicy': {
      positive: "Smart pricing strategy! This maximizes profitability while remaining competitive.",
      neutral: "Pricing strategy is functional but could be optimized for better market positioning.",
      negative: "Review your pricing strategy to ensure it aligns with market expectations and costs."
    },
    'dateLabeling': {
      positive: "Excellent quality control! Proper dating ensures product freshness and safety.",
      neutral: "Date labeling is implemented but could be more consistent for better quality assurance.",
      negative: "Implement proper date labeling to ensure product quality and customer safety."
    },
    'productDescription': {
      positive: "Compelling product description! This effectively communicates value to customers.",
      neutral: "Product description is adequate but could be more engaging and informative.",
      negative: "Enhance your product description to better communicate features and benefits."
    },
    'qualityControl': {
      positive: "Robust quality control processes! This ensures consistent customer experience.",
      neutral: "Quality control is in place but could be strengthened for better consistency.",
      negative: "Implement stronger quality control measures to maintain product standards."
    }
  };

  // Get the appropriate advice based on question and sentiment
  const template = adviceTemplates[question];
  if (template) {
    let message = template[sentiment.sentiment];
    
    // Add specific recommendations based on answer content
    if (additionalData) {
      switch (question) {
        case 'uniqueFeatures':
          if (additionalData.includes('patent') || additionalData.includes('exclusive')) {
            message += " Your patented/exclusive features provide strong market protection.";
          }
          break;
        case 'customerSatisfaction':
          if (additionalData.includes('repeat') || additionalData.includes('loyal')) {
            message += " High repeat business indicates strong customer loyalty.";
          }
          break;
        case 'pricingPolicy':
          if (additionalData.includes('premium') || additionalData.includes('value-based')) {
            message += " Premium/value-based pricing can significantly enhance profitability.";
          }
          break;
      }
    }
    
    return {
      message: message,
      sentiment: sentiment.sentiment,
      confidence: sentiment.confidence,
      score: sentiment.comparative
    };
  }
  
  return {
    message: "Thank you for the product information. Continuous improvement is key to market success.",
    sentiment: 'neutral',
    confidence: 0.5,
    score: 0
  };
}

// Main scoring function with sentiment analysis for product/service metrics
export function calculateHeartScores(formData) {
  const scores = {
    uniqueFeatures: 0,
    customerSatisfaction: 0,
    packagingBranding: 0,
    pricingPolicy: 0,
    dateLabeling: 0,
    totalProductPoints: 0,
    percentage: 0
  };

  const advice = {};

  // Helper function to calculate score with sentiment analysis
  const calculateProductScore = (answer, question, maxScore = 3) => {
    if (answer === undefined || answer === null) return 0;
    
    let score = 0;
    
    // For categorical answers (yes/no/somewhat)
    if (typeof answer === 'string') {
      const sentiment = analyzeProductSentiment(answer);
      
      switch (question) {
        case 'uniqueFeatures':
          if (answer === "yes") score = 3;
          else if (answer === "no") score = 1;
          break;
          
        case 'customerSatisfaction':
          if (answer === "yes") score = 3;
          else if (answer === "somewhat") score = 2;
          else if (answer === "no") score = 1;
          break;
          
        case 'packagingBranding':
          if (answer === "custom") score = 3;
          else if (answer === "stickers") score = 2;
          else if (answer === "market") score = 1;
          break;
          
        case 'pricingPolicy':
          if (answer === "smart") score = 3;
          else if (answer === "costPlus") score = 2;
          else if (answer === "no") score = 1;
          break;
          
        case 'dateLabeling':
          if (answer === "yes") score = 3;
          else if (answer === "never") score = 2;
          else if (answer === "no") score = 1;
          break;
          
        default:
          // For text-based answers, use sentiment scoring
          score = Math.min(maxScore, Math.max(0, Math.floor(sentiment.comparative * 10) + 1));
      }
    }
    
    // Generate advice
    advice[question] = generateProductAdvice(question, answer, formData[question + 'Details']);
    
    return Math.min(maxScore, Math.max(0, score));
  };

  // Calculate scores using sentiment analysis
  scores.uniqueFeatures = calculateProductScore(formData.uniqueFeatures, 'uniqueFeatures');
  scores.customerSatisfaction = calculateProductScore(formData.customerSatisfaction, 'customerSatisfaction');
  scores.packagingBranding = calculateProductScore(formData.packagingBranding, 'packagingBranding');
  scores.pricingPolicy = calculateProductScore(formData.pricingPolicy, 'pricingPolicy');
  scores.dateLabeling = calculateProductScore(formData.dateLabeling, 'dateLabeling');

  // Calculate total and percentage
  const totalProductPoints = 
    scores.uniqueFeatures +
    scores.customerSatisfaction +
    scores.packagingBranding +
    scores.pricingPolicy +
    scores.dateLabeling;
    
  scores.percentage = Math.round((totalProductPoints / mainProductTotal) * 100);
  scores.totalProductPoints = totalProductPoints;
  scores.advice = advice;

  return {...scores,mainProductTotal};
}

// Simple function to get product advice for any metric
export function getProductAdvice(metricName, answer, details = null) {
  return generateProductAdvice(metricName, answer, details);
}