import Vue from 'vue'
import VueRouter from 'vue-router'
import { checkTokenByRouter } from "@/util/auth.js";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { auth: false, footer: true },
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/article',
    name: 'Article',
    meta: { auth: false, footer: true },
    component: () => import('@/views/Article.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { auth: false, footer: true },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: { auth: true },
    component: () => import('@/views/Admin/index.vue'),
    children: [
      {
        path: 'articlelist',
        name: 'Admin-Article-list',
        meta: { auth: true, footer: false },
        component: () => import('@/views/Admin/ArticleManage/list.vue'),
      }
    ]
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
