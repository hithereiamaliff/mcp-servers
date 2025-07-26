/**
 * Weather API Client
 * 
 * Handles communication with the Weather API endpoints
 */

const { createClient } = require('./client');

/**
 * Creates a Weather API client
 * 
 * @param {Object} options - Client configuration options
 * @returns {Object} - Weather API client
 */
function createWeatherClient(options = {}) {
  const client = createClient(options);
  
  // Weather API endpoints
  const FORECAST_ENDPOINT = '/weather/forecast';
  const WARNING_ENDPOINT = '/weather/warning';
  const EARTHQUAKE_WARNING_ENDPOINT = '/weather/warning/earthquake';
  
  return {
    /**
     * Gets 7-day general forecast data
     * 
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} - Forecast data
     */
    async getForecast(params = {}) {
      return client.request(FORECAST_ENDPOINT, params);
    },
    
    /**
     * Gets weather warning data
     * 
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} - Warning data
     */
    async getWarnings(params = {}) {
      return client.request(WARNING_ENDPOINT, params);
    },
    
    /**
     * Gets earthquake warning data
     * 
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} - Earthquake warning data
     */
    async getEarthquakeWarnings(params = {}) {
      return client.request(EARTHQUAKE_WARNING_ENDPOINT, params);
    }
  };
}

module.exports = {
  createWeatherClient
};
