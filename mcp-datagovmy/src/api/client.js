/**
 * Base API Client for Malaysia Open Data API
 * 
 * Handles communication with the Malaysia Open Data API, including:
 * - Authentication
 * - Rate limiting
 * - Request/response handling
 */

const axios = require('axios');
const pLimit = require('p-limit');
const { buildQueryParams } = require('../utils/query-builder');

// Base URL for all API requests
const BASE_URL = 'https://api.data.gov.my';

// Rate limiting configuration
// Default: 5 requests per minute (300 requests per hour)
const DEFAULT_RATE_LIMIT = 5;
const DEFAULT_INTERVAL_MS = 12000; // 12 seconds between requests

/**
 * Creates a rate-limited API client for the Malaysia Open Data API
 * 
 * @param {Object} options - Client configuration options
 * @param {string} options.apiToken - Optional API token for authentication
 * @param {number} options.rateLimit - Maximum number of requests per minute
 * @param {number} options.intervalMs - Minimum interval between requests in milliseconds
 * @returns {Object} - API client instance
 */
function createClient(options = {}) {
  const {
    apiToken,
    rateLimit = DEFAULT_RATE_LIMIT,
    intervalMs = DEFAULT_INTERVAL_MS
  } = options;

  // Create rate limiter
  const limit = pLimit(1); // Only 1 concurrent request
  const queue = [];
  let lastRequestTime = 0;

  // Create axios instance with default configuration
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(apiToken && { 'Authorization': `Token ${apiToken}` })
    }
  });

  /**
   * Makes a rate-limited request to the API
   * 
   * @param {string} endpoint - API endpoint (without base URL)
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} - API response data
   */
  async function request(endpoint, params = {}) {
    return limit(async () => {
      // Enforce minimum interval between requests
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      
      if (timeSinceLastRequest < intervalMs) {
        await new Promise(resolve => setTimeout(resolve, intervalMs - timeSinceLastRequest));
      }
      
      try {
        // Build query parameters
        const queryParams = buildQueryParams(params);
        
        // Make request
        const response = await axiosInstance.get(endpoint, { params: queryParams });
        
        // Update last request time
        lastRequestTime = Date.now();
        
        return response.data;
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const { status, data } = error.response;
          
          if (status === 429) {
            // Too Many Requests - retry after a delay
            console.warn('Rate limit exceeded. Retrying after delay...');
            await new Promise(resolve => setTimeout(resolve, intervalMs * 2));
            return request(endpoint, params);
          }
          
          throw new Error(`API Error (${status}): ${JSON.stringify(data)}`);
        } else if (error.request) {
          // The request was made but no response was received
          throw new Error('No response received from API');
        } else {
          // Something happened in setting up the request
          throw new Error(`Request Error: ${error.message}`);
        }
      }
    });
  }

  return {
    request,
    
    /**
     * Gets the current API client configuration
     * 
     * @returns {Object} - Current configuration
     */
    getConfig() {
      return {
        baseURL: BASE_URL,
        hasToken: !!apiToken,
        rateLimit,
        intervalMs
      };
    }
  };
}

module.exports = {
  createClient
};
