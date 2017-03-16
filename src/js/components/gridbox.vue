<template>
	<div class="gridbox">
		<app-card v-for="item in items" :item="item"></app-card>
	</div>
</template>
<script>
	import card from './card.vue';
	export default{
		components:{
			appCard:card
		}
	}
</script>
<style>
	.body{background-color:#323330;color:#fff;}
	.gridbox{display:flex;justify-content:space-around;align-items:center;margin:40px;height:500px;}
</style>