/**
 * Malaysia Open Data MCP Server Starter
 * 
 * This script helps start the Smithery MCP server on Windows
 * by properly handling file paths and ESM URL schemes.
 */

const { spawn } = require('child_process');
const { join } = require('path');
const { pathToFileURL } = require('url');

// Convert the config path to a proper file:// URL
const configPath = join(__dirname, 'smithery.config.cjs');
const configUrl = pathToFileURL(configPath).href;

console.log('Starting Malaysia Open Data MCP server...');
console.log(`Config path: ${configPath}`);
console.log(`Config URL: ${configUrl}`);

// Spawn the Smithery CLI process
const smithery = spawn('npx', ['@smithery/cli', 'dev', '--config', configPath], {
  stdio: 'inherit',
  shell: true
});

// Handle process events
smithery.on('close', (code) => {
  console.log(`Smithery MCP server exited with code ${code}`);
});

// Handle errors
smithery.on('error', (err) => {
  console.error('Failed to start Smithery MCP server:', err);
});

// Handle SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('Shutting down Malaysia Open Data MCP server...');
  smithery.kill('SIGINT');
  process.exit(0);
});
