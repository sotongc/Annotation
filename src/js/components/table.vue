<template>
	<table class="table">
		<caption>{{title}}</caption>
		<!--item heading-->
		<tr>
			<th v-for="heading in headings">{{heading.text}}</th>
		</tr>

		<!--item list-->
		<tbody v-if="list.length">
			<tr v-for="(item,i) in list" :class="{enable:enable,selected:Object.is(i,activeIndex)}" @click="select" :data-index="i">
				<td v-for="th in headings" :style="{color:th.color}">{{item[th.key]}}</td>
			</tr>
		</tbody>
		<tbody v-else>
			<tr class="gray">
				<td :colspan="headings.length">No Data Currently...</td>
			</tr>
		</tbody>
	</table>
</template>
<script>
	export default{
		computed:{
			activeIndex:function(){
				return Object.is(this.active,true)?0:this.active;
			}
		},
		methods:{
			select:function(e){
				this.active=+e.target.parentNode.dataset.index;
				this.$emit("table:selected",+e.target.parentNode.dataset.index);
			}
		}
	}
</script>
<style>
	.table{width:100%;border-collapse:collapse;text-align:center;font-size:12px;margin-bottom:30px;}
	.table tr{line-height:24px;border-bottom:1px solid #ccc;}
	.table td{border:1px solid #ccc;border-top:none;border-bottom:none;white-space:nowrap;}
	.table th{color:#fff;background-color:#0099e5;}
	.gray{color:#ababab;}
	.table caption{text-align:left;margin:10px 0px;font-size:14px;font-weight:500;}
	.table .enable{cursor:pointer;}
	.table .enable:hover{background-color:#f5da55;}
	.table .selected{background-color:#f5da55;}
</style>