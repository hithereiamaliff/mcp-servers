# Perplexity MCP Server for Claude Desktop

This repository provides instructions and code for setting up a Perplexity search integration with Claude Desktop using the Model Context Protocol (MCP).

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [For Windows Users](#for-windows-users)
  - [For macOS/Linux Users](#for-macoslinux-users)
- [Configuration](#configuration)
  - [Setting Up Your API Key](#setting-up-your-api-key)
  - [Configuring with Claude Desktop](#configuring-with-claude-desktop)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Additional Resources](#additional-resources)

## Overview

This MCP server provides a Perplexity search integration for Claude Desktop, enabling it to search the web and provide up-to-date information with source citations. Using the Model Context Protocol (MCP), Claude can access real-time information beyond its training data, making it more useful for research, fact-checking, and staying current with recent developments.

## Features

* **Real-time Web Search**: Access current information beyond Claude's training data
* **Source Citations**: Automatically includes links to source material
* **Natural Language Queries**: Ask questions in plain English
* **Detailed Responses**: Get comprehensive answers with context and explanations
* **Easy Integration**: Simple setup with Claude Desktop
* **WSL Compatibility**: Optimized for Windows Subsystem for Linux

## Prerequisites

* Node.js installed (version 14 or higher)
* A Perplexity API key (Sonar Pro subscription required)
* Claude Desktop application installed
* Windows 10 or later with WSL2 enabled (for Windows users)

## Installation

### For Windows Users

1. **Ensure WSL is installed and set up**:
   - Open PowerShell as Administrator and run: `wsl --install` (if not already installed)
   - Follow the prompts to set up a Linux distribution (Ubuntu recommended)
   - Restart your computer if prompted

2. **Install Node.js in WSL**:
   - Open your WSL terminal
   - Install NVM (Node Version Manager):
     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
     ```
   - Close and reopen your terminal
   - Install Node.js: `nvm install node`
   - Verify installation: `node --version`

3. **Set up the Perplexity MCP server**:
   - Create a project directory:
     ```bash
     mkdir ~/mcp-perplexity
     cd ~/mcp-perplexity
     ```
   - Clone the repository (or create the files manually):
     ```bash
     git clone https://github.com/hithereiamaliff/mcp-servers/mcp-perplexity-search .
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

### For macOS/Linux Users

1. **Install Node.js** (if not already installed):
   - macOS: Use Homebrew: `brew install node`
   - Linux: Use package manager: `sudo apt install nodejs npm` (Ubuntu/Debian) or equivalent
   - Verify installation: `node --version`

2. **Set up the Perplexity MCP server**:
   - Create a project directory:
     ```bash
     mkdir ~/mcp-perplexity
     cd ~/mcp-perplexity
     ```
   - Clone the repository (or create the files manually):
     ```bash
     git clone https://github.com/hithereiamaliff/mcp-servers/mcp-perplexity-search .
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

After installation, make the script executable:
```bash
chmod +x index.js
```

## Configuration

### Setting Up Your API Key

You need to set your Perplexity API key as an environment variable:

* **Windows (Command Prompt):**
  ```bash
  set PERPLEXITY_API_KEY=YOUR_API_KEY
  ```
* **Windows (PowerShell):**
  ```powershell
  $env:PERPLEXITY_API_KEY = "YOUR_API_KEY"
  ```
* **Windows (WSL) / Linux / macOS:**
  ```bash
  export PERPLEXITY_API_KEY=YOUR_API_KEY
  ```

Replace `YOUR_API_KEY` with your actual key from Perplexity.

### Making the API Key Persistent (Optional)

To avoid setting the API key each time you open a new terminal:

* **Windows**: Create a `.env` file in the project root with:
  ```
  PERPLEXITY_API_KEY=YOUR_API_KEY
  ```
  Then modify the `index.js` file to use a package like `dotenv` (requires additional setup).

* **WSL/Linux/macOS**: Add the export command to your shell profile:
  - Bash: `echo 'export PERPLEXITY_API_KEY=YOUR_API_KEY' >> ~/.bashrc`
  - Zsh: `echo 'export PERPLEXITY_API_KEY=YOUR_API_KEY' >> ~/.zshrc`

### Configuring with Claude Desktop

1. **Find your WSL paths**:
   - Determine your Node.js path in WSL: `which node`
   - Note the full path to your script: `echo "$HOME/mcp-perplexity/index.js"`

2. **Locate the Claude Desktop configuration file**:
   - Typically at: `%APPDATA%\Claude\claude_desktop_config.json`
   - You can access this by pressing Win+R and entering `%APPDATA%\Claude`

3. **Edit the configuration file** to include the Perplexity MCP server:

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "wsl.exe",
      "args": [
        "bash",
        "-c",
        "export PERPLEXITY_API_KEY='YOUR_API_KEY' && /home/username/.nvm/versions/node/version/bin/node /home/username/mcp-perplexity/index.js"
      ]
    }
  }
}
```

4. **Example configuration**:

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "wsl.exe",
      "args": [
        "bash",
        "-c",
        "export PERPLEXITY_API_KEY='YOUR_API_KEY' && /home/hithereiamaliff/.nvm/versions/node/v22.14.0/bin/node /home/hithereiamaliff/mcp-perplexity/index.js"
      ]
    }
  }
}
```

Replace:
- `username` with your WSL username
- `version` with your Node.js version
- `YOUR_API_KEY` with your Perplexity API key
- Adjust the WSL paths to match your actual filesystem locations

5. **Test your setup**:
   - First, test your script manually: `PERPLEXITY_API_KEY='your_key' node index.js`
   - Restart Claude Desktop

## Usage

Once set up, you can use the Perplexity integration with Claude in several ways:

1. **Direct Query**: Ask Claude to use Perplexity to answer a question
   ```
   Can you use Perplexity to tell me about recent developments in fusion energy?
   ```

2. **Research Assistance**: Request research on specific topics
   ```
   I need information on climate change policies implemented in 2023. Can you search using Perplexity?
   ```

3. **Fact Checking**: Verify information using up-to-date sources
   ```
   Can you use Perplexity to check if there have been any breakthroughs in quantum computing this year?
   ```

4. **Current Events**: Get information about recent news and events
   ```
   Use Perplexity to find the latest news about space exploration.
   ```

When you make these requests, Claude will:
1. Ask for your permission to use the Perplexity tool
2. Send your query to the Perplexity API
3. Present the results with information and source citations

## Troubleshooting

### Common Issues and Solutions

1. **API Key Issues**
   - **Error**: "PERPLEXITY_API_KEY environment variable is required"
   - **Solution**: 
     - Ensure the API key is correctly exported in the bash command
     - Check for typos in your API key
     - Verify the API key is still valid

2. **Module Not Found**
   - **Error**: "Cannot find module '@modelcontextprotocol/sdk/...'"
   - **Solution**:
     - Run `npm install @modelcontextprotocol/sdk`
     - Check that your package.json has `"type": "module"`

3. **Connection Issues**
   - **Error**: "Server disconnected" in Claude Desktop
   - **Solution**:
     - Check WSL terminal for error messages
     - Verify paths in your configuration file
     - Check for JSON syntax errors
     - Add debug output to your configuration:
       ```json
       "args": [
         "bash",
         "-c",
         "echo \"API Key exists: ${PERPLEXITY_API_KEY:+yes}\" >&2 && export PERPLEXITY_API_KEY='your_key' && node /path/to/script.js"
       ]
       ```

4. **WSL Issues**
   - **Error**: "Cannot connect to WSL" or similar
   - **Solution**:
     - Ensure WSL is properly installed: `wsl --status`
     - Try reinstalling WSL if necessary
     - Update WSL: `wsl --update`

## Additional Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Perplexity API Documentation](https://docs.perplexity.ai/)
- [WSL Documentation](https://learn.microsoft.com/en-us/windows/wsl/)
- [Windows Subsystem for Linux Installation Guide](https://docs.microsoft.com/en-us/windows/wsl/install)
- [Node.js Documentation](https://nodejs.org/en/docs/)

---

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/hithereiamaliff/mcp-servers?tab=MIT-1-ov-file) file for details.

## Acknowledgments

- [Claude Desktop](https://support.anthropic.com/en/articles/10065433-installing-claude-for-desktop) by Anthropic
- [Perplexity AI](https://docs.perplexity.ai/home) for their Sonar Pro API
- [Microsoft for Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/)
- [Contributors to the Model Context Protocol](https://github.com/modelcontextprotocol)
