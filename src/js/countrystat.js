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
const $itemtable = Vue.extend(itemtable);
const $loading = Vue.extend(loading);
const $datequery = Vue.extend(datetab);

let query={
	daterange:'',
	country:''
}

const type = parseInt(window.location.search.split('=')[1]);

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

let __querydate = new $datequery({
	el:'#querydate',
	data:{
		query:query,
		type: type,
		tabname:'Country Statistics',
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
		},{
			value:'hindi',
			label:'hindi'
		}]
	}
})

let __pagination = new $page({
	el:'#page',
	data:{
		totalNum:0, //totoal item number
		limit:5,
		pageItems:20,//item per page
		currentPage:1// page number
	}
});

let __countrytable = new $itemtable({
	el:'#countrytab',
	data:{
		title:'COUNTRY STATISTICS LIST',
		enable: true,
		active: true,
		headings:[
			{key:'number',text:'Number'},
			{key:'date',text:'Date'},
			{key:'country',text:'Country'},
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

__querydate.$on('date:query',function(){
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
		dataSource = fetch(crawlRequest((type==0?api.country:api.corCountry),JSON.stringify({
			'pageNo':page,
			'limit':__pagination.pageItems,
			'fromDate':responseResult.getTime(query.daterange[0]),
			'toDate':responseResult.getTime(query.daterange[1]),
			'country':query.country
		}),'application/json')).then(function(res){
			return res.json();
		});
		dataSource.then(function(data){
			__loading.show=false;
			data = data.result;
			__pagination.$data.totalNum=data.totalItemCount;
			__pagination.$data.currentPage=data.pageNo;
			__countrytable.$data.list=data.data;
			__countrytable.$data.pageNo=data.pageNo;
			__countrytable.$data.pageSize=data.pageSize;
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