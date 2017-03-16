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
			login:function(){
				if(this.validator){

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