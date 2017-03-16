<template>
	<section class="card" @click="assign">
		<img :src="item.src" class="icon"/>
		<h4 class="name">{{item.name}}</h4>
	</section>
</template>
<script>
	export default{
		props:['item'],
		methods:{
			assign:function(){
				window.location.assign(this.item.href);
			}
		}
	}
</script>
<style>
	.card{background-color:#f5da55;text-align:center;width:230px;margin:20px;cursor:pointer;border-radius:10px;box-shadow:3px 3px 2px #E8E8E8;}
	.card .icon{width:40px;height:40px;margin:40px 0px 10px;transition:transform 0.8s;}
	.card .name{text-align:left;padding:10px 20px;font-size:10px;margin-bottom:10px;transition:transform 1.2s;transform-style:preserve-3d;}
	.card:hover .name{transform:translate(40%,0) rotateY(360deg);}
	.card:hover .icon{transform:scale(1.2);}
</style>