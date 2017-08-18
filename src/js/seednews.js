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
import 'element-ui/lib/theme-default/index.css'
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
const $querytime = Vue.extend(datequery);
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
let seedNewsRequest = function(uri,formData,contentType){
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
	daterange: ''
}

/*
 * @create components
 */
let __head = new $header({
	el:'#nav'
});

let __querytime = new $querytime({
	el:'#querytime',
	data: {
		type:type,
		query:query,
		linkname:'crawlstat'
	}
})

let __seedNews = new $table({
	el:'#seedNews',
	data: {
		title:'CrawlStat List',
		enable: true,
		active: true,
		headings:[
			{key:'number',text:'Number'},
			{key:'country',text:'Country'},
			{key:'crawlTimestamp',text:'CrawlTimestamp'},
			{key:'processTimestamp',text:'ProcessTimestamp'},
			{key:'url',text:'Url',color:'#0099e5'},
		],
		list:[],
		pageNo:'',
		pageSize:''
	}
});

let __pagination = new $pagination({
	el:'#page',
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


__pagination.$on('page:onchange',function(pagenum){
	responseResult.init();
});

__querytime.$on('datequery:query',function(){
	responseResult.init(1);
});
__querytime.$on('datequery:goto',function(){
	if(type == 0){
		window.location.assign('./crawlstat.html?type=0&seed='+seedURL);
	}else{
		window.location.assign('./crawlstat.html?type=1&seed='+seedURL);
	}
});

/*
 * @ fetch request
 */
let dataSource;

let responseResult={
	init: function(num){
		__loading.show=true;
		let page = num || __pagination.currentPage;
		dataSource = fetch(seedNewsRequest(type==0?api.seednews:api.topnews,JSON.stringify({
			'seed':seedURL,
			'pageNo':page,
			'limit':__pagination.pageItems,
			'fromCrawlTimestamp':responseResult.getTime(query.daterange[0]),
			'toCrawlTimestamp':responseResult.getTime(query.daterange[1])
		}),'application/json')).then(function(res){
			return res.json();
		});
		dataSource.then(function(data){
			console.log(data);
			__loading.show=false;
			data = data.result;
			__pagination.$data.totalNum=data.totalItemCount;
			__pagination.$data.currentPage=data.pageNo;
			__seedNews.$data.list=data.data;
			__seedNews.$data.pageNo=data.pageNo;
			__seedNews.$data.pageSize=data.pageSize;
			__seedNews.$data.title=data.data[0].seed;
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



















