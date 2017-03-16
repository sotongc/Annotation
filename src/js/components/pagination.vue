<template>
	<section class="pagination">
		<i :class="['btn-icon', {disable:!status[0]}]" @click="first">&lt;&lt;</i>
		<i :class="['btn-icon', {disable:!status[0]}]" @click="prev">&lt;</i>
		<i class="page btn-icon" v-for="page in pages" :class="{active:Object.is(page,currentPage)}" @click="selectPage" :data-page="page">{{ page }}</i>
		<i :class="['btn-icon', {disable:!status[1]}]" @click="next">&gt;</i>
		<i :class="['btn-icon', {disable:!status[1]}]" @click="last">&gt;&gt;</i>
		<input type="text" class="btn-icon" v-model="pagenum"/>
		<input type="button" value="Go" class="btn-icon goto" @click="goto"/>
	</section>
</template>
<script>
	export default{
		props:['pagenum'],
		computed:{
			pages:function(){

				let displayLength=Math.min(this.limit,this.totalPages);
				let pos=Math.ceil(displayLength/2)-1;
				let offsetL=this.currentPage-pos;
				let offsetR=this.currentPage+displayLength-(pos+1);

				return new Array(displayLength)
					.fill(0).map(function(n,i){
						if(offsetL<1)
							return i+1;
						else if(offsetR>this.totalPages)
							return this.totalPages-displayLength+1+i;
						else
							return this.currentPage-pos+i;
					}.bind(this));
			},
			totalPages:function(){
				return Math.ceil(this.totalNum/this.pageItems);
			},
			startIndex:function(){
				return (this.currentPage-1)*this.pageItems;
			},
			endIndex:function(){
				return this.currentPage*this.pageItems;
			},
			status:function(){
				return [(this.currentPage>1),(this.currentPage<this.totalPages)];
			}

		},
		methods:{
			prev:function(eve){
				if(this.status[0]){
					this.currentPage--;
					this.$emit("page:onchange",this.currentPage);
				}
			},
			next:function(eve){
				if(this.status[1]){
					this.currentPage++;
					this.$emit("page:onchange",this.currentPage);
				}
			},
			selectPage:function(eve){
				this.currentPage=Number(eve.target.dataset.page);
				this.$emit("page:onchange",this.currentPage);
			},
			first:function(){
				this.status[0] && (this.currentPage=1);
			},
			last:function(){
				this.status[1] && (this.currentPage=this.totalPages);
			},
			goto:function(){
				let pagenum=Number(this.pagenum);
				if(!Object.is(pagenum,NaN)){
					this.currentPage=pagenum<1?1:pagenum>this.totalPages?this.totalPages:pagenum;
				}
			}
		}
	};
</script>
<style>
	.pagination{display:flex;justify-content:flex-start;}
	.btn-icon{display:block;width:25px;height:25px;background-color:#FFF;border:1px solid #ccc;text-align:center;line-height:25px;font-style:inherit;cursor:pointer;margin:0px 2.5px;border-radius:4px;}
	.pagination .active,.page:hover{background-color:#0099e5;color:#fff;}
	.pagination .disable{color:#C8C8C8;cursor:default;}
	.pagination input{cursor:inherit;}
	.pagination .goto{cursor:pointer;font-size:inherit;padding:0px;font-size:12px;}
</style>