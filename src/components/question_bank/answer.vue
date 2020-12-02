<!-- 题库 -->
<template>
	<div class="card-main">
		<el-card shadow="never">
			<div slot="header" class="clearfix">
				
			</div>
			<el-row :gutter="10" style="">
				<el-col :span="18">
					<el-container style="box-shadow:lightgray 0px 0px 10px;height: calc(100vh - 200px);">
						<el-header style="background-color: skyblue;height:60px;line-height: 60px;">
							<font style="font-size: 20px;color: white;margin-left: 20px;">{{questionBankInfo.questionBankName}}</font>
						</el-header>
						<el-main>
							<div style="margin-bottom: 20px;font-size: 18px;">{{questionBankInfo.questionBankIntroduce+'     ('+questionBankInfo.testPurpose+')'}}</div>
							<div v-for="(val,index) in questionData" :key="index" style="margin-bottom: 20px;">
								<a :name="'index'+(index+1)"></a>
								<div style="margin-bottom: 10px;font-size: 18px;">{{index+1}}{{'. '+val.question}}</div>
								<el-radio-group v-model="questionForm[index].value" @change="chooseValue(index)">
									<div class="optionStyle"><el-radio label="A"><font>{{val.optionA}}</font></el-radio></div>
									<div class="optionStyle"><el-radio label="B"><font>{{val.optionB}}</font></el-radio></div>
									<div class="optionStyle" v-if="val.optionC!=null"><el-radio label="C"><font>{{val.optionC}}</font></el-radio></div>
									<div class="optionStyle" v-if="val.optionD!=null"><el-radio label="D"><font>{{val.optionD}}</font></el-radio></div>
									<div class="optionStyle" v-if="val.optionE!=null"><el-radio label="E"><font>{{val.optionE}}</font></el-radio></div>
								</el-radio-group>	
							</div>
						</el-main>
						<el-footer style="text-align: center;">
							<el-button type="primary" round @click="submitAnswer">提交</el-button>
							<el-button round @click="cancelanswer=true">取消</el-button>
						</el-footer>
					</el-container>
				</el-col>
				<el-col :span="6" v-if="showOption">
					<div style="box-shadow:lightgray 0px 0px 10px;height: calc(100vh - 200px);">
						<div style="border-bottom:1px solid lightcyan;background-color: skyblue;height:60px;line-height: 60px;">
							<font style="font-size: 20px;color: white;margin-left: 20px;">题号</font>
						</div>
						<el-row :gutter="0" style="margin-top: 10px;">
							<el-col :span="6" v-for="index in questionNum" style="margin:5px 0px;text-align: center;">
								<a :href="'#index'+index" :id="'book'+index" v-if="questionForm[index-1].value==''">
									<el-button v-if="index<10">{{'0'+index}}</el-button>
									<el-button v-if="index>=10">{{index}}</el-button>
								</a>
								<a :href="'#index'+index" :id="'book'+index" v-if="questionForm[index-1].value!=''">
									<el-button v-if="index<10" style="background-color: #87ceeb; color:white;">{{'0'+index}}</el-button>
									<el-button v-if="index>=10" style="background-color: #87ceeb; color:white;">{{index}}</el-button>
								</a>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<!-- 退出答题界面提示 -->
			<el-dialog
			  title="提示"
			  :visible.sync="cancelanswer"
			  center
			  width="500px"
			  :close-on-click-modal='false'>
			  <span style="font-size: 18px;"><i class="el-icon-warning" style="font-size: 20px;color: orange;"></i>返回题库，该操作不会保存所选答案，是否继续？</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="cancelanswer = false" round>取 消</el-button>
			    <el-button type="primary" @click="goBack" round>确 定</el-button>
			  </span>
			</el-dialog>
			
			<!-- 提交答题提示 -->
			<el-dialog
			  title="提示"
			  :visible.sync="submitanswer"
			  center
			  width="30%"
			  :close-on-click-modal='false'>
			  <span><i class="el-icon-warning"></i>返回题库，该操作不会保存所选答案，是否继续？</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="submitanswer = false" round>取 消</el-button>
			    <el-button type="primary" @click="goBack" round>确 定</el-button>
			  </span>
			</el-dialog>
		</el-card>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				questionNum:0,//测试题总数
				questionData:[],//存放测试题
				questionForm:[],//存放答题结果
				cancelanswer:false,//是否显示   退出答题界面提示
				submitanswer:false,//是否显示   提交答题提示
				showOption:false,//选择答案后题号的样式
				questionBankInfo:{},//题库信息
				answerDatas:{},//学生成绩
			}
		},
		created() {
			//刷新界面时提示
			this.listenPage();
		},
		mounted() {
			this.getAnswers();
			this.getQuestionBank();
			this.getQuestions();
			
		},
		methods:{
			goBack(){
				this.cancelanswer = false
				this.$router.push('/index/'+this.$route.params.account+'/questionbank');
			},
			
			
			//提交答案
			submitAnswer(){
				for(var i=0;i<this.questionForm.length;i++){
					var total=this.questionForm.length-1;
					if(this.questionForm[i].value==''){
						var text='book'+(i+1);
						console.log('执行');
						this.$message({
							showClose: true,
							message: '第'+(i+1)+'题没有选择，请选择答案后再提交！',
							type: 'warning'
						});
						document.getElementById(text).click();
						break;
					}
					if(this.questionForm[total].value!='' && i==total){
						var name=this.$route.params.bankId.substring(0,5);
						var sum=0;
						for(var i=0;i<this.questionForm.length;i++){
							switch(this.questionForm[i].value){
								case 'A':sum=sum+this.questionBankInfo.scoreA;break;
								case 'B':sum=sum+this.questionBankInfo.scoreB;break;
								case 'C':sum=sum+this.questionBankInfo.scoreC;break;
								case 'D':sum=sum+this.questionBankInfo.scoreD;break;
								case 'E':sum=sum+this.questionBankInfo.scoreE;break;
							}
						}
						console.log('总分');
						console.log(sum);
						console.log('成绩');
						console.log(this.answerDatas);
						this.$set(this.answerDatas,name,sum);
						this.$axios({
							method: 'put',
							url:this.COMMON.apiUrl2+'/t-self-identification/update',
							data: this.answerDatas
						}).then(response => { // 请求成功
							console.log('数据修改成功');
							console.log(response);
							this.$message({
								showClose: true,
								message: '答案提交成功！',
								type: 'success'
							});
							this.$router.push('/index/'+this.$route.params.account+'/questionbank');
						}).catch(error => { // 请求失败
							console.log('请求失败'); 
							console.log(error);
						})
					}
				}
			},
			
			getQuestionBank(){
				var id=this.$route.params.bankId.substring(4,5);
				this.$axios({
					method: 'get',
					url:this.COMMON.apiUrl2+'/question-bank/getById',
					params: {
						question_bank_id:id
					}
				}).then(response => { // 请求成功
					console.log('response  xxxx');
					console.log(response);
					var data=response.data.data;
					this.questionBankInfo=data;
				}).catch(error => { // 请求失败
					console.log('请求失败'); 
					console.log(error);
				})
			},
			
			//获取题库
			getQuestions(){
				var id=this.$route.params.bankId.substring(4,5);
				this.$axios({
					method: 'get',
					url:this.COMMON.apiUrl2+'/questions/getById',
					params:{
						question_bank_id:id
					}
				}).then(response => { // 请求成功
					console.log('response  yyy');
					console.log(response);
					var data=response.data.data;
					this.questionData=data;
					this.questionNum=this.questionData.length;
					for(var i=0;i<this.questionData.length;i++){
						this.$set(this.questionForm,i,{value:''})
					}
				}).catch(error => { // 请求失败
					console.log('请求失败');
					console.log(error);
				})
			},
			
			getAnswers(){
				this.$axios({
					method: 'get',
					url:this.COMMON.apiUrl2+'/t-self-identification/getStudentScoreById',
					params: {
						studentId:this.$route.params.account
					}
				}).then(response => { // 请求成功
					console.log('学生成绩');
					console.log(response);
					var data=response.data.data[0];
					this.answerDatas=data;
				}).catch(error => { // 请求失败
					console.log('请求失败'); 
					console.log(error);
				})
			},
			
			//选择选项时执行
			chooseValue(num){
				console.log('num');
				console.log(num);
				console.log(this.questionForm[num].value);
			},
			
			//答题界面刷新执行
			listenPage() {
				window.onbeforeunload = function (e) {
					e = e || window.event;
					if (e) {
						e.returnValue = '关闭提示';
					}
					return '关闭提示';
				};
				// this.$router.push('/answer');
			},
		},
		watch:{
			questionForm:{
				handler(){
					if(this.questionForm.length==this.questionData.length){
						console.log('执行')
						console.log(this.questionForm.length);
						this.showOption=true;
					}else{
						this.showOption=false;
					}
				},
				deep: true
			}
		}
	}
</script>

<style scoped="scoped">
	.cardStyle{
		/* border:1px solid black; */
		margin-bottom: 50px;
	}
	
	.card-main{
		/* padding:30px; */
	}
	
	.optionStyle{
		height:40px;
		width:100%;
		/* border:1px solid #000000; */
		margin-left:30px;
	}
	.optionStyle font{
		font-size: 16px;
	}
</style>
