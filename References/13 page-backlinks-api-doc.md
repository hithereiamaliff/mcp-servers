# Get Page Backlinks

**POST** `https://api.keywordseverywhere.com/v1/get_page_backlinks`

Get the top backlinks for a single webpage.

**Note:** Each backlink returned by this API endpoint consumes 1 credit.

## Authorization

Access to this API endpoint requires both an API key and a Gold or Platinum Plan subscription.

- **API Key:** Obtain your API key [here](https://keywordseverywhere.com/api/).
- **Subscription:** Ensure you have an active Gold or Platinum Plan to use this feature.

## Request Query Parameters

| Name | Description |
|------|-------------|
| page | **Type:** string<br>**Examples:**<br>- `https://example.com/`<br>- `https://example.org/`<br>The webpage to get backlinks for. |
| num | **Type:** integer<br>**Range:** 1 to 10,000<br>**Examples:**<br>- `5`<br>- `100`<br>- `10000`<br>The maximum number of backlinks to return. |

## Response HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | A successful request |
| 400 | Submitted request data is invalid |
| 401 | API key is missing or is invalid |
| 402 | Account has an invalid subscription or insufficient credits |

## Example API Calls

### Bash

```bash
params=()
params+=('page=https://example.com/')
params+=('num=5')
data=$(IFS='&' ; echo "${params[*]}")
curl -H 'Authorization: Bearer <YOUR_API_KEY>' -H 'Accept: application/json' --data "$data" 'https://api.keywordseverywhere.com/v1/get_page_backlinks'
```

## Success Response Fields

| Name | Description |
|------|-------------|
| data | **Type:** array<br>The results data. |
| data.# | **Type:** object<br>A data object corresponding to a page with a backlink. |
| data.#.anchor_text | **Type:** string<br>**Example:** example.com<br>The anchor text of the link |
| data.#.domain_source | **Type:** string<br>**Example:** reddit.com<br>The domain where the link is placed |
| data.#.domain_target | **Type:** string<br>**Example:** example.com<br>The domain which is being linked |
| data.#.url_source | **Type:** string<br>**Example:** https://www.reddit.com/r/dns/comments/1an8jx0/bind_reverse_lookup_failing<br>The URL where the link is placed |
| data.#.url_target | **Type:** string<br>**Example:** https://example.com<br>The URL which is being linked |
| credits_consumed | **Type:** integer<br>**Example:** 5<br>Amount of credits consumed by the request. |
| time_taken | **Type:** float<br>**Example:** 0.98<br>The time it took to execute the request in seconds. |

## Sample Success Response

```json
{
  "data": [
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
    },
    {
      "anchor_text": "",
      "domain_source": "reddit.com",
      "domain_target": "example.com",
      "url_source": "https://www.reddit.com/user/adambard",
      "url_target": "https://example.com"
    }
  ],
  "credits_consumed": 5,
  "time_taken": 0.98
}
```

## Sample Error Responses

### Sample Unauthorized Response

```json
{
  "message": "401 Missing Or Invalid API Key"
}
```

### Sample Subscription Required Response

```json
{
  "message": "402 Subscription Required",
  "description": "A valid subscription is required to access this resource."
}
```

### Sample Gold or Platinum Subscription Required Response

```json
{
  "message": "402 Gold or Platinum subscription required",
  "description": "A Gold or Platinum Plan subscription is required to access this resource."
}
```

### Sample Insufficient Credits Response

```json
{
  "message": "402 Insufficient Credits",
  "description": "You do not have sufficient credits to complete this request."
}
```