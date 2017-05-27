<template>
	<div class="querybox">
		<span @click="back">back</span>
		<span @click="goto">{{linkname}}</span>
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
	  	<label>Domain:</label>
    		<el-input class="seedinp" v-model="query.domain" placeholder="input domain here..."></el-input>
    		<el-button @click="search" class="query">query</el-button>
	</div>
</template>
<script>
	export default{
		methods: {
			search:function(){
				this.$emit("condition:query");
			},
			back: function(){
				window.location.assign('./corpus.html');
			},
			goto: function(){
				this.$emit("condition:goto");
			}
		}
	}
</script>
<style>
	.querybox{
		padding:10px;
		margin:15px 40px 5px;
	}
	.querybox>span{
		display:inline-block;
		line-height:30px;
		padding:0 10px;
		background:#8492A6;
		color:#fff;
		margin-right:10px;
		border-radius:5px;
	}
	.querybox>span:hover{
		box-shadow: 0 0 10px #324057;
	}
	.querybox>span:nth-child(2){
		margin-right:50px;
	}
	.querybox .seedinp{
		width:150px;
		margin-right:20px;
	}
	.querybox .select{
		width:112px;
		height:20px;
		margin-right:10px;
	}
	.querybox .el-input__inner{
		height:28px;
	}
	.querybox label{
		vertical-align: middle;
	}
	.querybox .querydate{
		width:245px;
		margin-right:10px;
		border-radius:5px;
	}
	.querybox .query{
		color:#fff;
		font-weight:bold;
		background:#475669;
		border-radius:5px;
		border:none;
		padding:6px;
	}
</style>