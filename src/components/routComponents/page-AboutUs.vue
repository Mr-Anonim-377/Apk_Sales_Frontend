<template>
  <div id="page-AboutUs">
    <Header
      :shopingCard="cart"
      v-on:addProduct="refreshChopingCart($event)"/>
    <Navigation/>
    <AboutUsBody/>
    <Footer/>
  </div>
</template>

<script>
    import Header from '../unitComponents/MainPage/Header'
    import Navigation from '../unitComponents/MainPage/Navigation'
    import AboutUsBody from "../unitComponents/AboutUs/AboutUsBody"
    import Footer from '../unitComponents/MainPage/Footer'
    export default {
      name: "page-AboutUs",
      components: {
        Header,
        Navigation,
        AboutUsBody,
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
