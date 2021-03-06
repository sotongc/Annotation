/*
 * import styles from external css file
 */
import '../css/common.css';
import '../css/crawlstat.css';
/*
 * import url conf
 */
import api from './conf/API.json';
/*
 * import lib script
 */
import Vue from 'vue';
import 'whatwg-fetch';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI,{locale})

/*
 * import the self define vue component
 */
import header from './components/header.vue';
import itemtable from './components/itemtable.vue';
import pagination from './components/pagination.vue';
import datequery from './components/datequery.vue';
import loading from './components/loading.vue';

const $header = Vue.extend(header);
const $table = Vue.extend(itemtable);
const $pagination = Vue.extend(pagination);
const $datequery = Vue.extend(datequery);
const $loading = Vue.extend(loading);


let str = window.location.search;
var seedURL = '';
var type = 0;
if(str){
	seedURL=str.slice(13);
	type=parseInt(str.split('&')[0].split('=')[1]);
}
/*
 * request function
 */
let crawlRequest = function(uri,formData,contentType){
	return new Request(uri,{
		method:'POST',
		headers:{
			'Content-Type': contentType || 'application/x-www-form-urlencoded'
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
let __head = new $header({
	el:'#nav'
});

let __datequery = new $datequery({
	el:'#query',
	data: {
		type:type,
		query:query,
		linkname:(type==0?'seednews':'topnews')
	}
})

let __crawlList = new $table({
	el:'#crawlList',
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

let __page = new $pagination({
	el:'#pagination',
	data: {
		totalNum:0, //totoal item number
		limit:5,
		pageItems:20,//item per page
		currentPage:1// page number
	}
});

let __loading = new $loading({
	el:'#loading',
	data:{
		show:false
	}
})

__datequery.$on('datequery:query',function(){
	responseResult.init(1);
});
__datequery.$on('datequery:goto',function(){
	if(type == 0){
		window.location.assign('./seednews.html?seed='+seedURL);
	}else{
		window.location.assign(`./topnews.html?seed=${seedURL}`);
	}
	
})

__page.$on('page:onchange',function(pagenum){
	responseResult.init();
});
/*
 * @ fetch request
 */
let dataSource;

let responseResult={
	init: function(num){
		__loading.show=true;
		let page = num || __page.currentPage;
		dataSource = fetch(crawlRequest((type==0?api.crawlstat:api.crawlstatis),JSON.stringify({
			'seed':seedURL,
			'pageNo':page,
			'limit':__page.pageItems,
			'fromCrawlTimestamp':responseResult.getTime(query.daterange[0]),
			'toCrawlTimestamp':responseResult.getTime(query.daterange[1])
		}),'application/json')).then(function(res){
			return res.json();
		});
		dataSource.then(function(data){
			__loading.show=false;
			data = data.result;
			__page.$data.totalNum=data.totalItemCount;
			__page.$data.currentPage=data.pageNo;
			__crawlList.$data.list=data.data;
			__crawlList.$data.pageNo=data.pageNo;
			__crawlList.$data.pageSize=data.pageSize;
			__crawlList.$data.title=seedURL;
		}).catch(function(error){
			__loading.show=false;
			console.error(`Failed: ${error}!`);
		});
	},
	getTime: function(date){
	   	let timestamp = new Date(Date.parse(date));
	  	return date = timestamp.getTime();
	}
}
responseResult.init(1);



















