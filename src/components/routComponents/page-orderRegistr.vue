<template>
    <div class="page-orderRegistr">
      <Header
        :isUserAuthorized="isUserAuthorized"
        :user="user"
        :shopingCard="cart"
        v-on:addProduct="refreshChopingCart($event)"
        v-on:refreshUser="refreshUser($event)"/>
      <Navigation/>
      <OrderBody
        v-on:refreshCart="refreshChopingCart($event)"
        :user="user"
      :cart="cart"/>
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
      .then(commits => {
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
        this.cart = commits});
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

<style>
  @import '../../../static/CSS/CSS.css';

</style>
