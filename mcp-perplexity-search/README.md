# Perplexity MCP Server for Claude Desktop

This repository provides instructions and code for setting up a Perplexity search integration with Claude Desktop using the Model Context Protocol (MCP).

## Table of Contents

- [Overview](#overview)
- [Why Use Claude? Why Not Other AI Models?] (#why-use-claude-why-not-other-ai-models)
- [Why Use WSL Instead of Windows Node.js](#why-use-wsl-instead-of-windows-nodejs)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Additional Resources](#additional-resources)

## Overview

The Model Context Protocol (MCP) allows Claude Desktop to connect with external tools and services. This guide will help you set up a Perplexity search integration, enabling Claude to search the web and provide up-to-date information with source citations.

## Why Use Claude? Why Not Other AI Models?

**Short Answer**: Claude's way of answering the question and explaining things seem to be more nuanced (from my personal experience), and at the same time, since it doesn't have real-time web search capabilitity yet, why not we take into our own hands and have the search feature integrated through the MCP, right? :)

**Long Answer:**

### Claude's MCP Implementation

The Model Context Protocol (MCP) is particularly well-implemented in Claude Desktop, allowing for:

- **True Tool Integration**: Unlike other AI assistants that merely simulate tool use, Claude can genuinely interact with external tools and APIs through MCP.
- **Local Filesystem Access**: Claude Desktop can access your local files through the filesystem MCP server, enabling it to work with your development environment.
- **Custom Tool Development**: The MCP framework makes it straightforward to develop custom tools for Claude, as demonstrated by this Perplexity integration.

### Claude's Technical Strengths

When working with code and technical content:

- **Accuracy in Code Generation**: Claude tends to produce more correct, production-ready code with fewer hallucinations compared to alternatives.
- **Contextual Understanding**: Claude better comprehends the nuances of complex technical requirements, particularly in software development scenarios.
- **Detailed Explanations**: Claude's responses typically include clear explanations of why certain approaches are taken, which is invaluable for learning and debugging.

### Knowledge and Reasoning

When it comes to information quality:

- **Nuanced Responses**: Claude is often better at acknowledging uncertainty and providing nuanced perspectives, which is valuable in research contexts.
- **Research Capabilities**: With the Perplexity integration described in this guide, Claude gains powerful real-time research abilities while maintaining its characteristic thoroughness and accuracy.
- **Long Context Window**: Claude's ability to work with extensive context means you can have long, complex development discussions without losing track.

### User Experience

From a user experience perspective:

- **Personality and Tone**: Many users find Claude's communication style more natural and helpful, especially for extended problem-solving sessions.
- **Interactive Development**: The combination of Claude's reasoning abilities and MCP tool integration creates a uniquely interactive development experience.
- **Learning Partnership**: Claude excels at adapting to your particular development style and needs, functioning more as a collaborative partner than a simple tool.

In summary, while other AI models offer impressive capabilities, Claude's combination of technical accuracy, thoughtful interface design, extensive context handling, and robust MCP implementation makes it particularly well-suited for developers looking to extend their AI assistant with custom tools like the Perplexity search integration described in this guide.

## Why Use WSL Instead of Windows Node.js

For running MCP servers on Windows, Windows Subsystem for Linux (WSL) is recommended over native Windows Node.js for several reasons:

1. **Path Handling**: WSL uses Unix-style paths, which are more compatible with Node.js packages that often assume Unix conventions.

2. **Stdin/Stdout Communication**: MCP relies on standard input/output streams for communication. WSL handles these streams more consistently than Windows environments.

3. **Environment Variable Management**: WSL provides a more predictable environment for handling environment variables, crucial for API keys.

4. **Package and Dependency Management**: Node.js packages often have better compatibility with Linux environments, especially those with native code components.

5. **Process Management**: WSL offers better signal handling and error propagation for long-running services.

6. **Integration with Linux Tools**: Many development tools used alongside Node.js are native to Linux environments.

## Prerequisites

- Windows 10 or later with WSL2 enabled
- Ubuntu or another Linux distribution installed through WSL
- A Perplexity API key (Sonar Pro)
- Claude Desktop application installed

## Installation

### Step 1: Set Up WSL

1. Install WSL if you haven't already:
   ```powershell
   # Run in PowerShell as Administrator
   wsl --install
   ```

2. Restart your computer if prompted

3. Complete the WSL distribution setup by creating a username and password

### Step 2: Install Node.js in WSL

1. Open your WSL terminal and install NVM (Node Version Manager):
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   ```

2. Close and reopen your terminal, then install Node.js:
   ```bash
   nvm install node
   ```

3. Verify the installation:
   ```bash
   node --version
   npm --version
   ```

### Step 3: Create the Perplexity MCP Server Project

1. Create and navigate to a project directory:
   ```bash
   mkdir ~/mcp-perplexity
   cd ~/mcp-perplexity
   ```

2. Initialize a Node.js project:
   ```bash
   npm init -y
   ```

3. Install required dependencies:
   ```bash
   npm install axios @modelcontextprotocol/sdk
   ```

4. Set the project type to module:
   ```bash
   # Add "type": "module" to package.json
   npm pkg set type=module
   ```

### Step 4: Create the Server Script

Create a file named `index.js` in your project directory with the following content:

```javascript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";

const PERPLEXITY_TOOL = {
  name: "perplexity_search",
  description: "Queries the Perplexity Sonar Pro API for detailed answers using natural language queries.",
  inputSchema: {
    type: "object",
    properties: {
      question: { type: "string", description: "The query to ask Perplexity." }
    },
    required: ["question"]
  }
};

const server = new Server(
  { name: "example-servers/perplexity", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
if (!PERPLEXITY_API_KEY) {
  console.error("Error: PERPLEXITY_API_KEY environment variable is required");
  process.exit(1);
}

const PERPLEXITY_ENDPOINT = "https://api.perplexity.ai/chat/completions";

async function performPerplexitySearch(question, systemPrompt = "Be precise and concise. Include citations for your sources.", model = "sonar-pro") {
  const payload = {
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: question }
    ]
  };
  
  const response = await axios.post(PERPLEXITY_ENDPOINT, payload, {
    headers: {
      "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
      "Content-Type": "application/json"
    }
  });
  
  const data = response.data;
  
  // Extract citations if available
  const formattedResponse = {
    content: data.choices[0]?.message?.content || "No response content",
    citations: []
  };
  
  // Look for citations in tool calls if available
  try {
    const toolCalls = data.choices[0]?.message?.tool_calls || [];
    for (const toolCall of toolCalls) {
      if (toolCall.function?.name === "citation" || toolCall.function?.name === "web_search") {
        try {
          const args = JSON.parse(toolCall.function.arguments);
          if (args.url && args.title) {
            formattedResponse.citations.push({
              url: args.url,
              title: args.title
            });
          }
        } catch (err) {
          console.error("Error parsing citation arguments:", err);
        }
      }
    }
  } catch (err) {
    console.error("Error processing citations:", err);
  }
  
  return formattedResponse;
}

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [PERPLEXITY_TOOL]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;
    if (name !== "perplexity_search") {
      return { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true };
    }
    
    if (!args || typeof args !== "object" || !("question" in args)) {
      throw new Error("Invalid arguments. Expected an object with a 'question' field.");
    }
    
    const result = await performPerplexitySearch(args.question);
    
    // Create response with main content and citations
    let responseText = result.content;
    
    // Add citations if available
    if (result.citations && result.citations.length > 0) {
      responseText += "\n\n## Sources\n";
      result.citations.forEach((citation, index) => {
        responseText += `${index + 1}. [${citation.title}](${citation.url})\n`;
      });
    }
    
    return { 
      content: [{ type: "text", text: responseText }], 
      isError: false 
    };
  } catch (error) {
    return { 
      content: [{ type: "text", text: "Error: " + (error instanceof Error ? error.message : String(error)) }], 
      isError: true 
    };
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Perplexity MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
```

Make the script executable:
```bash
chmod +x index.js
```

## Configuration

### Step 1: Find Your WSL Paths

1. Determine your Node.js path in WSL:
   ```bash
   which node
   ```
   This will return something like `/home/username/.nvm/versions/node/v18.12.1/bin/node`

2. Note the full path to your Perplexity script:
   ```bash
   echo "$HOME/mcp-perplexity/index.js"
   ```

### Step 2: Configure Claude Desktop

1. Locate the Claude Desktop configuration file, typically at:
   ```
   %APPDATA%\Claude\claude_desktop_config.json
   ```
   You can access this by pressing Win+R and entering `%APPDATA%\Claude`

2. Edit the configuration file to include both your filesystem MCP (if already configured) and the new Perplexity MCP:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "wsl.exe",
      "args": [
        "bash",
        "-c",
        "/home/username/.nvm/versions/node/version/bin/node /home/username/.nvm/versions/node/version/lib/node_modules/@modelcontextprotocol/server-filesystem/dist/index.js /mnt/c/Users/Username/Documents /mnt/d"
      ]
    },
    "perplexity": {
      "command": "wsl.exe",
      "args": [
        "bash",
        "-c",
        "export PERPLEXITY_API_KEY='your_actual_api_key_here' && /home/username/.nvm/versions/node/version/bin/node /home/username/mcp-perplexity/index.js"
      ]
    }
  }
}
```

Replace:
- `username` with your WSL username
- `version` with your Node.js version (e.g., `v18.12.1`)
- `your_actual_api_key_here` with your Perplexity API key
- Adjust the paths to match your actual filesystem locations

### Step 3: Test the Setup

1. First, test your script manually in WSL:
   ```bash
   cd ~/mcp-perplexity
   PERPLEXITY_API_KEY='your_actual_api_key_here' node index.js
   ```
   
   You should see output like: "Perplexity MCP Server running on stdio"

2. Completely close Claude Desktop (check your system tray for hidden instances)

3. Restart Claude Desktop

## Usage

Once set up, you can use the Perplexity integration with Claude in several ways:

1. **Direct Query**: Ask Claude to use Perplexity to answer a question
   ```
   Can you use the Perplexity search to tell me about recent developments in fusion energy?
   ```

2. **Research Assistance**: Request research on specific topics
   ```
   I need information on climate change policies implemented in 2023. Can you search using Perplexity?
   ```

3. **Fact Checking**: Verify information using up-to-date sources
   ```
   Can you use Perplexity to check if there have been any breakthroughs in quantum computing this year?
   ```

When you make these requests, Claude will:
1. Ask for your permission to use the Perplexity tool
2. Send your query to the Perplexity API
3. Present the results with information and, when available, source citations

## Troubleshooting

### Common Issues and Solutions

1. **"Error: PERPLEXITY_API_KEY environment variable is required"**
   - Ensure the API key is correctly exported in the bash command
   - Check that there are no typos in your API key
   - Verify the API key is still valid by testing it directly

2. **"Cannot find module '@modelcontextprotocol/sdk/...'"**
   - Run `npm install @modelcontextprotocol/sdk` in your project directory
   - Check that your package.json has `"type": "module"`

3. **"Server disconnected" error in Claude Desktop**
   - Check the WSL terminal for error messages when Claude tries to connect
   - Verify the paths in your configuration file
   - Ensure there are no syntax errors in your configuration JSON
   - Try the debug command with echo to see if environment variables are set correctly:
     ```json
     "args": [
       "bash",
       "-c",
       "echo \"API Key exists: ${PERPLEXITY_API_KEY:+yes}\" >&2 && export PERPLEXITY_API_KEY='your_key' && node /path/to/script.js"
     ]
     ```

4. **JSON Syntax Errors**
   - Make sure there are no trailing commas in your configuration file
   - Validate your JSON using an online validator like jsonlint.com

5. **"Cannot connect to WSL" or similar Windows errors**
   - Ensure WSL is properly installed and running
   - Try running `wsl --status` in PowerShell to check

## Additional Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Perplexity API Documentation](https://docs.perplexity.ai/)
- [WSL Documentation](https://learn.microsoft.com/en-us/windows/wsl/)
- [Windows Subsystem for Linux Installation Guide](https://docs.microsoft.com/en-us/windows/wsl/install)
- [Node.js Documentation](https://nodejs.org/en/docs/)

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Claude Desktop by Anthropic
- Perplexity AI for their Sonar Pro API
- Microsoft for Windows Subsystem for Linux
- Contributors to the Model Context Protocol
