/**
 * Weather MCP Tools
 * 
 * Tools for accessing weather forecasts and warnings from the Malaysia Open Data API
 */

const { createWeatherClient } = require('../api/weather');

// Create client instance with default configuration
const weatherClient = createWeatherClient();

/**
 * Gets 7-day general weather forecast data
 * 
 * @param {Object} params - Parameters
 * @param {string} params.location - Optional location filter
 * @param {string} params.locationCategory - Optional location category filter (St, Rc, Ds, Tn, Dv)
 * @param {string} params.date - Optional date filter (YYYY-MM-DD)
 * @param {number} params.limit - Optional limit parameter
 * @returns {Promise<Object>} - Forecast data
 */
async function getForecast(params = {}) {
  try {
    const queryParams = {};
    
    // Handle location filter
    if (params.location) {
      queryParams.contains = `${params.location}@location__location_name`;
    }
    
    // Handle location category filter
    if (params.locationCategory) {
      queryParams.contains = `${params.locationCategory}@location__location_id`;
    }
    
    // Handle date filter
    if (params.date) {
      queryParams.filter = `${params.date}@date`;
    }
    
    // Handle limit
    if (params.limit) {
      queryParams.limit = params.limit;
    }
    
    const result = await weatherClient.getForecast(queryParams);
    
    return {
      success: true,
      message: 'Successfully retrieved weather forecast data',
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to get weather forecast: ${error.message}`,
      error: error.message
    };
  }
}

/**
 * Gets weather warning data
 * 
 * @param {Object} params - Parameters
 * @param {string} params.district - Optional district filter
 * @param {string} params.state - Optional state filter
 * @param {string} params.warningType - Optional warning type filter
 * @param {number} params.limit - Optional limit parameter
 * @returns {Promise<Object>} - Warning data
 */
async function getWarnings(params = {}) {
  try {
    const queryParams = {};
    
    // Handle district filter
    if (params.district) {
      queryParams.filter = `${params.district}@district`;
    }
    
    // Handle state filter
    if (params.state) {
      queryParams.filter = `${params.state}@state`;
    }
    
    // Handle warning type filter
    if (params.warningType) {
      queryParams.filter = `${params.warningType}@warning_type`;
    }
    
    // Handle limit
    if (params.limit) {
      queryParams.limit = params.limit;
    }
    
    const result = await weatherClient.getWarnings(queryParams);
    
    return {
      success: true,
      message: 'Successfully retrieved weather warning data',
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to get weather warnings: ${error.message}`,
      error: error.message
    };
  }
}

/**
 * Gets earthquake warning data
 * 
 * @param {Object} params - Parameters
 * @param {number} params.magnitude - Optional minimum magnitude filter
 * @param {string} params.region - Optional region filter
 * @param {number} params.limit - Optional limit parameter
 * @returns {Promise<Object>} - Earthquake warning data
 */
async function getEarthquakeWarnings(params = {}) {
  try {
    const queryParams = {};
    
    // Handle magnitude filter
    if (params.magnitude) {
      queryParams.range = `magnitude[${params.magnitude}:]`;
    }
    
    // Handle region filter
    if (params.region) {
      queryParams.contains = `${params.region}@region`;
    }
    
    // Handle limit
    if (params.limit) {
      queryParams.limit = params.limit;
    }
    
    const result = await weatherClient.getEarthquakeWarnings(queryParams);
    
    return {
      success: true,
      message: 'Successfully retrieved earthquake warning data',
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to get earthquake warnings: ${error.message}`,
      error: error.message
    };
  }
}

module.exports = {
  getForecast,
  getWarnings,
  getEarthquakeWarnings
};
