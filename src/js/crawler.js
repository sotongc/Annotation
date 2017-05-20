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

let __table = new $table({
	el: "#crawlerList",
	data:{
		title: 'CRAWLER LIST',
		enable: true,
		active: true,
		headings: [
			{key:'number',text:'Number'},
			{key:'country',text:'Country'},
			{key:'domain',text:'Domain'},
			{key:'crawler',text:'Crawler'},
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
})

let __loading = new $loading({
	el: "#loading",
	data: {
		show: false
	}
})
