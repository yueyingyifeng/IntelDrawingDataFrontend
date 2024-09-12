<template>

	<el-text class="mx-1" size="large">Login</el-text>



	<el-form style="max-width: 600px" label-width="150px">

		<hr />
		<el-form-item label="ID or Email">
			<el-input v-model="formData.id" type="text" autocomplete="on" :clearable="true" />
		</el-form-item>

		<el-form-item label="Password">
			<el-input v-model="formData.psw" type="password" autocomplete="on" :clearable="true" />
		</el-form-item>

		<el-form-item>
			<el-button @click="login">Sign in</el-button>
			<el-button type="primary" @click="switchToRegister">No account? Sign up</el-button>
		</el-form-item>

	</el-form>
</template>

<script setup>
import {
	reactive, defineEmits,
	getCurrentInstance
}
	from 'vue'
import { ElMessage } from 'element-plus'
import router from '../router/index'

const formData = reactive({
	id: '',
	psw: '',
})

const emit = defineEmits(['toRegister'])

let { proxy } = getCurrentInstance()

const login = () => {
	let loginParams = {}

	if (!isValidEmail(formData.id)) {
		loginParams['id'] = formData.id
		loginParams['psw'] = formData.psw
	}
	else {
		loginParams['email'] = formData.id
		loginParams['psw'] = formData.psw
	}

	// 调用 axios 出了问题，只能用这种方法访问，具体查看 main.js
	proxy.$axios({
		method: 'post',
		url: 'https://localhost:7161/api/Login',
		data: loginParams
	}).then((res) => {
		if(res.status == 200)
		router.push('/home')
	})
		.catch((err) => {
			if (err.status === 400) {
				// console.log(err)
				ElMessage.error(err.response.data)
			}
			else {
				ElMessage.error('Network error.')
			}
		})
}

const switchToRegister = () => {
	emit('toRegister')
}

function isValidEmail(email) {
	// 定义用于检测邮箱格式的正则表达式
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}


</script>