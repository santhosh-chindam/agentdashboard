const fs = require('fs');
const path = require('path');

// UK postcodes and areas
const ukPostcodes = [
  'SW1A 2AA', 'M1 1AB', 'B5 4ST', 'EH8 8DX', 'CF10 1BH',
  'G2 1BD', 'E1 6AN', 'W1A 1AA', 'EC1A 1BB', 'SE1 7AA',
  'L1 1AA', 'DD1 3DA', 'BT1 5AA', 'NE1 1AA', 'LS1 1BA',
  'M2 1BA', 'K1A 1AA', 'AB10 1BZ', 'IV2 4UH', 'TR1 1AA',
  'PL1 1AA', 'DT1 1HW', 'TA1 1HZ', 'EX1 1AA', 'BA1 1HA',
  'NP10 8XH', 'SA1 3AA', 'SP1 2AA', 'GL1 1AA', 'WR1 1AA',
  'HR1 2AB', 'OX1 1AA', 'RG1 1AA', 'SL1 1UA', 'KT1 1AA',
  'CR2 6XH', 'BN1 1AA', 'RH1 1AA', 'GU1 1AA'
];

// Common UK names
const firstNames = [
  'James', 'Mary', 'Robert', 'Patricia', 'Michael', 'Linda', 'William', 'Barbara',
  'David', 'Elizabeth', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah',
  'Christopher', 'Karen', 'Daniel', 'Nancy', 'Matthew', 'Lisa', 'Anthony', 'Margaret',
  'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Donna',
  'Andrew', 'Michelle', 'Joshua', 'Dorothy', 'Kenneth', 'Carol', 'Kevin', 'Melissa',
  'Brian', 'Deborah', 'George', 'Stephanie', 'Edward', 'Rebecca', 'Ronald', 'Sharon'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Peterson', 'Phillips',
  'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Reeves', 'Stewart', 'Morris'
];

// Insurance-related scenarios
const scenarios = [
  { type: 'renewal', description: 'Discussing annual home insurance renewal' },
  { type: 'claim', description: 'Filing a new claim for water damage' },
  { type: 'query', description: 'Enquiring about coverage details' },
  { type: 'address_change', description: 'Updating residential address' },
  { type: 'upgrade', description: 'Interested in upgrading coverage' },
  { type: 'discount', description: 'Asking about available discounts' },
  { type: 'complaint', description: 'Lodging complaint about claim processing' },
  { type: 'quotation', description: 'Requesting new quotation for property' },
  { type: 'coverage_removal', description: 'Removing unwanted coverage options' },
  { type: 'policy_details', description: 'Requesting full policy document' }
];

// Sample messages and agent responses
const conversationStarters = [
  { customer: "Hello, I'm ringing about my home insurance policy.", agent: "Good morning! Thank you for calling Lloyd's Banking Group home insurance. How can I assist you today?" },
  { customer: "I've recently moved and need to update my address on the policy.", agent: "Of course! I'd be happy to help with that. Let me pull up your account first." },
  { customer: "There's been some damage to my property and I need to make a claim.", agent: "I'm sorry to hear that. Let me gather some details about the incident so I can assist you properly." },
  { customer: "My renewal notice has arrived and I'd like to discuss the premium.", agent: "Absolutely. Let me review your current coverage and see what options we have available." },
  { customer: "I'm looking to improve my cover but I'm not sure what I need.", agent: "I can definitely help with that. Let me ask you a few questions about your property." }
];

const agentInsights = [
  'Customer expressed satisfaction with the policy coverage',
  'Customer required clarification on exclusions in the policy',
  'Customer was interested in bundling additional coverage',
  'Customer opted for higher deductible to reduce premium',
  'Customer requested policy review meeting',
  'Customer satisfied with claim process explanation',
  'Customer considering annual auto-pay option for renewal',
  'Customer appreciated agent professionalism and knowledge'
];

function generatePhoneNumber() {
  // UK phone number format: +44 20 XXXX XXXX (London example)
  const codes = ['20', '121', '161', '113', '114', '117', '118', '131', '141'];
  const code = codes[Math.floor(Math.random() * codes.length)];
  const first = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const second = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `+44 ${code} ${first} ${second}`;
}

