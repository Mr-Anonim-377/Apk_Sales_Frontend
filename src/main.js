// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'

import { CarouselPlugin } from 'bootstrap-vue'
Vue.use(CarouselPlugin);

Vue.use(Autocomplete);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  // store,
  router: router,
  components: { App },
  template: '<App/>'
});
