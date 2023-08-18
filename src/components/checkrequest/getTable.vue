<template>
	<el-table tooltip-effect="dark" style="width: 100%" :data="state.tableData">
		
		
		<el-table-column label="检查编码"  prop="techCode">
		</el-table-column>
		<el-table-column label="检查名称" prop="techName">
		</el-table-column>
		<el-table-column  label="检查规格"  prop="techFormat">
		</el-table-column>
		<el-table-column  label="单价" prop="techPrice">
		</el-table-column>
		<el-table-column  label="费用分类"  prop="priceType">
		</el-table-column>
	
	</el-table>
	
	<el-tag>已选择的检查项目:{{state.techName}}
	</el-tag>

</template>

<script setup>
	import {
		reactive, watch
	} from 'vue';
	import {
		onUpdated,
	} from 'vue'
	import axios from 'axios';
	let state = reactive({
		tableData:[],
		registerId:undefined,
		techName:undefined
		
	})
	const myprops = defineProps(['registerId'])
	onUpdated(()=>{
		state.registerId=myprops.registerId;
		
	}) 
	watch(()=>state.registerId,(newvalue,oldvalue)=>{
			
			if(!state.flag){
				 
				axios 
					.get("http://localhost:8091/mtc/getmt?registerId=" + state.registerId)
					.then(res => {
						state.tableData = res.data
						
						state.techName=state.tableData[0].techName
						
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