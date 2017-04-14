/* import styles from external css file */
import '../css/common.css';
import '../css/xpath.css';

/* import lib script */
import Vue from 'vue';
import 'whatwg-fetch';

/* import the self defined vue components */
import header from './components/header.vue';
import toolbar from './components/toolbar.vue';
import frame from './components/frame.vue';
import canvas from './components/canvas.vue';
import info from './components/info.vue';
import xpad from './components/xpad.vue';
import loading from './components/loading.vue';

/* import assistant functionalities */
import tagstore from './utils/tagstore.js';
import extractor from './utils/extractor.js';

/* url conf */
import api from './conf/API.json';

/* initialize the vue component */
const $nav=Vue.extend(header);
const $tool=Vue.extend(toolbar);
const $frame=Vue.extend(frame);
const $canvas=Vue.extend(canvas);
const $info=Vue.extend(info);
const $xpad=Vue.extend(xpad);
const $loading=Vue.extend(loading);


let str = window.location.search;
const seedURL=str.split('=')[1];


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

/**
 * @ Object used to get the params of client window
 */
let client={
	width:function(){
		return Math.max(1000,document.documentElement.clientWidth-300);
	},
	height:function(){
		return document.documentElement.clientHeight-4;
	},
	offset:{
		top:function(){
			return 105;
		}
	}
};

/**
 * @ Request Parameters
*/
let htmlRequest=function(host,query,contentType){
	return new Request(host,{
		method:'POST',
		headers:{
			'Content-Type':contentType||'application/x-www-form-urlencoded'
		},
		mode:'cors',
		body:query
	});
};

let formQuery=function(obj){
	return Object.keys(obj).map(function(key){
		return `${key}=${obj[key]}`;
	}).join("&");
};


/**
 * @ Create Components
 */

let __nav=new $nav({
	el:"#nav"
});

let __tool=new $tool({
	el:"#toolbar",
	data:{
		display:'Show'
	}
});

let __frame=new $frame({
	el:"#frame",
	data:{
		src:'../view/startup.html',
		height:client.height()-client.offset.top(),
		annotation_status:false,
		html:''
	}
});

let __canvas=new $canvas({
	el:"#canvas",
	data:{
		width:client.width(),
		height:client.height()-client.offset.top()
	}
});

let __info=new $info({
	el:"#info",
	data:{
		xpath:'',
		attributes:[],
		isshow:false,
		stored:[],
		listshow:false
	}
});

let __xpad=new $xpad({
	el:"#xpad",
	data:{
		entries:[],
		height:client.height()-55
	}
});

let __loading=new $loading({
	el:"#loading",
	data:{
		show:false
	}
});


/**
 * @ Resize the canvas and information pannel when the client window resized
 */

window.onresize=function(){
	__frame.height=client.height()-client.offset.top();
	__canvas.height=client.height()-client.offset.top();
	__canvas.width=client.width();

	__canvas.$once("canvas:updated",redrawTags)
};


/**
 * @ Events used to communication among components
 */

// frame

__frame.$on("element:enter",function(event,bbox){
	__canvas.clear(__canvas.ctx_d);
	__canvas.drawRect(bbox.left,bbox.top,bbox.width,bbox.height);
	
	__info.xpath=extractor.getDomInfo(event);
	__info.attributes=extractor.getAttrInfo(event.target);
});

__frame.$on("element:out",function(bbox){
	__canvas.clearRect(bbox.left,bbox.top,bbox.width,bbox.height);
});

__frame.$on("element:select",function(bbox,target){
	__canvas.drawTag(bbox.left,bbox.top,bbox.width,bbox.height);
	__canvas.clear(__canvas.ctx_d);

	tagstore.add(target);
	__xpad.entries=tagstore.getEntries();
});

__frame.$on("frame:scroll",redrawTags);


//toolbar

__tool.$on("annotation:active",function(){
	__frame.annotation_status=true;
	__info.isshow=true;
	__tool.display='Show';
	__info.listshow=false;
});

__tool.$on("annotation:save",function(){
	__loading.show=true;

	//send save request
	fetch(htmlRequest(api.save,JSON.stringify({
		"seed":this.pageURL,
		"country":this.country,
		"category":this.category,
		"status":this.status,
		"patterns":tagstore.getSaveFormat()
	}),"application/json")).then(res=>res.json()).then(function(data){
		console.log(data);
		__loading.show=false;
	}).catch(function(err){
		alert(err);
		__loading.show=false;
	});

	initialize();
});

__tool.$on("frame:load",function(){
	getHtml(this.pageURL);
});

__tool.$on("annotation:display",function(){
	__info.stored=tagstore.getEntries();
	__info.listshow=!__info.listshow;
});

//xpad
__xpad.$on("entry:test",function(hashid){
	//clear tagstore el if item was annotated
	tagstore.deleteEl(hashid);
	redrawTags();

	__loading.show=true;

	//request
	fetch(htmlRequest(api.extractEle,formQuery({
		url:__tool.pageURL,
		tag:tagstore.entries[hashid].xpath
	}))).then(res=>res.json())
		.then(function(data){
			let mapTable={
				text:'content',
				url:'url'
			};

			tagstore.entries[hashid].attrs=['text','url'].filter(function(key){
				return data.hasOwnProperty(key)?mapTable[key]:false;
			}).map(function(key){
				return {key:key,content:data[key]}
			});

			__loading.show=false;
		}).catch(function(err){
			alert(err);
			__loading.show=false;
		});
});

__xpad.$on("entry:trash",function(hashid){
	tagstore.delete(hashid);
	__xpad.entries=tagstore.getEntries();
	redrawTags();
});

__xpad.$on("xpad:add",function(){
	tagstore.addEntry();
	__xpad.entries=tagstore.getEntries();
});

//
function redrawTags(){
	let keys=Object.keys(tagstore.el);
	let bbox=null;

	__canvas.clear(__canvas.ctx_s);
	
	keys.forEach(function(k){
		bbox=tagstore.el[k].getBoundingClientRect();
		__canvas.drawTag(bbox.left,bbox.top,bbox.width,bbox.height);
	});
}

//

function initialize(){
	//clear tagstore
	tagstore.empty();

	//clear canvas pannel
	__canvas.clearAll();

	//clear xpad
	__xpad.entries=[];

	//reset status
	__frame.annotation_status=false;
	__info.isshow=false;
	__info.listshow=false;
	__tool.display='Show';
}

if(seedURL&&seedURL!=''){
	__tool.pageURL=seedURL;
	getHtml(__tool.pageURL);
}


function getHtml(url){
	initialize();
	__loading.show=true;

	fetch(htmlRequest(api.getHTML,formQuery({
		url:url
	})))
	.then(res=>res.json())
	.then(function(data){
		if(data.htmlText){
			__frame.html=data.htmlText;
			__frame.load();
		}
		else{
			__frame.src="../view/404.html"
		}
		
		__loading.show=false;
	}).catch(function(err){
		__loading.show=false;
		alert(err);
	});
}
