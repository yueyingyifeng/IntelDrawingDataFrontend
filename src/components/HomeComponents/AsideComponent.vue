<script setup>
import SaveItem from './AsideComponents/SaveItem.vue';
import { defineEmits } from 'vue';
const emit = defineEmits(['data']);

let fakedata = [
    {
        id: 1,
        name: '项目名称A',
        date: '2024/9/10 19:32',
        type: '图表类型'
    },
    {
        id: 2,
        name: '项目名称B',
        date: '2024/9/10 19:12',
        type: '图表类型'
    },
    {
        id: 3,
        name: '项目名称C',
        date: '2024/9/10 19:32',
        type: '图表类型'
    },
]


// TODO: 还需要一个方法来请求获取该用户当前保存了多少个项目，即 fakedata、
// fakedata 是用户保存的项目名和项目id， fakeData 是项目的具体数据表 (懒的想名字了)

function loadADataTable(project_id) {
    // TODO: 发出请求获取数据表，并将数据 emit 出去
    emit('data', fakeData[project_id - 1])
}


</script>

<template>
    <main class="test_aside_background" v-for="item in fakedata">
        <SaveItem :project_id="item.id" :project_name="item.name" :project_date="item.date" @load="loadADataTable" />
    </main>
</template>

<style>
.test_aside_background {
    background-color: rebeccapurple;
}
</style>