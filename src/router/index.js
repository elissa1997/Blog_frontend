import Vue from 'vue'
import VueRouter from 'vue-router'
import { checkTokenByRouter } from "@/util/auth.js";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { 
      auth: false,
      footer: true,
      active: ['Home']
    },
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/article',
    name: 'Article',
    meta: {
      auth: false,
      footer: true,
      active: ['Article']
    },
    component: () => import('@/views/Article.vue')
  },
  {
    path: '/links',
    name: 'Links',
    meta: {
      auth: false,
      footer: true,
      active: ['Links']
    },
    component: () => import('@/views/Links.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      auth: false,
      footer: true,
      active: ['About']
    },
    component: () => import('@/views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      auth: false,
      footer: true,
      active: ['Admin']
    },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: { 
      auth: true,
      active: ['Admin', '']
    },
    component: () => import('@/views/Admin/index.vue'),
    children: [
      {
        path: 'articlelist',
        name: 'Admin-Article-list',
        meta: {
          auth: true,
          footer: false,
          active: ['Admin', 'Article']
        },
        component: () => import('@/views/Admin/ArticleManage/list.vue'),
      },
      {
        path: 'articleedit',
        name: 'Admin-Article-edit',
        meta: {
          auth: true,
          footer: false,
          active: ['Admin', 'Article']
        },
        component: () => import('@/views/Admin/ArticleManage/edit.vue'),
      },
      {
        path: 'commentlist',
        name: 'Admin-Comment-list',
        meta: {
          auth: true,
          footer: false,
          active: ['Admin', 'Comment']
        },
        component: () => import('@/views/Admin/CommentManage/list.vue'),
      },
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
