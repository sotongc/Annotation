# API DOCUMENT

-----
## Annotation Function

**get source page**

- host: `http://107.167.123.93`
- port: `8080`
- path: `/news-parse-api/news/html`
- method: POST
- Request Body: `url=https://...&enableJs=[true|false]`
- Response: html document

**get extracted element info**

- host: `http://107.167.123.93`
- port: `8080`
- path: `/news-parse-api/news/parse`
- method: POST
- Request Body: `url=http://...&tag=//body>div`
- Response: {"src":"","tag":"body>div>div>div>div[2]>p","text":""}

**save**

- host: `http://107.167.123.93`
- port: `8080`
- path: `/news-parse-api/seed/save`
- method: POST
- Request Body: 

```json
{
	"seed":"",
	"country":"US",
	"category":"sport",
	"status":0,//0=="pause" 1=="running"
	"patterns":[
		{"type":"xpath","content":"//bookstore"},
		{"type":"regex","content":".*artical.*"}
	]
}
```

- Response: {"status":"","message":""}

-----
## Seed Management

**get seed info**

- host: `http://107.167.123.93`
- port: `8080`
- path: `/news-parse-api/news/seed/search`
- method: POST
- Request Body: `seed=&country=&category=&domain=&currentPage=1&limit=`
- Response: ListOfSeed.json
