import '../css/common.css';
import '../css/accounts.css';

import Vue from 'vue';
import 'whatwg-fetch';

/* import vue compoent */
import header from './components/header.vue';
import ucard from './components/ucard.vue';
import page from './components/pagination.vue';
import table from './components/table.vue';
import tabs from './components/tab.vue';

/* vue extend */
const $header=Vue.extend(header);
const $ucard=Vue.extend(ucard);
const $page=Vue.extend(page);
const $table=Vue.extend(table);
const $tabs=Vue.extend(tabs);

/* vue instance */
let __header=new $header({
	el:'#nav'
});

let __ucard=new $ucard({
	el:'#ucard'
});

let __upage=new $page({
	el:'#upage',
	data:{
		totalNum:1,
		limit:5,
		pageItems:30,
		currentPage:1
	}
});

let __utable=new $table({
	el:'#utable',
	data:{
		title:'',
		enable:true,
		active:true,
		headings:[
			{key:'username',text:'Username'},
			{key:'authority',text:'Authority'},
			{key:'actions',text:'Actions'},
			{key:'lastModify',text:'Last Modify'}
		],
		list:[]
	}
});

/* right side */
let __atable=new $table({
	el:"#actions",
	data:{
		title:'',
		enable:false,
		active:false,
		headings:[
			{key:'transactionId',text:'Transaction ID'},
			{key:'time',text:'Time'},
			{key:'type',text:'Type'},
			{key:'target',text:'Target'}
		],
		list:[]
	}
});

let __apage=new $page({
	el:"#apage",
	data:{
		totalNum:1,
		limit:5,
		pageItems:30,
		currentPage:1
	}
});

let __afilter=new $tabs({
	el:'#afilter',
	data:{
		tabs:[
			{label:'create',on:1},
			{label:'modify',on:0},
			{label:'delete',on:0}
		]
	}
});

let __ctab=new $tabs({
	el:'#cTab',
	data:{
		tabs:[
			{label:'item1',on:1},
			{label:'item2',on:0},
			{label:'item3',on:0},
			{label:'item4',on:0},
			{label:'item5',on:0}
		]
	}
})