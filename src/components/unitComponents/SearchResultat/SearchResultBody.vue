<template>
  <section class="section">
    <div class="section_main">
      <div class="main_back main"></div>
      <div class="main_border">
        <SearchResultFilter
          :totalMaxPrice="totalMaxPrice"
          :totalMinPrice="totalMinPrice"
          :searchStr="searchStr"
          :priceMin="currentPriceMin"
          :priceMax="currentPriceMax"
          :collectionIds="getCollectionIds()"
          :numPage="Number.parseInt(page)"
          :categoryIds="getCategoryIds()"
        ></SearchResultFilter>
        <div class="main_section">
          <div class="loader" v-if="products.length === 0 && isError === false ">
            <div class="l_main">
              <div class="l_square"><span></span><span></span><span></span></div>
              <div class="l_square"><span></span><span></span><span></span></div>
              <div class="l_square"><span></span><span></span><span></span></div>
              <div class="l_square"><span></span><span></span><span></span></div>
            </div>
          </div>
          <div
            class="catalogError" v-if="isError === true"
            id="notfound">
            <div class="notfound notfound_padding_top">
              <div class="error_catalog_container">
                <div class="error_catalog"></div>
              </div>
              <div class="error_catalog_text_container">
                <h1>Ничего не найдено</h1>
                <h2>Товары по вашему запросу не найдены</h2>
              </div>
            </div>
          </div>
          <div class="product_row_container">
            <div class="product-description_title product-description_title_new"
                 v-if="products.length > 0">Результаты поиска по запросу "{{searchStr}}":
            </div>
            <CatalogItemProduct
              :user="user"
              v-for="(productCategory,index) in products" :key="index"
              :productCategory="productCategory"
              v-on:addProduct="refreshProductCount($event)"></CatalogItemProduct>
          </div>
        </div>
      </div>
      <div class="pagination">
        <div class="error_pagination_non" v-if="isError"></div>
        <ul id="pagination-digg"
            v-if="!isError">
          <li v-bind:class="getPreviousClass()">
            <a v-if="page>1"
               v-bind:href="'/search/page='+(Number.parseInt(page)-1)+'&searchStr=' + searchStr +
                '&collectionsIds=' + getStrByArray(getCollectionIds()) +
                '&categoryIds=' + getStrByArray(getCategoryIds()) +
                 '&price-min=' + priceMin
                  + '&price-max=' + priceMax">«Previous</a>
            <p v-if="Number.parseInt(page) === 1">«Previous</p>
          </li>
          <li v-for="(numPage) in pagesArray">
            <a
              v-bind:class=isLiActive(numPage+1)
              v-bind:href="'/search/page='+Number.parseInt(numPage+1)+'&searchStr=' + searchStr +
                '&collectionsIds=' + getStrByArray(getCollectionIds()) +
                '&categoryIds=' + getStrByArray(getCategoryIds()) +
                 '&price-min=' + priceMin
                  + '&price-max=' + priceMax">{{numPage+1}}</a>
          </li>
          <li v-bind:class="getNextClass()">
            <a
              v-if="Number.parseInt(page)<Number.parseInt(totalPage)"
              v-bind:href="'/search/page='+(Number.parseInt(this.page)+1)+'&searchStr=' + searchStr +
                '&collectionsIds=' + getStrByArray(getCollectionIds()) +
                '&categoryIds=' + getStrByArray(getCategoryIds()) +
                 '&price-min=' + priceMin
                  + '&price-max=' + priceMax">Next »</a>
            <p v-if="Number.parseInt(page) === Number.parseInt(totalPage)"
            >Next »</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import CatalogItemProduct from '../CategoryCatalog/CatalogProduct'
  import SearchResultFilter from './SearchResultFilter'

