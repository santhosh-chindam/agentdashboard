import React from 'react';
import './TranscriptViewer.css';

function TranscriptViewer({ transcript }) {
  return (
    <div className="transcript-viewer">
      <div className="viewer-header">
        <h2>Call Transcript</h2>
        <span className="call-duration">Duration: {transcript?.duration || 'N/A'}</span>
      </div>

      <div className="transcript-info-grid">
        <div className="info-card">
          <label>Customer Name</label>
          <p>{transcript?.customerName || '—'}</p>
        </div>
        <div className="info-card">
          <label>Phone Number</label>
          <p>{transcript?.customerPhone || '—'}</p>
        </div>
        <div className="info-card">
          <label>Email</label>
          <p>{transcript?.customerEmail || '—'}</p>
        </div>
        <div className="info-card">
          <label>Agent Name</label>
          <p>{transcript?.agentName || '—'}</p>
        </div>
        <div className="info-card">
          <label>Message Count</label>
          <p>{transcript?.messageCount ?? '0'}</p>
        </div>
        <div className="info-card">
          <label>Word Count</label>
          <p>{transcript?.wordCount ?? '0'}</p>
        </div>
      </div>
    </div>
  );
}

export default TranscriptViewer;
