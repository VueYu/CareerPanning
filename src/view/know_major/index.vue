<!--认识专业-->
<template>
	<div style="border-bottom: 1px solid gainsboro;border-right: 1px solid gainsboro;margin-left: 10px;padding:1px">
		<div style="width:610px;float:left;margin-left: 20px;">
			<p>
				除了要了解自己的性格以外，还要了解本专业需要学习的课程，以及这些课程的用途。
			</p>
			<p>根据上网查询资料，将自己了解到的本专业的课程添加到下面的表格中：</p>
		</div>
		<div style="width:115px;margin-top:85px;margin-left: auto;margin-bottom: 10px;margin-right: 10px;">
			<el-button @click="addCourse" type="primary">
				<i class="el-icon-circle-plus-outline"></i>
				添加课程
			</el-button>
		</div>

		<div style="margin-bottom: 10px">
			<el-table
			    :data="tableData"
			    style="width: 100%">
			    <el-table-column
			      label="课程名称"
				  width="150px"
			      prop="name">
			    </el-table-column>
			    <el-table-column
			      label="课程简介"
				  width='400px'
			      prop="content">
			    </el-table-column>
				<el-table-column
				  label="对应岗位"
				  prop="post">
				</el-table-column>
			    <el-table-column
			      align="right">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)"
					>
					  删除课程
					</el-button>
			      </template>
			    </el-table-column>
			</el-table>
		</div>
		
		<el-dialog title="添加课程" :visible.sync="displayAdd" width="500px" center :close-on-click-modal='false'>
			 <AddCourse @display='getData'></AddCourse>
		</el-dialog>
	</div>
</template>

<script>
	import AddCourse from '../../components/know_major/addCourse.vue'
	export default {
		components:{
			AddCourse,
		},
	    data() {
			return {
				studentId:this.$route.params.account,
				tableData: [],
				displayAdd:false,
			}
	    },
		mounted(){
			this.getCourse();
		},
		methods: {
			//获取学生收集的课程信息
			getCourse(){
				this.$axios({
					 method: 'get',
					 url:this.COMMON.apiUrl+'/course/getByStudentId',
					 params:{
						 studentId:this.studentId
					 }
				}).then(response => {
					console.log('请求成功');
					this.tableData=response.data.data;
				}).catch(error => {  // 请求失败
					console.log('请求失败');
				});
			},
			
			//添加课程
			addCourse(){
				this.displayAdd=true;
			},
			
			//获取从addCourse传过来的数据
			getData(value){
				this.displayAdd=false;
				this.getCourse();
			},
			
			//删除课程
			handleDelete(index, row) {
				console.log(index, row);
				let num=this.tableData[index].courseId;
				let deleteData={
					id:num,
				};
				this.$axios({
					 method: 'delete',
					 url:this.COMMON.apiUrl+'/course/delete',
					 params:deleteData
				}).then(response => {
					this.$message({
						message: '课程删除成功',
						type: 'success'
					});
					this.getCourse();
				}).catch(error => {  // 请求失败
					this.$message({
						message: '课程删除失败',
						type: 'warning'
					});
				});
			}
		}
	}
</script>

<style scoped="scoped">
	 .el-table .warning-row {
	    background: oldlace;
	  }
	
	  .el-table .success-row {
	    background: #f0f9eb;
	  }
</style>

