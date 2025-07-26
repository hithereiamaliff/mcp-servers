/**
 * Data Catalogue MCP Tools
 * 
 * Tools for accessing and searching the Malaysia Open Data Catalogue
 */

// Import the createCatalogueClient function directly
const createCatalogueClient = require('../api/catalogue');

// Create client instance with default configuration
const catalogueClient = createCatalogueClient();

/**
 * Lists available datasets in the Data Catalogue
 * 
 * @param {Object} params - Optional parameters
 * @param {number} params.limit - Maximum number of datasets to return
 * @returns {Promise<Object>} - List of datasets
 */
async function listDatasets(params = {}) {
  try {
    const result = await catalogueClient.listDatasets(params);
    
    return {
      success: true,
      message: 'Successfully retrieved datasets',
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to list datasets: ${error.message}`,
      error: error.message
    };
  }
}

/**
 * Gets data from a specific dataset
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
    const result = await catalogueClient.getDataset(id, queryParams);
    
    return {
      success: true,
      message: `Successfully retrieved dataset: ${id}`,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to get dataset: ${error.message}`,
      error: error.message
    };
  }
}

/**
 * Searches across datasets in the Data Catalogue
 * 
 * @param {Object} params - Search parameters
 * @param {string} params.query - Search query
 * @param {number} params.limit - Maximum number of results to return
 * @returns {Promise<Object>} - Search results
 */
async function searchDatasets(params = {}) {
  try {
    // For searching across datasets, we'll use the contains parameter
    // to search for the query in dataset metadata
    const result = await catalogueClient.searchDatasets({
      meta: true,
      ...(params.query && { contains: params.query }),
      ...(params.limit && { limit: params.limit })
    });
    
    return {
      success: true,
      message: 'Successfully searched datasets',
      data: result
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to search datasets: ${error.message}`,
      error: error.message
    };
  }
}

module.exports = {
  listDatasets,
  getDataset,
  searchDatasets
};
