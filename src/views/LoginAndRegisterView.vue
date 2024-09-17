<script setup>
import { defineProps } from "vue";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";

import { ref } from 'vue'

let isLogin = ref(true)

const props = defineProps({
    show: {
        type: Boolean,
        default: true
    }
});

</script>

<template>
    <el-row class="box" v-show="show">
        <el-col :span="8"></el-col>

        <el-col :span="8">
            <el-card shadow="hover">
                <LoginComponent @toRegister="isLogin = false" :show="isLogin" />
                <RegisterComponent @toLogin="isLogin = true" :show="!isLogin" />
            </el-card>
        </el-col>

        <el-col :span="8"></el-col>

    </el-row>


</template>

<style>
.box {
    padding-top: 10%;
}
</style>