export default {
  props: {
    totalMaxPrice: {},
    totalMinPrice: {},
    user: {},
    searchStr: {},
    page: {},
    collectionIds: {},
    categoryIds: {},
    priceMin: {},
    priceMax: {}
  },
  methods: {
    refreshPages () {
      this.pagesArray = [];
      let page = Number.parseInt(this.page);
      let maxPage = 0;
      if (this.totalPage < (page + 4)) {
        maxPage = this.totalPage
      } else {
        maxPage = page + 4
      }
      let minPage = 0;
      if (!((page - 4) < 0)) {
        minPage = page - 4
      }
      for (let i = minPage; i < maxPage; i++) {
        this.pagesArray.push(i)
      }
    },
    getStrByArray (array) {
      var str = '';
      if (array !== 0 || array !== null) {
        for (let i = 0; i < array.length; i++) {
          if (i === 0) {
            str = array[i]
          } else {
            str = str + '_' + array[i]
          }
        }
      }
      return str
    },
    isLiActive (num) {
      if (num === Number.parseInt(this.page)) {
        return 'active'
      }
    },
    getPreviousClass () {
      if (Number.parseInt(this.page) === 1) {
        return 'previous-off'
      } else {
        return 'previous'
      }
    },
    getNextClass () {
      if (Number.parseInt(this.page) === Number.parseInt(this.totalPage)) {
        return 'next-off'
      } else {
        return 'next'
      }
    },
    refreshProductCount (isRefresh) {
      if (isRefresh) {
        this.$emit('addProduct', true)
      }
    },
    getCollectionIds () {
      var split = [];
      if (this.collectionIds !== undefined) {
        split = this.collectionIds.split('_')
      }
      var collectionIds = [];
      for (let i = 0; i < split.length; i++) {
        collectionIds.push(Number.parseInt(split[i]))
      }
      return collectionIds
    },
    getCategoryIds () {
      var split = [];
      if (this.categoryIds !== undefined) {
        split = this.categoryIds.split('_')
      }
      var categoryIds = [];
      for (let i = 0; i < split.length; i++) {
        categoryIds.push(Number.parseInt(split[i]))
      }
      return categoryIds
    }
  },
  name: 'CatalogItem',
  data () {
    return {
      currentRequestJson: {},
      currentPriceMin: {},
      currentPriceMax: {},
      totalPage: 0,
      pagesArray: [],
      products: [],
      isError: false
    }
  },
  components: {
    CatalogItemProduct,
    SearchResultFilter
  },
  created: function init () {
    this.currentPriceMin = this.totalMinPrice;
    this.currentPriceMax = this.totalMaxPrice;
    if (this.priceMin !== undefined) {
      this.currentPriceMin = this.priceMin
    }
    if (this.priceMax !== undefined) {
      this.currentPriceMax = this.priceMax
    }
    fetch(process.env.HOST + '/api/search/onProducts', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: (Number.parseInt(this.page) - 1),
        searchString: '%' + this.searchStr + '%',
        searchType: 'ALL',
        categoryIds: this.getCategoryIds(),
        collectionIds: this.getCollectionIds(),
        minPrice: this.currentPriceMin,
        maxPrice: this.currentPriceMax
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(commits => {
          commits.products.forEach(item => this.products.push(item));
          this.totalPage = Number.parseInt(commits.pageCount);
          this.refreshPages()
        })
      } else {
        this.isError = true
      }
    })
  }
}
</script>

