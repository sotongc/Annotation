/*
 * import styles from external css file
 */
import "../css/common.css";
import "../css/crawlstat.css";
/*
 * import url conf
 */
import api from "./conf/API.json";
/*
 * import lib script 
 */
import Vue from 'vue';
import "whatwg-fetch";
import ElementUI from "element-ui";
import "element-ui/lib/theme-default/index.css";
import locale from "element-ui/lib/locale/lang/en";
Vue.use(ElementUI,{locale});
/*
 * import the self define vue components
 */
import header from "./components/header.vue";
import itemtable from "./components/itemtable.vue";
import datequery from "./components/datequery.vue";
import pagination from "./components/pagination.vue";
import loading from "./components/loading.vue";

const $header = Vue.extend(header);
const $itemtable = Vue.extend(itemtable);
const $datequery = Vue.extend(datequery);
const $pagination = Vue.extend(pagination);
const $loading = Vue.extend(loading);

let str = window.location.search;
const seedURL = str.split('=')[1];
/*
 * request function
 */
let crawlRequest = function(uri,formData,contentType){
	return new Request(uri,{
		method:'POST',
		headers:{
			'Content-Type':contentType||'application/x-www-form-urlencoded'
		},
		mode:'cors',
		body:formData
	});
}

let query = {
	daterange:''
}

/*
 * @create components
 */
let __nav = new $header({
	el:"#nav"
});
let __querycondition = new $datequery({
	el: "#query",
	data: {
		query:query,
		linkname:'topnews'
	}
});
let __crawlstatList = new $itemtable({
	el: "#crawlstatList",
	data: {
		title:'CRAWLSTAT LIST',
		enable: true,
		active: true,
		headings:[
			{key:'number',text:'Number'},
			{key:'country',text:'Country'},
			{key:'crawlTimestamp',text:'CrawlTimestamp'},
			{key:'parseTimestamp',text:'ParseTimestamp'},
			{key:'urlCount',text:'UrlCount'},
			{key:'newsCount',text:'NewsCount'},
			{key:'addedNewsCount',text:'AddNewsCount'}
		],
		list:[],
		pageNo:'',
		pageSize:''
	}
});
let __pagination = new $pagination({
	el: "#pagination",
	data: {
		totalNum:0, //totoal item number
		limit:5,
		pageItems:20,//item per page
		currentPage:1// page number
	}
});
let __loading = new $loading({
	el: "#loading",
	data: {
		show:false
	}
});


__querycondition.$on('datequery:query',function(){
	responseResult.init(1);
});
__querycondition.$on('datequery:goto',function(){
	window.location.assign('./topnews.html?seed='+seedURL);
});

__pagination.$on('page:onchange',function(pagenum){
	responseResult.init();
});


/*
 * @ fetch request
 */
let dataSource;

let responseResult = {
	init: function(num){
		__loading.show=true;
		let page = num || __pagination.currentPage;
		dataSource = fetch(crawlRequest(api.crawlstatis,JSON.stringify({
			'seed':seedURL,
			'pageNo':page,
			'limit':__pagination.pageItems,
			'fromCrawlTimestamp':responseResult.getTime(query.daterange[0]),
			'toCrawlTimestamp':responseResult.getTime(query.daterange[1])
		}),'application/json')).then(res=>res.json());
		dataSource.then(function(data){
			__loading.show=false;
			data = data.result;
			__pagination.$data.totalNum=data.totalItemCount;
			__pagination.$data.currentPage=data.pageNo;
			__crawlstatList.$data.list=data.data;
			__crawlstatList.$data.pageNo=data.pageNo;
			__crawlstatList.$data.pageSize=data.pageSize;
			__crawlstatList.$data.title=seedURL;
		})
		.catch(function(err){
			__loading.show=false;
			console.log(err);
		});
	},
	getTime: function(date){
	   	let timestamp = new Date(Date.parse(date));
	  	return date = timestamp.getTime();
	}
}
responseResult.init(1);