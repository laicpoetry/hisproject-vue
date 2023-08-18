import {
	createRouter,
	createWebHashHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Index from '@/views/hisproject/index'


const routes = [{
		path: '/',
		name: 'Index',
		component: Index,
		children: [{
				path: '/expense-refund',
				name: '退费',
				component: () => import('../views/registration/expense_refund.vue'),
				meta: {
					isLogin: true
				}
			},
			{
				path: '/expense-manage',
				name: '费用记录查询',
				component: () => import('../views/registration/expense_manage.vue'),
				meta: {
					isLogin: true
				}
			},
			{
				path: '/onsite-registration',
				name: '窗口挂号',
				component: () => import('../views/registration/onsite_registration.vue'),
				meta: {
					isLogin: true
				}
			},
			{
				path: '/registration-record',
				name: '窗口退号',
				component: () => import('../views/registration/registration_record.vue'),
				meta: {
					isLogin: true
				}
			},
			{
				path: '/expense-charge',
				name: '收费',
				component: () => import('../views/registration/expense_charge.vue'),
				meta: {
					isLogin: true
				}
			},
			{
				path: '/physician-patient',
				name: '患者查看',
				component: () => import('../views/physician/physician_patient.vue'),
				meta: {
					isLogin: true
				}
			},
			{
				path: '/home_medical_record',
				name: '医生诊疗：病历首页',
				component: () => import('../views/physician/patient/home_medical_record.vue'),
				meta: {
					isLogin: true
				}
			},
			{
				path: '/check_request',
				name: '医生诊疗：检查申请',
				component: () => import('../views/physician/patient/check_request.vue'),
				meta: {
					isLogin: true
				}
			},
			 {
			        path: '/check-apply',
			        name: '检查申请',
			        component: () => import('../views/check/check_apply.vue'),
			        meta: {
			          isLogin: true
			        }
			      },{
			        path: '/check-patient',
			        name: '患者录入',
			        component: () => import('../views/check/check_patient.vue'),
			        meta: {
			          isLogin: true
			        }
			      },{
			        path: '/check-input',
			        name: '检查结果录入',
			        component: () => import('../views/check/check_input.vue'),
			        meta: {
			          isLogin: true
			        }
			      },{
			        path: '/check-manage',
			        name: '检查管理',
			        component: () => import('../views/check/check_manage.vue'),
			        meta: {
			          isLogin: true
			        }
			      },
				    {
				          path: '/physician-history',
				          name: '看诊记录',
				          component: () => import('../views/physician/physician_history.vue'),
				          meta: {
				            isLogin: true
				          }
				        },
				        {
				          path: '/check_results',
				          name: '医生诊疗：检查结果',
				          component: () => import('../views/physician/patient/check_results.vue'),
				          meta: {
				            isLogin: true
				          }
				        },
						 {
						        path: '/outpatient_diagnosis',
						        name: '医生诊疗：门诊确诊',
						        component: () => import('../views/physician/patient/outpatient_diagnosis.vue'),
						        meta: {
						          isLogin: true
						        }
						      },
							   {
							          path: '/give-medicine',
							          name: '药房发药',
							          component: () => import('../views/drugstore/give_medicine.vue'),
							          meta: {
							            isLogin: true
							          }
							        },
		]
	},
	{
		path: '/about',
		name: 'about',
		component: () => import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router