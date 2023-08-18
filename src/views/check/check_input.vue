<template>
	<div class="app-container">
		<el-container>
			<el-header height="20px" class="left1">

				<el-icon style="vertical-align: -19%">
					<DocumentChecked />
				</el-icon>
				检查结果录入

			</el-header>
			<el-divider />
			<el-form :inline="true" label-position="top">
				<el-form-item>
					<el-input placeholder="请输入患者病历号" v-model="state.caseNumber" />
				</el-form-item>
				<el-form-item>


					<el-input placeholder="请输入患者姓名" v-model="state.realName" />
				</el-form-item>

				<el-form-item>
					<el-button @click="onSubmit">搜索</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="state.regist">
				<el-table-column label="编号" type="index"></el-table-column>
				<el-table-column label="患者姓名" prop="realName"></el-table-column>
				<el-table-column label="患者病历号" prop="caseNumber"></el-table-column>
				<el-table-column label="患者年龄" prop="age"></el-table-column>
				<el-table-column label="患者性别" prop="gender"></el-table-column>
				<el-table-column>
					<el-button @click="getCheckComplete">已完成检查</el-button>
				</el-table-column>
			</el-table>
			<el-divider></el-divider>
			<el-table tooltip-effect="dark" style="width: 100%" :data="state.tableData">

				<el-table-column type="index"></el-table-column>
				<el-table-column label="检查编码" prop="techCode">
				</el-table-column>
				<el-table-column label="检查名称" prop="techName">
				</el-table-column>
				<el-table-column label="检查规格" prop="techFormat">
				</el-table-column>
				<el-table-column label="检查时间" prop="techPrice">
				</el-table-column>
				<el-table-column label="单价" prop="techPrice">
				</el-table-column>
				<el-table-column label="费用分类" prop="priceType">
				</el-table-column>

			</el-table>

			<el-tag>已选择的检查项目:{{state.techName}}
			</el-tag>


			<el-descriptions title="选择输入检查结果的医生" column="2" border style="width: 900px;" size="large">
				<el-descriptions-item label="科室选择">
					<el-select v-model="state.deptment.deptName" placeholder="请选择科室">
						<el-option v-for="item in state.deptment" :value="item.deptName" :key="item.deptName"
							@click="getDoc(item.id)"></el-option>
					</el-select>
				</el-descriptions-item>
				<el-descriptions-item label="医生选择">
					<el-select v-model="state.employee.realname" placeholder="请选择医生">
						<el-option v-for="item in state.employee" :value="item.realname" :key="item.realname"
							@click="getDocId(item.id)"></el-option>
					</el-select>
				</el-descriptions-item>
			</el-descriptions>
			<el-descriptions title="输入检查结果" column="2" border style="width: 900px;" size="large">
				<el-descriptions-item label="检查结果">
					<el-input type="textarea" v-model="state.checkRequest.checkResult"></el-input>
				</el-descriptions-item>
			</el-descriptions>
			<el-row>
				<el-button type="primary" @click="save">结果提交</el-button>
				<el-button type="primary">重置输入</el-button>
			</el-row>
		</el-container>
	</div>
</template>

<script setup>
	import {
		reactive
	} from 'vue';
	import axios from 'axios';
	import qs from 'qs';
	import {
		onMounted
	} from 'vue';
	import {
		ElMessage
	} from 'element-plus'
	let state = reactive({

		regist: [],
		tableData: [],
		deptment: [],
		employee: [],
		caseNumber: undefined,
		realName: undefined,
		checkMsg: undefined,
		techName: undefined,
		inputEmployeeId: undefined,
		checkRequest:{
			registerId:undefined,
			inputcheckEmployeeId:undefined,
			checkTime:undefined,
			checkResult:undefined
			
		}
	})

	function onSubmit() {
		axios
			.get("http://localhost:8091/register/getReg?caseNumber=" + state.caseNumber + "&realName=" + state.realName)
			.then(res => {
				state.regist = res.data;
				console.log(res.data);
				console.log(state.regist);


			})
			.catch(err => {
				console.log(err);
			})
	}

	const getDoc = (id) => {
		console.log(id);
		axios
			.get("http://localhost:8091/emp/getDoc?deptId=" + id)
			.then(res => {
				state.employee = res.data;

			})
			.then(err=>{
				console.log(err);
			})
	}
	const getDocId = (id) => {
		state.checkRequest.inputcheckEmployeeId = id;
		
	}

	function getCheckComplete() {
		axios
			.get("http://localhost:8091/mtc/getmt?registerId=" + state.caseNumber)
			.then(res => {
				state.tableData = res.data

				state.techName = state.tableData[0].techName


			})
			.catch(err => {
				console.log(err);
			})
	}
	onMounted(() => {
		axios
			.post("http://localhost:8091/dept/getAll")
			.then(res => {
				state.deptment = res.data;
			})
			.catch(err => {
				console.log(err);
			})
	})
	const save = () => {
	state.checkRequest.registerId = state.caseNumber;
	
		axios
			.post("http://localhost:8091/cr/addInputId" ,state.checkRequest)
			.then(res => {
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
	.app-container {
		text-align: left;
	}
</style>