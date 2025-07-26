/**
 * Transport MCP Tools
 * 
 * Tools for accessing public transportation data from the Malaysia Open Data API
 */

const { createTransportClient } = require('../api/transport');

// Create client instance with default configuration
const transportClient = createTransportClient();

/**
 * Lists available transport agencies
 * 
 * @returns {Promise<Object>} - List of available agencies
 */
async function listAgencies() {
  try {
    const result = await transportClient.listAgencies();
    
    return {
      success: true,
      message: 'Successfully retrieved transport agencies',
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to list transport agencies: ${error.message}`,
      error: error.message
    };
  }
}

/**
 * Gets GTFS data for a specific agency
 * 
 * @param {Object} params - Parameters
 * @param {string} params.agencyId - Agency ID (e.g., 'mybas-jb', 'ktmb', 'prasarana')
 * @param {string} params.dataType - Data type ('static' or 'realtime')
 * @param {Object} params.filter - Optional filter parameters
 * @param {number} params.limit - Optional limit parameter
 * @returns {Promise<Object>} - GTFS data
 */
async function getData(params = {}) {
  try {
    if (!params.agencyId) {
      throw new Error('Agency ID is required');
    }
    
    const { agencyId, dataType = 'static', filter, limit, ...otherParams } = params;
    
    const queryParams = {
      ...otherParams,
      ...(filter && { filter }),
      ...(limit && { limit })
    };
    
    const result = await transportClient.getData({
      agencyId,
      dataType,
      queryParams
    });
    
    return {
      success: true,
      message: `Successfully retrieved ${dataType} GTFS data for agency: ${agencyId}`,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to get transport data: ${error.message}`,
      error: error.message
    };
  }
}

module.exports = {
  listAgencies,
  getData
};
