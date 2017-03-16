let xegine={};

xegine.xpath=function(target){
	let dpath=this.parent(target);
	let $i=0;

	dpath=dpath.map(function(el){
		$i=xegine.index(el);
		return el.tagName.toLowerCase()+($i?`[${$i+1}]`:'');
	});

	return dpath.reverse().join(">");
};

xegine.parent=function(target){
	return /^body$/i.test(target.tagName)?[target]:[target].concat(this.parent(target.parentNode));
};

xegine.index=function(target){
	let siblings=target.parentNode.children,
		tname=target.tagName,
		index=-1;

	for(let i=0;i<siblings.length;i++){
		if(Object.is(tname,siblings[i].tagName)){
			index++;
			if(target.isSameNode(siblings[i]))
				break;
		}
	}

	return index;
}

/* export */
export default xegine;