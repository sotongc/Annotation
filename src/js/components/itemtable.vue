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
				<td v-for="th in headings" :style="{color:th.color}">
					<template v-if="th.key == 'number'">
						{{i+1+(pageNo-1)*pageSize}}
					</template>
					<template v-else-if="th.key == 'url'">
						<a :href="item['url']" target="_blank">{{item[th.key]}}</a>
					</template>
					<template v-else>
						{{(th.key == 'parseTimestamp' || th.key == 'crawlTimestamp' || th.key == 'processTimestamp' || th.key == 'modifyTime' || th.key == 'createTime'|| th.key=='lastModifyTimestamp') ? getTime(item[th.key]):item[th.key]}}
					</template>
				</td>
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
			},
			getTime:function( timestamp ) {
				let t = new Date(timestamp);
				let y = t.getFullYear();
				let m = t.getMonth() + 1;
				let d = t.getDate();
				let h = t.getHours();
				let i = t.getMinutes();
				let s = t.getSeconds();
				return [y, m , d].map( formatNumber ).join('-') + ' ' + [h, i, s].map( formatNumber ).join(':');
				function formatNumber(n) {
				    n = n.toString();
				    return n[1] ? n : '0' + n;
				}
			}
		}
	}
</script>
<style>
	.table{width:100%;border-collapse:collapse;text-align:center;font-size:12px;margin-bottom:20px;}
	.table tr{line-height:24px;border-bottom:1px solid #ccc;}
	.table td{border:1px solid #ccc;border-top:none;border-bottom:none;white-space:nowrap;max-width:1000px;overflow:hidden;text-overflow:ellipsis;}
	.table th{color:#fff;background-color:#0099e5;}
	.table th:first-child{width:70px;}
	.gray{color:#ababab;}
	.table caption{text-align:left;margin:10px 0px;font-size:14px;font-weight:500;}
	.table .enable{cursor:pointer;}
	.table .enable:hover{background-color:#f5da55;}
	.table .selected{background-color:#f5da55;}
</style>