/**
 * @ gulpfile 的示例配置
 * @ tasks:
 *  - default: 启动 webpack-dev-server
 *  - build-dev
*/

var gulp=require('gulp'),
    gutil=require('gulp-util'),
    path=require('path'),
    webpack=require('webpack'),
    WebpackDevServer=require('webpack-dev-server'),
    webpackConfig=require('./webpack.config.js'),
    pump=require('pump'),
    clean=require('gulp-clean'),
    cssmin=require('gulp-minify-css'),
    uglify=require('gulp-uglify');

/**
 * @ Default (开发模式下推荐)
 * @ description: 启动 webpack-dev-server
*/
gulp.task("default",["webpack-dev-server"]);

gulp.task("webpack-dev-server",function(callback){

  //modify some webpack config options
  var config=Object.create(webpackConfig);
  config.devtool="eval";

  //start a webpack-dev-server
  new WebpackDevServer(webpack(config),{
    publicPath:config.output.publicPath,
    stats:{
      colors:true
    },
    inline:true
  }).listen(8080,"localhost",function(err){
    if(err) throw new gutil.PluginError("webpack-dev-server",err);
    gutil.log("[webpack-dev-server]","http://localhost:8080/index.html");
  });
});


/**
 * @ Production build
 * @ description: 生产环境的构建
*/

gulp.task("build",["gulp:uglify","gulp:minify-css"]);

gulp.task("webpack:build",function(callback){

  //modify some webpack config options
  var config=Object.create(webpackConfig);

  config.plugins=config.plugins.concat(
    new webpack.DefinePlugin({
      "process.env":{"NODE_ENV":JSON.stringify("production")}
    }),
    new webpack.optimize.DedupePlugin()//模块去重，但会增加入口文件的开销
  );

  //run webpack
  webpack(config,function(err,stats){
    if(err) throw new gutil.PluginError("webpack:build",err);
    gutil.log("[webpack:build]",stats.toString({
      colors:true
    }));
  });
  callback();
});

// compress
gulp.task("gulp:minify-css",['webpack:build'],function(){
  gulp.src(path.join(__dirname,'/dist/css/*.css'))
          .pipe(cssmin())
          .pipe(gulp.dest(path.join(__dirname,'/build/css')));
});

gulp.task('gulp:uglify',['webpack:build'],function(cb){
  pump([
    gulp.src(path.join(__dirname,'/dist/js/*.js')),
    uglify(),
    gulp.dest(path.join(__dirname,'/build/js'))
  ],cb);
});

//clean

gulp.task('gulp:clean',function(cb){
  return gulp.src([
    path.resolve(__dirname,'dist/js/*.js'),
    path.resolve(__dirname,'build/js/*.js'),
  ]).pipe(clean({force:true}));
});
