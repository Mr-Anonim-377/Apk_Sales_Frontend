<template>
  <div class="main_filters ">
    <div class="main_color"></div>
    <div class="main_filter_container">
      <div class="main_filter">
        <p class="text_color">Коллекции</p>
      </div>
      <div class="main_filter_unit">
        <ul class="main_category_list text_color">
          <li class="category_list_item"
              v-for="(collection, index) in collections"
              @click="providerCollectionInFilter(index)"
              v-bind:style="collectionIsColor(index)">
            <span class="category_list_link">{{collection.collectionName}}</span>
          </li>
        </ul>
      </div>
      <div class="main_filter">
        <p class="text_color">Категории</p>
      </div>
      <div class="main_filter_unit">
        <ul class="main_category_list text_color">
          <li class="category_list_item"
              v-for="(category, index) in categories"
              @click="providerCategoryInFilter(index)"
              v-bind:style="categoryIsColor(index)">
            <span class="category_list_link">{{category.categoryName}}</span>
          </li>
        </ul>
      </div>
      <div class="filter-range">
        <div class="filter-range-title"><a class="text_prise">Цена(₽):</a></div>
        <div class="price-controls">
          <input type="text" class="min-price" v-bind:placeholder="'от ' + totalMinPrice" v-model.number="minPrice">
          <input type="text" class="max-price" v-bind:placeholder="'от ' + totalMaxPrice" v-model.number="maxPrice">
        </div>
      </div>
      <div class="btn_border">
        <a class="btn_search"
           v-bind:href="'http://localhost:8081/search/page=1&searchStr=' + searchStr +
           '&collectionsIds=' + getStrByArray(getIds()) +
           '&categoryIds=' + getStrByArray(getCategoryIds()) + '&price-min=' + minPrice.toFixed(2) + '&price-max=' + maxPrice.toFixed(2)">Начать поиск</a>
      </div>
    </div>
  </div>
</template>

<script>
import CatalogItem from '../CategoryCatalog/CatalogCategory'

