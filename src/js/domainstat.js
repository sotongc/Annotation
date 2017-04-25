import '../css/common.css';
import '../css/crawlstat.css';
import api from './conf/API.json';

import Vue from 'vue';
import 'whatwg-fetch';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/en';
Vue.use(ElementUI,{locale});

import header from './components/header.vue';
import itemtable from './components/itemtable.vue';
import page from './components/pagination.vue';
import loading from './components/loading.vue';
import datetab from './components/datetab.vue';

const $header = Vue.extend(header);
const $page = Vue.extend(page);
const $datetab = Vue.extend(datetab);
const $itemtable = Vue.extend(itemtable);
const $loading = Vue.extend(loading);

let query={
	daterange:'',
	country:'',
	orderBy:'',
	order:'',
	domain:''
}

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


let __header = new $header({
	el:'#header'
});

let __pagination = new $page({
	el:'#page',
	data:{
		totalNum:0, //totoal item number
		limit:5,
		pageItems:20,//item per page
		currentPage:1// page number
	}
});

let __datetab = new $datetab({
	el:'#querydate',
	data:{
		query:query,
		tabname:'Domain Statistics',
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
		}],
		conditions:[{
			value:'domain',
			label:'domain'
		},{
			value:'country',
			label:'country'
		},{
			value:'date',
			label:'date'
		},{
			value:'newsCount',
			label:'newsCount'
		}],
		sorts:[{
			value:'ASC',
			label:'ASC'
		},{
			value:'DESC',
			label:'DESC'
		}]
	}
})

let __domaintable = new $itemtable({
	el:'#domaintab',
	data:{
		title:'DOMAIN STATISTICS LIST',
		enable: true,
		active: true,
		headings:[
			{key:'number',text:'Number'},
			{key:'date',text:'Date'},
			{key:'country',text:'Country'},
			{key:'domain',text:'Domain'},
			{key:'newsCount',text:'NewsCount'},
			{key:'createTime',text:'CreateTime'},
			{key:'modifyTime',text:'ModifyTime'}
		],
		list:[],
		pageNo:'',
		pageSize:''
	}
})


let __loading = new $loading({
	el:'#loading',
	data:{
		show:false
	}
});


__datetab.$on('date:query',function(){
	responseResult.init(1);
});

__pagination.$on('page:onchange',function(pagenum){
	responseResult.init();
});


let dataSource;

let responseResult={
	init: function(num){
		__loading.show=true;
		let page = num || __pagination.currentPage;
		dataSource = fetch(crawlRequest(api.domain,JSON.stringify({
			'pageNo':page,
			'limit':__pagination.pageItems,
			'fromDate':responseResult.getTime(query.daterange[0]),
			'toDate':responseResult.getTime(query.daterange[1]),
			'country':query.country,
			'orderBy':query.orderBy,
			'order':query.order,
			'domain':query.domain
		}),'application/json')).then(function(res){
			return res.json();
		});
		dataSource.then(function(data){
			__loading.show=false;
			data = data.result;
			__pagination.$data.totalNum=data.totalItemCount;
			__pagination.$data.currentPage=data.pageNo;
			__domaintable.$data.list=data.data;
			__domaintable.$data.pageNo=data.pageNo;
			__domaintable.$data.pageSize=data.pageSize;
		}).catch(function(error){
			__loading.show=false;
			console.error(`Failed: ${error}!`);
		});
	},
	getTime(date){
		if(date == ''|| date == undefined){
			return '';
		}else{
			let d=new Date(date);
			return d.getFullYear()+'-'+responseResult.formatNumber(d.getMonth()+1)+'-'+responseResult.formatNumber(d.getDate())
		}
	},
	formatNumber(n) {
	    n = n.toString();
	    return n[1] ? n : '0' + n;
	}
}
responseResult.init(1);