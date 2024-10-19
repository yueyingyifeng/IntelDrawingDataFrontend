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
            
            <el-button class="hover-button" :span="6" @click = "showChart">智绘数据{{ backSign }}</el-button>
            <el-col class="el-col_content" :span="6"></el-col>
            
            <el-button class="hover-button" :span="6" @click="toDataTable" >
                    Create Data Chart
            </el-button>
            <el-col class="el-col_content" :span="3"></el-col>
            <el-button class="hover-button" :span="5" @click="toEditChart" v-show="toBeEdited.isAChartLoaded" >
                    Edit Chart {{ toBeEdited.fileName }} 
            </el-button>
        
            
            <el-col class="el-col_content" :span="6"></el-col>
            <el-button class="hover-button" :span="6" @click="logout">
                Logout
            </el-button>
        </el-row>
    </main>
</template>

<style>
.el-col_content{
    text-align: center; 
    height: 60px;
    padding: 1%;
}
.test_header_background{
    background-color:#333333;
}
.hover-area {
  position: relative;
}

.hover-button {  
    text-align: center; 
    height: 60px;
    padding: 1%;
  background-color: transparent; /* 默认背景色透明 */
  border: 2px solid transparent; /* 默认边框透明 */
  color: rgb(255, 255, 255); /* 默认文字颜色 */
  padding: 10px 20px; /* 按钮内边距 */
  transition: background-color 0.3s, border-color 0.3s; /* 动画过渡效果 */
 
}

.hover-area:hover .hover-button {
  background-color: #4CAF50; /* 悬浮时的背景色 */
  border-color: #4CAF50; /* 悬浮时的边框颜色 */
  color: white; /* 悬浮时文本颜色 */
  border-radius: 5px; /* 圆角 */
}
</style>