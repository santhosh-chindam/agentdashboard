const express = require('express');
const { v4: uuidv4 } = require('uuid');
const storage = require('../utils/storage');

const router = express.Router();

/**
 * GET /api/agents - Get all agents
 */
router.get('/', (req, res) => {
  try {
    const agents = storage.getAllAgents();
    res.json({
      success: true,
      count: agents.length,
      data: agents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * GET /api/agents/:id - Get specific agent
 */
router.get('/:id', (req, res) => {
  try {
    const agent = storage.getAgent(req.params.id);
    
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent not found'
      });
    }
    
    res.json({
      success: true,
      data: agent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * POST /api/agents - Create new agent
 */
router.post('/', (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      role,
      department,
      status
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    const agent = {
      id: uuidv4(),
      name,
      email,
      phone: phone || 'N/A',
      role: role || 'Support Agent',
      department: department || 'Customer Support',
      status: status || 'active',
      assignedCalls: 0,
      averageCallDuration: '00:00:00',
      satisfactionScore: 0
    };

    const saved = storage.saveAgent(agent);

    res.status(201).json({
      success: true,
      message: 'Agent created successfully',
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
