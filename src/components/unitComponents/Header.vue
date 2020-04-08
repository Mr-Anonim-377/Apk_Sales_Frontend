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
          <div class="input" v-on-clickaway="onClickOutside">
            <input class="input_search" autocomplete="off" placeholder="Искать здесь.."
                   v-model="searchStr" @focus="isVisible = true">
            <input class="input_botton" type="button">
            <div class="search_pop_up" v-if="isVisible">
              <div class="search_pop_up__blur"></div>
              <div class="search_pop_up__result">
                <div class="search_error_and_vait" v-if="searchResult.length === 0">
                  <div class="search_error_and_vait__message">{{errorSearchStr}}</div>
                  <!--                  <div><img src="../../../static/img/1573285.png"></div>-->
                </div>
                <div class="search_result_product"
                     v-for="(product,index) in searchResult"
                     v-if="index<4"
                     v-bind:style="indexOfColored(index)"
                     @mouseover="setColor(true,index)"
                     @mouseout="setColor(false,index)">
                  <div class="search_result_product__img">
                    <img v-bind:src="product.image.imagePatch" alt="">
                  </div>
                  <div class="search_result_product__name__container">
                    <div class="search_result_product__name">
                      <span>{{product.nameProduct}}</span>
                    </div>
                    <div class="search_product_cart_interactions__container">
                      <div class="search_product_cart_interactions">
                        <img class="search_product_cart_img search_product_cart_img_message"
                             src="../../../static/CSS/pictures/reviews.png" alt=""/></div>
                      <div class="search_product_cart_interactions">
                        <img class="search_product_cart_img search_product_cart_img_basked"
                             src="../../../static/CSS/pictures/basket.png" alt=""/></div>
                    </div>
                    <span class="search_result_product__price">{{product.price}}
                      <span class="product-price-currents">₽</span>
                      </span>
                  </div>
                </div>
                <div class="show_more" v-if="searchResult.length !== 0">Показать все</div>
              </div>
            </div>
          </div>
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
import {directive as onClickaway} from 'vue-clickaway'

export default {
  directives: {
    onClickaway: onClickaway
  },
  data () {
    return {
      searchResultStyle: {
        background: '#9974fb'
      },
      colorIsNumber: -1,
      errorSearchStr: 'введите поисковый запрос',
      shopingCart: {},
      searchStr: '',
      searchStrOld: '',
      searchResult: [],
      searchResultVisible: '',
      isVisible: false
    }
  },
  created: function init () {
    fetch('api/shoppingCart/cart', {
      method: 'get',
      credentials: 'include'
    }).then(response => response.json())
      // eslint-disable-next-line
        .then(commits => this.shopingCart = commits);
  },
  methods: {
    onClickOutside () {
      this.isVisible = false
    },
    indexOfColored (number) {
      if (number === this.colorIsNumber) {
        return this.searchResultStyle
      }
    },
    setColor (isColor, num) {
      if (isColor) {
        this.colorIsNumber = num
      } else {
        this.colorIsNumber = -1
      }
    },
    // @change="changeSearchStr"
    // changeSearchStr() {
    //   if (this.searchStr.length > 3) {
    //     this.errorSearchStr = 'поиск по товарам'
    //     this.getSearhcResult()
    //   } else if (this.searchStr.length === 0) {
    //     this.errorSearchStr = 'введите поисковый запрос'
    //   } else {
    //     this.errorSearchStr = 'дополните строку поиска'
    //     this.searchResult = []
    //   }
    // },
    errorSearch () {
      this.errorSearchStr = 'нет результатов поиска';
      this.searchResult = []
    },
    getSearhcResult () {
      let searchStrOld = '';
      this.searchResult = [];
      searchStrOld = this.searchStr;
      fetch('api/search/onProducts?page=0&searchString=' + this.searchStr + '&searchType=ALL', {
        method: 'get',
        credentials: 'include'
      }).then(response => {
        if (response.ok) {
          if (searchStrOld === this.searchStr) {
            // response.json().then(commits => commits.forEach(item => this.searchResult.push(item)))
            response.json().then(commits => {
              for (let i = 0; i < commits.length; i++) {
                if (searchStrOld === this.searchStr) {
                  this.errorSearchStr = 'поиск по товарам';
                  this.searchResult.push(commits[i])
                } else {
                  this.searchResult = [];
                  this.errorSearchStr = 'поиск по товарам';
                  break
                }
              }
            })
          }
        } else {
          this.errorSearch()
        }
      })
    }
  },
  watch: {
    searchStr: function () {
      if (this.searchStr.length > 3) {
        this.errorSearchStr = 'поиск по товарам';
        this.getSearhcResult()
      } else if (this.searchStr.length === 0) {
        this.errorSearchStr = 'введите поисковый запрос'
      } else {
        this.errorSearchStr = 'дополните строку поиска';
        this.searchResult = []
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
