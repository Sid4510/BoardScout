import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUpload, FaImage, FaTextHeight, FaPalette, FaEye, FaSpinner, FaCheck, FaDownload, FaTimes, FaFilePdf } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiX } from 'react-icons/fi';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CreateBillboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    primaryColor: "#2563eb",
    secondaryColor: "#ffffff",
    textColor: "#000000",
    images: [],
    logo: null,
    contactInfo: "",
    callToAction: "",
    duration: "1 week",
    location: "",
    size: "12x24",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedDesigns, setGeneratedDesigns] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState({
    images: false,
    logo: false
  });

  const [promptDescription, setPromptDescription] = useState('');

  const [showPreview, setShowPreview] = useState(false);
  const [previewDesign, setPreviewDesign] = useState(null);
  const [finalComposite, setFinalComposite] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploadProgress(0);
    setError(null);
    setUploadSuccess({ ...uploadSuccess, images: false });

    try {
      const uploadedImages = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("File size should be less than 5MB");
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("http://localhost:5000/api/images/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        });

        if (!response.data.url) {
          throw new Error("Failed to get image URL from server");
        }

        uploadedImages.push(response.data.url);
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));
      setUploadSuccess({ ...uploadSuccess, images: true });
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || err.message || "Failed to upload images");
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Logo size should be less than 2MB");
      return;
    }

    setUploadSuccess({ ...uploadSuccess, logo: false });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://localhost:5000/api/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data.url) {
        throw new Error("Failed to get logo URL from server");
      }

      setFormData(prev => ({
        ...prev,
        logo: response.data.url
      }));
      setUploadSuccess({ ...uploadSuccess, logo: true });
    } catch (err) {
      console.error('Logo upload error:', err);
      setError(err.response?.data?.error || err.message || "Failed to upload logo");
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, images: [] }));
  };

  const removeLogo = () => {
    setFormData(prev => ({ ...prev, logo: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim() && !promptDescription.trim()) {
      newErrors.description = 'Either description or prompt is required';
    }
    
    setError(null);
    return Object.keys(newErrors).length === 0;
  };

  const generateDesigns = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setGeneratedDesigns([]);
    
    try {
      // Construct a more detailed prompt with specific billboard layout instructions
      let prompt = promptDescription || `Create a professional advertising billboard design for "${formData.title}". 
        The billboard should include: 
        - Main headline: "${formData.title}" in large, readable text
        - Subtext: "${formData.description}" in smaller font`;
      
      if (formData.callToAction) {
        prompt += ` - Call to action button or text: "${formData.callToAction}" in a prominent position`;
      }
      
      if (formData.contactInfo) {
        prompt += ` - Contact information: "${formData.contactInfo}" in a clear, legible position`;
      }
      
      prompt += ` - Layout optimized for ${formData.size} billboard size, viewed from a distance
        - Brand colors: primary color ${formData.primaryColor}, secondary color ${formData.secondaryColor}`;
      
      if (formData.logo) {
        prompt += ' - Professional placement of company logo in top corner or centered position';
      }
      
      if (formData.images && formData.images.length > 0) {
        prompt += ' - Designated area for product/service images with proper integration';
      }
      
      prompt += ` - Clean, professional advertising design, high contrast for readability at a distance
        - Text hierarchy with clear visual flow
        - Professional outdoor advertisement, commercial design, marketing material`;
      
      console.log("Generated prompt:", prompt);
      
      // Create designs based on input content with more specific styles
      const designsToCreate = [
        { 
          name: "Modern Minimalist", 
          style: "modern minimalist billboard with clean layout, ample white space, strong typography hierarchy, and balanced composition. Crisp, elegant design with perfect spacing."
        },
        { 
          name: "Bold & Vibrant", 
          style: "bold, eye-catching billboard with vibrant colors, dynamic typography, high contrast elements, and exciting visual hierarchy. Make it pop with energy and clear readability."
        },
        { 
          name: "Elegant & Professional", 
          style: "sophisticated premium billboard with elegant typography, refined color palette, luxury feel, and professional composition. Corporate quality with perfect balance and high-end aesthetics."
        }
      ];
      
      // Generate three designs using an advanced Stable Diffusion XL model for better quality
      const designs = [];
      for (let i = 0; i < designsToCreate.length; i++) {
        try {
          const design = designsToCreate[i];
          
          // Create more specific prompts for each style
          const designPrompt = `${prompt} 
            Style: ${design.style} 
            The final result should look like a professional billboard advertisement created by a top design agency.
            Ensure all text is readable and perfectly placed, with proper visual hierarchy.`;
          
          setError(`Generating ${design.name} design... This may take up to 30 seconds.`);
          
          // Use the more powerful Stable Diffusion XL model for higher quality results
          const modelResponse = await axios.post(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            { 
              inputs: designPrompt,
              parameters: {
                negative_prompt: "blurry, distorted text, low quality, low resolution, amateur, poorly drawn text, unreadable text, bad anatomy, ugly, deformed, childish, cartoonish, bad proportions, oversaturated",
                num_inference_steps: 50,
                guidance_scale: 9,
                width: 1024,
                height: 576
              }
            },
            {
              headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
              },
              responseType: 'arraybuffer'
            }
          ).catch(async () => {
            // If SDXL fails, fall back to a more reliable model
            setError(`SDXL model busy, trying alternative model for ${design.name}...`);
            return await axios.post(
              "https://api-inference.huggingface.co/models/SG161222/Realistic_Vision_V5.1_noVAE",
              { 
                inputs: designPrompt,
                parameters: {
                  negative_prompt: "blurry, distorted text, low quality, low resolution, amateur, poorly drawn text, unreadable text",
                  num_inference_steps: 50,
                  guidance_scale: 8.5,
                  width: 1024,
                  height: 576
                }
              },
              {
                headers: {
                  Authorization: "Bearer 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",
                  "Content-Type": "application/json",
                },
                responseType: 'arraybuffer'
              }
            );
          });

          if (!modelResponse || !modelResponse.data) {
            throw new Error(`Failed to generate ${design.name} design`);
          }
          
          // Process the image
          const base64Image = btoa(
            new Uint8Array(modelResponse.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          const imageUrl = `data:image/jpeg;base64,${base64Image}`;
          
          // Create design with improved description
          const newDesign = {
            id: `design-${i + 1}`,
            imageUrl,
            name: design.name,
            description: `A professional ${design.style.split(' billboard')[0]} billboard that effectively showcases "${formData.title}". ${
              formData.images && formData.images.length > 0 ? 'Incorporates your product imagery with perfect placement. ' : ''
            }${
              formData.logo ? 'Features your company logo prominently positioned for brand recognition. ' : ''
            }Optimized for ${formData.size} billboard size with excellent visibility from a distance.`,
            formData: { ...formData }
          };
          
          designs.push(newDesign);
          
          // Update UI with designs as they're generated
          setGeneratedDesigns([...designs]);
          
        } catch (innerError) {
          console.error(`Error generating design ${i+1}:`, innerError);
          // Continue with next design
        }
      }
      
      // If we couldn't generate any designs, throw an error to trigger fallback
      if (designs.length === 0) {
        throw new Error("Could not generate any designs");
      }
      
      setError(null);
    } catch (error) {
      console.error('Error generating designs:', error);
      
      // Create more content-rich fallback designs
      const fallbackDesigns = [
        {
          id: 'design-1',
          imageUrl: `https://placehold.co/1024x576/${formData.primaryColor.replace('#', '')}/${formData.secondaryColor.replace('#', '')}/png?text=${encodeURIComponent(formData.title || 'Modern Design')}`,
          name: "Modern Minimalist",
          description: `A clean and modern billboard design featuring "${formData.title}" with ${formData.callToAction ? `a call to action: "${formData.callToAction}"` : 'your call to action'}. ${formData.logo ? 'Includes your logo.' : ''} ${formData.images && formData.images.length > 0 ? 'Incorporates your provided images.' : ''}`,
          formData: { ...formData }
        },
        {
          id: 'design-2',
          imageUrl: `https://placehold.co/1024x576/${formData.secondaryColor.replace('#', '')}/${formData.primaryColor.replace('#', '')}/png?text=${encodeURIComponent(formData.callToAction || formData.title || 'Bold Design')}`,
          name: "Bold & Vibrant",
          description: `A bold and eye-catching billboard design that uses vibrant colors and strong typography to grab attention. Features "${formData.title}" ${formData.callToAction ? `with call to action: "${formData.callToAction}"` : ''}. ${formData.logo ? 'Showcases your logo prominently.' : ''} ${formData.images && formData.images.length > 0 ? 'Integrates your uploaded images.' : ''}`,
          formData: { ...formData }
        },
        {
          id: 'design-3',
          imageUrl: `https://placehold.co/1024x576/4f46e5/FFFFFF/png?text=${encodeURIComponent(formData.title || 'Elegant Design')}%0A${encodeURIComponent(formData.callToAction || '')}`,
          name: "Elegant & Professional",
          description: `A sophisticated and elegant billboard design with premium feel and perfect composition. Highlights "${formData.title}" ${formData.description ? `with your message: "${formData.description.substring(0, 30)}${formData.description.length > 30 ? '...' : ''}"` : ''}. ${formData.logo ? 'Features your logo elegantly positioned.' : ''} ${formData.images && formData.images.length > 0 ? 'Artfully incorporates your images.' : ''}`,
          formData: { ...formData }
        }
      ];
      
      setGeneratedDesigns(fallbackDesigns);
      
      if (!error.message.includes("Could not generate any designs")) {
        setError("Could not connect to image generation service. Using placeholders instead.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Update the image loading code with simpler approach
  const loadImageWithCORS = (imageUrl, callback) => {
    // For data URLs, we can use them directly
    if (imageUrl.startsWith('data:')) {
      callback(imageUrl);
      return;
    }

    // For server-uploaded images, ensure they have the correct base URL
    if (imageUrl.startsWith('/uploads/')) {
      const fullUrl = `http://localhost:5000${imageUrl}`;
      console.log('Converting relative URL to absolute URL:', fullUrl);
      callback(fullUrl);
      return;
    }

    // For all other URLs, use as is
    callback(imageUrl);
  };

  // Update the download function with simpler approach
  const downloadComposite = (format = 'jpg') => {
    if (!finalComposite || !previewDesign) {
      console.error('No composite image or design available for download');
      alert('No image available for download. Please try again.');
      return;
    }
    
    try {
      // Create a screenshot directly from the DOM element
      const element = document.getElementById('billboard-preview-container');
      if (!element) {
        console.error('Billboard preview container not found');
        alert('Could not find the billboard preview element.');
        return;
      }
      
      // Show a loading indicator
      const loadingEl = document.createElement('div');
      loadingEl.textContent = `Creating ${format.toUpperCase()}...`;
      loadingEl.style.position = 'absolute';
      loadingEl.style.bottom = '10px';
      loadingEl.style.left = '10px';
      loadingEl.style.background = 'rgba(0,0,0,0.7)';
      loadingEl.style.color = 'white';
      loadingEl.style.padding = '5px 10px';
      loadingEl.style.borderRadius = '4px';
      loadingEl.style.zIndex = '100';
      element.appendChild(loadingEl);
      
      try {
        // Use html2canvas with error handling
        html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          logging: false,
          imageTimeout: 15000
        }).then(canvas => {
          // Remove loading indicator
          if (element.contains(loadingEl)) {
            element.removeChild(loadingEl);
          }
          
          try {
            if (format === 'jpg') {
              // Get data URL from canvas
              const imgData = canvas.toDataURL('image/jpeg', 0.9);
              
              // Create download link
              const link = document.createElement('a');
              link.href = imgData;
              link.download = `billboard-${previewDesign.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else if (format === 'pdf') {
              try {
                // Create PDF from canvas
                const imgData = canvas.toDataURL('image/jpeg', 0.9);
                const pdf = new jsPDF({
                  orientation: 'landscape',
                  unit: 'mm',
                  format: 'a4'
                });
                
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                
                // Calculate dimensions to maintain aspect ratio
                const canvasAspectRatio = canvas.width / canvas.height;
                let imgWidth = pageWidth - 20;
                let imgHeight = imgWidth / canvasAspectRatio;
                
                if (imgHeight > pageHeight - 40) {
                  imgHeight = pageHeight - 40;
                  imgWidth = imgHeight * canvasAspectRatio;
                }
                
                // Center on page
                const x = (pageWidth - imgWidth) / 2;
                const y = 20;
                
                // Add billboard image
                pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
                
                // Add billboard details
                pdf.setFontSize(12);
                const detailsY = y + imgHeight + 10;
                pdf.text(`Billboard Type: ${previewDesign.name}`, 15, detailsY);
                pdf.text(`Size: ${previewDesign.formData.size}`, 15, detailsY + 7);
                pdf.text(`Duration: ${previewDesign.formData.duration}`, 15, detailsY + 14);
                
                // Add border
                pdf.setDrawColor(200, 200, 200);
                pdf.setLineWidth(0.5);
                pdf.rect(x - 5, y - 5, imgWidth + 10, imgHeight + 10);
                
                pdf.save(`billboard-${previewDesign.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
              } catch (pdfError) {
                console.error('PDF generation error:', pdfError);
                alert('Could not create PDF. Trying alternative download...');
                
                // Fallback to JPG if PDF fails
                const imgData = canvas.toDataURL('image/jpeg', 0.9);
                const link = document.createElement('a');
                link.href = imgData;
                link.download = `billboard-${previewDesign.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            }
          } catch (downloadError) {
            console.error('Error creating download:', downloadError);
            alert(`Error creating ${format.toUpperCase()}: ${downloadError.message}`);
            if (element.contains(loadingEl)) {
              element.removeChild(loadingEl);
            }
          }
        }).catch(canvasError => {
          // Handle canvas generation error
          console.error('Canvas generation error:', canvasError);
          alert('Failed to generate the image. Trying alternative download method...');
          
          // Remove loading indicator if it exists
          if (element.contains(loadingEl)) {
            element.removeChild(loadingEl);
          }
          
          // Try a direct download of the image if available
          if (finalComposite) {
            const link = document.createElement('a');
            link.href = finalComposite;
            link.download = `billboard-${previewDesign.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        });
      } catch (html2canvasError) {
        console.error('html2canvas error:', html2canvasError);
        alert('Cannot generate image. Please try again later.');
        if (element.contains(loadingEl)) {
          element.removeChild(loadingEl);
        }
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('There was an error with the download process. Please try again.');
    }
  };

  // Update the composite design function to handle various URL types
  const generateCompositeDesign = (design) => {
    try {
      // Set the finalComposite immediately to the base image
      setFinalComposite(design.imageUrl);
      
      // For data URLs, we can use them directly for the composite
      if (design.imageUrl.startsWith('data:')) {
        console.log('Using data URL directly');
        return;
      }
      
      // For server-uploaded images, ensure proper base URL
      let imageUrl = design.imageUrl;
      if (imageUrl.startsWith('/uploads/')) {
        imageUrl = `http://localhost:5000${imageUrl}`;
        console.log('Using absolute URL for server image:', imageUrl);
      }
      
      // Set finalComposite to the resolved URL
      setFinalComposite(imageUrl);
      
    } catch (error) {
      console.error('Error in composite generation:', error);
      // Use a simple fallback - just keep the original URL
    }
  };

  // Function to handle image loading issues 
  const handleDesignClick = (design) => {
    // Simply load the design for preview
    handlePreview(design);
  };

  // Function to show preview with simplified handling
  const handlePreview = (design) => {
    setPreviewDesign(design);
    setShowPreview(true);
    generateCompositeDesign(design);
  };

  // Function to close preview modal
  const closePreview = () => {
    setShowPreview(false);
    setPreviewDesign(null);
    setFinalComposite(null);
  };

  // Add a useEffect to handle any canvas painting issues
  useEffect(() => {
    if (previewDesign && finalComposite) {
      // This ensures the preview shows clearly with legible text
      const container = document.getElementById('billboard-preview-container');
      if (container) {
        container.classList.add('billboard-preview-active');
      }
      
      return () => {
        if (container) {
          container.classList.remove('billboard-preview-active');
        }
      };
    }
  }, [previewDesign, finalComposite]);

  // Function to create a CSS style block for billboard preview
  useEffect(() => {
    // Add CSS for billboard preview
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .billboard-preview-active {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
      }
      
      .billboard-preview-active::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4));
        pointer-events: none;
        z-index: 10;
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 py-16">
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/4 transform text-blue-400 opacity-20" width="800" height="800" fill="none" viewBox="0 0 800 800">
            <circle cx="400" cy="400" r="400" />
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Create Your Billboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Design and customize your perfect billboard advertisement
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Billboard Information</h2>
            <form onSubmit={generateDesigns} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${error && error.title ? 'border-red-500' : ''}`}
                  required
                />
                {error && error.title && <p className="text-red-500 text-sm mt-1">{error.title}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${error && error.description ? 'border-red-500' : ''}`}
                  required
                />
                {error && error.description && <p className="text-red-500 text-sm mt-1">{error.description}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    id="primaryColor"
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md cursor-pointer"
                  />
                </div>
                <div>
                  <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Secondary Color
                  </label>
                  <input
                    type="color"
                    id="secondaryColor"
                    name="secondaryColor"
                    value={formData.secondaryColor}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="textColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Text Color
                  </label>
                  <input
                    type="color"
                    id="textColor"
                    name="textColor"
                    value={formData.textColor}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md cursor-pointer"
                  />
                </div>
                <div>
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                    Logo
                  </label>
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="w-full h-10 rounded-md cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Information
                  </label>
                  <textarea
                    id="contactInfo"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${error && error.contactInfo ? 'border-red-500' : ''}`}
                  />
                  {error && error.contactInfo && <p className="text-red-500 text-sm mt-1">{error.contactInfo}</p>}
                </div>
                <div>
                  <label htmlFor="callToAction" className="block text-sm font-medium text-gray-700 mb-1">
                    Call to Action
                  </label>
                  <textarea
                    id="callToAction"
                    name="callToAction"
                    value={formData.callToAction}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${error && error.callToAction ? 'border-red-500' : ''}`}
                  />
                  {error && error.callToAction && <p className="text-red-500 text-sm mt-1">{error.callToAction}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1 week">1 Week</option>
                    <option value="2 weeks">2 Weeks</option>
                    <option value="1 month">1 Month</option>
                    <option value="3 months">3 Months</option>
                    <option value="6 months">6 Months</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${error && error.location ? 'border-red-500' : ''}`}
                  />
                  {error && error.location && <p className="text-red-500 text-sm mt-1">{error.location}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                    Billboard Size
                  </label>
                  <select
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="12x24">12x24 ft</option>
                    <option value="14x48">14x48 ft</option>
                    <option value="20x60">20x60 ft</option>
                    <option value="custom">Custom Size</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                    Images
                  </label>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="w-full h-10 rounded-md cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="promptDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    AI Prompt (Alternative to Description)
                  </label>
                  <textarea
                    id="promptDescription"
                    name="promptDescription"
                    value={promptDescription}
                    onChange={(e) => setPromptDescription(e.target.value)}
                    rows="4"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${error && error.promptDescription ? 'border-red-500' : ''}`}
                  />
                  {error && error.promptDescription && <p className="text-red-500 text-sm mt-1">{error.promptDescription}</p>}
                </div>
                <div>
                  <label htmlFor="generatedDesigns" className="block text-sm font-medium text-gray-700 mb-1">
                    Generated Designs
                  </label>
                  <select
                    id="generatedDesigns"
                    name="generatedDesigns"
                    value={previewDesign ? previewDesign.id : ''}
                    onChange={(e) => {
                      if (e.target.value) {
                        handleDesignClick(generatedDesigns.find(d => d.id === e.target.value));
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a design</option>
                    {generatedDesigns.map(design => (
                      <option key={design.id} value={design.id}>{design.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Generate Designs
                </button>
              </div>
            </form>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {loading ? (
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Generating beautiful designs...</p>
              </div>
            ) : generatedDesigns.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Generated Designs</h2>
                {generatedDesigns.map((design) => (
                  <div key={design.id} className="bg-white p-6 rounded-xl shadow-md">
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img
                        src={design.imageUrl}
                        alt={design.name}
                        className="w-full h-full object-cover rounded-lg"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23${design.formData.primaryColor?.replace('#', '') || '4f46e5'}' /%3E%3Ctext x='400' y='200' font-family='Arial' font-size='32' fill='white' text-anchor='middle'%3E${design.name || 'Design Preview'}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                    </div>
                    
                    {/* Show uploaded images if available */}
                    {design.formData && design.formData.images && design.formData.images.length > 0 && (
                      <div className="mt-4 mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Your Uploaded Images</h4>
                        <div className="flex flex-wrap gap-2">
                          {design.formData.images.map((img, idx) => (
                            <img 
                              key={idx} 
                              src={img} 
                              alt={`Uploaded ${idx + 1}`}
                              className="w-16 h-16 object-cover rounded border border-gray-200"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <p className="text-gray-600">No designs generated yet. Please generate designs to see the preview.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && previewDesign && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {previewDesign.name} Billboard Preview
                </h2>
                <button 
                  onClick={closePreview}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              
              <div id="billboard-preview-container" className="aspect-w-16 aspect-h-9 mb-6 relative overflow-hidden rounded-lg shadow-lg">
                {/* The composite image */}
                <img 
                  src={finalComposite || previewDesign.imageUrl} 
                  alt="Billboard Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Simple fallback for image errors
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%234f46e5'/%3E%3Ctext x='400' y='200' font-family='Arial' font-size='32' fill='white' text-anchor='middle'%3EBillboard Preview%3C/text%3E%3C/svg%3E";
                    console.log("Using fallback image for preview");
                  }}
                />
                
                {/* Separate Logo Element - ensures visibility even if canvas fails */}
                {previewDesign.formData.logo && (
                  <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-md shadow-md" style={{zIndex: 20}}>
                    <img 
                      src={previewDesign.formData.logo} 
                      alt="Company Logo" 
                      className="h-14 max-w-[120px] object-contain"
                      crossOrigin="anonymous"
                      onError={(e) => e.target.style.display = "none"}
                    />
                  </div>
                )}
                
                {/* Overlay showing how the content is arranged */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <div className="text-white mb-2">
                    <h3 
                      className="text-3xl md:text-4xl font-bold mb-2" 
                      style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
                    >
                      {previewDesign.formData.title}
                    </h3>
                    <p 
                      className="text-lg md:text-xl mb-4" 
                      style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
                    >
                      {previewDesign.formData.description}
                    </p>
                    {previewDesign.formData.callToAction && (
                      <div className="inline-block bg-white/90 text-black px-4 py-2 rounded-md text-lg font-semibold mb-2 shadow-md">
                        {previewDesign.formData.callToAction}
                      </div>
                    )}
                    {previewDesign.formData.contactInfo && (
                      <p 
                        className="text-white text-sm mt-2" 
                        style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
                      >
                        {previewDesign.formData.contactInfo}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">Billboard Details</h3>
                  <p className="text-gray-600 text-sm mb-1">Size: {previewDesign.formData.size}</p>
                  <p className="text-gray-600 text-sm">Duration: {previewDesign.formData.duration}</p>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={() => downloadComposite('jpg')}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    <FaDownload />
                    <span>Download JPG</span>
                  </button>
                  
                  <button 
                    onClick={() => downloadComposite('pdf')}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                  >
                    <FaFilePdf />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
              
              {/* Display resources used section */}
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Resources Used</h3>
                <div className="flex flex-wrap gap-3">
                  {previewDesign.formData.logo && (
                    <div className="p-2 border border-gray-200 rounded-md bg-white">
                      <p className="text-xs text-gray-500 mb-1">Logo</p>
                      <img 
                        src={previewDesign.formData.logo} 
                        alt="Logo" 
                        className="h-10 max-w-[100px] object-contain"
                        crossOrigin="anonymous" 
                        onError={(e) => e.target.style.display = "none"}
                      />
                    </div>
                  )}
                  
                  {previewDesign.formData.images && previewDesign.formData.images.map((image, index) => (
                    <div key={index} className="p-2 border border-gray-200 rounded-md bg-white">
                      <p className="text-xs text-gray-500 mb-1">Image {index + 1}</p>
                      <img 
                        src={image} 
                        alt={`Image ${index + 1}`} 
                        className="h-10 w-20 object-cover"
                        crossOrigin="anonymous" 
                        onError={(e) => e.target.style.display = "none"}
                      />
                    </div>
                  ))}
                  
                  <div className="p-2 border border-gray-200 rounded-md bg-white">
                    <p className="text-xs text-gray-500 mb-1">Colors</p>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-full" 
                        style={{backgroundColor: previewDesign.formData.primaryColor}} 
                      />
                      <div 
                        className="w-6 h-6 rounded-full" 
                        style={{backgroundColor: previewDesign.formData.secondaryColor}} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CreateBillboard;
