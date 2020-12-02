<template>
	<div style="width: 100%;height: 100%;">
		<el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" style="height: 100%;"
		 router background-color="#0083b7" text-color="white" active-text-color="lightgreen" @select="handleSelect">

			<el-menu-item :index="goHome()">
				<i class="iconfont icon">&#xe672;</i>
				<span slot="title">首页</span>
			</el-menu-item>
			
			<el-menu-item :index="goQuestionBank()">
				<i class="iconfont icon">&#xe693;</i>
				<span slot="title">测试题库</span>
			</el-menu-item>

			<el-menu-item :index="goTestResult()">
				<i class="iconfont icon">&#xe620;</i>
				<span slot="title">测试结果</span>
			</el-menu-item>

			<el-menu-item :index="goKnowMajor()">
				<i class="iconfont icon">&#xe60d;</i>
				<span slot="title">认识专业</span>
			</el-menu-item>

			<el-menu-item :index="goKnowFirm()">
				<i class="iconfont icon">&#xe753;</i>
				<span slot="title">认识企业</span>
			</el-menu-item>
			
			<el-menu-item :index="goStudyPlanning()">
				<i class="iconfont icon">&#xe66d;</i>
				<span slot="title">学业规划</span>
			</el-menu-item>

			<el-menu-item :index="goAreerPlanning()">
				<i class="iconfont icon">&#xe603;</i>
				<span slot="title">职业发展规划</span>
			</el-menu-item>

			<!-- <el-menu-item :index="goWish()">
				<i class="iconfont icon">&#xe95a;</i>
				<span slot="title">导师寄语</span>
			</el-menu-item> -->

			<!-- <el-menu-item :index="goResume()">
				<i class="iconfont icon">&#xe601;</i>
				<span slot="title">汇总</span>
			</el-menu-item>
			
			<el-menu-item index='/test'>
				<i class="iconfont icon">&#xe601;</i>
				<span slot="title">demo</span>
			</el-menu-item> -->
		</el-menu>
	</div>
</template>

<script>
	export default {
	  inject: ['reload'],
	  data(){
		  return{
			account:this.$route.params.account,
			activeIndex:this.$route.path,
		  }
	  },
	  mounted() {
	  	this.reload()
	  },
	  methods:{
		//跳转至首页
		goHome(){
			var text='/index/'+this.account+'/home';
			return text;
		},
		//跳转至题库
		goQuestionBank(){
			var text='/index/'+this.account+'/questionbank';
			return text;
		},
		
		//跳转至测试结果
		goTestResult(){
			var text='/index/'+this.account+'/testresult';
			return text;
		},
		//跳转至认识专业
		goKnowMajor(){
			var text='/index/'+this.account+'/knowmajor';
			return text;
		},
		
		//跳转至认识企业
		goKnowFirm(){
			var text='/index/'+this.account+'/knowfirm';
			return text;
		},
		
		//跳转至生涯规划
		goAreerPlanning(){
			var text='/index/'+this.account+'/areerplanning';
			return text;
		},
		
		//跳转至学业规划
		goStudyPlanning(){
			var text='/index/'+this.account+'/studyplanning';
			return text;
		},
		
		
		//跳转至汇总
		goResume(){
			var text='/index/'+this.account+'/resume';
			return text;
		},
		
		// //跳转至寄语
		// goWish(){
		// 	var text='/index/'+this.account+'/wish';
		// 	return text;
		// },
		handleSelect (index) {
			if (index === this.$route.path) {
				this.reload()
			}
		},
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		}
	  }
	}
</script>

<link rel="stylesheet" type="text/css" href="icon/iconfont.css" />
<style scoped>
	.icon {
		font-size: 25px;
		margin-right: 5px;
		color:white
	}
</style>
