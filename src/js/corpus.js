import '../css/common.css';
import '../css/seed.css';
import api from './conf/API.json';

import Vue from 'vue';
import 'whatwg-fetch';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/en';
Vue.use(ElementUI,{locale});

/*
 * @ import modules
 */
import header from './components/header.vue';
import querybox from './components/pannel.vue';
import table from './components/table.vue';
import pagination from './components/pagination.vue';
import loading from './components/loading.vue';

const $header = Vue.extend(header);
const $querybox = Vue.extend(querybox);
const $table = Vue.extend(table);
const $pagination = Vue.extend(pagination);
const $loading = Vue.extend(loading);


let corpusRequest = function(uri,formData,contentType){
	return new Request(uri,{
		method:'POST',
		headers:{
			'Content-Type':contentType||'application/x-www-form-urlencoded'
		},
		mode:'cors',
		body:formData
	})
}
/*
 * @ Query & Request initialization
 */
let query={
	seed:'',
	country:'all',
	category:'unlimited',
	domain:'',
	pageNo:1,
	limit:20
};


let __nav = new $header({
	el: "#nav"
});

let __querybox = new $querybox({
	el: "#querybox",
	data:{
		countries:['all','ke','ng','za','tz','gh','in','id'],
		category:['unlimited','political','sports','entertainment','game'],
		query:query
	}
});

let __corpusList = new $table({
	el: "#corpusList",
	data:{
		title: 'CORPUS LIST',
		enable: true,
		active: true,
		headings: [
			{key:'number',text:'Number'},
			{key:'country',text:'Country'},
			{key:'domain',text:'Domain'},
			{key:'seed',text:'Corpus'},
			{key:'createUser',text:'CreateUser'},
			{key:'lastCrawlTimestamp',text:'LastCrawl'},
			{key:'lastParseTimestamp',text:'LastParse'},
			{key:'status',text:'Status'},
			{key:'version',text:'Version'},
			{key:'category',text:'Category'}
		],
		list: [],
		pageNo: query.pageNo,
		pageSize: query.limit
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
		show: false
	}
});

let dataSource;
let responseResult={
	init:function(){
		__loading.show=true;
		query.pageNo=__pagination.currentPage;
		dataSource=fetch(corpusRequest(api.corpusSearch,JSON.stringify({
			"seed": query.seed,
			"country": (query.country=='all'?'':query.country),
			"category": (query.category=='unlimited'?'':query.category),
			"domain": query.domain,
			"pageNo": 1,
			"limit": query.limit
		}),"application/json")).then(function(res){
			return res.json();
		});
		dataSource.then(function(data){
			console.log(data);
			__loading.show=false;
			data=data.result;
			__pagination.$data.totalNum=data.totalItemCount;
			__pagination.$data.currentPage=data.pageNo;
			__corpusList.$data.list=data.data;
//			__patternlist.$data.list=data.data[0].patterns;
		}).catch(function(error){
			__loading.show=false;
			console.error(`Failed: ${error}!`);
		});
	}
}
responseResult.init();
