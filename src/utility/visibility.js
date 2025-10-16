const mainVisibilityTotal = 12;

// Social media scoring configuration
const socialMediaMetrics = {
  facebookLikes: {
    thresholds: [100, 1000, 10000], // low, medium, high
    advice: {
      3: "Excellent Facebook presence! Strong engagement indicates good brand awareness.",
      2: "Good Facebook following. Consider more engaging content to boost likes.",
      1: "Facebook presence needs improvement. Focus on regular posting and engagement.",
      0: "Facebook visibility requires attention. Start with consistent content strategy."
    }
  },
  instagramFollowers: {
    thresholds: [100, 500, 5000], // low, medium, high
    advice: {
      3: "Outstanding Instagram reach! Strong visual presence and audience connection.",
      2: "Solid Instagram following. Leverage stories and reels for better engagement.",
      1: "Instagram growth needed. Focus on visual content and hashtag strategy.",
      0: "Instagram presence underdeveloped. Invest in visual content creation."
    }
  },
  youtubeSubscribers: {
    thresholds: [10, 100, 1000], // low, medium, high
    advice: {
      3: "Excellent YouTube channel! Strong subscriber base indicates valuable content.",
      2: "Good YouTube presence. Consistent uploads can drive subscriber growth.",
      1: "YouTube channel needs growth. Focus on regular, valuable video content.",
      0: "YouTube visibility minimal. Consider video content strategy."
    }
  },
  postReach: {
    thresholds: [50, 500, 5000], // low, medium, high
    advice: {
      3: "Exceptional post reach! Content resonates well with your audience.",
      2: "Good content reach. Optimize posting times for better engagement.",
      1: "Post reach needs improvement. Focus on quality and relevance of content.",
      0: "Limited content reach. Revise content strategy and targeting."
    }
  }
};

// Calculate score based on value and thresholds
function calculateSocialMediaScore(value, metricConfig) {
  if (!value && value !== 0) return 0;
  
  const numValue = parseSocialMediaValue(value);
  if (isNaN(numValue)) return 0;
  
  const { thresholds } = metricConfig;
  
  if (numValue >= thresholds[2]) return 3;
  if (numValue >= thresholds[1]) return 2;
  if (numValue >= thresholds[0]) return 1;
  return 0;
}

// Parse social media numbers safely
function parseSocialMediaValue(value) {
  if (!value) return 0;
  if (typeof value === 'number') return value;
  
  // Remove any non-digit characters and parse
  const cleanedValue = value.toString().replace(/[^\d]/g, '');
  const parsed = parseInt(cleanedValue);
  return isNaN(parsed) ? 0 : parsed;
}

// Generate social media advice based on score
function generateVisibilityAdvice(metricName, score, actualValue = null) {
  const metricConfig = socialMediaMetrics[metricName];
  if (!metricConfig) {
    return {
      message: "Social media assessment completed.",
      performance: 'neutral',
      value: score
    };
  }

  let message = metricConfig.advice[score];
  let performance = score >= 3 ? 'excellent' : score >= 2 ? 'good' : score >= 1 ? 'moderate' : 'poor';

  // Add context with actual numbers
  if (actualValue !== null) {
    switch (metricName) {
      case 'facebookLikes':
        message += ` (${actualValue.toLocaleString()} likes)`;
        break;
      case 'instagramFollowers':
        message += ` (${actualValue.toLocaleString()} followers)`;
        break;
      case 'youtubeSubscribers':
        message += ` (${actualValue.toLocaleString()} subscribers)`;
        break;
      case 'postReach':
        message += ` (${actualValue.toLocaleString()} average reach)`;
        break;
    }
  }

  return {
    message,
    performance,
    value: score,
    numericValue: actualValue
  };
}

