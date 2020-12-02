<!--登录界面-->
<template>
	<div>
		<el-form 
		  :model="admin" 
		  ref="admin"
		  style="margin-top: 10%;"
		  :rules="rules" 
		  label-width="50px" 
		  class="demo-ruleForm" 
		  label-position="top"
		>
		  <el-form-item 
		  	label="学号" 
			prop="account"
			style="font-size:20px"
		  >
			<el-input
				placeholder="请输入学号"
				v-model="admin.account"
				prefix-icon="el-icon-user-solid"
				class="input_style"
				clearable>
			</el-input>
		  </el-form-item>

		  <el-form-item label="密码" prop="password" style="color: white;">
			<el-input
			placeholder="请输入密码" 
			v-model="admin.password" 
			prefix-icon="el-icon-lock"
			show-password 
			class="input_style">
			</el-input>
		  </el-form-item>

		 <!-- <div class="code">
			 <el-form-item prop="validateCode" class="inputCode" label-width="50px">
				<el-input
					placeholder="请输入验证码" 
					v-model="admin.validateCode" 
					clearable>
				</el-input>
			</el-form-item>
			<div class="imgCode" @click="changeImgCode">
				<img :src="imgCode" style="width:100%;height:100%"/>
			</div>
		  </div> -->

		  
		  <el-button 
		  type="primary" 
		  @click="login('admin')" 
		  style="
		  width:120px;
		  border:0px;
		  margin-left:auto;
		  margin-right:auto;
		  margin-top: 40px;
		  display:block;
		  height:45px
		  "
		  >登录</el-button>
		</el-form>
	</div>
</template>
<script>
	export default {
		name:'bg',
		data() {
		  return {
			imgCode: 'url',
			admin: {
				account:'',
				password:'',
				validateCode:''
			},
			rules:{
				account:[
					{ required: true, message: '请输入学号', trigger: 'blur' },
					{pattern:/^[1-9]{1}[0-9]{11}$/,message:'学号只能为数字', trigger: ['blur']}
				],
				password:[
					{required: true, message: '请输入密码', trigger: 'blur'},
					{min:4,message:'密码不能少于4个字符',trigger: ['blur','change']}
				],
				validateCode:[
					{required: true, message: '请输入验证码', trigger: 'blur'}
				]
			}
		  }
		},
		mounted(){
			// this.changeImgCode();
		},
			//asiox与后台交互数据的写法
		methods:{
			//获取验证码
			changeImgCode() {
				//添加一个随机数（防止缓存）
				this.imgCode = this.COMMON.apiUrl + '/login/getValidateCode?' + Math.floor(Math.random() * 100);
			},

			login(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var postData = {
							id:this.admin.account,
						};
						console.log(postData);
						this.$axios({
							method: 'get',
							url: this.COMMON.apiUrl+'/student/getById',
							params:postData
						}).then(response => {
							console.log('response')
							console.log(response);
							var data=response.data.data.student;
							if(this.admin.password==data.password){
								this.$message({
									message: '登陆成功',
									type: 'success'
								});
								sessionStorage.setItem("isLogin",1);
								this.$router.push('/index/'+this.admin.account+'/home');
							}else{
								this.$message({
									message: '账号或密码错误，请重新输入',
									type: 'warning'
								});
								this.$refs['admin'].resetFields();
							}
						})
						.catch((error) => {
						    console.log('请求失败');
							// this.$message({
							// 	message: '账号或密码不符合要求，请重写输入!',
							// 	type: 'warning'
							// });
						})
					} else {
						this.$message({
							message: '数据格式不正确！',
							type: 'warning'
						});
						return false;
					}
				});
			}
		}
	}
</script>
<style scoped>
	.input_style{
		width:100%;
		height:30px;
		line-height:30px;
		display:block;
	}
	.text_style{
		font-size: 15px;
		color:white;
		padding-bottom: 20px;
		padding-left:20%;
	}
	.code {
		height: 50px;
		padding-top: 20px;
		font-size: 20px;
		color: #454545;
		line-height: 50px;
		
	}

	.imgCode {
		width:100px;
		height:39px;
		float:left;
		margin-left:5px
	}
	.inputCode{
		width:200px;
		float: left;
	}
</style>
