<template>
	<div class="loading" v-show="show">
		<div class="loading-wrap">
		  <div class="triangle1"></div>
		  <div class="triangle2"></div>
		  <div class="triangle3"></div>
		</div>
	</div>
</template>
<script></script>
<style>
	.loading{position:fixed;background-color:rgba(0,0,0,.7);width:100%;height:100%;top:0px;}
	.loading-wrap {
	  width: 60px; height: 60px;
	  position: absolute;
	  top: 50%; left: 50%;
	  margin: -30px 0 0 -30px;
	  background: #777;      
	  animation: rotation ease-in-out 2s infinite;
	  border-radius: 30px;      
	}

	.triangle1, .triangle2, .triangle3 {
	  border-width: 0 20px 30px 20px;
	  border-style: solid;
	  border-color: transparent;
	  border-bottom-color: #67cbf0;
	  height: 0; width: 0;
	  position: absolute;
	  left: 10px; top: -10px;
	  animation: fadecolor 2s 1s infinite;
	}

	.triangle2, .triangle3 {
	  content: '';
	  top: 20px; left: 30px;
	  animation-delay: 1.1s;
	}

	.triangle3 {
	  left: -10px;
	  animation-delay: 1.2s;
	}

	@keyframes rotation {
	    0% {transform: rotate(0deg);}
	    20% {transform: rotate(360deg);}
	    100% {transform: rotate(360deg);}
	}

	@keyframes fadecolor {
	    0% {border-bottom-color: #eee;}
	    100%{border-bottom-color: #67cbf0;}
	}	    .loading-wrap {
	  width: 60px; height: 60px;
	  position: absolute;
	  top: 50%; left: 50%;
	  margin: -30px 0 0 -30px;
	  background: #777;      
	  animation: rotation ease-in-out 2s infinite;
	  border-radius: 30px;      
	}

	.triangle1, .triangle2, .triangle3 {
	  border-width: 0 20px 30px 20px;
	  border-style: solid;
	  border-color: transparent;
	  border-bottom-color: #67cbf0;
	  height: 0; width: 0;
	  position: absolute;
	  left: 10px; top: -10px;
	  animation: fadecolor 2s 1s infinite;
	}

	.triangle2, .triangle3 {
	  content: '';
	  top: 20px; left: 30px;
	  animation-delay: 1.1s;
	}

	.triangle3 {
	  left: -10px;
	  animation-delay: 1.2s;
	}

	@keyframes rotation {
	    0% {transform: rotate(0deg);}
	    20% {transform: rotate(360deg);}
	    100% {transform: rotate(360deg);}
	}

	@keyframes fadecolor {
	    0% {border-bottom-color: #eee;}
	    100%{border-bottom-color: #67cbf0;}
	}
</style>