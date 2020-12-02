<!-- 登录界面 -->
<template>
	<div class="bg">
		<div style="width: 99%;height:400px;margin-top: 250px;">
			<div class="text">
				<p><b>大学生职业生涯规划</b></p>
				<p><b>应用系统</b></p>
			</div>
			<div class="bg_form">
				<BackGround></BackGround>
			</div>
		</div>
	</div>
</template>

<script>
	import BackGround from '../../components/login/background.vue'
	export default {
		components: {
			BackGround,
		},
		data() {
			return {

			}
		},
	}
</script>

<style scoped>
	.bg {
		width: 100%;
		height: calc(100vh);
		box-sizing: border-box;
		background-image: url('../../assets/bglogin.jpg');
		background-Size: 100% 100%;
		/* border:1px solid #000000 */
		overflow: hidden;
	}

	.bg_form {
		/* background: rgba(255, 255, 255,0.4); */
		width: 300px;
		height: 400px;
		float: right;
		margin-right: 10%;
		/* border:1px solid #8d888b */
	}

	.text {
		width: 500px;
		float: left;
		text-align: center;
		margin-left: 5%;
		color: white;
		font-family: 幼圆;
		font-size: 50px;
		/* border:1px solid #000000 */
	}
</style>
