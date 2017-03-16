<template>
	<ul class="tabs">
		<li v-for="(tab,i) in tabs" :class="{on:tab.on}" @click="switchTab" data-index :data-index="i">{{tab.label}}</li>
	</ul>
</template>
<script>
	export default{
		methods:{
			switchTab:function(eve){
				let t=Number(eve.target.dataset["index"]);
				this.tabs=this.tabs.map(function(v,i){
					return {label:v.label,on:(i==t)?1:0};
				});
				this.$emit("tab:change",this.tabs[t],t);
			}
		}
	}
</script>
<style>
	.tabs{border-bottom:1px solid #ccc;}
	.tabs li{color:#657180;display:inline-block;padding:8px 16px;margin-right:16px;cursor:pointer;}

	.tabs .on{color:#39f;border-bottom:3px solid #39f;}
</style>