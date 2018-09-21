import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import axios from 'axios'
const baseUrl = `http://localhost:3000/`

Vue.use(Router)
const guard = function (to, from, next) {
  const token = localStorage.getItem('token')
  axios({
    method: 'GET',
    headers: {
      token: token
    },
    url: `${baseUrl}users/auth`
  }).then(response => {
    next()
  }).catch(error => {
    console.error(error)
    window.location.href = '/'
  })
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // beforeEnter: (to, from, next) => {
      //   guard(to, from, next)
      // },
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/create',
      name: 'create',
      beforeEnter: (to, from, next) => {
        guard(to, from, next)
      },
      component: () => import(/* webpackChunkName: "about" */ './views/CreatePost.vue')
    },
    {
      path: '/blog/:id',
      name: 'blog',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ './views/ShowBlog.vue')
    },
    {
      path: '/update/:id',
      name: 'update',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ './views/EditPost.vue')
    }
  ]
})
