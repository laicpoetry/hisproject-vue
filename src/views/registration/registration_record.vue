
<template>
	<div class="app-container">
		

		<iQ title="窗口退号"  @register="get"></iQ>
		
	
	<el-table :data="state.tableData">
		<el-table-column  width="55">
		</el-table-column>
		<el-table-column prop="id" label="编号" width="120">
		</el-table-column>
		<el-table-column prop="caseNumber" label="患者病历号" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="gender" label="性别" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="cardNumber" label="身份证号" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="registMethod" label="付款方式" show-overflow-tooltip>
		</el-table-column>
		<el-table-column label="操作" show-overflow-tooltip>
 			 <template #default="scope">
 			        <el-button size="small" 
 			          >退号</el-button
 			        >
					</template>
			  
		</el-table-column>
		
	</el-table>

	</div>
	
</template>

<script setup name="his">
import { onMounted, onUpdated, reactive } from 'vue';
import iQ from '@/components/registration/informationQuery'
import axios from 'axios';
	
	let state =reactive({
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
	
	const get=(register)=>{
		state.register = register;
		console.log(register);
		
		axios
		.post("http://localhost:8091/register/queryAll",register)
		.then(res=>{
			state.tableData = res.data;
			console.log(state.tableData);
		})
		.catch(err=>{
			console.log(err);
		})
	
	}


	

	onMounted(()=>{
		axios
		.post("http://localhost:8091/register/queryAll",state.regist)
		.then(res=>{
			
			state.tableData = res.data;
			
			console.log("执行mounted");
		})
		.catch(err=>{
			console.log(err);
		})
		
	})
	


</script>

<style scoped>
	.app-container{
		text-align: left;
	}
	.topIcon {
		top: 3px;
		font-size: 23px;
		
	}
	.topText{
		font-size: 23px;
	}
</style>
