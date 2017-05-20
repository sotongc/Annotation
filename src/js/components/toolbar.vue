<template>
	<div class="toolbar">

		<!-- seed load -->
		<label>Seed:</label>
		<input type="text" placeholder="url..." class="seed-url" v-model="pageURL"/>
		<label>Enable JS:</label>
		<input type="checkbox"/>
		<label>Country:</label>
		<select v-model="country">
			<option> </option>
			<option>US</option>
			<option>IN</option>
			<option>IND</option>
			<option>AF</option>
		</select>
		<label>Category:</label>
		<input type="text" class="category" v-model="category"/>
		<label>Status:</label>
		<select v-model="status">
			<option value="0">pause</option>
			<option value="1">running</option>
		</select>
		<button type="button" class="start" @click="start">Start</button>
		<!-- seed load end -->

		<button type="button" class="annotation" @click="active">Annotation</button>
		<button type="button" class="save" @click="save">Save</button>
		<button type="button" class="show-hide" @click="show">{{display}}</button>
		
	</div>
</template>
<script>
	export default{
		props:{
			pageURL:{
				type:String,
				default:''
			},
			category:{
				type:String,
				default:''
			},
			country:{
				type:String,
				default:''
			},
			status:{
				type:Number,
				default:0
			}
		},
		methods:{
			active:function(){
				this.$emit("annotation:active");
			},
			save:function(){
				this.$emit("annotation:save");
			},
			start:function(){
				this.$emit("frame:load");
			},
			show:function(){
				this.display=Object.is('Show',this.display)?'Hide':'Show';
				this.$emit("annotation:display");
			}
		}
	}
</script>
<style>
	.toolbar{height:60px;display:flex;justify-content:flex-start;align-items:center;padding:0px 10px;background-color:#F4F4F4;min-width:1000px;box-shadow:0 0 12px 0 rgba(0,0,0,1);}
	.toolbar label,.toolbar input,.toolbar button{height:26px;line-height:26px;font-size:12px;padding:0px 10px;outline:none;}
	.toolbar label{padding:0px 5px;}
	.toolbar input,.toolbar button{border-radius:5px;}
	.toolbar button{border:none;}
	.toolbar input{margin:0px;}
	.toolbar label,.toolbar button{margin:0px 0px 0px 10px;}
	.toolbar button{cursor:pointer;color:#fff;}
	.toolbar select{outline:none;padding:2px 5px;font-size:12px;background:none;border-radius:5px;color:#6F92BF;border:1px solid #6F92BF;}

	.seed-url,.category{color:#6F92BF;border:1px solid #c8c8c8;}
	.start{background-color:#2aabd2;}
	.annotation{background-image:linear-gradient(to bottom,#d9534f 0,#c12e2a 100%);}
	.show-hide{background-color:#444;}
	.save{background-color:#3385ff;}

	.category{width:80px;}
</style>