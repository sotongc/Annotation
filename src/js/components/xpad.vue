<template>
	<div class="xpad" :style="{height:`${height}px`}">
		<h2 class="title">Pattern Pad</h2>
		<app-entry :entries="entries"></app-entry>
		<button class="add" @click="addEntry">Add Entry</button>
	</div>
</template>
<script>
	import entry from './entry.vue';
	export default{
		components:{
			appEntry:entry
		},
		methods:{
			addEntry:function(){
				this.$emit("xpad:add");
			}
		}
	}
</script>
<style>
	.xpad{margin:5px auto 10px;overflow:auto;}
	.xpad .title{background-color:#2aabd2;color:#fff;text-align:center;font-size:20px;padding:5px;}
	.xpad .add{background-color:#2aabd2;border:none;color:#fff;padding:5px 5px;margin-left:5px;border-radius:4px;font-size:12px;}
</style>