<template>
	<el-row>
		患者信息：
		<el-tag>姓名:{{state.regist.realName}}</el-tag>
		<el-tag>病历号:{{state.regist.caseNumber}}</el-tag>
		<el-tag>年龄:{{state.regist.age}}</el-tag>
		<el-tag>性别:{{state.regist.gender}}</el-tag>
	</el-row>
</template>

<script setup>
import axios from 'axios';
import { onMounted, onUpdated, reactive } from 'vue';
import qs from 'qs'

	
	let state = reactive({
		register:[],
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
	
	},
	})
	const emit = defineEmits(['registerMsg']);
	onMounted(()=>{
		axios
		.post("http://localhost:8091/register/queryJZ")
		.then(res=>{
			state.register = res.data[0];
			state.regist = state.register
			emit('registerMsg',state.regist);
			
		})
		.catch(err=>{
			console.log(err);
		})
	})
	
</script>

<style>
</style>