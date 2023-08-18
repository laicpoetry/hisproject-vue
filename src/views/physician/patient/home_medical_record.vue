<template>

	<div class="app-container">
		<hm @registerMsg = "get"></hm>
		<el-divider></el-divider>
		<el-icon class="topIcon">
			<Document />
		</el-icon>
		<span class="topText">病历首页</span>
		<el-divider></el-divider>
	</div>
	<div class="showText">
		<span id="secText">病历首页</span>
	</div>

	<el-form class="frame" ref="formRef">
		<el-form-item label="主诉" label-width="120px">
			<el-input size="default" placeholder="请输入主诉" v-model="state.medicalRecord.readme" />
		</el-form-item>
		<el-form-item label="现病史" label-width="120px">
			<el-input size="default" placeholder="请输入现病史" v-model="state.medicalRecord.present" />
		</el-form-item>
		<el-form-item label="现病治疗情况" label-width="120px">
			<el-input size="default" placeholder="请输入现病治疗情况" v-model="state.medicalRecord.presentTreat" />
		</el-form-item>
		<el-form-item label="既往史" label-width="120px">
			<el-input size="default" placeholder="请输入既往史" v-model="state.medicalRecord.history" />
		</el-form-item>
		<el-form-item label="过敏史" label-width="120px">
			<el-input size="default" placeholder="请输入过敏史" v-model="state.medicalRecord.allergy" />
		</el-form-item>
		<el-form-item label="体格检查" label-width="120px">
			<el-input size="default" placeholder="请输入体格检查" v-model="state.medicalRecord.physique" />
		</el-form-item>
		<el-table :data="state.disease2">

			<el-table-column type="selection" width="55" />
			<el-table-column prop="diseaseCode" label="疾病编码"></el-table-column>
			<el-table-column prop="diseaseName" label="疾病名称"></el-table-column>
			<el-table-column prop="diseaseICD" label="国际ICD编码"></el-table-column>
			<el-table-column prop="diseaseCategory" label="疾病类型"></el-table-column>

			<el-table-column label="删除" align="right">
				<template #header>
					<el-text type="primary">删除</el-text>
				</template>
			</el-table-column>

			<el-table-column label="添加" align="left">
				<template #header>
					<el-text type="primary" @click="getjb">添加</el-text>
				</template>
			</el-table-column>


		</el-table>
		<el-form-item label="检查/检验建议" label-width="120px">
			<el-input size="default" placeholder="请输入检查/体验建议" v-model="state.medicalRecord.proposal"/>
		</el-form-item>
		<el-form-item label="注意事项" label-width="120px">
			<el-input size="default" placeholder="请输入注意事项" v-model="state.medicalRecord.careful"/>
		</el-form-item>
		<el-form-item>
			<div class="click">
				<el-button @click="addmedicalRecord">保存</el-button>
				<el-button>清空</el-button>
			</div>
		</el-form-item>
	</el-form>
	<el-dialog v-model='state.dialogTableVisible'>
		<el-table :data="state.nowdisease" @selection-change="select">
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="diseaseCode" label="疾病编码"></el-table-column>
			<el-table-column prop="diseaseName" label="疾病名称"></el-table-column>
			<el-table-column prop="diseaseICD" label="国际ICD编码"></el-table-column>
			<el-table-column prop="diseaseCategory" label="疾病类型"></el-table-column>
			
		
		</el-table>
		<el-pagination
		 layout="prev, pager, next,jumper"
		 
		  :total="state.total"
		  v-model:current-page=state.currentPage
		  @current-change="handelCurrentChange"
		  ></el-pagination>
				
		<el-button type="primary" @click="adddisease">添加</el-button>
	</el-dialog>

</template>

