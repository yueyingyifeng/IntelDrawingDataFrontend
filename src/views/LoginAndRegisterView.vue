<script setup>
import { ref,defineProps, onMounted } from "vue";
import { useCookies } from "vue3-cookies";
import { useRouter } from "vue-router";
import { store } from "@/Util/Store";
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
onMounted(()=>{
    if(cookies.isKey(store.cookies.UserData)){
        store.storeUserData(cookies.get(store.cookies.UserData))
        useRouter().push('/home');
    }
})

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
