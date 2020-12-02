<template>
	<div>
	  <div v-if='disUserInfor'>
		<div>
		  	<font class="fontTitle">学校名称：</font>
		  	<font class="fontContent">{{userInfor.student.school}}</font>
		</div>
		<div class="fontDiv">
			<font class="fontTitle">系部名称：</font>
			<font class="fontContent">{{userInfor.departmentName}}</font>
		</div>
		<div class="fontDiv">
			<font class="fontTitle">专业名称：</font>
			<font class="fontContent">{{userInfor.majorName}}</font>
		</div>
		<div class="fontDiv">
			<font class="fontTitle">学号：</font>
			<font class="fontContent">{{userInfor.student.studentId}}</font>
		</div>
		<div class="fontDiv">
			<font class="fontTitle">姓名：</font>
			<font class="fontContent">{{userInfor.student.studentName}}</font>
		</div>
	  </div>
	  
	  <div v-if='chaUserInfor'>
	  	<el-form ref="altUserForm" :model="altUserForm" label-width="100px">
			<!--选择系部-->
			<el-form-item
			  prop="departmentId"
			  label="系部名称:"
			  :rules="{
			    required: true, message: '系部名称不能为空', trigger: 'blur'
			  }"
			>
			  <el-select @change="getCareer" v-model="altUserForm.departmentId" placeholder="请选择" style="width:100%">
			      <el-option
			        v-for="item in departments"
			        :key="item.value"
			        :label="item.label"
					width="100%"
			        :value="item.value"
				  >
			      </el-option>
			  </el-select>
			</el-form-item>
			
	  		<el-form-item
	  			label="专业名称" 
	  			prop="majorId"
				:rules="[
					 { required: true, message: '专业名称不能为空', trigger: 'blur' }
				]"
	  		>
	  			<el-select v-model="altUserForm.majorId" placeholder="请选择" style="width:100%">
	  			    <el-option
	  			      v-for="item in careers"
	  			      :key="item.value"
	  			      :label="item.label"
	  				  width="100%"
	  			      :value="item.value">
	  			    </el-option>
	  			</el-select>
	  		</el-form-item>
	  		<el-form-item
	  			label="姓名" 
	  			prop="studentName" 
	  		>
	  		    <el-input 
	  				v-model="altUserForm.studentName"
	  			></el-input>
	  		</el-form-item>
	  		
	  		<div style="text-align: center;">
	  		  <el-button 
	  			type="primary" 
	  			@click="submitNewInfor('altUserForm')"
	  		  >
	  			保存信息
	  		  </el-button>
			  <el-button
				@click="changeShow"
			  >
			  	取消
			  </el-button>
	  		</div>
	  	</el-form>
	  </div>
	  <div style="text-align: center;">
		<el-button @click="changeShow" v-if='disUserInfor'>
		  修改信息
		</el-button>
	  </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				accountId:this.$route.params.account,
				userInfor:{
					departmentName:'',
					majorName:'',
					student:{
						school:'',
						studentId:'',
						studentName:''
					}
				},//存放学生信息
				disUserInfor:true,//是否显示个人信息
				chaUserInfor:false,//是否显示修改个人信息
				altUserForm:{
					
				},//存放需要修改的数据
				departments:[],//存放学校系部
				careers:[],//存放系部专业
			}
		},
		mounted() {
			this.getUserInfor();
			this.getDepartment();
		},
		methods:{
			//将修改后的数据传回header.vue
			sendToHeader(){
				
			},
			//获取系部
			getDepartment(){
				this.$axios({
				   method: 'get',
				   url:this.COMMON.apiUrl+'/department/getList',
				 }).then(response => {  // 请求成功
					let depData=[];
					depData=response.data.data;
					for(let i=0;i<depData.length;i++){
						this.$set(this.departments,i,{'value':depData[i].departmentId,'label':depData[i].departmentName})
					}
				}).catch(error => {  // 请求失败
					console.log('请求失败');
					console.log(error);
				})
			},
			
			//根据系部的名称，获取对应的专业名称
			getCareer(){
				if(this.altUserForm.departmentId!=''){
					this.$axios({
					   method: 'get',
					   url:this.COMMON.apiUrl+'/major/getList',
					 }).then(response => {  // 请求成功
						console.log('专业')
						console.log(response.data.data);
						let majData=[];
						let j=0;
						majData=response.data.data;
						for(let i=0;i<majData.length;i++){
							if(majData[i].departmentId==this.altUserForm.departmentId){
								this.$set(this.careers,j,{'value':majData[i].majorId,'label':majData[i].majorName});
								j++;
							}
						}
					}).catch(error => {  // 请求失败
						console.log('请求失败');
						console.log(error);
					})
				}
			},
			//显示修改个人信息界面
			changeShow(){
				this.disUserInfor=!this.disUserInfor;
				this.chaUserInfor=!this.disUserInfor;
			},
			
			//展示选中的数据
			obtainValue(value) {
				console.log(value)
			},
			//获取用户信息
			getUserInfor(){
				this.$axios({
					 method: 'get',
					 url:this.COMMON.apiUrl+'/student/getById',
					 params:{
						id:this.accountId
					 }
				 }).then(response => {
					console.log(response.data.data);
					this.userInfor=response.data.data;
				}).catch(error => {  // 请求失败
					console.log('用户信息请求失败');
					console.log(error);
				});
			},
			
			//提交修改的信息
			submitNewInfor(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let num=Number(this.userId)
						let alterData={};
						alterData=this.altUserForm;
						this.$set(alterData,'studentId',this.accountId);
						console.log('需要修改的数据');
						console.log(alterData);
						this.$axios({
							method: 'put',
							url:this.COMMON.apiUrl+'/student/update',//修改学生信息
							data:alterData
						}).then(response => {  // 请求成功
							this.$message({
							  message: '学生信息修改成功',
							  type: 'success'
							});
							this.disUserInfor=true;
							this.chaUserInfor=false;
							this.getUserInfor();
							this.$emit('studentInfor',false);
						}).catch(error => {  // 请求失败
							this.$message({
							  message: '学生信息修改失败',
							  type: 'warning'
							});
						})
					}
					else{
						this.$message({
						  message: '输入的数据格式不正确，请重新输入！',
						  type: 'warning'
						});
					}
				})
			},
		}
	}
</script>

<style scoped="scoped">
	.fontTitle{
		font-size: 18px;
	}
	.fontContent{
		font-size:15px;
	}
	.fontDiv{
		margin-top: 10px;
		font-size: 20px;
	}
</style>
