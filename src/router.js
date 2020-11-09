import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PilihDaerah from './views/PilihDaerah.vue'
import Daerah from './views/Daerah.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Daerah',
      name: 'Daerah',
      component: Daerah
    },
    {
      path: '/PilihDaerah',
      name: 'Pilih Daerah',
      component: PilihDaerah
    },
    {
      path: '/Aksesoris',
      name: 'Aksesoris',
      component:  () => import('./views/Aksesoris.vue')
    },
    {
      path: '/DaftarPakaian',
      name: 'Daftar Pakaian',
      component:  () => import('./views/DaftarPakaian.vue')
    },
    {
      path: '/Visualisasi',
      name: 'visualisasi',
      component:  () => import('./views/Visualisasi.vue')
    },
    {
      path: '/SearchPage',
      name: 'Search Page',
      component:  () => import('./views/SearchPage.vue')
    },
    // {
    //   path: '/DetailPakaian/:id/:id1',
    //   name: 'Detail Pakaian',
    //   component:  () => import('./views/DetailPakaian.vue')
    // },
    {
      path: '/DetailPakaian/:id',
      name: 'Detail Pakaian',
      component:  () => import('./views/DetailPakaian.vue')
    },
    {
      path: '/HalamanDetail/:id',
      name: 'Halaman Detail',
      component:  () => import('./views/HalamanDetail.vue'),
    },
    {
      path: '/Test',
      name: 'test',
      component:  () => import('./views/Test.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
