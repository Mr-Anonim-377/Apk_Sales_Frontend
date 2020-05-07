import Vue from 'vue'
import Router from 'vue-router'
import mainPageComponent from '../components/routComponents/page-main'
import catalog from '../components/routComponents/page-catalog'
import itemCard from '../components/routComponents/page-itemCard'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: mainPageComponent
    },
    // {
    //   path: '/page/:page/category/:categoryId',
    //   component: catalog,
    //   name: 'catalog',
    //   props: true
    // },
    {
      path: '/catalog/:categoryId&:page&:collectionIds?&:priceMin?&:priceMax?',
      component: catalog,
      name: 'catalogWithCollection',
      props: true
    },
    {
      path: '/card',
      component: itemCard
      // props: true
    }
    // {
    //   path: 'catalog',
    //   component: catalog,
    //   name: 'catalog',
    //   props: true
    // }
  ]
})
