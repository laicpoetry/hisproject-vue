<template>

	<div class="app-container">
		<hm @registerMsg="get"></hm>
		<el-divider></el-divider>
		<el-icon class="topIcon">
			<Document />
		</el-icon>
		<span class="topText">检查项目</span>
		<el-divider></el-divider>
	
		<gt :registerId = 'state.regist.caseNumber'></gt>
	</div>
	<el-descriptions title="确认检查科室和检查医生" column="2" border style="width: 900px;" size="large">
		<el-descriptions-item label="科室选择">
			<el-select v-model="state.deptment.deptName" placeholder="请选择科室">
				<el-option v-for="item in state.deptment"
				:value="item.deptName"
				:key="item.deptName"
				@click="getDoc(item.id)"></el-option>
			</el-select>
		</el-descriptions-item>
		<el-descriptions-item label="医生选择">
			<el-select v-model="state.employee.realname" placeholder="请选择医生">
				<el-option v-for="item in state.employee"
				:value="item.realname"
				:key="item.realname"
				@click="getDocId(item.id)"></el-option>
			</el-select>
		</el-descriptions-item>
	</el-descriptions>
	<div class="bottombutton">
	<el-form>
		<el-form-item>
			<el-button type="primary" @click="save">开始检查</el-button>
			<el-button type="primary">重置医生</el-button>
		</el-form-item>
	</el-form>
	</div>
</template>

<script setup name="his">
	import {
		reactive
	} from 'vue';
	import hm from '@/components/registration/headermsg'
	import { onMounted } from 'vue';
	import axios from 'axios';
		import ct from '@/components/checkrequest/checkTable'
		import gt from '@/components/checkrequest/getTable'
		import {
			onUpdated,
		} from 'vue'
		import {
			ElMessage
		} from 'element-plus'
	let state = reactive({
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
		tableData:[],
		flag:false,
		registerId:undefined,
		deptment:[],
		employee:[],
		checkEmployeeId:undefined
	})
	//获得子组件的参数
	const get = (value) => {
		state.regist = value;
	}
	const getDoc = (id)=>{
		console.log(id);
		axios
		.get("http://localhost:8091/emp/getDoc?deptId="+id)
		.then(res=>{
			state.employee = res.data;
			
		})
		.catch(err=>{
			console.log(err);
		})
	}
	const getDocId = (id)=>{
		state.checkEmployeeId = id;
	}
	const save = ()=>{
		
		axios
		.get("http://localhost:8091/cr/addEmpId?empId="+state.checkEmployeeId+"&registerId="+state.regist.caseNumber)
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
		.catch(err=>{
			console.log(err);
		})
		
	}
	onMounted(()=>{
		axios
		.post("http://localhost:8091/dept/getAll")
		.then(res=>{
			state.deptment=res.data;
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
	
	.bottombutton{
		position: relative;
		
		top: 20px;
		left: 10px;
	}
</style>