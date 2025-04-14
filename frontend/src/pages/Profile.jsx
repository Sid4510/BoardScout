import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { FaEdit, FaCheck, FaTimes, FaCamera, FaUser, FaMapMarkerAlt, FaEnvelope, FaPhone, FaBriefcase, FaLock, FaExclamationCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("/default-avatar.png");
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    phone: "",
    company: "",
    website: "",
  });
  
  // Mock data for activity history - in real app would come from API
  const activityHistory = [
    { id: 1, type: 'update', description: 'Updated profile information', date: new Date(Date.now() - 3600000).toISOString() },
    { id: 2, type: 'search', description: 'Searched for billboards in New York', date: new Date(Date.now() - 86400000).toISOString() },
    { id: 3, type: 'view', description: 'Viewed billboard #1234', date: new Date(Date.now() - 172800000).toISOString() },
  ];
  
  // Get profile completion percentage
  const calculateProfileCompletion = () => {
    const fields = Object.keys(formData);
    const completedFields = fields.filter(field => formData[field]?.trim?.());
    return Math.floor((completedFields.length / fields.length) * 100);
  };
  
  const profileCompletionPercentage = calculateProfileCompletion();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Initialize form data with user data
    setFormData({
      name: user.name || "",
      email: user.email || "",
      bio: user.bio || "",
      location: user.location || "",
      phone: user.phone || "",
      company: user.company || "",
      website: user.website || "",
    });

    // Set profile image if available
    if (user.profileImage) {
      setProfileImage(user.profileImage);
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveStatus("saving");
    
    try {
      // Here you would normally send data to backend API
      const result = await updateUser({
        ...user,
        ...formData,
        profileImage,
      });
      
      if (result.success) {
        setSaveStatus("success");
        setTimeout(() => {
          setIsEditing(false);
          setSaveStatus(null);
        }, 1500);
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveStatus("error");
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setSaveStatus(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="pt-24 pb-10 px-4 md:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and account settings</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="relative mb-4 md:mb-0 md:mr-6">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full cursor-pointer hover:bg-gray-800 transition-colors shadow-lg">
                          <FaCamera />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      )}
                    </div>
                    <div className="text-center md:text-left text-white">
                      <h1 className="text-3xl font-bold">{formData.name}</h1>
                      {!isEditing && formData.company && (
                        <p className="mt-1 text-gray-300 flex items-center justify-center md:justify-start">
                          <FaBriefcase className="mr-2" />
                          {formData.company}
                        </p>
                      )}
                      {!isEditing && formData.location && (
                        <p className="mt-1 text-gray-300 flex items-center justify-center md:justify-start">
                          <FaMapMarkerAlt className="mr-2" />
                          {formData.location}
                        </p>
                      )}
                    </div>
                    
                    <div className="absolute top-4 right-4 flex space-x-2">
                      {!isEditing ? (
                        <button
                          onClick={toggleEdit}
                          className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-200 transition-colors shadow-md"
                          title="Edit Profile"
                        >
                          <FaEdit />
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={handleSubmit}
                            disabled={saveStatus === "saving"}
                            className={`p-2 rounded-full transition-colors shadow-md ${
                              saveStatus === "saving" 
                                ? "bg-gray-400 text-white" 
                                : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                            title="Save Changes"
                          >
                            {saveStatus === "saving" ? (
                              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <FaCheck />
                            )}
                          </button>
                          <button
                            onClick={toggleEdit}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-md"
                            title="Cancel"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <AnimatePresence>
                    {saveStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center"
                      >
                        <FaCheck className="mr-2" />
                        <span>Profile updated successfully!</span>
                      </motion.div>
                    )}
                    
                    {saveStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center"
                      >
                        <FaExclamationCircle className="mr-2" />
                        <span>There was an error updating your profile. Please try again.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Website
                          </label>
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border-b pb-2">
                          <div className="flex items-center text-sm font-medium text-gray-500">
                            <FaEnvelope className="mr-2 text-gray-400" />
                            <span>Email</span>
                          </div>
                          <p className="mt-1 text-gray-900">{formData.email || "-"}</p>
                        </div>
                        <div className="border-b pb-2">
                          <div className="flex items-center text-sm font-medium text-gray-500">
                            <FaPhone className="mr-2 text-gray-400" />
                            <span>Phone</span>
                          </div>
                          <p className="mt-1 text-gray-900">{formData.phone || "-"}</p>
                        </div>
                        <div className="border-b pb-2">
                          <div className="flex items-center text-sm font-medium text-gray-500">
                            <FaMapMarkerAlt className="mr-2 text-gray-400" />
                            <span>Location</span>
                          </div>
                          <p className="mt-1 text-gray-900">{formData.location || "-"}</p>
                        </div>
                        <div className="border-b pb-2">
                          <div className="flex items-center text-sm font-medium text-gray-500">
                            <FaBriefcase className="mr-2 text-gray-400" />
                            <span>Company</span>
                          </div>
                          <p className="mt-1 text-gray-900">{formData.company || "-"}</p>
                        </div>
                      </div>
                      
                      {formData.bio && (
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">About</h3>
                          <p className="text-gray-600 whitespace-pre-line">{formData.bio}</p>
                        </div>
                      )}
                      
                      {!formData.bio && (
                        <p className="text-gray-500 italic text-center py-4">
                          Add a bio to tell others about yourself
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Recent Activity Section */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden mt-6">
                <div className="border-b border-gray-200 p-4">
                  <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {activityHistory.map(activity => (
                    <div key={activity.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-900">{activity.description}</p>
                          <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {activityHistory.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      No recent activity
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Profile Completion */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="border-b border-gray-200 p-4">
                  <h2 className="text-lg font-medium text-gray-900">Profile Completion</h2>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{profileCompletionPercentage}% Complete</span>
                    {profileCompletionPercentage < 100 && (
                      <button 
                        onClick={toggleEdit}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Complete Now
                      </button>
                    )}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${profileCompletionPercentage}%` }}
                    ></div>
                  </div>
                  
                  {profileCompletionPercentage < 100 && (
                    <div className="mt-4 bg-blue-50 text-blue-700 p-3 rounded-md text-sm">
                      <p>Complete your profile to get the most out of BoardScout!</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Account Security */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="border-b border-gray-200 p-4">
                  <h2 className="text-lg font-medium text-gray-900">Account Security</h2>
                </div>
                <div className="p-4">
                  <ul className="divide-y divide-gray-200">
                    <li className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaLock className="text-gray-400 mr-3" />
                          <span className="text-gray-700">Password</span>
                        </div>
                        <Link to="/reset-password" className="text-sm text-blue-600 hover:text-blue-800">
                          Change
                        </Link>
                      </div>
                    </li>
                    <li className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaUser className="text-gray-400 mr-3" />
                          <span className="text-gray-700">Account Details</span>
                        </div>
                        <Link to="/account-settings" className="text-sm text-blue-600 hover:text-blue-800">
                          Manage
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Quick Links */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="border-b border-gray-200 p-4">
                  <h2 className="text-lg font-medium text-gray-900">Quick Links</h2>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 block py-1">
                        My Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/billboards" className="text-blue-600 hover:text-blue-800 block py-1">
                        Browse Billboards
                      </Link>
                    </li>
                    <li>
                      <Link to="/favorites" className="text-blue-600 hover:text-blue-800 block py-1">
                        My Favorites
                      </Link>
                    </li>
                    <li>
                      <Link to="/bookings" className="text-blue-600 hover:text-blue-800 block py-1">
                        My Bookings
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile; 