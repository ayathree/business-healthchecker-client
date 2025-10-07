const mainPositionTotal = 18;

// Generate infrastructure advice based on metrics
function generateInfrastructureAdvice(metricName, value) {
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
    }
  };

  let message = '';
  let performance = '';

  switch (metricName) {
    case 'tradeLicense':
    case 'bankAccount':
    case 'officeShowroom':
    case 'website':
    case 'marketplace':
      performance = value;
      message = adviceTemplates[metricName][value] || adviceTemplates[metricName].default;
      break;
      
    case 'socialMedia':
      const socialCount = Array.isArray(value) ? value.length : 0;
      performance = socialCount >= 4 ? 'high' : socialCount >= 2 ? 'medium' : socialCount === 1 ? 'low' : 'none';
      message = adviceTemplates.socialMedia[performance] || adviceTemplates.socialMedia.default;
      if (socialCount > 0) message += ` (${socialCount} platforms)`;
      break;
      
    default:
      message = "Infrastructure assessment completed. Continuous improvement recommended.";
  }

  return {
    message: message,
    performance: performance,
    value: value,
    count: Array.isArray(value) ? value.length : null
  };
}

// Calculate infrastructure scores
export function calculateInfrastructureScores(formData) {
  const scores = {
    tradeLicense: 0,
    bankAccount: 0,
    officeShowroom: 0,
    website: 0,
    socialMedia: 0,
    marketplace: 0,
    totalPositionPoints: 0,
    percentage: 0
  };

  const advice = {};

  // Trade License
  if (formData.tradeLicense === 'Yes') scores.tradeLicense = 3;
  else if (formData.tradeLicense === 'Yes, but it is not updated') scores.tradeLicense = 2;
  advice.tradeLicense = generateInfrastructureAdvice('tradeLicense', formData.tradeLicense);

  // Bank Account
  scores.bankAccount = formData.bankAccount === 'Yes' ? 3 : 0;
  advice.bankAccount = generateInfrastructureAdvice('bankAccount', formData.bankAccount);

  // Office/Showroom
  scores.officeShowroom = formData.officeShowroom === 'Yes' ? 3 : 0;
  advice.officeShowroom = generateInfrastructureAdvice('officeShowroom', formData.officeShowroom);

  // Website
  scores.website = formData.website === 'Yes' ? 3 : 0;
  advice.website = generateInfrastructureAdvice('website', formData.website);

  // Social Media
  const socialCount = Array.isArray(formData.socialMedia) ? formData.socialMedia.length : 0;
  if (socialCount >= 4) scores.socialMedia = 3;
  else if (socialCount >= 2) scores.socialMedia = 2;
  else if (socialCount === 1) scores.socialMedia = 1;
  advice.socialMedia = generateInfrastructureAdvice('socialMedia', formData.socialMedia);

  // Marketplace
  scores.marketplace = formData.marketplace === 'Yes' ? 3 : 0;
  advice.marketplace = generateInfrastructureAdvice('marketplace', formData.marketplace);

  // Calculate totals
  scores.totalPositionPoints = Object.values(scores).reduce((sum, score, index) => {
    // Only sum the first 6 scores (skip totalPositionPoints and percentage)
    return index < 6 ? sum + score : sum;
  }, 0);
  
  scores.percentage = Math.round((scores.totalPositionPoints / mainPositionTotal) * 100);
  scores.advice = advice;

  return { ...scores, mainPositionTotal };
}

// Additional utility function for quick analysis
export function getInfrastructureSummary(scores) {
  const performanceLevel = scores.percentage >= 80 ? 'Excellent' :
                          scores.percentage >= 60 ? 'Good' :
                          scores.percentage >= 40 ? 'Average' : 'Needs Improvement';
  
  return {
    performanceLevel,
    totalPoints: scores.totalPositionPoints,
    maxPoints: mainPositionTotal,
    percentage: scores.percentage
  };
}