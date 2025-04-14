import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import PowerBIDashboard from '../components/PowerBIDashboard';
import { FiBarChart2, FiMapPin, FiDollarSign, FiUserCheck, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import LoginRequiredModal from '../components/LoginRequiredModal';
import { Link } from 'react-router-dom';

const Analytics = () => {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    // Pre-populated with the published Power BI dashboard URL for direct embedding
    reportId: "08ea6154-a25e-4988-b032-0f498821241d",
    embedUrl: "https://app.powerbi.com/reportEmbed?reportId=08ea6154-a25e-4988-b032-0f498821241d&autoAuth=true&ctid=9ed1b325-e2c6-4a3f-a53f-076988981392",
    embedToken: "" // Using autoAuth=true in the URL so token isn't required
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Default dashboard configurations
  const dashboards = {
    overview: {
      title: "Billboard Performance Overview",
      description: "Key metrics and performance indicators",
      id: "dashboard-1",
      // Add the direct embed URL for the overview dashboard
      directEmbedUrl: "https://app.powerbi.com/reportEmbed?reportId=737c2bd5-720f-4297-83f6-c1664eab0bd3&autoAuth=true&ctid=9ed1b325-e2c6-4a3f-a53f-076988981392"
    },
    geographical: {
      title: "Geographical Distribution",
      description: "Map view of billboard locations and performance",
      id: "dashboard-2",
      directEmbedUrl: "https://app.powerbi.com/links/2UoltIdLty?ctid=9ed1b325-e2c6-4a3f-a53f-076988981392&pbi_source=linkShare"
    },
    revenue: {
      title: "Revenue Analytics",
      description: "Financial performance and projections",
      id: "dashboard-3",
      directEmbedUrl: "https://app.powerbi.com/links/2UoltIdLty?ctid=9ed1b325-e2c6-4a3f-a53f-076988981392&pbi_source=linkShare"
    },
    engagement: {
      title: "User Engagement",
      description: "View patterns and user interaction metrics",
      id: "dashboard-4"
    }
  };

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      setShowLoginModal(true);
      return;
    }
    
    // If it's the overview tab or geographical tab, use the direct embed URL
    if (activeTab === 'overview') {
      setDashboardData({
        reportId: "08ea6154-a25e-4988-b032-0f498821241d",
        embedUrl: dashboards.overview.directEmbedUrl,
        embedToken: "" // Not needed with autoAuth=true
      });
      setIsLoading(false);
    } else if (activeTab === 'geographical') {
      setDashboardData({
        reportId: "08ea6154-a25e-4988-b032-0f498821241d",
        embedUrl: dashboards.geographical.directEmbedUrl,
        embedToken: "" // Not needed with autoAuth=true
      });
      setIsLoading(false);
    } else if (activeTab === 'revenue') {
      setDashboardData({
        reportId: "2UoltIdLty",
        embedUrl: dashboards.revenue.directEmbedUrl,
        embedToken: "" // Not needed with autoAuth=true
      });
      setIsLoading(false);
    } else {
      // For other tabs, fetch from backend (placeholder implementation)
      fetchDashboardToken();
    }
  }, [activeTab, user]);

  // Fetch the Power BI embed token from the backend
  const fetchDashboardToken = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const dashboardId = dashboards[activeTab].id;
      // For demo purposes, we'll just set loading to false after a short delay
      // In a real implementation, this would call the backend API
      setTimeout(() => {
        setIsLoading(false);
        // Set placeholder data to show the empty state UI
        setDashboardData({
          reportId: "",
          embedUrl: "",
          embedToken: ""
        });
      }, 1000);
      
      // Original API call code (commented out for now)
      /*
      const response = await axios.post('http://localhost:5000/api/powerbi/embed-token', 
        { dashboardId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.data.success) {
        setDashboardData({
          reportId: response.data.reportId,
          embedUrl: response.data.embedUrl,
          embedToken: response.data.embedToken
        });
      } else {
        setError("Failed to fetch dashboard data");
      }
      */
    } catch (err) {
      console.error("Error fetching dashboard token:", err);
      setError("Failed to connect to the server");
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBarChart2 },
    { id: 'geographical', label: 'Geographic', icon: FiMapPin },
    { id: 'revenue', label: 'Revenue', icon: FiDollarSign },
    { id: 'engagement', label: 'Engagement', icon: FiUserCheck }
  ];

  if (showLoginModal) {
    return <LoginRequiredModal feature="analytics dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-2 text-gray-600">
            View comprehensive insights and metrics about your billboard inventory and campaign performance.
          </p>
        </div>

        {/* Dashboard Tabs */}
        <div className="mb-6 bg-white rounded-lg shadow p-1 flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 
                ${activeTab === tab.id 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
            <FiAlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium">Error loading dashboard</h3>
              <p className="text-sm text-red-600">{error}</p>
              <button 
                onClick={fetchDashboardToken} 
                className="mt-2 px-3 py-1 bg-red-100 rounded-md text-sm hover:bg-red-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="mb-8">
          <PowerBIDashboard 
            reportId={dashboardData.reportId}
            title={dashboards[activeTab].title}
            description={dashboards[activeTab].description}
            embedUrl={dashboardData.embedUrl}
            embedToken={dashboardData.embedToken}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">About Analytics Dashboards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">What data is shown here?</h3>
              <p className="text-gray-600 mb-4">
                The analytics dashboard visualizes data from your billboard inventory, bookings, and user engagement. 
                You can see performance metrics, geographical distribution, revenue analysis, and user interaction patterns.
              </p>
              <h3 className="font-medium text-gray-800 mb-2">How is the data collected?</h3>
              <p className="text-gray-600">
                Data is collected from user interactions with your billboard listings, booking information, 
                revenue transactions, and location data. All information is anonymized and aggregated to protect privacy.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">How to use these dashboards</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li><strong>Overview:</strong> Get a high-level summary of key performance indicators</li>
                <li><strong>Geographic:</strong> Visualize billboard locations and regional performance</li>
                <li><strong>Revenue:</strong> Analyze financial data, trends, and projections</li>
                <li><strong>Engagement:</strong> Understand user behavior and interaction patterns</li>
              </ul>
              <div className="mt-4 p-4 bg-indigo-50 rounded-md">
                <p className="text-sm text-indigo-700">
                  <strong>Note:</strong> You can interact with most charts by clicking, filtering, or hovering for more details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 