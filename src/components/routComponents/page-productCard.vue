<template>
  <div id="page-itemCard">
    <Header
      :shopingCard="cart"
      v-on:addProduct="refreshChopingCart($event)"/>
    <Navigation/>
    <ItemCardBody
    :productId="productId"
    v-on:addProduct="refreshChopingCart($event)"/>
    <Footer/>
  </div>
</template>

<script>
import Header from '../unitComponents/MainPage/Header'
import Navigation from '../unitComponents/MainPage/Navigation'
import ItemCardBody from '../unitComponents/ProductCard/ProductCardBody'
import Footer from '../unitComponents/MainPage/Footer'
export default {
  props: ['productId'],
  components: {
    Header,
    Navigation,
    ItemCardBody,
    Footer
  },
  data () {
    return {
      cart: {}
    }
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
  },
  created: function init () {
    fetch(process.env.HOST + '/api/shoppingCart/cart', {
      method: 'get',
      credentials: 'include'
    }).then(response => response.json())
    // eslint-disable-next-line
      .then(commits => this.cart = commits);
  }
}
</script>

<style>

</style>
