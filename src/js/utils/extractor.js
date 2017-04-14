let extractor={};

extractor.getDomInfo=function(eve){
	let deepPath=eve.deepPath || eve.path || [];
	let target=eve.target;
	if(!deepPath){
		deepPath=this.getParentNode(target);
	}
	deepPath=deepPath.filter((el)=>!/document/.test(el.tagName)&&el.tagName);
	deepPath=deepPath.map((el)=>el.tagName.toLowerCase());
	return deepPath.reverse().join("/");
};

extractor.getParentNode=function(target){
	return target?[target].concat(this.getParentNode(target.parentNode)):[];
};

extractor.getAttrInfo=function(target){
	let attrlist=[];

	target.innerText && attrlist.push({key:'content',value:target.innerText});

	Object.keys(target.attributes).forEach(function(key){
		attrlist.push({
			key:target.attributes[key].name,
			value:target.attributes[key].value
		});
	});	
	return attrlist;
};

export default extractor;