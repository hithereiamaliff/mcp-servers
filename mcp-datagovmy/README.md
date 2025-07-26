# Malaysia Open Data MCP

A Model Context Protocol (MCP) server for accessing Malaysia's Open Data APIs, providing easy access to government datasets, weather information, and public transportation data.

## Features

- Access to Data Catalogue and OpenDOSM datasets
- Real-time weather forecasts and warnings
- Public transportation data (GTFS)
- Built-in rate limiting and error handling
- Support for all query parameters provided by the Malaysia Open Data API

## Available Tools

### Data Catalogue Tools

- `list_datasets`: List available datasets in the Data Catalogue
- `get_dataset`: Get data from a specific dataset with filtering options
- `search_datasets`: Search across datasets by keywords

### OpenDOSM Tools

- `list_dosm_datasets`: List available DOSM datasets
- `get_dosm_dataset`: Get data from a specific DOSM dataset with filtering

### Weather Tools

- `get_weather_forecast`: Get 7-day weather forecast with location filtering
- `get_weather_warnings`: Get current weather warnings
- `get_earthquake_warnings`: Get earthquake warnings

### Transport Tools

- `list_transport_agencies`: List available transport agencies
- `get_transport_data`: Get GTFS data for a specific agency

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/datagovmy-mcp.git
cd datagovmy-mcp

# Install dependencies
npm install
```

## Development

```bash
# Start the MCP server in development mode
npm run dev

# Build the MCP server for production
npm run build
```

## Smithery Integration

This MCP server is designed to work with Smithery's playground. When running locally, you can access the playground at:

```
https://smithery.ai/playground?mcp=https://<your-ngrok-id>.ngrok.smithery.ai/mcp
```

Alternatively, you can deploy this MCP server to Smithery's cloud platform for more stable access.

## Environment Variables

Create a `.env` file in the root directory with the following variables (optional):

```
# API Token (optional)
API_TOKEN=your_api_token_here
```

## Troubleshooting

### Windows ESM URL Scheme Error

If you encounter the following error on Windows:

```
Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader.
```

This is a known issue with Smithery CLI on Windows. The server should still start successfully despite this error.

### Connection Error in Playground

If you see "Error initializing server" in the Smithery playground, ensure that:

1. Your MCP server is exporting a function that returns an object with a `connect()` method
2. The `connect()` method returns all the tools
3. The server is running and accessible from the internet

## License

MIT
```

## Build

```bash
# Build the MCP server
npm run build
```

## Usage Examples

### Get Fuel Price Data

```javascript
// Get fuel price data with a limit of 5 records
get_dataset({
  id: "fuelprice",
  limit: 5
})
```

### Get Weather Forecast for Kuala Lumpur

```javascript
// Get weather forecast for Kuala Lumpur
get_weather_forecast({
  location: "Kuala Lumpur",
  limit: 7
})
```

### Get KTMB Transport Data

```javascript
// Get KTMB transport data
get_transport_data({
  agencyId: "ktmb",
  dataType: "static"
})
```

### Search for Economic Datasets

```javascript
// Search for datasets related to economy
search_datasets({
  query: "economy",
  limit: 10
})
```

## API Rate Limits

The Malaysia Open Data API has rate limits that vary based on whether you are using an API token or not. This MCP server implements automatic rate limiting to respect these limits:

- Default: 5 requests per minute
- Minimum interval between requests: 12 seconds

## Authentication

The Malaysia Open Data API can be used with or without an API token. To use an API token, create a `.env` file in the root directory with the following content:

```
API_TOKEN=your_api_token_here
```

To request an API token, send an email to [dataterbuka@jdn.gov.my](mailto:dataterbuka@jdn.gov.my) with your name, email address, and reason for requesting an increased rate limit.

## License

MIT

## Acknowledgments

- [Malaysia Open Data Portal](https://data.gov.my/)
- [Department of Statistics Malaysia](https://open.dosm.gov.my/)
- [Malaysian Meteorological Department](https://www.met.gov.my/)
- [Smithery](https://smithery.ai/) for the MCP framework
