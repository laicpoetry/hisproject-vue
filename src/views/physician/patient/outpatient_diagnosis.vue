<template>

	<div class="app-container">
		<hm @registerMsg="get"></hm>
		<el-divider></el-divider>
		<el-icon class="topIcon">
			<Document />
		</el-icon>
		<span class="topText">门诊确诊</span>
		<el-divider></el-divider>
	</div>
	<div class="enter">
		<span>确诊信息录入:</span>
	</div>
	<el-form class="frame">
		<el-form-item>
	    <el-input  placeholder="输入诊断结果判断" size="large" v-model="state.medicalRecord.diagnosis">
	      <template #prepend>诊断结果:</template>
	    </el-input>
		   <el-input  placeholder="输入治疗意见 " size="large" v-model="state.medicalRecord.cure">
	      <template #prepend>处理意见:</template>
	    </el-input>
	</el-form-item>
	<el-form-item>
		<el-button type="primary" @click="qz">确诊提交</el-button>
		<el-button type="primary">重置输入</el-button>
	</el-form-item>
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
		// 患者病历
		medicalRecord: {
			registerId: undefined,
			diagnosis:undefined,
			cure:undefined
		},

		
	
	})
	//获得子组件的参数
	const get = (value) => {
		state.regist = value;
	  console.log(value)
	}
	const qz=()=>{
		state.medicalRecord.registerId = state.regist.caseNumber
		axios
		.post("http://localhost:8091/mr/qz",state.medicalRecord)
		.then(res=>{
			if (res.data.code == 1) {
			
				//消息提示
				ElMessage({
					message: res.data.message,
					type: 'success',
				})
			} else {
				ElMessage.error(
					res.data.message,
				)
			}
		})
	}
</script>

<style scoped>
.app-container{
	text-align: left;
}

	.topIcon {
		top: 3px;
		font-size: 30px;
		
	}

	.topText {
		font-size: 30px;
	}
	.enter{
		position: relative;
		left: 25px;
		top: -25px;
		font-weight: bolder;
	}
	.frame{
		.el-form-item{
			.el-input{
				width: 850px;
				height: 150px;
			}
		}
	}
	
	

	
</style>