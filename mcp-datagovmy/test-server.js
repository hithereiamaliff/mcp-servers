/**
 * Simple test script to verify the Malaysia Open Data MCP server functionality
 */

// Import the server function
const server = require('./src/index.js');

// Create a server instance with mock session and config
const serverInstance = server({
  sessionId: 'test-session',
  config: {}
});

// Check if the server has a connect method
console.log('Server has connect method:', typeof serverInstance.connect === 'function');

// If it has a connect method, try to get the tools
if (typeof serverInstance.connect === 'function') {
  const tools = serverInstance.connect();
  console.log('Available tools:', Object.keys(tools));
  
  // Test the hello tool if available
  if (tools.hello) {
    console.log('Testing hello tool...');
    tools.hello({})
      .then(result => {
        console.log('Hello tool result:', result);
      })
      .catch(error => {
        console.error('Error testing hello tool:', error);
      });
  }
} else {
  console.error('Server does not have a connect method!');
}
