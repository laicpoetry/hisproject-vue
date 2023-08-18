<template>
		<el-container>
		<el-header height="10px"></el-header>
		<el-divider />
		<el-header height="20px" class="left1">
	
			<el-icon style="vertical-align: -19%">
				<DocumentChecked />
			</el-icon>
			{{myprops.title}}
	
		</el-header>
		<el-divider />
		<el-header height="80px" >
			<div class="left2">患者信息查询</div>
	
			<el-form :inline="true" label-position="top">
				<el-form-item>
					<span slot="label"><el-icon style="vertical-align: -19%">
							<Tickets />
						</el-icon>病历号：</span>
					<el-input placeholder="请输入病历号" v-model="state.regist.caseNumber"  />
				</el-form-item>
				<el-form-item>
					<span slot="label"><el-icon style="vertical-align: -19%">
							<User />
						</el-icon>患者名：</span>
	
					<el-input placeholder="请输入患者名" v-model="state.regist.realName"  />
				</el-form-item>
	
				<el-form-item>
					<el-button type="primary" @click="onSubmit">搜索</el-button>
				</el-form-item>
			</el-form>
	
		</el-header>
		<el-divider />
					</el-container>
				
		</template>

<script setup>

import axios from 'axios';
import { reactive } from 'vue';
import qs from 'qs';
const myprops = defineProps(['title','flag'])
const emit = defineEmits(['register'])

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
		
		},
		
		
	})
	if(myprops.flag!=undefined){
		state.flag=myprops.flag;
	}
	function onSubmit(){
		axios
		.post("http://localhost:8091/register/queryOne",qs.stringify(state.regist))
		.then(res=>{
			state.regist.realName=res.data.realName;
			state.regist.cardNumber=res.data.cardNumber;
			state.regist.age=res.data.age;
			state.regist.gender=res.data.gender;
			
			emit("register",state.regist);
			
		})
		.catch(err=>{
			console.log(err);
		})
	}
	
	
	
</script>

<style>
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