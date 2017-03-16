<template>
	<div class="pannel">
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
	.pannel{padding:13px;margin:20px 40px;}
	.pannel label{vertical-align:middle;}
	.pannel .textfield{width:220px;height:22px;padding:0px 10px;border:1px solid #ccc;}
	.pannel .button{height:22px;width:60px;background-color:#323330;color:#fff;border:none;cursor:pointer;}
	.pannel .button,.pannel .textfield{border-radius:4px;margin-left:10px;outline:none;}
	.pannel select{height:22px;background-color:inherit;}
	.pannel input,.pannel select,.pannel label{margin-right:10px;}
</style>