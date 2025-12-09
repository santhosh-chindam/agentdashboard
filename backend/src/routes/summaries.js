const express = require('express');
const storage = require('../utils/storage');
const llmProcessor = require('../utils/llmProcessor');

const router = express.Router();

/**
 * GET /api/summaries - Get all summaries
 */
router.get('/', (req, res) => {
  try {
    const summaries = storage.getAllSummaries();
    res.json({
      success: true,
      count: summaries.length,
      data: summaries.sort((a, b) => 
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
 * GET /api/summaries/:callId - Get specific summary
 */
router.get('/:callId', (req, res) => {
  try {
    const summary = storage.getSummary(req.params.callId);
    
    if (!summary) {
      return res.status(404).json({
        success: false,
        message: 'Summary not found'
      });
    }
    
    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/summaries/:callId/regenerate - Regenerate summary with insights
 */
router.post('/:callId/regenerate', async (req, res) => {
  try {
    const transcript = storage.getTranscript(req.params.callId);
    
    if (!transcript) {
      return res.status(404).json({
        success: false,
        message: 'Transcript not found'
      });
    }

    const summary = await llmProcessor.generateSummary(transcript);
    const insights = await llmProcessor.extractKeyInsights(transcript);

    const fullSummary = {
      ...summary,
      insights
    };

    const saved = storage.saveSummary(req.params.callId, fullSummary);

    res.json({
      success: true,
      message: 'Summary regenerated successfully',
      data: saved
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
