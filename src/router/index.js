import Vue from 'vue'
import VueRouter from 'vue-router'
import table from '../views/table.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/table',
    name: 'table',
    component: table
  },
  {
    path: '/',
    name: 'sortable',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/sortable.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
