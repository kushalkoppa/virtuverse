const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const { authMiddleware } = require('../middleware/auth');

// Get Azure OpenAI client
const getAzureClient = () => {
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  
  if (!endpoint || !apiKey) {
    throw new Error('Azure OpenAI credentials not configured');
  }
  
  return new OpenAI({
    apiKey,
    baseURL: `${endpoint}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
    defaultQuery: { 'api-version': process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview' },
    defaultHeaders: { 'api-key': apiKey }
  });
};

// Test Azure AI connection
router.get('/test', authMiddleware, async (req, res) => {
  try {
    const client = getAzureClient();
    
    // Test with a simple completion
    const result = await client.chat.completions.create({
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 50
    });
    
    res.json({
      status: 'success',
      message: 'Azure AI connection successful',
      model: result.model,
      response: result.choices[0]?.message?.content
    });
  } catch (error) {
    console.error('Azure AI connection test failed:', error);
    res.status(500).json({
      status: 'failed',
      message: 'Azure AI connection failed',
      error: error.message
    });
  }
});

// Get Azure AI configuration info
router.get('/info', authMiddleware, async (req, res) => {
  try {
    res.json({
      endpoint: process.env.AZURE_OPENAI_ENDPOINT,
      deploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
      apiVersion: process.env.AZURE_OPENAI_API_VERSION,
      configured: !!(process.env.AZURE_OPENAI_ENDPOINT && process.env.AZURE_OPENAI_API_KEY)
    });
  } catch (error) {
    console.error('Azure AI info error:', error);
    res.status(500).json({ error: 'Failed to get Azure AI info' });
  }
});

// Chat completion endpoint
router.post('/chat', authMiddleware, async (req, res) => {
  try {
    const { messages, temperature = 0.7, maxTokens = 800 } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }
    
    const client = getAzureClient();
    
    const result = await client.chat.completions.create({
      messages,
      temperature,
      max_tokens: maxTokens
    });
    
    res.json({
      status: 'success',
      response: {
        id: result.id,
        model: result.model,
        message: result.choices[0]?.message,
        finishReason: result.choices[0]?.finish_reason,
        usage: result.usage
      }
    });
  } catch (error) {
    console.error('Chat completion error:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// Streaming chat completion endpoint
router.post('/chat/stream', authMiddleware, async (req, res) => {
  try {
    const { messages, temperature = 0.7, maxTokens = 800 } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }
    
    const client = getAzureClient();
    
    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    const stream = await client.chat.completions.create({
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: true
    });
    
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }
    
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Streaming chat error:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// Get embeddings
router.post('/embeddings', authMiddleware, async (req, res) => {
  try {
    const { input } = req.body;
    
    if (!input) {
      return res.status(400).json({ error: 'Input text is required' });
    }
    
    const client = getAzureClient();
    const embeddingModel = process.env.AZURE_OPENAI_EMBEDDING_MODEL || 'text-embedding-ada-002';
    
    const embeddings = await client.embeddings.create({
      input,
      model: embeddingModel
    });
    
    res.json({
      status: 'success',
      embeddings: embeddings.data,
      usage: embeddings.usage
    });
  } catch (error) {
    console.error('Embeddings error:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// AI assistant for model analysis
router.post('/analyze-model', authMiddleware, async (req, res) => {
  try {
    const { modelData, analysisType = 'general' } = req.body;
    
    if (!modelData) {
      return res.status(400).json({ error: 'Model data is required' });
    }
    
    const client = getAzureClient();
    
    // Create analysis prompt based on type
    let systemPrompt = '';
    switch (analysisType) {
      case 'compatibility':
        systemPrompt = 'You are an expert in model compatibility analysis for simulation tools. Analyze the provided model for compatibility issues.';
        break;
      case 'integration':
        systemPrompt = 'You are an expert in model integration. Analyze how this model can be integrated into simulation workflows.';
        break;
      case 'optimization':
        systemPrompt = 'You are an expert in model optimization. Suggest improvements for better performance.';
        break;
      default:
        systemPrompt = 'You are an expert simulation model analyst. Provide comprehensive analysis of the model.';
    }
    
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Analyze this model:\n${JSON.stringify(modelData, null, 2)}` }
    ];
    
    const result = await client.chat.completions.create({
      messages,
      temperature: 0.7,
      max_tokens: 1000
    });
    
    res.json({
      status: 'success',
      analysis: {
        type: analysisType,
        content: result.choices[0]?.message?.content,
        model: result.model
      }
    });
  } catch (error) {
    console.error('Model analysis error:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// AI chatbot for general assistance
router.post('/chatbot', authMiddleware, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const client = getAzureClient();
    
    const systemMessage = {
      role: 'system',
      content: 'You are VirtuVerse AI Assistant, an expert in simulation, virtualization, and model management. You help users with VirtuVerse Studio, including V-Orchestrator, EnviHub, PlantHub, and other tools. Provide helpful, accurate, and concise responses.'
    };
    
    const messages = [
      systemMessage,
      ...conversationHistory,
      { role: 'user', content: message }
    ];
    
    const result = await client.chat.completions.create({
      messages,
      temperature: 0.7,
      max_tokens: 1000
    });
    
    res.json({
      status: 'success',
      response: result.choices[0]?.message?.content,
      conversationId: Date.now().toString()
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

module.exports = router;
