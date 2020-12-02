<!-- 题库 -->
<template>
	<el-card class="card-main">
		<div slot="header" class="clearfix">
		    <span style="font-size: 18px;">测试题库</span>
		    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
		</div>
		<el-card class="cardStyle">
			<div>认识自我</div>
			<div class="question-style" v-for="count in 4" :key="count">
				<el-button type="text" @click="goAnswer(count)">
					<font class="font-style">测试题{{count}}</font>
				</el-button>
			</div>
			<div style="clear: both;"></div>
		</el-card>
		<el-card class="cardStyle">
			<div>职业倾向</div>
			<div class="question-style" v-for="count in 6">
				<el-button type="text" @click="goAnswer(count+4)">
					<font class="font-style">测试题{{count}}</font>
				</el-button>
			</div>
			<div style="clear: both;"></div>
		</el-card>
		<el-card class="cardStyle">
			<div>个人情商</div>
			<div class="question-style" v-for="count in 5">
				<el-button type="text" @click="goAnswer(count+10)">
					<font class="font-style">测试题{{count}}</font>
				</el-button>
			</div>
			<div style="clear: both;"></div>
		</el-card>
	</el-card>
</template>

<script>
	export default{
		data(){
			return{
				id:'',
			}
		},
		methods:{
			goAnswer(num){
				this.$router.push('/answer/'+this.id+'/questionBank/test'+num);
				
			},
		},
		mounted() {
			this.id=this.$route.params.account;
		},
	}
</script>

<style scoped="scoped">
	.cardStyle{
		height:200px;
		/* border:1px solid black; */
		margin-bottom: 50px;
	}
	
	.card-main{
		padding:50px;
		/* border:1px solid yellow; */
	}
	
	.question-style{
		width: 20%;
		float:left;
		margin-left: 4%;
		/* border:1px solid #000000; */
		margin-top: 30px;
		color:#55aaff;
		
	}
	
	.font-style{
		font-size: 16px;
		text-decoration:underline;
	}
</style>
