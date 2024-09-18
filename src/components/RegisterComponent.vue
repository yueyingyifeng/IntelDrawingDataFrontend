<template>
	<main v-show="show">
		
	<el-text class="mx-1" size="large">Register</el-text>



	<el-form style="max-width: 600px" label-width="150px">

		<hr />
		<el-form-item label="Name">
			<el-input v-model="formData.name" type="text" autocomplete="off" :clearable="true" />
		</el-form-item>

		<el-form-item label="Email">
			<el-input v-model="formData.email" type="email" autocomplete="off" :clearable="true" />
		</el-form-item>

		<el-form-item label="Password">
			<el-input v-model="formData.psw" type="password" autocomplete="off" :clearable="true" />
		</el-form-item>

		<el-form-item label="Confirm Password">
			<el-input v-model="formData.c_psw" type="password" autocomplete="off" :clearable="true" />
		</el-form-item>

		<el-form-item>
			<el-button @click="Register">Sign up</el-button>
			<el-button type="primary" @click="switchToLogin">Already have an account? Sign in</el-button>
		</el-form-item>

	</el-form>
	</main>
</template>

<script setup>
import { reactive, defineEmits, defineProps } from 'vue'
import axios from 'axios';
import { ElMessage } from 'element-plus'
import router from '../router/index'
import { store } from '@/Util/Store';
const formData = reactive({
	name: '',
	psw: '',
	email: '',
	c_psw: '',
})

const emit = defineEmits(['toLogin'])

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	}
})


function validatePSW() {
	if (formData.psw !== formData.c_psw) {
		ElMessage.error('Passwords do not match')
		return false
	}
	if (formData.psw.length < 8 || formData.c_psw.length < 8) {
		ElMessage.error('Password must be at least 8 characters long')
		return false
	}
	return true
}

function isValidEmail(email) {
	// 定义用于检测邮箱格式的正则表达式
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}


function fieldsExist() {
	return !(formData.name === '' || formData.psw === '' || formData.email === '' || formData.c_psw === '')
}

function valid() {
	if (!validatePSW())
		return false

	if (!fieldsExist()) {
		ElMessage.error('Please fill in all fields')
		return false
	}

	if (!isValidEmail(formData.email)) {
		ElMessage.error('Invalid email format')
		return false
	}
	return true
}

const Register = () => {

	if (!valid())
		return

	axios({
		method: 'post',
		url: 'https://localhost:7161/api/Register',
		data: {
			"Name": formData.name,
			"Psw": formData.psw,
			"Email": formData.email,
		}
	}).then(response => {
		if (response.status == 201) {
			store.storeUserData(response.data);
			router.push('/home')
		}
	}).catch(err => {
		if (err.status === 400) {
			console.log(err)
			ElMessage.error(err.response.data)
		}
		else {
			console.log(err)
			ElMessage.error('Network error.')
		}
	});
}

const switchToLogin = () => {
	emit('toLogin')
}

</script>