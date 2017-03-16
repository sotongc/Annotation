<template>
	<iframe id="frame" sandbox="allow-same-origin allow-scripts allow-forms allow-popups" :src="src" width="100%" :height="height"></iframe>
</template>
<script>
	import _ from '../utils/util.js';
	export default{
		methods:{
			load:function(){
				this._remove();
				let idoc=this.$el.contentWindow.document;
		
				idoc.open();
				idoc.write(this.html);
				idoc.close();

				this._bind();
			},
			ready:function(callback){
				this.$el.contentWindow.onload=callback;
			},
			init:function(){
				this.ready(this._bind)
			},
			_bind:function(){

				let idoc=this.$el.contentWindow.document;

				idoc.addEventListener("mouseover",this.handlers().mouseover);

				idoc.addEventListener("mouseout",this.handlers().mouseout);

				idoc.addEventListener("click",this.handlers().click);

				idoc.addEventListener("scroll",this.handlers().scroll);
			},
			_remove:function(){
				let idoc=this.$el.contentWindow.document;

				idoc.removeEventListener("mouseover",this.handlers().mouseover);

				idoc.removeEventListener("mouseout",this.handlers().mouseout);

				idoc.removeEventListener("click",this.handlers().click);

				idoc.removeEventListener("scroll",this.handlers().scroll);

			},
			handlers:function(){
				return {
					mouseover:function(e){
						this.annotation_status && this.$emit("element:enter",e,e.target.getBoundingClientRect());
					}.bind(this),

					mouseout:function(e){
						this.annotation_status && this.$emit("element:out",e.target.getBoundingClientRect());
					}.bind(this),

					click:function(e){
						if(this.annotation_status){
							this.$emit("element:select",e.target.getBoundingClientRect(),e.target);
						}
						e.preventDefault();
					}.bind(this),

					scroll:_.throttle(function(){
						this.$emit("frame:scroll");
					}.bind(this),20)
				};
			}
		},
		mounted:function(){
			this.init();
		}
	}
</script>
<style>
	#frame{min-width:1000px;border:none;margin-top:5px;}
</style>