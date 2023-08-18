<template>
	<div id="app-container">
	     <iQ title="费用记录查询"  @register="get"></iQ>
		<cf :register = 'state.regist'></cf>
		  
		  <el-row>
		    <el-button type="primary" id="button">
			<el-icon><PriceTag /></el-icon>项目金额:{{state.regist.registMoney}}元</el-button>
		  </el-row>
	  <el-table
	     tooltip-effect="dark"
	      style="width: 100%">
	      <el-table-column
	        type="selection"
	        width="55">
	      </el-table-column>
	      <el-table-column
	        label="项目名称"
	        width="400">
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="单价"
	        width="120">
	      </el-table-column>
	      <el-table-column
	        prop="address"
	        label="类型"
	        width="120">
	      </el-table-column>
		  <el-table-column
		    prop="name"
		    label="规格"
		    width="120">
		  </el-table-column>
		  <el-table-column
		    prop="name"
		    label="数量"
		    width="120">
		  </el-table-column>
		  <el-table-column
		    prop="name"
		    label="开立时间"
		    width="120">
		  </el-table-column>
		  <el-table-column
		    prop="name"
		    label="状态"
		    width="120">
		  </el-table-column>
	    </el-table>
	    
	  
	</div>
</template>

<script setup name="Charge">
import { reactive, toRefs } from 'vue';
import iQ from '@/components/registration/informationQuery'
	import cf from '@/components/registration/confirm'
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
	#app-container{
		text-align: left;
	}
	.bq{
		
		margin-top: 20px;
		margin-left: 20px;
		font-weight: bold;
	}
	.context{
		margin-top: 20px;
		margin-left: 20px;
	}
	#button{
		width: 180px;
		margin-top: 20px;
		margin-left: 20px;
	}
	#table{
		margin-top:10px;
		margin-left: 20px;
	}
	.zx{
		margin-left: 20px;
	}
	#ss{
		margin-left:5px ;
	}
	.tu{
		bottom: 5px;
	}
	#fy{
		top:3px;
		
	}
</style>