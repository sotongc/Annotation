import xengine from './xengine.js';

let tagstore={};

tagstore.el={};
tagstore.entries={};

/**
 * @ CURD Operation
*/

tagstore.add=function(target){
	if(!target.dataset.hasOwnProperty("hashid")){
		let hashid=this.createID(target.tagName);
		//add entry & target ref		
		this.el[hashid]=target;
		this.entries[hashid]={
			xpath:xengine.xpath(target),
			attrs:[],
			markInfo:''
		};

		[target.getAttribute("href")||target.getAttribute("src")||undefined,target.innerText].forEach(function(val,i){
			val && this.entries[hashid].attrs.push({key:i?'content':'url',content:val});
		}.bind(this));

		//mark the annotated dom 
		target.dataset.hashid=hashid;
	}
};

tagstore.addEntry=function(){
	this.entries[this.createID('CUSTOM')]={
		xpath:'',
		attrs:[],
		markInfo:''
	};
};

tagstore.deleteEl=function(hashid){
	if(this.el[hashid]){
		delete this.el[hashid].dataset.hashid;
		delete this.el[hashid];
	}
};

tagstore.deleteEntries=function(hashid){
	this.entries[hashid] && delete this.entries[hashid];
};

tagstore.delete=function(hashid){
	this.deleteEl(hashid);
	this.deleteEntries(hashid);
};

tagstore.set=function(hashid,ref){
	this.el[hashid]=ref;
};

tagstore.get=function(hashid){
	return this.el[hashid];
};

tagstore.empty=function(){
	this.el={};
	this.entries={};
};

tagstore.getEntries=function(){
	return Object.keys(this.entries).map(function(key){
		return this.entries[key].hashid=key,this.entries[key];
	}.bind(this));
};

tagstore.getSaveFormat=function(){
	return Object.keys(this.entries).filter(function(key){
		return this.entries[key].attrs.length;
	}.bind(this)).map(function(key){
		return {type:'xpath',content:this.entries[key].xpath,markInfo:this.entries[key].markInfo};
	}.bind(this));
};

/**
 * create unique identifiers
 */

tagstore.createID=function(tagname){
	return this.jshash(tagname+Date.now().toString(16).split("").reverse().join(""));
};

tagstore.jshash=function(plaintext){
	let hash=0;

	for(let i=0;i<plaintext.length;i++){
		hash ^= (hash<<5)+plaintext.charAt(i)+(hash>>2)
	}
	return (hash & 0x7FFFFFFF).toString(16);
};

export default tagstore;