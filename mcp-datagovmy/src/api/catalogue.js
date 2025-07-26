/**
 * Data Catalogue API Client
 * 
 * Handles communication with the Data Catalogue API endpoint
 */

const { createClient } = require('./client');

/**
 * Creates a Data Catalogue API client
 * 
 * @param {Object} options - Client configuration options
 * @returns {Object} - Data Catalogue API client
 */
function createCatalogueClient(options = {}) {
  const client = createClient(options);
  const ENDPOINT = '/data-catalogue';
  
  return {
    /**
     * Gets data from a specific dataset
     * 
     * @param {string} datasetId - Dataset ID
     * @param {Object} params - Additional query parameters
     * @returns {Promise<Object>} - Dataset data
     */
    async getDataset(datasetId, params = {}) {
      return client.request(ENDPOINT, {
        id: datasetId,
        ...params
      });
    },
    
    /**
     * Searches across datasets
     * 
     * @param {Object} params - Search parameters
     * @returns {Promise<Object>} - Search results
     */
    async searchDatasets(params = {}) {
      return client.request(ENDPOINT, {
        meta: true,
        ...params
      });
    },
    
    /**
     * Lists available datasets
     * 
     * @param {Object} params - List parameters
     * @returns {Promise<Object>} - List of datasets
     */
    async listDatasets(params = {}) {
      // For listing datasets, we'll need to use the meta parameter
      // to get information about available datasets
      return client.request(ENDPOINT, {
        meta: true,
        ...params
      });
    }
  };
}

// Export both as a named export and as the default export for maximum compatibility
module.exports = createCatalogueClient;
module.exports.createCatalogueClient = createCatalogueClient;
module.exports.default = createCatalogueClient;
