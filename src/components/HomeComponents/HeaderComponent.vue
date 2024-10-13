<script setup>
import router from '../../router/index'
import { defineEmits } from 'vue';
import { store } from '@/Util/Store';
import { useCookies } from 'vue3-cookies';

const emits = defineEmits(['toCreateTable'])


function toDataTable(){
    emits('toCreateTable')
}

function logout(){
    store.storeUserData(null);
    useCookies().cookies.remove(store.cookies.UserData)
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