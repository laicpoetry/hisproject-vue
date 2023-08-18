<template>

	<div class="app-container">
		<hm @registerMsg="get"></hm>
		<el-divider></el-divider>
		<el-icon class="topIcon">
			<Document />
		</el-icon>
		<span class="topText">检查申请</span>
		<el-divider></el-divider>
	</div>

	<el-form class="frame">
		<el-table :data="state.mt3">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column prop="techCode" label="检查编码" align="center" />
			<el-table-column prop="techName" label="检查名称" align="center" />
			<el-table-column prop="techFormat" label="检查规格" align="center" />
			<el-table-column prop="techPrice" label="单价" align="center" />
			<el-table-column prop="priceType" label="费用分类" align="center" />
			<el-table-column label="删除" align="right">
				<template #header>
					<el-text type="primary">删除</el-text>
				</template>
			</el-table-column>
			<el-table-column label="添加" align="left">
				<template #header>
					<el-text type="primary" @click="getjc">添加</el-text>
				</template>
			</el-table-column>
		</el-table>
		<div class="showText">
			<span id="secText">医嘱</span>
		</div>
		<el-form-item label="目的要求" label-width="120px">
			<el-input v-model="state.checkRequest.checkInfo" placeholder="请输入检验目的的要求" />
		</el-form-item>
		<el-form-item label="检验部位" label-width="120px">
			<el-input size="default" v-model="state.checkRequest.checkPosition" placeholder="请输入检验部位" />
		</el-form-item>
		<el-form-item label="备注" label-width="120px">
			<el-input size="default" v-model="state.checkRequest.checkRemark" placeholder="请输入检验事项" />
		</el-form-item>

		<el-form-item>
			<div class="click">
				<el-button @click="addcr">保存</el-button>
				<el-button>清空</el-button>
			</div>
		</el-form-item>
	</el-form>
	<el-dialog v-model='state.dialogTableVisible'>

		<el-table :data="state.mt" @selection-change="select">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column prop="techCode" label="检查编码" align="center" />
			<el-table-column prop="techName" label="检查名称" align="center" />
			<el-table-column prop="techFormat" label="检查规格" align="center" />
			<el-table-column prop="techPrice" label="单价" align="center" />
			<el-table-column prop="priceType" label="费用分类" align="center" />
		</el-table>
		<el-button type="primary" @click="addjc">添加</el-button>
	</el-dialog>

</template>

<script setup name="his">
	import {
		reactive
	} from 'vue';
	import hm from '@/components/registration/headermsg'
	import axios from 'axios';
	import {
		ElMessage
	} from 'element-plus'
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
			inputinspectionEmployeeId: undefined,
			checkTime: undefined,
			checkResult: undefined,
			checkState: undefined,
			checkRemark: undefined

		},
		//全部检查项目
		mt: [],
		//中间选择项目
		mt2: [],
		//选择后显示的项目
		mt3: []
	})
	//获得子组件的参数
	const get = (value) => {
		state.regist = value;
	  console.log(value)
	}
	//获取所有检查项目
	function getjc() {
		state.dialogTableVisible = true;
		axios
			.post("http://localhost:8091/mtc/getAll", state.medicalTechnology)
			.then(res => {
				state.mt = res.data;
				state.mt.length = 20;
			})
			.catch(err => {
				console.log(err);
			})

	}

	function select(rows) {

		state.mt2 = rows;


	}

	function addjc() {
		state.mt3 = state.mt2;
		state.dialogTableVisible = false;
		state.checkRequest.medicalTechnologyId = state.mt3[0].id;
		
	}
	//根据所选的检查项目和患者挂号id添加到检查申请表
	function addcr() {
		state.checkRequest.registerId = state.regist.caseNumber;
		axios
			.post("http://localhost:8091/cr/addcr", state.checkRequest)
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
			.catch(err=>{
				console.log(err);
			})
	}
</script>

<style scoped>
	.app-container {
		text-align: left;
		height: 130px;
	}

	.topIcon {
		top: 3px;
		font-size: 30px;

	}

	.topText {
		font-size: 30px;
	}

	.showText {
		top: 15px;
		height: 50px;
		position: relative;

	}

	#secText {
		font-size: 20px;
		position: relative;
		left: 20px;

	}

	.frame {
		.el-form-item {
			.el-input {
				width: 600px;
				height: 100px;
			}
		}
	}

	.frame {
		.el-form-item {
			.el-button {
				background-color: darkturquoise;
				color: white;
				text-align: center;
			}
		}
	}

	.click {
		position: relative;
		text-align: center;
		left: 550px;
	}
</style>