// Main scoring function 
export function calculateVisibilityScores(formData) {
  const scores = {
    facebookLikes: 0,
    instagramFollowers: 0,
    youtubeSubscribers: 0,
    postReach: 0,
    totalVisibilityPoints: 0,
    percentage: 0
  };

  const advice = {};

  // 8.1 Facebook Likes Scoring
  const facebookLikes = parseSocialMediaValue(formData.facebookLikes);
  scores.facebookLikes = calculateSocialMediaScore(facebookLikes, socialMediaMetrics.facebookLikes);
  advice.facebookLikes = generateVisibilityAdvice('facebookLikes', scores.facebookLikes, facebookLikes);

  // 8.2 Instagram Followers Scoring
  const instagramFollowers = parseSocialMediaValue(formData.instagramFollowers);
  scores.instagramFollowers = calculateSocialMediaScore(instagramFollowers, socialMediaMetrics.instagramFollowers);
  advice.instagramFollowers = generateVisibilityAdvice('instagramFollowers', scores.instagramFollowers, instagramFollowers);

  // 8.3 YouTube Subscribers Scoring
  const youtubeSubscribers = parseSocialMediaValue(formData.youtubeSubscribers);
  scores.youtubeSubscribers = calculateSocialMediaScore(youtubeSubscribers, socialMediaMetrics.youtubeSubscribers);
  advice.youtubeSubscribers = generateVisibilityAdvice('youtubeSubscribers', scores.youtubeSubscribers, youtubeSubscribers);

  // 8.4 Post Reach Scoring
  const postReach = parseSocialMediaValue(formData.postReach);
  scores.postReach = calculateSocialMediaScore(postReach, socialMediaMetrics.postReach);
  advice.postReach = generateVisibilityAdvice('postReach', scores.postReach, postReach);

  // Calculate total points (max 12 - 4 metrics × 3 points each)
  const totalVisibilityPoints = 
    scores.facebookLikes +
    scores.instagramFollowers +
    scores.youtubeSubscribers +
    scores.postReach;
    
  scores.percentage = Math.round((totalVisibilityPoints / mainVisibilityTotal) * 100);
  scores.totalVisibilityPoints = totalVisibilityPoints;
  scores.advice = advice;

  return {
    ...scores,
    mainVisibilityTotal,
    performanceLevel: getVisibilityPerformanceLevel(scores.percentage)
  };
}

// Performance level utility
function getVisibilityPerformanceLevel(percentage) {
  if (percentage >= 80) return 'Excellent Social Media Presence';
  if (percentage >= 60) return 'Good Social Media Reach';
  if (percentage >= 40) return 'Moderate Online Visibility';
  return 'Needs Social Media Development';
}

// Social media analysis function
export function analyzeSocialMediaPerformance(scores) {
  const strengths = [];
  const improvements = [];

  if (scores.facebookLikes >= 2) strengths.push("Strong Facebook presence");
  else improvements.push("Improve Facebook engagement");

  if (scores.instagramFollowers >= 2) strengths.push("Good Instagram following");
  else improvements.push("Grow Instagram audience");

  if (scores.youtubeSubscribers >= 2) strengths.push("Solid YouTube channel");
  else improvements.push("Develop YouTube content");

  if (scores.postReach >= 2) strengths.push("Effective content reach");
  else improvements.push("Increase post visibility");

  return {
    strengths,
    improvements,
    overallScore: scores.percentage,
    recommendation: strengths.length >= 2 ? 
      "Strong social media foundation. Focus on content strategy and engagement." :
      "Build social media presence through consistent posting and audience engagement."
  };
}

// Quick social media assessment
export function getSocialMediaAdvice(platform, count) {
  const numericCount = parseSocialMediaValue(count);
  let score = 0;

  switch (platform) {
    case 'facebook':
      score = calculateSocialMediaScore(numericCount, socialMediaMetrics.facebookLikes);
      return generateVisibilityAdvice('facebookLikes', score, numericCount);
    case 'instagram':
      score = calculateSocialMediaScore(numericCount, socialMediaMetrics.instagramFollowers);
      return generateVisibilityAdvice('instagramFollowers', score, numericCount);
    case 'youtube':
      score = calculateSocialMediaScore(numericCount, socialMediaMetrics.youtubeSubscribers);
      return generateVisibilityAdvice('youtubeSubscribers', score, numericCount);
    default:
      return {
        message: "Social media platform assessment completed.",
        performance: 'neutral',
        value: 0
      };
  }
}