import Vue from 'vue'
import Router from 'vue-router'
import mainPageComponent from '../components/routComponents/mainPageComponent'
import catalog from '../components/routComponents/main-catalog'

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
