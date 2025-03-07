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

async function performPerplexitySearch(question, systemPrompt = "Be precise and concise. Include all sources as URLs at the end of your response.", model = "sonar-pro") {
  const payload = {
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: question + "\n\nIMPORTANT: Please include all source URLs as a numbered list at the end of your response." }
    ]
  };
  
  try {
    console.error("Calling Perplexity API with question:", question);
    const response = await axios.post(PERPLEXITY_ENDPOINT, payload, {
      headers: {
        "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json"
      }
    });
    
    // Log the structure of the response to understand what's available
    console.error("Response structure:", Object.keys(response.data));
    console.error("Choices structure:", Object.keys(response.data.choices[0] || {}));
    console.error("Message structure:", Object.keys(response.data.choices[0]?.message || {}));
    
    // Get the main content
    const mainContent = response.data.choices[0]?.message?.content || "";
    
    // Check if there are references in the response data
    if (response.data.choices[0]?.message?.tool_calls) {
      console.error("Tool calls found:", JSON.stringify(response.data.choices[0].message.tool_calls));
    }
    
    // If the content already contains source URLs (which is likely with our prompt),
    // we can just return it directly
    return mainContent;
  } catch (error) {
    console.error("Error calling Perplexity API:", error.response?.data || error.message);
    throw error;
  }
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
    
    // Parse the content to find any source URLs and format them nicely
    // This is a simpler approach that relies on Perplexity following our instruction
    // to include sources as a numbered list
    
    return { 
      content: [{ type: "text", text: result }], 
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