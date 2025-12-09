import React from 'react';
import './TranscriptViewer.css';

function TranscriptViewer({ transcript }) {
  return (
    <div className="transcript-viewer">
      <div className="viewer-header">
        <h2>Call Transcript</h2>
        <span className="call-duration">📞 Duration: {transcript.duration}</span>
      </div>

      <div className="transcript-info-grid">
        <div className="info-card">
          <label>Customer Name</label>
          <p>{transcript.customerName}</p>
        </div>
        <div className="info-card">
          <label>Phone Number</label>
          <p>{transcript.customerPhone}</p>
        </div>
        <div className="info-card">
          <label>Email</label>
          <p>{transcript.customerEmail}</p>
        </div>
        <div className="info-card">
          <label>Agent Name</label>
          <p>{transcript.agentName}</p>
        </div>
        <div className="info-card">
          <label>Message Count</label>
          <p>{transcript.messageCount}</p>
        </div>
        <div className="info-card">
          <label>Word Count</label>
          <p>{transcript.wordCount}</p>
        </div>
      </div>

      <div className="messages-container">
        <h3>Conversation</h3>
        <div className="messages-list">
          {transcript.messages && transcript.messages.map((message, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default TranscriptViewer;
