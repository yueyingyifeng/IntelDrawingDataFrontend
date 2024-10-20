<script setup>
import { ref, onMounted, provide, reactive } from 'vue';
import { API, store } from '@/Util/Store';
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus';
import HeaderComponent from '@/components/HomeComponents/HeaderComponent.vue'
import AsideComponent from '@/components/HomeComponents/AsideComponent.vue';
import HomeComponent from '@/components/HomeComponents/HomeComponent.vue';
import Home_CreateTableComponent from '@/components/HomeComponents/Home_CreateTableComponent.vue';
import axios from 'axios';

const currentFileID = ref();
const currentData = ref([]);
const currentType = ref('');
const showData = ref(true);
const chartList = ref([]);
const toBeEdited = reactive({
	fileID   : null,
	fileName : null,
	fileType : null,
	data	 : []
});

provide('chartList',chartList)
provide('toBeEdited',toBeEdited)

onMounted(() => {
	if(store.getUserData().token == null || store.getUserData().token.length < 48){
        ElMessageBox.alert('', 'Please Login first');
        useRouter().push("/");
    }
    else{
        GetChartList();
    }
});

function saveChart(data,type){
	currentData.value = data;
	currentType.value = type;
	showData.value = true;
	// FIXME：如果没有延迟，将无法显示出新增项
	setTimeout(GetChartList,100)
}


function previewData(data, type) {
	console.log("previewData")
	currentData.value = [...data];
	currentType.value = type;

	toBeEdited.data = currentData.value;
	toBeEdited.fileType = currentType.value;

	showData.value = true;
}

function GetChartList(){
    axios({
        method:"Get",
        url:API.GetChartList,
        headers: {
        'Authorization':
        `Bearer ${store.getUserData().token}`
        }
    }).then(res=>{
        if(res.status == 200){
            chartList.value = res.data.data;
        }
		else{
			ElMessageBox.alert("Get charts list failed with status code "+res.status)
		}
    }).catch(err=>{
		ElMessageBox.alert("Get charts list failed")
        console.log(err);
    })
}

function loadChart(fileID){
	axios.get(API.LoadChart,{
		params: {
			'fileID': fileID
		},
		headers: {
        	'Authorization':
        	`Bearer ${store.getUserData().token}`
        }
	}).then(res=>{
		if(res.status == 200){
			currentFileID.value = fileID
			currentData.value = res.data.data
			currentType.value = res.data.fileType
			showData.value = true

			toBeEdited.fileID = fileID
			toBeEdited.fileName = chartList.value.find( item=> item.fileID == currentFileID.value)?.name
			toBeEdited.fileType = currentType.value
			toBeEdited.data = currentData.value
		}
		else console.log(err)
	}).catch(err=>{
		ElMessage.error(err.response.data)
		console.log(err)
	})
	
}

function toEdit(){
	showData.value = false
}

function toCreateTable(){
	showData.value = false
}

function back(){
	if(toBeEdited.isPreviewMode && toBeEdited.isEditMode && toBeEdited.isCreateMode){
		showData.value = false
	}
}

</script>

<template>
	<div>
		<el-container>
			<el-header>
				<HeaderComponent
				@toCreateTable="toCreateTable" 
				@toEditChart = "toEdit"
				@back="back" />
			</el-header>

			<el-container>
				<el-aside width="15%">
					<AsideComponent @load="loadChart"  />
				</el-aside>

				<el-main>
					<HomeComponent
					 :data="currentData" 
					 :type="currentType" 
					 :show="showData" />

					<Home_CreateTableComponent 
					@saveFile="saveChart" 
					@previewData="previewData" 
					:show="!showData" />
				</el-main>

			</el-container>
		</el-container>
	</div>
</template>

<style>
html, body {
    margin: 0;
    padding: 0;
    
}

</style>