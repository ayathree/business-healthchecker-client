// src/utils/visionSentimentAdvisor.js
import Sentiment from 'sentiment';

export class VisionSentimentAdvisor {
  constructor() {
    this.sentiment = new Sentiment();
  }

  getVisionAdvice(question, answer) {
    // Always analyze, even for short answers
    if (!answer || typeof answer !== 'string') {
      return {
        score: 0,
        advice: 'No answer provided or invalid format.',
        question: question
      };
    }
    
    const result = this.sentiment.analyze(answer);
    const trimmedAnswer = answer.trim();
    const wordCount = trimmedAnswer.split(' ').length;
    
    console.log(`Vision sentiment for ${question}:`, result.score, answer);
    
    // Get base advice
    let advice;
    if (question === 'visionText') {
      advice = this.analyzeVisionText(trimmedAnswer, result.score);
    } else {
      if (result.score < -2) {
        advice = this.getNegativeVisionAdvice(question);
      } else if (result.score > 2) {
        advice = this.getPositiveVisionAdvice(question);
      } else {
        advice = this.getNeutralVisionAdvice(question);
      }
    }

    // Return ALWAYS with score and other metrics
    return {
      score: result.score,
      comparative: result.comparative,
      wordCount: wordCount,
      advice: advice,
      question: question,
      answer: trimmedAnswer.length > 100 ? trimmedAnswer.substring(0, 100) + '...' : trimmedAnswer
    };
  }

  analyzeVisionText(visionText, score) {
    const wordCount = visionText.split(' ').length;
    const hasFutureWords = /(will|going to|future|next|years|vision|goal)/i.test(visionText);
    const hasSpecificWords = /\d+|%|million|thousand|growth|expand/i.test(visionText);
    
    if (score < -3) {
      return "Your vision seems to carry some concerns. It's normal to feel uncertain about the future. Consider breaking your vision into smaller, achievable milestones to build confidence.";
    }
    
    if (score > 3) {
      if (wordCount > 20 && hasFutureWords && hasSpecificWords) {
        return "Excellent vision statement! It's detailed, future-oriented, and specific. This kind of clarity will guide your business effectively.";
      }
      return "Your vision shows great enthusiasm! Adding specific, measurable targets could make it even more powerful.";
    }

    if (wordCount < 10) {
      return "Your vision seems brief. Consider expanding it with more details about where you want to be in 3-5 years.";
    }
    
    return "Your vision appears practical. Ensure it includes specific goals and timelines for better focus.";
  }

  getNegativeVisionAdvice(question) {
    const adviceMap = {
      'hasVision': 'Not having a written vision is common but risky. Start by writing down just one goal for next year.',
      'visionText': 'Vision planning can feel overwhelming. Try starting with a simple 1-page business plan first.',
      'hasActionPlan': 'Action planning seems challenging. Begin with just the next 90 days instead of 5 years.',
      'resourcePercentage': 'Resource constraints are frustrating. Focus on leveraging what you have rather than what you lack.',
      'hasSkilledManpower': 'Team building is tough. Consider skills development before new hiring.'
    };

    return adviceMap[question] || `Vision and planning challenges are common. Many successful businesses started with uncertainty.`;
  }

  getPositiveVisionAdvice(question) {
    const adviceMap = {
      'hasVision': 'Great job having a vision! Written goals dramatically increase success rates.',
      'visionText': 'Excellent vision clarity! Regularly review and update it as your business grows.',
      'hasActionPlan': 'Strong planning! Consistent execution separates dreams from reality.',
      'resourcePercentage': 'Good resource awareness! Strategic allocation beats having more resources.',
      'hasSkilledManpower': 'Strong team foundation! Invest in your people—they build your future.'
    };

    return adviceMap[question] || `Your positive approach to ${this.formatQuestion(question)} will drive your business forward!`;
  }

  getNeutralVisionAdvice(question) {
    const adviceMap = {
      'hasVision': 'Consider documenting your vision. Written goals are 42% more likely to be achieved.',
      'visionText': 'Your vision seems practical. Add specific metrics and deadlines for better results.',
      'hasActionPlan': 'Planning is a journey. Start with quarterly reviews and adjust as needed.',
      'resourcePercentage': 'Resource assessment is key. Regular audits help optimize what you have.',
      'hasSkilledManpower': 'Team evaluation is important. Skills mapping reveals training opportunities.'
    };

    return adviceMap[question] || `Vision development is ongoing. Regular refinement leads to better clarity.`;
  }

  formatQuestion(question) {
    return question
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace('Has', '')
      .replace('Vision', 'Vision ')
      .replace('Action', 'Action ');
  }
}