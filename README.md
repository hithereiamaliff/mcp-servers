# Model Context Protocol (MCP) Servers Collection

## About This Repository

This repository contains a collection of Model Context Protocol (MCP) servers developed by me with the assistance of AI tools. MCP refers to servers designed to interact with large language models (LLMs) like Claude, Perplexity, and others, providing specialized interfaces for different use cases.

## Important Disclosure

**I am not a professional programmer.** I don't have a formal background in programming or software development. These projects represent my journey of learning and creating useful tools for my personal and professional needs with the assistance of AI.

Almost all code in this repository has been developed in collaboration with AI assistants. This approach has allowed me to create functional software despite not having traditional programming expertise. I believe in transparency about this process, as it demonstrates how AI can help democratize not only software development but also website and app development.

## Repository Structure

This monorepo is organized as follows:

```
mcp-servers/
├── shared/                    # Common code used across multiple servers
├── mcp-perplexity-search/     # Server for Perplexity search integration
├── mcp-keywords-everywhere/   # Server for Keywords Everywhere API integration
└── [additional-servers]/      # Other MCP server implementations will be added here
```

*NOTE: For now, apart from the `mcp-perplexity-search` and `mcp-keywords-everywhere` repos, the rest of the files and folders are still under development, and I will update and push the changes here accordingly.*

## Current Servers

### [mcp-perplexity-search](https://github.com/hithereiamaliff/mcp-servers/tree/main/mcp-perplexity-search)

A server that integrates with the Perplexity API to enable AI models to perform internet searches. This allows AI assistants to access up-to-date information beyond their training data.

Key features:
- Simple REST API interface
- Configurable search parameters
- Response formatting optimized for LLM consumption
- Rate limiting and caching to manage API usage

### [mcp-keywords-everywhere](https://github.com/hithereiamaliff/mcp-servers/tree/main/mcp-keywords-everywhere)

A server that provides a wrapper around the [Keywords Everywhere API](https://api.keywordseverywhere.com/docs/#/), allowing AI models to access keyword research data and SEO metrics through the MCP standard.

Key features:
- Access to keyword volume, CPC, and competition data
- Support for related keywords and "People Also Search For" data
- Domain and URL keyword analysis capabilities
- Backlink analysis tools
- Traffic metrics for domains and URLs

*(More servers to come soon once I have developed and tried myself)*

## Purpose and Use Cases

These MCP servers are designed to extend the capabilities of AI assistants by providing them with additional tools and data sources. Some common use cases include:

1. Enabling AI models to search the web for current information
2. Providing structured access to specific databases or knowledge sources
3. Creating specialized interfaces for domain-specific tasks
4. Building middleware that connects AI systems to other software

## Installation and Usage

Each server in this collection has its own installation and usage instructions in its respective directory. Generally, you'll need:

- Node.js (version 16 or higher)
- npm or yarn package manager
- API keys for any external services used (where applicable)

Basic setup usually follows this pattern:

```bash
# Clone the repository
git clone https://github.com/hithereiamaliff/mcp-servers.git

# Navigate to a specific server directory
cd mcp-servers/mcp-perplexity-search

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your API keys and configuration

# Start the server
npm start
```

### Configuring MCP Servers in Claude Desktop

To use these MCP servers with Claude Desktop, you need to add them to the Claude Desktop configuration file. Here are examples for the currently available servers:

#### Location of Claude Desktop Config File

The configuration file is typically located at:
```
%APPDATA%\Claude\claude_desktop_config.json
```
You can access this by pressing Win+R and entering `%APPDATA%\Claude`

#### Example Configuration for Perplexity Search

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

#### Example Configuration for Keywords Everywhere

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

#### Combined Configuration (Multiple MCP Servers)

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
    },
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

Replace:
- `username` with your WSL username
- `version` with your Node.js version
- `YOUR_API_KEY` with your respective API keys
- Adjust the WSL paths to match your actual filesystem locations

## Contributing

While I'm not a professional developer, I welcome contributions from the community. If you'd like to improve these servers or add new functionality:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please understand that review and integration might take time as I learn and grow in this space.

If you want to know more about myself, do visit my website here: https://mynameisaliff.co.uk

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to the AI assistants that have helped develop this code
- Appreciation to the open source community for creating the libraries and tools these servers build upon
- Gratitude to everyone sharing knowledge that makes projects like this possible for non-programmers

---

*This project represents my personal exploration of AI-assisted development. While I strive for quality, please understand that these are not professional-grade implementations and should be used with appropriate expectations.*
