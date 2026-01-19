import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ImageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setImage(null);
    
    fetch(`https://picsum.photos/id/${id}/info`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch image: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setImage(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching image:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading image details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Image</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button 
              className="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              onClick={handleGoBack}
            >
              ← Go Back
            </button>
            <button 
              className="px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              onClick={() => window.location.reload()}
            >
              🔄 Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          className="mb-6 px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-sm"
          onClick={handleGoBack}
        >
          ← Back to Gallery
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {image.author}
            </h1>
            <p className="text-gray-500 mb-6">Photographer</p>
            
            <div className="mb-8">
              <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
                <img 
                  src={`${image.download_url}?w=1200&h=800`}
                  alt={`Photograph by ${image.author}`}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://picsum.photos/1200/800?random=${image.id}`;
                  }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Image ID</h3>
                <p className="text-2xl font-bold text-gray-800">{image.id}</p>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Dimensions</h3>
                <p className="text-2xl font-bold text-gray-800">{image.width} × {image.height}</p>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Original</h3>
                <a 
                  href={image.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700 font-medium transition-colors"
                >
                  <span>View Source</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Image Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Download URL</span>
                  <a 
                    href={image.download_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 text-sm truncate max-w-xs"
                  >
                    {image.download_url}
                  </a>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Aspect Ratio</span>
                  <span className="font-medium">{(image.width / image.height).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageDetails;