# Agent Dashboard - Home Insurance Edition 🚀

Complete Voice Bot Agent Dashboard system for home insurance policy inquiries and support calls.

## 📁 Project Structure

```
agentdashboard/
├── backend/                    # Node.js Express backend
│   ├── src/
│   │   ├── server.js          # Main server file
│   │   ├── routes/            # API routes
│   │   │   ├── transcripts.js # Transcript endpoints
│   │   │   ├── summaries.js   # Summary endpoints
│   │   │   ├── agents.js      # Agent management
│   │   │   └── health.js      # Health check
│   │   ├── utils/
│   │   │   ├── storage.js     # JSON file storage
│   │   │   └── llmProcessor.js # LLM processing & extraction
│   │   └── prompts/
│   │       └── index.js       # LLM prompt templates
│   ├── package.json
│   └── .env.example
│
├── frontend/                   # React dashboard
│   ├── src/
│   │   ├── App.js            # Main app component
│   │   ├── pages/
│   │   │   └── AgentDashboard.js  # Dashboard page
│   │   ├── components/
│   │   │   ├── TranscriptList.js  # Call list
│   │   │   ├── TranscriptViewer.js # Transcript detail
│   │   │   └── SummaryPanel.js    # Summary & insights
│   │   ├── utils/            # Helper functions
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .env
│
└── data/                       # JSON storage
    ├── transcripts/           # Call transcripts
    ├── summaries/             # Call summaries & insights
    └── agents/                # Agent profiles
```

## 🎯 Dashboard Features

### Main Dashboard (`📊 Dashboard` tab)
- **Stats Cards**: Total calls, completed calls, transferred calls, positive sentiment
- **Recent Calls**: Shows latest 5 calls with customer info
- **Active Agents**: Displays available support agents  
- **Call Statistics**: Average duration, total messages, success rate

### Transcripts Viewer (`📝 Transcripts` tab)
- **Call List**: Browse all transcripts, sorted by newest first
- **Transcript Viewer**: Full conversation with timestamps
- **Customer Info**: Name, phone, email, agent details
- **Summary Panel**: AI-generated insights and action items

### Home Insurance Coverage Areas
- Dwelling coverage (structure, roof, foundation)
- Weather damage (storms, hail, water)
- Policy inquiries and updates
- Claims filing and processing
- Deductible information

## 🔌 API Endpoints

### Transcripts
```
GET    /api/transcripts              # Get all transcripts
GET    /api/transcripts/:id          # Get specific transcript
POST   /api/transcripts              # Save new transcript
DELETE /api/transcripts/:id          # Delete transcript
```

### Summaries
```
GET    /api/summaries                # Get all summaries
GET    /api/summaries/:callId        # Get specific summary
POST   /api/summaries/:callId/regenerate  # Regenerate with LLM
```

### Agents
```
GET    /api/agents                   # Get all agents
GET    /api/agents/:id               # Get specific agent
POST   /api/agents                   # Create new agent
```

### Health
```
GET    /api/health                   # Health check
```

## 📊 Data Schema

### Transcript Object
```json
{
  "id": "uuid",
  "customerName": "string",
  "customerPhone": "string",
  "customerEmail": "string",
  "agentName": "string",
  "agentId": "string",
  "duration": "HH:MM:SS",
  "transferredToAgent": boolean,
  "callStartTime": "ISO8601",
  "messages": [
    {
      "sender": "Agent|Customer",
      "text": "string",
      "timestamp": "ISO8601"
    }
  ],
  "messageCount": number,
  "wordCount": number,
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601"
}
```

### Summary Object
```json
{
  "callId": "uuid",
  "title": "string",
  "keyTopics": ["string"],
  "resolution": "string",
  "sentiment": "Positive|Negative|Neutral",
  "outcome": "string",
  "insights": {
    "customerIntent": "string",
    "actionItems": ["string"],
    "policyDetails": {},
    "followUpRequired": boolean
  },
  "createdAt": "ISO8601"
}
```

