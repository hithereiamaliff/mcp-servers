# Get Countries

## Endpoint
```
GET https://api.keywordseverywhere.com/v1/countries
```

Get a list of the countries supported by the API.

## Authorization

You need an API key to access this API endpoint. [Get your API key here](https://keywordseverywhere.com).

## Example API Calls

### Bash
```bash
curl -H "Authorization: Bearer <YOUR_API_KEY>" -H "Accept: application/json" "https://api.keywordseverywhere.com/v1/countries"
```

### PHP
*Example code would appear here*

### Java
*Example code would appear here*

### Python
*Example code would appear here*

### Ruby
*Example code would appear here*

## Request Query Parameters

This endpoint takes no parameters.

## Response HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | A successful request |
| 401 | API key is missing or is invalid |

## Success Response Fields

The response is a JSON object of country names indexed by the country code.

## Sample Success Response

```json
{
  "": "Global",
  "au": "Australia",
  "ca": "Canada",
  "in": "India",
  "nz": "New Zealand",
  "za": "South Africa",
  "uk": "United Kingdom",
  "us": "United States"
}
```
