const prompts = require('../prompts');

/**
 * Mock LLM processor for hackathon
 * In production, this would call your actual LLM API (OpenAI, Claude, etc.)
 */

const generateSummary = async (transcript) => {
  try {
    // For hackathon, we'll extract key information instead of calling LLM
    const messages = transcript.messages || [];
    
    // Extract key topics and resolution
    const topics = extractTopics(messages);
    const resolution = extractResolution(messages);
    const sentiment = analyzeSentiment(messages);
    
    return {
      title: `Call with ${transcript.customerName}`,
      keyTopics: topics,
      resolution: resolution,
      sentiment: sentiment,
      duration: transcript.duration || 'Unknown',
      outcome: transcript.transferredToAgent ? 'Transferred to Agent' : 'Resolved',
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
};

const extractKeyInsights = async (transcript) => {
  try {
    const messages = transcript.messages || [];
    
    // Extract customer intent
    const intent = extractIntent(messages);
    
    // Extract action items
    const actionItems = extractActionItems(messages);
    
    // Extract policy details mentioned
    const policyDetails = extractPolicyDetails(messages);
    
    return {
      customerIntent: intent,
      actionItems: actionItems,
      policyDetails: policyDetails,
      followUpRequired: messages.some(m => 
        m.text.toLowerCase().includes('callback') ||
        m.text.toLowerCase().includes('followup') ||
        m.text.toLowerCase().includes('later')
      )
    };
  } catch (error) {
    console.error('Error extracting insights:', error);
    throw error;
  }
};

const extractTopics = (messages) => {
  const topicMap = {
    'coverage': ['coverage', 'covered', 'dwelling', 'protection', 'policy', 'includes'],
    'damage': ['damage', 'damaged', 'broken', 'destroyed', 'harm', 'harm'],
    'claims': ['claim', 'file', 'filing', 'claim status', 'submission'],
    'deductible': ['deductible', 'out of pocket', 'coinsurance'],
    'water': ['water', 'flood', 'rain', 'leaks', 'moisture', 'basement'],
    'roof': ['roof', 'shingle', 'gutter', 'chimney', 'attic'],
    'weather': ['weather', 'storm', 'hail', 'wind', 'thunderstorm', 'tornado'],
    'address': ['address', 'move', 'relocate', 'new home', 'location'],
    'policy': ['policy', 'renewal', 'premium', 'coverage limits', 'policy number']
  };
  
  const topics = new Set();
  messages.forEach(msg => {
    const text = msg.text.toLowerCase();
    Object.entries(topicMap).forEach(([topic, keywords]) => {
      if (keywords.some(kw => text.includes(kw))) {
        topics.add(topic);
      }
    });
  });
  
  return Array.from(topics);
};

const extractResolution = (messages) => {
  if (messages.length === 0) return 'Pending';
  
  const lastMessage = messages[messages.length - 1];
  const lastText = lastMessage.text.toLowerCase();
  
  if (lastText.includes('transfer') || lastText.includes('agent')) {
    return 'Transferred to Human Agent';
  } else if (lastText.includes('resolved') || lastText.includes('solved') || lastText.includes('done')) {
    return 'Resolved';
  } else if (lastText.includes('callback') || lastText.includes('followup')) {
    return 'Callback Scheduled';
  }
  
  return 'In Progress';
};

const analyzeSentiment = (messages) => {
  const negativeWords = ['problem', 'issue', 'angry', 'frustrated', 'upset', 'unhappy', 'wrong', 'broken', 'failed'];
  const positiveWords = ['happy', 'satisfied', 'great', 'thanks', 'appreciate', 'good', 'excellent', 'wonderful'];
  
  let negativeCount = 0;
  let positiveCount = 0;
  
  messages.forEach(msg => {
    const text = msg.text.toLowerCase();
    negativeWords.forEach(word => {
      if (text.includes(word)) negativeCount++;
    });
    positiveWords.forEach(word => {
      if (text.includes(word)) positiveCount++;
    });
  });
  
  if (positiveCount > negativeCount) return 'Positive';
  if (negativeCount > positiveCount) return 'Negative';
  return 'Neutral';
};

const extractIntent = (messages) => {
  const intentMap = {
    'Question': ['what', 'how', 'why', 'when', 'where', 'tell me', 'can you'],
    'Complaint': ['problem', 'issue', 'complaint', 'wrong', 'broken', 'failed'],
    'Request': ['cancel', 'upgrade', 'change', 'modify', 'request'],
    'Information': ['policy', 'coverage', 'premium', 'benefits', 'details']
  };
  
  if (messages.length === 0) return 'Unknown';
  
  const firstMessage = messages[0].text.toLowerCase();
  
  for (const [intent, keywords] of Object.entries(intentMap)) {
    if (keywords.some(kw => firstMessage.includes(kw))) {
      return intent;
    }
  }
  
  return 'General Inquiry';
};

const extractActionItems = (messages) => {
  const actions = [];
  
  messages.forEach(msg => {
    const text = msg.text.toLowerCase();
    
    if (text.includes('send') || text.includes('email')) {
      actions.push('Send email to customer');
    }
    if (text.includes('callback') || text.includes('call back')) {
      actions.push('Schedule callback');
    }
    if (text.includes('claim')) {
      actions.push('Process claim');
    }
    if (text.includes('document')) {
      actions.push('Send documents');
    }
  });
  
  return [...new Set(actions)];
};

const extractPolicyDetails = (messages) => {
  const details = {};
  
  messages.forEach(msg => {
    const text = msg.text;
    
    // Extract policy number (HOM-XXXX-XXXX pattern)
    const policyMatch = text.match(/HOM-\d+-\d+|HOM\d+/);
    if (policyMatch) details.policyNumber = policyMatch[0];
    
    // Extract coverage type
    if (text.toLowerCase().includes('dwelling')) details.coverageType = 'Dwelling Coverage';
    else if (text.toLowerCase().includes('water')) details.coverageType = 'Water Damage Coverage';
    else if (text.toLowerCase().includes('weather') || text.toLowerCase().includes('storm')) details.coverageType = 'Weather/Storm Coverage';
    else if (text.toLowerCase().includes('roof')) details.coverageType = 'Roof Coverage';
    
    // Extract deductible
    const deductMatch = text.match(/\$\d+\s*deductible/i);
    if (deductMatch) details.deductible = deductMatch[0];
    
    // Extract property address
    if (text.includes('Street') || text.includes('Avenue') || text.includes('Road')) {
      const addressMatch = text.match(/\d+\s+\w+\s+(Street|Avenue|Road|Drive|Lane|Boulevard|Court|Way|Place)/i);
      if (addressMatch) details.propertyAddress = addressMatch[0];
    }
  });
  
  return details;
};

module.exports = {
  generateSummary,
  extractKeyInsights
};
