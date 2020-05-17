<template>
  <div class="page-shoppingCart">
    <Header
      :shopingCard="cart"
    v-on:addProduct="refreshChopingCart($event)"/>
    <Navigation/>
    <ShoppingCart
    :shoppingCart = "cart"
    v-on:addMinus="refreshChopingCart($event)"
    v-on:addPlus="refreshChopingCart($event)"
    v-on:addDelete="refreshChopingCart($event)"
    />
    <Footer/>
  </div>
</template>

<script>
import Header from '../unitComponents/MainPage/Header'
import Navigation from '../unitComponents/MainPage/Navigation'
import ShoppingCart from '../unitComponents/ShopingCart/ShoppingCartBody'
import Footer from '../unitComponents/MainPage/Footer'
export default {
  name: 'page-shoppingCart',
  components: {
    Header,
    Navigation,
    ShoppingCart,
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
  @import '../../../static/CSS/CSS.css';

</style>
