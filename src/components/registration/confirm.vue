<template>
	<div class="left2">患者信息确认</div>
				
	<el-form :inline="true" label-position="left" label-width="72px" >
		 <el-icon style="vertical-align: 30%">
					<User />
				</el-icon>
		<el-form-item label="患者名:" >
		<el-input  v-model="state.regist.realName" disabled  />
		</el-form-item>
		
		<el-icon style="vertical-align: 30%">
											<Postcard />
										</el-icon>
		<el-form-item label="身份证号:">
	
			<el-input  v-model="state.regist.cardNumber" disabled />
		</el-form-item>
		
		<el-icon style="vertical-align: 30%">
											<Calendar />
										</el-icon>
		<el-form-item label="年龄:">
			<el-input  v-model="state.regist.age" disabled />
		</el-form-item>
		
		<el-icon style="vertical-align: 30%">
											<Male />
										</el-icon>
		<el-form-item label="性别:">
			<el-input  v-model="state.regist.gender" disabled />
		</el-form-item>
	
	</el-form>
</template>

<script setup>
	import axios from 'axios';
	import { onUpdated, reactive } from 'vue';
	import qs from 'qs';
	let state = reactive({
			
			regist:{
			id:undefined,
			registerId:undefined,
			caseNumber:undefined,
			realName:undefined,
			gender:undefined,
			cardNumber:undefined,
			age:undefined,
			birthday:undefined,
			ageType:undefined,
			homeAddress:undefined,
			visitDate:undefined,
			noon:undefined,
			deptmentId:undefined,
			employeeId:undefined,
			registLevelId:undefined,
			settleCategoryId:undefined,
			isBook:undefined,
			registMethod:undefined,
			visitState:undefined,
			registMoney:undefined
			
			}
			
		})
		
const myprops = defineProps(['register'])
onUpdated(()=>{
	if(myprops.register!=undefined){
		state.regist=myprops.register; 
		console.log(state.regist);
	}
})
	


	
	
</script>

<style scoped>
	.left1 {
		text-align: left;
		font-size: 23px;
	
	
	}
	
	.left2 {
		text-align: left;
		font-size: 23px;
		font-weight: bold;
	}
</style>