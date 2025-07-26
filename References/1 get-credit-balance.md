# Get Credit Balance

## Endpoint
```
GET https://api.keywordseverywhere.com/v1/account/credits
```

Get your account's credit balance.

## Authorization

You need an API key to access this API endpoint. [Get your API key here](https://keywordseverywhere.com).

## Example API Calls

### Bash
```bash
curl -H "Authorization: Bearer <YOUR_API_KEY>" -H "Accept: application/json" "https://api.keywordseverywhere.com/v1/account/credits"
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

The response is an array containing the credit balance as the only element.

## Sample Success Response

```json
[
  95597755
]
```
