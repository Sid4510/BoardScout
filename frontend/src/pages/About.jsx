import React from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaMapMarkedAlt, FaHandshake, FaShieldAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/4 transform text-blue-400 opacity-20" width="800" height="800" fill="none" viewBox="0 0 800 800">
            <circle cx="400" cy="400" r="400" />
          </svg>
          <svg className="absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/4 transform text-blue-400 opacity-20" width="800" height="800" fill="none" viewBox="0 0 800 800">
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
            About BoardScout
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Revolutionizing the way businesses connect with outdoor advertising opportunities
          </motion.p>
        </div>
      </section>

      {/* Team*/}
 <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Team</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              BoardScout On Fire in Maharashtra ('_')
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "The platform made managing our advertising campaigns across Maharashtra cities so much easier and cost-effective.",
                author: "Ketan Nibandhe",
                company: "Campaign Manager, BoardScout",
                image: "data:image/jpeg;base64,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"
              },
               {
                quote: "BoardScout helped us find the perfect billboard location for our product launch in Mumbai. The ROI was incredible!",
                author: "Sarthak Nage",
                company: "Analyst, BoarddScout",
                image: "https://media.licdn.com/dms/image/v2/D4D03AQE9ajsiTFOjnQ/profile-displayphoto-shrink_200_200/B4DZUeK5gEHwAc-/0/1739967928918?e=2147483647&v=beta&t=piK83qJTxTZuk6n0G_k12VMnhbW4_nKNK_sjiz4Mwf8"
              },
              {
                quote: "BoardScout helped us find the perfect billboard location for our product launch in Mumbai. The ROI was incredible!",
                author: "M.V.Soodarshana",
                company: "Web Developer, BoardScout",
                image: "https://media.licdn.com/dms/image/v2/D4D03AQF0RGjDKcQTXA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1693879771609?e=1749686400&v=beta&t=QKmkNuhatCDQCkdGuecvvmD8B6wYQYaqG0orUHFu3Qw"
              },
              {
                quote: "BoardScout helped us find the perfect billboard location for our product launch in Mumbai. The ROI was incredible!",
                author: "Padmaraj Patil",
                company: "Marketing Director, BoardScout",
                image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2576&auto=format&fit=crop"
              },
              {
                quote: "As a billboard owner in Pune, I've seen a 40% increase in bookings since listing my locations on BoardScout.",
                author: "Siddesh Mhasal",
                company: "Team Lead, BoardScout Maharashtra ",
                image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2670&auto=format&fit=crop"
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

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To empower businesses and advertisers with a seamless platform for discovering, analyzing, and booking premium billboard spaces. We're committed to transforming the outdoor advertising industry through technology, transparency, and data-driven insights.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become the global leader in digital billboard marketplace solutions, connecting advertisers with the perfect outdoor advertising spaces while providing comprehensive analytics and ROI tracking tools.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose BoardScout?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-blue-600 mb-4">
                <FaChartLine className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Data-Driven Insights</h3>
              <p className="text-gray-600">
                Access comprehensive analytics and performance metrics to make informed advertising decisions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-blue-600 mb-4">
                <FaMapMarkedAlt className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Strategic Locations</h3>
              <p className="text-gray-600">
                Discover prime billboard locations with detailed demographic and traffic data.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-blue-600 mb-4">
                <FaHandshake className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted Partnerships</h3>
              <p className="text-gray-600">
                Work with verified billboard owners and established advertising networks.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-blue-600 mb-4">
                <FaShieldAlt className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Transactions</h3>
              <p className="text-gray-600">
                Enjoy peace of mind with our secure payment system and contract management.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

 

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We constantly push boundaries to develop cutting-edge solutions for the outdoor advertising industry.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparency</h3>
              <p className="text-gray-600">
                We believe in open communication and clear, honest business practices.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Success</h3>
              <p className="text-gray-600">
                We're committed to helping our clients achieve their advertising goals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About; 