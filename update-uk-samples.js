const fs = require('fs');
const path = require('path');

// Sample data for UK conversions
const samples = [
  {
    id: 'sample-001',
    name: 'James Patterson',
    email: 'james.patterson@btinternet.com',
    phone: '+44 20 7946 0958',
    address: '10 Downing Street, London, SW1A 2AA',
    postcode: 'SW1A 2AA',
    policyNumber: 'POL-2024-8901'
  },
  {
    id: 'sample-002',
    name: 'Sarah Williams',
    email: 'sarah.williams@gmail.com',
    phone: '+44 121 6555 0000',
    address: '42 Broad Street, Birmingham, B5 4ST',
    postcode: 'B5 4ST',
    policyNumber: 'POL-2024-5678'
  },
  {
    id: 'sample-003',
    name: 'Michael Johnson',
    email: 'michael.johnson@yahoo.co.uk',
    phone: '+44 161 2000 0000',
    address: '77 Oxford Street, Manchester, M1 1AB',
    postcode: 'M1 1AB',
    policyNumber: 'POL-2024-1234'
  }
];

function updateSampleToUK(sampleIndex) {
  const sample = samples[sampleIndex];
  const filePath = path.join(__dirname, 'data', 'transcripts', `${sample.id}.json`);
  
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Update customer info
  data.id = sample.id;
  data.customerName = sample.name;
  data.customerPhone = sample.phone;
  data.customerEmail = sample.email;
  data.customerAddress = sample.address;
  data.customerPostcode = sample.postcode;
  data.policyNumber = sample.policyNumber;
  
  // Update messages to reference UK locations and terminology
  data.messages = data.messages.map((msg, idx) => {
    let text = msg.text;
    
    // Replace US dollar references with GBP
    text = text.replace(/\$(\d+)/g, '£$1');
    
    // Replace location references
    text = text.replace(/Springfield, IL|Boston, MA|Atlanta, GA/g, 'England');
    
    // Replace US-specific terminology
    text = text.replace(/homeowners? policy/gi, 'home insurance policy');
    text = text.replace(/dwelling coverage/gi, 'buildings cover');
    text = text.replace(/deductible/gi, 'excess');
    text = text.replace(/claims specialist/gi, 'claims handler');
    
    // Update policy references
    if (text.includes('HOM-2024')) {
      text = text.replace(/HOM-\d+-\d+/g, sample.policyNumber);
    }
    
    // Add UK-specific variations
    if (idx === 0) {
      text = `Hi, I'm ringing about my home insurance policy. I have a question about my cover.`;
    } else if (idx === 2) {
      text = `My policy number is ${sample.policyNumber}. I want to know if my roof damage is covered under my current plan.`;
    } else if (idx === 3) {
      text = `Thank you for that information. Let me look up your policy details. Your home insurance includes cover for roof damage with a £1000 excess.`;
    } else if (idx === 5) {
      text = `Great question. Weather damage like storm or hail is covered under your buildings cover. The excess is £1000. However, for more complex claims involving multiple areas of damage, I recommend speaking with our claims handler.`;
    }
    
    return {
      ...msg,
      text: text
    };
  });
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`✓ Updated ${sample.id}.json to UK format`);
}

console.log('Updating existing samples to UK format...\n');
for (let i = 0; i < 3; i++) {
  updateSampleToUK(i);
}
console.log('\n✅ Successfully updated 3 sample transcripts to UK format!');
