import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaMapMarkerAlt, 
  FaSearch, 
  FaFilter, 
  FaDollarSign, 
  FaRuler, 
  FaEye, 
  FaSort, 
  FaChevronDown,
  FaHeart,
  FaRegHeart
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FindBillboards = () => {
  const [billboards, setBillboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    size: "",
    availability: "all"
  });
  const [filteredBillboards, setFilteredBillboards] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [favorites, setFavorites] = useState([]);

  // Fetch billboard data from API
  useEffect(() => {
    const fetchBillboards = async () => {
      try {
        setLoading(true);
        console.log("Fetching billboards from API...");
        const response = await fetch('http://localhost:5000/api/billboards/billboards');
        
        console.log("API Response Status:", response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch billboards: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("API Response Data:", data);
        
        // If API returns an empty billboards array or error message
        if (data.message === "No billboards found") {
          console.log("No billboards found from API, using mock data");
          // Use mock data as fallback
          const mockData = [
            {
              id: 1,
              location: "Marine Drive, Mumbai",
              latitude: 18.9438,
              longitude: 72.8230,
              price: 125000,
              priceUnit: "week",
              size: "12 × 40 ft",
              views: "800K daily",
              imageUrl: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?q=80&w=2664&auto=format&fit=crop",
              available: true,
              description: "Premium digital billboard on the iconic Marine Drive. Exceptional visibility with high exposure to affluent residents and tourists along the Queen's Necklace."
            },
            {
              id: 2,
              location: "Linking Road, Bandra",
              latitude: 19.0633,
              longitude: 72.8324,
              price: 150000,
              priceUnit: "week",
              size: "15 × 45 ft",
              views: "650K daily",
              imageUrl: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=2664&auto=format&fit=crop",
              available: true,
              description: "Large format billboard in Mumbai's premier shopping district. High visibility to upscale shoppers and young professionals in one of the city's trendiest areas."
            },
            {
              id: 3,
              location: "FC Road, Pune",
              latitude: 18.5221,
              longitude: 73.8403,
              price: 80000,
              priceUnit: "week",
              size: "10 × 30 ft",
              views: "480K daily",
              imageUrl: "https://images.unsplash.com/photo-1567956619902-9371b1c9879f?q=80&w=2660&auto=format&fit=crop",
              available: true,
              description: "Strategically positioned billboard on Pune's popular Fergusson College Road. High exposure to college students, young professionals, and visitors to nearby restaurants and cafes."
            },
            {
              id: 4,
              location: "Nagpur-Mumbai Highway",
              latitude: 19.5013,
              longitude: 76.5428,
              price: 100000,
              priceUnit: "week",
              size: "16 × 48 ft",
              views: "350K daily",
              imageUrl: "https://images.unsplash.com/photo-1516546453174-5e1098a4b4af?q=80&w=2670&auto=format&fit=crop",
              available: false,
              description: "Eye-catching highway billboard positioned on the busy Mumbai-Nagpur route. Excellent visibility to intercity travelers and transport vehicles."
            },
            {
              id: 5,
              location: "MG Road, Nashik",
              latitude: 19.9975,
              longitude: 73.7898,
              price: 70000,
              priceUnit: "week",
              size: "12 × 36 ft",
              views: "320K daily",
              imageUrl: "https://images.unsplash.com/photo-1565036558162-e551c8a9a4a9?q=80&w=2536&auto=format&fit=crop",
              available: true,
              description: "Prime billboard location on Mahatma Gandhi Road in the heart of Nashik. High visibility to local shoppers and business professionals."
            },
            {
              id: 6,
              location: "Juhu Beach, Mumbai",
              latitude: 19.0883,
              longitude: 72.8260,
              price: 135000,
              priceUnit: "week",
              size: "14 × 42 ft",
              views: "550K daily",
              imageUrl: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=2665&auto=format&fit=crop",
              available: true,
              description: "Premium billboard near the popular Juhu Beach. Excellent exposure to beachgoers, tourists, and residents of this affluent Mumbai neighborhood."
            },
            {
              id: 7,
              location: "Shivaji Nagar, Pune",
              latitude: 18.5308,
              longitude: 73.8475,
              price: 75000,
              priceUnit: "week",
              size: "12 × 36 ft",
              views: "390K daily",
              imageUrl: "https://images.unsplash.com/photo-1624461636729-be94148dc6ce?q=80&w=2664&auto=format&fit=crop",
              available: true,
              description: "Strategic billboard placement in Pune's central business district. High visibility to professionals and commuters throughout the day."
            },
            {
              id: 8,
              location: "Aurangabad-Jalna Road",
              latitude: 19.8943,
              longitude: 75.4800,
              price: 65000,
              priceUnit: "week",
              size: "12 × 40 ft",
              views: "280K daily",
              imageUrl: "https://images.unsplash.com/photo-1588416499018-d8c621bb3d8a?q=80&w=2670&auto=format&fit=crop",
              available: true,
              description: "Prominent billboard on the busy Aurangabad-Jalna highway. Great visibility to travelers, tourists visiting nearby Ajanta and Ellora caves, and daily commuters."
            }
          ];
          
          setBillboards(mockData);
          setFilteredBillboards(mockData);
        } else {
          // API returned valid billboard data (even if empty array)
          const formattedData = data.map(billboard => {
            console.log("Processing billboard:", billboard);
            try {
              // Create a default billboard object
              const defaultBillboard = {
                id: "unknown",
                location: "Unknown Location",
                latitude: 0,
                longitude: 0,
                price: 50000,
                priceUnit: "week",
                size: "Standard Size",
                views: "200K daily",
                imageUrl: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?q=80&w=2664&auto=format&fit=crop",
                available: true,
                description: "Billboard in a prime location"
              };
              
              // If billboard or _id is undefined, return the default
              if (!billboard || !billboard._id) {
                console.error("Billboard object is invalid:", billboard);
                return defaultBillboard;
              }
              
              // Get the billboard's ID
              const id = billboard._id || defaultBillboard.id;
              
              // Get location information
              const location = billboard.location || defaultBillboard.location;
              const latitude = billboard.latitude || defaultBillboard.latitude;
              const longitude = billboard.longitude || defaultBillboard.longitude;
              
              // Get price information
              const price = billboard.price || defaultBillboard.price;
              const priceUnit = "week"; // Default to weekly pricing
              
              // Process size information
              let size = defaultBillboard.size;
              if (billboard.size && typeof billboard.size === 'object') {
                const height = billboard.size.height || 10;
                const width = billboard.size.width || 30;
                size = `${height} × ${width} ft`;
              }
              
              // Process views and images
              const views = billboard.views || defaultBillboard.views;
              let imageUrl = defaultBillboard.imageUrl;
              if (billboard.images && Array.isArray(billboard.images) && billboard.images.length > 0) {
                imageUrl = billboard.images[0];
              }
              
              // Process availability and description
              const available = billboard.available !== undefined ? billboard.available : defaultBillboard.available;
              const description = billboard.description || defaultBillboard.description;
              
              // Return the formatted billboard object
              return {
                id,
                location,
                latitude,
                longitude,
                price,
                priceUnit,
                size,
                views,
                imageUrl,
                available,
                description
              };
            } catch (err) {
              console.error("Error formatting billboard data:", err, billboard);
              // Return a default object for this billboard to prevent the app from crashing
              return {
                id: billboard && billboard._id ? billboard._id : "unknown-id",
                location: billboard && billboard.location ? billboard.location : "Unknown Location",
                latitude: 0,
                longitude: 0,
                price: 50000,
                priceUnit: "week",
                size: "10 × 30 ft",
                views: "200K daily",
                imageUrl: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?q=80&w=2664&auto=format&fit=crop",
                available: true,
                description: billboard && billboard.description ? billboard.description : "Billboard in a prime location"
              };
            }
          });
          
          console.log("Formatted Data:", formattedData);
          
          setBillboards(formattedData);
          setFilteredBillboards(formattedData);
        }
      } catch (error) {
        console.error("Error fetching billboards:", error);
        // Use mock data as fallback in case of error
        const mockData = [
          {
            id: 1,
            location: "Marine Drive, Mumbai",
            latitude: 18.9438,
            longitude: 72.8230,
            price: 125000,
            priceUnit: "week",
            size: "12 × 40 ft",
            views: "800K daily",
            imageUrl: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?q=80&w=2664&auto=format&fit=crop",
            available: true,
            description: "Premium digital billboard on the iconic Marine Drive. Exceptional visibility with high exposure to affluent residents and tourists along the Queen's Necklace."
          },
          {
            id: 2,
            location: "Linking Road, Bandra",
            latitude: 19.0633,
            longitude: 72.8324,
            price: 150000,
            priceUnit: "week",
            size: "15 × 45 ft",
            views: "650K daily",
            imageUrl: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=2664&auto=format&fit=crop",
            available: true,
            description: "Large format billboard in Mumbai's premier shopping district. High visibility to upscale shoppers and young professionals in one of the city's trendiest areas."
          },
          {
            id: 3,
            location: "FC Road, Pune",
            latitude: 18.5221,
            longitude: 73.8403,
            price: 80000,
            priceUnit: "week",
            size: "10 × 30 ft",
            views: "480K daily",
            imageUrl: "https://images.unsplash.com/photo-1567956619902-9371b1c9879f?q=80&w=2660&auto=format&fit=crop",
            available: true,
            description: "Strategically positioned billboard on Pune's popular Fergusson College Road. High exposure to college students, young professionals, and visitors to nearby restaurants and cafes."
          },
          {
            id: 4,
            location: "Nagpur-Mumbai Highway",
            latitude: 19.5013,
            longitude: 76.5428,
            price: 100000,
            priceUnit: "week",
            size: "16 × 48 ft",
            views: "350K daily",
            imageUrl: "https://images.unsplash.com/photo-1516546453174-5e1098a4b4af?q=80&w=2670&auto=format&fit=crop",
            available: false,
            description: "Eye-catching highway billboard positioned on the busy Mumbai-Nagpur route. Excellent visibility to intercity travelers and transport vehicles."
          },
          {
            id: 5,
            location: "MG Road, Nashik",
            latitude: 19.9975,
            longitude: 73.7898,
            price: 70000,
            priceUnit: "week",
            size: "12 × 36 ft",
            views: "320K daily",
            imageUrl: "https://images.unsplash.com/photo-1565036558162-e551c8a9a4a9?q=80&w=2536&auto=format&fit=crop",
            available: true,
            description: "Prime billboard location on Mahatma Gandhi Road in the heart of Nashik. High visibility to local shoppers and business professionals."
          },
          {
            id: 6,
            location: "Juhu Beach, Mumbai",
            latitude: 19.0883,
            longitude: 72.8260,
            price: 135000,
            priceUnit: "week",
            size: "14 × 42 ft",
            views: "550K daily",
            imageUrl: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=2665&auto=format&fit=crop",
            available: true,
            description: "Premium billboard near the popular Juhu Beach. Excellent exposure to beachgoers, tourists, and residents of this affluent Mumbai neighborhood."
          },
          {
            id: 7,
            location: "Shivaji Nagar, Pune",
            latitude: 18.5308,
            longitude: 73.8475,
            price: 75000,
            priceUnit: "week",
            size: "12 × 36 ft",
            views: "390K daily",
            imageUrl: "https://images.unsplash.com/photo-1624461636729-be94148dc6ce?q=80&w=2664&auto=format&fit=crop",
            available: true,
            description: "Strategic billboard placement in Pune's central business district. High visibility to professionals and commuters throughout the day."
          },
          {
            id: 8,
            location: "Aurangabad-Jalna Road",
            latitude: 19.8943,
            longitude: 75.4800,
            price: 65000,
            priceUnit: "week",
            size: "12 × 40 ft",
            views: "280K daily",
            imageUrl: "https://images.unsplash.com/photo-1588416499018-d8c621bb3d8a?q=80&w=2670&auto=format&fit=crop",
            available: true,
            description: "Prominent billboard on the busy Aurangabad-Jalna highway. Great visibility to travelers, tourists visiting nearby Ajanta and Ellora caves, and daily commuters."
          }
        ];
        
        setBillboards(mockData);
        setFilteredBillboards(mockData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBillboards();
  }, []);

  // Apply filters
  useEffect(() => {
    if (billboards.length === 0) return;
    
    let filtered = [...billboards];
    
    if (filters.location) {
      filtered = filtered.filter(billboard => 
        billboard.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(billboard => 
        billboard.price >= parseInt(filters.minPrice)
      );
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(billboard => 
        billboard.price <= parseInt(filters.maxPrice)
      );
    }
    
    if (filters.size) {
      filtered = filtered.filter(billboard => 
        billboard.size.includes(filters.size)
      );
    }
    
    if (filters.availability !== "all") {
      const isAvailable = filters.availability === "available";
      filtered = filtered.filter(billboard => billboard.available === isAvailable);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        filtered.sort((a, b) => {
          const aViews = parseInt(a.views.replace(/[^0-9]/g, ''));
          const bViews = parseInt(b.views.replace(/[^0-9]/g, ''));
          return bViews - aViews;
        });
        break;
      default:
        // "recommended" - no specific sort
        break;
    }
    
    setFilteredBillboards(filtered);
  }, [filters, billboards, sortBy]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      location: "",
      minPrice: "",
      maxPrice: "",
      size: "",
      availability: "all"
    });
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Search Section */}
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
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Find Your Perfect Billboard Location
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-lg"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="Search by city, state, or zip code"
                    className="pl-10 py-3 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 px-4 py-3 rounded-md"
              >
                <FaFilter className="h-4 w-4" />
                <span>Filters</span>
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-3 rounded-md flex items-center justify-center"
              >
                <FaSearch className="h-4 w-4 mr-2" />
                <span>Search</span>
              </button>
            </div>
            
            {/* Expanded Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range (per week)</label>
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        placeholder="Min"
                        className="pl-7 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                      />
                    </div>
                    <span className="text-gray-500">-</span>
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        placeholder="Max"
                        className="pl-7 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                  <select
                    name="size"
                    value={filters.size}
                    onChange={handleFilterChange}
                    className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                  >
                    <option value="">Any Size</option>
                    <option value="12 ×">Small (12ft width)</option>
                    <option value="14 ×">Medium (14ft width)</option>
                    <option value="20 ×">Large (20ft+ width)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  <select
                    name="availability"
                    value={filters.availability}
                    onChange={handleFilterChange}
                    className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Billboards</option>
                    <option value="available">Available Now</option>
                    <option value="unavailable">Coming Soon</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="w-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 py-2 rounded-md"
                  >
                    Reset Filters
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
      
      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {loading ? (
                  <span>Searching billboards...</span>
                ) : (
                  <span>{filteredBillboards.length} billboards found</span>
                )}
              </h2>
              <p className="mt-1 text-gray-600">
                {filters.location ? `Near "${filters.location}"` : "Across all locations"}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FaChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          {loading ? (
            // Loading state
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredBillboards.length === 0 ? (
            // No results state
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <FaSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No billboards found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search filters to find more results.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            // Results grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBillboards.map((billboard) => (
                <motion.div
                  key={billboard.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={billboard.imageUrl} 
                      alt={billboard.location} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => toggleFavorite(billboard.id)}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      {favorites.includes(billboard.id) ? (
                        <FaHeart className="h-5 w-5 text-red-500" />
                      ) : (
                        <FaRegHeart className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {!billboard.available && (
                      <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        Coming Soon
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{billboard.location}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{billboard.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <FaDollarSign className="mr-2 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">₹{billboard.price.toLocaleString()}/{billboard.priceUnit}</span>
                      </div>
                      <div className="flex items-center">
                        <FaRuler className="mr-2 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{billboard.size}</span>
                      </div>
                      <div className="flex items-center col-span-2">
                        <FaEye className="mr-2 text-purple-600 flex-shrink-0" />
                        <span className="text-gray-700">{billboard.views}</span>
                      </div>
                    </div>
                    <Link
                      to={`/billboard-details/${billboard.id}`}
                      className="block w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white text-center py-2 rounded-md"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FindBillboards; 