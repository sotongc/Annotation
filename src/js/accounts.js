import '../css/common.css';
import '../css/accounts.css';

import Vue from 'vue';
import 'whatwg-fetch';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/en';
Vue.use(ElementUI,{locale});

import api from './conf/API.json';

/* import vue compoent */
import header from './components/header.vue';
import ucard from './components/ucard.vue';
import page from './components/pagination.vue';
import itemtable from './components/itemtable.vue';
import tabs from './components/tab.vue';

/* vue extend */
const $header=Vue.extend(header);
const $ucard=Vue.extend(ucard);
const $page=Vue.extend(page);
const $table=Vue.extend(itemtable);
const $tabs=Vue.extend(tabs);

let getCookie = function(name){
	if(document.cookie.length>1){
		var arr1 = document.cookie.split('; ');
	    for (var i=0; i<arr1.length; i++) {
	        var arr2 = arr1[i].split('=');
	        if ( arr2[0] == name ) {
	            return decodeURI(arr2[1]);
	        }
	    }
	}
};

let addUserRequest = function(uri,formData,contentType){
	return new Request(uri,{
		method:'POST',
		headers:{
			'Content-Type':contentType||'application/x-www-form-urlencoded'
		},
		mode:'cors',
		body:formData
	})
};


//getcookie进行判定
const username = getCookie('username')||'';
const session = getCookie('session')||'';
const authority = getCookie('authority');



let form={
	username:'',
	password:'',
	status:"1"
}
//const userInfo=JSON.parse(localStorage.getItem('userInfo'));
/* vue instance */
let __header=new $header({
	el:'#nav'
});

let __ucard=new $ucard({
	el:'#ucard',
	data:{
		dialogVisible:false,
		form:form,
		errmessage:'',
		username:username,
		authority:authority
	}
});

let __upage=new $page({
	el:'#upage',
	data:{
		totalNum:0,
		limit:5,
		pageItems:20,
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
			{key:'status',text:'Status'},
			{key:'lastModifyTimestamp',text:'Last Modify'},
			{key:'actions',text:'Actions'}
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
		totalNum:0,
		limit:5,
		pageItems:20,
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
});


__ucard.$on('add:editor',function(){
	if(form.username==""||form.password==""){
		this.errmessage="Error: Username and Password cannot leave empty!";
	}else if(form.username.length<5||form.password.length<5||form.password.length>15||form.username.length>15){
		this.errmessage="Error: Username's length and Password's length non-compliant！"
	}else{
		responseResult.init();
//		this.$message({
//			message: 'Add Editor Success!',
//			type:'success'
//		});
	}
});
__upage.$on('page:onchange',function(pageNum){
	responseResult.search()
})

let responseResult = {
	checklogin:function(){
		fetch(addUserRequest(api.checklogin,JSON.stringify({
			'username':username,
			'session':session
		}),'application/json')).then(function(res){
			return res.json();
		}).then(function(result){
			if(result.success){
				responseResult.search();
			}else{
				window.location.assign('./login.html');
			}
		}).catch(function(err){
			console.error(`Failed: ${error}!`);
		});
	},
	init:function(){
		fetch(addUserRequest(api.usersave,JSON.stringify({
			'username':form.username,
			'password':form.password,
			'status':form.status,
			'addByUser':username
		}),'application/json')).then(function(res){
			return res.json();
		}).then(function(result){
			console.log(result);
			__ucard.dialogVisible=false;
		}).catch(function(err){
			console.error(`Failed: ${error}!`);
		})
	},
	search:function(num){
		let page = num || __upage.currentPage;
		fetch(addUserRequest(api.usersearch,JSON.stringify({
			'pageNo':page,
			'limit':__upage.pageItems,
			'addByUser':username
		}),'application/json')).then(function(res){
			return res.json();
		}).then(function(result){
			let data=result.data;
			__utable.$data.list=data.data;
			__upage.$data.totalNum=data.totalItemCount,
			__upage.$data.currentPage=data.pageNo;
			__utable.$data.pageNo=data.pageNo;
			__utable.$data.pageSize=data.pageSize;
		}).catch(function(err){
			console.error(`Failed: ${error}!`);
		})
	}
}
responseResult.checklogin();



