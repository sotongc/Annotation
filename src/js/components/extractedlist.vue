<template>
	<div class="extracted" v-show="listshow">
		<h4 class="title">Extracted List</h4>
		<ul class="e-list">
			<li v-for="item in stored">
				<section>ID:&nbsp;<em>{{item.hashid}}</em></section>
				<section>Pattern:&nbsp;<em>{{item.xpath}}</em></section>
				<section v-for="val in item.attrs">{{val.key}}:&nbsp;<em>{{val.content}}</em></section>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		props:['stored','listshow']
	}
</script>
<style>
	.extracted{background-color:rgba(0,0,0,.6);padding:20px 15px 30px;color:#fff;position:absolute;width:320px;font-size:12px;left:50%;margin-left:-160px;border-radius:8px;}
	.extracted .title{color:#f5da55;font-size:14px;font-weight:600;margin-bottom:10px;}
	.e-list li{border-bottom:1px dashed #fff;padding:10px 0px 5px;}
	.e-list li section em{word-break: break-all;color:rgba(255,255,255,.8);}
</style>
