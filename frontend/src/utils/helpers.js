// Utility functions for data formatting and processing

export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return `Today ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  return date.toLocaleDateString();
};

export const calculateStats = (transcripts, summaries) => {
  const stats = {
    totalCalls: transcripts.length,
    transferredCalls: transcripts.filter(t => t.transferredToAgent).length,
    completedCalls: transcripts.filter(t => !t.transferredToAgent).length,
    totalDuration: 0,
    totalMessages: 0,
    totalWords: 0,
    avgSentiment: 'Neutral'
  };

  transcripts.forEach(t => {
    stats.totalMessages += t.messageCount || 0;
    stats.totalWords += t.wordCount || 0;
  });

  return stats;
};

export const extractPhoneNumberDisplay = (phone) => {
  if (!phone) return 'N/A';
  // Format: +1-555-123-4567 -> (555) 123-4567
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

export const getPolicyNumber = (text) => {
  const match = text.match(/HOM-\d+-\d+|HOM\d+/);
  return match ? match[0] : null;
};

export const getSentimentColor = (sentiment) => {
  switch (sentiment?.toLowerCase()) {
    case 'positive':
      return '#66bb6a';
    case 'negative':
      return '#ef5350';
    case 'neutral':
      return '#ffa726';
    default:
      return '#999';
  }
};

export const getStatusBadgeColor = (transferred) => {
  return transferred
    ? { bg: '#ffeaa7', color: '#d63031' }
    : { bg: '#dfe6e9', color: '#2f3542' };
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export const sortTranscriptsByDate = (transcripts, order = 'desc') => {
  return [...transcripts].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const filterTranscriptsByStatus = (transcripts, transferred) => {
  return transcripts.filter(t => t.transferredToAgent === transferred);
};

export const searchTranscripts = (transcripts, query) => {
  const lowerQuery = query.toLowerCase();
  return transcripts.filter(t =>
    t.customerName?.toLowerCase().includes(lowerQuery) ||
    t.customerPhone?.includes(query) ||
    t.customerEmail?.toLowerCase().includes(lowerQuery) ||
    t.id?.toLowerCase().includes(lowerQuery)
  );
};
