import Vue from 'vue'
import Router from 'vue-router'
import mainPageComponent from '../components/routComponents/page-main'
import catalog from '../components/routComponents/page-catalog'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: mainPageComponent
    },
    {
      path: '/catalog/:i',
      component: catalog,
      props: true
    }
  ]
})
