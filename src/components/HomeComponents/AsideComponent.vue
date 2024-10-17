<script setup>
import axios from 'axios';
import SaveItem from './AsideComponents/SaveItem.vue';
import { defineEmits, ref, inject, watch } from 'vue';
import { API, store } from '@/Util/Store';
import { ElMessage, ElMessageBox } from 'element-plus';
const emit = defineEmits(['load']);

const deleteDialogVisible = ref(false)
const chart_list = inject('chartList')
const deleteDialog = ref(false)
const readyToDeleteFileID = ref()

function loadADataTable(project_id) {
    emit('load', project_id)
}

function deleteChartConfirm(){
    axios.delete(API.DeleteChart,{
        params:{
            "fileID":readyToDeleteFileID.value
        },
        headers: {
        'Authorization':
        `Bearer ${store.getUserData().token}`
        }
    }).then(res=>{
        if(res.status == 204){
            ElMessage.success("Delete success")
            chart_list.value = chart_list.value.filter(item => item.fileID != readyToDeleteFileID.value)
        }
        else {
            ElMessage.error("Delete failed")
            console.error(res)
        }
    }).catch(err=>{
        console.log(err)
    })
    deleteDialog.value = false
}

function deleteChart(project_id){
    readyToDeleteFileID.value = project_id
    deleteDialog.value = true
}



</script>

<template>
<div class="list1">
    <div>
        <p>用户名：{{ store.getUserData().userInfo.name }}</p>
        <p>ID    : {{ store.getUserData().userInfo.id }}</p>
        <p>注册时间： {{ new Date(store.getUserData().userInfo.createTime * 1).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }) }}</p>
    </div>
    <!--  TODO css: 这里的内容过于紧凑改完后删除这个 TODO 项-->
    <main class="test_aside_background" v-for="item in chart_list">
        <SaveItem
         :project_id="item.fileID"
         :project_name="item.name"
         :project_type="item.type"
         :project_date="new Date(item.createTime * 1).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })" 
         @load="loadADataTable"
         @deleteChart="deleteChart" />
    </main>
</div>
    <!-- 删除确认框 -->
    <el-dialog
        v-model="deleteDialog"
        title="Delete Chart"
        width="500"
    >
        <span>Permanent delete
             {{ chart_list.find( item=> item.fileID == readyToDeleteFileID)?.name}},
             this file cannot recovery
        </span>
        <template #footer>
            <div>
                <el-button @click="deleteDialog = false">Cancel</el-button>
                <el-button type="danger" @click="deleteChartConfirm">
                Delete
                </el-button>
            </div>
        </template>
    </el-dialog><!-- el-dialog -->
</template>

<style>
.test_aside_background {
    background-color: #4d4d4d;
    
}
.list1{
margin-top: 15px;
margin-left: 20px;
}
</style>