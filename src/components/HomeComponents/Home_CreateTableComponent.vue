<script setup>
import { ref, watch, defineEmits, defineProps, inject } from 'vue';
import { ElLoading, ElMessage } from 'element-plus'
import axios from 'axios';
import ArowConponent from '../CreateTableComponents/ArowConponent.vue';
import { store, API } from '@/Util/Store.js'
import { Tool } from '@/Util/Tools';
const tableData = ref(Array.from({ length: 3 }, () => Array(3).fill("0")));
tableData.value[0][0] = "/"
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
const status = inject("status")

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	}
})

watch(() => status.pathQueue,
	(newVal, oldVal) => {
		if(newVal[0] == status.createPage && newVal[newVal.length - 1] == status.editPage){
			console.log("new")
			file_name.value = ""
			selectedType.value = "bar"
			tableData.value = Array.from({ length: 3 }, () => Array(3).fill(blank_character.value))
		}
		else if (newVal[1] == status.editPage && newVal[newVal.length - 1] != status.previewPage) {
			console.log("edit")
			status.fileName = file_name.value
			status.fileType = selectedType.value
			status.data = tableData.value

		}
		else if (newVal[0] == status.loadPage && newVal[newVal.length - 1] == status.editPage || newVal[newVal.length - 1] == status.previewPage) {
			console.log("load")
			file_name.value = status.fileName
			selectedType.value = status.fileType
			tableData.value = status.data
		}
	}
);

watch(blank_character, (newVal, oldVal) => {
	if (newVal == '')
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
		tableData.value.push(Array(tableData.value[tableData.value.length - 1].length).fill(String("0")));
}

function deleteRow() {
	if (tableData.value.length > 1 && tableData.value.length - count_add.value > 0) {
		for (let i = 0; i < count_add.value; i++)
			tableData.value.pop();
	}
	count_add.value = 1
}

function showSaveFileDialog() {
	if (tableData.value.length > 1 && tableData.value[0].length <= 0) {
		ElMessage.warning("Please add at least one head col")
		return
	}

	if (tableData.value[0].length <= 0) {
		{
			ElMessage.warning("Please add at least one col")
			return
		}
	}


	saveDialog.value = true;
}

function previewData() {
	emit('previewData', tableData.value, selectedType.value);
}

function saveFile() {

	if (!Tool.isValidWindowsFilename(file_name.value)) {
		ElMessage.error("Invalid file name, did you add a space in the end?")
		return
	}


	tableData.value = fillMissing(tableData.value, blank_character.value)
	console.log("ready to save",tableData.value)
	if (status.pathQueue[0] == status.loadPage && status.pathQueue[status.pathQueue.length - 1] == status.editPage) {
		ElLoading.service({ fullscreen: true, text: 'Updating...' })
		axios({
			method: 'Patch',
			url: API.UpDateChart,
			headers: {
				'Authorization': `Bearer ${store.getUserData().token}`
			},
			data: {
				"fileID": status.fileID,
				"fileName": file_name.value,
				"fileType": selectedType.value,
				"data": tableData.value
			}
		}).then(res => {
			if (res.status === 202)
				ElMessage.success("File update successfully")
			else
				console.log(res)
			ElLoading.service().close()
			emit('saveFile', tableData.value, selectedType.value);
		}).catch(err => {
			console.log(err)
		})
	}
	else {
		ElLoading.service({ fullscreen: true, text: 'Saving...' })

		axios({
			method: 'post',
			url: API.CreateTable,
			headers: {
				'Authorization': `Bearer ${store.getUserData().token}`
			},
			data: {
				'fileName': file_name.value + "_" + selectedType.value,
				'data': tableData.value
			}
		}).then(res => {
			if (res.status === 201)
				ElMessage.success("File save successfully")
			else {
				console.log(res)

			}
			ElLoading.service().close()
			emit('saveFile', tableData.value, selectedType.value);
		}).catch(err => {
			console.log(err)
		})
	}
	setTimeout(() => {
		ElLoading.service().close()
		emit('saveFile', tableData.value, selectedType.value);
	}, 1000)
	saveDialog.value = false;
}

function fillMissing(arr, fillValue) {
	// 将填充值转换为字符串类型
	fillValue = String(fillValue);

	// 找到二维数组中最长的数组长度
	const maxLength = Math.max(...arr.map(subArray => subArray.length));

	// 遍历每个子数组并填充和转换
	return arr.map(subArray => {
		// 将子数组中的每个值都转换为字符串
		const stringifiedArray = subArray.map(item => String(item));

		// 如果子数组长度小于 maxLength，用 fillValue 补全
		return [...stringifiedArray, ...Array(maxLength - subArray.length).fill(fillValue)];
	});
}
</script>

<template>
	<main v-show="show">
		<p style="font-weight: bold;color: black;">
			{{ tableData.length }} X {{ tableData[0].length }}
		</p>
		<p style="color: black;">
			空白单元用
			<el-input v-model="blank_character" style="width: 60px;max-width: 60px;min-width: 60px;" type="text" />
			代替
		</p>

		<hr />

		<ArowConponent v-for="(item, index) in tableData" :row="tableData[index]" />

		<el-row>
			<el-col :span="1">
				<el-input v-model="count_add" style="width: 60px;min-width: 60px;max-width: 60px;" type="number" />

			</el-col>
			<el-col :span="2">
				<el-button type="primary" style="margin-left: 15px;margin-top: 4px;" @click="addRow">Add Row</el-button>

			</el-col>
			<el-col :span="2">
				<el-button type="danger" style="margin-left:0px;margin-top: 4px;" @click="deleteRow">Delete
					Row</el-button>
			</el-col>

			<el-col :span="10"></el-col>
			<el-col :span="4"></el-col>

			<el-col :span="4">
				<el-button type="primary" @click="previewData">
					Preview Data
				</el-button>
				<el-button type="success" @click="showSaveFileDialog">Save</el-button>
				<el-select v-model="selectedType">
					<el-option v-for="item in ChartTypes" :key="item.value" :label="item.label" :value="item.value" />
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
				<el-button type="primary" @click="saveFile">
					Save
				</el-button>
			</div>
		</template>
	</el-dialog><!-- el-dialog -->
</template>

<style></style>
