/**
 * Smithery MCP Server Configuration
 */

// Use CommonJS format
module.exports = {
  name: 'datagovmy-mcp',
  displayName: 'Malaysia Open Data MCP',
  description: 'MCP server for accessing Malaysia\'s Open Data APIs',
  version: '1.0.0',
  entry: './src/index.js',
  tools: {
    // Data Catalogue Tools
    list_datasets: {
      description: 'Lists available datasets in the Data Catalogue',
      parameters: {
        limit: {
          type: 'number',
          description: 'Maximum number of datasets to return'
        }
      }
    },
    get_dataset: {
      description: 'Gets data from a specific dataset',
      parameters: {
        id: {
          type: 'string',
          description: 'Dataset ID',
          required: true
        },
        filter: {
          type: 'object',
          description: 'Filter parameters'
        },
        sort: {
          type: 'string',
          description: 'Sort parameters'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of records to return'
        }
      }
    },
    search_datasets: {
      description: 'Searches across datasets in the Data Catalogue',
      parameters: {
        query: {
          type: 'string',
          description: 'Search query'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return'
        }
      }
    },
    
    // OpenDOSM Tools
    list_dosm_datasets: {
      description: 'Lists available datasets in the OpenDOSM data catalogue',
      parameters: {
        limit: {
          type: 'number',
          description: 'Maximum number of datasets to return'
        }
      }
    },
    get_dosm_dataset: {
      description: 'Gets data from a specific OpenDOSM dataset',
      parameters: {
        id: {
          type: 'string',
          description: 'Dataset ID',
          required: true
        },
        filter: {
          type: 'object',
          description: 'Filter parameters'
        },
        sort: {
          type: 'string',
          description: 'Sort parameters'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of records to return'
        }
      }
    },
    
    // Weather Tools
    get_weather_forecast: {
      description: 'Gets 7-day general weather forecast data',
      parameters: {
        location: {
          type: 'string',
          description: 'Location filter'
        },
        locationCategory: {
          type: 'string',
          description: 'Location category filter (St, Rc, Ds, Tn, Dv)'
        },
        date: {
          type: 'string',
          description: 'Date filter (YYYY-MM-DD)'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of records to return'
        }
      }
    },
    get_weather_warnings: {
      description: 'Gets weather warning data',
      parameters: {
        district: {
          type: 'string',
          description: 'District filter'
        },
        state: {
          type: 'string',
          description: 'State filter'
        },
        warningType: {
          type: 'string',
          description: 'Warning type filter'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of records to return'
        }
      }
    },
    get_earthquake_warnings: {
      description: 'Gets earthquake warning data',
      parameters: {
        magnitude: {
          type: 'number',
          description: 'Minimum magnitude filter'
        },
        region: {
          type: 'string',
          description: 'Region filter'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of records to return'
        }
      }
    },
    
    // Transport Tools
    list_transport_agencies: {
      description: 'Lists available transport agencies',
      parameters: {}
    },
    get_transport_data: {
      description: 'Gets GTFS data for a specific agency',
      parameters: {
        agencyId: {
          type: 'string',
          description: 'Agency ID (e.g., "mybas-jb", "ktmb", "prasarana")',
          required: true
        },
        dataType: {
          type: 'string',
          description: 'Data type ("static" or "realtime")',
          default: 'static'
        },
        filter: {
          type: 'object',
          description: 'Filter parameters'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of records to return'
        }
      }
    }
  }
};
