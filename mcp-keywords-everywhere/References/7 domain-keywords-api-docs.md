# Get Domain Keywords

## Endpoint
```
POST https://api.keywordseverywhere.com/v1/get_domain_keywords
```

Get a list of keywords that a domain ranks for.

**Note:** Each keyword result retrieved through this API endpoint consumes 2 credits.

## Authorization

Access to this API endpoint requires both an API key and a Gold or Platinum Plan subscription.

- **API Key:** Obtain your API key [here](https://keywordseverywhere.com).
- **Subscription:** Ensure you have an active Gold or Platinum Plan to use this feature.

## Example API Calls

### Bash
```bash
params=()
params+=('domain=example.com')
params+=('country=us')
params+=('num=5')
data=$(IFS='&' ; echo "${params[*]}")
curl -H 'Authorization: Bearer <YOUR_API_KEY>' -H 'Accept: application/json' --data "$data" 'https://api.keywordseverywhere.com/v1/get_domain_keywords'
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
| domain | **Type:** string<br>**Examples:**<br>- example.com<br>- example.org<br><br>The domain to get keywords for. |
| country | **Type:** string<br>**Examples:**<br>- us<br>- ca<br>- in<br><br>A country code of a supported country. |
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
| data | **Type:** array<br>The domain keywords data. |
| data.# | **Type:** object<br>A data object corresponding to a keyword result. |
| data.#.keyword | **Type:** string<br>**Example:** example<br>The keyword result. |
| data.#.estimated_monthly_traffic | **Type:** integer<br>**Example:** 1200<br>The amount of traffic this keyword brings to this domain for the selected country. |
| data.#.serp_position | **Type:** integer<br>**Example:** 12<br>The position of this domain in the SERP for this keyword. |
| credits_consumed | **Type:** integer<br>**Example:** 10<br>Amount of credits consumed by the request. |
| time_taken | **Type:** float<br>**Example:** 0.19<br>The time it took to execute the request in seconds. |

## Sample Success Response

```json
{
  "data": [
    {
      "keyword": "example",
      "estimated_monthly_traffic": 1200,
      "serp_position": 12
    },
    {
      "keyword": "domain",
      "estimated_monthly_traffic": 950,
      "serp_position": 12
    },
    {
      "keyword": "google csoportok",
      "estimated_monthly_traffic": 130,
      "serp_position": 18
    },
    {
      "keyword": "example website",
      "estimated_monthly_traffic": 73,
      "serp_position": 1
    },
    {
      "keyword": "example site",
      "estimated_monthly_traffic": 73,
      "serp_position": 1
    }
  ],
  "credits_consumed": 10,
  "time_taken": 0.19
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