/**
 * Test Tool
 * 
 * A simple test tool to verify that the MCP server is working correctly.
 */

/**
 * Returns a simple hello message
 * @returns {Promise<Object>} - Hello message
 */
async function hello() {
  return {
    message: 'Hello from Malaysia Open Data MCP!',
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  hello
};
