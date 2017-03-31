<template>
	<main class="login-container">
		<div class="loginbox">
			<section class="label">LOGIN</section>
			<div class="clearfix">
				<section class="username-field field">
					<label>Username:</label>
					<input type="text" placeholder="username" v-model.lazy.trim="username" @keyup.13="login" @focus="reset"/>
				</section>
				<section class="password-field field">
					<label>Password:</label>
					<input type="password" placeholder="password" v-model.lazy="password" @keyup.13="login" @focus="reset"/>
				</section>
			</div>
			<button type="button" class="go" @click="login">GO</button>
			<p class="err-info">{{errmessage}}</p>
			<p class="des">&gt;&emsp;The seed annotation &amp; managment tool</p>
		</div>
	</main>
</template>
<script>
	import 'whatwg-fetch';
	import api from '../conf/API.json'; 
	export default{
		props:{
			username:{
				type:String,
				default:''
			},
			password:{
				type:String,
				default:''
			},
			errmessage:{
				type:String,
				default:''
			}
		},
		computed:{
			validator:function(){
				return this.password && this.username;
			}
		},
		methods:{
			    //设置名称为name,值为value的Cookie
			   //即document.cookie= name+"="+value+";path=/";   时间可以不要，但路径(path)必须要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！~
			login:function(){
				if(this.validator){
					const that = this;
					fetch(api.login,{
						method:'POST',
						headers:{
							'Content-Type':'application/json'
						},
						mode:'cors',
						body:JSON.stringify({
							'username': this.username,
							'password': this.password
						})
					}).then(function(res){
						return res.json();
					}).then(function(data){
						if(data.success){
							var oDate = new Date();
    							oDate.setDate( oDate.getDate() + 7 );
						    document.cookie = "username="+data.data.username+";expires="+oDate.toGMTString()+";path=/";
						    document.cookie = "authority="+data.data.authority+";expires="+oDate.toGMTString()+";path=/";
						    document.cookie = "session="+data.data.session+";expires="+oDate.toGMTString()+";path=/";
							window.location.assign('./home.html');
//							localStorage.setItem('userInfo',JSON.stringify(data.data));
						}else{
							that.errmessage=data.message;
						}
					}).catch(function(error){
						console.error(`Failed: ${error}!`);
					});
				} else{
					this.errmessage="Error: Username and Password cannot leave empty!";
				}
			},
			reset:function(){
				this.errmessage='';
			}
		}
	}
</script>
<style>
	.login-container{height:100%;display:flex;justify-content:center;align-items:center;background:url(../../img/login-bg.jpg);}
	.loginbox{width:524px;height:262px;background:url(../../img/form-bg.png);position:relative;font-family:Verdana,Arial;color:#fff;}

	.go{position:absolute;right:10px;bottom:10px;width:95px;height:73px;background:transparent;color:#fff;font-family:Verdana,Arial;font-size:26px;border:none;}
	.go:hover{background:url(../../img/go-hover.png);}

	.loginbox .label{font-size:20px;margin:33px 0px 0px 40px;}

	.loginbox .field{font-size:100%;float:left;padding:40px 0px 0px 25px;}
	.loginbox .field label{display:block;margin-left:5px;margin-bottom:15px;}
	.loginbox .field input{display:block;border:none;width:168px;height:38px;padding:5px 35px 5px 15px;font-size:16px;color:#2d2d2d;}

	.username-field input{background:url(../../img/username-field.png);}
	.password-field input{background:url(../../img/password-field.png);}

	.username-field input:hover{background:url(../../img/username-field-hover.png);}
	.password-field input:hover{background:url(../../img/password-field-hover.png);}

	.loginbox .des{font-size:12px;color:#ccc;line-height:26px;margin:0px 32px 20px;}
	.loginbox .err-info{font-size:12px;color:#dc0909;margin:0px 32px;line-height:20px;position:relative;height:20px;}
</style>