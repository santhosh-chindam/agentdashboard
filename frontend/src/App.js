import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TranscriptList from './components/TranscriptList';
import TranscriptViewer from './components/TranscriptViewer';
import SummaryPanel from './components/SummaryPanel';
import AgentDashboard from './pages/AgentDashboard';

function App() {
  const [transcripts, setTranscripts] = useState([]);
  const [selectedTranscript, setSelectedTranscript] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetchTranscripts();
    // Poll for new transcripts every 30 seconds
    const interval = setInterval(fetchTranscripts, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchTranscripts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/transcripts');
      setTranscripts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching transcripts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTranscript = (transcript) => {
    setSelectedTranscript(transcript);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Home Insurance Agent Dashboard</h1>
        <p>Lloyd's Banking Group - Real-time Home Insurance Call Transcript Analysis</p>
      </header>

      <div className="app-container">
        <nav className="app-nav">
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-btn ${activeTab === 'transcripts' ? 'active' : ''}`}
            onClick={() => setActiveTab('transcripts')}
          >
            Transcripts
          </button>
        </nav>

        <main className="app-main">
          {activeTab === 'dashboard' ? (
            <AgentDashboard />
          ) : (
            <div className="transcripts-container">
              <div className="transcript-list-panel">
                <div className="panel-header">
                  <h2>Recent Calls ({transcripts.length})</h2>
                  <button 
                    className="refresh-btn"
                    onClick={fetchTranscripts}
                    disabled={loading}
                  >
                    {loading ? '⟳ Loading...' : '⟳ Refresh'}
                  </button>
                </div>
                <TranscriptList 
                  transcripts={transcripts}
                  onSelectTranscript={handleSelectTranscript}
                  selectedId={selectedTranscript?.id}
                />
              </div>

              <div className="transcript-detail-panel">
                {selectedTranscript ? (
                  <>
                    <TranscriptViewer transcript={selectedTranscript} />
                    <SummaryPanel transcriptId={selectedTranscript.id} transcript={selectedTranscript} />
                  </>
                ) : (
                  <div className="no-transcript-selected">
                    <p>Select a call from the list to view transcript and insights</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
