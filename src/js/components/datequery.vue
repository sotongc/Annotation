<template>
	<div class="queryBox">
		<span v-if="type == 1" @click="backCorpus">back</span>
		<span v-else @click="back">back</span>
		<span @click="goto">{{linkname}}</span>
		<label>DateRange:</label>
		<el-date-picker
		    class="textfield querydate"
		    v-model="query.daterange"
		    type="datetimerange"
		    range-separator=' —— '
		    :picker-options="pickerOptions"
		    placeholder="select datetimerange">
	    </el-date-picker>
		<button @click="search" class="query">query</button>
	</div>
</template>
<script>
	export default{
		data() {
			return {
				pickerOptions:{
					shortcuts: [{
						text:'last'
					},{
			            text: 'three days',
			            onClick(picker) {
			              	const end = new Date();
			              	const start = new Date();
			              	start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
			              	picker.$emit('pick', [start, end]);
			            }
			        }, {
			            text: 'one week',
			            onClick(picker) {
			              	const end = new Date();
			              	const start = new Date();
			              	start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			              	picker.$emit('pick', [start, end]);
		            		}
		          	}, {
			            text: 'two weeks',
			            onClick(picker) {
			              	const end = new Date();
			              	const start = new Date();
			              	start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
			              	picker.$emit('pick', [start, end]);
			            }
			        }]
				}
			}
		},
		methods:{
			search:function(){
				this.$emit("datequery:query");
			},
			back: function(){
				window.location.assign('./seed.html');
			},
			goto: function(){
				this.$emit("datequery:goto");
			},
			backCorpus: function(){
				window.location.assign('./corpus.html');
			}
		}
	}
</script>
<style>
	.queryBox{
		padding:10px;
		margin:15px 40px 5px;
	}
	.queryBox span{
		display:inline-block;
		line-height:30px;
		padding:0 10px;
		color:#fff;
		margin-right:15px;
		border-radius:5px;
		border:1px solid #204d74;
		background:#286090;
		cursor:pointer;
	}
	.queryBox span:hover{
		border:1px solid #122b40;
		background:#204d74;
	}
	.queryBox span:nth-child(2){
		margin-right:50px;
		border:1px solid #5cb85c;
		background:#4cae4c;
	}
	.queryBox span:nth-child(2):hover{
		border-color:#398439;
		background:#449d44;
	}
	.queryBox label{
		vertical-align: middle;
	}
	.queryBox .el-input__inner{
		height:30px;
	}
	.queryBox .querydate{
		width:400px;
		margin:0 15px 0 5px;
		border-radius:5px;
	}
	.queryBox .query{
		color:#fff;
		font-weight:bold;
		background: #286090;
		border-radius:5px;
		border:none;
		padding:6px 8px;
		box-shadow: 2px 2px 3px rgba(0,0,0,.2);
	}
	.queryBox .query:hover{
		background: #204d74;
	}
</style>