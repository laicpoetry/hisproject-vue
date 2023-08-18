<template>
	<div class="refund">
		<iQ title="窗口退费" @register="get"></iQ>
		<cf :register = 'state.regist'></cf>
			<el-container >
			
			<el-main>
				
				<span style="display: flex;">
				<el-button type="primary"><el-icon><PriceTag /></el-icon>项目金额</el-button>
				<el-button type="primary"><el-icon><PriceTag /></el-icon>退费结算</el-button>
				</span>
			</el-main>
		</el-container>
	</div>
</template>

<script setup>
	import iQ from '@/components/registration/informationQuery'
	import cf from '@/components/registration/confirm'
		import { reactive } from 'vue';
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
	const get=(register)=>{
		state.regist = register;
		console.log(register);
	}

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