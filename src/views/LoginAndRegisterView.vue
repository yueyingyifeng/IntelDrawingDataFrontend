<script setup>
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";

import {ref} from 'vue'

let isLogin = ref(true)

</script>

<template>
    <el-row class="box">
        <el-col :span="8"></el-col>

        <el-col :span="8">
            <el-card  shadow="hover">
                <LoginComponent @toRegister="isLogin = false"
                v-if="isLogin"/>
                <RegisterComponent @toLogin="isLogin = true"
                v-else/>
            </el-card>  
        </el-col>

        <el-col :span="8"></el-col>

    </el-row>
    
    
</template>
  
<style>
.box{
    padding-top: 10%;
}
</style>
