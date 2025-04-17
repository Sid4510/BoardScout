const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Replicate = require('replicate');
const cloudinary = require('cloudinary').v2;
const fetch = require('node-fetch');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'));
    }
  }
});

// Initialize Replicate client with error handling
let replicate;

const initializeReplicate = () => {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error('REPLICATE_API_TOKEN is not set in environment variables');
    }
    replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
    console.log('Replicate client initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize Replicate client:', error);
    return false;
  }
};

// Initialize on module load
initializeReplicate();

// Upload image endpoint
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Return the URL of the uploaded file
    const fileUrl = `/uploads/${req.file.filename}`;
    console.log('File uploaded successfully:', fileUrl);
    
    res.json({ 
      url: fileUrl 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Failed to upload file',
      details: error.message 
    });
  }
});

// Generate AI images endpoint
router.post('/generate-images', async (req, res) => {
  try {
    // Try to initialize if not already initialized
    if (!replicate && !initializeReplicate()) {
      throw new Error('Failed to initialize Replicate client. Please check your API token and try again.');
    }

    const { prompt, num_images = 3 } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Generating images with prompt:', prompt);

    // Enhanced prompt for better billboard designs
    const enhancedPrompt = `Professional billboard design, ${prompt}, 
      high quality, detailed, 4k, professional advertising, 
      outdoor advertising, clear typography, visible from distance,
      commercial design, marketing material, realistic, photorealistic,
      professional lighting, commercial photography`;

    console.log('Using enhanced prompt:', enhancedPrompt);

    const output = await replicate.run(
      "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
      {
        input: {
          prompt: enhancedPrompt,
          num_outputs: num_images,
          width: 1024,
          height: 512,
          scheduler: "K_EULER",
          num_inference_steps: 50,
          guidance_scale: 7.5,
          negative_prompt: "blurry, low quality, distorted, text, watermark, signature"
        }
      }
    );

    console.log('Image generation completed:', output);

    if (!output || !Array.isArray(output) || output.length === 0) {
      throw new Error('No images were generated');
    }

    // Upload generated images to Cloudinary
    const uploadedImages = await Promise.all(
      output.map(async (imageUrl) => {
        try {
          const result = await cloudinary.uploader.upload(imageUrl, {
            folder: 'billboard-designs',
            resource_type: 'auto'
          });
          return result.secure_url;
        } catch (uploadError) {
          console.error('Failed to upload image to Cloudinary:', uploadError);
          return imageUrl; // Return original URL if upload fails
        }
      })
    );

    res.json({
      success: true,
      images: uploadedImages
    });

  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({
      error: 'Failed to generate images',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Add this endpoint to help with CORS issues
router.get('/proxy', async (req, res) => {
  const imageUrl = req.query.url;
  
  if (!imageUrl) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }
  
  try {
    // Validate URL to prevent abuse
    const url = new URL(imageUrl);
    
    // Block localhost and private network access
    const hostname = url.hostname.toLowerCase();
    if (hostname === 'localhost' || 
        hostname === '127.0.0.1' || 
        hostname.startsWith('192.168.') || 
        hostname.startsWith('10.') ||
        hostname.startsWith('172.')) {
      return res.status(403).json({ error: 'Access to local networks is not allowed' });
    }
    
    // Fetch the image
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }
    
    // Get content type to verify it's an image
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      return res.status(400).json({ error: 'URL does not point to an image' });
    }
    
    // Stream the image back to the client
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for a day
    
    // Get the buffer and send it
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Image proxy error:', error);
    res.status(500).json({ error: 'Failed to proxy image' });
  }
});

module.exports = router; 