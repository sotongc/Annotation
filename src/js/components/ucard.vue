<template>
	<div class="user-card clearfix">
		<section>
			<img src="../../img/avtar.jpg" class="avtar"/>
		</section>
		<section>
			<p class="i-label">
				<label>username:&nbsp;</label>
				<span>xxxxx</span>
				<button class="delete">Delete</button>
				<button class="done">Done</button>
			</p>
			<label class="b-label">authority:</label>
			<div class="authority-options">
				<button class="on">a1</button>
				<button>a2</button>
			</div>
		</section>
	</div>
</template>
<script>
	export default{

	}
</script>
<style>
	.user-card{border:1px solid #c1c1c1;padding:10px 15px;border-radius:4px;}
	.avtar{width:88px;height:88px;border-radius:10px;margin-right:20px;}
	.authority-options{padding:3px 6px;}
	.authority-options button{border:none;color:#fff;padding:2px 15px;background-color:#bbb;border-radius:3px;margin:0px 2px 5px;}
	.authority-options .on{background-color:#08d195;}

	.user-card .b-label{display:block;margin:10px 0px 5px;}
	.user-card .i-label{border-bottom:1px dotted #ccc;line-height:26px;}
	.user-card section{float:left;}
	.user-card section:nth-child(2){width:530px;}
	.user-card .done,.user-card .delete{float:right;padding:3px 12px;border:none;color:#fff;border-radius:3px;}
	.user-card .done{background-color:#08d195;}
	.user-card .delete{background-color:#e61414;margin-left:5px;}
</style>