<template>
	<div class="navtab">
		<el-breadcrumb separator="/" class="navigator">
			<el-breadcrumb-item><a href="./home.html"><el-tag class="tag" type="success">Home</el-tag></a></el-breadcrumb-item>
	 	 	<el-breadcrumb-item>
	 	 		<a v-if="type == 0" href="./seed.html"><el-tag class="tag" type="primary">Statistics</el-tag></a>
	 	 		<a v-else href="./corpus.html"><el-tag class="tag" type="primary">Statistics</el-tag></a>
	 	 	</el-breadcrumb-item>
	 	 	<el-breadcrumb-item><el-tag type="gray" class="tag">{{tabname}}</el-tag></el-breadcrumb-item>
		</el-breadcrumb>
		<div class="querybox">
			<label>DateRange:</label>
			<el-date-picker
				class="querydate"
				range-separator=' —— '
		      	v-model="query.daterange"
		      	type="daterange"
		      	placeholder="select daterange"
	      	>
		    </el-date-picker>
		    <label>Country:</label>
		  	<el-select class="select" v-model="query.country" placeholder="">
			    <el-option
			      	v-for="item in options"
			      	:label="item.label"
			      	:value="item.value">
			    </el-option>
		  	</el-select>
		    <template v-if="tabname == 'Seed Statistics'">
		    		<label>Seed:</label>
		    		<el-input class="seedinp" v-model="query.seed" placeholder="input seed here..."></el-input>
		    </template>
		    <template v-if="tabname == 'Domain Statistics'">
		    		<label>Domain:</label>
		    		<el-input class="seedinp" v-model="query.domain" placeholder="input domain here..."></el-input>
		    </template>
		    <template v-if="tabname == 'Seed Statistics' || tabname == 'Domain Statistics'">
			  	<label>OrderBy:</label>
			  	<el-select class="select" v-model="query.orderBy" placeholder="">
				    <el-option
				      	v-for="key in conditions"
				      	:label="key.label"
				      	:value="key.value">
				    </el-option>
			  	</el-select>
			  	<label>Order:</label>
			  	<el-select class="select" v-model="query.order" placeholder="">
				    <el-option
				      	v-for="sort in sorts"
				      	:label="sort.label"
				      	:value="sort.value">
				    </el-option>
			  	</el-select>
		    </template>
		    <el-button @click="search" class="query">query</el-button>
		</div>
		<div class="clearfix"></div>	
	</div>
</template>
<script>
	export default{
		methods:{
			search:function(){
				this.$emit("date:query");
			}
		}
	}
</script>
<style>
	.navtab{
		padding:15px 10px;
		margin:0 40px;
	}
	.navtab .navigator{
		line-height:32px;
		height:36px;
	}
	.navtab .navigator .tag{
		font-size:15px;
		height:28px;
		line-height:25px;
	}
	.navtab .querybox{
		margin-top:15px;
	}
	.navtab .seedinp{
		width:140px;
		margin-right:20px;
	}
	.navtab .select{
		width:112px;
		height:20px;
		margin-right:10px;
	}
	.navtab .el-input__inner{
		height:28px;
	}
	.navtab label{
		vertical-align: middle;
	}
	.navtab .querydate{
		width:245px;
		margin-right:10px;
		border-radius:5px;
	}
	.navtab .query{
		color:#fff;
		font-weight:bold;
		background: #286090;
		border-radius:5px;
		border:none;
		padding:6px 8px;
		box-shadow: 2px 2px 3px rgba(0,0,0,.2);
	}
	.navtab .query:hover{
		background: #204d74;
	}
</style>