const fs = require('fs');
const path = require('path');

const transcriptsDir = path.join(__dirname, 'data', 'transcripts');
const summariesDir = path.join(__dirname, 'data', 'summaries');

if (!fs.existsSync(summariesDir)) fs.mkdirSync(summariesDir, { recursive: true });

function generateSummaryFromTranscript(transcript) {
  const title = `${transcript.scenarioDescription || 'Home insurance enquiry'} - ${transcript.customer?.name || transcript.customerName || 'Customer'}`;
  const keyTopics = Array.from(new Set([
    ...(transcript.keyTopics || []),
    'home insurance',
    transcript.scenario || 'general enquiry'
  ])).slice(0, 6);

  const sentiment = transcript.sentiment?.overall || (Math.random() > 0.7 ? 'negative' : Math.random() > 0.5 ? 'neutral' : 'positive');
  const sentimentScore = transcript.sentiment?.score || (sentiment === 'positive' ? 0.9 : sentiment === 'neutral' ? 0.7 : 0.4);

  const resolution = transcript.scenario === 'claim'
    ? 'Claim recorded and forwarded to the claims team for assessment.'
    : transcript.scenario === 'address_change'
      ? 'Address updated on policy; confirmation email to be sent.'
      : 'Information provided and next steps shared with the customer.';

  const actionItems = [];
  if (transcript.scenario === 'claim') actionItems.push('Create claim file and assign to claims team');
  if (transcript.scenario === 'address_change') actionItems.push('Update customer address in policy records');
  actionItems.push('Send confirmation email to customer');

  const customerIntent = transcript.scenarioDescription || transcript.scenario || 'general enquiry';

  const summaryText = `Customer ${transcript.customer?.name || transcript.customerName || ''} contacted Lloyd's Banking Group regarding ${customerIntent.toLowerCase()}. ${resolution} Agent advised customer on key policy details and next steps.`;

  return {
    id: transcript.id.replace(/transcript-/, 'summary-'),
    transcriptId: transcript.id,
    title,
    keyTopics,
    resolution,
    sentiment: {
      overall: sentiment,
      score: Number(sentimentScore)
    },
    outcome: transcript.notes || resolution,
    customerIntent,
    actionItems,
    summaryText,
    generatedAt: new Date().toISOString()
  };
}

// Read all transcripts and generate summaries
const files = fs.readdirSync(transcriptsDir).filter(f => f.endsWith('.json'));
console.log(`Found ${files.length} transcripts.`);

files.forEach((file) => {
  const filePath = path.join(transcriptsDir, file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const transcript = JSON.parse(content);
    const summary = generateSummaryFromTranscript(transcript);
    // Use the original transcript filename as the summary filename so
    // the backend can look up summaries by the transcript id/filename
    // (e.g. `sample-001.json` or `transcript-005.json`).
    const outName = file; // keep same filename
    const outPath = path.join(summariesDir, outName);
    fs.writeFileSync(outPath, JSON.stringify(summary, null, 2));
    console.log(`Generated summary: ${outName}`);
  } catch (err) {
    console.error(`Failed to process ${file}:`, err.message);
  }
});

console.log('Done generating summaries.');
