<template>
  <section class="section">
    <div class="section_main">
      <div class="main_back main"></div>
      <div class="main_border">
        <CollectionFilter
          v-if="products.length >0 || isError"
          :totalMinPrice="totalMinPrice"
          :totalMaxPrice="totalMaxPrice"
          :collectionId='collectionId'
          :numPage='page'
          :categoryIds='categoryIdsArray'
          :productCount="products.length"
          :priceMin="currentPriceMin.toFixed(2)"
          :priceMax="currentPriceMax.toFixed(2)"
          v-on:filterChangeData="saveFilterData($event)"></CollectionFilter>
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
          <CatalogProduct
            v-for="productCategory in products"
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
               v-bind:href="'http://localhost:8081/collection/collectionId=' + collectionId +
            '&page=' + (Number.parseInt(this.page)-1) +
            '&categoryIds=' +getStrByArray(categoryIdsArray) +
            '&price-min='+ currentPriceMin.toFixed(2) +
            '&price-max=' + currentPriceMax.toFixed(2)">«Previous</a>
            <p v-if="Number.parseInt(page) === 1"
            >«Previous</p>
          </li>
          <li v-for="(numPage) in pagesArray">
            <a
              v-bind:class=isLiActive(numPage+1)
              v-bind:href="'http://localhost:8081/collection/collectionId=' + collectionId +
            '&page=' + (numPage+1) +
            '&categoryIds=' +getStrByArray(categoryIdsArray) +
            '&price-min='+ currentPriceMin.toFixed(2) +
            '&price-max=' + currentPriceMax.toFixed(2)">{{numPage+1}}</a>
          </li>
          <li v-bind:class="getNextClass()">
            <a
              v-if="Number.parseInt(page)<Number.parseInt(totalPage)"
              v-bind:href="'http://localhost:8081/collection/collectionId=' + collectionId +
            '&page=' + (Number.parseInt(this.page)+1) +
            '&categoryIds=' +getStrByArray(categoryIdsArray) +
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
import CatalogProduct from '../CategoryCatalog/CatalogProduct'
import CollectionFilter from '../CollectionCatalog/CollectionCategoryFilter'

export default {
  props: {
    user: {},
    priceMin: {},
    priceMax: {},
    categoryIds: {},
    collectionId: {},
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
      let array = (JSON.parse(this.currentRequestJson)).categoryIds;
      this.refreshCollectionIdByArray(array)
    },
    refreshCollectionIdByArray (array) {
      this.categoryIdsArray = [];
      for (let i = 0; i < array.length; i++) {
        this.categoryIdsArray.push(array[i])
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
      categoryIdsArray: [],
      currentRequestJson: {},
      pagesArray: [],
      products: [],
      isError: false
    }
  },
  components: {
    CatalogProduct,
    CollectionFilter
  },
  created: function init () {
    fetch(process.env.HOST + '/api/collection/all/getPriceBetween?collectionId=' + this.collectionId, {
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
          var categoryIds = [];
          if (this.categoryIds !== undefined) {
            categoryIds = this.categoryIds.split('_')
          }
          this.refreshCollectionIdByArray(categoryIds);
          this.currentRequestJson = {collectionId: this.collectionId,
            page: Number.parseInt(this.page) - 1,
            minPrice: this.currentPriceMin,
            maxPrice: this.currentPriceMax,
            categoryIds: categoryIds
          };
          fetch(process.env.HOST + '/api/products/collection', {
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

  .error_pagination_non {
    width: 100%;
    height: 73px;
  }
</style>
