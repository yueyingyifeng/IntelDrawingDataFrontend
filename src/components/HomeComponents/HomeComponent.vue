<script setup>
import Chart from 'chart.js/auto'
import { onMounted, defineProps, watch,ref } from 'vue';

let chart;

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})


watch(
    () => props.data,
    (newVal, oldVal) => {
        initChart()
    }
)


onMounted(() => {
    initChart();
})

function initChart() {
    if (chart   ) {
        chart.destroy();
    }


    chart = new Chart(
        document.getElementById('acquisitions'),
        {
            type: 'bar',
            data: {
                labels: props.data.map(row => row.year),
                datasets: [
                    {
                        label: 'Acquisitions by year',
                        data: props.data.map(row => row.count)
                    }
                ]
            }
        }
    );
}

function addData(newData) {
    // chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(newData);
    });
    chart.update();
}

function removeData() {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}


</script>

<template>
    <main class="test_home_background">
        <canvas style="width: 700px;" id="acquisitions"></canvas>
    </main>
</template>

<style></style>