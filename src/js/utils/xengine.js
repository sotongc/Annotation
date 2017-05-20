let xegine={};

xegine.xpath=function(target){
	let dpath=this.parent(target);
	let $i=0;
	dpath=dpath.map(function(el){
		$i=xegine.index(el);
		if(el.tagName.toLowerCase()=='html' || el.tagName.toLowerCase()=='body'){
			return el.tagName.toLowerCase();
		}else{
			return el.tagName.toLowerCase()+(`[${$i+1}]`);
		}
	});
	return dpath.reverse().join("/");
};

xegine.parent=function(target){
	return /^body$/i.test(target.tagName)?[target]:[target].concat(this.parent(target.parentNode));
};

xegine.test=function(element) {
    if (element.id !== "") {
        return '//*[@id=\"' + element.id + '\"]';
    }
    if (element == document.body) {
        return '/html/' + element.tagName.toLowerCase();
    }
    var ix = 1, siblings = element.parentNode.childNodes;

    for (var i = 0, l = siblings.length; i < l; i++) {
        var sibling = siblings[i];
        if (sibling == element) {
            return arguments.callee(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix) + ']';
        } else if (sibling.nodeType == 1 && sibling.tagName == element.tagName) {
            ix++;
        }
    }
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