import React, { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function CountySelector() {
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState('');
  const [countyData, setCountyData] = useState(null);
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  // Load counties on component mount
  useEffect(() => {
    const loadCounties = async () => {
      try {
        const response = await fetch('/data/tx_counties.json');
        if (!response.ok) {
          throw new Error(`Failed to load counties: ${response.status}`);
        }
        const data = await response.json();
        setCounties(data);
      } catch (err) {
        console.error('Error loading counties:', err);
        setError('Failed to load county list. Please refresh the page.');
      }
    };

    loadCounties();
  }, []);

  // Debounced function to load county content
  const loadCountyContent = useCallback(async (countySlug) => {
    if (!countySlug) {
      setCountyData(null);
      setMarkdownContent('');
      setIsUsingFallback(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let county = null;
      let markdownUrl = null;
      let usingFallback = false;

      // Handle Texas Standard Requirements option
      if (countySlug === 'texas-standard') {
        county = {
          county: 'Texas Standard Requirements',
          slug: 'texas-standard',
          md: null,
          assets: []
        };
        markdownUrl = '/data/texas_course_documents/texas-standard-dsc.md';
        usingFallback = false; // This is the standard, not a fallback
      } else {
        // Find county data
        county = counties.find(c => c.slug === countySlug);
        if (!county) {
          throw new Error('County not found');
        }

        // Try to load county-specific markdown first
        if (county.md) {
          markdownUrl = `/data/texas_course_documents/${county.md}`;
        } else {
          // Use fallback
          markdownUrl = '/data/texas_course_documents/texas-standard-dsc.md';
          usingFallback = true;
        }
      }

      setCountyData(county);

      const response = await fetch(markdownUrl);
      if (!response.ok) {
        throw new Error(`Failed to load content: ${response.status}`);
      }

      const content = await response.text();
      setMarkdownContent(content);
      setIsUsingFallback(usingFallback);

    } catch (err) {
      console.error('Error loading county content:', err);
      setError(`Failed to load content for ${countySlug}. Please try again.`);
      setCountyData(null);
      setMarkdownContent('');
      setIsUsingFallback(false);
    } finally {
      setIsLoading(false);
    }
  }, [counties]);

  // Handle county selection with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadCountyContent(selectedCounty);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [selectedCounty, loadCountyContent]);

  const handleCountyChange = (event) => {
    setSelectedCounty(event.target.value);
  };

  const getFileIcon = (filename) => {
    const ext = filename.toLowerCase().split('.').pop();
    switch (ext) {
      case 'pdf':
        return '📄';
      case 'docx':
      case 'doc':
        return '📝';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'webp':
        return '🖼️';
      default:
        return '📎';
    }
  };

  const getFileLabel = (filename) => {
    const ext = filename.toLowerCase().split('.').pop();
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    
    switch (ext) {
      case 'pdf':
        return `${nameWithoutExt} (PDF)`;
      case 'docx':
        return `${nameWithoutExt} (DOCX)`;
      case 'doc':
        return `${nameWithoutExt} (DOC)`;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'webp':
        return `${nameWithoutExt} (${ext.toUpperCase()})`;
      default:
        return filename;
    }
  };

  return (
    <div className="space-y-6">
      {/* County Selector - Outside the white card */}
      <div>
        <select
          id="county"
          value={selectedCounty}
          onChange={handleCountyChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
          aria-label="Select your Texas county"
        >
          <option value="">Select your county</option>
          <option value="texas-standard">Texas Standard Requirements</option>
          {counties.map((county) => (
            <option key={county.slug} value={county.slug}>
              {county.county}
            </option>
          ))}
        </select>
      </div>

      {/* White Card - Only shown when content is selected */}
      {selectedCounty && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="space-y-4">
            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 text-gray-600">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading county content...</span>
                </div>
              </div>
            )}

        {/* Fallback Notice */}
        {isUsingFallback && countyData && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-amber-800">
                County page coming soon—showing standard Texas instructions.
              </p>
            </div>
          </div>
        )}

            {/* Markdown Content */}
            {markdownContent && !isLoading && (
              <div className="prose prose-neutral max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-900 mb-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-semibold text-gray-900 mb-3">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-medium text-gray-900 mb-2">{children}</h3>,
                    p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="text-gray-700">{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                    em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
                    code: ({ children }) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">{children}</code>,
                    blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-200 pl-4 italic text-gray-600 mb-4">{children}</blockquote>,
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>
              </div>
            )}

            {/* Download Links */}
            {countyData && countyData.assets && countyData.assets.length > 0 && !isLoading && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Download Forms & Documents</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {countyData.assets.map((asset, index) => (
                    <a
                      key={index}
                      href={`/data/texas_course_documents/${countyData.county}/${asset}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                    >
                      <span className="text-2xl">{getFileIcon(asset)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {getFileLabel(asset)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Click to download
                        </p>
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
