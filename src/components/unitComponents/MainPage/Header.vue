<template>
  <header class="header">
    <div class="head_body">
      <div class="header_blur"></div>
      <div class="container">
        <div class="row_news">
          <a class="row_logo"
             href="http://localhost:8081/">
            <img
              class="logo_pictures active_grayscale"
              src="https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/Logotip.png"
            >
          </a>
          <div class="input" v-on-clickaway="onClickOutside">
            <input class="input_search" autocomplete="off" placeholder="Искать здесь.."
                   v-model="searchStr" @focus="isVisible = true">
            <div class="search_pop_up" v-if="isVisible">
              <div class="pop_up__blur"></div>
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
                  <a class="search_result_product__img" v-bind:href="'http://localhost:8081/card/'+product.productId">
                    <img v-bind:src="product.image.imagePatch" alt="">
                  </a>
                  <a class="search_result_product__name__container"
                     v-bind:href="'http://localhost:8081/card/'+product.productId">
                    <div class="search_result_product__name">
                      <span>{{product.nameProduct}}</span>
                    </div>
                    <span class="search_result_product__price">{{product.price}}
                      <span class="product-price-currents">₽</span>
                      </span>
                  </a>
                  <div class="search_product_cart_interactions__container">
                    <div class="search_product_cart_interactions">
                      <img class="search_product_cart_img search_product_cart_img_message"
                           src="../../../../static/CSS/pictures/reviews.png" alt=""/></div>
                    <div class="search_product_cart_interactions"
                         @click="addProduct(product)">
                      <img class="search_product_cart_img search_product_cart_img_basked"
                           src="../../../../static/CSS/pictures/basket.png" alt=""/></div>
                  </div>
                </div>
                <a
                  v-bind:href="'http://localhost:8081/search/page=1&searchStr=' + searchStr.split(' ').join('%20') +
                  '&collectionsIds=&categoryIds=&price-min=&price-max='">
                  <div class="show_more" v-if="searchResult.length >= 4">Показать все</div>
                </a>
              </div>
            </div>
          </div>
          <div class="basket_regist">

              <div class="image_header_conatiner">
                <div class="basket_product_count">
                  {{shopingCard.countProducts === null || shopingCard.countProducts === "0"
                  ?0
                  :shopingCard.countProducts}}
                </div>
                <a href="/shoppingCart">
                  <img class="active_grayscale" src="https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/Korzina.png">
                </a>
              </div>
            <div class="image_header_conatiner image_header_conatiner_mmargin_left" v-on-clickaway="logInOutsideClick">
              <a>
                <div @click="isUserPopUp = true">
                  <img class="active_grayscale" src="https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/log_in 1.png">
                </div>
              </a>
              <div class="logInPopUp_container" v-if="isUserPopUp">
                <LogInPopUp v-if="!isUserAuthorized"
                            v-on:refreshUser="refreshUser($event)"></LogInPopUp>
              <AutorizedUserData :user="user"
                                 v-if="isUserAuthorized"
                                 v-on:refreshUser="refreshUser($event)"></AutorizedUserData>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import LogInPopUp from '../UserAction/LogAndSignlnPopUp'
import AutorizedUserData from '../UserAction/Autorezed/AutorizedUzerData'
import {directive as onClickaway} from 'vue-clickaway'

export default {
  components: {LogInPopUp,
    AutorizedUserData},
  directives: {
    onClickaway: onClickaway
  },
  props: {
    shopingCard: {}
  },

  data () {
    return {
      user: {},
      filterClickColor: {
        background: '#9974fb'
      },
      colorIsNumber: -1,
      errorSearchStr: 'введите поисковый запрос',
      searchStr: '',
      searchStrOld: '',
      searchResult: [],
      searchResultVisible: '',
      isVisible: false,
      isUserPopUp: false,
      isUserAuthorized: false
    }
  },
  component: {
    LogInPopUp
  },
  methods: {
    addProduct (product) {
      fetch(process.env.HOST + '/api/shoppingCart?numberPieces=1&' + 'productId=' + product.productId, {
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
        .then(response => this.$emit('addProduct', true))
    },
    onClickOutside () {
      this.isVisible = false
    },
    logInOutsideClick () {
      this.isUserPopUp = false
    },
    indexOfColored (number) {
      if (number === this.colorIsNumber) {
        return this.filterClickColor
      }
    },
    setColor (isColor, num) {
      if (isColor) {
        this.colorIsNumber = num
      } else {
        this.colorIsNumber = -1
      }
    },
    errorSearch () {
      this.errorSearchStr = 'нет результатов поиска';
      this.searchResult = []
    },
    getSearhcResult () {
      let searchStrOld = '';
      this.searchResult = [];
      searchStrOld = this.searchStr;
      fetch(process.env.HOST + '/api/search/onProducts', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          page: 0,
          searchString: '%' + this.searchStr + '%',
          searchType: 'ALL'
        })
      }).then(response => {
        if (response.ok) {
          if (searchStrOld === this.searchStr) {
            // response.json().then(commits => commits.forEach(itemCity => this.searchResult.push(itemCity)))
            response.json().then(commits => {
              for (let i = 0; i < commits.products.length; i++) {
                if (searchStrOld === this.searchStr) {
                  this.errorSearchStr = 'поиск по товарам';
                  this.searchResult.push(commits.products[i])
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
    },
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
              this.$emit('refreshUser', this.user)
            } else {
              this.user = {};
              this.isUserAuthorized = false;
              this.$emit('refreshUser', this.user)
            }
          })
      }
    }
  },
  created: function init () {
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

<style >
  .image_header_conatiner_mmargin_left {
    margin-left: 11%;
  }

  .logInPopUp_container {
    position: absolute;
    min-height: 70px;
    top: 76%;
    left: 76.5%;
  }
  .active_grayscale:active {
    filter: grayscale(50%)
  }
</style>
