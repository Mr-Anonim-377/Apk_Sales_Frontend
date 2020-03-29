<template>
  <header class="header">
    <div class="head_body">
      <div class="head_logo"></div>
      <div class="container">
        <div class="row_news">
          <p class="row_logo">
            <img
              class="logo_pictures"
              src="https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/Logotip.png"
            >
          </p>
          <form action method="get" class="input">
            <input class="input_search" type="search" name="q" placeholder="Искать здесь.."
                   v-model="searchStr"
                   @click="displaySearhcResult"
                   @focusout="nonDisplaySearhcResult">
            <input class="input_botton" type="button">
            <div class="search_pop_up" :class="searchResultVisible">
              <div class="search_pop_up__blur"></div>
              <div class="search_pop_up__result">
                <div class="testttt" v-for="product in searchResult">
                  {{product.nameProduct}}
                </div>
              </div>
            </div>
          </form>
          <div class="basket_regist">
            <div class="basket">
              <div class="basket_product_count">
                {{shopingCart.countProducts === null || shopingCart.countProducts === "0"
                ?0
                :shopingCart.countProducts}}
              </div>
              <img src="https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/Korzina.png"
              >
            </div>
            <div class="login_picture">
              <img src="https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/log_in 1.png"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>


<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        shopingCart: {},
        searchStr: '',
        searchResult: [],
        searchResultVisible: ''
      }
    },
    created: function init() {
      fetch('api/shoppingCart/cart', {
        method: 'get',
        credentials: 'include'
      }).then(response => response.json())
      // eslint-disable-next-line
        .then(commits => this.shopingCart = commits);
      fetch('api/products/category', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({categoryId: 1, page: 0})
      })
        .then(response => response.json())
        .then(commits => console.log(commits))
    },
    methods: {
      nonDisplaySearhcResult() {
        this.searchResultVisible = '';
        this.searchResult = []
      },
      displaySearhcResult() {
        this.searchResult = [];
        fetch('api/search/onProducts?page=0&searchString=' + this.searchStr + '&searchType=ALL', {
          method: 'get',
          credentials: 'include'
        }).then(response => response.json())
          .then(commits => commits.forEach(item => this.searchResult.push(item)));

        this.searchResultVisible = 'visible';
      }
    },
    watch: {
      searchStr: function () {
        if (this.searchStr.length >= 3) {
          this.displaySearhcResult();
        } else if (this.searchStr === '') {
          this.nonDisplaySearhcResult();
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
