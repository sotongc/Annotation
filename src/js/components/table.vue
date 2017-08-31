<template>
	<table class="table">
		<caption>{{title}}</caption>
		<!--item heading-->
		<tr>
			<th v-for="heading in headings">{{heading.text}}</th>
			<th class="btnTh">op</th>
		</tr>

		<!--item list-->
		<tbody v-if="list.length">
			<tr v-for="(item,i) in list" :class="{enable:enable,selected:Object.is(i,activeIndex)}" @click="select" :data-index="i">
				<td v-for="th in headings" :style="{color:th.color}">
					<template v-if="th.key=='number'">
						{{i+1+(pageNo-1)*pageSize}}
					</template>
					<template v-else-if="th.key=='lastCrawlTimestamp'|| th.key == 'lastParseTimestamp'">
						{{getTime(item[th.key])}}
					</template>
					<a v-else-if="th.key=='seed'" @click="toXpath(item['seed'],type)">
						{{item[th.key]}}
					</a>
					<template v-else>
						{{item[th.key]}}
					</template>
				</td>
				<td>
					<template v-if="title=='CORPUS LIST'">
						<a class="btn" target='_blank' :href="'./crawlstat.html?type=1&seed='+item['seed']">crawlstat</a>
						<a class="btn" target='_blank' :href="'./seednews.html?type=1&seed='+item['seed']">topnews</a>
					</template>
					<template v-else>
						<a class="btn" target='_blank' :href="'./crawlstat.html?type=0&seed='+item['seed']">crawlstat</a>
						<a class="btn" target='_blank' :href="'./seednews.html?type=0&seed='+item['seed']">seednews</a>
					</template>
				</td>
			</tr>
		</tbody>
		<tbody v-else>
			<tr class="gray">
				<td :colspan="headings.length+1">No Data Currently...</td>
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
			},
//			toCrawlstat:function(domain){
//				window.location.assign('./crawlstat.html?type=0&seed='+domain);
//			},
//			toCrawlstatis:function(domain){
//				window.location.assign('./crawlstat.html?type=1&seed='+domain);
//			},
//			toSeedNews: function(domain){
//				window.location.assign('./seednews.html?type=0&seed='+domain);
//			},
//			toTopNews: function(domain){
//				window.location.assign('./seednews.html?type=1&seed='+domain);
//			},
			toXpath: function(seed,type){
				window.location.assign(`./xpath.html?type=${type}&seed=${seed}`);
			}
		}
	}
</script>
<style>
	.table{width:100%;border-collapse:collapse;text-align:center;font-size:12px;margin-bottom:20px;box-sizing:border-box;}
	.table tr{line-height:24px;border-bottom:1px solid #ccc;}
	.table td{border:1px solid #ccc;border-top:none;border-bottom:none;white-space:nowrap;}
	.table th{color:#fff;background-color:#0099e5;}
	.table th:first-child{width:65px;}
	.gray{color:#ababab;}
	.table caption{text-align:left;margin:10px 0px;font-size:14px;font-weight:500;}
	.table .enable{cursor:pointer;}
	.table .enable:hover{background-color:#f5da55;}
	.table .selected{background-color:#f5da55;}
	.table .btnTh{width:170px;}
	.table .btn{display:inline-block;padding:0 5px;background:rgb(146,89,178);color:#fff;border-radius:3px;line-height:24px;margin:0 3px;}
	.table .btn:hover{box-shadow: 1px 1px 2px rgba(0,0,0,.3);}
</style>