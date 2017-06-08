var webpack=require('webpack');
var path=require("path");

var ExtractTextPlugin=require('extract-text-webpack-plugin');
var HtmlWebpackPlugin=require('html-webpack-plugin');
var BabiliPlugin=require('babili-webpack-plugin');

var config={
	entry:{
		home:'./src/js/home.js',
		seed:'./src/js/seed.js',
		xpath:'./src/js/xpath.js',
		login:'./src/js/login.js',
		accounts:'./src/js/accounts.js',
		crawlstat:'./src/js/crawlstat.js',
		seednews:'./src/js/seednews.js',
		countrystat:'./src/js/countrystat.js',
		seedstat:'./src/js/seedstat.js',
		domainstat:'./src/js/domainstat.js',
		corpus:'./src/js/corpus.js',
		topnews:'./src/js/topnews.js'
	},
	output:{
		path:path.resolve(__dirname,'../dist'),
		publicPath:'../',
		filename:'js/[name].js'
	},
	module:{
		rules:[
			{
				test:/\.vue$/,
				loader:'vue-loader',
				exclude:/node_modules/,
				options:{
					loaders:{
						css:ExtractTextPlugin.extract({
							use:'css-loader',
							fallback:'vue-style-loader'
						})
					}
				}
			},
			{
				test:/\.css$/,
				loader:ExtractTextPlugin.extract({
					use:'css-loader',
					fallback:'style-loader'
				})
			},
			{
				test:/\.js$/,
				loader:'babel-loader',
				exclude:/node_modules/,
				query:{
					presets:['es2015']
				}
			},
			{
				test:/\.(png|jpg|gif|svg)$/,
				loader:'file-loader',
				options:{
					name:'[name].[ext]'
				}
			},
			{
		        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
		        loader: 'file-loader'
		    },
			{
				test:/\.json$/,
				loader:'json-loader'
			}
		]
	},
	resolve:{
		alias:{
			'vue$':'vue/dist/vue.common.js',
			'elementui':'/element-ui/lib/element-ui.common.js'
		}
	},
	plugins:[
		new webpack.optimize.CommonsChunkPlugin({
			name:'vendor',
			filename:'vendor.bundle.js',
			minChunks:function(module,count){
				return (
					module.resource && 
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(
						path.join(__dirname,'../node_modules')
					)===0
				);
			}
		}),
		new BabiliPlugin({}),
		new ExtractTextPlugin({
			filename:'css/[name].style.css',
			allChunks:true
		})
	]
};

[
	"home",
	"seed",
	"xpath",
	"login",
	"accounts",
	"crawlstat",
	"seednews",
	"countrystat",
	"seedstat",
	"domainstat",
	"corpus",
	"topnews"
].forEach(function(chunk){
	config.plugins.push(new HtmlWebpackPlugin({
		filename:'view/'+chunk+'.html',
		template:path.resolve(__dirname,'../template/'+chunk+'.html'),
		chunks:['vendor',chunk]
	}));
});

module.exports=config;

