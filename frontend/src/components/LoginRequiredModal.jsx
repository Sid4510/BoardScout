import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSignInAlt, FaUserPlus, FaTimes } from "react-icons/fa";

const LoginRequiredModal = ({ onClose, onLogin, onSignup }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-2 z-10"
        >
          <FaTimes className="w-5 h-5" />
        </button>
        
        {/* Header */}
        <div className="bg-blue-600 px-6 py-8 text-center">
          <div className="bg-white/10 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
            <FaSignInAlt className="text-white text-3xl" />
          </div>
          <h3 className="text-2xl font-bold text-white">Authentication Required</h3>
          <p className="mt-2 text-blue-100">
            You need to log in or create an account to access this feature.
          </p>
        </div>
        
        {/* Body */}
        <div className="p-6 space-y-4">
          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors"
          >
            <FaSignInAlt className="mr-2" />
            <span>Log In</span>
          </button>
          
          <button
            onClick={onSignup}
            className="w-full flex items-center justify-center bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-md transition-colors"
          >
            <FaUserPlus className="mr-2" />
            <span>Create Account</span>
          </button>
          
          <button
            onClick={onClose}
            className="w-full text-gray-500 hover:text-gray-700 py-2 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginRequiredModal; 