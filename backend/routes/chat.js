const express = require('express');
const router = express.Router();
const Replicate = require('replicate');

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Call the Replicate API with the Llama 2 model
    const output = await replicate.run(
      "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
      {
        input: {
          prompt: `You are a helpful assistant for BoardScout, a platform for outdoor advertising. 
          Please provide helpful and concise responses about billboard advertising, marketing, and related topics.
          User: ${message}
          Assistant:`,
          max_length: 500,
          temperature: 0.7,
          top_p: 0.9,
          repetition_penalty: 1
        }
      }
    );

    // Extract the response from the output
    const response = output.join(' ').trim();

    res.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      details: error.message
    });
  }
});

module.exports = router; 