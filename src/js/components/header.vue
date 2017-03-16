<template>
	<nav class="nav clearfix">
		<img :src="source" @click="assign"/>
		<p class="heading">SEED MANAGEMENT</p>
	</nav>
</template>
<script>
	import home from "../../img/home.png";
	export default{
		data:function(){
			return {source:home};
		},
		methods:{
			assign:function(){
				window.location.assign('./home.html');
			}
		}
	}
</script>
<style>
	.nav{background:#323330;height:40px;}
	.nav img{height:40px;height:40px;padding:7.5px 10px;cursor:pointer;float:left;border-right:2px groove #444;}
	.nav .heading{color:#E8E8E8;display:inline-block;float:left;line-height:40px;padding:0px 30px;cursor:default;transition:transform 0.8s}
	.nav:hover .heading{transform:translate(30%,0);}
</style>