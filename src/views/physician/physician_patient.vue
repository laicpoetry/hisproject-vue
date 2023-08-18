
<template>
	<div class="app-container">
		<hL></hL>
	</div>
	<iQ title="患者叫号" @register="get"></iQ>
	<el-table :data="state.tableData">
		<el-table-column width="55">
		</el-table-column>
		<el-table-column prop="id" label="编号" width="120">
		</el-table-column>
		<el-table-column prop="realName" label="患者姓名" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="caseNumber" label="患者病历号" show-overflow-tooltip>
		</el-table-column>
		<el-table-column label="操作" show-overflow-tooltip>
			<template #default="scope">

				<el-button size="small" @click="tocjbl(scope.row)">创建病例</el-button>
				<el-button size="small">跳过</el-button>
				<el-button size="small">叫号</el-button>

			</template>
		</el-table-column>
	</el-table>
</template>

<script setup name="his">
	import iQ from '@/components/registration/informationQuery'
	import hL from '@/components/registration/headerlook'
	import {
		reactive,
		onMounted
	} from 'vue';
	import axios from 'axios';
	import {
		useRouter
	} from 'vue-router';
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
		tableData: []
	})

	const get = (register) => {
		state.register = register;
		axios
			.post("http://localhost:8091/register/queryAll", regist)
			.then(res => {
				state.tableData = res.data;
				console.log(state.tableData);
			})

	}
	onMounted(() => {
		axios
			.post("http://localhost:8091/register/queryAll", state.regist)
			.then(res => {

				state.tableData = res.data;

				console.log("执行mounted");
			})

	})

	const router = useRouter();

	function tocjbl(register) {
		state.regist = register;
		//跳转传递参数
		axios
		.get("http://localhost:8091/register/changeState?caseNumber="+state.regist.caseNumber)
	 router.push({path:'home_medical_record'})//, query:{a:JSON.stringify(state.regist)}

	
	}
</script>

<style scoped>
	.topIcon {
		top: 3px;
		font-size: 23px;

	}

	.topText {
		font-size: 23px;
	}
</style>