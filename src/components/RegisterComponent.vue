<template>

    <el-text class="mx-1" size="large">Register</el-text>

    

    <el-form
      style="max-width: 600px"
      label-width="150px"
    >

    <hr />
      <el-form-item label="Name">
        <el-input v-model="formData.name" type="text" autocomplete="off" :clearable="true"/>
      </el-form-item>

      <el-form-item label="Password">
        <el-input
          v-model="formData.psw"
          type="password"
          autocomplete="off"
          :clearable="true"
        />
      </el-form-item>

      <el-form-item label="Confirm Password">
        <el-input
          v-model="formData.c_psw"
          type="password"
          autocomplete="off"
          :clearable="true"
        />
      </el-form-item>

      <el-form-item>
        <el-button @click="Register">Sign up</el-button>
        <el-button type="primary" @click="switchToLogin">Already have an account? Sign in</el-button>
      </el-form-item>

    </el-form>
  </template>
  
  <script setup>
  import { reactive, defineEmits } from 'vue'
  
  const formData = reactive({
    name:'',
    psw: '',
    c_psw: '',
  })

  const emit = defineEmits(['toLogin'])

  const Register = () => {
    //TODO: 注册请求逻辑
  }

  const switchToLogin = ()=>{
    emit('toLogin')
  }

  </script>
  