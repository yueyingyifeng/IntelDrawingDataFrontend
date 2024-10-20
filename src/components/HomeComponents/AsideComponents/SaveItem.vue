<script setup>
import { API } from '@/Util/Store';
import axios from 'axios';
import { defineEmits, defineProps } from 'vue'
const props = defineProps({
    project_id:{
        required: true
    },
    project_name:{
        type: String,
        required: true
    },
    project_type:{
        type: String,
        required: true
    },
    project_date:{
        type: String,
        required: true
    }
})

const emits = defineEmits(['load','deleteChart'])

function toLoad(){
    emits('load', props.project_id)
}

function toDelete(){
    emits('deleteChart', props.project_id)
}


</script>
<template>
    <main class="test_aside_item">
         <div style="margin-left: 10%;">
        <el-row >
            <el-col :span="24" >{{project_name}} </el-col>
            <el-col :span="24" >{{project_date}} </el-col>
            <el-col :span="24" >类型:{{project_type}}</el-col>

            <el-col :span="24" style="display: flex; align-items: center;">
    <el-button class='btn' style="margin-right: 10px;" type="primary" @click="toLoad">Load</el-button>
    <el-button class='btn' type="danger" @click="toDelete">Delete</el-button>
</el-col>

       </el-row></div>
        <hr style="width: 100%; margin-bottom: 0;">
    </main>
</template>

<style>
.test_aside_item{
   
    border-top: 0;
    max-width:235px;
    justify-content:left ;
    padding-bottom:0;
    padding-top: 5%;
   
}
.el-row{
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    color: black;
   
}
.btn{
    margin-top:4%;
    border-radius: 5px; 
    max-height: 60%;
    max-width: 80%;
}



</style>