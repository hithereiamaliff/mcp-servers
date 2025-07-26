# Get Related Keywords

## Endpoint
```
POST https://api.keywordseverywhere.com/v1/get_related_keywords
```

Obtain a list of related keywords based on your provided seed keyword.

**Note:** Each keyword result retrieved through this API endpoint consumes 2 credits.

## Authorization

Access to this API endpoint requires both an API key and a Gold or Platinum Plan subscription.

- **API Key:** Obtain your API key [here](https://keywordseverywhere.com).
- **Subscription:** Ensure you have an active Gold or Platinum Plan to use this feature.

## Example API Calls

### Bash
```bash
params=()
params+=("keyword=$(echo -e 'climate change' | iconv -t utf-8)") # For shells not using UTF-8, ensure that your input data is encoded in UTF-8.
params+=('num=5')
data=$(IFS='&' ; echo "${params[*]}")
curl -H 'Authorization: Bearer <YOUR_API_KEY>' -H 'Accept: application/json' --data "$data" 'https://api.keywordseverywhere.com/v1/get_related_keywords'
```

### PHP
*Example code would appear here*

### Laravel
*Example code would appear here*

### Java
*Example code would appear here*

### Python
*Example code would appear here*

### Ruby
*Example code would appear here*

### NodeJs
*Example code would appear here*

### R
*Example code would appear here*

## Request Query Parameters

| Name | Description |
|------|-------------|
| keyword | **Type:** string<br>**Examples:**<br>- climate change<br>- best keyword tool<br><br>A UTF-8 encoded keyword to get data for. |
| num | **Type:** integer<br>**Range:** 1 to 10,000<br>**Examples:**<br>- 5<br>- 100<br>- 10000<br><br>Specifies the maximum number of results to return. |

## Response HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | A successful request |
| 400 | Submitted request data is invalid |
| 401 | API key is missing or is invalid |
| 402 | Account has an invalid subscription or insufficient credits |

## Success Response Fields

| Name | Description |
|------|-------------|
| data | **Type:** array<br>The related keywords data |
| data.# | **Type:** string<br>**Example:** climate change consequences<br>A related keyword result. |
| credits_consumed | **Type:** integer<br>**Example:** 10<br>Amount of credits consumed by the request. |
| time_taken | **Type:** float<br>**Example:** 0.01<br>The time it took to execute the request in seconds. |

## Sample Success Response

```json
{
  "data": [
    "climate change consequences",
    "climate change simple definition",
    "climate change pdf",
    "climate change definition pdf",
    "climate change traduction"
  ],
  "credits_consumed": 10,
  "time_taken": 0.01
}
```

## Sample Unauthorized Response

```json
{
  "message": "401 Missing Or Invalid API Key"
}
```

## Sample Subscription Required Response

```json
{
  "message": "402 Subscription Required",
  "description": "A valid subscription is required to access this resource."
}
```

## Sample Gold or Platinum Subscription Required Response

```json
{
  "message": "402 Gold or Platinum subscription required",
  "description": "A Gold or Platinum Plan subscription is required to access this resource."
}
```

## Sample Insufficient Credits Response

```json
{
  "message": "402 Insufficient Credits",
  "description": "You do not have sufficient credits to complete this request."
}
```