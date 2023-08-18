<template>
	<div class="topTag">
		<el-form class="topFrame">
			<hm @registerMsg="get"></hm>
		</el-form>
	</div>
	<div class="app-container">
		<el-divider></el-divider>
		<el-icon class="topIcon">
			<Document />
		</el-icon>
		<span class="topText">检查结果</span>
		<el-divider></el-divider>
	</div>
	<gt :registerId = 'state.regist.caseNumber'></gt>
	<el-form>
		<div class="middle">
			<div class="middle2">
				<el-form-item>
					<el-descriptions title="检查结果详情:" border column="1" style="width: 1200px;" size="large">
						
						<el-descriptions-item label="开立时间:" >
							<el-tag>{{state.checkRequest.creationTime}}</el-tag>
						</el-descriptions-item>
						<el-descriptions-item label="检查医生:">
							<el-tag>{{state.checkRequest.checkEmployeeId}}</el-tag>
						</el-descriptions-item>
						<el-descriptions-item label="检查部位:">
							<el-tag>{{state.checkRequest.checkPosition}}</el-tag>
						</el-descriptions-item>
						<el-descriptions-item label="目的要求:">
							<el-tag>{{state.checkRequest.checkInfo}}</el-tag>
						</el-descriptions-item>
						<el-descriptions-item label="医嘱备注:">
							
						</el-descriptions-item>
						<el-descriptions-item label="检查结果:">
							<el-tag>{{state.checkRequest.checkResult}}</el-tag>
						</el-descriptions-item>
						<el-descriptions-item label="检查时间:">
							<el-tag>{{state.checkRequest.checkTime}}</el-tag>
						</el-descriptions-item>
					</el-descriptions>
					
				</el-form-item>
				
				
			</div>
		</div>
		
	</el-form>
</template>

<script setup name="his">
	import {
		onUpdated,
		reactive
	} from 'vue';
	import hm from '@/components/registration/headermsg'
	import axios from 'axios';
	import {
		ElMessage
	} from 'element-plus'
	import gt from '@/components/checkrequest/getTable'
	import { onMounted } from 'vue';
	let state = reactive({
		//判断是否弹出对话框
		dialogTableVisible: false,
		regist: {
			id: undefined,
			registerId: undefined,
			caseNumber: undefined,
			realName: undefined,
			gender: undefined,
			cardNumber: undefined,
			age: undefined,
			birthday: undefined,
			ageType: undefined,
			homeAddress: undefined,
			visitDate: undefined,
			noon: undefined,
			deptmentId: undefined,
			employeeId: undefined,
			registLevelId: undefined,
			settleCategoryId: undefined,
			isBook: undefined,
			registMethod: undefined,
			visitState: undefined,
			registMoney: undefined
		},
		medicalTechnology: {
			id: undefined,
			techCode: undefined,
			techName: undefined,
			techFormat: undefined,
			techPrice: undefined,
			techType: undefined,
			priceType: undefined,
			deptmentId: undefined
		},
		//检查申请表
		checkRequest: {
			id: undefined,
			registerId: undefined,
			medicalTechnologyId: undefined,
			checkInfo: undefined,
			checkPosition: undefined,
			creationTime: undefined,
			checkEmployeeId: undefined,
			inputcheckEmployeeId: undefined,
			checkTime: undefined,
			checkResult: undefined,
			checkState: undefined,
			checkRemark: undefined
		},
	
	})
	//获得子组件的参数
	const get = (value) => {
		state.regist = value;
	  console.log(value)
	}
	onUpdated(()=>{
		
		axios
		.get("http://localhost:8091/cr/getMsg?registerId="+state.regist.caseNumber)
		.then(res=>{
			state.checkRequest = res.data;
			console.log(state.checkRequest);
		})
		.catch(err=>{
			console.log(err);
		})
	})
</script>

<style scoped>


	.topIcon {
		top: 3px;
		font-size: 30px;
		
	}

	.topText {
		font-size: 30px;
	}
	.middle{
		position: relative;
		top: 20px;
	}
	.middle2{
		position: relative;
		top: 10px;
	}

	
</style>