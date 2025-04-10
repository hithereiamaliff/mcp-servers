# Get URL Traffic Metrics

## Endpoint
```
POST https://api.keywordseverywhere.com/v1/get_url_traffic_metrics
```

Get the traffic metrics for a list of URLs.

**Note:** Each URL sent to this API endpoint consumes 2 credits.

## Authorization

Access to this API endpoint requires both an API key and a Gold or Platinum Plan subscription.

- **API Key:** Obtain your API key [here](https://keywordseverywhere.com).
- **Subscription:** Ensure you have an active Gold or Platinum Plan to use this feature.

## Example API Calls

### Bash
```bash
params=()
params+=('urls[]=https://example.com/')
params+=('urls[]=https://example.org/')
params+=('country=us')
data=$(IFS='&' ; echo "${params[*]}")
curl -H 'Authorization: Bearer <YOUR_API_KEY>' -H 'Accept: application/json' --data "$data" 'https://api.keywordseverywhere.com/v1/get_url_traffic_metrics'
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
| urls[] | **Type:** array of strings<br>**Examples:**<br>- https://example.com/<br>- https://example.org/<br><br>The URLs to get metrics for. |
| country | **Type:** string<br>**Examples:**<br>- us<br>- ca<br>- in<br><br>A country code of a supported country. |

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
| data | **Type:** array<br>The results data. |
| data.# | **Type:** object<br>A data object corresponding to an input URL. |
| data.#.url | **Type:** string<br>**Example:** https://example.com/<br>The input URL. |
| data.#.estimated_monthly_traffic | **Type:** integer<br>**Example:** 3100<br>The amount of traffic this URL gets from visitors from the selected country. |
| data.#.total_ranking_keywords | **Type:** integer<br>**Example:** 421<br>The total number of keywords that this URL ranks for in the top 30 positions. |
| credits_consumed | **Type:** integer<br>**Example:** 4<br>Amount of credits consumed by the request. |
| time_taken | **Type:** float<br>**Example:** 0.06<br>The time it took to execute the request in seconds. |

## Sample Success Response

```json
{
  "data": [
    {
      "url": "https://example.com/",
      "estimated_monthly_traffic": 3100,
      "total_ranking_keywords": 421
    },
    {
      "url": "https://example.org/",
      "estimated_monthly_traffic": 27,
      "total_ranking_keywords": 1
    }
  ],
  "credits_consumed": 4,
  "time_taken": 0.06
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