<template>
	<div class="app-container">
		<el-divider />
		<el-icon class="localtion">
			<DocumentChecked />
		</el-icon>窗口挂号
		<el-divider />


		<el-button type="primary" class="gh" @click="register">挂号</el-button>
		<el-button type="primary" class="gh">清空</el-button><br>
		<el-text>基本信息</el-text>


		<el-row id="a">
			<el-col :span="8">
				<el-input placeholder="请输入病例号" size="large" v-model="state.form.caseNumber" readonly>
					<template #prepend>病例号</template>
				</el-input>
			</el-col>
			<el-col :span="8">
				<el-input placeholder="请输入姓名" size="large" v-model="state.form.realName">
					<template #prepend>姓名</template>
				</el-input>
			</el-col>
			<el-col :span="8">
				<el-button slot="reference" id="xb">性别</el-button>
				<el-select v-model="state.form.gender" placeholder="请选择性别" size="large">
					<el-option v-for="option in state.genderList" :key="option.value" :value="option.value"></el-option>
				</el-select>
			</el-col>
		</el-row>

		<el-row>
			<el-col :span="5">
				<el-input placeholder="请输入年龄" size="large" v-model="state.form.age">
					<template #prepend>年龄</template>
				</el-input>
			</el-col>
			<el-col :span="3">
				<el-select v-model="state.form.ageType" placeholder="请选择" size="large">
					<el-option v-for="option in state.ageTypeList" :key="option.value"
						:value="option.value"></el-option>
				</el-select>
			</el-col>

			<el-col :span="8">
				<el-button slot="reference" id="xb">出生日期</el-button>
				<el-date-picker v-model="state.form.birthday" type="date" placeholder="请选择" size="large" />
			</el-col>
			<el-col :span="8">
				<el-input placeholder="请输入身份证号" size="large" v-model="state.form.cardNumber">
					<template #prepend>身份证号</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row id="a3">
			<el-col :span="24">
				<el-input placeholder="请输入家庭住址" size="large" v-model="state.form.homeAddress">
					<template #prepend>家庭住址</template>
				</el-input>
			</el-col>
		</el-row>
		<el-text>挂号信息</el-text>
		<el-row id="a2">
			<el-col :span="8">
				<el-button slot="reference" id="xb">结算类别</el-button>
				<el-select v-model="state.form.settleCategoryId" placeholder="请选择" size="large">
					<el-option v-for="option in state.settleCategoryList" :key="option.id"
						:value="option.id">{{option.settleName}}</el-option>
				</el-select>
			</el-col>
			<el-col :span="8">
				<el-button slot="reference" id="xb">看诊日期</el-button>
				<el-date-picker v-model="state.form.visitDate" type="date" placeholder="请选择" size="large" />
			</el-col>
			<el-col :span="8">
				<el-button slot="reference" id="xb">午别</el-button>
				<el-select v-model="state.form.noon" placeholder="请选择" size="large">
					<el-option v-for="option in state.noonList" :key="option.value" :value="option.value"></el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<el-button slot="reference" id="xb">挂号科室</el-button>
				<el-select v-model="state.form.deptmentId" placeholder="请选择" size="large">
					<el-option v-for="item in state.departmentList" :key="item.id"
						:value="item.id">{{item.deptName}}</el-option>
				</el-select>
			</el-col>
			<el-col :span="8">
				<el-button slot="reference" id="xb">号别</el-button>
				<el-select v-model="state.form.registLevelId" placeholder="请选择" size="large">
					<el-option v-for="option in state.registLevelList" :key="option.id"
						:value="option.id">{{option.registName}}</el-option>
				</el-select>
			</el-col>
			<el-col :span="8">
				<el-button slot="reference" id="xb">看诊医生</el-button>
				<el-select v-model="state.form.employeeId" placeholder="请选择" size="large">
					<el-option v-for="option in state.employeeList" :key="option.id"
						:value="option.id">{{option.realname}}</el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<el-input placeholder="初始号额" size="large">
					<template #prepend>初始号额</template>
				</el-input>
			</el-col>
			<el-col :span="8">
				<el-input placeholder="0" size="large">
					<template #prepend>已用号额</template>
				</el-input>
			</el-col>
			<el-col :span="8">
				<el-button slot="reference" id="xb">病历本</el-button>
				<el-switch v-model="state.form.isBook" class="ml-2"
					style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<el-input placeholder="请输入金额" size="large" v-model="state.form.registMoney">
					<template #prepend>应收金额</template>
				</el-input>
			</el-col>
			<el-col :span="8">
				<el-button slot="reference" id="xb">收费方式</el-button>
				<el-select v-model="state.form.registMethod" placeholder="请选择" size="large">
					<el-option v-for="option in state.registMethodList" :value="option.value"></el-option>
				</el-select>
			</el-col>
		</el-row>
	</div>


</template>

<script setup>
	import axios from 'axios';
	import {
		onMounted,
		reactive
	} from 'vue';

	let state = reactive({
		settleCategoryList: {},
		departmentList: {},
		registLevelList: {},
		employeeList: {},
		registMethodList: [{
				value: '现金'
			},
			{
				value: '银行卡'
			},
			{
				value: '微信'
			},
			{
				value: '医保卡'
			},
			{
				value: '支付宝'
			}
		],
		noonList: [{
				value: '上午'
			},
			{
				value: '下午'
			}
		],
		genderList: [{
				value: '男'
			},
			{
				value: '女'
			}
		],
		ageTypeList: [{
				value: '年'
			},
			{
				value: '天'
			}
		],
		form: {
			id: undefined,
			caseNumber: undefined,
			realName: undefined,
			gender: undefined,
			cardNumber: undefined,
			birthday: undefined,
			age: undefined,
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
		}
	})

	onMounted(() => {
		axios.get("http://localhost:8091/settleCategory/findSettleCategory")
			.then(res => {
				state.settleCategoryList = res.data
			})

		axios.get("http://localhost:8091/settleCategory/findDepartment")
			.then(res => {
				state.departmentList = res.data
			
			})

		axios.get("http://localhost:8091/settleCategory/findregistLevel")
			.then(res => {
				state.registLevelList = res.data
			})

		axios.get("http://localhost:8091/settleCategory/findEmployee")
			.then(res => {
				state.employeeList = res.data
			})
		axios.get("http://localhost:8091/settleCategory/findcaseNumber")
			.then(res => {
				state.form.caseNumber= res.data
			})
	})

	function register() {
		axios.post("http://localhost:8091/register/saveRegister", state.form)
			.then(res => {
				console.log(res);
			})
	}
</script>

<style scoped>
	.app-container {
		text-align: left;
	}

	.localtion {
		right: 3px;
		top: 3px;
	}

	.input-with-select .el-input-group__prepend {
		background-color: var(--el-fill-color-blank);
	}

	.a {
		text-align: center;
		background-color: #F5F7FA;
		color: darkgray;
		border: solid 1px #F5F7FA;
		width: 10px;
		height: 10px;
	}

	#xb {
		color: #9D93A6;
		background-color: #F5F7FA;
		height: 40px;
	}

	#a {
		margin-top: 20px;
	}

	.gh {
		margin-bottom: 10px;
	}

	#a2 {
		margin-top: 20px;
	}

	#a3 {
		margin-bottom: 20px;
	}
</style>