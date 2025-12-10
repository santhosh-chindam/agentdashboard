const fs = require('fs');
const path = require('path');

const transcriptsDir = path.join(__dirname, 'data', 'transcripts');

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function normalizeTranscript(transcript) {
  // If already in sample format, skip
  if (transcript.customerName) return transcript;

  // Convert from generated format to sample format
  return {
    id: transcript.id,
    customerName: transcript.customer?.name || 'Unknown',
    customerPhone: transcript.customer?.phone || '+44 0000 0000',
    customerEmail: transcript.customer?.email || 'customer@email.com',
    agentName: transcript.agentName || 'Voice Bot - AI Assistant',
    agentId: transcript.agentId || 'bot-001',
    duration: formatDuration(transcript.callDuration || 0),
    transferredToAgent: transcript.callStatus === 'transferred' || false,
    callStartTime: transcript.callDate || new Date().toISOString(),
    messageCount: transcript.messages?.length || 0,
    wordCount: transcript.messages?.reduce((sum, m) => sum + (m.text?.split(' ').length || 0), 0) || 0,
    messages: (transcript.messages || []).map(msg => ({
      sender: msg.speaker === 'customer' ? 'Customer' : msg.speaker === 'agent' ? 'Agent' : 'Unknown',
      text: msg.text || '',
      timestamp: msg.timestamp || new Date().toISOString()
    })),
    createdAt: transcript.callDate || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    policyDetails: transcript.policyDetails || {
      policyNumber: transcript.customer?.policyNumber || 'POL-UNKNOWN',
      policyType: 'Home Insurance',
      propertyAddress: transcript.customer?.address || 'Address Unknown'
    },
    customerAddress: transcript.customer?.address || 'Address Unknown',
    customerPostcode: transcript.customer?.postcode || 'UK',
    policyNumber: transcript.customer?.policyNumber || 'POL-UNKNOWN'
  };
}

// Read all transcripts and normalize
const files = fs.readdirSync(transcriptsDir).filter(f => f.endsWith('.json'));
console.log(`Normalizing ${files.length} transcripts...`);

files.forEach((file) => {
  const filePath = path.join(transcriptsDir, file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const transcript = JSON.parse(content);
    const normalized = normalizeTranscript(transcript);
    fs.writeFileSync(filePath, JSON.stringify(normalized, null, 2));
    console.log(`✓ Normalized: ${file}`);
  } catch (err) {
    console.error(`✗ Failed to normalize ${file}:`, err.message);
  }
});

console.log('Done normalizing transcripts.');
