import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMessageSquare, FiX, FiMaximize2, FiMinimize2, FiMoon, FiSun } from 'react-icons/fi';
import { RiRobot2Fill, RiUserSmileLine, RiSparklingFill } from 'react-icons/ri';
import axios from 'axios';

const FloatingParticle = ({ delay }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: [1, 1.2, 1],
      opacity: [0.8, 0, 0.8],
      y: [-20, -40],
      x: [0, Math.random() * 20 - 10]
    }}
    transition={{ 
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 2
    }}
    className="absolute"
  >
    <RiSparklingFill className="text-white/30" size={8} />
  </motion.div>
);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your BoardScout assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponses, setLastResponses] = useState(new Set());
  const messagesEndRef = useRef(null);
  const [theme, setTheme] = useState('default');
  const [showParticles, setShowParticles] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Location-related responses array
  const locationResponses = [
    'Strategic billboard placement is crucial for success. Consider high-traffic highways, busy urban intersections, and areas near shopping districts. Our data shows these locations typically generate the highest impressions.',
    'For optimal billboard visibility, we recommend locations with: 1) High daily traffic counts, 2) Slower traffic speeds for better readability, 3) Clear sightlines, and 4) Proximity to your target demographic areas.',
    'Based on our analytics, the most effective billboard locations include: major commuter routes, entertainment districts, and areas near relevant points of interest for your target audience.',
    'Location strategy should align with your campaign goals. We can help you analyze traffic patterns, demographic data, and competitor locations to find the perfect spot for your billboard.'
  ];

  const getHuggingFaceResponse = async (query) => {
    // Using OpenAssistant model which is better for conversational tasks
    const API_URL = "https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5";
    const API_KEY = process.env.REACT_APP_HUGGING_FACE_API_KEY;
    
    // Create a timeout promise that rejects after 15 seconds
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('API request timed out')), 15000);
    });
    
    try {
      // Create a detailed prompt that provides extensive context about billboard advertising
      const prompt = `
<|prompter|>
You are an expert assistant for BoardScout, a platform specializing in outdoor advertising and billboard management. You have extensive knowledge about:

1. Billboard types (traditional, digital, mobile, etc.)
2. Pricing models ($2,000-$15,000 for prime locations, $300-$1,500 for rural areas)
3. Design best practices (7 words or fewer, high contrast, large fonts)
4. Strategic placement (high-traffic areas, demographic targeting)
5. ROI metrics and effectiveness analysis
6. Digital vs. traditional billboard comparison
7. Legal regulations for outdoor advertising
8. Industry trends and innovations

Please provide a helpful, accurate, and concise response to this question about billboard advertising:

${query}
<|assistant|>
`;
      
      // Use Promise.race to implement timeout
      const response = await Promise.race([
        axios.post(
          API_URL,
          { 
            inputs: prompt, 
            parameters: { 
              max_new_tokens: 500, 
              temperature: 0.7, 
              top_p: 0.95,
              do_sample: true,
              return_full_text: false
            }
          },
          { 
            headers: { 
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json' 
            }
          }
        ),
        timeoutPromise
      ]);
      
      if (response.data && response.data[0] && response.data[0].generated_text) {
        // Extract just the assistant's response part
        const fullText = response.data[0].generated_text;
        const assistantResponse = fullText.split('<|assistant|>')[1]?.trim();
        
        if (assistantResponse) {
          // Ensure response is billboard-related or relevant
          if (isRelevantToBillboards(assistantResponse, query)) {
            return assistantResponse;
          }
        }
      }
      
      // Fallback to predefined responses if no valid response
      return getBillboardResponse(query);
    } catch (error) {
      console.error("Hugging Face API error:", error);
      // Fallback to predefined responses
      return getBillboardResponse(query);
    }
  };
  
  // Helper function to check if response is relevant to billboard advertising
  const isRelevantToBillboards = (response, query) => {
    const billboardKeywords = [
      'billboard', 'advertising', 'outdoor', 'display', 'campaign', 
      'marketing', 'impression', 'visibility', 'location', 'audience',
      'traffic', 'sign', 'design', 'digital', 'traditional', 'roi', 
      'cost', 'pricing', 'placement', 'target', 'demographic'
    ];
    
    // If query doesn't seem billboard related but response is generic, return false
    const queryHasBillboardTerms = billboardKeywords.some(keyword => 
      query.toLowerCase().includes(keyword)
    );
    
    if (!queryHasBillboardTerms && response.length > 200) {
      // For non-billboard queries, only allow relevant responses
      const responseLower = response.toLowerCase();
      const billboardMentions = billboardKeywords.filter(keyword => 
        responseLower.includes(keyword)
      ).length;
      
      // If less than 3 billboard terms in a long response to a non-billboard query, reject
      if (billboardMentions < 3) {
        return false;
      }
    }
    
    return true;
  };

  const getBillboardResponse = (query) => {
    query = query.toLowerCase();
    let response;
    
    if (query.includes('location') || query.includes('where') || query.includes('place')) {
      // Get a random response that hasn't been used recently
      const availableResponses = locationResponses.filter(resp => !lastResponses.has(resp));
      response = availableResponses.length > 0 
        ? availableResponses[Math.floor(Math.random() * availableResponses.length)]
        : locationResponses[Math.floor(Math.random() * locationResponses.length)];
      
      // Update last responses tracking
      setLastResponses(prev => {
        const newSet = new Set(prev);
        newSet.add(response);
        if (newSet.size > 2) { // Keep track of last 2 responses
          newSet.delete([...newSet][0]);
        }
        return newSet;
      });
      
      return response;
    }
    
    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      return 'Hello! How can I help you with outdoor advertising today?';
    }
    
    if (query.includes('cost') || query.includes('price') || query.includes('expensive')) {
      return 'Billboard pricing varies based on location, size, and duration. Prime locations in major cities can cost $2,000-$15,000 per month, while rural billboards may cost $300-$1,500 per month. Digital billboards typically cost more but allow for multiple ad rotations.';
    }
    
    if (query.includes('size') || query.includes('dimension')) {
      return 'Standard billboard sizes include: Bulletins (14ft × 48ft), Medium Rectangles (10ft × 36ft), Junior Posters (6ft × 12ft), and Digital Billboards (14ft × 48ft). The most common highway billboards are 14ft × 48ft bulletins.';
    }
    
    if (query.includes('effective') || query.includes('impact') || query.includes('roi')) {
      return 'Billboard advertising can be highly effective with a typical ROI of 5:1. They reach a broad audience, build brand awareness, and have a low cost per impression compared to other media. For best results, use clear messaging, strong visuals, and strategic locations relevant to your target audience.';
    }
    
    if (query.includes('design') || query.includes('create')) {
      return 'For effective billboard design: 1) Use 7 words or fewer, 2) Ensure high color contrast, 3) Use large, legible fonts, 4) Include one clear image, 5) Add your logo and contact info, and 6) Create a clear call to action. Our platform provides AI-powered design tools to help you create impactful billboards.';
    }
    
    if (query.includes('digital') || query.includes('electronic')) {
      return 'Digital billboards offer several advantages: 1) Multiple ads can rotate in the same space, 2) Content can be updated instantly, 3) Dynamic content can respond to weather or time of day, 4) They have higher visibility, especially at night. However, they typically cost 3-4 times more than traditional billboards.';
    }
    
    if (query.includes('target') || query.includes('audience') || query.includes('demographic')) {
      return 'Billboard targeting strategies include: 1) Geographic targeting by placing ads in specific neighborhoods or routes, 2) Demographic targeting by choosing locations frequented by your audience, 3) Behavioral targeting by placing ads near relevant businesses or venues. BoardScout provides detailed demographic data for each billboard location.';
    }
    
    // Default response if no keywords match
    return 'I can help you find information about billboard advertising, including costs, design best practices, location selection, and effectiveness metrics. What specific information are you looking for?';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    const userQuery = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // First try to get a response from the Hugging Face model
      let response;
      
      try {
        // Add thinking message while waiting for API response
        const thinkingMessage = { 
          role: 'assistant', 
          content: 'Thinking...', 
          temporary: true 
        };
        setMessages(prev => [...prev, thinkingMessage]);
        
        response = await getHuggingFaceResponse(userQuery);
        
        // Remove temporary thinking message
        setMessages(prev => prev.filter(msg => !msg.temporary));
      } catch (apiError) {
        console.error('Hugging Face API error:', apiError);
        // Remove temporary thinking message if exists
        setMessages(prev => prev.filter(msg => !msg.temporary));
        // Fallback to predefined responses
        response = getBillboardResponse(userQuery);
      }
      
      const assistantMessage = {
        role: 'assistant',
        content: response
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Remove temporary thinking message if exists
      setMessages(prev => prev.filter(msg => !msg.temporary));
      
      const assistantMessage = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.'
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const getThemeColors = () => {
    switch(theme) {
      case 'night':
        return {
          primary: 'from-indigo-600 to-purple-700',
          secondary: 'bg-gray-900',
          text: 'text-white',
          input: 'bg-gray-800/80 border-gray-700',
          message: 'bg-gray-800/90',
          userMessage: 'bg-gradient-to-r from-indigo-600 to-purple-600',
          glass: 'backdrop-blur-xl bg-gray-900/70',
          glow: 'shadow-[0_0_30px_rgba(79,70,229,0.2)]'
        };
      case 'sunset':
        return {
          primary: 'from-orange-500 to-pink-600',
          secondary: 'bg-warmgray-900',
          text: 'text-white',
          input: 'bg-warmgray-800/80 border-warmgray-700',
          message: 'bg-warmgray-800/90',
          userMessage: 'bg-gradient-to-r from-orange-500 to-pink-500',
          glass: 'backdrop-blur-xl bg-warmgray-900/70',
          glow: 'shadow-[0_0_30px_rgba(249,115,22,0.2)]'
        };
      default:
        return {
          primary: 'from-blue-600 to-violet-600',
          secondary: 'bg-white',
          text: 'text-gray-800',
          input: 'bg-white/80 border-gray-200',
          message: 'bg-white/90',
          userMessage: 'bg-gradient-to-r from-blue-600 to-violet-600',
          glass: 'backdrop-blur-xl bg-white/80',
          glow: 'shadow-[0_0_30px_rgba(37,99,235,0.2)]'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <>
      {/* Floating Action Button with Particles */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg z-50 
          bg-gradient-to-r ${colors.primary} group overflow-hidden ${colors.glow}`}
      >
        <div className="relative">
          <motion.div
            animate={{ 
              rotate: isOpen ? 180 : 0,
              scale: isOpen ? 0.8 : 1
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {isOpen ? <FiX size={24} className="text-white" /> : <FiMessageSquare size={24} className="text-white" />}
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full"
          />
          {showParticles && !isOpen && (
            <>
              {[...Array(6)].map((_, i) => (
                <FloatingParticle key={i} delay={i * 0.2} />
              ))}
            </>
          )}
        </div>
      </motion.button>

      {/* Chat Window with Enhanced Animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isExpanded ? '80vw' : '380px',
              height: isExpanded ? '80vh' : '600px'
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`fixed ${isExpanded ? 'bottom-[10vh] right-[10vw]' : 'bottom-24 right-8'} 
              ${colors.glass} rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200/20 ${colors.glow}`}
          >
            {/* Enhanced Header */}
            <div className={`bg-gradient-to-r ${colors.primary} p-6 rounded-t-2xl flex justify-between items-center relative overflow-hidden`}>
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <RiRobot2Fill size={32} className="text-white" />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                  />
                </motion.div>
                <div>
                  <h3 className="font-bold text-xl text-white">BoardScout Assistant</h3>
                  <p className="text-white/80 text-sm">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setTheme(theme === 'default' ? 'night' : theme === 'night' ? 'sunset' : 'default')}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {theme === 'night' ? (
                    <FiMoon size={20} className="text-white" />
                  ) : (
                    <FiSun size={20} className="text-white" />
                  )}
                </button>
                <button onClick={handleExpand} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  {isExpanded ? (
                    <FiMinimize2 size={20} className="text-white" />
                  ) : (
                    <FiMaximize2 size={20} className="text-white" />
                  )}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <FiX size={20} className="text-white" />
                </button>
              </div>
              
              {/* Enhanced Decorative Elements */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"
              />
            </div>

            {/* Enhanced Messages Container */}
            <div className={`flex-1 overflow-y-auto p-6 space-y-6 ${colors.secondary} ${colors.text} relative`}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none" />
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", damping: 15 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-3`}
                >
                  {message.role !== 'user' && (
                    <motion.div 
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                    >
                      <RiRobot2Fill size={24} className="text-blue-600" />
                    </motion.div>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`max-w-[80%] p-4 rounded-2xl shadow-sm backdrop-blur-sm ${
                      message.role === 'user'
                        ? `${colors.userMessage} text-white`
                        : `${colors.message} ${colors.text}`
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </motion.div>
                  {message.role === 'user' && (
                    <motion.div 
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                    >
                      <RiUserSmileLine size={24} className={`${colors.text}`} />
                    </motion.div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start items-end space-x-3">
                  <div className="flex-shrink-0">
                    <RiRobot2Fill size={24} className="text-blue-600" />
                  </div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`${colors.message} p-4 rounded-2xl shadow-sm`}
                  >
                    <div className="flex space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            y: [-3, 0, -3],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 1, 
                            delay: i * 0.2,
                            repeat: Infinity
                          }}
                          className="w-2 h-2 bg-blue-600 rounded-full"
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input Form */}
            <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200/20 relative">
              <div className="flex space-x-4">
                <motion.div 
                  className="relative flex-1"
                  whileFocus={{ scale: 1.02 }}
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className={`w-full p-4 pr-12 ${colors.input} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 
                      transition-all ${colors.text} backdrop-blur-sm`}
                    disabled={isLoading}
                  />
                  <motion.div
                    initial={false}
                    animate={{ 
                      scale: input.length > 0 ? 1 : 0,
                      rotate: input.length > 0 ? 0 : -45
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className={`p-2 rounded-lg bg-gradient-to-r ${colors.primary} text-white 
                        disabled:opacity-50 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5`}
                    >
                      <FiSend size={20} />
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot; 