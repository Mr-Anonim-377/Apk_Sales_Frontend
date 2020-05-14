<template>
    <div class="page-orderRegistr">
      <Header
        :shopingCard="cart"
        v-on:addProduct="refreshChopingCart($event)"/>
      <Navigation/>
        <OrderBody/>
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
  }
}
</script>

<style scoped>

</style>
