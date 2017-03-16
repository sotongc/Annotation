<template>
	<div :class="['infobox',{'align-left':align.left,'align-right':align.right}]" @mouseover="reflow" v-show="isshow">
		<p class="xpath">{{xpath}}</p>
		<ul class="attributes">
			<li v-for="attr in attributes">{{attr.key}}: <span>{{attr.value}}</span></li>
		</ul>
	</div>
</template>
<script>
	export default{
		props:['xpath','attributes','isshow'],
		data:function(){
			return {align:{left:true,right:false}};
		},
		methods:{
			reflow:function(){
				this.align={
					left:this.align.right,
					right:this.align.left
				};
			}
		}
	}
</script>
<style>
	.infobox{background-color:rgba(0,0,0,.7);padding:8px;color:#fff;position:absolute;border-radius:4px;font-size:10px;line-height:1.5;max-width:330px;}
	.align-left{left:0px;}
	.align-right{right:0px;}
	.xpath{color:#67afff;}
	.attributes span{color:#aaa;}
	.attributes li{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
</style>