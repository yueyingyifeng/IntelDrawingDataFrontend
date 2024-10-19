<script setup>
import { ref,defineProps, onMounted } from "vue";
import { useCookies } from "vue3-cookies";


import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";

const isLogin = ref(true)
const cookies = useCookies().cookies;
const props = defineProps({
    show: {
        type: Boolean,
        default: true
    }
});

</script>
<template>
    <main class="test_header_background">
        <el-row>
            <el-col class="el-col_content" :span="1" style="color: white;margin-left: 10%;">ITchart.</el-col>
     
        </el-row>
    </main>

    <div class="container">
    <el-row class="box" v-show="show">
        <el-col :span="8"></el-col>

        <el-col :span="8">
            <el-card shadow="hover" class="center-card">
                <LoginComponent @toRegister="isLogin = false" :show="isLogin" />
                <RegisterComponent @toLogin="isLogin = true" :show="!isLogin" />
            </el-card>
        </el-col>

        <el-col :span="8"></el-col>

    </el-row>
</div>

</template>

<style>
/*关于颜色的全局css变量*/
:root {
    --acc: #CCCCCC; 
    --bgc: #DCDCDC; 
}

html, body {
    font-family: 'Montserrat', sans-serif;
    color: var(--acc);
    line-height: 1.6;
    background-color: var(--bgc);
    margin: 0;
    padding: 0;
    height: 100%;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;  
    height: 87vh;  
}

.box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.el-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%; 
    max-width: 100%;
    height: 100%; 
}

.center-card {
    width: 100%; 
}


</style>
