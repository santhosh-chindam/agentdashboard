import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SummaryPanel.css';

function SummaryPanel({ transcriptId, transcript }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState('summary');

  useEffect(() => {
    fetchSummary();
  }, [transcriptId]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/summaries/${transcriptId}`);
      setSummary(response.data.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const regenerateSummary = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/summaries/${transcriptId}/regenerate`);
      setSummary(response.data.data);
    } catch (error) {
      console.error('Error regenerating summary:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!summary) {
    return (
      <div className="summary-panel loading">
        <div className="loading-state">
          <p>⟳ Generating summary...</p>
          {!loading && <button onClick={fetchSummary}>Try Again</button>}
        </div>
      </div>
    );
  }

  return (
    <div className="summary-panel">
      <div className="summary-header">
        <h2>📊 AI Summary & Insights</h2>
        <button 
          className="regenerate-btn"
          onClick={regenerateSummary}
          disabled={loading}
        >
          {loading ? '⟳' : '🔄'}
        </button>
      </div>

      <div className="summary-tabs">
        <button
          className={`tab-btn ${expandedSection === 'summary' ? 'active' : ''}`}
          onClick={() => setExpandedSection('summary')}
        >
          Summary
        </button>
        <button
          className={`tab-btn ${expandedSection === 'insights' ? 'active' : ''}`}
          onClick={() => setExpandedSection('insights')}
        >
          Insights
        </button>
        <button
          className={`tab-btn ${expandedSection === 'conversation' ? 'active' : ''}`}
          onClick={() => setExpandedSection('conversation')}
        >
          Conversation History
        </button>
      </div>

      <div className="summary-content">
        {expandedSection === 'summary' && (
          <>
            <div className="summary-section">
              <h3>📌 Title</h3>
              <p className="summary-title">{summary.title}</p>
            </div>

            <div className="summary-section">
              <h3>🎯 Key Topics</h3>
              <div className="topics-list">
                {summary.keyTopics && summary.keyTopics.length > 0 ? (
                  summary.keyTopics.map((topic, index) => (
                    <span key={index} className="topic-tag">{topic}</span>
                  ))
                ) : (
                  <p className="no-data">No topics identified</p>
                )}
              </div>
            </div>

            <div className="summary-section">
              <h3>✅ Resolution</h3>
              <p className="resolution">{summary.resolution}</p>
            </div>

            <div className="summary-section">
              <h3>😊 Sentiment</h3>
              <div className={`sentiment-badge sentiment-${summary.sentiment?.toLowerCase()}`}>
                {summary.sentiment}
              </div>
            </div>

            <div className="summary-section">
              <h3>📋 Outcome</h3>
              <p className="outcome">{summary.outcome}</p>
            </div>
          </>
        )}

        {expandedSection === 'insights' && summary.insights && (
          <>
            <div className="summary-section">
              <h3>🎯 Customer Intent</h3>
              <p>{summary.insights.customerIntent}</p>
            </div>

            <div className="summary-section">
              <h3>📋 Action Items</h3>
              <ul className="action-items">
                {summary.insights.actionItems && summary.insights.actionItems.length > 0 ? (
                  summary.insights.actionItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No action items identified</li>
                )}
              </ul>
            </div>

            <div className="summary-section">
              <h3>📄 Policy Details</h3>
              {summary.insights.policyDetails && Object.keys(summary.insights.policyDetails).length > 0 ? (
                <div className="policy-details">
                  {Object.entries(summary.insights.policyDetails).map(([key, value]) => (
                    <div key={key} className="detail-row">
                      <strong>{key}:</strong>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No policy details found</p>
              )}
            </div>

            <div className="summary-section">
              <h3>📞 Follow-up Required</h3>
              <p>
                {summary.insights.followUpRequired ? (
                  <span className="badge-yes">✓ Yes</span>
                ) : (
                  <span className="badge-no">✗ No</span>
                )}
              </p>
            </div>
          </>
        )}

        {expandedSection === 'conversation' && transcript && (
          <div className="summary-section">
            <h3>💬 Conversation History ({transcript.messages?.length || 0} messages)</h3>
            <div className="messages-list-summary">
              {transcript.messages && transcript.messages.length > 0 ? (
                transcript.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${message.sender?.toLowerCase() === 'agent' ? 'agent' : 'customer'}`}
                  >
                    <div className="message-header">
                      <span className="message-sender">
                        {message.sender || 'Unknown'}
                      </span>
                      <span className="message-time">
                        {message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : ''}
                      </span>
                    </div>
                    <div className="message-text">{message.text}</div>
                  </div>
                ))
              ) : (
                <p className="no-data">No conversation history available</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SummaryPanel;
