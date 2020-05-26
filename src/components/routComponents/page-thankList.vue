<template>
  <div id="page-rhankList">
    <Header
      :isUserAuthorized="isUserAuthorized"
      :user="user"
      :shopingCard="cart"
      v-on:addProduct="refreshChopingCart($event)"
      v-on:refreshUser="refreshUser($event)"/>
    <Navigation/>
    <ThanksBody :cod="cod"/>
    <Footer/>
  </div>
</template>

<script>
import Header from '../unitComponents/MainPage/Header'
import Navigation from '../unitComponents/MainPage/Navigation'
import ThanksBody from '../unitComponents/ThanksBody'
import Footer from '../unitComponents/MainPage/Footer'
export default {
  props: ['productId', 'cod'],
  components: {
    Header,
    Navigation,
    ThanksBody,
    Footer
  },
  data () {
    return {
      user: {},
      cart: {},
      isUserAuthorized: false
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
    refreshUser(isRefresh) {
      if (isRefresh) {
        fetch(process.env.HOST + '/api/user', {
          method: 'get',
          credentials: 'include'
        }).then(response => response.json())
          // eslint-disable-next-line
          .then(commits => {
            if (commits.email !== null) {
              this.isUserAuthorized = true;
              this.user = commits;
            } else {
              this.user = {};
              this.isUserAuthorized = false;
            }
          })
      }
    },
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
