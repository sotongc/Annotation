<template>
	<div>
		<app-pagination :totalNum="totalNum" :limit="limit" :pageItems="pageItems" :currentPage="currentPage"></app-pagination>

	</div>
</template>
<script>
	import table from './table.vue';
	import pagination from './pagination.vue';

	export default{
		
		components:{
			'app-pagination':pagination
			//appTable:table
		}
	}
</script>
<style>
	
</style>