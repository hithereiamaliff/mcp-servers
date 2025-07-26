/**
 * Malaysia Open Data MCP - CommonJS Server Entry Point
 * 
 * This file serves as a CommonJS-compatible entry point for the Smithery MCP server.
 */

// Import the server function from the index.js file
const server = require('./src/index.js');

// Export the server function as both the default export and a named export
module.exports = server;
module.exports.default = server;
