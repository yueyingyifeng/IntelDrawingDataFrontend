<script setup>
import { ref, defineProps, watch } from 'vue'

const count_add = ref(1)

watch(count_add, (newVal, oldVal) => {
    if(newVal > 10)
        count_add.value = 10
    if(newVal < 1)
        count_add.value = 1
})

const props = defineProps({
    row: {
        type: Array,
        required: true
    }
})


function addCol() {
    for(let i = 0; i < count_add.value; i++)
        props.row.push('0')
}

function deleteCol() {
    for(let i = 0; i < count_add.value; i++)
        props.row.pop()
    count_add.value = 1 
}



</script>

<template>
    <main class="display-row">
        <el-input v-for="(key, index) in row"  v-model="row[index]" type="text" placeholder="请输入数据" :clearable="true" />
        <el-input v-model="count_add"  style="width: 60px; max-width: 60px;min-width: 60px;margin:4px;"  type="number"/>
        <el-button class='btn2' style="width: auto; margin-left:4px; margin-top: 4px;" type="primary" @click="addCol">add col</el-button>
        <el-button class='btn3' style="width: auto; margin-left:7px;margin-top: 4px;" type="danger" @click="deleteCol">delete col</el-button>
    </main>
</template>

<style>
.display-row {
    display: flex;
}
.btn2{
background-color:#d4c488;
}
.btn3{
background-color: #443228 ;
}
.el-input {
margin: 5px; 
    width: 170px; 
    min-width: 170px; 
    max-width: 170px; 
    height: 30px;
}


</style>
