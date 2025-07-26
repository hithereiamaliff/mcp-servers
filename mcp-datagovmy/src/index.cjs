/**
 * Malaysia Open Data MCP - CommonJS Entry Point
 * 
 * This file serves as the CommonJS entry point for the Malaysia Open Data MCP server.
 * It exports all the tools that will be available through the MCP.
 */

// Import tools
const catalogueTools = require('./tools/catalogue');
const dosmTools = require('./tools/dosm');
const weatherTools = require('./tools/weather');
const transportTools = require('./tools/transport');
const testTools = require('./tools/test');

// Define the server function that Smithery expects
function server({ sessionId, config }) {
  // Define all the tools
  const tools = {
    // Data Catalogue Tools
    list_datasets: catalogueTools.listDatasets,
    get_dataset: catalogueTools.getDataset,
    search_datasets: catalogueTools.searchDatasets,
    
    // OpenDOSM Tools
    list_dosm_datasets: dosmTools.listDatasets,
    get_dosm_dataset: dosmTools.getDataset,
    
    // Weather Tools
    get_weather_forecast: weatherTools.getForecast,
    get_weather_warnings: weatherTools.getWarnings,
    get_earthquake_warnings: weatherTools.getEarthquakeWarnings,
    
    // Transport Tools
    list_transport_agencies: transportTools.listAgencies,
    get_transport_data: transportTools.getData,
    
    // Test Tools
    hello: testTools.hello,
  };
  
  // Return an object with a connect method that returns the tools
  return {
    connect: () => tools
  };
}

// Export the server function
module.exports = server;
module.exports.default = server;
