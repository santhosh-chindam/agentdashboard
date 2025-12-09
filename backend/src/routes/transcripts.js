const express = require('express');
const { v4: uuidv4 } = require('uuid');
const storage = require('../utils/storage');
const llmProcessor = require('../utils/llmProcessor');

const router = express.Router();

/**
 * GET /api/transcripts - Get all transcripts
 */
router.get('/', (req, res) => {
  try {
    const transcripts = storage.getAllTranscripts();
    res.json({
      success: true,
      count: transcripts.length,
      data: transcripts.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      )
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * GET /api/transcripts/:id - Get specific transcript
 */
router.get('/:id', (req, res) => {
  try {
    const transcript = storage.getTranscript(req.params.id);
    
    if (!transcript) {
      return res.status(404).json({
        success: false,
        message: 'Transcript not found'
      });
    }
    
    res.json({
      success: true,
      data: transcript
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/transcripts - Create/save new transcript
 * Expected body: { messages, customerName, customerPhone, agentName, duration, transferredToAgent, etc. }
 */
router.post('/', async (req, res) => {
  try {
    const {
      messages,
      customerName,
      customerPhone,
      customerEmail,
      agentName,
      agentId,
      duration,
      transferredToAgent,
      callStartTime
    } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        message: 'Messages array is required'
      });
    }

    const transcript = {
      id: uuidv4(),
      messages,
      customerName: customerName || 'Unknown',
      customerPhone: customerPhone || 'N/A',
      customerEmail: customerEmail || 'N/A',
      agentName: agentName || 'Voice Bot',
      agentId: agentId || 'bot-001',
      duration: duration || '00:00:00',
      transferredToAgent: transferredToAgent || false,
      callStartTime: callStartTime || new Date().toISOString(),
      wordCount: messages.reduce((sum, m) => sum + (m.text?.split(' ').length || 0), 0),
      messageCount: messages.length
    };

    const saved = storage.saveTranscript(transcript);

    // Generate summary asynchronously (don't wait for it)
    llmProcessor.generateSummary(saved).then(summary => {
      storage.saveSummary(saved.id, summary);
    }).catch(err => console.error('Error generating summary:', err));

    res.status(201).json({
      success: true,
      message: 'Transcript saved successfully',
      data: saved
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * DELETE /api/transcripts/:id - Delete transcript
 */
router.delete('/:id', (req, res) => {
  try {
    const deleted = storage.deleteTranscript(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Transcript not found'
      });
    }

    res.json({
      success: true,
      message: 'Transcript deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
