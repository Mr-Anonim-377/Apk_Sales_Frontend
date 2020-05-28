<template>
  <section class="section">
    <div class="section_main">
      <div class="main_back main"></div>
      <div class="main_border">
        <CatalogItemFilter
          v-if="products.length >0 || isError"
          :totalMinPrice="totalMinPrice"
          :totalMaxPrice="totalMaxPrice"
          :categoryId='categoryId'
          :numPage='page'
          :collectionIds='collectionIdsArray'
          :productCount="products.length"
          :priceMin="currentPriceMin.toFixed(2)"
          :priceMax="currentPriceMax.toFixed(2)"
          v-on:filterChangeData="saveFilterData($event)"></CatalogItemFilter>
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
            <div class="notfound">
              <div class="error_catalog_container">
                <div class="error_catalog"></div>
              </div>
              <div class="error_catalog_text_container" >
                <h1>Ничего не найдено</h1>
                <h2>Товары по вашему запросу не найдены</h2>
              </div>
            </div>
          </div>
          <div class="product-description_title product-description_title_new" v-if="products.length > 0">
            Все товары категории "{{categoryName}}" :
          </div>
          <CatalogItemProduct
            v-for="(productCategory, index) in products" :key="index"
            :productCategory="productCategory"
            :user="user"
            v-on:addProduct="refreshProductCount($event)"
            />
        </div>
      </div>
      <div class="pagination" v-if="products.length > 0">
        <div class="error_pagination_non" v-if="this.isError"></div>
        <ul id="pagination-digg"
            v-if="!this.isError">
          <li v-bind:class="getPreviousClass()">
            <a v-if="page>1"
               v-bind:href="'/catalog/category=' + categoryId +
          '&page=' + (Number.parseInt(this.page)-1) +
          '&collections=' +getStrByArray(collectionIdsArray) +
          '&price-min='+ currentPriceMin.toFixed(2) +
          '&price-max=' + currentPriceMax.toFixed(2)">«Previous</a>
            <p v-if="Number.parseInt(page) === 1"
            >«Previous</p>
          </li>
          <li v-for="(numPage) in pagesArray">
            <a
              v-bind:class=isLiActive(numPage+1)
              v-bind:href="'/catalog/category=' + categoryId +
          '&page=' + (numPage+1) +
          '&collections=' +getStrByArray(collectionIdsArray) +
          '&price-min='+ currentPriceMin.toFixed(2) +
          '&price-max=' + currentPriceMax.toFixed(2)">{{numPage+1}}</a>
          </li>
          <li v-bind:class="getNextClass()">
            <a
              v-if="Number.parseInt(page)<Number.parseInt(totalPage)"
              v-bind:href="'/catalog/category=' + categoryId +
          '&page=' + (Number.parseInt(this.page)+1) +
          '&collections=' +getStrByArray(collectionIdsArray) +
          '&price-min='+ currentPriceMin.toFixed(2) +
          '&price-max=' + currentPriceMax.toFixed(2)">
              Next »</a>
            <p v-if="Number.parseInt(page) === Number.parseInt(totalPage)"
            >Next »</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import CatalogItemProduct from './CatalogProduct'
import CatalogItemFilter from './CatalogCategoryFilter'

export default {
  props: {
    user: {},
    priceMin: {},
    priceMax: {},
    collectionIds: {},
    categoryId: {},
    page: {}
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
    refreshCollectionIds () {
      let array = (JSON.parse(this.currentRequestJson)).collectionIds;
      this.refreshCollectionIdByArray(array)
    },
    refreshCollectionIdByArray (array) {
      this.collectionIdsArray = [];
      for (let i = 0; i < array.length; i++) {
        this.collectionIdsArray.push(array[i])
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
    saveFilterData (body) {
      this.currentRequestJson = body;
      this.refreshCollectionIds()
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
    }
  },
  name: 'CatalogItem',
  data () {
    return {
      totalMaxPrice: 0,
      totalMinPrice: 0,
      currentPriceMin: 0,
      currentPriceMax: 0,
      totalPage: 0,
      collectionIdsArray: [],
      currentRequestJson: {},
      pagesArray: [],
      products: [],
      isError: false,
      categoryName: ''
    }
  },
  components: {
    CatalogItemProduct,
    CatalogItemFilter
  },
  created: function init () {
    fetch(process.env.HOST + '/api/category/all/getPriceBetween?categoryId=' + this.categoryId, {
      method: 'get'
    })
      .then(response => response.json())
      // eslint-disable-next-line no-return-assign
      .then(commits => {
        if (commits.type !== 'InternalServerError') {
          this.collections = commits;
          this.currentPriceMin = Number.parseInt(this.priceMin);
          this.currentPriceMax = Number.parseInt(this.priceMax);
          if (this.priceMin === undefined) {
            var totalMinPrice = Number.parseInt(commits.totalMinPrice);
            this.currentPriceMin = totalMinPrice
          }
          if (this.priceMax === undefined) {
            var totalMaxPrice = Number.parseInt(commits.totalMaxPrice);
            this.currentPriceMax = totalMaxPrice
          }
          this.refreshPages();
          var collections = [];
          if (this.collectionIds !== undefined) {
            collections = this.collectionIds.split('_')
          }
          this.refreshCollectionIdByArray(collections);
          this.currentRequestJson = {categoryId: this.categoryId,
            page: Number.parseInt(this.page) - 1,
            minPrice: this.currentPriceMin,
            maxPrice: this.currentPriceMax,
            collectionIds: collections
          };
          fetch(process.env.HOST + '/api/products/category', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.currentRequestJson)
          })
            .then(response => response.json())
            // eslint-disable-next-line no-return-assign
            .then(commits => {
              if (commits.type === 'NoSuchObj') {
                this.isError = true
              } else {
                commits.products.forEach(item => this.products.push(item));
                this.categoryName = commits.categoryName;
                this.totalMinPrice = Math.floor(Number.parseFloat(totalMinPrice));
                this.totalMaxPrice = Math.round(Number.parseFloat(totalMaxPrice));
                this.totalPage = Number.parseInt(commits.pageCount);
                this.refreshPages()
              }
            })
        }
      })
  }
}
</script>

<style>
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
    left: 53%;
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
</style>
