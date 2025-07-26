/**
 * Smithery MCP Server Configuration
 */

// Use CommonJS format
module.exports = {
  // Server configuration
  transport: 'http', // Use HTTP transport instead of SSE
  cors: true, // Enable CORS for cross-origin requests
  name: 'datagovmy-mcp-hithereiamaliff',
  displayName: 'Malaysia Open Data MCP',
  description: 'MCP server for accessing Malaysia\'s Open Data APIs',
  version: '1.0.0',
  entry: './server.cjs',
  tools: {
    // Data Catalogue Tools
    list_datasets: {
      description: 'Lists available datasets in the Data Catalogue',
      parameters: {
        limit: {
          type: 'number',
          description: 'Maximum number of datasets to return'
        },
        offset: {
          type: 'number',
          description: 'Number of datasets to skip'
        }
      }
    },
    get_dataset: {
      description: 'Gets data from a specific dataset in the Data Catalogue',
      parameters: {
        id: {
          type: 'string',
          description: 'ID of the dataset to retrieve'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of records to return'
        },
        offset: {
          type: 'number',
          description: 'Number of records to skip'
        },
        filter: {
          type: 'string',
          description: 'Filter criteria in the format field:operator:value'
        }
      }
    },
    search_datasets: {
      description: 'Searches for datasets in the Data Catalogue',
      parameters: {
        query: {
          type: 'string',
          description: 'Search query'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of datasets to return'
        }
      }
    },

    // OpenDOSM Tools
    list_dosm_datasets: {
      description: 'Lists available datasets from the Department of Statistics Malaysia',
      parameters: {
        limit: {
          type: 'number',
          description: 'Maximum number of datasets to return'
        },
        offset: {
          type: 'number',
          description: 'Number of datasets to skip'
        }
      }
    },
    get_dosm_dataset: {
      description: 'Gets data from a specific DOSM dataset',
      parameters: {
        id: {
          type: 'string',
          description: 'ID of the dataset to retrieve'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of records to return'
        },
        offset: {
          type: 'number',
          description: 'Number of records to skip'
        }
      }
    },

    // Test Tool
    hello: {
      description: 'A simple test tool to verify that the MCP server is working correctly',
      parameters: {},
      returnType: 'object'
    },

    // Weather Tools
    get_weather_forecast: {
      description: 'Gets weather forecast for Malaysia',
      parameters: {
        location: {
          type: 'string',
          description: 'Location name (e.g., "Kuala Lumpur", "Penang")'
        },
        days: {
          type: 'number',
          description: 'Number of days to forecast (1-7)'
        }
      }
    },
    get_weather_warnings: {
      description: 'Gets current weather warnings for Malaysia',
      parameters: {
        type: {
          type: 'string',
          description: 'Type of warning (e.g., "rain", "flood", "all")'
        },
        location: {
          type: 'string',
          description: 'Location name to filter warnings'
        }
      }
    },
    get_earthquake_warnings: {
      description: 'Gets earthquake warnings for Malaysia',
      parameters: {
        days: {
          type: 'number',
          description: 'Number of days to look back (1-30)'
        },
        magnitude: {
          type: 'number',
          description: 'Minimum magnitude to include'
        }
      }
    },

    // Transport Tools
    list_transport_agencies: {
      description: 'Lists available transport agencies with GTFS data',
      parameters: {
        state: {
          type: 'string',
          description: 'State name to filter agencies'
        },
        type: {
          type: 'string',
          description: 'Type of transport (e.g., "bus", "train", "all")'
        }
      }
    },
    get_transport_data: {
      description: 'Gets GTFS data for a specific transport agency',
      parameters: {
        agency_id: {
          type: 'string',
          description: 'ID of the transport agency'
        },
        type: {
          type: 'string',
          description: 'Type of GTFS data to retrieve (e.g., "routes", "stops", "schedules")'
        },
        format: {
          type: 'string',
          description: 'Output format (e.g., "json", "csv")'
        }
      }
    }
  }
};
