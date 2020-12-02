import Vue from 'vue'
import Router from 'vue-router'

// import HW from '../components/HelloWorld.vue'

import Login from '../view/login/index.vue'
import Index from '../view/index/index.vue'
import Home from '../view/home/index.vue'
import Test from '../view/test/test.vue'
import QuestionBank from '../view/question_bank/index.vue'
import KnowMajor from '../view/know_major/index.vue'
import Answer from '../components/question_bank/answer.vue'
import KnowFirm from '../view/know_firm/index.vue'
import StudyPlanning from '../view/study_planning/index.vue'
import AreerPlanning from '../view/areer_planning/index.vue'
import TestResult from '../view/test_result/index.vue'

Vue.use(Router);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}


let router = new Router({
	mode: 'history',
	routes: [{
			path: '/',
			name: '/',
			redirect: '/login',
			//redirect   表示当路径使用到‘/’是，就自动跳转到路径为‘/login’
		}, {
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/index/:account',
			name: 'Index',
			component: Index,
			meta: {
				requireAuth: true
			},
			children: 
			[
				{
					//主页
					path: '/index/:account/home',
					name: 'Home',
					component: Home,
					meta: {
						requireAuth: true
					},
				},
				{
					//题库
					path: '/index/:account/questionbank',
					name: 'QuestionBank',
					component: QuestionBank,
					meta: {
						requireAuth: true
					},
				},
				{
					//认识专业
					path: '/index/:account/knowmajor',
					name: 'KnowMajor',
					component: KnowMajor,
					meta: {
						requireAuth: true
					},
				},{
					//认识企业
					path: '/index/:account/knowfirm',
					name: 'KnowFirm',
					component: KnowFirm,
					meta: {
						requireAuth: true
					},
				},{
					//学业规划
					path: '/index/:account/studyplanning',
					name: 'StudyPlanning',
					component: StudyPlanning,
					meta: {
						requireAuth: true
					},
				},{
					//职业发展规划
					path: '/index/:account/areerplanning',
					name: 'AreerPlanning',
					component: AreerPlanning,
					meta: {
						requireAuth: true
					},
				},
				{
					//测试结果
					path: '/index/:account/testresult',
					name: 'TestResult',
					component: TestResult,
					meta: {
						requireAuth: true
					},
				},
			]
		},
		{
			path: '/answer/:account/questionBank/:bankId',
			name: 'Answer',
			component: Answer,
			meta: {
				requireAuth: true
			},
		},
		{
			path: '/test',
			name: 'Test',
			component: Test,
		}
	]
})

export default router

//登录拦截
router.beforeEach((to, from, next) => {
	console.log('to');
	console.log(sessionStorage.getItem("isLogin"));
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
		var isLogin=sessionStorage.getItem("isLogin");
        if (isLogin=='1') {  // 通过sessionStorage 获取当前的token是否存在
            next();
        }
		else {
            next({
                path: '/login',// 将跳转的路由path作为参数，登录成功后跳转到该路由
                // query: {redirect: to.fullPath}  
            })
        }
    }
    else {
        next();
    }
	
	if(to.fullPath=='/login'){
		sessionStorage.setItem("isLogin",0);
	}
})
