<template>
	
	<el-row>
		    <el-button type="primary" id="button" disabled >
			<el-icon ><PriceTag /></el-icon>项目金额:{{state.money}}元</el-button>
			<el-button type="primary" id="button" @click="js"  >
			<el-icon><PriceTag /></el-icon>收费结算</el-button>
		  </el-row>
	<el-table tooltip-effect="dark" style="width: 100%" :data="state.tableData">
		<el-table-column type="selection" width="55">
		</el-table-column>
		<el-table-column label="项目名称" width="400" prop="techName">
		</el-table-column>
		<el-table-column label="单价" width="120" prop="techPrice">
		</el-table-column>
		<el-table-column  label="类型" width="120" prop="techType">
		</el-table-column>
		<el-table-column  label="规格" width="120" prop="techFormat">
		</el-table-column>
		<el-table-column  label="数量" width="120">
		</el-table-column>
		<el-table-column  label="开立时间" width="120">
		</el-table-column>
		<el-table-column  label="状态" width="120">
		</el-table-column>
	</el-table> 

</template>

<script setup>
	import axios from 'axios';
	import {
		onMounted,
		onUpdated,
		reactive,
		watch
	} from 'vue';
	import {
		ElMessage
	} from 'element-plus'
	const myprops = defineProps(['registerId','buttonFlag']);

	let state = reactive({
		tableData: [],
		registerId: undefined,
		flag:false,
		money:undefined,
		tableData2:[],
		
	})
	
	function js(){
		state.tableData = state.tableData2;
		ElMessage({
			message: '结算完成',
			type: 'success',
		})
	}
	onUpdated(()=>{
		state.registerId = myprops.registerId;
		console.log(state.registerId);
	})
	
	watch(()=>state.registerId,(newvalue,oldvalue) => {
		if(!state.flag){
			
			axios 
				.get("http://localhost:8091/mtc/getmt?registerId=" + state.registerId)
				.then(res => {
					state.tableData = res.data
					console.log(res.data);
					console.log(state.tableData);
					state.money = state.tableData[0].techPrice
					state.flag=true;
					if(state.tableData==''){
						state.flag = false;
					}
				})
				.catch(err=>{
					console.log(err);
				})
		}
	})

	
</script>

<style>
</style>