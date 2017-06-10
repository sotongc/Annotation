<template>
	<div class="pannel">
		<el-dropdown class="statistics" menu-align="start">
		  	<el-button class="btn">
		    		Statistics<i class="el-icon-caret-bottom el-icon--right"></i>
		  	</el-button>
		  	<el-dropdown-menu style="background:#738195;color:#fff" slot="dropdown">
		  		<template v-if="type == 0">
			    		<a href="./countrystat.html?type=0"><el-dropdown-item>Country Statistics</el-dropdown-item></a>
			    		<a href="./seedstat.html?type=0"><el-dropdown-item>Seed Statistics</el-dropdown-item></a>
			    		<a href="./domainstat.html?type=0"><el-dropdown-item>Domain Statistics</el-dropdown-item></a>
			    </template>	
			    <template v-else>
			    		<a href="./countrystat.html?type=1"><el-dropdown-item>Country Statistics</el-dropdown-item></a>
			    		<a href="./seedstat.html?type=1"><el-dropdown-item>Seed Statistics</el-dropdown-item></a>
			    		<a href="./domainstat.html?type=1"><el-dropdown-item>Domain Statistics</el-dropdown-item></a>
		    		</template>
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
	.pannel label{vertical-align:middle;margin-right:5px;}
	.pannel .textfield{width:180px;height:28px;padding:0px 10px;border:1px solid #ccc;}
	.pannel .button{height:28px;width:60px;background-color:#286090;color:#fff;border:none;cursor:pointer;box-shadow: 2px 2px 3px rgba(0,0,0,.2);}
	.pannel .button:hover{background: #204d74;}
	.pannel .button,.pannel .textfield{border-radius:4px;outline:none;}
	.pannel select{height:28px;background-color:inherit;width:85px;}
	.pannel input,.pannel select{margin-right:15px;}
</style>