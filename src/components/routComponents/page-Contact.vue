<template>
  <div class="page-Contact">
    <Header
      :shopingCard="cart"
      v-on:addProduct="refreshChopingCart($event)"/>
    <Navigation/>
    <Contact/>
    <Footer/>
  </div>
</template>

<script>
  import Header from '../unitComponents/MainPage/Header'
  import Navigation from '../unitComponents/MainPage/Navigation'
  import Footer from '../unitComponents/MainPage/Footer'
  import Contact from '../unitComponents/AboutUs/Contact'
    export default {
        name: "page-Contact",
      components: {
        Contact,
        Header,
        Navigation,
        Footer,
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

<style>
  @import '../../../static/CSS/CSS.css';
</style>
