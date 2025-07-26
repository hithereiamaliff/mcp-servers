/**
 * OpenDOSM API Client
 * 
 * Handles communication with the OpenDOSM API endpoint
 */

const { createClient } = require('./client');

/**
 * Creates an OpenDOSM API client
 * 
 * @param {Object} options - Client configuration options
 * @returns {Object} - OpenDOSM API client
 */
function createDosmClient(options = {}) {
  const client = createClient(options);
  const ENDPOINT = '/opendosm';
  
  return {
    /**
     * Gets data from a specific OpenDOSM dataset
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
     * Lists available OpenDOSM datasets
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

module.exports = {
  createDosmClient
};
