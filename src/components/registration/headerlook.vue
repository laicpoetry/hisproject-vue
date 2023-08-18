<template>
	<el-row >
		
		<el-tag type="success" style="width: 130px;margin-right: 100px;">今日已看诊0人</el-tag>
		
		
		<el-tag type="warning" style="width: 130px;">当前有{{state.number}}人在排队</el-tag>
		
	</el-row>
	
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { reactive } from 'vue';
	let state = reactive({
				
				number:0
				
			})
		onMounted(()=>{
			axios
			.post("http://localhost:8091/register/getNumber")
			.then(res=>{
				state.number=res.data;
				console.log(state.number);
			})
			.catch(err=>{
				console.log(err);
			})
		})
	
</script>

<style>
	
</style>