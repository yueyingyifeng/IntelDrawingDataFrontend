import { createRouter, createWebHistory } from 'vue-router'
import LoginAndRegisterView from '../views/LoginAndRegisterView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginAndRegisterView',
      component: LoginAndRegisterView
    },
    {
      path: '/home',
      name: 'Home',
      component:HomeView
    }
  ]
})

export default router
