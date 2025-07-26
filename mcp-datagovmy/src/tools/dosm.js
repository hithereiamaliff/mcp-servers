/**
 * OpenDOSM MCP Tools
 * 
 * Tools for accessing and searching the OpenDOSM data
 */

const { createDosmClient } = require('../api/dosm');

// Create client instance with default configuration
const dosmClient = createDosmClient();

/**
 * Lists available datasets in the OpenDOSM data catalogue
 * 
 * @param {Object} params - Optional parameters
 * @param {number} params.limit - Maximum number of datasets to return
 * @returns {Promise<Object>} - List of datasets
 */
async function listDatasets(params = {}) {
  try {
    const result = await dosmClient.listDatasets(params);
    
    return {
      success: true,
      message: 'Successfully retrieved OpenDOSM datasets',
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to list OpenDOSM datasets: ${error.message}`,
      error: error.message
    };
  }
}

/**
 * Gets data from a specific OpenDOSM dataset
 * 
 * @param {Object} params - Parameters
 * @param {string} params.id - Dataset ID
 * @param {Object} params.filter - Optional filter parameters
 * @param {Object} params.sort - Optional sort parameters
 * @param {number} params.limit - Optional limit parameter
 * @returns {Promise<Object>} - Dataset data
 */
async function getDataset(params = {}) {
  try {
    if (!params.id) {
      throw new Error('Dataset ID is required');
    }
    
    const { id, ...queryParams } = params;
    const result = await dosmClient.getDataset(id, queryParams);
    
    return {
      success: true,
      message: `Successfully retrieved OpenDOSM dataset: ${id}`,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to get OpenDOSM dataset: ${error.message}`,
      error: error.message
    };
  }
}

module.exports = {
  listDatasets,
  getDataset
};
