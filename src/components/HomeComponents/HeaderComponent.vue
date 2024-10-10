<script setup>
import router from '../../router/index'
import { defineEmits } from 'vue';

const emits = defineEmits(['toCreateTable'])


function toDataTable(){
    emits('toCreateTable')
}

function logout(){
    //TODO: 登出逻辑，需要发送一个包含 token 请求，然后使后端 token 失效
    router.push('/')
}
</script>

<template>
    <main class="test_header_background">
        <el-row>
            <el-button class="hover-button" :span="6" >智绘数据</el-button>
            <el-col class="el-col_content" :span="6"></el-col>
            
            <el-col class="el-col_content" :span="3"></el-col>
            <el-button class="hover-button" :span="6" @click="toDataTable" >
                    Create Data Table
            </el-button>
           
            <el-col class="el-col_content" :span="6"></el-col>
            
            <el-col class="el-col_content" :span="3"></el-col>
            <el-button class="hover-button" :span="3" @click="logout">
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
    background-color:#a69f92;
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