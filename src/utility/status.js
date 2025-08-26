// Import the sentiment library
import Sentiment from 'sentiment';

// Initialize sentiment analyzer once
const sentimentAnalyzer = new Sentiment();

// Helper function to analyze sentiment for infrastructure text
function analyzeInfrastructureSentiment(text) {
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

// Generate infrastructure advice based on metrics and sentiment
function generateInfrastructureAdvice(metricName, value, description = null, additionalData = null) {
  let sentiment = { sentiment: 'neutral', confidence: 0.5 };
  
  // Analyze description text if provided
  if (description && typeof description === 'string' && description.trim().length > 0) {
    sentiment = analyzeInfrastructureSentiment(description);
  }

  const adviceTemplates = {
    'tradeLicense': {
      'Yes': "Excellent! Valid trade license ensures legal compliance and business credibility.",
      'Yes, but it is not updated': "Trade license needs updating. Current status may affect legal standing and credibility.",
      'No': "Critical: Trade license required for legal operation and business credibility.",
      'default': "Legal compliance is essential for business sustainability."
    },
    'bankAccount': {
      'Yes': "Excellent! Separate bank account ensures proper financial management and transparency.",
      'No': "Essential: Business bank account needed for financial organization and credibility.",
      'default': "Professional financial management requires separate business accounts."
    },
    'officeShowroom': {
      'Yes': "Excellent! Physical presence enhances credibility and customer accessibility.",
      'No': "Consider: Physical space can improve professional image and operations.",
      'default': "Business premises contribute to operational efficiency and customer trust."
    },
    'website': {
      'Yes': "Excellent! Website establishes online presence and 24/7 accessibility.",
      'No': "Important: Website needed for digital presence and customer reach.",
      'default': "Online presence is crucial in digital business environment."
    },
    'socialMedia': {
      high: "Excellent social media presence! Strong engagement across multiple platforms.",
      medium: "Good social media coverage. Consider expanding to additional platforms.",
      low: "Limited social media presence. Important for customer engagement and marketing.",
      none: "Critical: Social media presence needed for modern business visibility.",
      default: "Social media enhances customer connection and brand awareness."
    },
    'marketplace': {
      'Yes': "Excellent! Marketplace presence expands reach and sales opportunities.",
      'No': "Consider: Online marketplaces can significantly increase customer access.",
      'default': "Multi-channel presence improves business resilience and reach."
    },
    'technology': {
      high: "Excellent technology infrastructure! Supports efficiency and scalability.",
      medium: "Adequate technology setup. Consider upgrades for better performance.",
      low: "Basic technology infrastructure. Investment needed for growth.",
      none: "Critical: Technology infrastructure required for modern operations.",
      default: "Technology enables business efficiency and competitive advantage."
    }
  };

  // Generate appropriate message based on metric
  let message = '';
  let performance = '';

  switch (metricName) {
    case 'tradeLicense':
      performance = value;
      message = adviceTemplates.tradeLicense[value] || adviceTemplates.tradeLicense.default;
      break;
      
    case 'bankAccount':
      performance = value;
      message = adviceTemplates.bankAccount[value] || adviceTemplates.bankAccount.default;
      break;
      
    case 'officeShowroom':
      performance = value;
      message = adviceTemplates.officeShowroom[value] || adviceTemplates.officeShowroom.default;
      break;
      
    case 'website':
      performance = value;
      message = adviceTemplates.website[value] || adviceTemplates.website.default;
      break;
      
    case 'socialMedia':
      const count = additionalData || 0;
      performance = count >= 4 ? 'high' : count >= 2 ? 'medium' : count === 1 ? 'low' : 'none';
      message = adviceTemplates.socialMedia[performance] || adviceTemplates.socialMedia.default;
      if (count > 0) message += ` (${count} platforms)`;
      break;
      
    case 'marketplace':
      performance = value;
      message = adviceTemplates.marketplace[value] || adviceTemplates.marketplace.default;
      break;
      
    default:
      message = "Infrastructure assessment completed. Continuous improvement recommended.";
  }

  // Add sentiment insights if description provided
  if (description && description.trim().length > 0) {
    if (sentiment.sentiment === 'positive') {
      message += " Positive infrastructure assessment noted.";
    } else if (sentiment.sentiment === 'negative') {
      message += " Infrastructure improvements recommended.";
    }
  }

  return {
    message: message,
    sentiment: sentiment.sentiment,
    confidence: sentiment.confidence,
    performance: performance,
    value: value,
    count: additionalData
  };
}

// Enhanced infrastructure analysis with sentiment capabilities
export function calculateInfrastructureScores(formData) {
  const scores = {
    tradeLicense: 0,
    bankAccount: 0,
    officeShowroom: 0,
    website: 0,
    socialMedia: 0,
    marketplace: 0,
    totalPoints: 0,
    percentage: 0
  };

  const advice = {};

  // Helper function to calculate score with sentiment-aware advice
  const calculateInfrastructureScore = (value, metricName, descriptionField = null, count = null) => {
    let score = 0;

    switch (metricName) {
      case 'tradeLicense':
        if (value === 'Yes') score = 3;
        else if (value === 'Yes, but it is not updated') score = 2;
        else if (value === 'No') score = 0;
        break;
        
      case 'bankAccount':
        score = value === 'Yes' ? 3 : 0;
        break;
        
      case 'officeShowroom':
        score = value === 'Yes' ? 3 : 0;
        break;
        
      case 'website':
        score = value === 'Yes' ? 3 : 0;
        break;
        
      case 'socialMedia':
        const socialCount = count || formData.socialMedia?.length || 0;
        if (socialCount >= 4) score = 3;
        else if (socialCount >= 2) score = 2;
        else if (socialCount === 1) score = 1;
        break;
        
      case 'marketplace':
        score = value === 'Yes' ? 3 : 0;
        break;
    }

    // Generate advice with optional description analysis
    const description = descriptionField ? formData[descriptionField] : null;
    advice[metricName] = generateInfrastructureAdvice(metricName, value, description, count);

    return score;
  };

  // Calculate all scores
  scores.tradeLicense = calculateInfrastructureScore(
    formData.tradeLicense, 
    'tradeLicense', 
    'licenseDescription'
  );
  
  scores.bankAccount = calculateInfrastructureScore(
    formData.bankAccount, 
    'bankAccount', 
    'bankingDescription'
  );
  
  scores.officeShowroom = calculateInfrastructureScore(
    formData.officeShowroom, 
    'officeShowroom', 
    'premisesDescription'
  );
  
  scores.website = calculateInfrastructureScore(
    formData.website, 
    'website', 
    'websiteDescription'
  );
  
  scores.socialMedia = calculateInfrastructureScore(
    formData.socialMedia, 
    'socialMedia', 
    'socialMediaDescription',
    formData.socialMedia?.length
  );
  
  scores.marketplace = calculateInfrastructureScore(
    formData.marketplace, 
    'marketplace', 
    'marketplaceDescription'
  );

  // Calculate totals
  scores.totalPoints = Object.values(scores).slice(0, 6).reduce((a, b) => a + b, 0);
  scores.percentage = Math.round((scores.totalPoints / 18) * 100);
  scores.advice = advice;

  return scores;
}

// Additional function for detailed infrastructure analysis
export function analyzeInfrastructureStatus(infraData, descriptions = {}) {
  const analysis = {};
  
  Object.keys(infraData).forEach(metric => {
    if (metric !== 'totalPoints' && metric !== 'percentage') {
      const sentiment = descriptions[metric] ? analyzeInfrastructureSentiment(descriptions[metric]) : 
                       { sentiment: 'neutral', confidence: 0.5 };
      
      analysis[metric] = {
        score: infraData[metric],
        sentiment: sentiment.sentiment,
        recommendation: generateInfrastructureAdvice(metric, infraData[metric], descriptions[metric]).message
      };
    }
  });
  
  return analysis;
}