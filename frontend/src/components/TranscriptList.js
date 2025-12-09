import React from 'react';
import './TranscriptList.css';

function TranscriptList({ transcripts, onSelectTranscript, selectedId }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadge = (transcript) => {
    if (transcript.transferredToAgent) {
      return <span className="badge badge-transferred">Transferred</span>;
    }
    return <span className="badge badge-completed">Completed</span>;
  };

  return (
    <div className="transcript-list">
      {transcripts.length === 0 ? (
        <div className="empty-state">
          <p>No transcripts yet</p>
          <small>Transcripts from voice bot calls will appear here</small>
        </div>
      ) : (
        transcripts.map(transcript => (
          <div
            key={transcript.id}
            className={`transcript-item ${selectedId === transcript.id ? 'active' : ''}`}
            onClick={() => onSelectTranscript(transcript)}
          >
            <div className="transcript-item-header">
              <h3>{transcript.customerName}</h3>
              {getStatusBadge(transcript)}
            </div>
            
            <div className="transcript-item-meta">
              <span className="meta-item">
                <strong>Phone:</strong> {transcript.customerPhone}
              </span>
              <span className="meta-item">
                <strong>Duration:</strong> {transcript.duration}
              </span>
              <span className="meta-item">
                <strong>Messages:</strong> {transcript.messageCount}
              </span>
            </div>

            <div className="transcript-item-footer">
              <small>{formatDate(transcript.createdAt)}</small>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TranscriptList;
