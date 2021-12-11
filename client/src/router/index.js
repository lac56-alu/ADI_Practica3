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
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/home',
    name: 'ListaPlaces',
    component: () => import('../views/ListaPlaces.vue')
  },
  {
    path: '/places',
    name: 'ListaPlaces',
    component: () => import('../views/ListaPlacesLoggeado.vue')
  },
  {
    path: '/myplaces',
    name: 'ListaMisPlaces',
    component: () => import('../views/ListaMisPlaces.vue')
  },
  {
    path: '/detalles/:id',
    name: 'detalles',
    component: () => import('../views/ListaDetalles.vue')
  },
  {
    path: '/categories',
    name: 'ListaCategorias',
    component: () => import('../views/ListaCategorias.vue')
  },
  {
    path: '/lugaresCategoria/:id',
    name: 'lugaresCategoria',
    component: () => import('../views/LugaresCategoria.vue')
  },
  {
    path: '/eliminar/:id',
    name: 'eliminar',
    component: () => import('../views/EliminarPlace.vue')
  },
  {
    path: '/createPlace',
    name: 'crearPlace',
    component: () => import('../views/CreatePlaces.vue')
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('../views/Perfil.vue')
  },
  {
    path: '/plans',
    name: 'plans',
    component: () => import('../views/ListaPlanes.vue')
  },
  {
    path: '/myplans',
    name: 'ListaMisPlanes',
    component: () => import('../views/ListaMisPlanes.vue')
  },
  {
    path: '/eliminarPlan/:id',
    name: 'eliminarPlan',
    component: () => import('../views/EliminarPlan.vue')
  },
  {
    path: '/createPlan',
    name: 'crearPlan',
    component: () => import('../views/CreatePlans.vue')
  },
  {
    path: '/modificar/:id',
    name: 'modificar',
    component: () => import('../views/ModificarPlace.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
