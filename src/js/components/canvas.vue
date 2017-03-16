<template>
	<div>
		<canvas id="dynamic" :width="width" :height="height" class="canvas"></canvas>
		<canvas id="static" :width="width" :height="height" class="canvas"></canvas>
	</div>
</template>
<script>
	import _ from '../utils/util.js';
	export default{
		data:function(){
			return {ctx:null};
		},
		methods:{
			drawRect:function(x,y,w,h){
				this.ctx_d.fillStyle="rgba(0,149,255,.4)";
				this.ctx_d.fillRect(x,y,w,h);
			},
			clearRect:function(x,y,w,h,layer){
				this.ctx_d.clearRect(x-1,y-1,w+2,h+2);
			},
			drawTag:function(x,y,w,h){
				this.ctx_s.fillStyle="rgba(0,149,255,.4)";
				this.ctx_s.fillRect(x,y,w,h);
				this.ctx_s.fillStyle="rgba(255,149,0,.6)";
				this.ctx_s.fill(new Path2D(`M${x} ${y} L${x+25} ${y} L${x+25} ${y-14} L${x} ${y-14} Z`));
				this.ctx_s.fillStyle="rgba(255,255,255,1)";
				this.ctx_s.fillText("Tag",x+4,y-3,40);
			},
			clear:function(layer){
				layer.clearRect(0,0,this.width,this.height)
			},
			clearAll:function(){
				this.ctx_d.clearRect(0,0,this.width,this.height);
				this.ctx_s.clearRect(0,0,this.width,this.height);
			}
		},
		mounted:function(){
			this.ctx_d=this.$el.querySelector("#dynamic").getContext('2d');
			this.ctx_s=this.$el.querySelector("#static").getContext('2d');
		},
		updated:function(){
			_.throttle(function(){
				this.$emit("canvas:updated");
			}.bind(this),10000)();
		}
	}
</script>
<style>
	.canvas{position:absolute;top:65px;left:0px;pointer-events:none;}
</style>