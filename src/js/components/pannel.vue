<template>
	<div class="pannel">
		<el-dropdown class="statistics" menu-align="start">
		  	<el-button class="btn">
		    		Statistics<i class="el-icon-caret-bottom el-icon--right"></i>
		  	</el-button>
		  	<el-dropdown-menu style="background:#738195;color:#fff" slot="dropdown">
		    		<a href="./countrystat.html"><el-dropdown-item>Country Statistics</el-dropdown-item></a>
		    		<a href="./seedstat.html"><el-dropdown-item>Seed Statistics</el-dropdown-item></a>
		    		<a href="./domainstat.html"><el-dropdown-item>Domain Statistics</el-dropdown-item></a>
		  	</el-dropdown-menu>
		</el-dropdown>
		<label>Seed: </label>
		<input class="textfield" type="text" placeholder="input seed here..." v-model="query.seed"/>
		
		<label>Country: </label>
		<select v-model="query.country">
			<option v-for="country in countries">{{country}}</option>
		</select>

		<label>Category: </label>
		<select v-model="query.category">
			<option v-for="type in category">{{type}}</option>
		</select>

		<label>Domain: </label>
		<input type="text" class="textfield" placeholder="bbc.co.uk" v-model="query.domain"/>

		<input class="button" type="button" value="search" @click="search"/>
	</div>
</template>
<script>
	export default{
		methods:{
			search:function(){
				this.$emit("pannel:onsearch");
			}
		}
	}
</script>
<style>
	.pannel{padding:10px;margin:15px 40px 5px;}
	.pannel .statistics{margin-right:50px;}
	.pannel .statistics .btn{background:#475669;color:#fff;}
	.pannel label{vertical-align:middle;}
	.pannel .textfield{width:220px;height:28px;padding:0px 10px;border:1px solid #ccc;}
	.pannel .button{height:28px;width:60px;background-color:#323330;color:#fff;border:none;cursor:pointer;}
	.pannel .button,.pannel .textfield{border-radius:4px;margin-left:10px;outline:none;}
	.pannel select{height:28px;background-color:inherit;}
	.pannel input,.pannel select,.pannel label{margin-right:10px;}
</style>