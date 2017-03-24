var dev=require('./build/dev.config.js');
var pro=require('./build/pro.config.js');

module.exports=(function(env){
	if(env==="production")
		return pro;
	if(env=="development")
		return dev;
	return {};
})(process.env.NODE_ENV);