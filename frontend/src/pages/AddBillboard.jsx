import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserContext } from "../context/userContext";
import { 
  FaMapMarkerAlt, 
  FaCheck, 
  FaRupeeSign, 
  FaRuler, 
  FaCalendarAlt, 
  FaImage, 
  FaUpload,
  FaInfoCircle,
  FaTimes,
  FaEye
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginRequiredModal from "../components/LoginRequiredModal";

const AddBillboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [showLoginModal, setShowLoginModal] = useState(!user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    location: "",
    address: "",
    latitude: "",
    longitude: "",
    price: "",
    priceUnit: "week",
    width: "",
    height: "",
    views: "",
    type: "Static",
    facingDirection: "North",
    minBookingDays: "7",
    description: "",
    features: [""],
    nearbyAttractions: [""]
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      setShowLoginModal(true);
    }
  }, [user]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle array fields (features, attractions)
  const handleArrayFieldChange = (index, field, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  // Add a new empty field to arrays
  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  // Remove item from arrays
  const removeArrayField = (index, field) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + images.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }
    
    setImages(prev => [...prev, ...files]);
    
    // Create preview URLs
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviewImages]);
  };

  // Remove uploaded image
  const removeImage = (index) => {
    setImages(prev => {
      const newImages = [...prev];
      newImages.splice(index, 1);
      return newImages;
    });
    
    setPreviewImages(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  // Validate form fields
  const validateStep = (step) => {
    setError("");
    
    if (step === 1) {
      if (!formData.location) return "Location is required";
      if (!formData.address) return "Address is required";
      if (!formData.latitude || !formData.longitude) return "Coordinates are required";
    }
    
    if (step === 2) {
      if (!formData.price) return "Price is required";
      if (!formData.width || !formData.height) return "Dimensions are required";
      if (!formData.views) return "Estimated daily views are required";
    }
    
    if (step === 3) {
      if (!formData.description) return "Description is required";
      if (images.length === 0) return "At least one image is required";
    }
    
    return "";
  };

  // Move to next step
  const nextStep = () => {
    const error = validateStep(currentStep);
    if (error) {
      setError(error);
      return;
    }
    
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  // Move to previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateStep(currentStep);
    if (error) {
      setError(error);
      return;
    }
    
    setIsSubmitting(true);
    console.log("Submitting form data:", formData);
    console.log("Images to upload:", images);
    
    try {
      // Create FormData object
      const formDataObj = new FormData();
      formDataObj.append('location', formData.location);
      formDataObj.append('latitude', parseFloat(formData.latitude));
      formDataObj.append('longitude', parseFloat(formData.longitude));
      formDataObj.append('price', parseFloat(formData.price));
      formDataObj.append('height', parseFloat(formData.height));
      formDataObj.append('width', parseFloat(formData.width));
      formDataObj.append('available', true);
      formDataObj.append('description', formData.description);
      
      // Add features and nearby attractions as JSON strings
      formDataObj.append('features', JSON.stringify(formData.features.filter(f => f.trim() !== '')));
      
      // Check if nearbyAttractions property exists
      if (formData.nearbyAttractions && Array.isArray(formData.nearbyAttractions)) {
        formDataObj.append('nearbyAttractions', JSON.stringify(formData.nearbyAttractions.filter(a => a.trim() !== '')));
      } else {
        console.warn("nearbyAttractions is not properly defined:", formData.nearbyAttractions);
        formDataObj.append('nearbyAttractions', JSON.stringify([]));
      }
      
      // Log the FormData entries (for debugging)
      console.log("Form data to be sent:");
      for (let [key, value] of formDataObj.entries()) {
        console.log(`${key}: ${value}`);
      }
      
      // Add images
      images.forEach((image, index) => {
        console.log(`Adding image ${index}:`, image.name);
        formDataObj.append('images', image);
      });
      
      // Make API call
      console.log("Sending API request to: http://localhost:5000/api/billboards/addBillboard");
      const response = await fetch('http://localhost:5000/api/billboards/addBillboard', {
        method: 'POST',
        body: formDataObj,
        credentials: 'include',
      });
      
      console.log("API Response Status:", response.status);
      const data = await response.json();
      console.log("API Response Data:", data);
      
      if (response.ok) {
        setShowSuccess(true);
        
        // Reset form after success
        setTimeout(() => {
          navigate('/find-billboards');
        }, 3000);
      } else {
        setError('Failed to add billboard: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting billboard:', error);
      setError('An error occurred while submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">List Your Billboard</h1>
            <p className="mt-2 text-lg text-gray-600">
              Connect with advertisers across Maharashtra by listing your billboard
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center justify-center rounded-full w-10 h-10 text-white font-medium ${
                    idx + 1 === currentStep
                      ? 'bg-blue-600' 
                      : idx + 1 < currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                  }`}
                >
                  {idx + 1 < currentStep ? <FaCheck /> : idx + 1}
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="h-1 w-full bg-gray-200 rounded"></div>
              </div>
              <div className="relative flex justify-between">
                {Array.from({ length: totalSteps }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1/3 ${
                      idx + 1 === totalSteps ? 'text-right' : idx === 0 ? 'text-left' : 'text-center'
                    }`}
                  >
                    <div 
                      className={`h-1 ${
                        idx + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`} 
                      style={{ 
                        width: idx + 1 === totalSteps 
                          ? '0%' 
                          : idx === 0 
                            ? (currentStep > 1 ? '100%' : '0%')
                            : (currentStep > idx + 1 ? '100%' : currentStep === idx + 1 ? '50%' : '0%')
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <div>Location Details</div>
              <div>Billboard Specifications</div>
              <div>Description & Images</div>
            </div>
          </div>
          
          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            >
              <div className="flex items-center">
                <div className="mr-2">
                  <FaCheck className="text-green-500" />
                </div>
                <div>
                  <p className="font-bold">Billboard successfully added!</p>
                  <p className="text-sm">Your billboard has been added to our directory. Redirecting to billboard listings...</p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            >
              <div className="flex items-center">
                <div className="mr-2">
                  <FaInfoCircle className="text-red-500" />
                </div>
                <div>
                  <p className="font-bold">Please check your information</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Form Container */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Location Details */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Step 1: Location Details
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Billboard Location*
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Marine Drive, Mumbai"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Provide a recognizable location name that advertisers can search for
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Address*
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="e.g. Near NCPA, Marine Drive, Mumbai 400021"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Latitude*
                        </label>
                        <input
                          type="text"
                          name="latitude"
                          value={formData.latitude}
                          onChange={handleChange}
                          placeholder="e.g. 18.9438"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Longitude*
                        </label>
                        <input
                          type="text"
                          name="longitude"
                          value={formData.longitude}
                          onChange={handleChange}
                          placeholder="e.g. 72.8230"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-md">
                      <p className="text-sm text-blue-700">
                        <FaInfoCircle className="inline mr-1" />
                        Tip: You can find coordinates by right-clicking on Google Maps and selecting "What's here?"
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Billboard Specifications */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Step 2: Billboard Specifications
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pricing*
                      </label>
                      <div className="flex items-center">
                        <div className="relative flex-grow">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaRupeeSign className="text-gray-500" />
                          </div>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="e.g. 50000"
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <span className="mx-2">per</span>
                        <select
                          name="priceUnit"
                          value={formData.priceUnit}
                          onChange={handleChange}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="day">Day</option>
                          <option value="week">Week</option>
                          <option value="month">Month</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Width (feet)*
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="width"
                            value={formData.width}
                            onChange={handleChange}
                            placeholder="e.g. 30"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <FaRuler className="text-gray-500 transform rotate-90" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Height (feet)*
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            placeholder="e.g. 20"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <FaRuler className="text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estimated Daily Views*
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="views"
                          value={formData.views}
                          onChange={handleChange}
                          placeholder="e.g. 50000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <FaEye className="text-gray-500" />
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Provide an estimate of how many people see this billboard daily
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Billboard Type
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Static">Static</option>
                          <option value="Digital">Digital</option>
                          <option value="LED">LED</option>
                          <option value="Mobile">Mobile</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Facing Direction
                        </label>
                        <select
                          name="facingDirection"
                          value={formData.facingDirection}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="North">North</option>
                          <option value="South">South</option>
                          <option value="East">East</option>
                          <option value="West">West</option>
                          <option value="Northeast">Northeast</option>
                          <option value="Northwest">Northwest</option>
                          <option value="Southeast">Southeast</option>
                          <option value="Southwest">Southwest</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum Booking Period
                      </label>
                      <select
                        name="minBookingDays"
                        value={formData.minBookingDays}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="7">7 Days</option>
                        <option value="14">14 Days</option>
                        <option value="30">30 Days</option>
                        <option value="60">60 Days</option>
                        <option value="90">90 Days</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Step 3: Description & Images */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Step 3: Description & Images
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description*
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Provide detailed information about your billboard..."
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                      <p className="mt-1 text-sm text-gray-500">
                        Describe the billboard location, visibility, and other unique selling points
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Key Features
                      </label>
                      {formData.features.map((feature, index) => (
                        <div key={`feature-${index}`} className="flex mb-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleArrayFieldChange(index, 'features', e.target.value)}
                            placeholder="e.g. High visibility"
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayField(index, 'features')}
                            className="ml-2 p-2 text-red-500 hover:text-red-700"
                            disabled={formData.features.length === 1 && formData.features[0] === ''}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayField('features')}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add another feature
                      </button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nearby Attractions
                      </label>
                      {formData.nearbyAttractions.map((attraction, index) => (
                        <div key={`attraction-${index}`} className="flex mb-2">
                          <input
                            type="text"
                            value={attraction}
                            onChange={(e) => handleArrayFieldChange(index, 'nearbyAttractions', e.target.value)}
                            placeholder="e.g. Shopping Mall"
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayField(index, 'nearbyAttractions')}
                            className="ml-2 p-2 text-red-500 hover:text-red-700"
                            disabled={formData.nearbyAttractions.length === 1 && formData.nearbyAttractions[0] === ''}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayField('nearbyAttractions')}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add another nearby attraction
                      </button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Billboard Images* (Maximum 5)
                      </label>
                      
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FaUpload className="w-8 h-8 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG or JPEG (MAX. 5 images)
                            </p>
                          </div>
                          <input 
                            type="file" 
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            disabled={images.length >= 5}
                          />
                        </label>
                      </div>
                      
                      {/* Preview Images */}
                      {previewImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                          {previewImages.map((preview, index) => (
                            <div key={index} className="relative">
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Form Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 ${
                    currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={currentStep === 1}
                >
                  Previous
                </button>
                
                <div>
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={`px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Submit Billboard"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Login Required Modal */}
      {showLoginModal && (
        <LoginRequiredModal 
          onClose={() => {
            if (!user) {
              navigate('/');
            } else {
              setShowLoginModal(false);
            }
          }}
          onLogin={() => navigate("/login")}
          onSignup={() => navigate("/signup")}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default AddBillboard; 