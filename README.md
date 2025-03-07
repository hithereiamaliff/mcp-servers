# MCP Servers Collection

## About This Repository

This repository contains a collection of Model Context Protocol (MCP) servers developed by me with the assistance of AI tools. MCP refers to servers designed to interact with large language models (LLMs) like Claude, Perplexity, and others, providing specialized interfaces for different use cases.

## Important Disclosure

**I am not a professional programmer.** I don't have a formal background in programming or software development. These projects represent my journey of learning and creating useful tools for my personal and professional needs with the assistance of AI.

Almost all code in this repository has been developed in collaboration with AI assistants. This approach has allowed me to create functional software despite not having traditional programming expertise. I believe in transparency about this process, as it demonstrates how AI can help democratize not only software development but also website and app development.

## Repository Structure

This monorepo is organized as follows:

```
mcp-servers/
├── shared/              # Common code used across multiple servers
├── mcp-perplexity-search/  # Server for Perplexity search integration
├── [additional-servers]/   # Other MCP server implementations will be added here
├── docs/                # Documentation for using and contributing to the servers
└── examples/            # Example configurations and usage patterns
```

*NOTE: For now, apart from the `mcp-perplexity-search` repo, the rest of the files and folders are still under development, and I will update and push the changes here accordingly.*

## Current Servers

### mcp-perplexity-search

A server that integrates with the Perplexity API to enable AI models to perform internet searches. This allows AI assistants to access up-to-date information beyond their training data.

Key features:
- Simple REST API interface
- Configurable search parameters
- Response formatting optimized for LLM consumption
- Rate limiting and caching to manage API usage

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
