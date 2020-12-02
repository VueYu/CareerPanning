<template>
	<div>
		<div v-for="(val,index) in queryData" :key="index">
			<font>{{val.question}}</font>
			<el-radio-group v-model="answer[index].value" @change="xx(index)">
			  <el-radio :label="val.optionA" value="A"></el-radio>
			  <el-radio :label="val.optionB" value="B"></el-radio>
			  <el-radio :label="val.optionC" value="C" v-if="val.optionC!=null"></el-radio>
			  <el-radio :label="val.optionD" value="D" v-if="val.optionD!=null"></el-radio>
			  <el-radio :label="val.optionE" value="E" v-if="val.optionE!=null"></el-radio>
			</el-radio-group>
		</div>
	</div>
</template>

<script>
  export default {
    data () {
      return {
        radio: 3,
		answer:[],
		queryData:[
			{question:'你的性别是什么',optionA:'男生',optionB:'女生'},
			{question:'你喜欢什么运动',optionA:'羽毛球',optionB:'篮球',optionC:'乒乓球'},
			{question:'中国的地面',optionA:'北京',optionB:'四川',optionC:'湖南',optionD:'福建',optionE:'黑龙江'}
		]
      };
    },
	created() {
		for(var i=0;i<this.queryData.length;i++){
			this.$set(this.answer,i,{value:''})
		}
	},
	methods:{
		xx(num){
			console.log(this.answer[num].value);
		}
	}
  }
</script>