<style>
  @import '../../../../static/CSS/CSS.css';

  #pagination-digg {
    border: 0;
    height: 40px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    /*position: absolute;*/
    /*right: 25%;*/
    /*bottom: 5%;*/
    margin-left: 47%;
    /*margin-top: 2%;*/
    margin-bottom: 3%;
  }

  #pagination-digg li {
    border-radius: 6px;
    z-index: 100;
    border: 0;
    margin: 0;
    padding: 0;
    font-size: 11px;
    list-style: none;
    margin-right: 19px;
    height: 100%;
    min-width: 34px;
  }

  #pagination-digg a {
    border-radius: 6px;
    border: solid 2px rgb(207, 167, 226);
    margin-right: 2px;
    height: 100%;
    min-width: 34px;
  }

  #pagination-digg .previous-off {
    margin-right: 19px;
    border: solid 2px rgb(207, 167, 226);
  }

  #pagination-digg .next-off {
    margin-right: 19px;
    border: solid 2px rgb(207, 167, 226);
  }

  #pagination-digg .previous-off,
  #pagination-digg .next-off {
    color: #888888;
    display: block;
    float: left;
    font-weight: bold;
    padding: 3px 4px;
    padding-top: 9px;
  }

  #pagination-digg .previous a {
    margin-right: 2px;
  }

  #pagination-digg .next a,
  #pagination-digg .previous a {
    font-weight: bold;
  }

  #pagination-digg .active {
    border: solid 2px rgb(206, 94, 226);
    background: rgb(206, 94, 226);
    color: #FFFFFF;
    font-weight: bold;
    display: block;
    float: left;
    padding: 4px 6px;
    padding-top: 9px;
  }

  #pagination-digg a:link,
  #pagination-digg a:visited {
    color: #0e509e;
    display: block;
    float: left;
    padding: 9px 6px;
    text-decoration: none;
  }

  #pagination-digg li a:hover {
    border: solid 2px rgb(206, 94, 226);
  }

  .loader {
    height: 100%;
    z-index: 100;
    width: 891px
  }

  .loader .l_main {
    position: absolute;
    top: 40%;
    left: 63%;
    width: 172px;
    height: 128px;
    margin: 0;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%)
  }

  @media (max-width: 550px) {
    .loader {
      -webkit-transform: scale(0.75);
      transform: scale(0.75)
    }
  }

  @media (max-width: 440px) {
    .loader {
      -webkit-transform: scale(0.5);
      transform: scale(0.5)
    }
  }

  .l_square {
    position: relative
  }

  .l_square:nth-child(1) {
    margin-left: 0px
  }

  .l_square:nth-child(2) {
    margin-left: 44px
  }

  .l_square:nth-child(3) {
    margin-left: 88px
  }

  .l_square:nth-child(4) {
    margin-left: 132px
  }

  .l_square span {
    position: absolute;
    top: 0px;
    left: 20px;
    height: 36px;
    width: 36px;
    border-radius: 2px;
    background-color: #af4cfa
  }

  .l_square span:nth-child(1) {
    top: 0px
  }

  .l_square span:nth-child(2) {
    top: 44px
  }

  .l_square span:nth-child(3) {
    top: 88px
  }

  .l_square:nth-child(1) span {
    -webkit-animation: animsquare1 2s infinite ease-in;
    animation: animsquare1 2s infinite ease-in
  }

  .l_square:nth-child(2) span {
    -webkit-animation: animsquare2 2s infinite ease-in;
    animation: animsquare2 2s infinite ease-in
  }

  .l_square:nth-child(3) span {
    -webkit-animation: animsquare3 2s infinite ease-in;
    animation: animsquare3 2s infinite ease-in
  }

  .l_square:nth-child(4) span {
    -webkit-animation: animsquare4 2s infinite ease-in;
    animation: animsquare4 2s infinite ease-in
  }

  .l_square span:nth-child(1) {
    -webkit-animation-delay: 0.00s;
    animation-delay: 0.00s
  }

  .l_square span:nth-child(2) {
    -webkit-animation-delay: 0.15s;
    animation-delay: 0.15s
  }

  .l_square span:nth-child(3) {
    -webkit-animation-delay: 0.30s;
    animation-delay: 0.30s
  }

  @-webkit-keyframes animsquare1 {
    0%, 5%, 95%, 100% {
      -webkit-transform: translate(0px, 0px) rotate(0deg);
      transform: translate(0px, 0px) rotate(0deg)
    }
    30%, 70% {
      -webkit-transform: translate(-40px, 0px) rotate(-90deg);
      transform: translate(-40px, 0px) rotate(-90deg)
    }
  }

  @keyframes animsquare1 {
    0%, 5%, 95%, 100% {
      -webkit-transform: translate(0px, 0px) rotate(0deg);
      transform: translate(0px, 0px) rotate(0deg)
    }
    30%, 70% {
      -webkit-transform: translate(-40px, 0px) rotate(-90deg);
      transform: translate(-40px, 0px) rotate(-90deg)
    }
  }

  @-webkit-keyframes animsquare2 {
    0%, 10%, 90%, 100% {
      -webkit-transform: translate(0px, 0px) rotate(0deg);
      transform: translate(0px, 0px) rotate(0deg)
    }
    35%, 65% {
      -webkit-transform: translate(-40px, 0px) rotate(-90deg);
      transform: translate(-40px, 0px) rotate(-90deg)
    }
  }

  @keyframes animsquare2 {
    0%, 10%, 90%, 100% {
      -webkit-transform: translate(0px, 0px) rotate(0deg);
      transform: translate(0px, 0px) rotate(0deg)
    }
    35%, 65% {
      -webkit-transform: translate(-40px, 0px) rotate(-90deg);
      transform: translate(-40px, 0px) rotate(-90deg)
    }
  }

  @-webkit-keyframes animsquare3 {
    0%, 15%, 85%, 100% {
      -webkit-transform: translate(0px, 0px) rotate(0deg);
      transform: translate(0px, 0px) rotate(0deg)
    }
    40%, 60% {
      -webkit-transform: translate(-40px, 0px) rotate(-90deg);
      transform: translate(-40px, 0px) rotate(-90deg)
    }
  }

  @keyframes animsquare3 {
    0%, 15%, 85%, 100% {
      -webkit-transform: translate(0px, 0px) rotate(0deg);
      transform: translate(0px, 0px) rotate(0deg)
    }
    40%, 60% {
      -webkit-transform: translate(-40px, 0px) rotate(-90deg);
      transform: translate(-40px, 0px) rotate(-90deg)
    }
  }

  @-webkit-keyframes animsquare4 {
    0%, 20%, 80%, 100% {
      -webkit-transform: translate(0px, 0px) rotate(0deg);
      transform: translate(0px, 0px) rotate(0deg)
    }
    45%, 55% {
      -webkit-transform: translate(-40px, 0px) rotate(-90deg);
      transform: translate(-40px, 0px) rotate(-90deg)
    }
  }

  @keyframes animsquare4 {
    0%, 20%, 80%, 100% {
      -webkit-transform: translate(0px, 0px) rotate(0deg);
      transform: translate(0px, 0px) rotate(0deg)
    }
    45%, 55% {
      -webkit-transform: translate(-40px, 0px) rotate(-90deg);
      transform: translate(-40px, 0px) rotate(-90deg)
    }
  }

  .error_pagination_non {
    width: 100%;
    height: 73px;
  }

  .notfound_padding_top {
    margin-top: 3%;
  }

  .product_row_container {
  }
</style>
