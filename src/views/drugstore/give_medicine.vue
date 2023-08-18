<template>

	<div class="app-container">
		<hm @registerMsg = "get"></hm>
		<el-divider></el-divider>
		<el-icon class="topIcon">
			<Document />
		</el-icon>
		<span class="topText">开设处方</span>
		<el-divider></el-divider>
		<el-table ref="multipleTable" :data="state.tableDate2" tooltip-effect="dark" style="width: 100%">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="药品名称" align="center" prop="drugCode">
			</el-table-column>
			<el-table-column label="药品规格" align="center" prop="drugName">
			</el-table-column>
			<el-table-column label="单价" align="center" prop="drugPrice">
			</el-table-column>
			<el-table-column label="用法用量" align="center" width="400px">
				<el-input type="textarea" placeholder="输入用法用量,使用频次等信息" size="small" v-model="state.prescription.drugUsage"></el-input>
			</el-table-column>
			<el-table-column label="数量" align="center" >
				<div style="display: flex; ">
					<button @click="addnum">+</button>
					<el-tag >{{state.prescription.drugNumber}}</el-tag>
					<button @click="rednum">-</button>
				</div>
			</el-table-column>
			<el-table-column label="删除" align="right" >
				<template #header>
					<el-text type="primary" style="cursor: pointer;">
						删除
					</el-text>
				</template>
			</el-table-column>
			<el-table-column label="增加" align="left">
				<template #header>
					<el-text type="primary" @click="getAll" style="cursor: pointer;">
						增加
					</el-text>
				</template>
			</el-table-column>
		</el-table>
		<div class="bottomButton">
			<el-button type="primary" @click="prescription">开立处方</el-button>
			<el-button type="primary">处置处方</el-button>
		</div>
	</div>
	<el-dialog v-model="state.flag" destory-on-close>
		<el-descriptions title="添加药品" column="1" border>
			<el-descriptions-item label="药品名称:">
				<el-input placeholder="请输入药品名称" v-model="state.form.drugName">

				</el-input>
			</el-descriptions-item>
			<el-descriptions-item label="药品拼音助记码">
				<el-input placeholder="请输入药品拼音助记码(支持模糊查询)" v-model="state.form.mnemonicCode"></el-input>
			</el-descriptions-item>
		</el-descriptions>
		<el-button type="primary" align="right" @click="findLike">搜索</el-button>
		<el-table :data="state.tableData" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>

			<el-table-column label="药品编码" align="center" prop="drugCode">
			</el-table-column>

			<el-table-column label="药品名称" align="center" prop="drugName">
			</el-table-column>
			<el-table-column label="药品规格" align="center" prop="drugUnit">
			</el-table-column>
			<el-table-column label="药品单价" align="center" prop="drugPrice">
			</el-table-column>
			<el-table-column label="包装单位" align="center" prop="drugFormat">
			</el-table-column>
			<el-table-column label="生产厂家" align="center" prop="manufacturer">
			</el-table-column>
		</el-table>
		<el-button type="primary" @click="state.flag=false">添加</el-button>
		<el-button type="primary" @click="state.flag=false">关闭</el-button>
	</el-dialog>

</template>

<script setup name="his">
	import axios from 'axios';
	import qs from 'qs';
	import {
		reactive, toRef
	} from 'vue';
import hm from '@/components/registration/headermsg'

	let state = reactive({
		tableData: [],
		tableDate2:[],
		number: 1,
		form: {
			id:undefined,
			drugName:undefined,
			mnemonicCode:undefined,
			drugCode:undefined,
			drugUnit:undefined,
			drugPrice:undefined,
			drugFormat:undefined
		},
		prescription:{
			registerId:undefined,
			drugId:undefined,
			drugUsage:undefined,
			drugNumber:1,
			creationTime:undefined,
			drugState:undefined
		},
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
		flag: false,
		drugIdArr:[]
	})
	//获得子组件的参数
	const get = (value) => {
		state.regist = value;
	}
	function addnum(){
			
			state.prescription.drugNumber++;
		
		
	}
	function rednum(){
		if(state.prescription.drugNumber!=0){
				state.prescription.drugNumber--;
			}
	}

	function add() {
		state.number++
	}

	function sub() {
		if (state.number <= 1) {
			state.number = 1
		} else {
			state.number--
		}
	}

	function findDrugInfoList() {
		axios.post("http://localhost:8091/DurgInfo/findLike",state.form)
			.then(res => {
				state.tableData = res.data
				state.tableData.length=10
			})
	}
	function findLike(){
		findDrugInfoList()
	}
	function getAll() {
		state.flag = true
		findDrugInfoList()
	}
	function handleSelectionChange(rows){
		state.tableDate2=rows
		console.log(state.tableDate2);
	}
	
	function prescription(){
		state.prescription.registerId = state.regist.caseNumber;
		state.prescription.drugId=state.tableDate2[0].id;
		axios
		.post("http://localhost:8091/prescription/save",state.prescription)
		.then(res=>{
		
			if (res.data.code == 1) {
				state.dialogTableVisible = false;
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
	.topIcon {
		top: 3px;
		font-size: 30px;

	}

	.topText {
		font-size: 30px;
	}

	.bottombutton {
		position: relative;

		top: 20px;
		left: 10px;
	}
</style>