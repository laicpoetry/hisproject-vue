<template>
  <!-- 项目主界面 -->
  <el-container>
    <!-- 主界面的标题栏 -->
    <el-header style="background-color: #20A0FF;">
      <div style="display:flex;justify-content:space-between">
        <div style="display:flex">
          <div class="home-title-text" style="width:220px">东软云医院HIS系统</div>
          <div class="home-title-icon"><el-icon><Fold /></el-icon></div>
        </div>
        <div style="display:flex">                    
          <div class="home-title-img">
            <el-image src="logo.png" fit="contain "></el-image>    
          </div>
          <div class="home-title-menu" style="width:150px">
            <el-dropdown @command="dropdownClick">
              <span class="el-dropdown-link">
                {{titleUserName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> 
          </div>
        </div>
      </div>
    </el-header>
    <el-container style="height:1000px">
      <el-aside style="background-color: #D3DCE6;" width="240px">
		<el-menu
		         default-active="2"
		         class="el-menu-vertical-demo"
		         @open="handleOpen"
				 background-color="#ECECEC"
				 
		         @close="handleClose"
		       >
		<el-sub-menu index="1" >
			
		         <template #title>
		           <el-icon><Document /></el-icon>
				   
		           <span>挂号收费</span>
		         </template>
		         
		           <el-menu-item index="1-1" @click="toRegistration">窗口挂号</el-menu-item>
		           <el-menu-item index="1-2" @click="toRecord">窗口退号</el-menu-item>
		         
		           <el-menu-item index="1-3" @click="tocharge">收费</el-menu-item>
		           <el-menu-item index="1-4" @click="torefund">退费</el-menu-item>
				   <el-menu-item index="1-5" @click="tomanage">费用记录查询</el-menu-item>
		    
		       </el-sub-menu>
		       <el-sub-menu index="2" >
		                <template #title>
		                  <el-icon><User /></el-icon>
		                  <span>门诊医生</span>
		                </template>
		                
		                  <el-menu-item index="2-1" @click="tock">患者查看</el-menu-item>
		                  <el-menu-item index="2-2" @click="toblsy">医生诊疗：病历首页</el-menu-item>
		                
		                  <el-menu-item index="2-3" @click="tojcsq">医生诊疗：检查申请</el-menu-item>
		                  <el-menu-item index="2-4" @click="tokzjl">看诊记录</el-menu-item>
		       		   <el-menu-item index="2-5" @click="tojcjg">查看检查结果</el-menu-item>
					   <el-menu-item index="2-6" @click="tomzqz">门诊确诊</el-menu-item>
		           
		              </el-sub-menu>
		       <el-sub-menu index="3" >
		                <template #title>
		                <el-icon><Camera /></el-icon>
		                  <span>检查管理</span>
		                </template>
		                
		                  <el-menu-item index="3-1" @click="tosq">检查申请</el-menu-item>
		                  <el-menu-item index="3-2" @click="tohlr">患者录入</el-menu-item>
		                
		                  <el-menu-item index="3-3" @click="tojglr">检查结果录入</el-menu-item>
		                  <el-menu-item index="3-4" @click="tojcgl">检查管理</el-menu-item>
		           
		              </el-sub-menu>
		       <el-sub-menu index="4" >
		                <template #title>
		               <el-icon><Headset /></el-icon>
		                  <span>检验管理</span>
		                </template>
		                
		                  <el-menu-item index="4-1" >窗口挂号</el-menu-item>
		                  <el-menu-item index="4-2">窗口退号</el-menu-item>
		                
		                  <el-menu-item index="4-3">收费</el-menu-item>
		                  <el-menu-item index="4-4">退费</el-menu-item>
		       		   <el-menu-item index="4-5">费用记录查询</el-menu-item>
		           
		              </el-sub-menu>
					  <el-sub-menu index="5" >
					           <template #title>
					           <el-icon><Wallet /></el-icon>
					             <span>药房管理</span>
					           </template>
					           
					             <el-menu-item index="5-1" @click="tofy" >药房发药</el-menu-item>
					             <el-menu-item index="5-2">窗口退号</el-menu-item>
					           
					             <el-menu-item index="5-3">收费</el-menu-item>
					             <el-menu-item index="5-4">退费</el-menu-item>
					  		   <el-menu-item index="5-5">费用记录查询</el-menu-item>
					      
					         </el-sub-menu>
							 <el-sub-menu index="6" >
							          <template #title>
							            <el-icon><FirstAidKit /></el-icon>
							            <span>处置管理</span>
							          </template>
							          
							            <el-menu-item index="6-1" >窗口挂号</el-menu-item>
							            <el-menu-item index="6-2">窗口退号</el-menu-item>
							          
							            <el-menu-item index="6-3">收费</el-menu-item>
							            <el-menu-item index="6-4">退费</el-menu-item>
							 		   <el-menu-item index="6-5">费用记录查询</el-menu-item>
							     
							        </el-sub-menu>
		     </el-menu>
		 
		    
		 

      </el-aside>
	  
      <el-main style="background-color: #E9EEF3;">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>

import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
 function torefund(){
	router.push("/expense-refund")
 }
 function tomanage(){
	 router.push("/expense-manage")
 }
 function toRegistration(){
	 router.push("/onsite-registration")
 }
 function toRecord(){
	 router.push("/registration-record")
 }
 function tocharge(){
	 router.push("/expense-charge")
 }
 function tock(){
 	 router.push("/physician-patient")
 }
 function toblsy(){
	 router.push("/home_medical_record")
 }
 function tojcsq(){
	 router.push("/check_request")
 }
 function tosq(){
	 router.push('/check-apply')
 }
 function tohlr(){
 	 router.push('/check-patient')
 }
 function tojglr(){
 	 router.push('/check-input')
 }
 function tojcgl(){
 	 router.push('/check-manage')
 }
 function tokzjl(){
	 router.push('/physician-history')
 }
 function tojcjg(){
 	 router.push('/check_results')
 }
 function tomzqz(){
 	 router.push('/outpatient_diagnosis')
 }
 function tofy(){
	 router.push('/give-medicine')
	  }
 
 
</script>

<style scoped>
  .home-title-text {
    color: #FFFFFF;
    font-size: 22px;
    margin-top: 15px;
    text-align: left;
  }
  .home-title-icon {
    margin-top: 15px;
    width: 40px;
    font-size: 22px;
  }
  .home-title-img{
    margin-top: 10px;
  }
  .home-title-menu{
    margin-top: 15px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #FFFFFF;
    font-size: 20px;
  }
  .el-icon-arrow-down {
    font-size: 20px;
  }
 .el-sub-menu .el-menu-item {
	  background-color: #FFFFFF
  }

</style>