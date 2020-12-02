<!-- 职业生涯规划答题  毕业设计 -->
<template>
  <div id="app">
	<!-- <router-view></router-view> -->
	<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeCreate(){
  	console.log('刷新');
  },
}
</script>

<style scoped="scoped">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: calc(100vh);
	margin: 0px;
	padding:0px;
}
</style>
