<template>
	<div id="app-container">
	  <iQ title="窗口收费"  @register="get"></iQ>
	  <cf :register = 'state.regist'></cf>
		  
		 
<ct :registerId = 'state.regist.caseNumber'></ct>
	    
	  
	</div>
</template>

<script setup name="Charge">
import { reactive, toRefs } from 'vue';
import iQ from '@/components/registration/informationQuery'
	import cf from '@/components/registration/confirm'
	import ct from '@/components/checkrequest/checkTable'
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
			tableData:[]
			
		})
		const get=(register)=>{
			state.regist = register;
			
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