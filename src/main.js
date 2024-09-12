import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
//axios 的问题 https://blog.csdn.net/qq_43574079/article/details/108821061
import axios from 'axios'
app.config.globalProperties.$axios = axios

app.use(router)
app.use(ElementPlus)

app.mount('#app')
