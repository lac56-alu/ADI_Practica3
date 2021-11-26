import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/hola',
    name: 'Hola',
    component: () => import('../views/Hola.vue')
  },
  {
    path: '/places',
    name: 'ListaPlaces',
    component: () => import('../views/ListaPlaces.vue')
  },
  {
    path: '/myplaces',
    name: 'ListaMisPlaces',
    component: () => import('../views/ListaMisPlaces.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
