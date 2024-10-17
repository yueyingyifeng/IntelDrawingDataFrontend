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
        <el-row>
            <el-col :span="6">{{project_name}}</el-col>
            <el-col :span="6">{{project_date}}</el-col>
            <el-col :span="6">类型：{{project_type}}</el-col>

            <el-col :span="6">
                <el-button class='btn' type="primary" @click="toLoad">Load</el-button>
                <el-button class='btn' type="danger" @click="toDelete">Delete</el-button>

            </el-col>

        </el-row>
        <hr/>
    </main>
</template>

<style>
.test_aside_item{
    padding-bottom: 5%;
    padding-top: 5%;
}
.el-row{
    color: white;
}
.btn{
    margin-top: 10px;
    margin-left: 10px;
    background-color: #d6cfcf;
    border-radius: 5px; 
}
</style>