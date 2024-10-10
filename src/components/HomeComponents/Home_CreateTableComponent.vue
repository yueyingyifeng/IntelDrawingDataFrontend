<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';
import { ElMessage } from 'element-plus'
import axios from 'axios';
import ArowConponent from '../CreateTableComponents/ArowConponent.vue';
import {store} from '@/Util/Store.js'

const tableData = ref([[]]);
const count_add = ref(1)
const saveDialog = ref(false)
const file_name = ref('')
const blank_character = ref(0)
const ChartTypes = [
  { value: 'bar', label: 'Bar Chart' },
  { value: 'line', label: 'Line Chart' },
  { value: 'pie', label: 'Pie Chart' },
  { value: 'doughnut', label: 'Doughnut Chart' },
  { value: 'polarArea', label: 'polarArea Chart' },
]
const selectedType = ref(ChartTypes[0].value)


const emit = defineEmits(['saveFile', 'previewData']);


const props = defineProps({
  show:{
        type: Boolean,
        default: true
  }
})

watch(blank_character, (newVal, oldVal) => {
  if(newVal == '')
    blank_character.value = '0'
})

watch(count_add, (newVal, oldVal) => {
  if (newVal > 10)
    count_add.value = 10
  if (newVal < 1)
    count_add.value = 1
})
// FIXME: 一个没保存的提示逻辑
// watch(saveDialog, (newVal, oldVal) => {
//   if(oldVal)
//     ElMessage.warning("File did not save")
// })



function addRow() {
  for (let i = 0; i < count_add.value; i++)
    tableData.value.push(Array(tableData.value[tableData.value.length - 1].length).fill('0'));
}

function deleteRow() {
  if (tableData.value.length > 1 && tableData.value.length - count_add.value > 0) {
    for (let i = 0; i < count_add.value; i++)
      tableData.value.pop();
  }
  count_add.value = 1
}

function showSaveFileDialog() {
  if(tableData.value.length > 1 && tableData.value[0].length <= 0){
    ElMessage.warning("Please add at least one head col")
    return
  }

  if(tableData.value[0].length <= 0){{
    ElMessage.warning("Please add at least one col")
    return
  }}
    

  saveDialog.value = true;
}

function previewData() {
  emit('previewData', tableData.value, selectedType.value);
}

function saveFile() {
  

  if(!isValidWindowsFilename(file_name.value)){
    ElMessage.error("Invalid file name, did you add a space in the end?")
    return
  }
  

  tableData.value = fillArray(tableData.value, blank_character.value)

  axios({
    method: 'post',
    url: 'https://localhost:7161/api/CreateTable',
    headers: {
        'Authorization': `Bearer ${store.getUserData().token}`
    },
    data: {
        'fileName': file_name.value + "_" + selectedType.value,
        'data': tableData.value
    }
  }).then(res => {
    if(res.status === 201)
      ElMessage.success("File saved successfully")
    console.log(res)
  }).catch(err => {
    console.log(err)
  })

  emit('saveFile', tableData.value, selectedType.value);
  saveDialog.value = false;
}
// TODO: 记得给注册用户名也加上这样的判断，呃。。。移到另一个文件吧
function isValidWindowsFilename(filename) {
    // 1. 检查是否包含非法字符
    const invalidChars = /[<>:"\/\\|?*]/;
    if (invalidChars.test(filename)) {
        return false;
    }

    // 2. 检查是否以空格或句点结尾
    if (filename.endsWith(' ') || filename.endsWith('.')) {
        return false;
    }

    // 3. 检查长度是否超过 255 个字符
    if (filename.length > 255) {
        return false;
    }

    // 4. 检查是否是保留的文件名
    const reservedNames = [
        'CON', 'PRN', 'AUX', 'NUL',
        'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
        'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'
    ];
    const nameWithoutExtension = filename.split('.')[0].toUpperCase();
    if (reservedNames.includes(nameWithoutExtension)) {
        return false;
    }

    if(filename === '')
        return false;

    // 符合命名规范
    return true;
}

function fillArray(arr, fillValue) {
    fillValue = String(fillValue);
    // 找到二维数组中最长的数组长度
    const maxLength = Math.max(...arr.map(subArray => subArray.length));

    // 遍历每个子数组并用 fillValue 填充使其长度达到 maxLength
    return arr.map(subArray => {
        // 如果子数组长度小于 maxLength，则用 fillValue 填充
        return [...subArray, ...Array(maxLength - subArray.length).fill(fillValue)];
    });
}
</script>

<template>
  <main v-show="show">
    <p>
      {{ tableData.length }} X {{ tableData[0].length }}
    </p>
    <p>
      空白单元用
      <el-input v-model="blank_character" style="width: 60px;" type="text" />
      代替
    </p>

    <hr/>

    <ArowConponent v-for="(item, index) in tableData" :row="tableData[index]" />

    <el-row>
      <el-col :span="1">
        <el-input v-model="count_add" style="width: 60px;" type="number" />

      </el-col>
      <el-col :span="2">
        <el-button class='btn2' type="primary" @click="addRow">Add Row</el-button>

      </el-col>
      <el-col :span="2">
        <el-button class='btn3' type="danger" @click="deleteRow">Delete Row</el-button>
      </el-col>

      <el-col :span="10"></el-col>
      <el-col :span="4"></el-col>

      <el-col :span="4">
        <el-button class='btn1' type="primary" @click="previewData">
          Preview Data
        </el-button>
        <el-button class='btn4' type="success" @click="showSaveFileDialog  ">Save</el-button>
        <el-select v-model="selectedType">
          <el-option v-for="item in ChartTypes" 
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-col>
      
    </el-row>

  </main>

<!-- 确认信息框 -->
  <el-dialog v-model="saveDialog" title="Save Data" width="500" draggable overflow>
    <label>File Name: </label>
    <el-input v-model="file_name" style="width: auto;" type="text" placeholder="Enter the name of the file" />

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="saveDialog = false">Cancel</el-button>
        <el-button class='btn4' type="primary" @click="saveFile">
          Save
        </el-button>
      </div>
    </template> 
  </el-dialog><!-- el-dialog -->
</template>

<style>
.btn1{
  background-color:	#7E7B4D;
}
.btn4{
  background-color: 	#dbaebc;
}

</style>
