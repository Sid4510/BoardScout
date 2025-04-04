const jwt = require('jsonwebtoken');
const User = require('../models/User');

// This is a simplified auth middleware for development purposes
// In production, you would want a more robust implementation

// Middleware to check if user is authenticated
exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    // Get token from header or cookie
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      // For development purposes, set mock user
      req.user = {
        id: 'mock-user-id',
        name: 'Test User',
        email: 'testuser@example.com',
        role: 'user'
      };
      
      return next();
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'keyforjwt');
    
    // Find user based on decoded token
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Set user in request
    req.user = user;
    next();
  } catch (error) {
    // If token verification fails, still set mock user for development
    console.error('Auth error:', error.message);
    req.user = {
      id: 'mock-user-id',
      name: 'Test User',
      email: 'testuser@example.com',
      role: 'user'
    };
    
    next();
  }
};

// Middleware to authorize roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Please login to access this resource'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user.role}) is not allowed to access this resource`
      });
    }
    
    next();
  };
}; 