<template>
  <div id="mainPageComponent">
    <Header
      :shopingCard="cart"
      v-on:addProduct="refreshChopingCart($event)"/>
    <Navigation/>
    <CurrentBaner :baners="baners"/>
    <BodyPage :baners="baners"/>
    <Footer/>
  </div>
</template>
<script>
import Header from '../unitComponents/MainPage/Header'
import Navigation from '../unitComponents/MainPage/Navigation'
import CurrentBaner from '../unitComponents/MainPage/CurrentBaner'
import BodyPage from '../unitComponents/MainPage/MainBodyPage'
import Footer from '../unitComponents/MainPage/Footer'
export default {
  data() {
    return {
      baners: [
        {
          "banerId": 1,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/Rick and Morty.png"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_CENTRAL",
          "banerUsesStatus": true
        },
        {
          "banerId": 2,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://img08.rl0.ru/afisha/c1200x600/daily.afisha.ru/uploads/images/5/cd/5cd921a30fd7f4e6b82f6602493fc787.jpg"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_CENTRAL",
          "banerUsesStatus": true
        },
        {
          "banerId": 3,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://www.ridus.ru/images/2019/12/16/1022839/in_article_b8ebe3cc8b.jpg_large"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_CENTRAL",
          "banerUsesStatus": true
        },
        {
          "banerId": 4,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/Banner_red.png"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_SMALL",
          "banerUsesStatus": true
        },
        {
          "banerId": 5,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/baner_small.png"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_SMALL",
          "banerUsesStatus": true
        },
        {
          "banerId": 6,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/product.png"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_SMALL",
          "banerUsesStatus": true
        },
        {
          "banerId": 7,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/product.png"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_SMALL",
          "banerUsesStatus": true
        },
        {
          "banerId": 8,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/product.png"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_SMALL",
          "banerUsesStatus": true
        }
      ],
      cart: {}
    }
  },
  name: 'mainPageComponent',
  components: {
    Header,
    Navigation,
    CurrentBaner,
    BodyPage,
    Footer
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
}
</script>

<style scoped>

</style>