## 🚀 Getting Started

### 1. Setup Backend
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm start
# App runs on http://localhost:3000
```

### 3. View Sample Data
- Dashboard automatically loads sample transcripts from `/data/transcripts/`
- Summaries are auto-generated and stored in `/data/summaries/`

## 💡 Key Features

### For Human Agents:
- **Quick Dashboard**: See all important metrics at a glance
- **Transcript Review**: Full conversation history with timestamps
- **AI Insights**: Auto-generated summaries and action items
- **Customer Context**: Name, contact info, policy details
- **Call Status**: Know if customer was satisfied or needs follow-up

### AI Processing:
- **Smart Extraction**: Automatically identifies topics, intent, and resolution
- **Sentiment Analysis**: Analyzes customer emotions during call
- **Policy Parsing**: Extracts policy numbers and coverage details
- **Action Items**: Lists follow-up tasks needed
- **LLM Ready**: Prompts designed for GPT-4, Claude, or other LLMs

## 🔄 Integration Guide

### Receiving Data from Voice Bot:
```javascript
// POST /api/transcripts
fetch('http://localhost:5000/api/transcripts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { sender: 'Customer', text: '...', timestamp: '...' },
      { sender: 'Agent', text: '...', timestamp: '...' }
    ],
    customerName: 'John Doe',
    customerPhone: '+1-555-1234',
    customerEmail: 'john@email.com',
    duration: '00:05:30',
    transferredToAgent: true
  })
});
```

### Getting Insights:
```javascript
// GET /api/summaries/:callId
fetch('http://localhost:5000/api/summaries/transcript-001')
  .then(r => r.json())
  .then(summary => {
    console.log(summary.insights.actionItems);
    console.log(summary.sentiment);
  });
```

## 🎨 UI/UX Highlights

- **Gradient Purple Theme**: Modern, professional appearance
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Auto-refresh every 30 seconds
- **Smooth Transitions**: Polished animations and interactions
- **Color-coded Status**: Visual indicators for call status
- **Info Cards**: Well-organized information display

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- JSON file storage (hackathon-friendly)
- UUID for ID generation
- CORS enabled for frontend

**Frontend:**
- React 18
- Axios for API calls
- React Router for navigation
- CSS3 for styling
- No external UI libraries (pure CSS)

## 📝 LLM Integration (Ready for Production)

Modify `/backend/src/utils/llmProcessor.js` to use real LLM APIs:

```javascript
// Example: OpenAI integration
const response = await openai.chat.completions.create({
  model: 'gpt-4',
## 📊 Sample Data

Three complete home insurance sample transcripts included:
1. **Roof Damage Coverage Question** - Transferred to specialist
2. **Address Update** - Self-resolved by bot
3. **Water Damage Claim** - Complex case transferred

View at `/data/transcripts/sample-*.json`

Three complete sample transcripts included:
1. **Roof Damage Coverage Question** - Transferred to specialist
2. **Address Update** - Self-resolved by bot
3. **Accident Claim** - Complex case transferred

View at `/data/transcripts/sample-*.json`

## 🔐 Security Notes

For production:
- Add authentication to all endpoints
- Validate and sanitize all inputs
- Use environment variables for sensitive data
- Implement rate limiting
- Add logging and monitoring
- Encrypt sensitive customer data

## 📞 Support

For hackathon questions or issues:
1. Check sample data in `/data/` folder
2. Review API endpoints in README
3. Inspect browser console for errors
4. Check backend logs (terminal)

## 🏆 Hackathon Tips

✅ **Quick Setup**: npm install + npm start in both directories
✅ **No Database Needed**: JSON files work perfectly for demo
✅ **Sample Data**: 3 realistic transcripts included
✅ **Ready to Demo**: Full UI + working API immediately
✅ **Scalable**: Easy to upgrade to real DB later
✅ **LLM Ready**: Prompt templates ready for GPT-4/Claude

---

**Made with ❤️ for the Hackathon**
