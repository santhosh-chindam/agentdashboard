const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '../../..', 'data');
const TRANSCRIPTS_DIR = path.join(DATA_DIR, 'transcripts');
const SUMMARIES_DIR = path.join(DATA_DIR, 'summaries');
const AGENTS_DIR = path.join(DATA_DIR, 'agents');

// Ensure directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDir(TRANSCRIPTS_DIR);
ensureDir(SUMMARIES_DIR);
ensureDir(AGENTS_DIR);

// Transcript operations
const saveTranscript = (transcript) => {
  const id = transcript.id || uuidv4();
  const filePath = path.join(TRANSCRIPTS_DIR, `${id}.json`);
  
  const data = {
    id,
    ...transcript,
    createdAt: transcript.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return data;
};

const getTranscript = (id) => {
  const filePath = path.join(TRANSCRIPTS_DIR, `${id}.json`);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
  return null;
};

const getAllTranscripts = () => {
  const files = fs.readdirSync(TRANSCRIPTS_DIR).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const data = fs.readFileSync(path.join(TRANSCRIPTS_DIR, file), 'utf-8');
    return JSON.parse(data);
  });
};

const deleteTranscript = (id) => {
  const filePath = path.join(TRANSCRIPTS_DIR, `${id}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
};

// Summary operations
const saveSummary = (callId, summary) => {
  const filePath = path.join(SUMMARIES_DIR, `${callId}.json`);
  
  const data = {
    callId,
    ...summary,
    createdAt: summary.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return data;
};

const getSummary = (callId) => {
  const filePath = path.join(SUMMARIES_DIR, `${callId}.json`);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
  return null;
};

const getAllSummaries = () => {
  const files = fs.readdirSync(SUMMARIES_DIR).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const data = fs.readFileSync(path.join(SUMMARIES_DIR, file), 'utf-8');
    return JSON.parse(data);
  });
};

// Agent operations
const saveAgent = (agent) => {
  const id = agent.id || uuidv4();
  const filePath = path.join(AGENTS_DIR, `${id}.json`);
  
  const data = {
    id,
    ...agent,
    createdAt: agent.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return data;
};

const getAgent = (id) => {
  const filePath = path.join(AGENTS_DIR, `${id}.json`);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
  return null;
};

const getAllAgents = () => {
  const files = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const data = fs.readFileSync(path.join(AGENTS_DIR, file), 'utf-8');
    return JSON.parse(data);
  });
};

module.exports = {
  saveTranscript,
  getTranscript,
  getAllTranscripts,
  deleteTranscript,
  saveSummary,
  getSummary,
  getAllSummaries,
  saveAgent,
  getAgent,
  getAllAgents
};
