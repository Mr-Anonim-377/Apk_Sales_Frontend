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
import Politics from '../unitComponents/AboutUs/Politics'
export default {
  name: 'page-PoliticsConf',
  components: {
    Politics,
    Header,
    Navigation,
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
