<template>
	<div class="info">
		<app-infobox :xpath="xpath" :attributes="attributes" :isshow="isshow"></app-infobox>
		<app-elist :stored="stored" :listshow="listshow"></app-elist>
	</div>
</template>
<script>
	import infobox from './infobox.vue';
	import elist from './extractedlist.vue';
	export default {
		components:{
			appInfobox:infobox,
			appElist:elist
		}
	}
</script>
<style>
	.info{position:absolute;top:70px;left:0px;min-width:600px;width:100%;height:0px;}
</style>