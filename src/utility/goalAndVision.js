// business-vision-analyzer.js

class BusinessVisionAnalyzer {
  constructor() {
    this.impactDimensions = {
      clarity: { weight: 0.25 },
      ambition: { weight: 0.25 },
      specificity: { weight: 0.20 },
      actionability: { weight: 0.15 },
      realism: { weight: 0.15 }
    };
  }

  analyzeVision(text) {
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return this.getDefaultAnalysis();
    }

    const trimmedText = text.trim();
    if (trimmedText.length < 10) {
      return this.getMinimalTextAnalysis();
    }

    const dimensionAnalyses = {
      clarity: this.analyzeClarity(trimmedText),
      ambition: this.analyzeAmbitionLevel(trimmedText),
      specificity: this.analyzeSpecificity(trimmedText),
      actionability: this.analyzeActionability(trimmedText),
      realism: this.analyzeRealism(trimmedText)
    };

    const impactScore = this.calculateBusinessImpactScore(dimensionAnalyses);
    const advice = this.generateBusinessImpactAdvice(dimensionAnalyses, trimmedText);

    return {
      businessImpactScore: impactScore,
      dimensionScores: dimensionAnalyses,
      strengths: advice.strengths,
      improvements: advice.improvements,
      wordCount: trimmedText.split(/\s+/).length,
      analysis: this.getQualitativeAnalysis(impactScore)
    };
  }

  analyzeClarity(text) {
    const clarityIndicators = {
      futureOriented: /(will|going to|future|next|years?|vision|goal|target|plan|strategy)/gi,
      clearSubject: /(we|our|company|organization|team)\s+(will|aim|plan|target)/gi,
      definitiveLanguage: /(will|shall|must|commit|ensure)/gi,
      vagueLanguage: /(might|could|possibly|maybe|hopefully)/gi
    };

    let clarityScore = 0;
    
    // Future orientation
    if (clarityIndicators.futureOriented.test(text)) clarityScore += 2;
    
    // Clear responsibility
    if (clarityIndicators.clearSubject.test(text)) clarityScore += 2;
    
    // Definitive language
    const definitiveCount = (text.match(clarityIndicators.definitiveLanguage) || []).length;
    clarityScore += Math.min(2, definitiveCount);
    
    // Penalize vagueness
    const vagueCount = (text.match(clarityIndicators.vagueLanguage) || []).length;
    clarityScore -= Math.min(2, vagueCount);

    return Math.max(0, Math.min(6, clarityScore));
  }

  analyzeAmbitionLevel(text) {
    const ambitionPatterns = [
      // High ambition - market leadership, transformation
      { pattern: /\b(leader|leading|top|best|dominant|pioneer|transform|revolution|breakthrough)\b/i, score: 3 },
      // Medium ambition - growth, expansion, improvement
      { pattern: /\b(grow|expand|increase|scale|improve|enhance|develop|build|strengthen)\b/i, score: 2 },
      // Low ambition - maintenance, stability
      { pattern: /\b(maintain|stable|consistent|sustain|continue|steady)\b/i, score: 1 },
      // Negative - unclear, lacking, problems
      { pattern: /\b(unclear|lack|uncertain|no.*plan|struggling|confusion|problem|issue)\b/i, score: 0 }
    ];

    let maxAmbitionScore = 0;
    ambitionPatterns.forEach(({ pattern, score }) => {
      if (pattern.test(text)) {
        maxAmbitionScore = Math.max(maxAmbitionScore, score);
      }
    });

    // Boost score if multiple ambition indicators present
    const ambitionIndicators = ambitionPatterns.filter(p => p.pattern.test(text)).length;
    if (ambitionIndicators > 1 && maxAmbitionScore > 0) {
      maxAmbitionScore = Math.min(6, maxAmbitionScore + 1);
    }

    return maxAmbitionScore;
  }

  analyzeSpecificity(text) {
    let specificityScore = 0;

    // Quantitative metrics
    const hasNumbers = /(\d+%?|\$?\d+[.,]?\d*\s*(million|thousand|billion|k|m)?)/gi;
    const numberCount = (text.match(hasNumbers) || []).length;
    specificityScore += Math.min(2, numberCount);

    // Timeframes
    const timeframes = /(\d+\s*(year|month|quarter)|by\s+\d{4}|within\s+\d+|next\s+\d+)/gi;
    const timeframeCount = (text.match(timeframes) || []).length;
    specificityScore += Math.min(2, timeframeCount);

    // Specific targets
    const specificTargets = /(revenue|growth|market share|customer|satisfaction|efficiency|profit|sales|product)/gi;
    const targetCount = (text.match(specificTargets) || []).length;
    specificityScore += Math.min(2, targetCount);

    return Math.min(6, specificityScore);
  }

  analyzeActionability(text) {
    let actionScore = 0;

    // Action verbs
    const actionVerbs = /\b(implement|develop|create|build|launch|establish|execute|achieve|reach|deliver|complete)\b/gi;
    const actionCount = (text.match(actionVerbs) || []).length;
    actionScore += Math.min(2, actionCount);

    // Process-oriented language
    const processLanguage = /\b(strategy|plan|roadmap|milestone|initiative|project|action|step)\b/gi;
    const processCount = (text.match(processLanguage) || []).length;
    actionScore += Math.min(2, processCount);

    // Team/Resource focus
    const resourceFocus = /\b(team|resource|talent|manpower|investment|budget|staff|people)\b/gi;
    if (resourceFocus.test(text)) actionScore += 1;

    return Math.min(6, actionScore);
  }

  analyzeRealism(text) {
    let realismScore = 2; // Start with neutral assumption

    // Balanced language
    const balancedLanguage = /\b(sustainable|realistic|practical|achievable|feasible|balanced|measured)\b/gi;
    if (balancedLanguage.test(text)) realismScore += 1;

    // Risk awareness
    const riskAwareness = /\b(manage|mitigate|address|consider|evaluate|assess)\b/gi;
    if (riskAwareness.test(text)) realismScore += 1;

    // Overly ambitious without specifics
    const overlyAmbitious = /\b(dominate|revolutionize|transform|#1|first).*?(?=\b(but|however|although)\b)?/gi;
    const hasHighAmbition = /\b(leader|top|best|#1|first)\b/gi;
    const hasSpecifics = this.analyzeSpecificity(text) > 2;

    if (hasHighAmbition.test(text) && !hasSpecifics) {
      realismScore -= 1; // Ambitious but vague
    }

    return Math.max(0, Math.min(6, realismScore));
  }

  calculateBusinessImpactScore(analyses) {
    let totalScore = 0;

    Object.entries(this.impactDimensions).forEach(([dimension, config]) => {
      const dimensionScore = analyses[dimension];
      const normalizedScore = (dimensionScore / 6) * config.weight;
      totalScore += normalizedScore;
    });

    const finalScore = totalScore * 3; // Convert to 0-3 scale
    return Math.round(finalScore * 10) / 10; // Round to 1 decimal
  }

  generateBusinessImpactAdvice(analysis, text) {
    const { clarity, ambition, specificity, actionability, realism } = analysis;
    
    const improvements = [];
    const strengths = [];
    
    // Clarity analysis
    if (clarity >= 4) strengths.push("Clear direction and commitment");
    else if (clarity >= 2) improvements.push("Add more definitive language and future orientation");
    else improvements.push("Define clear future direction with specific commitments");
    
    // Ambition analysis
    if (ambition >= 3) strengths.push("Ambitious vision");
    else if (ambition >= 2) strengths.push("Practical growth targets");
    else if (ambition >= 1) improvements.push("Consider more ambitious growth targets");
    else improvements.push("Define clear growth objectives and aspirations");
    
    // Specificity analysis
    if (specificity >= 4) strengths.push("Specific, measurable targets");
    else if (specificity >= 2) improvements.push("Include more specific metrics and timelines");
    else improvements.push("Add quantitative targets, timelines, and measurable goals");
    
    // Actionability analysis
    if (actionability >= 3) strengths.push("Action-oriented approach");
    else if (actionability >= 2) improvements.push("Define more concrete implementation steps");
    else improvements.push("Outline specific actions, initiatives, and implementation plans");
    
    // Realism analysis
    if (realism >= 3) strengths.push("Realistic and balanced approach");
    else if (realism >= 2) improvements.push("Ensure ambition is balanced with achievable milestones");
    else improvements.push("Balance vision with practical, achievable targets");
    
    return {
      strengths: strengths.length > 0 ? strengths : ["Foundation for vision development"],
      improvements
    };
  }

  getQualitativeAnalysis(score) {
    if (score >= 2.5) return "Excellent business vision with strong impact potential";
    if (score >= 2.0) return "Strong vision with good business fundamentals";
    if (score >= 1.5) return "Solid foundation with room for enhancement";
    if (score >= 1.0) return "Developing vision needing more specifics";
    return "Basic vision statement requiring significant development";
  }

  getDefaultAnalysis() {
    return {
      businessImpactScore: 0,
      dimensionScores: { clarity: 0, ambition: 0, specificity: 0, actionability: 0, realism: 0 },
      strengths: ["Please provide a vision statement for analysis"],
      improvements: ["Write a detailed vision statement to receive specific feedback"],
      wordCount: 0,
      analysis: "No vision statement provided"
    };
  }

  getMinimalTextAnalysis() {
    return {
      businessImpactScore: 0,
      dimensionScores: { clarity: 0, ambition: 0, specificity: 0, actionability: 0, realism: 0 },
      strengths: ["Please provide a more detailed vision statement"],
      improvements: ["Expand your vision to at least 10 words for meaningful analysis"],
      wordCount: 0,
      analysis: "Vision statement too brief for analysis"
    };
  }
}

// Main scoring function for your existing system
export function calculateVisionScores(responses) {
  const analyzer = new BusinessVisionAnalyzer();
  
  const scores = {
    writtenVision: responses.hasVision === "written" ? 3 : 
                 responses.hasVision === "inMind" ? 2 : 0,
                 
    actionPlan: responses.hasActionPlan === "yes" ? 3 : 0,
    
    resources: responses.resourcePercentage >= 8 ? 3 :
              responses.resourcePercentage >= 5 ? 2 :
              responses.resourcePercentage >= 2 ? 1 : 0,
              
    skilledManpower: responses.hasSkilledManpower === "yes" ? 3 : 0
  };
  
  // Enhanced business impact analysis for vision text
  const visionAnalysis = analyzer.analyzeVision(responses.visionText);
  scores.visionQuality = Math.round(visionAnalysis.businessImpactScore);
  
  // Generate enhanced advice
  scores.advice = {
    hasVision: generateBasicAdvice('hasVision', responses.hasVision),
    visionText: {
      message: formatVisionAdvice(visionAnalysis),
      positiveWords: 0,
      negativeWords: 0,
      comparativeScore: 0,
      visionClarity: visionAnalysis.dimensionScores.clarity,
      visionKeywords: 0
    },
    hasActionPlan: generateBasicAdvice('hasActionPlan', responses.hasActionPlan),
    resourcePercentage: generateBasicAdvice('resourcePercentage', responses.resourcePercentage),
    hasSkilledManpower: generateBasicAdvice('hasSkilledManpower', responses.hasSkilledManpower)
  };

  // Store detailed analysis
  scores.businessImpactAnalysis = visionAnalysis;

  // Calculate totals
  const mainVisionTotal = 15;
  const totalVisionPoints = Object.values(scores)
    .filter(val => typeof val === 'number')
    .reduce((sum, score) => sum + score, 0);
  
  scores.percentage = Math.round((totalVisionPoints / mainVisionTotal) * 100);
  scores.totalVisionPoints = totalVisionPoints;
  scores.mainVisionTotal = mainVisionTotal;
  
  return scores;
}

// Helper functions
function generateBasicAdvice(question, answer) {
  const adviceMap = {
    'hasVision': {
      'written': 'Excellent! Written vision dramatically increases success probability.',
      'inMind': 'Good start! Documenting your vision will improve clarity and focus.',
      'noUnderstanding': 'SMART goals provide clear direction for business growth.'
    },
    'hasActionPlan': {
      'yes': 'Strong execution planning! Regular reviews ensure progress.',
      'no': 'Action planning is crucial. Start with 90-day milestones.'
    },
    'resourcePercentage': (value) => {
      const numValue = parseInt(value) || 0;
      const actualPercent = numValue * 10;
      if (actualPercent >= 80) return `Strong resource base (${actualPercent}%)! Focus on optimal utilization.`;
      if (actualPercent >= 50) return `Moderate resources (${actualPercent}%). Strategic allocation needed.`;
      if (actualPercent >= 20) return `Limited resources (${actualPercent}%). Creativity and partnerships help.`;
      return `Minimal resources (${actualPercent}%). Leverage existing assets effectively.`;
    },
    'hasSkilledManpower': {
      'yes': 'Strong team foundation! Continuous development drives growth.',
      'no': 'Team capabilities are key. Consider training before new hiring.'
    }
  };
  
  let message = '';
  
  switch (question) {
    case 'hasVision':
    case 'hasActionPlan':
    case 'hasSkilledManpower':
      message = adviceMap[question][answer] || 'Thank you for your response.';
      break;
    
    case 'resourcePercentage':
      message = adviceMap[question](answer);
      break;
    
    default:
      message = `Thank you for your response about ${question}.`;
  }
  
  return { 
    message, 
    positiveWords: 0, 
    negativeWords: 0,
    comparativeScore: 0,
    visionClarity: 0,
    visionKeywords: 0
  };
}

function formatVisionAdvice(analysis) {
  const strengthText = analysis.strengths.length > 0 
    ? `Strengths: ${analysis.strengths.join(', ')}. `
    : '';
    
  const improvementText = analysis.improvements.length > 0
    ? `Areas for improvement: ${analysis.improvements.join(', ')}`
    : 'Vision is well-developed across all business dimensions.';
    
  return `${strengthText}${improvementText}`;
}

// Enhanced vision advice function
export function getVisionAdvice(visionText) {
  const analyzer = new BusinessVisionAnalyzer();
  const analysis = analyzer.analyzeVision(visionText);
  
  return {
    message: formatVisionAdvice(analysis),
    positiveWords: 0,
    negativeWords: 0,
    comparativeScore: 0,
    visionClarity: analysis.dimensionScores.clarity,
    visionKeywords: 0,
    businessImpactScore: analysis.businessImpactScore,
    qualitativeAnalysis: analysis.analysis
  };
}

// Example usage and testing
export function testVisionAnalysis() {
  const analyzer = new BusinessVisionAnalyzer();
  
  const testVisions = [
    // Vision 1: Neutral
    "Over the next 5 years, we aim to maintain stable growth by improving internal systems and strengthening our customer relationships.",
    
    // Vision 2: Negative  
    "At present, our business lacks a clear 5-year direction or measurable goals, leading to confusion and inconsistent performance.",
    
    // Vision 3: Positive
    "Within the next 5 years, we aspire to become an industry leader recognized for innovation, quality, and customer trust. Our goal is to expand into new markets, achieve 40% annual growth, and build a high-performing team driving sustainable success."
  ];
  
  console.log("=== Business Vision Analysis Results ===");
  
  testVisions.forEach((vision, index) => {
    const result = analyzer.analyzeVision(vision);
    console.log(`\nVision ${index + 1}:`);
    console.log(`Score: ${result.businessImpactScore}`);
    console.log(`Analysis: ${result.analysis}`);
    console.log(`Strengths: ${result.strengths.join(', ')}`);
    console.log(`Improvements: ${result.improvements.join(', ')}`);
    console.log(`Dimension Scores:`, result.dimensionScores);
  });
  
  return testVisions.map(vision => analyzer.analyzeVision(vision));
}

// Uncomment to run tests
// testVisionAnalysis();