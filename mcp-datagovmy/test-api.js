/**
 * Malaysia Open Data MCP - API Test Script
 * 
 * This script tests the API clients to ensure they're working correctly.
 */

// Import API clients
const { createCatalogueClient } = require('./src/api/catalogue');
const { createDosmClient } = require('./src/api/dosm');
const { createWeatherClient } = require('./src/api/weather');
const { createTransportClient } = require('./src/api/transport');

// Create API clients
const catalogueClient = createCatalogueClient();
const dosmClient = createDosmClient();
const weatherClient = createWeatherClient();
const transportClient = createTransportClient();

// Test functions
async function testCatalogueAPI() {
  console.log('Testing Data Catalogue API...');
  try {
    const datasets = await catalogueClient.listDatasets({ limit: 5 });
    console.log('Datasets:', JSON.stringify(datasets, null, 2));
    return true;
  } catch (error) {
    console.error('Error testing Data Catalogue API:', error.message);
    return false;
  }
}

async function testDosmAPI() {
  console.log('Testing OpenDOSM API...');
  try {
    const datasets = await dosmClient.listDatasets({ limit: 5 });
    console.log('DOSM Datasets:', JSON.stringify(datasets, null, 2));
    return true;
  } catch (error) {
    console.error('Error testing OpenDOSM API:', error.message);
    return false;
  }
}

async function testWeatherAPI() {
  console.log('Testing Weather API...');
  try {
    const forecast = await weatherClient.getForecast({ location: 'Kuala Lumpur' });
    console.log('Weather Forecast:', JSON.stringify(forecast, null, 2));
    return true;
  } catch (error) {
    console.error('Error testing Weather API:', error.message);
    return false;
  }
}

async function testTransportAPI() {
  console.log('Testing Transport API...');
  try {
    const agencies = await transportClient.listAgencies();
    console.log('Transport Agencies:', JSON.stringify(agencies, null, 2));
    return true;
  } catch (error) {
    console.error('Error testing Transport API:', error.message);
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('Starting API tests...');
  
  const results = await Promise.allSettled([
    testCatalogueAPI(),
    testDosmAPI(),
    testWeatherAPI(),
    testTransportAPI()
  ]);
  
  console.log('\nTest Results:');
  console.log('Catalogue API:', results[0].status === 'fulfilled' ? 'PASS' : 'FAIL');
  console.log('OpenDOSM API:', results[1].status === 'fulfilled' ? 'PASS' : 'FAIL');
  console.log('Weather API:', results[2].status === 'fulfilled' ? 'PASS' : 'FAIL');
  console.log('Transport API:', results[3].status === 'fulfilled' ? 'PASS' : 'FAIL');
}

// Run the tests
runTests().catch(error => {
  console.error('Error running tests:', error);
});
