<template>
  <div id="main-catalog">
    <Header
      :shopingCard="cart"
      v-on:addProduct="refreshChopingCart($event)"
      v-on:refreshUser="user = $event"/>
    <Navigation/>
    <CollectionCatalog
      :user="user"
      :collectionId="collectionId"
      :page="page"
      :categoryIds="categoryIds"
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
import CollectionCatalog from '../unitComponents/CollectionCatalog/CollectionCatalog'
import Footer from '../unitComponents/MainPage/Footer'

export default {
  props: ['collectionId', 'page', 'categoryIds', 'priceMin', 'priceMax'],
  name: 'main-catalog',
  components: {
    Header,
    Navigation,
    CollectionCatalog,
    Footer
  },
  data () {
    return {
      user: {},
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