function generateEmail(firstName, lastName) {
  const domains = ['gmail.com', 'outlook.com', 'yahoo.co.uk', 'btinternet.com', 'aol.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
}

function generateMessages(scenario) {
  const messages = [];
  const messageCount = Math.floor(Math.random() * 8) + 5; // 5-12 messages

  let isCustomer = true;
  for (let i = 0; i < messageCount; i++) {
    if (isCustomer) {
      const customerQueries = [
        "Can you explain what's covered in my policy?",
        "What's the process for making a claim?",
        "How much will this cost me?",
        "Is there a way to reduce my premium?",
        "What happens if I need to make changes?",
        "How do I renew my policy?",
        "Are there any additional benefits available?",
        "What's my excess amount?",
        "How long does claim settlement usually take?",
        "Can I increase my coverage?"
      ];
      const message = customerQueries[Math.floor(Math.random() * customerQueries.length)];
      messages.push({
        speaker: 'customer',
        text: message,
        timestamp: new Date(Date.now() - (messageCount - i) * 120000).toISOString()
      });
    } else {
      const agentResponses = [
        "Certainly! Let me walk you through the key coverage areas.",
        "That's an excellent question. Here's what I'd recommend...",
        "I can definitely help with that. The cost would be...",
        "We have several options available for you.",
        "Let me explain the process step by step.",
        "You're covered for the following scenarios...",
        "That's a great point. Let me check what we can do.",
        "Yes, we can adjust that for you right away.",
        "The typical timeframe is about 5-7 working days.",
        "Absolutely, let me look at your options."
      ];
      const message = agentResponses[Math.floor(Math.random() * agentResponses.length)];
      messages.push({
        speaker: 'agent',
        text: message,
        timestamp: new Date(Date.now() - (messageCount - i - 1) * 120000).toISOString()
      });
    }
    isCustomer = !isCustomer;
  }
  return messages;
}

function generateTranscript(index) {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  const postcode = ukPostcodes[Math.floor(Math.random() * ukPostcodes.length)];

  const messages = generateMessages(scenario);

  return {
    id: `transcript-${String(index + 1).padStart(3, '0')}`,
    customerId: `CUST-${String(Math.floor(Math.random() * 100000)).padStart(6, '0')}`,
    agentId: `agent-${String(Math.floor(Math.random() * 20)).padStart(3, '0')}`,
    agentName: `Agent ${String(Math.floor(Math.random() * 50)).padStart(3, '0')}`,
    callDate: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
    callDuration: Math.floor(Math.random() * 1800) + 300, // 5-35 minutes
    callStatus: Math.random() > 0.15 ? 'completed' : 'transferred',
    customer: {
      name: `${firstName} ${lastName}`,
      email: generateEmail(firstName, lastName),
      phone: generatePhoneNumber(),
      address: `${Math.floor(Math.random() * 999) + 1} High Street, ${postcode}`,
      postcode: postcode,
      policyNumber: `POL-${String(Math.floor(Math.random() * 1000000)).padStart(7, '0')}`
    },
    scenario: scenario.type,
    scenarioDescription: scenario.description,
    messages: messages,
    sentiment: {
      overall: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)],
      score: (Math.random() * 0.5 + 0.5).toFixed(2) // 0.5 to 1.0
    },
    wordCount: messages.reduce((sum, msg) => sum + msg.text.split(' ').length, 0),
    messageCount: messages.length,
    keyTopics: [scenario.type, 'home insurance', 'UK property'],
    notes: `Customer called regarding ${scenario.description.toLowerCase()}. ${scenario.type === 'claim' ? 'Claim documented and sent to underwriting team.' : 'Customer satisfied with outcome.'}`
  };
}

// Create data directory if it doesn't exist
const transcriptsDir = path.join(__dirname, 'data', 'transcripts');
if (!fs.existsSync(transcriptsDir)) {
  fs.mkdirSync(transcriptsDir, { recursive: true });
}

// Generate 30 new transcripts (plus existing 3 = 33 total)
console.log('Generating 30 UK-focused home insurance transcripts...');
for (let i = 0; i < 30; i++) {
  const transcript = generateTranscript(i + 4); // Start from 004 (001-003 already exist)
  const filePath = path.join(transcriptsDir, `${transcript.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(transcript, null, 2));
  console.log(`✓ Generated ${transcript.id}.json`);
}

console.log('\n✅ Successfully generated 30 UK-focused transcripts!');
console.log(`Total transcripts will be 33 (including the original 3)`);
