<template>
  <div class="page-Account">
    <Header
      :shopingCard="cart"
      v-on:addProduct="refreshChopingCart($event)"/>
    <Navigation/>
    <AccountBody/>
    <Footer/>
  </div>
</template>

<script>
import Header from '../unitComponents/MainPage/Header'
import Navigation from '../unitComponents/MainPage/Navigation'
import AccountBody from '../unitComponents/PageAccount/AccountBody'
import Footer from '../unitComponents/MainPage/Footer'
export default {
  name: 'page-shoppingCart',
  components: {
    Header,
    Navigation,
    AccountBody,
    Footer
  },
  data () {
    return {
      cart: {}
    }
  },
  methods: {
    refreshChopingCart(isRefresh) {
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
