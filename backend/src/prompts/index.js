/**
 * Home Insurance LLM Prompts for Agent Dashboard
 * These prompts can be used with any LLM API (OpenAI, Claude, etc.)
 */

const PROMPTS = {
  // Summary generation prompt
  GENERATE_SUMMARY: `You are an AI assistant analyzing home insurance customer service transcripts. 
Given the following conversation transcript, generate a concise summary including:
1. Main topic (roof damage, water damage, coverage question, policy update, etc.)
2. Customer's main concern
3. Coverage details mentioned or requested
4. Resolution provided or action taken
5. Next steps if any

Transcript:
{transcript}

Provide response in JSON format with keys: title, keyTopics (array), resolution, sentiment (positive/negative/neutral), outcome.`,

  // Extract insights prompt
  EXTRACT_INSIGHTS: `Analyze this home insurance customer service transcript and extract:
1. Customer intent (coverage inquiry, claim filing, policy update, etc.)
2. Action items (follow-ups needed)
3. Policy details mentioned (coverage type, deductible, property location, etc.)
4. Customer sentiment
5. Whether follow-up is needed

Transcript:
{transcript}

Provide as JSON with keys: customerIntent, actionItems (array), policyDetails, sentiment, followUpRequired (boolean).`,

  // Extract key information prompt
  EXTRACT_KEY_INFO: `Extract the following from the home insurance transcript:
- Customer name
- Customer phone/email
- Policy number (if mentioned)
- Property address or location
- Coverage type (dwelling, water, weather, etc.)
- Claim type (if applicable)
- Deductible amount
- Priority level (high/medium/low)

Transcript:
{transcript}

Return as JSON.`,

  // Generate agent response prompt
  GENERATE_AGENT_RESPONSE: `Based on the customer message about home insurance, generate an appropriate response from the support agent.
Customer message: {message}
Previous context: {context}

Keep response professional, helpful, and accurate regarding home insurance coverage.`,

  // Sentiment analysis prompt
  ANALYZE_SENTIMENT: `Analyze the sentiment of this home insurance customer message and rate satisfaction 1-5:
Message: {message}
Return JSON with: sentiment (positive/negative/neutral), satisfactionScore (1-5), reasoning.`
};

/**
 * Format prompt with variables
 * @param {string} promptKey - Key from PROMPTS object
 * @param {object} variables - Variables to interpolate
 * @returns {string} Formatted prompt
 */
const formatPrompt = (promptKey, variables = {}) => {
  let prompt = PROMPTS[promptKey];
  
  if (!prompt) {
    throw new Error(`Prompt ${promptKey} not found`);
  }
  
  Object.entries(variables).forEach(([key, value]) => {
    prompt = prompt.replace(`{${key}}`, value);
  });
  
  return prompt;
};

module.exports = {
  PROMPTS,
  formatPrompt
};
