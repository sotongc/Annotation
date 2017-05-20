<template>
	<div class="entries">
		<section class="entry clearfix" v-for="entry in entries" :hashid="entry.hashid">
			<h4 class="entry-id">{{entry.hashid}}</h4>

			<p class="match-rule">
				<label>xpath: </label>
				<input class="input-pattern" type="text" v-model.trim="entry.xpath" @change="enable" autofocus />
			</p>

			<ul class="attrs" >
				<li v-for="attr in entry.attrs">
					<label>{{attr.key}}:&nbsp;</label>
					<span>{{attr.content}}</span>
				</li>
			</ul>
			<p class="match-rule">
				<label>marks: </label>
				<input class="input-pattern" type="text" v-model.trim="entry.markInfo" />
			</p>
			<p class="btns" :hashid="entry.hashid">
				<button type="button" class="test" @click="test">Test</button>
				<button type="button" class="trash" @click="trash">Trash</button>
			</p>
		</section>
	</div>
</template>
<script>
	export default{
		props:{
			entries:{
				type:Array,
				default:[]
			}
		},
		data:function(){
			return {
				tenable:false
			}
		},
		methods:{
			test:function(eve){
				this.tenable && this.$parent.$emit("entry:test",eve.target.parentNode.getAttribute("hashid"));
			},
			trash:function(eve){
				this.$parent.$emit("entry:trash",eve.target.parentNode.getAttribute("hashid"));
			},
			enable:function(eve){
				this.tenable=!!eve.target.value;
			}
		}
	}
</script>
<style>
	.entries{padding:5px;}
	.entry{border:1px dotted #ccc;border-top:none;font-size:10px;background-color:#f4f4f4;margin-bottom:10px;border-radius:4px;}
	.entry .input-pattern{outline:none;border:none;color:#3385ff;font-size:10px;background-color:#f4f4f4;margin-top:5px;width:220px;padding:0px 5px;}
	.entry-id{background-color:#444;color:#fff;padding:3px 5px;}

	.entry .attrs{padding:5px 6px;background-color:#f4f4f4;margin:3px 10px;line-height:1.5;border:1px groove #fff;border-left:none;border-right:none;color:#aaa;}
	.entry .attrs li{white-space:nowrap;width:256px;overflow:hidden;text-overflow:ellipsis;}
	.attrs span{color:#f5da55;}
	.entry .match-rule{margin:3px 10px 0px;}
	.entry .btns{padding:3px 10px;text-align:right;}
	.entry .test,.entry .trash{color:#fff;font-size:12px;border:none;padding:3px 8px;border-radius:4px;}
	.entry .trash{background-color:#d9534f;}
	.entry .test{background-color:#3385ff;}
</style>