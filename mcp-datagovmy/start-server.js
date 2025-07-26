/**
 * Malaysia Open Data MCP Server Starter
 * 
 * This script helps start the Smithery MCP server on Windows
 * by properly handling file paths and ESM URL schemes.
 */

/**
 * Simple start script for the Malaysia Open Data MCP server
 * Uses direct CLI invocation for better compatibility on Windows
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Malaysia Open Data MCP server...');

// Get the absolute path to the config file
const configPath = path.resolve(__dirname, 'smithery.config.cjs');
console.log('Config path:', configPath);

// Use npx to run the Smithery CLI with explicit parameters
const smithery = spawn('cmd.exe', [
  '/c', 
  'npx', 
  '@smithery/cli', 
  'dev', 
  '--config', 
  configPath,
  '--port',
  '8182'
], {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: {
    ...process.env,
    NODE_OPTIONS: '--no-warnings'
  }
});

// Handle process exit
process.on('SIGINT', () => {
  console.log('\nStopping MCP server...');
  smithery.kill();
});

smithery.on('exit', (code) => {
  console.log(`\nSmithery MCP server exited with code ${code}`);
  process.exit(code);
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
