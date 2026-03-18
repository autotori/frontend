import { useState } from 'react';
import { compareWithAI } from '../api/compare';
import './AICompare.css';

export default function AICompare() {
  const [urls, setUrls] = useState(['', '']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const addUrlField = () => {
    if (urls.length < 5) {
      setUrls([...urls, '']);
    }
  };

  const removeUrlField = (index) => {
    if (urls.length > 2) {
      setUrls(urls.filter((_, i) => i !== index));
    }
  };

  const updateUrl = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleCompare = async () => {
    const validUrls = urls.filter(url => url.trim() !== '');

    if (validUrls.length < 2) {
      setError('Please enter at least 2 car URLs');
      return;
    }

    // Check for duplicate URLs
    const uniqueUrls = new Set(validUrls);
    if (uniqueUrls.size !== validUrls.length) {
      setError('Duplicate URLs detected. Please provide unique car listings.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await compareWithAI(validUrls);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetComparison = () => {
    setResult(null);
    setError(null);
    setUrls(['', '']);
  };

  const normalizeUrl = (url) => (url ? url.trim().replace(/\/+$/, '').toLowerCase() : '');
  const normalizeText = (text) => (text ? text.trim().toLowerCase() : '');

  const recommendationUrl = normalizeUrl(
    result?.data?.recommendation?.winnerUrl || result?.data?.recommendation?.listingUrl
  );
  const recommendationTitle = normalizeText(result?.data?.recommendation?.title);

  // Sort comparisons: winner first, then by score
  const sortedComparisons = result?.data?.comparisons ? [...result.data.comparisons].sort((a, b) => {
    const aKeyUrl = normalizeUrl(a.listingUrl);
    const bKeyUrl = normalizeUrl(b.listingUrl);
    const aKeyTitle = normalizeText(a.title);
    const bKeyTitle = normalizeText(b.title);

    const aIsWinner = recommendationUrl
      ? aKeyUrl === recommendationUrl
      : recommendationTitle && aKeyTitle === recommendationTitle;
    const bIsWinner = recommendationUrl
      ? bKeyUrl === recommendationUrl
      : recommendationTitle && bKeyTitle === recommendationTitle;

    if (aIsWinner && !bIsWinner) return -1;
    if (!aIsWinner && bIsWinner) return 1;
    return b.score - a.score;
  }) : [];

  return (
    <div className="ai-compare-container">
      <div className="compare-header">
        <div className="header-content">
          <div>
            <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <div className="header-text">
            <h2>AI-Powered Car Comparison</h2>
            <p>
              Get intelligent insights and recommendations powered by advanced AI analysis.
              Compare cars from Kamux, Saka, and Autokeskus with detailed pros, cons, and expert suggestions.
            </p>
          </div>
        </div>
      </div>

      <div className="input-section">
        <div>
          <label className="input-label">
            Enter Car Listing URLs
          </label>
          {urls.map((url, index) => (
            <div key={index} className="url-input-row">
              <input
                type="url"
                value={url}
                onChange={(e) => updateUrl(index, e.target.value)}
                placeholder={`Auton ${index + 1} URL (esim. https://www.kamux.fi/...)`}
                className="url-input"
              />
              {urls.length > 2 && (
                <button
                  onClick={() => removeUrlField(index)}
                  className="remove-btn"
                  title="Remove this field"
                >
                  <svg className="remove-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="action-buttons">
          {urls.length < 5 && (
            <button
              onClick={addUrlField}
              className="add-car-btn"
            >
              <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Lisää auto {urls.length < 5 && `(${5 - urls.length} jäljellä)`}
            </button>
          )}
          <button
            onClick={handleCompare}
            disabled={loading || urls.filter(u => u.trim()).length < 2}
            className="compare-btn"
          >
            <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {loading ? 'Analysoidaan...' : 'Vertaa tekoälyllä'}
          </button>
          {result && (
            <button
              onClick={resetComparison}
              className="reset-btn"
            >
              <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Aloita alusta
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="error-container">
          <p className="error-text">Error: {error}</p>
        </div>
      )}

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner-wrapper">
            <div className="loading-spinner"></div>
            <div className="loading-spinner-icon">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 7H7v6h6V7z" />
              </svg>
            </div>
          </div>
          <p className="loading-text">Analyzing with AI...</p>
          <p className="loading-subtext">This may take a few moments</p>
        </div>
      )}

      {result && result.ok && (
        <div className="results-container">
          <div className="summary-box">
            <div className="summary-header">
              <div className="summary-icon-wrapper">
                <svg className="summary-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="summary-content">
                <h3>Analysis Summary</h3>
                <p>{result.data.summary}</p>
              </div>
            </div>
          </div>

          <div className="comparison-grid">
            {sortedComparisons.map((comp, index) => {
              const compUrl = normalizeUrl(comp.listingUrl);
              const compTitle = normalizeText(comp.title);
              const isWinner = recommendationUrl
                ? compUrl === recommendationUrl
                : recommendationTitle && compTitle === recommendationTitle;
              return (
                <div
                  key={index}
                  className={`car-card ${isWinner ? 'winner' : ''}`}
                >
                  <div className="car-title-row">
                    <h3>{comp.title}</h3>
                    {isWinner && (
                      <span className="recommended-label">Recommended</span>
                    )}
                  </div>

                  {comp.car && (
                    <div className="car-details">
                      <div className="details-grid">
                        <div className="detail-item">
                          <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <span className="detail-label">Price</span>
                            <div className="detail-value">{comp.car.priceEur ? `€${comp.car.priceEur.toLocaleString()}` : 'N/A'}</div>
                          </div>
                        </div>
                        <div className="detail-item">
                          <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <span className="detail-label">Year</span>
                            <div className="detail-value">{comp.car.year || 'N/A'}</div>
                          </div>
                        </div>
                        <div className="detail-item">
                          <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <div>
                            <span className="detail-label">Mileage</span>
                            <div className="detail-value">{comp.car.mileageKm ? `${comp.car.mileageKm.toLocaleString()} km` : 'N/A'}</div>
                          </div>
                        </div>
                        <div className="detail-item">
                          <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                          </svg>
                          <div>
                            <span className="detail-label">Fuel</span>
                            <div className="detail-value">{comp.car.fuel || 'N/A'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="score-section">
                    <div className="score-header">
                      <span className="score-label">AI Score</span>
                      <span className="score-value">{comp.score.toFixed(1)}/10</span>
                    </div>
                    <div className="score-bar-container">
                      <div
                        className="score-bar"
                        style={{ width: `${(comp.score / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pros-section">
                    <div className="section-header">
                      <div className="icon-badge green">
                        <svg className="badge-icon green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4>Strengths</h4>
                    </div>
                    <ul className="list-items">
                      {comp.pros.map((pro, i) => (
                        <li key={i} className="list-item">
                          <span className="list-bullet green">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="cons-section">
                    <div className="section-header">
                      <div className="icon-badge red">
                        <svg className="badge-icon red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <h4>Considerations</h4>
                    </div>
                    <ul className="list-items">
                      {comp.cons.map((con, i) => (
                        <li key={i} className="list-item">
                          <span className="list-bullet red">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={comp.listingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-listing-btn"
                  >
                    <span>View Full Listing</span>
                    <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              );
            })}
          </div>

          {result.data.recommendation && (
            <div className="recommendation-box">
              <div className="recommendation-content">
                <div className="recommendation-icon-wrapper">
                  <svg className="recommendation-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="recommendation-text">
                  <h3>Lopullinen suositus</h3>
                  <p>{result.data.recommendation.reasoning}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
