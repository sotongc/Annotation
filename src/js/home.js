import '../css/common.css';

import Vue from 'vue';
import api from './conf/API.json';

/**
 * @ import modules
*/
import gridbox from './components/gridbox.vue';

import seedIcon from '../img/seed.png';

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

const username = getCookie('username')||'';
const session = getCookie('session')||'';
(function(){
	fetch(api.checklogin,{
		method:'POST',
		header:{
			'Content-Type':'application/json'
		},
		mode:'cors',
		body:JSON.stringify({
			'username':username,
			'session':session
		})
	}).then(function(res){
		return res.json();
	}).then(function(result){
		if(result.success){
			console.log(result.success);
		}else{
			window.location.assign('./login.html');
		}
	}).catch(function(err){
		console.error(`Failed: ${error}!`);
	});
}());


const $gridbox=Vue.extend(gridbox);

let __gridbox=new $gridbox({
	el:'#gridbox',
	data:{
		items:[
			{name:'SEED MANAGEMENT',src:seedIcon,href:"./seed.html"},
			{name:'XPATH TOOL',src:seedIcon,href:"./xpath.html"},
			{name:'ACCOUNTS',src:seedIcon,href:"./accounts.html"}
		]
	}
});
 