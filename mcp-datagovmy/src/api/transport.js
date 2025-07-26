/**
 * Transport API Client
 * 
 * Handles communication with the GTFS Static and GTFS Realtime API endpoints
 */

const { createClient } = require('./client');

/**
 * Creates a Transport API client
 * 
 * @param {Object} options - Client configuration options
 * @returns {Object} - Transport API client
 */
function createTransportClient(options = {}) {
  const client = createClient(options);
  
  // Transport API endpoints
  const GTFS_STATIC_ENDPOINT = '/gtfs-static';
  const GTFS_REALTIME_ENDPOINT = '/gtfs-realtime';
  
  // Available transport agencies
  const AGENCIES = {
    MYBAS_JB: 'mybas-jb',
    KTMB: 'ktmb',
    PRASARANA: 'prasarana'
  };
  
  return {
    /**
     * Lists available transport agencies
     * 
     * @returns {Promise<Object>} - List of available agencies
     */
    async listAgencies() {
      return {
        agencies: [
          {
            id: AGENCIES.MYBAS_JB,
            name: 'myBAS Johor Bahru',
            description: 'Bus service operator in Johor Bahru',
            website: 'https://www.causewaylink.com.my/mybas/en/'
          },
          {
            id: AGENCIES.KTMB,
            name: 'KTMB (Keretapi Tanah Melayu Berhad)',
            description: 'Railway operator providing train services across Malaysia',
            website: 'https://www.ktmb.com.my/'
          },
          {
            id: AGENCIES.PRASARANA,
            name: 'Prasarana',
            description: 'Public transport operator responsible for LRT, MRT, monorail, and bus services',
            website: 'https://myrapid.com.my/'
          }
        ]
      };
    },
    
    /**
     * Gets GTFS Static data for a specific agency
     * 
     * @param {string} agencyId - Agency ID
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} - GTFS Static data
     */
    async getStaticData(agencyId, params = {}) {
      return client.request(`${GTFS_STATIC_ENDPOINT}/${agencyId}`, params);
    },
    
    /**
     * Gets GTFS Realtime data for a specific agency
     * 
     * @param {string} agencyId - Agency ID
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} - GTFS Realtime data
     */
    async getRealtimeData(agencyId, params = {}) {
      return client.request(`${GTFS_REALTIME_ENDPOINT}/${agencyId}`, params);
    },
    
    /**
     * Gets GTFS data (static or realtime) for a specific agency
     * 
     * @param {Object} params - Parameters
     * @param {string} params.agencyId - Agency ID
     * @param {string} params.dataType - Data type ('static' or 'realtime')
     * @param {Object} params.queryParams - Additional query parameters
     * @returns {Promise<Object>} - GTFS data
     */
    async getData({ agencyId, dataType = 'static', queryParams = {} }) {
      if (!agencyId) {
        throw new Error('Agency ID is required');
      }
      
      if (dataType === 'static') {
        return this.getStaticData(agencyId, queryParams);
      } else if (dataType === 'realtime') {
        return this.getRealtimeData(agencyId, queryParams);
      } else {
        throw new Error('Invalid data type. Must be "static" or "realtime"');
      }
    }
  };
}

module.exports = {
  createTransportClient
};
