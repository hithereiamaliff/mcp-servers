# MCP Keywords Everywhere Server

This project provides a Model Context Protocol (MCP) server that acts as a wrapper around the [Keywords Everywhere API](https://api.keywordseverywhere.com/docs/#/). It allows AI models to access keyword research data through the MCP standard.

## Features

*   Exposes various Keywords Everywhere API endpoints as MCP tools.
*   Allows interaction with the Keywords Everywhere service through the MCP standard.
*   Provides keyword volume, CPC, competition, and other SEO metrics.

## Prerequisites

*   Node.js installed (version 14 or higher).
*   A Keywords Everywhere API key. Get yours from [https://keywordseverywhere.com/](https://keywordseverywhere.com/).

## Detailed Installation Guide

### For Windows Users

1. **Ensure WSL is installed and set up**:
   - Open PowerShell as Administrator and run: `wsl --install` (if not already installed)
   - Follow the prompts to set up a Linux distribution

2. **Install Node.js in WSL**:
   - Open your WSL terminal
   - Update package lists: `sudo apt update`
   - Install Node.js: `sudo apt install nodejs npm`
   - Verify installation: `node --version`

3. **Clone the repository**:
   - Navigate to your preferred directory: `cd ~`
   - Clone the repo: `git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git`
   - Navigate to the project: `cd mcp-keywords-everywhere`
   - Install dependencies: `npm install`

### For macOS/Linux Users

1. **Install Node.js** (if not already installed):
   - macOS: Use Homebrew: `brew install node`
   - Linux: Use package manager: `sudo apt install nodejs npm` (Ubuntu/Debian) or equivalent
   - Verify installation: `node --version`

2. **Clone the repository**:
   - Open Terminal
   - Navigate to your preferred directory: `cd ~/Documents` (or any location you prefer)
   - Clone the repo: `git clone https://github.com/hithereiamaliff/mcp-servers/mcp-keywords-everywhere.git`
   - Navigate to the project: `cd mcp-keywords-everywhere`
   - Install dependencies: `npm install`

## Configuration

### Setting Up Your API Key

You need to set your Keywords Everywhere API key as an environment variable:

*   **Windows (Command Prompt):**
    ```bash
    set KEYWORDS_EVERYWHERE_API_KEY=YOUR_API_KEY
    ```
*   **Windows (PowerShell):**
    ```powershell
    $env:KEYWORDS_EVERYWHERE_API_KEY = "YOUR_API_KEY"
    ```
*   **Windows (WSL) / Linux / macOS:**
    ```bash
    export KEYWORDS_EVERYWHERE_API_KEY=YOUR_API_KEY
    ```

Replace `YOUR_API_KEY` with your actual key from Keywords Everywhere.

### Making the API Key Persistent (Optional)

To avoid setting the API key each time you open a new terminal:

*   **Windows**: Create a `.env` file in the project root with:
    ```
    KEYWORDS_EVERYWHERE_API_KEY=YOUR_API_KEY
    ```
    Then modify the `index.js` file to use a package like `dotenv` (requires additional setup).

*   **WSL/Linux/macOS**: Add the export command to your shell profile:
    - Bash: `echo 'export KEYWORDS_EVERYWHERE_API_KEY=YOUR_API_KEY' >> ~/.bashrc`
    - Zsh: `echo 'export KEYWORDS_EVERYWHERE_API_KEY=YOUR_API_KEY' >> ~/.zshrc`

## Running the Server

### Basic Usage

Start the MCP server:

```bash
node index.js
```

The server will listen for MCP requests via standard input/output (stdio).

### Configuring with Claude Desktop

To use this MCP server with Claude Desktop, you need to add it to the Claude Desktop configuration file:

1. Locate the Claude Desktop configuration file, typically at:
   ```
   %APPDATA%\Claude\claude_desktop_config.json
   ```
   You can access this by pressing Win+R and entering `%APPDATA%\Claude`

2. Edit the configuration file to include the Keywords Everywhere MCP server:

```json
{
  "mcpServers": {
    "keywords-everywhere": {
      "command": "wsl.exe",
      "args": [
        "bash",
        "-c",
        "export KEYWORDS_EVERYWHERE_API_KEY='YOUR_API_KEY' && /home/username/.nvm/versions/node/version/bin/node /home/username/mcp-keywords-everywhere/index.js"
      ]
    }
  }
}
```

3. Example Claude Desktop config file entry:

```json
{
  "mcpServers": {
    "keywords-everywhere": {
      "command": "wsl.exe",
      "args": [
        "bash",
        "-c",
        "export KEYWORDS_EVERYWHERE_API_KEY='YOUR_API_KEY' && /home/hithereiamaliff/.nvm/versions/node/v22.14.0/bin/node /home/hithereiamaliff/mcp-keywords-everywhere/index.js"
      ]
    }
  }
}
```

Replace:
- `username` with your WSL username
- `version` with your Node.js version
- `YOUR_API_KEY` with your Keywords Everywhere API key
- Adjust the WSL paths to match your actual filesystem locations

### Using with AI Models

This MCP server is designed to be used with AI models that support the Model Context Protocol. To use it:

1. Configure the server as described above
2. Start Claude Desktop
3. The AI model can now access the Keywords Everywhere API through the MCP tools

### Troubleshooting

If you encounter issues:

- **"API key not found"**: Make sure you've set the environment variable correctly
- **Connection issues**: Check your internet connection and Keywords Everywhere API status
- **Permission errors**: On Linux/macOS, you might need to make the script executable: `chmod +x index.js`

## Available Tools

The server provides the following MCP tools, corresponding to Keywords Everywhere API endpoints:

*   `get_credits`: Get your account's credit balance.
*   `get_countries`: Get a list of supported countries.
*   `get_currencies`: Get a list of supported currencies.
*   `get_keyword_data`: Get Volume, CPC, and competition for a set of keywords.
    *   _Input:_ `keywords` (array of strings), `country` (string, optional), `currency` (string, optional)
*   `get_related_keywords`: Get related keywords (Requires Gold/Platinum plan).
    *   _Input:_ `keyword` (string), `num` (integer, optional)
*   `get_pasf_keywords`: Get 'People Also Search For' keywords (Requires Gold/Platinum plan).
    *   _Input:_ `keyword` (string), `num` (integer, optional)
*   `get_domain_keywords`: Get keywords a domain ranks for (Requires Gold/Platinum plan).
    *   _Input:_ `domain` (string), `country` (string, optional), `num` (integer, optional)
*   `get_url_keywords`: Get keywords a URL ranks for (Requires Gold/Platinum plan).
    *   _Input:_ `url` (string), `country` (string, optional), `num` (integer, optional)
*   `get_domain_traffic`: Get traffic metrics for a domain (Requires Gold/Platinum plan).
    *   _Input:_ `domain` (string), `country` (string, optional)
*   `get_url_traffic`: Get traffic metrics for a URL (Requires Gold/Platinum plan).
    *   _Input:_ `url` (string), `country` (string, optional)
*   `get_domain_backlinks`: Get backlinks for a domain (Requires Gold/Platinum plan).
    *   _Input:_ `domain` (string), `num` (integer, optional)
*   `get_unique_domain_backlinks`: Get unique referring domain backlinks (Requires Gold/Platinum plan).
    *   _Input:_ `domain` (string), `num` (integer, optional)
*   `get_page_backlinks`: Get backlinks for a specific page (Requires Gold/Platinum plan).
    *   _Input:_ `url` (string), `num` (integer, optional)
*   `get_unique_page_backlinks`: Get unique referring domain backlinks for a page (Requires Gold/Platinum plan).
    *   _Input:_ `url` (string), `num` (integer, optional)

## Example Usage

Here's an example of how an AI model might use the `get_keyword_data` tool:

```json
{
  "keywords": ["seo tools", "keyword research", "backlink checker"],
  "country": "us",
  "currency": "usd"
}
```

This would return volume, CPC, and competition data for these keywords in the US market with USD currency.

Refer to the [Keywords Everywhere API Documentation](https://api.keywordseverywhere.com/docs/#/) for detailed information on parameters and responses.

## Dependencies

*   `@modelcontextprotocol/sdk`: For creating the MCP server.
*   `axios`: For making HTTP requests to the Keywords Everywhere API.
*   `zod`: For schema validation (used internally).

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally (`git clone git@github.com:YOUR_USERNAME/YOUR_REPOSITORY.git`).
3.  **Create a new branch** for your feature or bug fix (`git checkout -b feature/your-feature-name` or `bugfix/your-bug-fix-name`).
4.  **Make your changes** and commit them with clear messages.
5.  **Push your branch** to your fork (`git push origin feature/your-feature-name`).
6.  **Open a Pull Request** from your fork's branch to the main repository's `main` (or `master`) branch.
7.  Clearly describe the changes you've made in the Pull Request description.

**Reporting Issues:**

If you encounter any bugs or have suggestions for improvements, please open an issue on the [GitHub Issues page](https://github.com/hithereiamaliff/mcp-servers/issues). Provide as much detail as possible, including steps to reproduce the issue if applicable.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
