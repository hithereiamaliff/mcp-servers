/**
 * Query Parameter Builder for Malaysia Open Data API
 * 
 * Utility functions to build query parameters for API requests
 * based on the Malaysia Open Data API query syntax.
 */

/**
 * Builds query parameters for API requests
 * 
 * @param {Object} params - Parameters to build query from
 * @returns {Object} - Formatted query parameters
 */
function buildQueryParams(params = {}) {
  const queryParams = {};
  
  // Handle dataset ID
  if (params.id) {
    queryParams.id = params.id;
  }
  
  // Handle filter parameters
  if (params.filter) {
    queryParams.filter = formatFilterParam(params.filter);
  }
  
  if (params.ifilter) {
    queryParams.ifilter = formatFilterParam(params.ifilter);
  }
  
  if (params.contains) {
    queryParams.contains = formatFilterParam(params.contains);
  }
  
  if (params.icontains) {
    queryParams.icontains = formatFilterParam(params.icontains);
  }
  
  // Handle range parameter
  if (params.range) {
    if (typeof params.range === 'object') {
      const { column, begin, end } = params.range;
      queryParams.range = `${column}[${begin ?? ''}:${end ?? ''}]`;
    } else {
      queryParams.range = params.range;
    }
  }
  
  // Handle sort parameter
  if (params.sort) {
    if (Array.isArray(params.sort)) {
      queryParams.sort = params.sort.join(',');
    } else {
      queryParams.sort = params.sort;
    }
  }
  
  // Handle date parameters
  if (params.date_start) {
    queryParams.date_start = formatDateParam(params.date_start);
  }
  
  if (params.date_end) {
    queryParams.date_end = formatDateParam(params.date_end);
  }
  
  // Handle timestamp parameters
  if (params.timestamp_start) {
    queryParams.timestamp_start = formatTimestampParam(params.timestamp_start);
  }
  
  if (params.timestamp_end) {
    queryParams.timestamp_end = formatTimestampParam(params.timestamp_end);
  }
  
  // Handle limit parameter
  if (params.limit !== undefined) {
    queryParams.limit = params.limit;
  }
  
  // Handle include/exclude parameters
  if (params.include) {
    if (Array.isArray(params.include)) {
      queryParams.include = params.include.join(',');
    } else {
      queryParams.include = params.include;
    }
  }
  
  if (params.exclude) {
    if (Array.isArray(params.exclude)) {
      queryParams.exclude = params.exclude.join(',');
    } else {
      queryParams.exclude = params.exclude;
    }
  }
  
  // Handle meta parameter
  if (params.meta !== undefined) {
    queryParams.meta = params.meta.toString();
  }
  
  return queryParams;
}

/**
 * Formats filter parameters (filter, ifilter, contains, icontains)
 * 
 * @param {Object|string} filter - Filter configuration
 * @returns {string} - Formatted filter parameter
 */
function formatFilterParam(filter) {
  if (typeof filter === 'string') {
    return filter;
  }
  
  if (typeof filter === 'object') {
    return Object.entries(filter)
      .map(([column, value]) => `${value}@${column}`)
      .join(',');
  }
  
  return filter;
}

/**
 * Formats date parameters (date_start, date_end)
 * 
 * @param {Object|string} dateParam - Date parameter configuration
 * @returns {string} - Formatted date parameter
 */
function formatDateParam(dateParam) {
  if (typeof dateParam === 'string') {
    return dateParam;
  }
  
  if (typeof dateParam === 'object') {
    const { date, column } = dateParam;
    return `${date}@${column}`;
  }
  
  return dateParam;
}

/**
 * Formats timestamp parameters (timestamp_start, timestamp_end)
 * 
 * @param {Object|string} timestampParam - Timestamp parameter configuration
 * @returns {string} - Formatted timestamp parameter
 */
function formatTimestampParam(timestampParam) {
  if (typeof timestampParam === 'string') {
    return timestampParam;
  }
  
  if (typeof timestampParam === 'object') {
    const { timestamp, column } = timestampParam;
    return `${timestamp}@${column}`;
  }
  
  return timestampParam;
}

module.exports = {
  buildQueryParams
};
