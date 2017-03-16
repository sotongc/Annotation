import '../css/common.css';
import '../css/seed.css';
import api from './conf/API.json';

import Vue from 'vue';
import 'whatwg-fetch';

/**
 * @ import modules
*/

import header from './components/header.vue';
import pagination from './components/pagination.vue';
import pannel from './components/pannel.vue';
import table from './components/table.vue';

const $nav=Vue.extend(header);
const $page=Vue.extend(pagination);
const $pannel=Vue.extend(pannel);
const $table=Vue.extend(table);

/*global event bus*/
const $ebus=new Vue();

/**
 * @ Query & Request initialization
*/
let query={
	seed:'',
	//country:'CN',
	//category:'political',
	//domain:'',
	pageNo:1,
	limit:10
};

let toFormData=function(json){
	return Object.keys(json).map(function(key){
		return `${key}=${json[key]}`;
	}).join("&");
};

let seedRequest=function(uri,formData){
	return new Request(uri,{
		method:'POST',
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		},
		mode:'cors',
		body:formData
	});
};

/**
 * @ Create Components
*/

let __nav=new $nav({
	el:"#nav"
});

let __page=new $page({
	el:'#pagination',
	data:{
		totalNum:1, //totoal item number
		limit:5,
		pageItems:10,//item per page
		currentPage:1// page number
	}
});

let __pannel=new $pannel({
	el:'#pannel',
	data:{
		countries:['us','in','ind'],
		category:['political','sports','entertainment','game'],
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
			{key:'country',text:'Country'},
			{key:'domain',text:'Domain'},
			{key:'seed',text:'Seed',color:'#0099e5'},
			{key:'category',text:'Category'}
		],
		list:[]
	}
});

let __patternlist=new $table({
	el:"#patternList",
	data:{
		title:'PATTERN LIST',
		enable:false,
		active:false,
		headings:[
			{key:'type',text:'Type'},
			{key:'content',text:'Content',color:'#c7254e'}
		],
		list:[]
	}
});

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
		__patternlist.list=data.data[index].patterns;
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
	init:function(){
		query.pageNo=__page.currentPage;
		dataLoaded=fetch(seedRequest(api.search,toFormData(query))).then(function(res){
			return res.json();
		});
		dataLoaded.then(function(data){
			data=data.result;
			__page.$data.totalNum=data.totalItemCount;
			__page.$data.currentPage=data.pageNo;
			__seedlist.$data.list=data.data;
			__patternlist.$data.list=data.data[0].patterns;
		}).catch(function(error){
			console.error(`Failed: ${error}!`);
		});
	},
	pagechange:function(){
		query.pageNo=__page.currentPage;
		dataLoaded=fetch(seedRequest(api.search,toFormData(query))).then(function(res){
			return res.json();
		});
		dataLoaded.then(function(data){
			data=data.result;
			__seedlist.$data.list=data.data;
			__patternlist.$data.list=data.data[0].patterns;
		}).catch(function(error){
			console.error(`Failed: ${error}!`);
		});
	}
};

responseUnit.init();