<script setup name="his">
	import hm from '@/components/registration/headermsg'
	import axios from 'axios';
	import {
		onUpdated,
		reactive
	} from 'vue';
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	import {
		ElMessage
	} from 'element-plus'

	let state = reactive({
		dialogTableVisible: false,
		//所有的疾病
		disease: [],
		//当前患者的疾病
		disease2: [],
		//分页显示的疾病
		nowdisease:[],
		// 患者信息
		regist: {
			id: undefined,
			registerId: undefined,
			caseNumber: undefined,
			realName: undefined,
			gender: undefined,
			cardNumber: undefined,
			age: undefined,
			birthday: undefined,
			ageType: undefined,
			homeAddress: undefined,
			visitDate: undefined,
			noon: undefined,
			deptmentId: undefined,
			employeeId: undefined,
			registLevelId: undefined,
			settleCategoryId: undefined,
			isBook: undefined,
			registMethod: undefined,
			visitState: undefined,
			registMoney: undefined


		},
		// 患者病历
		medicalRecord: {
			id: undefined,
			registerId: undefined,
			readme: undefined,
			present: undefined,
			presentTreat: undefined,
			history: undefined,
			allergy: undefined,
			physique: undefined,
			proposal: undefined,
			careful: undefined
		},
		//病例首页疾病关联
		medicalRecordDisease: {
			medicalRecordId: undefined,
			diseaseId: undefined
		},
		//接收所选择的疾病
		rows: [],
		//接收所选择的疾病id
		rows2: [],
		//总页数
		total:undefined,
		//当前页
		currentPage:1


	})
	//实现分页
	function handelCurrentChange(value){
		console.log(value);
		state.currentPage = value;
		if(value>0){
			var i = (value-1)*15;
			var arry=[];
			while(i<value*15){
				if(state.disease[i]!=null){
					arry.push(state.disease[i]);
					i++;
					continue;
				}
				break;
			}
			state.nowdisease = arry;
		}else{
			
		}
	}

	/* //接收跳转传递参数
	const route = useRoute()
	if (route.query.a != null) {
		state.regist = JSON.parse(route.query.a)
		state.regist.registerId = state.medicalRecord.medicalRecordId;
	} */

	function getjb() {
		state.dialogTableVisible = true;
		axios
			.post("http://localhost:8091/disease/getAll")
			.then(res => {
				state.disease = res.data;
				console.log(res.data.length);
				state.total =res.data.length/15;
				console.log(state.total);
				for(var i = 0;i<15;i++){
					state.nowdisease[i] = state.disease[i];
				}
				

			})
			.catch(err => {
				console.log(err);

			})

	}

	function select(rows) {

		state.rows = rows;

	}
	//添加疾病
	function adddisease() {
		for (var i = 0; i < state.rows.length; i++) {
			state.rows2[i] = state.rows[i].id;
		}
		axios
			.get("http://localhost:8091/mrd/add?id=" + state.rows2 + "&medicalRecordId=" + state.regist.caseNumber)
			.then(res => {

				if (res.data.code == 1) {
					state.dialogTableVisible = false;
					//消息提示
					ElMessage({
						message: res.data.message,
						type: 'success',
					})
				} else {
					ElMessage.error(
						res.data.message,
					)
				}

			})

	}
	//获得子组件的参数
const get = (value) => {
	state.regist = value;
}
	//添加患者病历信息
	function addmedicalRecord() {
		//通过已收到的患者id得到病例的患者id
		state.medicalRecord.registerId=state.regist.caseNumber;
		axios
		.post("http://localhost:8091/mr/addmr",state.medicalRecord)
		.then(res=>{
			if (res.data.code == 1) {
				state.dialogTableVisible = false;
				//消息提示
				ElMessage({
					message: res.data.message,
					type: 'success',
				})
			} else {
				ElMessage.error(
					res.data.message,
				)
			}
		})
	}
	//获取该患者的疾病
	onUpdated(() => {
		axios
			.get("http://localhost:8091/mrd/get?medicalRecordId=" + state.regist.caseNumber)
			.then(res => {
				state.disease2 = res.data
			})
	})
</script>

<style scoped>
	.app-container {
		text-align: left;
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
		text-align: left;
	}

	#secText {
		font-size: 20px;

		left: 20px;
		text-align: left;
	}

	.frame {
		.el-form-item {}
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

	.click {
		position: relative;
		text-align: center;
		left: 550px;
	}
</style>