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
import AboutUsBody from '../unitComponents/AboutUs/AboutUsBody'
import Footer from '../unitComponents/MainPage/Footer'
export default {
  name: 'page-AboutUs',
  components: {
    Header,
    Navigation,
    AboutUsBody,
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
              this.isUserAuthorized = true
              this.user = commits
            } else {
              this.user = {}
              this.isUserAuthorized = false
            }
          })
        this.cart = commits
      })
  },
  methods: {
    refreshUser (isRefresh) {
      if (isRefresh) {
        fetch(process.env.HOST + '/api/user', {
          method: 'get',
          credentials: 'include'
        }).then(response => response.json())
        // eslint-disable-next-line
              .then(commits => {
            if (commits.email !== null) {
              this.isUserAuthorized = true
              this.user = commits
            } else {
              this.user = {}
              this.isUserAuthorized = false
            }
          })
      }
    },
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
