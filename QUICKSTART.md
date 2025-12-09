# 🏠 Quick Start Guide - Home Insurance Agent Dashboard Hackathon

## ⚡ 5-Minute Setup

### Prerequisites
- Node.js 14+ installed
- npm installed
- Port 5000 and 3000 available

### Step 1: Setup Backend (Terminal 1)
```bash
cd backend
npm install
npm start
```

Expected output:
```
🚀 Backend server running on http://localhost:5000
```

### Step 2: Setup Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```

Expected output:
```
Compiled successfully!
You can now view home-insurance-dashboard in the browser.
Local: http://localhost:3000
```

### Step 3: Open Dashboard
Visit `http://localhost:3000` in your browser. You should see:
- ✅ Home Insurance Dashboard with 3 sample calls
- ✅ Home-focused agent list
- ✅ Real-time statistics for home insurance calls

---

## 📊 Home Insurance Dashboard Walkthrough

### Dashboard Tab (`📊 Dashboard`)
Shows real-time metrics and summaries:
- **4 Stat Cards**: Total calls, completed, transferred, positive sentiment
- **Recent Calls**: Last 5 calls with quick info
- **Active Agents**: Available support staff
- **Statistics**: Average duration, total messages, success rate

### Transcripts Tab (`📝 Transcripts`)
Detailed transcript management:
1. **Left Panel**: Click any call to view details
2. **Middle Panel**: Full conversation transcript with timestamps
3. **Right Panel**: AI-generated summary and insights

---

## 🔌 API Quick Reference

### Create Transcript
```bash
curl -X POST http://localhost:5000/api/transcripts \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"sender": "Customer", "text": "Hi, I have a question about my roof coverage"},
      {"sender": "Agent", "text": "I can help with that!"}
    ],
    "customerName": "Jane Homeowner",
    "customerPhone": "+1-555-1234",
    "customerEmail": "jane@email.com",
    "duration": "00:05:30",
    "transferredToAgent": false
  }'
```

### Get All Transcripts
```bash
curl http://localhost:5000/api/transcripts
```

### Get Summary
```bash
curl http://localhost:5000/api/summaries/transcript-001
```

---

## 📁 File Locations

| Component | Location |
|-----------|----------|
| Sample Transcripts | `/data/transcripts/` |
| Generated Summaries | `/data/summaries/` |
| Agent Data | `/data/agents/` |
| Backend Code | `/backend/src/` |
| Frontend Code | `/frontend/src/` |

---

## 🧪 Testing Sample Home Insurance Data

Sample home insurance data is pre-loaded:
- **Call 1**: Roof damage coverage question → Transferred to specialist
- **Call 2**: Address update for home policy → Self-resolved
- **Call 3**: Water damage claim filing → Transferred to claims specialist

View on Dashboard immediately without any setup!

---

## 🔄 Data Flow

```
Voice Bot Call
    ↓
POST /api/transcripts
    ↓
Stored in /data/transcripts/
    ↓
Summary Auto-Generated
    ↓
Stored in /data/summaries/
    ↓
Agent Views on Dashboard
    ↓
Agent Takes Action
```

---

## 🎨 UI Features

### Color Scheme
- **Purple Gradient**: Modern, professional look
- **Green**: Success/positive sentiment
- **Yellow**: Transferred/pending
- **Red**: Issues/negative sentiment

### Responsive Design
- ✅ Desktop (1600px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (< 768px)

### Real-time Updates
- Auto-refresh every 30 seconds
- Manual refresh button available
- Smooth transitions and animations

---

## ⚙️ Configuration

### Backend (.env)
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in backend/.env |
| Port 3000 in use | Frontend will prompt for alternate port |
| CORS errors | Check FRONTEND_URL in backend/.env |
| Blank dashboard | Check browser console for API errors |
| No sample data | Ensure `/data/` folder exists |

---

## 🚀 Integration with Voice Bot

Send call transcript to backend:

```javascript
// From your voice bot
const transcript = {
  messages: conversationArray,
  customerName: name,
  customerPhone: phone,
  duration: callDuration,
  transferredToAgent: needsHuman
};

fetch('http://localhost:5000/api/transcripts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(transcript)
})
.then(r => r.json())
.then(data => console.log('Saved:', data.data.id));
```

---

## 📈 Next Steps

1. **Test with Sample Data**: Use dashboard as-is
2. **Connect Voice Bot**: POST transcripts to API
3. **Add LLM Integration**: Update llmProcessor.js
4. **Deploy**: Use Vercel (frontend) + Heroku (backend)
5. **Scale Up**: Migrate JSON storage to MongoDB

---

## 💡 Hackathon Tips

✅ **Focus on Demo**: Sample data works out of the box
✅ **Show Features**: Dashboard highlights best practices
✅ **Quick Integration**: Simple POST request to add data
✅ **AI Ready**: Prompts ready for real LLM APIs
✅ **No Database**: JSON files = zero setup time

---

**Happy Hacking! 🎉**

For questions, check:
- README.md for full documentation
- INTEGRATION_EXAMPLE.js for code samples
- DASHBOARD_INFO.json for feature list
