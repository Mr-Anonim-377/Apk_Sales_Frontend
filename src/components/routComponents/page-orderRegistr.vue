<template>
    <div class="page-orderRegistr">
      <Header
        :shopingCard="cart"
        v-on:addProduct="refreshChopingCart($event)"
        v-on:refreshUser="user = $event"/>
      <Navigation/>
      <OrderBody
        v-on:refreshCart="refreshChopingCart($event)"
        :user="user"
      :cart="cart"/>
      <Footer/>
    </div>
</template>

<script>
import Header from '../unitComponents/MainPage/Header'
import Navigation from '../unitComponents/MainPage/Navigation'
import OrderBody from '../unitComponents/OrderRegistr/OrderBody'
import Footer from '../unitComponents/MainPage/Footer'

export default {
  props: ['productId'],
  name: 'page-orderRegistr',
  components: {
    Header,
    Navigation,
    OrderBody,
    Footer
  },
  data () {
    return {
      user: {},
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

<style>
  @import '../../../static/CSS/CSS.css';

</style>
