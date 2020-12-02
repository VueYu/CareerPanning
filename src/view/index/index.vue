<!-- 主页 -->
<template>
	<div class="index_style">
		<div style="height:90px;width:100%;background-color: #405b6c;position:fixed;z-index: 99;">
			<IndexHeader></IndexHeader>
		</div>
		
		<div class="index_aside_style">
			<IndexAside></IndexAside>
		</div>
		
		<div class="index_main_style">
			<router-view v-if="isRouterAlive"></router-view>
		</div>
	</div>
</template>

<script>
  import IndexHeader from '../../components/index/indexHeader/header.vue'
  import IndexAside from '../../components/index/indexAside/aside.vue'
  export default {
    components:{
		IndexHeader,
		IndexAside
	},
	data(){
		return{
			isRouterAlive:false,
		}
	},
	provide () {
		return {
			reload: this.reload
		}
	},
	methods:{
		reload(){
			this.isRouterAlive = false
			this.$nextTick(function () {
				this.isRouterAlive = true
			})
		}
	}
  }
</script>

<style>
	.index_style{
		width:100%;
		height: 100%;
		box-sizing: border-box;
		overflow-x: auto;
		overflow-y: auto;
	}
	
	.index_main_style{
		background-color: white;
		width:calc(100% - 210px);
		height: calc(100% - 90px);
		margin-top: 90px;
		margin-left: 210px;
		/* border: 2px solid #0000FF; */
		overflow-x: auto;
		overflow-y: auto;
	}
	
	.index_aside_style{
		width:210px;
		height:calc(100vh - 90px);
		position:fixed;
		margin-top: 90px;
		overflow-x: auto;
		overflow-y: auto;
	}
	.index_aside_style::-webkit-scrollbar { 
		width: 0 !important 
	}
</style>
