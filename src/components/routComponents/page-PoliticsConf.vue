<template>
  <div class="page-PoliticsConf">
    <Header
      :shopingCard="cart"
      v-on:addProduct="refreshChopingCart($event)"/>
    <Navigation/>
      <Politics/>
    <Footer/>
  </div>
</template>

<script>
  import Header from '../unitComponents/MainPage/Header'
  import Navigation from '../unitComponents/MainPage/Navigation'
  import Footer from '../unitComponents/MainPage/Footer'
  import Politics from "../unitComponents/AboutUs/Politics";
  export default {
    name: "page-PoliticsConf",
    components: {
      Politics,
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
