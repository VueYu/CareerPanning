<template>
	<div>
		<div class="titleStyle">职业生涯规划应用系统</div>
		
		<div class="optionStyle">
			<el-dropdown>
			  <span class="el-dropdown-link" style="font-size: 15px;color:white">
			    {{userData.studentName}}<i class="el-icon-arrow-down el-icon--right"></i>
			  </span>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item><span @click="updateUserInfor=true">个人信息</span></el-dropdown-item>
			    <el-dropdown-item><span @click="backLogin">退出</span></el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
			<el-button type="text" style="margin-left:20px;font-size: 15px;color:white" @click="backLogin">
				退出
			</el-button>
			<el-dialog
			  title="学生信息"
			  :visible.sync="updateUserInfor"
			  width="600px"
			  :close-on-click-modal='false'
			  append-to-body
			  center>
			 <UserInfor @studentInfor='receiptFromUserInfor'></UserInfor>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import UserInfor from './userInfor.vue'
	export default {
	  components:{
	  	UserInfor
	  },
	  data(){
		  return{
			  updateUserInfor:false,
			  userData:{
				
			  },
			  studentData:{
			  	
			  }
		  }
	  },
	  
	  mounted() {
	  	this.getUserInfor();
	  },
	  
	  methods:{
		  //接收从userInfor.vue传过来的学生信息
		  receiptFromUserInfor(data){
			this.updateUserInfor=data;
			this.getUserInfor();
		  },
		  //获取用户信息
		  getUserInfor(){
			var id=this.$route.params.account;
		  	this.$axios({
		  		 method: 'get',
		  		 url:this.COMMON.apiUrl+'/student/getById',
				 params:{
					 id:id,
				 }
		  	 }).then(response => {
		  		console.log(response.data.data);
		  		this.userData=response.data.data.student;
		  	}).catch(error => {  // 请求失败
		  		console.log('用户信息请求失败');
		  		console.log(error);
		  	});
		  },
		  backLogin(){
			  sessionStorage.setItem("isLogin",0);
			this.$router.push('/login');
		  },
	  }
	}
</script>

<style>
	.el-dropdown-link {
	    cursor: pointer;
	    color: #409EFF;
	  }
	  .el-icon-arrow-down {
	    font-size: 15px;
	  }
	  .titleStyle{
		float:left;
		font-size: 23px;
		color:white;
		/* border:1px solid #409EFF; */
		margin-top:10px;
		margin-left:20px
	  }
	  .optionStyle{
		/* border:1px solid #409EFF; */
		float:left;
		margin-left: 60%;
		margin-top: 5px;
	  }
</style>