// Import the sentiment library
import Sentiment from 'sentiment';

// Initialize sentiment analyzer once
const sentimentAnalyzer = new Sentiment();

const mainTotal=15

// Helper function to analyze sentiment for social media/text content
function analyzeSocialMediaSentiment(text) {
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

// Generate visibility/social media advice based on metrics and sentiment
function generateVisibilityAdvice(metricName, value, description = null) {
  let sentiment = { sentiment: 'neutral', confidence: 0.5 };
  
  // Analyze description text if provided
  if (description && typeof description === 'string' && description.trim().length > 0) {
    sentiment = analyzeSocialMediaSentiment(description);
  }

  const adviceTemplates = {
    'facebookLikes': {
      high: "Excellent Facebook presence! Strong engagement indicates good brand awareness.",
      medium: "Good Facebook following. Consider more engaging content to boost likes.",
      low: "Facebook presence needs improvement. Focus on regular posting and engagement.",
      none: "Facebook visibility requires attention. Start with consistent content strategy."
    },
    'instagramFollowers': {
      high: "Outstanding Instagram reach! Strong visual presence and audience connection.",
      medium: "Solid Instagram following. Leverage stories and reels for better engagement.",
      low: "Instagram growth needed. Focus on visual content and hashtag strategy.",
      none: "Instagram presence underdeveloped. Invest in visual content creation."
    },
    'youtubeSubscribers': {
      high: "Excellent YouTube channel! Strong subscriber base indicates valuable content.",
      medium: "Good YouTube presence. Consistent uploads can drive subscriber growth.",
      low: "YouTube channel needs growth. Focus on regular, valuable video content.",
      none: "YouTube visibility minimal. Consider video content strategy."
    },
    'postReach': {
      high: "Exceptional post reach! Content resonates well with your audience.",
      medium: "Good content reach. Optimize posting times for better engagement.",
      low: "Post reach needs improvement. Focus on quality and relevance of content.",
      none: "Limited content reach. Revise content strategy and targeting."
    },
    'engagementRate': {
      high: "Excellent engagement rates! Audience is highly involved with your content.",
      medium: "Good engagement levels. Interactive content can boost participation.",
      low: "Engagement needs improvement. Focus on calls-to-action and responses.",
      none: "Low engagement detected. Prioritize audience interaction."
    }
  };

  // Determine performance level based on value
  let performanceLevel = 'none';
  if (value > 0) {
    const thresholds = {
      'facebookLikes': { high: 10000, medium: 1000, low: 100 },
      'instagramFollowers': { high: 5000, medium: 500, low: 100 },
      'youtubeSubscribers': { high: 1000, medium: 100, low: 10 },
      'postReach': { high: 5000, medium: 500, low: 50 },
      'engagementRate': { high: 10, medium: 5, low: 2 } // percentage
    };

    if (value >= thresholds[metricName]?.high) performanceLevel = 'high';
    else if (value >= thresholds[metricName]?.medium) performanceLevel = 'medium';
    else if (value >= thresholds[metricName]?.low) performanceLevel = 'low';
  }

  let message = adviceTemplates[metricName]?.[performanceLevel] || 
               "Social media presence needs development and strategy.";

  // Add sentiment-based insights if description provided
  if (description && description.trim().length > 0) {
    if (sentiment.sentiment === 'positive') {
      message += " Positive audience sentiment detected in feedback.";
    } else if (sentiment.sentiment === 'negative') {
      message += " Some negative sentiment noted in audience feedback.";
    }
  }

  return {
    message: message,
    sentiment: sentiment.sentiment,
    confidence: sentiment.confidence,
    performance: performanceLevel,
    value: value
  };
}

// Enhanced scoring with sentiment analysis capabilities
export function calculateVisibilityScores(formData) {
  const scores = {
    facebookLikes: 0,
    instagramFollowers: 0,
    youtubeSubscribers: 0,
    postReach: 0,
    engagementRate: 0,
    totalPoints: 0,
    percentage: 0
  };

  const advice = {};

  // Parse numeric values safely
  const parseSocialMediaValue = (value) => {
    if (!value) return 0;
    if (typeof value === 'number') return value;
    const parsed = parseInt(value.toString().replace(/[^\d]/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  };

  // Calculate scores with sentiment-aware advice
  const calculateVisibilityScore = (value, metricName, descriptionField = null) => {
    const numericValue = parseSocialMediaValue(value);
    let score = 0;

    switch (metricName) {
      case 'facebookLikes':
        if (numericValue > 10000) score = 3;
        else if (numericValue >= 1000) score = 2;
        else if (numericValue >= 100) score = 1;
        break;
      
      case 'instagramFollowers':
        if (numericValue > 5000) score = 3;
        else if (numericValue >= 500) score = 2;
        else if (numericValue >= 100) score = 1;
        break;
      
      case 'youtubeSubscribers':
        if (numericValue > 1000) score = 3;
        else if (numericValue >= 100) score = 2;
        else if (numericValue >= 10) score = 1;
        break;
      
      case 'postReach':
        if (numericValue > 5000) score = 3;
        else if (numericValue >= 500) score = 2;
        else if (numericValue >= 50) score = 1;
        break;
      
      case 'engagementRate':
        if (numericValue > 10) score = 3;
        else if (numericValue >= 5) score = 2;
        else if (numericValue >= 2) score = 1;
        break;
    }

    // Generate advice with optional description analysis
    const description = descriptionField ? formData[descriptionField] : null;
    advice[metricName] = generateVisibilityAdvice(metricName, numericValue, description);

    return score;
  };

  // Calculate all scores
  scores.facebookLikes = calculateVisibilityScore(formData.facebookLikes, 'facebookLikes', 'facebookDescription');
  scores.instagramFollowers = calculateVisibilityScore(formData.instagramFollowers, 'instagramFollowers', 'instagramDescription');
  scores.youtubeSubscribers = calculateVisibilityScore(formData.youtubeSubscribers, 'youtubeSubscribers', 'youtubeDescription');
  scores.postReach = calculateVisibilityScore(formData.postReach, 'postReach', 'postReachDescription');
  scores.engagementRate = calculateVisibilityScore(formData.engagementRate, 'engagementRate', 'engagementDescription');

  // Calculate totals
  const totalPoints = scores.facebookLikes + scores.instagramFollowers + 
                      scores.youtubeSubscribers + scores.postReach + scores.engagementRate;
  
  scores.percentage = Math.round((totalPoints / mainTotal) * 100); // 5 metrics * 3 points max = 15
  scores.totalPoints = totalPoints;
  scores.advice = advice;

  return {...scores,mainTotal};
}

// Additional function for detailed social media analysis
export function analyzeSocialMediaPerformance(platform, followers, engagement, description = null) {
  const sentiment = description ? analyzeSocialMediaSentiment(description) : { sentiment: 'neutral', confidence: 0.5 };
  
  return {
    platform: platform,
    followerCount: followers,
    engagementScore: engagement,
    sentiment: sentiment.sentiment,
    recommendation: generateVisibilityAdvice(platform.toLowerCase(), followers, description).message
  };
}