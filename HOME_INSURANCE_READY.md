# 🏠 Home Insurance Agent Dashboard - READY FOR HACKATHON

## ✅ Complete Status

Your **Home Insurance Agent Dashboard** is fully operational and specialized for home insurance only.

## 📋 What's Included

### Backend (Node.js + Express)
- ✅ Express server on port 5000
- ✅ JSON-based file storage (no database needed)
- ✅ REST API routes for transcripts, summaries, agents
- ✅ Smart LLM processor with home insurance extraction
- ✅ Auto-generates summaries with dwelling coverage, deductibles, claim types
- ✅ Ready for OpenAI/Claude LLM integration

### Frontend (React 18)
- ✅ Dashboard tab with real-time metrics
  - Total calls, completed, transferred, positive sentiment
  - Recent calls list, active agents
  - Call statistics
- ✅ Transcripts tab with full conversation viewer
- ✅ AI-generated summaries with insights
  - Policy details (HOM-XXXX-XXXX format)
  - Coverage types (Dwelling, Roof, Water, Weather)
  - Action items for agents
- ✅ 30-second auto-refresh polling

### Sample Data
- ✅ 3 complete home insurance transcripts
  - Roof damage coverage question (HOM-2024-5678)
  - Address update (HOM-2024-1234)
  - Water damage claim (HOM-2024-7890)
- ✅ Pre-generated summaries for each
- ✅ Agent profiles (home insurance specialists)

### Documentation
- ✅ README with full setup instructions
- ✅ QUICKSTART guide with integration examples
- ✅ INTEGRATION_EXAMPLE.js showing how to submit transcripts
- ✅ DASHBOARD_INFO.json with all features listed
- ✅ setup.sh for automated installation

## 🚀 Quick Start

```bash
# 1. Install backend dependencies
cd backend
npm install

# 2. Start backend server
npm start
# Server runs on http://localhost:5000

# 3. In another terminal, install frontend
cd frontend
npm install

# 4. Start frontend
npm start
# Dashboard available at http://localhost:3000
```

## 🏠 Home Insurance Specialization

### Coverage Topics Recognized
- Dwelling coverage (structure, roof, foundation)
- Roof damage
- Water damage
- Weather/storm damage
- Policy updates and address changes
- Deductible inquiries

### Policy Format
- Policy numbers: `HOM-XXXX-XXXX` (e.g., HOM-2024-5678)
- Deductibles: $1000 standard (configurable)
- Coverage types: Dwelling, Water Damage, Weather/Storm, Roof

### Extracted Insights
- Customer intent: Coverage question, claim filing, policy update
- Policy details: Number, coverage type, deductible, property address
- Claim type: Water damage, roof damage, weather damage
- Sentiment: Concerned, satisfied, angry, neutral
- Action items: Documentation needs, assessment required, claims guidance

## 🔌 Integration with Your Voice Bot

### Step 1: Submit Transcript
```javascript
POST http://localhost:5000/api/transcripts
{
  "messages": [...],
  "customerName": "...",
  "customerPhone": "...",
  "policyNumber": "HOM-XXXX-XXXX",
  "transferredToAgent": true
}
```

### Step 2: View in Dashboard
- Transcript appears in "Transcripts" tab
- Summary auto-generated with home insurance insights
- Agent can review full conversation + AI summary

### Step 3: Optionally Regenerate Summary
```javascript
POST http://localhost:5000/api/summaries/{callId}/regenerate
```
- Integrates with real LLM for enhanced analysis

## 📊 Dashboard Features

### Home Insurance Specific Metrics
- Total home insurance calls processed
- Calls resolved by bot vs. transferred
- Most common issues (roof, water, policy questions)
- Positive sentiment percentage
- Average claim handling time

### Real-Time Updates
- 30-second polling for live data refresh
- Call list sorted by newest first
- Active agent status
- Call statistics aggregation

## 🛠 Technology Stack

- **Backend**: Node.js 14+, Express 4.18
- **Frontend**: React 18, React Router 6
- **Storage**: JSON files in `/data/` directory
- **Styling**: Pure CSS3 (no external UI libraries)
- **API Communication**: Axios
- **LLM Ready**: Prompt templates for OpenAI/Claude

## 📁 Project Structure

```
agentdashboard/
├── backend/                    # Node.js server
│   ├── src/
│   │   ├── server.js          # Express app
│   │   ├── routes/            # API endpoints
│   │   ├── utils/             # Storage & LLM processing
│   │   └── prompts/           # LLM prompt templates
│   └── package.json
├── frontend/                   # React app
│   ├── src/
│   │   ├── App.js             # Main component
│   │   ├── components/        # UI components
│   │   ├── pages/             # Dashboard page
│   │   └── utils/             # API & helpers
│   └── package.json
├── data/                       # JSON storage
│   ├── transcripts/           # Call transcripts
│   ├── summaries/             # AI summaries
│   └── agents/                # Agent profiles
├── README.md                   # Full documentation
├── QUICKSTART.md              # Setup guide
├── INTEGRATION_EXAMPLE.js     # Integration code
└── setup.sh                   # Auto-setup script
```

## ✨ All Files Updated to Home Insurance

✅ Backend code - Home insurance extraction logic
✅ Frontend UI - Home Insurance branding
✅ Sample data - 3 home insurance transcripts
✅ Summaries - Home insurance specific insights
✅ Agent profiles - Home insurance specialists
✅ Prompts - Home insurance terminology
✅ Documentation - Home insurance examples
✅ No legacy insurance types (health, auto, etc.)

## 🎯 Hackathon Demo Ready

Your dashboard is production-ready for demo:
1. Pre-loaded with 3 realistic home insurance calls
2. AI summaries already generated
3. Real-time metrics calculated
4. Ready to accept new transcripts
5. Full documentation for integration

## 📞 Support

Refer to:
- **README.md** - Complete API reference
- **QUICKSTART.md** - Setup and walkthrough
- **INTEGRATION_EXAMPLE.js** - Code examples

---

**Status**: ✅ READY FOR HACKATHON DEMO
**Last Updated**: Today
**Specialization**: Home Insurance Only
**No Errors**: ✅ All files verified
