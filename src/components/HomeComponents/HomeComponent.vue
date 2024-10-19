<script setup>
import Chart from 'chart.js/auto'
import { onMounted, defineProps, watch } from 'vue';

let chart;

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        default: 'bar'
    },
    show: {
        type: Boolean,
        default: true
    }
})


watch(
    () => props.data,
    (newVal, oldVal) => {
        initChart()
    }
)

watch(() => props.type,
    (newVal, oldVal) => {
        initChart()
    }
)

onMounted(() => {
    initChart();
})


function formatData(data) {
    return {
        labels: data[0].slice(1),
        datasets: data.slice(1).map(row => ({
            label: row[0],
            data: row.slice(1)
        }))
    }
}

function initChart() {
    if (chart) {
        chart.destroy();
    }

    if (props.data.length < 1 || props.type === '')
        return;

    chart = new Chart(
        document.getElementById('ctx'),
        {
            type: props.type,
            data: formatData(props.data)
        }
    );
}




</script>

<template>
    <div class="limit1">
    <div class="limit2">
    <main v-show="show" >
       
        <canvas style="width: auto;" class="ctx" id="ctx"></canvas>
    </main>
    </div>
    </div>
</template>

<style>
.ctx{
    width: auto;
    height: 1px;
}
.limit1 {
    display: flex;
    justify-content: center; 
    align-items: center; 
}

.limit2 {
    width: 100%;
    max-width: 700px; 
    height: auto; 
}

</style>


<!-- {
    "type": 'bar',// line、pie、doughnut、polarArea 的结构也是这样， radar、scatter 不能这样
    "data": {
        labels: ['a', 'b'],     // 第一行 表头 
        datasets: [
            {
                label: 'c',     // 第二行 第一列
                data: [10, 20]  // 第二行余下
            },
            {
                label: 'd',     // 第三行 第一列
                data: [12, 13]  // 第三行余下
            }
        ]
    }
} -->