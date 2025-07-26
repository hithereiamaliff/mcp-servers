# Get Currencies

## Endpoint
```
GET https://api.keywordseverywhere.com/v1/currencies
```

Get a list of the currencies supported by the API.

## Authorization

You need an API key to access this API endpoint. [Get your API key here](https://keywordseverywhere.com).

## Example API Calls

### Bash
```bash
curl -H "Authorization: Bearer <YOUR_API_KEY>" -H "Accept: application/json" "https://api.keywordseverywhere.com/v1/currencies"
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

The response is a JSON object of currencies indexed by the currency code.

## Sample Success Response

```json
{
  "": "United States Dollar (Default)",
  "aed": "UAE Dirham (AED)",
  "all": "Albanian Lek (ALL)",
  "ang": "Neth Antilles Guilder (NAƒ)",
  "ars": "Argentine Peso ($)",
  "aud": "Australian Dollar ($)",
  "awg": "Aruba Florin (ƒ)",
  "bbd": "Barbados Dollar (BBD)",
  "bdt": "Bangladesh Taka (Tk)",
  "bgn": "Bulgarian Lev (лв)",
  "bhd": "Bahraini Dinar (BHD)",
  "bif": "Burundi Franc (FBu)",
  "bmd": "Bermuda Dollar (BD$)",
  "bnd": "Brunei Dollar (B$)",
  "bob": "Bolivian Boliviano (Bs)",
  "brl": "Brazilian Real (R$)",
  "bsd": "Bahamian Dollar (B$)",
  "btn": "Bhutan Ngultrum (Nu)",
  "bwp": "Botswana Pula (P)",
  "byr": "Belarus Ruble (Br)",
  "bzd": "Belize Dollar (BZ$)",
  "cad": "Canadian Dollar (C$)",
  "chf": "Swiss Franc (CHF)",
  "clp": "Chilean Peso ($)",
  "cny": "Chinese Yuan (¥)",
  "cop": "Colombian Peso ($)",
  "crc": "Costa Rica Colon (₡)",
  "cup": "Cuban Peso ($MN)",
  "cve": "Cape Verde Escudo (Esc)",
  "czk": "Czech Koruna (Kč)",
  "djf": "Djibouti Franc (Fdj)",
  "dkk": "Danish Krone (kr)",
  "dop": "Dominican Peso (RD$)",
  "dzd": "Algerian Dinar (دج)",
  "eek": "Estonian Kroon (EEK)",
  "egp": "Egyptian Pound (EGP)",
  "etb": "Ethiopian Birr (Br)",
  "eur": "Euro (€)",
  "fjd": "Fiji Dollar (FJ$)",
  "fkp": "Falkland Islands Pound (£)",
  "gbp": "British Pound (£)",
  "ghs": "Ghanaian Cedi (GHS)",
  "gmd": "Gambian Dalasi (D)",
  "gnf": "Guinea Franc (FG)",
  "gtq": "Guatemala Quetzal (Q)",
  "gyd": "Guyana Dollar (GY$)",
  "hkd": "Hong Kong Dollar (HK$)",
  "hnl": "Honduras Lempira (L)",
  "hrk": "Croatian Kuna (kn)",
  "huf": "Hungarian Forint (Ft)",
  "idr": "Indonesian Rupiah (Rp)",
  "ils": "Israeli Shekel (₪)",
  "inr": "Indian Rupee (Rs)",
  "iqd": "Iraqi Dinar (IQD)",
  "isk": "Iceland Krona (kr)",
  "jod": "Jordanian Dinar (JOD)",
  "jpy": "Japanese Yen (¥)",
  "kes": "Kenyan Shilling (KSh)",
  "kgs": "Kyrgyzstan Som (KGS)",
  "khr": "Cambodia Riel (KHR)",
  "kmf": "Comoros Franc (KMF)",
  "kpw": "North Korean Won (₩)",
  "krw": "Korean Won (₩)",
  "kwd": "Kuwaiti Dinar (KWD)",
  "kyd": "Cayman Islands Dollar ($)",
  "kzt": "Kazakhstan Tenge (KZT)",
  "lkr": "Sri Lanka Rupee (₨)",
  "mad": "Moroccan Dirham (MAD)",
  "mdl": "Moldovan Leu (MDL)",
  "mkd": "Macedonian Denar (MKD)",
  "mmk": "Myanmar Kyat (K)",
  "mnt": "Mongolian Tugrik (₮)",
  "mop": "Macau Pataca ($)",
  "mro": "Mauritania Ougulya (UM)",
  "mur": "Mauritius Rupee (₨)",
  "mvr": "Maldives Rufiyaa (Rf)",
  "mwk": "Malawi Kwacha (MK)",
  "mxn": "Mexican Peso ($)",
  "myr": "Malaysian Ringgit (RM)",
  "nad": "Namibian Dollar (N$)",
  "ngn": "Nigerian Naira (₦)",
  "nio": "Nicaragua Cordoba (C$)",
  "nok": "Norwegian Krone (kr)",
  "npr": "Nepalese Rupee (₨)",
  "nzd": "New Zealand Dollar ($)",
  "omr": "Omani Rial (OMR)",
  "pab": "Panama Balboa (B)",
  "pen": "Peruvian Nuevo Sol (PEN)",
  "pgk": "Papua New Guinea Kina (K)",
  "php": "Philippine Peso (₱)",
  "pkr": "Pakistani Rupee (Rs)",
  "pln": "Polish Zloty (zł)",
  "qar": "Qatar Rial (QAR)",
  "ron": "Romanian New Leu (L)",
  "rub": "Russian Rouble (руб)",
  "rwf": "Rwanda Franc (RF)",
  "sar": "Saudi Arabian Riyal (SAR)",
  "sbd": "Solomon Islands Dollar (SI$)",
  "scr": "Seychelles Rupee (SR)",
  "sdg": "Sudanese Pound (SDG)",
  "sek": "Swedish Krona (kr)",
  "sgd": "Singapore Dollar (S$)",
  "shp": "St Helena Pound (£)",
  "skk": "Slovak Koruna (Sk)",
  "sll": "Sierra Leone Leone (Le)",
  "sos": "Somali Shilling (So)",
  "std": "Sao Tome Dobra (Db)",
  "svc": "El Salvador Colon (₡)",
  "syp": "Syrian Pound (SYP)",
  "szl": "Swaziland Lilageni (SZL)",
  "thb": "Thai Baht (฿)",
  "tnd": "Tunisian Dinar (TND)",
  "top": "Tonga Paang (T$)",
  "try": "Turkish Lira (YTL)",
  "ttd": "Trinidad Tobago Dollar (TTD)",
  "twd": "Taiwan Dollar (NT$)",
  "tzs": "Tanzanian Shilling (x)",
  "ugx": "Ugandan Shilling (USh)",
  "usd": "United States Dollar ($)",
  "uyu": "Uruguayan New Peso (UYU)",
  "uzs": "Uzbekistan Sum (UZS)",
  "vef": "Venezuelan Bolivar (VEF)",
  "vnd": "Vietnam Dong (₫)",
  "vuv": "Vanuatu Vatu (Vt)",
  "wst": "Samoa Tala (WS$)",
  "xaf": "CFA Franc (BEAC) (BEAC)",
  "xcd": "East Caribbean Dollar (EC$)",
  "xof": "CFA Franc (BCEAO) (BCEAO)",
  "xpf": "Pacific Franc (F)",
  "yer": "Yemen Riyal (YER)",
  "zar": "South African Rand (R)",
  "zmk": "Zambian Kwacha (ZMK)"
}
```