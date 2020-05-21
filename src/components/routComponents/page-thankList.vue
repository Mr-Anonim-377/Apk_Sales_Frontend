<template>
  <div id="page-rhankList">
    <Header
      :shopingCard="cart"
      v-on:addProduct="refreshChopingCart($event)"/>
    <Navigation/>
    <ThanksBody :cod="cod"/>
    <Footer/>
  </div>
</template>

<script>
import Header from '../unitComponents/MainPage/Header'
import Navigation from '../unitComponents/MainPage/Navigation'
import ThanksBody from '../unitComponents/ThanksBody'
import Footer from '../unitComponents/MainPage/Footer'
export default {
  props: ['productId', 'cod'],
  components: {
    Header,
    Navigation,
    ThanksBody,
    Footer
  },
  data () {
    return {
      cart: {}
    }
  },
  created: function init () {
    fetch(process.env.HOST + '/api/shoppingCart/cart', {
      method: 'get',
      credentials: 'include'
    }).then(response => response.json())
    // eslint-disable-next-line
      .then(commits => this.cart = commits);
  },
  methods: {
    refreshChopingCart (isRefresh) {
      if (isRefresh) {
        fetch(process.env.HOST + '/api/shoppingCart/cart', {
          method: 'get',
          credentials: 'include'
        }).then(response => response.json())
        // eslint-disable-next-line
            .then(commits => this.cart = commits);
      }
    }
  }
}
</script>

<style scoped>

</style>
