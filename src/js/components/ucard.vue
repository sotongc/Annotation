<template>
	<div class="user-card clearfix">
		<section>
			<img src="../../img/avtar.jpg" class="avtar"/>
		</section>
		<section>
			<p class="i-label">
				<label>username:&nbsp;</label>
				<span>{{username?username:'xxxxx'}}</span>
				<button class="delete">Delete</button>
				<button class="done">Done</button>
			</p>
			<label class="b-label">authority:</label>
			<div class="authority-options">
				<button class="button" :class="{on: authority == 1}">a1</button>
				<button class="button" :class="{on: authority == 2}">a2</button>
				<a class="create" @click="visDialog">Create</a>
				<el-dialog title="Create Editor" v-model="dialogVisible" size="tiny" top="25%">
				  	<el-form :model="form">
				  		<el-form-item label="username:" :label-width="formLabelWidth">
				  			<el-input v-model.lazy.trim="form.username" placeholder="username(5~15)" @keyup.13="addEditor" @focus="reset"></el-input>
				  		</el-form-item>
				  		<el-form-item label="password:" :label-width="formLabelWidth">
				  			<el-input v-model.lazy.trim="form.password" placeholder="password(5~15)" @keyup.13="addEditor" @focus="reset"></el-input>
				  		</el-form-item>
				  	</el-form>
				  	<p class="message">{{errmessage}}</p>
				  	<span slot="footer" class="dialog-footer">
				    		<el-button @click="hidDialog">Cancel</el-button>
				    		<el-button type="primary" @click="addEditor">Save</el-button>
				  	</span>
				</el-dialog>
			</div>
		</section>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				formLabelWidth:'80px'
			}
		},
		methods:{
			visDialog:function(){
				this.dialogVisible=true;
			},
			hidDialog:function(){
				this.dialogVisible=false;
			},
			reset:function(){
				this.errmessage='';
			},
			addEditor:function(){
				this.$emit('add:editor');
			}
		}
	}
</script>
<style>
	.user-card{border:1px solid #c1c1c1;padding:10px 15px;border-radius:4px;}
	.avtar{width:88px;height:88px;border-radius:10px;margin-right:20px;}
	.authority-options{padding:3px 6px;}
	.authority-options .button{border:none;color:#fff;padding:2px 15px;background-color:#bbb;border-radius:3px;margin:0px 2px 5px;}
	.authority-options .on{background-color:#08d195;}

	.user-card .b-label{display:block;margin:10px 0px 5px;}
	.user-card .i-label{border-bottom:1px dotted #ccc;line-height:26px;}
	.user-card section{float:left;}
	.user-card section:nth-child(2){width:530px;}
	.user-card .done,.user-card .delete{float:right;padding:3px 12px;border:none;color:#fff;border-radius:3px;}
	.user-card .done{background-color:#08d195;}
	.user-card .delete{background-color:#e61414;margin-left:5px;}
	.user-card .create{float:right;cursor:pointer;text-decoration:underline;color:#20A0FF;}
	.user-card .create:hover{color:#4DB3FF;}
	.user-card .message{color:#dc0909;margin:0px 32px;line-height:20px;height:20px;}
</style>