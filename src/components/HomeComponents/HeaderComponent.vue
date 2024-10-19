<script setup>
import router from '../../router/index'
import { defineEmits, inject, ref } from 'vue';
import { store } from '@/Util/Store';
import { useCookies } from 'vue3-cookies';

const emits = defineEmits(['toCreateTable', "showChart","toEditChart"])
const backSign = ref("");
const toBeEdited = inject('toBeEdited')

function toDataTable(){
    backSign.value = "(返回)"
    toBeEdited.isAChartLoaded = false;
	toBeEdited.isEditMode = false
    emits('toCreateTable')
}

function toEditChart(){
    emits('toEditChart')
}

function logout(){
    store.storeUserData(null);
    useCookies().cookies.remove(store.cookies.UserData)
    router.push('/')
}

function showChart(){
    backSign.value = ''
    toBeEdited.isAChartLoaded = false
    toBeEdited.isEditMode = false
    emits('showChart')
}
</script>

<template>
   <main class="test_header_background">
  <el-row>
    <el-button class="hover-button" @click="showChart">智绘数据{{ backSign }}</el-button>
    
    <el-button class="hover-button" @click="toDataTable">Create Data Chart</el-button>
    
    <el-button class="hover-button" @click="toEditChart" v-show="toBeEdited.isAChartLoaded">
      Edit Chart {{ toBeEdited.fileName }} 
    </el-button>
    
    <el-button class="hover-button" @click="logout">Logout</el-button>
  </el-row>
</main>
</template>

<style>

.test_header_background{
    position: fixed; 
    top: 0;
    left: 0;
    width: 100%; 
    background-color:#333333;
    padding: 10px 0;
    box-shadow: 0 4px 2px -2px gray; 
    z-index: 1000; 
    
}
.hover-area {
  position: relative;
}

.hover-button {  
    text-align: center; 
    height: 10%;
    padding: 1%;
  background-color: transparent; 
  border: 2px solid transparent; 
  color: rgb(255, 255, 255);
  padding: 10px 20px;
  transition: background-color 0.3s, border-color 0.3s; 
 
}

.hover-area:hover .hover-button {
  background-color: #4CAF50; 
  border-color: #4CAF50; 
  color: white; 
  border-radius: 5px; 
  flex: 1; /* 每个按钮按比例平分空间 */
    margin: 0 10px;
    text-align: center;
    box-sizing: border-box
}
.test_header_background .el-row {
    display: flex;
    justify-content: space-between; 
    align-items: center;
    margin: 0; 
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;
  }
</style>