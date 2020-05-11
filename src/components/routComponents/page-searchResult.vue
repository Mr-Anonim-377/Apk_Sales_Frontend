<template>
  <div id="page-itemCard">
    <Header
      :shopingCard="cart"
      v-on:addProduct="refreshChopingCart($event)"/>
    <Navigation/>
    <SearchhResult v-on:addProduct="refreshChopingCart($event)"
                   :page="page"
                   :searchStr="searchStr"
                   :collectionIds="collectionIds"
                   :categoryIds="categoryIds"
                   :priceMin="priceMin"
                   :priceMax="priceMax"
    >
    </SearchhResult>
    <Footer/>
  </div>
</template>

<script>
  import Header from '../unitComponents/MainPage/Header'
  import Navigation from '../unitComponents/MainPage/Navigation'
  import SearchhResult from '../unitComponents/SearchResultat/SearchResultBody'
  import Footer from '../unitComponents/MainPage/Footer'

  export default {
    props: ['page', 'searchStr', 'collectionIds', 'categoryIds', 'priceMin', 'priceMax'],
    components: {
      Header,
      Navigation,
      SearchhResult,
      Footer
    },
    data() {
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
    },
    created: function init() {
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