export default {
  name: 'CatalogItemFilter',
  components: {CatalogItem},
  props: {
    searchStr: {},
    priceMin: {},
    priceMax: {},
    collectionIds: [],
    numPage: {},
    categoryIds: []
  },
  data () {
    return {
      totalMinPrice: 0,
      totalMaxPrice: 10000,
      ids: [],
      collectionColorIsNumber: -1,
      filterClickColor: {
        background: '#9974fb'
      },
      mouseMoveColor: {
        background: 'rgba(153,116,251,0.61)'
      },
      minPrice: Number.parseFloat(this.priceMin),
      maxPrice: Number.parseFloat(this.priceMax),
      collections: [],
      categories: [],
      collectionFilters: [],
      categoryFilters: [],
      categoryColorIsNumber: -1
    }
  },
  methods: {
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
    setColor (isColor, num) {
      if (isColor) {
        this.collectionColorIsNumber = num
      } else {
        this.collectionColorIsNumber = -1
      }
    },
    collectionIsColor (index) {
      for (let i = 0; i < this.collectionFilters.length; i++) {
        if (this.collectionFilters[i].index === index) {
          return this.filterClickColor
        }
      }
      if (index === this.collectionColorIsNumber) {
        return this.mouseMoveColor
      }
      return ''
    },
    categoryIsColor (index) {
      for (let i = 0; i < this.categoryFilters.length; i++) {
        if (this.categoryFilters[i].index === index) {
          return this.filterClickColor
        }
      }
      if (index === this.categoryColorIsNumber) {
        return this.mouseMoveColor
      }
      return ''
    },
    providerCollectionInFilter (index) {
      for (let i = 0; i < this.collectionFilters.length; i++) {
        if (this.collectionFilters[i].index === index) {
          this.collectionFilters.splice(i, 1);
          return
        }
      }
      this.collectionFilters.push({index: index, collectionId: this.collections[index].collectionId})
    },
    providerCategoryInFilter (index) {
      for (let i = 0; i < this.categoryFilters.length; i++) {
        if (this.categoryFilters[i].index === index) {
          this.categoryFilters.splice(i, 1);
          return
        }
      }
      this.categoryFilters.push({index: index, categoryId: this.categories[index].categoryId})
    },
    setMaxWidth () {
      this.tmpMinInpWidth = this.minInpWidth;
      this.tmpMaxPrice = this.maxPrice;
      this.maxInpWidth = (this.absRange - this.minPrice) * (100 / this.absRange)
    },
    setMinWidth () {
      this.tmpMaxInpWidth = this.maxInpWidth;
      this.tmpMinPrice = this.minPrice;
      this.minInpWidth = (this.absRange - (this.absRange - this.maxPrice)) * (100 / this.absRange)
    },
    setCollectionIdsArray () {
      this.ids = [];
      this.collectionFilters.forEach(item => this.ids.push(item.collectionId))
    },
    getIds () {
      this.setCollectionIdsArray();
      return this.ids
    },
    getCategoryIds () {
      var categoryIds = [];
      this.categoryFilters.forEach(item => categoryIds.push(item.categoryId));
      return categoryIds;
    }
  },
  watch: {
    minPrice: function () {
      this.setMaxWidth()
    },
    maxPrice: function () {
      this.setMinWidth()
    }
  },
  created: function init () {
    fetch(process.env.HOST + '/api/collection/all', {
      method: 'get'
    })
      .then(response => response.json())
    // eslint-disable-next-line no-return-assign
      .then(commits => {
        if (commits.type !== 'InternalServerError') {
          for (let i = 0; i < commits.length; i++) {
            for (let ii = 0; ii < this.collectionIds.length; ii++) {
              if (Number.parseInt(this.collectionIds[ii]) === commits[i].collectionId) {
                this.collectionFilters.push({index: i, collectionId: commits[i].collectionId})
              }
            }
          }
          this.collections = commits
        }
      });
    fetch(process.env.HOST + '/api/category/all', {
      method: 'get'
    })
      .then(response => response.json())
    // eslint-disable-next-line no-return-assign
      .then(commits => {
        if (commits.type !== 'InternalServerError') {
          for (let i = 0; i < commits.length; i++) {
            for (let ii = 0; ii < this.categoryIds.length; ii++) {
              if (Number.parseInt(this.categoryIds[ii]) === commits[i].categoryId) {
                this.categoryFilters.push({index: i, categoryId: commits[i].categoryId})
              }
            }
          }
          this.categories = commits
        }
      })
  }
}
</script>

<style>

  a:hover {
    text-decoration: none;
    color: #09333f;
  }

  .range-slider {
    width: 230px;
    margin: auto 16px;
    text-align: center;
    position: relative;
    z-index: 100;
  }

  .range-slider svg, .range-slider input[type=range] {
    position: absolute;
  }

  input[type=range]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;
  }

  .btn_search {
    font-size: 15px;
    font-family: Alef, serif;
    -moz-user-select: none;
    -ms-user-select: none;
    color: #09333f;
  }

  .btn_search,
  .btn_search:active,
  .btn_search:hover {
    text-decoration: none;
  }

  .input_filter_max {
    right: 0;
    bottom: 0;
    width: 70%;
    -webkit-appearance: none;
    height: 2px;
    background: #ffffff;
    outline: none;
  }

  .input_filter_min {
    left: 0;
    bottom: 0;
    width: 30%;
    -webkit-appearance: none;
    height: 2px;
    background: #ffffff;
    outline: none;
  }

  .input_filter_min::-webkit-slider-thumb,
  .input_filter_max::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 4px;
    height: 4px;
    background: #2377a7;;
    border: 8px solid #2377a7;;
    border-radius: 50%;
    box-shadow: 0 2px 1px 0 rgba(0, 1, 1, 0.2);
    cursor: pointer;
  }

  .collection_list_error {
    font-family: Roboto, serif;
    font-style: italic;
    font-weight: normal;
    font-size: 23px;
    text-align: left;
    z-index: 90;
    height: 86px;
    margin-left: 2%;
  }
</style>
