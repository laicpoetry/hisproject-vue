<template>

	<div class="app-container">
		
		<el-row >
			<el-tag type="success" style="width: 130px;margin-right: 100px;">今日已检查0人</el-tag>
			<el-tag type="warning" style="width: 130px;">当前有1人在排队</el-tag>
		</el-row>
		
		<iQ title = '检查申请' @register="get"></iQ>
		<el-table :data="state.tableData">
			<el-table-column  width="55">
			</el-table-column>
			<el-table-column prop="id" label="编号" width="120">
			</el-table-column>
			<el-table-column prop="realName" label="患者姓名" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="caseNumber" label="患者病历号" show-overflow-tooltip>
			</el-table-column>
			<el-table-column label="操作" show-overflow-tooltip>
				 <template #default="scope">
				        <el-button size="small" 
				          >进行检查</el-button
				        >
						<el-button size="small"
						  >跳过</el-button
						>
						<el-button size="small"
						  >叫号</el-button
						>
						</template>
			</el-table-column>
			
		</el-table>
	</div>

	

</template>

<script setup name="his">
	import iQ from '@/components/registration/informationQuery'
	import { reactive, toRefs } from 'vue';
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
				tableData:[
					{
						id:undefined,
						realName:undefined,
						caseNumber:undefined,
						
					}
					
				]
				
			})
	
	const get=(register)=>{
		state.regist = register;
		state.tableData[0].id = state.regist.id;
		state.tableData[0].realName = state.regist.realName;
		state.tableData[0].caseNumber = state.regist.caseNumber;
		console.log(register);
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
	.click{
		position: relative;
		text-align: center;
		left: 550px;
	}
</style>