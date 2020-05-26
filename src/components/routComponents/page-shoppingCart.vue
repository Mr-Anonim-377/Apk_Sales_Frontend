<template>
  <div class="page-shoppingCart">
    <Header
      :isUserAuthorized="isUserAuthorized"
      :user="user"
      :shopingCard="cart"
      v-on:addProduct="refreshChopingCart($event)"
      v-on:refreshUser="refreshUser($event)"/>
    <Navigation/>
    <Preloader v-if="isPreloader"></Preloader>
    <ShoppingCart
      v-if="!isPreloader"
    :shoppingCart = "cart"
    v-on:addMinus="refreshChopingCart($event)"
    v-on:addPlus="refreshChopingCart($event)"
    v-on:addDelete="refreshChopingCart($event)"
    />
    <Footer/>
  </div>
</template>
<script>
import Header from '../unitComponents/MainPage/Header'
import Navigation from '../unitComponents/MainPage/Navigation'
import ShoppingCart from '../unitComponents/ShopingCart/ShoppingCartBody'
import Footer from '../unitComponents/MainPage/Footer'
import Preloader from '../utilsComponent/PreloderBody'
export default {
  name: 'page-shoppingCart',
  components: {
    Preloader,
    Header,
    Navigation,
    ShoppingCart,
    Footer
  },
  data () {
    return {
      isPreloader: true,
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
        this.cart = commits
        this.isPreloader = false
      })
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
