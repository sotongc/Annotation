import '../css/common.css';
import '../css/seed.css';
import api from './conf/API.json';

import Vue from 'vue';
import 'whatwg-fetch';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/en';
Vue.use(ElementUI,{locale});

/**
 * @ import modules
*/

import header from './components/header.vue';
import pagination from './components/pagination.vue';
import pannel from './components/pannel.vue';
import table from './components/table.vue';
import loading from './components/loading.vue';

const $nav=Vue.extend(header);
const $page=Vue.extend(pagination);
const $pannel=Vue.extend(pannel);
const $table=Vue.extend(table);
const $loading=Vue.extend(loading);

/*global event bus*/
const $ebus=new Vue();

/**
 * @ Query & Request initialization
*/
let query={
	seed:'',
	country:'all',
	category:'all',
	domain:'',
	pageNo:1,
	limit:20
};

let toFormData=function(json){
	return Object.keys(json).map(function(key){
		return `${key}=${json[key]}`;
	}).join("&");
};

let seedRequest=function(uri,formData,contentType){
	return new Request(uri,{
		method:'POST',
		headers:{
			'Content-Type':contentType||'application/x-www-form-urlencoded'
		},
		mode:'cors',
		body:formData
	});
};

//let getCookie = function(name){
//	if(document.cookie.length>1){
//		var arr1 = document.cookie.split('; ');
//	    for (var i=0; i<arr1.length; i++) {
//	        var arr2 = arr1[i].split('=');
//	        if ( arr2[0] == name ) {
//	            return decodeURI(arr2[1]);
//	        }
//	    }
//	}
//};

//getcookie进行判定
//const username = getCookie('username')||'';
//const session = getCookie('session');

/**
 * @ Create Components
*/

let __nav=new $nav({
	el:"#nav"
});

let __page=new $page({
	el:'#pagination',
	data:{
		totalNum:0, //totoal item number
		limit:5,
		pageItems:20,//item per page
		currentPage:1// page number
	}
});

let __pannel=new $pannel({
	el:'#pannel',
	data:{
		countries:['all','ke','ng','za','tz','gh','in','id'],
		category:['all','political','sports','entertainment','game'],
		query:query
	}
});

let __seedlist=new $table({
	el:'#seedList',
	data:{
		title:'SEED LIST',
		enable:true,
		active:true,
		headings:[
			{key:'number',text:'Number'},
			{key:'country',text:'Country'},
			{key:'domain',text:'Domain'},
			{key:'seed',text:'Seed',color:'#0099e5'},
			{key:'createUser',text:'CreateUser'},
			{key:'lastCrawlTimestamp',text:'LastCrawl'},
			{key:'lastParseTimestamp',text:'LastParse'},
			{key:'status',text:'Status'},
			{key:'version',text:'Version'},
			{key:'category',text:'Category'}
		],
		list:[],
		pageNo:query.pageNo,
		pageSize:query.limit
	}
});

let __loading = new $loading({
	el:'#loading',
	data:{
		show:false
	}
})

//let __patternlist=new $table({
//	el:"#patternList",
//	data:{
//		title:'PATTERN LIST',
//		enable:false,
//		active:false,
//		headings:[
//			{key:'type',text:'Type'},
//			{key:'content',text:'Content',color:'#c7254e'}
//		],
//		list:[]
//	}
//});

/**
 * @ components interactions
*/

__pannel.$on('pannel:onsearch',function(){
	//reset request object and dataLoaded object
	//...
	responseUnit.init();
});

__seedlist.$on("table:selected",function(index){
	dataLoaded.then(function(data){
		data=data.result;
//		__patternlist.list=data.data[index].patterns;
	});
});

__page.$on('page:onchange',function(pagenum){
	responseUnit.pagechange();
});

/**
 * @ fetch request
*/

let dataLoaded;

let responseUnit={
//	checklogin:function(){
//		fetch(seedRequest(api.checklogin,JSON.stringify({
//			'username':username,
//			'session':session
//		}),'application/json')).then(function(res){
//			return res.json();
//		}).then(function(result){
//			if(result.success){
//				responseUnit.init();
//			}else{
//				window.location.assign('./login.html');
//			}
//		}).catch(function(err){
//			console.error(`Failed: ${error}!`);
//		});
//	},
	init:function(){
		__loading.show=true;
		query.pageNo=__page.currentPage;
		dataLoaded=fetch(seedRequest(api.search,JSON.stringify({
			"seed": query.seed,
			"country": (query.country=='all'?'':query.country),
			"category": (query.category=='all'?'':query.category),
			"domain": query.domain,
			"pageNo": 1,
			"limit": query.limit
		}),"application/json")).then(function(res){
			return res.json();
		});
		dataLoaded.then(function(data){
			console.log(data);
			__loading.show=false;
			data=data.result;
			__page.$data.totalNum=data.totalItemCount;
			__page.$data.currentPage=data.pageNo;
			__seedlist.$data.list=data.data;
//			__patternlist.$data.list=data.data[0].patterns;
		}).catch(function(error){
			__loading.show=false;
			console.error(`Failed: ${error}!`);
		});
	},
	pagechange:function(){
		__loading.show=true;
		query.pageNo=__page.currentPage;
		dataLoaded=fetch(seedRequest(api.search,JSON.stringify({
			"seed": query.seed,
			"country": (query.country=='all'?'':query.country),
			"category": (query.category=='all'?'':query.category),
			"domain": query.domain,
			"pageNo": query.pageNo,
			"limit": query.limit
		}),"application/json")).then(function(res){
			return res.json();
		});
		dataLoaded.then(function(data){
			__loading.show=false;
			data=data.result;
			__seedlist.$data.list=data.data;
			__seedlist.$data.pageNo=data.pageNo;
			__seedlist.$data.pageSize=data.pageSize;
//			__patternlist.$data.list=data.data[0].patterns;
		}).catch(function(error){
			__loading.show=false;
			console.error(`Failed: ${error}!`);
		});
	}
};

responseUnit.init();