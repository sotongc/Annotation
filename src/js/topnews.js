/*
 * import styles from external css file
 */
import "../css/common.css";
import "../css/seed.css";
/*
 * import url conf
 */
import api from './conf/API.json';

import Vue from "vue";
import "whatwg-fetch";
import ElementUI from 'element-ui';
import "element-ui/lib/theme-default/index.css";
import locale from "element-ui/lib/locale/lang/en";
Vue.use(ElementUI,{locale});

/*
 * @import modules
 */
import header from "./components/header.vue";
import querycondition from "./components/querycondition.vue";
import table from "./components/itemtable.vue";
import pagination from "./components/pagination.vue";
import loading from "./components/loading.vue";

const $header = Vue.extend(header);
const $querycondition = Vue.extend(querycondition);
const $table = Vue.extend(table);
const $page = Vue.extend(pagination);
const $loading = Vue.extend(loading);




let str = window.location.search;
const seedURL=str.split('=')[1];
/*
 * @function
 */
let queryRequest = function(api,formData,contentType){
	return new Request(api,{
		method:'POST',
		headers:{
			'Content-Type':contentType||'application/x-www-form-urlencoded'
		},
		mode:'cors',
		body:formData
	});
}

let query={
	daterange:'',
	domain:'',
	country:''
}

/*
 * @create components
 */
let __nav = new $header({
	el: "#nav"
});

let __querycondition = new $querycondition({
	el: "#queryCondition",
	data:{
		query:query,
		linkname:'crawlstat',
		options:[{
			value:'ke',
			label:'ke'
		},{
			value:'ng',
			label:'ng'
		},{
			value:'za',
			label:'za'
		},{
			value:'tz',
			label:'tz'
		},{
			value:'gh',
			label:'gh'
		},{
			value:'in',
			label:'in'
		},{
			value:'id',
			label:'id'
		}]
	}
});

let __newsList = new $table({
	el:"#newsList",
	data:{
		title: 'TOP NEWS',
		enable: true,
		active: true,
		headings:[
			{key:'number',text:'Number'},
			{key:'country',text:'Country'},
			{key:'domain',text:'Domain'},
			{key:'pictures',text:'Images'},
			{key:'title',text:'Title',color:'#0099e5'},
			{key:'crawlTimestamp',text:'Time'}
		],
		list:[],
		pageNo:'',
		pageSize:''
	}
});

let __pagination = new $page({
	el:"#pagination",
	data:{
		totalNum:0,
		limit:5,
		pageItems:20,
		currentPage:1
	}
});

let __loading = new $loading({
	el:"#loading",
	data:{
		show:false
	}
});


__pagination.$on('page:onchange',function(pagenum){
	responseResult.init();
});

__querycondition.$on('condition:query',function(){
	responseResult.init(1);
});

__querycondition.$on('condition:goto',function(){
	window.location.assign('./crawlstat.html?type=1&seed='+seedURL);
});

let responseData;

let responseResult={
	init: function(num){
		__loading.show=true;
		let page=num||__pagination.currentPage,
		responseData = fetch(queryRequest(api.topnews,JSON.stringify({
			'seed':seedURL,
			'pageNo':page,
			'limit':__pagination.pageItems,
			'fromCrawlTimestamp':responseResult.getTime(query.daterange[0]),
			'toCrawlTimestamp':responseResult.getTime(query.daterange[1]),
			'country':query.country
		}),'application/json')).then(res=>res.json());
		responseData.then(function(data){
			__loading.show=false;
			data=data.result;
			__pagination.$data.totalNum=data.totalItemCount;
			__pagination.$data.currentPage=data.pageNo,
			__newsList.$data.list=data.data;
			__newsList.$data.pageNo=data.pageNo;
			__newsList.$data.pageSize=data.pageSize;
			__newsList.$data.title=data.data[0].seed;
		})
		.catch(function(err){
			__loading.show=false;
			console.log(err);
		})
	},
	getTime: function(date){
	   	let timestamp = new Date(Date.parse(date));
	  	return date = timestamp.getTime();
	}
}
responseResult.init(1);

