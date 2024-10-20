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

const showData = ref(true);
const chartList = ref([]);
const status = reactive({
	createPage	: "create",
	loadPage	:"load",
	previewPage	:"preview",
	editPage	:"edit",
	pushIfLastNotThis : (path)=>{
		if(status.pathQueue[status.pathQueue.length-1] != path){
			status.pathQueue = [...status.pathQueue, path]; 
		}
	},
	lastPeek : ()=>{
		return status.pathQueue[status.pathQueue.length-1]
	},
	cleanAndPush : (path)=>{
		status.pathQueue = []
		status.pathQueue = path
	},
	pathQueue 	: [],

	fileID   	: -1,
	fileName 	: "",
	fileType 	: "bar",
	data	 	: Array.from({ length: 3 }, () => Array(3).fill("0"))
});

provide('chartList',chartList)
provide('status',status)
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
	status.data = data;
	status.fileType = type;
	showData.value = true;
	// FIXME：如果没有延迟，将无法显示出新增项
	setTimeout(GetChartList,100)
	status.cleanAndPush([status.loadPage,status.previewPage])
}


function previewData(data, type) {
	status.data = data;
	status.fileType = type;
	status.pushIfLastNotThis(status.previewPage)
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

			status.fileID = fileID
			status.fileName = chartList.value.find( item=> item.fileID == fileID)?.name
			status.fileType = res.data.fileType
			status.data =  res.data.data
			
			status.cleanAndPush([status.loadPage, status.editPage, status.previewPage])
			showData.value = true
		}
		else console.log(err)
	}).catch(err=>{
		ElMessage.error(err.response.data)
		console.log(err)
	})
	
}

function toEdit(){
	status.pushIfLastNotThis(status.editPage)
	showData.value = false
}

function toCreateTable(){
	status.cleanAndPush([status.createPage,status.editPage])
	status.data = []
	status.fileName = "",
	status.fileType = "bar",
	showData.value = false
}

function back(){
	if(status.pathQueue[0] == status.createPage && status.lastPeek() == status.previewPage){
		showData.value = false
		status.pathQueue.pop()
	}
	else
		showData.value = true

	if(status.pathQueue[0] == status.loadPage && status.lastPeek() == status.editPage){
		status.pathQueue.push(status.previewPage)
		showData.value = true
	}
	else 
		showData.value = false
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
					 :data="status.data" 
					 :type="status.fileType" 
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