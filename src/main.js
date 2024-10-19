import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import VueCookies from 'vue3-cookies'

const app = createApp(App)
//axios 的问题 https://blog.csdn.net/qq_43574079/article/details/108821061
import axios from 'axios'
app.config.globalProperties.$axios = axios

import { store } from './Util/Store'
import { useCookies } from "vue3-cookies";
// if( useCookies().cookies.isKey(store.cookies.UserData)){
//     store.storeUserData( useCookies().cookies.get(store.cookies.UserData))
//     router.push('/home');
// }

app.use(router)
app.use(ElementPlus)
app.use(VueCookies)

app.mount('#app')
