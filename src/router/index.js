import Vue from 'vue'
import VueRouter from 'vue-router'
import { checkTokenByRouter } from "@/util/auth.js";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('@/views/Article.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: { auth: true },
    component: () => import('@/views/Admin/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  checkTokenByRouter(to, from, next);
})

export default router
