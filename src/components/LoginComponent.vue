<template>
	<main v-show="show">
		
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
	</main>
</template>

<script setup>
import {
	reactive,
	defineEmits,
	defineProps,
	getCurrentInstance
} from 'vue'
import { ElMessage } from 'element-plus'
import router from '../router/index'
import { store, API } from '@/Util/Store';
import { useCookies } from 'vue3-cookies';
const formData = reactive({
	id: '',
	psw: '',
})

const emit = defineEmits(['toRegister'])

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	}
});

let { proxy } = getCurrentInstance()

const login = () => {
	let loginParams = {}

	if (isValidEmail(formData.id)) {
		loginParams['email'] = formData.id
		loginParams['psw'] = formData.psw

	}
	else if (Number(formData.id)) {
		loginParams['id'] = formData.id
		loginParams['psw'] = formData.psw
	}
	else {
		ElMessage.error('Please enter a valid ID or Email')
		return
	}

	// 调用 axios 出了问题，只能用这种方法访问，具体查看 main.js
	proxy.$axios({
		method: 'post',
		url: API.Login,
		data: loginParams
	}).then((res) => {
		if (res.status == 200) {
			store.storeUserData(res.data);
			useCookies().cookies.set(store.cookies.UserData, store.getUserData(), '7d')
			router.push('/home')
		}

	})
		.catch((err) => {
			if (err.status === 400) {
				// console.log(err)
				ElMessage.error(err.response.data)
			}
			else {
				ElMessage.error('Network error.')
			}
			console.log(err)

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