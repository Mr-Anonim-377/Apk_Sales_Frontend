<template>
  <div id="main-catalog">
    <Header
      :shopingCard="cart"
      v-on:addProduct="refreshChopingCart($event)"/>
    <Navigation/>
    <CatalogItem
      :categoryId="categoryId"
      :page="page"
      :collectionIds="collectionIds"
      :priceMin="priceMin"
      :priceMax="priceMax"
      v-on:addProduct="refreshChopingCart($event)"
    />
    <Footer/>
  </div>
</template>

<script>
import Header from '../unitComponents/MainPage/Header'
import Navigation from '../unitComponents/MainPage/Navigation'
import CatalogItem from '../unitComponents/CategoryCatalog/CatalogCategory'
import Footer from '../unitComponents/MainPage/Footer'

export default {
  props: ['categoryId', 'page', 'collectionIds', 'priceMin', 'priceMax'],
  name: 'main-catalog',
  components: {
    Header,
    Navigation,
    CatalogItem,
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
  // created: function init () {
  //
  // }
}
</script>

<style>
  @import '../../../static/CSS/CSS.css';
</style>
