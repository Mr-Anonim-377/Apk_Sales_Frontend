import Vue from 'vue'
import Router from 'vue-router'
import mainPageComponent from '../components/routComponents/page-main'
import catalog from '../components/routComponents/page-catalog'
import collection from '../components/routComponents/page-collection'
import itemCard from '../components/routComponents/page-productCard'
import searchResult from '../components/routComponents/page-searchResult'
import shoppingCart from '../components/routComponents/page-shoppingCart'
import thanks from '../components/routComponents/page-thankList'
import registOrder from '../components/routComponents/page-orderRegistr'
import Account from '../components/routComponents/page-account'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: mainPageComponent
    },
    {
      path: '/catalog/category=:categoryId' +
        '&page=:page' +
        '&collections=:collectionIds?' +
        '&price-min=:priceMin?' +
        '&price-max=:priceMax?',
      component: catalog,
      name: 'catalogWithCollection',
      props: true
    },
    {
      path: '/card/:productId',
      component: itemCard,
      props: true
    },
    {
      path: '/shoppingCart',
      component: shoppingCart
      // props: true
    },
    {
      path: '/search/page=:page&searchStr=:searchStr' +
        '&collectionsIds=:collectionIds?' +
        '&categoryIds=:categoryIds?' +
        '&price-min=:priceMin?' +
        '&price-max=:priceMax?',
      component: searchResult,
      props: true
    },
    {
      path: '/collection/collectionId=:collectionId' +
        '&page=:page' +
        '&categoryIds=:categoryIds?' +
        '&price-min=:priceMin?' +
        '&price-max=:priceMax?',
      component: collection,
      props: true
    },
    {
      path: '/order/thanks',
      component: thanks
      // props: true
    },
    {
      path: '/order/create',
      component: registOrder
      // props: true
    },
    {
      path: '/account',
      component: Account
      // props: true
    }
  ]
})
