import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AgentDashboard.css';

function AgentDashboard() {
  const [stats, setStats] = useState({
    totalCalls: 0,
    transferredCalls: 0,
    completedCalls: 0,
    positiveSentiment: 0
  });
  const [transcripts, setTranscripts] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [transcriptsRes, agentsRes, summariesRes] = await Promise.all([
        axios.get('/api/transcripts'),
        axios.get('/api/agents'),
        axios.get('/api/summaries')
      ]);

      const transcriptData = transcriptsRes.data.data || [];
      const summaryData = summariesRes.data.data || [];

      setTranscripts(transcriptData);
      setAgents(agentsRes.data.data || []);

      // Calculate stats
      const transferred = transcriptData.filter(t => t.transferredToAgent).length;
      const positive = summaryData.filter(s => s.sentiment === 'Positive').length;

      setStats({
        totalCalls: transcriptData.length,
        transferredCalls: transferred,
        completedCalls: transcriptData.length - transferred,
        positiveSentiment: positive
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon, label, value, color }) => (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );

  return (
    <div className="agent-dashboard">
      <div className="dashboard-header">
        <h2>Real-time Dashboard</h2>
        <button className="refresh-btn" onClick={fetchDashboardData} disabled={loading}>
          {loading ? 'Updating...' : 'Refresh'}
        </button>
      </div>

      <div className="stats-grid">
        <StatCard 
          icon="☎"
          label="Total Calls"
          value={stats.totalCalls}
          color="primary"
        />
        <StatCard 
          icon="✓"
          label="Completed Calls"
          value={stats.completedCalls}
          color="success"
        />
        <StatCard 
          icon="→"
          label="Transferred to Agent"
          value={stats.transferredCalls}
          color="warning"
        />
        <StatCard 
          icon="+"
          label="Positive Sentiment"
          value={stats.positiveSentiment}
          color="info"
        />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h3>Recent Calls</h3>
          <div className="calls-list">
            {transcripts.slice(0, 5).map(transcript => (
              <div key={transcript.id} className="call-card">
                <div className="call-info">
                  <div className="call-customer">
                    <strong>{transcript.customerName}</strong>
                    <small>{transcript.customerPhone}</small>
                  </div>
                  <div className="call-time">
                    {new Date(transcript.createdAt).toLocaleTimeString()}
                  </div>
                </div>
                <div className="call-meta">
                  <span className="duration">{transcript.duration}</span>
                  {transcript.transferredToAgent && (
                    <span className="badge-transferred">Transferred</span>
                  )}
                </div>
              </div>
            ))}
            {transcripts.length === 0 && (
              <p className="no-data">No calls yet</p>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>Active Agents</h3>
          <div className="agents-list">
            {agents.slice(0, 5).map(agent => (
              <div key={agent.id} className="agent-card">
                <div className="agent-info">
                  <strong>{agent.name}</strong>
                  <small>{agent.role}</small>
                </div>
                <div className="agent-status">
                  <span className={`status status-${agent.status}`}>
                    {agent.status}
                  </span>
                </div>
              </div>
            ))}
            {agents.length === 0 && (
              <p className="no-data">No agents configured</p>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-section full-width">
        <h3>Call Summary Statistics</h3>
        <div className="summary-stats">
          <div className="stat-item">
            <label>Average Call Duration</label>
            <p>
              {transcripts.length > 0
                ? transcripts[0].duration
                : 'N/A'}
            </p>
          </div>
          <div className="stat-item">
            <label>Total Messages</label>
            <p>
              {transcripts.reduce((sum, t) => sum + (t.messageCount || 0), 0)}
            </p>
          </div>
          <div className="stat-item">
            <label>Total Words Spoken</label>
            <p>
              {transcripts.reduce((sum, t) => sum + (t.wordCount || 0), 0)}
            </p>
          </div>
          <div className="stat-item">
            <label>Success Rate</label>
            <p>
              {transcripts.length > 0
                ? `${Math.round((stats.completedCalls / stats.totalCalls) * 100)}%`
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentDashboard;
