import { useState, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { FiRefreshCw } from 'react-icons/fi';

/**
 * PowerBIDashboard Component
 * 
 * This component embeds a Power BI dashboard into the application
 * 
 * @param {Object} props
 * @param {string} props.reportId - The Power BI report ID to embed
 * @param {string} props.embedUrl - The embed URL for the report
 * @param {string} props.embedToken - The token for embedding the report
 * @param {string} props.title - Title to display above the dashboard
 * @param {string} props.description - Description text for the dashboard
 */
const PowerBIDashboard = ({ 
  reportId, 
  embedUrl, 
  embedToken, 
  title = "Dashboard", 
  description = "View key metrics and analytics"
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useIframe, setUseIframe] = useState(false);

  // Configuration for the embedded report
  const reportConfig = {
    type: 'report',
    id: reportId,
    embedUrl: embedUrl,
    tokenType: models.TokenType.Embed,
    accessToken: embedToken,
    settings: {
      navContentPaneEnabled: false,
      filterPaneEnabled: true,
      background: models.BackgroundType.Transparent,
    },
  };

  useEffect(() => {
    // Check if we have a valid embed URL but no token
    // This indicates we should use a direct iframe embed (with autoAuth=true in the URL)
    if (embedUrl && embedUrl.includes('autoAuth=true') && !embedToken) {
      setUseIframe(true);
    } else {
      setUseIframe(false);
    }

    // Simulate loading the report
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [embedUrl, embedToken]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // If there's no embed token or URL, show a placeholder
  const showPlaceholder = (!embedToken && !useIframe) || !embedUrl;

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <button 
          onClick={handleRefresh} 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Refresh dashboard"
        >
          <FiRefreshCw className={`text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="relative" style={{ height: '70vh' }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <p className="text-red-600 font-medium">Error loading dashboard</p>
              <p className="text-sm text-red-500 mt-1">{error}</p>
              <button 
                onClick={handleRefresh}
                className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md text-sm transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {showPlaceholder ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-8">
            <div className="w-full max-w-md text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Power BI Dashboard Preview</h3>
              <p className="text-gray-500 mb-4">
                No Power BI credentials provided. This is a placeholder for your dashboard.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-28 bg-white border border-gray-200 rounded-md shadow-sm p-3">
                    <div className="w-2/3 h-3 bg-gray-200 rounded-full mb-2"></div>
                    <div className="w-1/2 h-8 bg-gray-200 rounded-md mb-2"></div>
                    <div className="w-full h-3 bg-gray-200 rounded-full"></div>
                  </div>
                ))}
              </div>
              <div className="h-48 bg-white border border-gray-200 rounded-md shadow-sm p-4">
                <div className="w-1/3 h-3 bg-gray-200 rounded-full mb-3"></div>
                <div className="flex justify-between items-end h-32">
                  {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <div 
                      key={item} 
                      className="w-8 bg-indigo-200 rounded-t-md"
                      style={{ height: `${Math.random() * 100}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : useIframe ? (
          // Direct iframe embed for autoAuth URLs
          <iframe 
            title={title}
            width="100%" 
            height="100%" 
            src={embedUrl}
            frameBorder="0" 
            allowFullScreen={true}
            style={{ border: 'none' }}
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          // Normal PowerBI Embed component for token-based auth
          <PowerBIEmbed
            embedConfig={reportConfig}
            cssClassName="h-full w-full"
            getEmbeddedComponent={(embeddedReport) => {
              embeddedReport.on('error', (event) => {
                setError(event.detail.message);
              });
              
              embeddedReport.on('loaded', () => {
                setIsLoading(false);
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PowerBIDashboard; 