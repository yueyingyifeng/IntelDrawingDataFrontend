<script setup>
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus'
import ArowConponent from '../CreateTableComponents/ArowConponent.vue';

const tableData = ref([[]]);
const count_add = ref(1)
const saveDialog = ref(false)
const file_name = ref('')

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
  saveDialog.value = true;
}

function saveFile() {
  console.log(tableData.value)

  if(!isValidWindowsFilename(file_name.value)){
    ElMessage.error("Invalid file name, did you add a space in the end?")
    return
  }
  saveDialog.value = false;  
}

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

</script>

<template>
  <main>
    <ArowConponent v-for="(item, index) in tableData" :row="tableData[index]" />

    <el-row>
      <el-col :span="1">
        <el-input v-model="count_add" style="width: 60px;" type="number" />

      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="addRow">Add Row</el-button>

      </el-col>
      <el-col :span="2">
        <el-button type="danger" @click="deleteRow">Delete Row</el-button>
      </el-col>

      <el-col :span="10"></el-col>
      <el-col :span="4"></el-col>

      <el-col :span="4">
        <el-button type="success" @click="showSaveFileDialog  ">Save</el-button>
      </el-col>
    </el-row>

  </main>

  <el-dialog v-model="saveDialog" title="Save Data" width="500" draggable overflow>
    <label>File Name: </label>
    <el-input v-model="file_name" style="width: auto;" type="text" placeholder="Enter the name of the file" />

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="saveDialog = false">Cancel</el-button>
        <el-button type="primary" @click="saveFile">
          Save
        </el-button>
      </div>
    </template> 
  </el-dialog>
</template>

<style></style>
