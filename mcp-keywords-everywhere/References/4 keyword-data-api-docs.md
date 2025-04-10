# Get Keyword Data

## Endpoint
```
POST https://api.keywordseverywhere.com/v1/get_keyword_data
```

Get Volume, CPC and competition for a set of keywords. Also returns the amount of credits left in the account.

**Note:** Each keyword result retrieved through this API endpoint consumes 1 credit.

## Authorization

You need an API key to access this API endpoint. [Get your API key here](https://keywordseverywhere.com).

## Example API Calls

### Bash
```bash
params=()
params+=('kw[]=keywords tool')
params+=('kw[]=keyword planner')
params+=("kw[]=$(echo -e 'brésil' | iconv -t utf-8)") # For shells not using UTF-8, ensure that your input data is encoded in UTF-8.
params+=('country=us')
params+=('currency=usd')
params+=('dataSource=gkp')
data=$(IFS='&' ; echo "${params[*]}")
curl -H 'Authorization: Bearer <YOUR_API_KEY>' -H 'Accept: application/json' --data "$data" 'https://api.keywordseverywhere.com/v1/get_keyword_data'
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

### Postman
*Example code would appear here*

### Google Sheets
*Example code would appear here*

## Request Query Parameters

| Name | Description |
|------|-------------|
| kw[] | **Type:** array of strings<br>**Examples:**<br>- keywords tool<br>- keyword planner<br>- brésil<br><br>A UTF-8 encoded list of keywords to get data for. You can query up to 100 keywords at a time. |
| country | **Type:** string<br>**Examples:**<br>- us<br>- ca<br>- in<br><br>The country to get metrics for. If not specified, global data is shown. Get the full list of supported countries by calling the Get Countries endpoint. |
| currency | **Type:** string<br>**Examples:**<br>- usd<br>- gbp<br><br>The currency to use. The currencies endpoint returns a list of supported currencies. |
| dataSource | **Type:** string<br>**Available Options:**<br>- gkp<br>- cli<br><br>If `gkp` is chosen then we show data only from Google Keyword Planner. If `cli` is chosen then we show data from Google Keyword Planner & Clickstream data. |

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
| data | **Type:** array<br>The keyword data |
| data.# | **Type:** object<br>A data object corresponding to one input keyword. |
| data.#.vol | **Type:** integer<br>**Example:** 390<br>The volume of the keyword. |
| data.#.cpc | **Type:** object<br>The cost per click information of the keyword. |
| data.#.cpc.currency | **Type:** string<br>**Example:** $<br>The currency of the cost per click value. |
| data.#.cpc.value | **Type:** string<br>**Example:** 5.51<br>The cost per click value of the keyword. |
| data.#.keyword | **Type:** string<br>**Example:** keywords tool<br>The input keyword. |
| data.#.competition | **Type:** float<br>**Example:** 0.33<br>The competition metric of the keyword. |
| data.#.trend | **Type:** array<br>The volume of the Keyword over the last 12 months. If the trend is not available, an empty array is returned. |
| data.#.trend.# | **Type:** object<br>Object containing the search volume information of the keyword for a given month. |
| data.#.trend.#.month | **Type:** string<br>**Example:** May<br>The month of this volume. |
| data.#.trend.#.year | **Type:** integer<br>**Example:** 2019<br>The year of this volume. |
| data.#.trend.#.value | **Type:** integer<br>**Example:** 480<br>The volume of the keyword for the given month. |
| credits | **Type:** integer<br>**Example:** 7999731<br>Account credit balance after the request. |
| credits_consumed | **Type:** integer<br>**Example:** 3<br>Amount of credits consumed by the request. |
| time | **Type:** float<br>**Example:** 0.0047<br>The time it took to execute the request in seconds. |

## Sample Success Response

```json
{
  "data": [
    {
      "vol": 390,
      "cpc": {
        "currency": "$",
        "value": "5.51"
      },
      "keyword": "keywords tool",
      "competition": 0.33,
      "trend": [
        {
          "month": "May",
          "year": 2019,
          "value": 480
        },
        {
          "month": "June",
          "year": 2019,
          "value": 480
        },
        {
          "month": "July",
          "year": 2019,
          "value": 390
        },
        {
          "month": "August",
          "year": 2019,
          "value": 480
        },
        {
          "month": "September",
          "year": 2019,
          "value": 390
        },
        {
          "month": "October",
          "year": 2019,
          "value": 390
        },
        {
          "month": "November",
          "year": 2019,
          "value": 320
        },
        {
          "month": "December",
          "year": 2019,
          "value": 480
        },
        {
          "month": "January",
          "year": 2020,
          "value": 390
        },
        {
          "month": "February",
          "year": 2020,
          "value": 390
        },
        {
          "month": "March",
          "year": 2020,
          "value": 480
        },
        {
          "month": "April",
          "year": 2020,
          "value": 480
        }
      ]
    },
    {
      "vol": 0,
      "cpc": {
        "currency": "$",
        "value": "0.00"
      },
      "keyword": "keyword planner",
      "competition": 0,
      "trend": []
    },
    {
      "vol": 0,
      "cpc": {
        "currency": "$",
        "value": "0.00"
      },
      "keyword": "brésil",
      "competition": 0,
      "trend": []
    }
  ],
  "credits": 7999731,
  "credits_consumed": 3,
  "time": 0.0047
}
```

## Sample Unauthorized Response

```json
{
  "message": "401 Missing Or Invalid API Key"
}
```

## Sample Insufficient Credits Response

```json
{
  "message": "402 Insufficient Credits"
}
```