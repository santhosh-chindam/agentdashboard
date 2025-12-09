#!/bin/bash

echo "🧪 Testing Agent Dashboard API..."
echo ""

BASE_URL="http://localhost:5000"

# Test health check
echo "1️⃣  Health Check:"
curl -s "${BASE_URL}/api/health" | jq '.' 
echo ""

# Get all transcripts
echo "2️⃣  Fetching all transcripts:"
curl -s "${BASE_URL}/api/transcripts" | jq '.data[] | {id, customerName, duration}'
echo ""

# Get specific transcript
echo "3️⃣  Fetching specific transcript:"
curl -s "${BASE_URL}/api/transcripts/transcript-001" | jq '.data | {id, customerName, messageCount}'
echo ""

# Get all summaries
echo "4️⃣  Fetching all summaries:"
curl -s "${BASE_URL}/api/summaries" | jq '.data[] | {callId, title, sentiment}'
echo ""

# Get specific summary
echo "5️⃣  Fetching specific summary:"
curl -s "${BASE_URL}/api/summaries/transcript-001" | jq '.data | {title, keyTopics, outcome}'
echo ""

# Get all agents
echo "6️⃣  Fetching all agents:"
curl -s "${BASE_URL}/api/agents" | jq '.data[] | {id, name, role, status}'
echo ""

echo "✅ API testing complete!"
