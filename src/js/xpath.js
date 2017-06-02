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
	let patterns = tagstore.getSaveFormat();
	let len = patterns.length;
	const newArr=[patterns[0]];
	var number=[];
	var cont=[];
	if(len>1){
		for (var i=1;i<len;i++){
			var repeat = false;
			for(var j=0;j<newArr.length;j++){
				if(patterns[i].content.length==newArr[j].content.length){
					var l=newArr[j].content.length;
					var temp='';
					for(var k=0;k<l;k++){
						if(patterns[i].content[k]==newArr[j].content[k]){
							temp+=newArr[j].content[k];
						}
					}
					if(temp.length>=l-2){
						temp=temp.split('[]').join('');
						number.push(j);
						cont.push(temp);
						repeat=true;
						break;
					}
				}
			}
			if(!repeat){
				newArr.push(patterns[i]);
			}
		}
		let length = number.length;
		if(length>0){
			for(var m=0;m<length;m++){
				newArr[number[m]].content=cont[m];
			}
		}
	}
	
	//send save request
	fetch(htmlRequest(api.save,JSON.stringify({
		"seed":this.pageURL,
		"country":this.country,
		"category":this.category,
		"status":this.status,
		"patterns":newArr
	}),"application/json")).then(res=>res.json()).then(function(data){
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
	fetch(htmlRequest(api.extractEle,JSON.stringify({
		url:__tool.pageURL,
		tag:tagstore.entries[hashid].xpath
	}),'application/json')).then(res=>res.json())
		.then(function(data){
			let mapTable={
				text:'content',
				url:'url',
				src:'src'
			};
			const arr=[];
			for(var i=0;i<data.length;i++){
				arr.push.apply(arr,['text','url','src'].filter(function(key){
					return data[i].hasOwnProperty(key)?mapTable[key]:false;
				}).map(function(key){
					return {key:key,content:data[i][key]}
				}));
			}
			tagstore.entries[hashid].attrs=arr;
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
	getPatterns(__tool.pageURL);
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
function getPatterns(url){
	fetch(htmlRequest(api.search,JSON.stringify({
		"seed":url
	}),'application/json'))
	.then(res=>res.json())
	.then(function(data){
		data=data.result;
		__tool.country=data.data[0].country;
		__tool.category=data.data[0].category;
		__tool.status=data.data[0].status;
		for(var i=0;i<data.data[0].patterns.length;i++){
			let hashid = tagstore.createID(data.data[0].patterns[i].id);
			tagstore.entries[hashid]={
				xpath:data.data[0].patterns[i].content,
				attrs:[],
				markInfo:data.data[0].patterns[i].markInfo
			};
			fetch(htmlRequest(api.extractEle,JSON.stringify({
				"url":url,
				"tag":data.data[0].patterns[i].content
			}),'application/json'))
			.then(res=>res.json())
			.then(function(data){
				let mapTable={
					text:'content',
					url:'url',
					src:'src'
				};
				const arr=[];
				for(var i=0;i<data.length;i++){
					arr.push.apply(arr,['text','url','src'].filter(function(key){
						return data[i].hasOwnProperty(key)?mapTable[key]:false;
					}).map(function(key){
						return {key:key,content:data[i][key]}
					}));
				}
				tagstore.entries[hashid].attrs=arr;
			}).catch(function(err){
				alert(err);
			});
		}
		__xpad.entries=tagstore.getEntries();
	}).catch(function(err){
		console.log(err);
	})
}
