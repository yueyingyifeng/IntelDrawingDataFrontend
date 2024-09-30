<script setup>
import { ref } from 'vue';
import HeaderComponent from '@/components/HomeComponents/HeaderComponent.vue'
import AsideComponent from '@/components/HomeComponents/AsideComponent.vue';
import HomeComponent from '@/components/HomeComponents/HomeComponent.vue';
import Home_CreateTableComponent from '@/components/HomeComponents/Home_CreateTableComponent.vue';


let currentData = ref([]);
let currentType = ref('');

const showData = ref(true);

function showChart(data,type) {
  currentData.value = data;
  currentType.value = type;
  showData.value = true;
}

</script>

<template>
  <div >
    <el-container>
      <el-header>
        <HeaderComponent @toCreateTable="showData = false"/>
      </el-header>

      <el-container>
        <el-aside width="15%">
          <AsideComponent @data="showChart"/>
        </el-aside>

        <el-main>
          <HomeComponent :data="currentData" :type="currentType" :show="showData"/>

          <Home_CreateTableComponent @saveFile="showChart" @previewData="showChart" :show="!showData"/>
        </el-main>
        
      </el-container>
    </el-container>
  </div>
</template>

<style>
html, body {
    margin: 0;
    padding: 0;
    
}

</style>