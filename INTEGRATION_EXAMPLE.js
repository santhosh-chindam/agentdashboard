/**
 * HOME INSURANCE AGENT DASHBOARD - SAMPLE TRANSCRIPT SUBMISSION
 * 
 * This shows how to send a home insurance call transcript from your voice bot
 * to the dashboard backend for storage and AI-powered analysis.
 */

const sampleTranscriptPayload = {
  messages: [
    {
      sender: "Customer",
      text: "Hi, I have a question about my roof damage coverage. My roof was damaged in the storm last week.",
      timestamp: new Date().toISOString()
    },
    {
      sender: "Agent",
      text: "I'm sorry to hear about the storm damage. I can help you understand your dwelling coverage. What's your policy number?",
      timestamp: new Date().toISOString()
    },
    {
      sender: "Customer",
      text: "It's HOM-2024-9876. The wind knocked off some shingles and I'm worried about water getting in.",
      timestamp: new Date().toISOString()
    },
    {
      sender: "Agent",
      text: "I understand. Roof damage is covered under your dwelling coverage with a $1000 deductible. Given the complexity of roof claims, let me transfer you to our home insurance specialist who can guide you through the claims process.",
      timestamp: new Date().toISOString()
    },
    {
      sender: "Customer",
      text: "That would be great, thank you.",
      timestamp: new Date().toISOString()
    }
  ],
  customerName: "Robert Chen",
  customerPhone: "+1-555-876-5432",
  customerEmail: "robert.chen@email.com",
  agentName: "Voice Bot - Home Insurance Assistant",
  agentId: "bot-001",
  duration: "00:02:15",
  transferredToAgent: true,
  transferReason: "Roof damage claim assistance needed",
  propertyAddress: "456 Pine Avenue, Seattle WA 98101",
  policyNumber: "HOM-2024-9876",
  callStartTime: new Date().toISOString()
};

/**
 * SUBMISSION EXAMPLE (JavaScript/Node.js)
 * 
 * POST your home insurance transcript to the dashboard.
 * The backend will automatically generate a summary with:
 * - Coverage details and policy information
 * - Identified home insurance topics (roof, water, weather, etc.)
 * - Customer sentiment and intent
 * - Action items for the agent
 * - Deductible and dwelling coverage analysis
 */
async function submitTranscript() {
  try {
    const response = await fetch('http://localhost:5000/api/transcripts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sampleTranscriptPayload)
    });

    const result = await response.json();
    console.log('✅ Home insurance transcript saved:', result.data.id);
    console.log('📋 Summary will be auto-generated in background...');
    return result.data.id;
  } catch (error) {
    console.error('❌ Error submitting transcript:', error);
  }
}

/**
 * GET HOME INSURANCE SUMMARY EXAMPLE
 * 
 * Retrieves the AI-generated summary for a home insurance call.
 * The summary includes:
 * - Policy number and dwelling coverage details
 * - Identified issues (roof damage, water damage, etc.)
 * - Customer sentiment (concerned, satisfied, etc.)
 * - Required actions (documentation, claims filing, assessment)
 * - Follow-up needs
 */
async function getSummary(transcriptId) {
  try {
    const response = await fetch(`http://localhost:5000/api/summaries/${transcriptId}`);
    const result = await response.json();
    console.log('📊 Home insurance summary:', result.data);
    console.log('Coverage Details:', result.data.policy_details);
    console.log('Action Items:', result.data.action_items);
    return result.data;
  } catch (error) {
    console.error('❌ Error fetching summary:', error);
  }
}

/**
 * REGENERATE SUMMARY WITH REAL LLM
 * 
 * Connect to OpenAI, Claude, or other LLM for enhanced summaries.
 * Updates the summary with more detailed insights specific to home insurance claims.
 */
async function regenerateSummary(transcriptId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/summaries/${transcriptId}/regenerate`,
      { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          llmModel: 'gpt-4', // or 'claude-3-sonnet'
          apiKey: process.env.LLM_API_KEY
        })
      }
    );
    const result = await response.json();
    console.log('🔄 Updated home insurance summary:', result.data);
    return result.data;
  } catch (error) {
    console.error('❌ Error regenerating summary:', error);
  }
}

/**
 * COMPLETE WORKFLOW - HOME INSURANCE TRANSCRIPT TO DASHBOARD
 * 
 * 1. Voice bot captures home insurance call (roof damage, water damage, policy Q&A)
 * 2. Call is submitted to /api/transcripts endpoint
 * 3. Backend auto-generates summary with:
 *    - Policy number and coverage analysis
 *    - Home insurance topics identified
 *    - Customer intent and sentiment
 *    - Required action items
 * 4. Summary can be regenerated with real LLM for enhanced insights
 * 5. Home insurance agent reviews call + insights in dashboard
 */
async function main() {
  console.log('🏠 HOME INSURANCE AGENT DASHBOARD - Integration Example');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  console.log('\n1️⃣ Submitting home insurance transcript...');
  const transcriptId = await submitTranscript();

  if (transcriptId) {
    console.log('\n⏳ Waiting for summary generation (2 seconds)...');
    await new Promise(r => setTimeout(r, 2000));

    console.log('\n2️⃣ Fetching AI-generated summary...');
    const summary = await getSummary(transcriptId);

    console.log('\n3️⃣ Regenerating with full LLM insights...');
    const fullSummary = await regenerateSummary(transcriptId);

    console.log('\n✅ Home insurance workflow complete!');
    console.log('📊 Dashboard is now showing this call with all insights.');
  }
}

// Uncomment to run:
// main();

module.exports = {
  sampleTranscriptPayload,
  submitTranscript,
  getSummary,
  regenerateSummary
};
