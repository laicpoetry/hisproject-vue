<template>

	<div class="app-container">
		<el-divider></el-divider>
		<el-icon class="topIcon">
			<Document />
		</el-icon>
		<span class="topText">在诊患者</span>
	</div>
	<el-form :inline="true">
		<el-form-item>
			<el-input placeholder="请输入患者病历号" size="large" v-model="state.regist.caseNumber" ></el-input>
		</el-form-item>
		<el-form-item>
			<el-input placeholder="请输入患者姓名" size="large" v-model="state.regist.realName"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button size="large" @click="query">搜索</el-button>
		</el-form-item>
	</el-form>

	<el-form class="frame">
		<el-table :data="state.tableData">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column label="编号" align="center" type="index"/>
			<el-table-column label="患者病历号" align="center"  prop="caseNumber"/>
			<el-table-column label="患者身份证" align="center" prop="cardNumber"/>
			<el-table-column label="患者状态" align="center" prop="visitState"/>
			<el-table-column label="挂号时间" align="center" prop="visitDate" />
			<el-table-column label="操作" align="center" >
					<el-button size="mini" type="text">更新病历</el-button>
			</el-table-column>
		</el-table>
	</el-form>
</template>

<script setup name="his">
import { reactive } from '@vue/reactivity';
import axios from 'axios';
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
		tableData:[]
	})
	const query = () =>{
		axios
		.post("http://localhost:8091/register/queryGh",state.regist)
		.then(res=>{
			console.log(res.data);
			state.tableData = res.data;
			if(state.tableData[0].visitState=2){
				state.tableData[0].visitState = '医生接诊'
			}
			
		})
	}
</script>

<style scoped>
	.app-container {

		height: 130px;
	}

	.topIcon {
		top: 3px;
		font-size: 30px;

	}

	.topText {
		font-size: 30px;
	}



	

	
</style>