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
        <el-input v-for="(key, index) in row" style="width: auto; margin:10px;" v-model="row[index]" type="text" placeholder="请输入数据" :clearable="true" />
        <el-input v-model="count_add"  style="width: 60px; margin:10px;"  type="number"/>
        <el-button style="width: auto; margin:10px;" type="primary" @click="addCol">add col</el-button>
        <el-button style="width: auto; margin:10px;" type="danger" @click="deleteCol">delete col</el-button>
    </main>
</template>

<style>
.display-row {
    display: flex;
}
</style>