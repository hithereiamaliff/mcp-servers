# Malaysia Open Data MCP Development Plan

## Table of Contents
- [Understanding Malaysia's Open Data API](#understanding-malaysias-open-data-api)
  - [Core Components](#core-components)
  - [Available APIs](#available-apis)
  - [Query Parameters](#query-parameters)
  - [Response Format](#response-format)
- [Reference: Singapore's Gahmen MCP](#reference-singapores-gahmen-mcp)
  - [Overview](#overview)
  - [Features](#features)
  - [Available Tools](#available-tools)
- [Malaysia Open Data MCP Development Plan](#malaysia-open-data-mcp-development-plan-1)
  - [Proposed MCP Structure and Tools](#proposed-mcp-structure-and-tools)
  - [Implementation Approach](#implementation-approach)
  - [Technical Considerations](#technical-considerations)
  - [Example Implementation Structure](#example-implementation-structure)
  - [Next Steps](#next-steps)

## Understanding Malaysia's Open Data API

### Core Components

1. **Base Structure**: 
   - Malaysia's Open Data API is a RESTful API built using the Django framework
   - Designed to provide transparent data access to all citizens
   - Goals include transparent data access, ease of use, and diverse data sets

2. **Base URL**: 
   - All API requests use `https://api.data.gov.my` as the base URL
   - Specific endpoints are appended to this base URL

3. **Authentication**: 
   - The API can be used with or without an API token
   - Tokens provide higher rate limits and are available upon request
   - To request a token, email dataterbuka@jdn.gov.my with:
     - Your name
     - Your email address
     - Reason for requesting an increased rate limit
   - Authentication header format: `Authorization: Token <YOUR_TOKEN_HERE>`

4. **Rate Limits**: 
   - Different rate limits apply based on whether you're using an API token or not
   - If limits are exceeded, a 429 Too Many Requests error is returned

### Available APIs

1. **Static APIs**:
   - **Data Catalogue API**: 
     - Endpoint: `https://api.data.gov.my/data-catalogue`
     - Required parameter: `id` (dataset identifier)
     - Example: `https://api.data.gov.my/data-catalogue?id=fuelprice`
     - Provides access to various datasets in the data catalogue
     - Dataset IDs can be found on the [Data Catalogue page](https://data.gov.my/data-catalogue)

   - **OpenDOSM API**: 
     - Endpoint: `https://api.data.gov.my/opendosm`
     - Required parameter: `id` (dataset identifier)
     - Example: `https://api.data.gov.my/opendosm?id=cpi_core`
     - Provides access to Department of Statistics Malaysia data
     - Dataset IDs can be found on the [OpenDOSM Data Catalogue page](https://open.dosm.gov.my/data-catalogue)

2. **Realtime APIs**:
   - **Weather API**: 
     - Endpoints:
       - 7-day forecast: `https://api.data.gov.my/weather/forecast`
       - Weather warnings: `https://api.data.gov.my/weather/warning`
       - Earthquake warnings: `https://api.data.gov.my/weather/warning/earthquake`
     - Data source: Malaysian Meteorological Department (MET Malaysia)
     - Update frequency:
       - 7-day forecast: Updated daily
       - Warning data: Updated when required

   - **Transport API (GTFS Static)**: 
     - Endpoint: `https://api.data.gov.my/gtfs-static/<agency>`
     - Provides standardized public transportation schedules and geographic information
     - Available agencies:
       - myBAS Johor Bahru: Bus service in Johor Bahru
       - KTMB: Railway operator across Malaysia
       - Prasarana: Operator of LRT, MRT, monorail, and bus services
     - Update frequency:
       - myBAS Johor Bahru: As required
       - Prasarana: As required
       - KTMB: Daily at 00:01:00

   - **Transport API (GTFS Realtime)**: 
     - Provides real-time updates to public transportation data

### Query Parameters

The API supports various filtering options:

1. **Row-level filtering**:
   - `filter`: Case-sensitive exact string match
     - Format: `?filter=<value>@<column>` or `?filter=<value_1>@<column_1>,<value_2>@<column_2>,...`
   
   - `ifilter`: Case-insensitive exact string match
     - Format: `?ifilter=<value>@<column>`
   
   - `contains`: Case-sensitive partial string match
     - Format: `?contains=<value>@<column>`
   
   - `icontains`: Case-insensitive partial string match
     - Format: `?icontains=<value>@<column>`
   
   - `range`: Filter by numerical range
     - Format: `?range=<column>[<begin>:<end>]`
   
   - `date_start`/`date_end`: Filter by date range
     - Format: `?date_start=<YYYY-MM-DD>@<date_column>` and `?date_end=<YYYY-MM-DD>@<date_column>`
   
   - `timestamp_start`/`timestamp_end`: Filter by timestamp range
     - Format: `?timestamp_start=<YYYY-MM-DD HH:MM:SS>@<timestamp_column>` and `?timestamp_end=<YYYY-MM-DD HH:MM:SS>@<timestamp_column>`

2. **Result manipulation**:
   - `sort`: Sort results by specified columns
     - Format: `?sort=<column>` or `?sort=<column1>,<column2>,...`
     - Prefix column with `-` for descending order (e.g., `-column`)
   
   - `limit`: Limit number of records returned
     - Format: `?limit=<value>`

3. **Column-level filtering**:
   - `include`: Specify which columns to include
     - Format: `?include=<column1,column2,...>`
   
   - `exclude`: Specify which columns to exclude
     - Format: `?exclude=<column1,column2,...>`
   - Note: When both are provided, `include` takes precedence

### Response Format

1. **Successful Responses**:
   - Status code: 200 OK
   - Default format: List of records
   - With `meta=true` parameter:
     ```json
     {
       "meta": {...},
       "data": [...]
     }
     ```
     - `meta`: Basic information about the requested resource
     - `data`: Collection of requested records

2. **Error Responses**:
   - Format:
     ```json
     {
       "status": <int>,
       "errors": [...]
     }
     ```
     - `status`: Response code corresponding to the error
     - `errors`: Error messages or descriptions

## Reference: Singapore's Gahmen MCP

### Overview

The Gahmen MCP provides a Model Context Protocol server for Singapore's data.gov.sg APIs, making government datasets easily accessible through AI systems.

### Features

- Access to data.gov.sg collections and datasets
- Search functionality within datasets using CKAN datastore API
- Dataset download with filtering support
- Built-in rate limiting (5 requests per minute, 12-second minimum interval)
- No authentication required (data.gov.sg APIs are public)

### Available Tools

1. **Collections**:
   - `list_collections`: List all collections on data.gov.sg
   - `get_collection`: Get metadata for a specific collection

2. **Datasets**:
   - `list_datasets`: List all datasets on data.gov.sg
   - `get_dataset_metadata`: Get metadata for a specific dataset
   - `search_dataset`: Search for data within a dataset using CKAN datastore
   - `initiate_download`: Start downloading a dataset with optional filtering
   - `poll_download`: Check download status and get download URL

3. **Usage Examples**:
   ```javascript
   // Search population data
   search_dataset({
     resource_id: "d_8b84c4ee58e3cfc0ece0d773c8ca6abc",
     q: { "year": "2023" },
     limit: 10
   })
   
   // Get collection 522 with all dataset metadata
   get_collection({
     collectionId: "522",
     withDatasetMetadata: true
   })
   ```

## Malaysia Open Data MCP Development Plan

Based on both the Malaysia Open Data API and the Gahmen MCP reference, here's our plan for developing an MCP for Malaysia's Open Data:

### Proposed MCP Structure and Tools

1. **Data Catalogue Tools**:
   - `list_datasets`: List available datasets in the Data Catalogue
   - `get_dataset`: Get data from a specific dataset with filtering options
   - `search_datasets`: Search across datasets by keywords

2. **OpenDOSM Tools**:
   - `list_dosm_datasets`: List available DOSM datasets
   - `get_dosm_dataset`: Get data from a specific DOSM dataset with filtering

3. **Weather Tools**:
   - `get_weather_forecast`: Get 7-day weather forecast with location filtering
   - `get_weather_warnings`: Get current weather warnings
   - `get_earthquake_warnings`: Get earthquake warnings

4. **Transport Tools**:
   - `list_transport_agencies`: List available transport agencies
   - `get_transport_data`: Get GTFS data for a specific agency

5. **General Tools**:
   - `search_all`: Search across all available datasets

### Implementation Approach

1. **Setup MCP Server**:
   - Use Smithery CLI for development and building
   - Structure the project with clear separation of concerns

2. **API Integration**:
   - Create wrapper functions for Malaysia Open Data API endpoints
   - Implement proper error handling and rate limiting
   - Support authentication for higher rate limits

3. **Query Parameter Handling**:
   - Create helper functions to build query parameters
   - Support all filtering options provided by the API

4. **Response Processing**:
   - Parse and format API responses for MCP consumption
   - Handle pagination and large result sets

5. **Documentation**:
   - Provide clear documentation for each tool
   - Include usage examples

### Technical Considerations

1. **Rate Limiting**:
   - Implement rate limiting to respect API quotas
   - Consider different limits for authenticated vs. unauthenticated requests

2. **Caching**:
   - Implement caching for frequently accessed data
   - Respect data update frequencies

3. **Error Handling**:
   - Provide meaningful error messages
   - Implement retries for transient failures

4. **Authentication**:
   - Support API token authentication
   - Store tokens securely

### Example Implementation Structure

```
/
├── src/
│   ├── index.js            # Main entry point
│   ├── tools/              # MCP tools implementation
│   │   ├── catalogue.js    # Data Catalogue tools
│   │   ├── dosm.js         # OpenDOSM tools
│   │   ├── weather.js      # Weather tools
│   │   └── transport.js    # Transport tools
│   ├── api/                # API client implementations
│   │   ├── client.js       # Base API client
│   │   ├── catalogue.js    # Data Catalogue API
│   │   ├── dosm.js         # OpenDOSM API
│   │   ├── weather.js      # Weather API
│   │   └── transport.js    # Transport API
│   └── utils/              # Utility functions
│       ├── rate-limiter.js # Rate limiting
│       ├── query-builder.js # Query parameter builder
│       └── response-parser.js # Response parsing
├── package.json
└── README.md
```

### Next Steps

1. Set up the development environment with Smithery CLI
2. Create the base API client with rate limiting
3. Implement the Data Catalogue tools as a starting point
4. Expand to other APIs (OpenDOSM, Weather, Transport)
5. Test thoroughly with various query parameters
6. Document the MCP and provide usage examples
