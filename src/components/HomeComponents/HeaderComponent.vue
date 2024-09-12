<script setup>
import router from '../../router/index'
function toDataTable(){
    //TODO: 创建数据表逻辑，这里还需要一个页面来创建数据表
}

function logout(){
    //TODO: 登出逻辑，需要发送一个包含 token 请求，然后使后端 token 失效
    router.push('/')
}
</script>

<template>
    <main class="test_header_background">
        <el-row>
            <el-col class="el-col_content" :span="6">智绘数据</el-col>
            <el-col class="el-col_content" :span="6" @click="toDataTable">
                    Create Data Table
            </el-col>
            <el-col class="el-col_content" :span="6"></el-col>
            
            <el-col class="el-col_content" :span="3"></el-col>
            <el-col class="el-col_content" :span="3" @click="logout">
                Logout
            </el-col>
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
    background-color: aqua;
}
</style>