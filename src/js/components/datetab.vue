<template>
	<div class="navtab">
		<el-breadcrumb separator="/" class="navigator">
			<el-breadcrumb-item><a href="./home.html"><el-tag class="tag" type="success">Home</el-tag></a></el-breadcrumb-item>
	 	 	<el-breadcrumb-item><a href="./seed.html"><el-tag class="tag" type="primary">Seed</el-tag></a></el-breadcrumb-item>
	 	 	<el-breadcrumb-item>{{tabname}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="querybox">
			<label>Date:</label>
			<el-date-picker
				class="querydate"
		      	v-model="query.date"
		      	type="date"
		      	placeholder="select date"
		      	:picker-options="pickerOptions">
		    </el-date-picker>
		    <template v-if="tabname == 'Seed Statistics'">
		    		<label>Seed:</label>
		    		<el-input class="seedinp" v-model="query.seed" placeholder="input seed here..."></el-input>
		    </template>
		    <template v-if="tabname == 'Seed Statistics' || tabname == 'Domain Statistics'">
		    		<label>Country:</label>
			  	<el-select class="select" v-model="query.country" placeholder="">
				    <el-option
				      	v-for="item in options"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
			  	</el-select>
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
		data() {
			return {
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				}
			}
		},
		methods:{
			search:function(){
				this.$emit("date:query");
			}
		}
	}
</script>
<style>
	.navtab{
		padding:10px;
		margin:10px 40px;
	}
	.navtab .navigator{
		float:left;
		line-height:40px;
		margin-right:40px;
		height:36px;
		font-size:16px;
	}
	.navtab .navigator .tag{
		font-size:16px;
		height:28px;
		line-height:25px;
	}
	.navtab .querybox{
		float:left;
	}
	.navtab .seedinp{
		width:150px;
		margin-right:20px;
	}
	.navtab .select{
		width:130px;
		margin-right:15px;
	}
	.navtab label{
		vertical-align: middle;
		font-size:16px;
	}
	.navtab .querydate{
		width:150px;
		margin:0 25px 0 5px;
		border-radius:5px;
	}
	.navtab .query{
		color:#fff;
		font-weight:bold;
		background:#475669;
		border-radius:5px;
		border:none;
		padding:8px 10px;
	}
</style>