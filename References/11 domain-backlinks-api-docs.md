# Get Domain Backlinks

## Endpoint
```
POST https://api.keywordseverywhere.com/v1/get_domain_backlinks
```

Get the top backlinks for a single domain.

**Note:** Each backlink returned by this API endpoint consumes 1 credit.

## Authorization

Access to this API endpoint requires both an API key and a Gold or Platinum Plan subscription.

- **API Key:** Obtain your API key [here](https://keywordseverywhere.com).
- **Subscription:** Ensure you have an active Gold or Platinum Plan to use this feature.

## Example API Calls

### Bash
```bash
params=()
params+=('domain=example.com')
params+=('num=5')
data=$(IFS='&' ; echo "${params[*]}")
curl -H 'Authorization: Bearer <YOUR_API_KEY>' -H 'Accept: application/json' --data "$data" 'https://api.keywordseverywhere.com/v1/get_domain_backlinks'
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
| domain | **Type:** string<br>**Examples:**<br>- example.com<br>- example.org<br><br>The domain to get backlinks for. |
| num | **Type:** integer<br>**Range:** 1 to 10,000<br>**Examples:**<br>- 5<br>- 100<br>- 10000<br><br>The maximum number of backlinks to return. |

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
| data.# | **Type:** object<br>A data object corresponding to a domain with a backlink. |
| data.#.anchor_text | **Type:** string<br>**Example:** Hello World!<br>The anchor text of the link |
| data.#.domain_source | **Type:** string<br>**Example:** amazon.com<br>The domain where the link is placed |
| data.#.domain_target | **Type:** string<br>**Example:** example.com<br>The domain which is being linked |
| data.#.url_source | **Type:** string<br>**Example:** https://www.amazon.com/collectif/e/b07fpb9c3j<br>The URL where the link is placed |
| data.#.url_target | **Type:** string<br>**Example:** http://example.com<br>The URL which is being linked |
| credits_consumed | **Type:** integer<br>**Example:** 5<br>Amount of credits consumed by the request. |
| time_taken | **Type:** float<br>**Example:** 2.02<br>The time it took to execute the request in seconds. |

## Sample Success Response

```json
{
  "data": [
    {
      "anchor_text": "",
      "domain_source": "amazon.com",
      "domain_target": "example.com",
      "url_source": "https://www.amazon.com/collectif/e/b07fpb9c3j",
      "url_target": "http://example.com"
    },
    {
      "anchor_text": "example.com",
      "domain_source": "reddit.com",
      "domain_target": "example.com",
      "url_source": "https://www.reddit.com/r/dns/comments/1an8jx0/bind_reverse_lookup_failing",
      "url_target": "https://example.com"
    },
    {
      "anchor_text": "Hoopla!",
      "domain_source": "reddit.com",
      "domain_target": "example.com",
      "url_source": "https://www.reddit.com/user/therealadyjewel",
      "url_target": "https://example.com"
    },
    {
      "anchor_text": "example.com",
      "domain_source": "reddit.com",
      "domain_target": "example.com",
      "url_source": "https://www.reddit.com/r/webdev/comments/nr9rso/how_to_validate_forms_properly_some_useful_dos",
      "url_target": "https://example.com"
    },
    {
      "anchor_text": "link",
      "domain_source": "reddit.com",
      "domain_target": "example.com",
      "url_source": "https://www.reddit.com/r/reddit.com/wiki/markdown",
      "url_target": "https://example.com"
    }
  ],
  "credits_consumed": 5,
  "time_taken": 2.02
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