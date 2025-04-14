import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserContext } from "../context/userContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginRequiredModal from "../components/LoginRequiredModal";
import { FaSearch, FaMapMarkerAlt, FaDollarSign, FaArrowRight, FaBullhorn, FaChartLine, FaUsers } from "react-icons/fa";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  const handleAddBillboardClick = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      navigate("/add-billboard");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521074597321-1a1249a2222c?q=80&w=2574&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-56 flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold text-white text-center max-w-4xl"
          >
            Find the Perfect Billboard for Your Brand in Maharashtra
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-xl md:text-2xl text-gray-200 text-center max-w-3xl"
          >
            Connect with prime billboard locations across Mumbai, Pune, Nashik, and beyond to maximize your advertising impact
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
          >
            <Link
              to="/find-billboards"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <FaSearch className="mr-2" />
              Find Billboards
            </Link>
            <button
              onClick={handleAddBillboardClick}
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-md shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <FaMapMarkerAlt className="mr-2" />
              List Your Billboard
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How BoardScout Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Simple and efficient process to connect advertisers with billboard owners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <FaSearch className="w-8 h-8 text-blue-600" />,
                title: "Find Locations",
                description: "Browse through our extensive database of billboards across the country. Filter by location, size, and pricing."
              },
              {
                icon: <FaMapMarkerAlt className="w-8 h-8 text-blue-600" />,
                title: "Book Your Billboard",
                description: "Select the perfect billboard for your campaign and secure it with our streamlined booking process."
              },
              {
                icon: <FaBullhorn className="w-8 h-8 text-blue-600" />,
                title: "Launch Your Campaign",
                description: "Upload your design, schedule your display dates, and watch your advertising campaign come to life."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Billboards Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Billboards</h2>
              <p className="mt-2 text-lg text-gray-600">Premium locations for high-impact advertising</p>
            </div>
            <Link to="/find-billboards" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View all billboards <FaArrowRight className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?q=80&w=2664&auto=format&fit=crop",
                location: "Marine Drive, Mumbai",
                price: "₹1,25,000/week",
                size: "12 × 40 ft",
                views: "800K daily impressions"
              },
              {
                image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=2664&auto=format&fit=crop",
                location: "Linking Road, Bandra",
                price: "₹1,50,000/week",
                size: "15 × 45 ft",
                views: "650K daily impressions"
              },
              {
                image: "https://images.unsplash.com/photo-1567956619902-9371b1c9879f?q=80&w=2660&auto=format&fit=crop",
                location: "FC Road, Pune",
                price: "₹80,000/week",
                size: "10 × 30 ft",
                views: "480K daily impressions"
              }
            ].map((billboard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={billboard.image} 
                    alt={billboard.location} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{billboard.location}</h3>
                  <div className="flex justify-between text-gray-600 mb-4">
                    <span className="flex items-center"><FaDollarSign className="mr-1 text-green-600" /> {billboard.price}</span>
                    <span>{billboard.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{billboard.views}</span>
                    <Link
                      to={`/billboard-details/${index}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose BoardScout</h2>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of brands and billboard owners across Maharashtra on our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaMapMarkerAlt className="w-8 h-8" />, value: "5,000+", label: "Billboards" },
              { icon: <FaUsers className="w-8 h-8" />, value: "2,500+", label: "Happy Advertisers" },
              { icon: <FaChartLine className="w-8 h-8" />, value: "75M+", label: "Daily Impressions" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-blue-800 p-8 rounded-xl text-center"
              >
                <div className="mx-auto mb-4 bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Clients Say</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from advertisers and billboard owners using BoardScout in Maharashtra
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "BoardScout helped us find the perfect billboard location for our product launch in Mumbai. The ROI was incredible!",
                author: "Padmaraj Patil",
                company: "Marketing Director, TechInnovate India",
                image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2576&auto=format&fit=crop"
              },
              {
                quote: "As a billboard owner in Pune, I've seen a 40% increase in bookings since listing my locations on BoardScout.",
                author: "Siddesh Mhasal",
                company: "Owner, Maharashtra Outdoor Media",
                image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2670&auto=format&fit=crop"
              },
              {
                quote: "The platform made managing our advertising campaigns across Maharashtra cities so much easier and cost-effective.",
                author: "Ketan Nibandhe",
                company: "Campaign Manager, NextGen Retail",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2674&auto=format&fit=crop"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <div className="flex items-start mb-6">
                  <div className="text-4xl text-blue-600">"</div>
                </div>
                <p className="text-gray-600 mb-6 italic">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Boost Your Brand Visibility?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join thousands of businesses that use BoardScout to find the perfect billboard locations for their campaigns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/find-billboards"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 transition-colors"
            >
              Find Billboards
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-gray-900 transition-colors"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </section>
      
      {/* Login Required Modal */}
      {showLoginModal && (
        <LoginRequiredModal 
          onClose={() => setShowLoginModal(false)}
          onLogin={() => navigate("/login")}
          onSignup={() => navigate("/signup")}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Home;
