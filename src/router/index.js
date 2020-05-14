import Vue from 'vue'
import Router from 'vue-router'
import mainPageComponent from '../components/routComponents/page-main'
import catalog from '../components/routComponents/page-catalog'
import collection from '../components/routComponents/page-collection'
import itemCard from '../components/routComponents/page-productCard'
import searchResult from '../components/routComponents/page-searchResult'
import shoppingCard from '../components/routComponents/page-shoppingCart'
import Thanks from "../components/routComponents/page-thankList";
import registOrder from "../components/routComponents/page-orderRegistr"

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
      path: '/shopping',
      component: shoppingCard
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
      path: '/thanks',
      component: Thanks
      // props: true
    },
    {
      path: '/registrationOrder',
      component: registOrder
      // props: true
    }
  ]
})
