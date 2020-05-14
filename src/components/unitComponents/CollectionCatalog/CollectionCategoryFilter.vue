<template>
  <div class="main_filters ">
    <div class="main_color"></div>
    <div class="main_filter_container">
      <div class="main_filter">
        <p class="text_color">Категории</p>
      </div>
      <div class="main_filter_unit">
        <ul class="main_category_list text_color">
          <li class="category_list_item"
              v-for="(category, index) in categories"
              @click="providerCollectionInFilter(index)"
              v-bind:style="collectionIsColor(index)">
            <span class="category_list_link">{{category.category_name}}</span>
          </li>
        </ul>
      </div>
      <div class="filter-range">
        <div class="filter-range-title"><a class="text_prise">Цена(₽):</a></div>
        <div class="price-controls">
          <input type="text" class="min-price" v-bind:placeholder="'от ' + totalMinPrice" v-model="minPrice">
          <input type="text" class="max-price" v-bind:placeholder="'до ' + totalMaxPrice" v-model="maxPrice">
        </div>
      </div>
      <div class="btn_border">
        <a class="btn_search"
           v-bind:href="'http://localhost:8081/collection/collectionId=' + collectionId +
            '&page=' + 1 +
            '&categoryIds=' +getStrByArray(getIds()) +
            '&price-min='+ minPriceUrl +
            '&price-max=' + maxPriceUrl">Применить</a>
      </div>
    </div>
  </div>
</template>

<script>
import CatalogItem from './CollectionCatalog'

export default {
  name: 'CatalogItemFilter',
  components: {CatalogItem},
  props: {
    totalMinPrice: {},
    totalMaxPrice: {},
    priceMin: {},
    priceMax: {},
    categoryIds: [],
    numPage: {},
    collectionId: {}
  },
  data () {
    return {
      ids: [],
      categoryColorIsNumber: -1,
      filterClickColor: {
        background: '#9974fb'
      },
      mouseMoveColor: {
        background: 'rgba(153,116,251,0.61)'
      },
      minPrice: '',
      minPriceUrl: '',
      maxPrice: '',
      maxPriceUrl: '',
      categories: [],
      categoriesFilters: []
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
        this.categoryColorIsNumber = num
      } else {
        this.categoryColorIsNumber = -1
      }
    },
    collectionIsColor (index) {
      for (let i = 0; i < this.categoriesFilters.length; i++) {
        if (this.categoriesFilters[i].index === index) {
          return this.filterClickColor
        }
      }
      if (index === this.categoryColorIsNumber) {
        return this.mouseMoveColor
      }
      return ''
    },
    providerCollectionInFilter (index) {
      for (let i = 0; i < this.categoriesFilters.length; i++) {
        if (this.categoriesFilters[i].index === index) {
          this.categoriesFilters.splice(i, 1);
          return
        }
      }
      this.categoriesFilters.push({index: index, categoryId: this.categories[index].category_id})
    },
    setCollectionIdsArray () {
      this.ids = [];
      this.categoriesFilters.forEach(item => this.ids.push(item.categoryId))
    },
    getIds () {
      this.setCollectionIdsArray();
      return this.ids
    }
  },
  watch: {
    minPrice: function () {
      this.minPrice = this.minPrice.replace(/\D/, '');
      if (this.minPrice === '') {
        this.minPriceUrl = ''
      } else {
        this.minPriceUrl = Number.parseInt(this.minPrice).toFixed(2)
      }
    },
    maxPrice: function () {
      this.maxPrice = this.maxPrice.replace(/\D/, '');
      if (this.maxPrice === '') {
        this.maxPriceUrl = ''
      } else {
        this.maxPriceUrl = Number.parseInt(this.maxPrice).toFixed(2)
      }
    }
  },
  created: function init () {
    var min = Number.parseFloat(this.priceMin);
    if (min !== Number.parseFloat(this.totalMinPrice)) {
      this.minPrice = min;
      this.minPriceUrl = min.toFixed(2)
    }
    var max = Number.parseFloat(this.priceMax);
    if (max !== Number.parseFloat(this.totalMaxPrice)) {
      this.maxPrice = max;
      this.maxPriceUrl = max.toFixed(2)
    }
    fetch(process.env.HOST + '/api/category/all/byProductOfCollection?collectionId=' + this.collectionId, {
      method: 'get'
    })
      .then(response => response.json())
    // eslint-disable-next-line no-return-assign
      .then(commits => {
        if (commits.type !== 'InternalServerError') {
          for (let i = 0; i < commits.length; i++) {
            for (let ii = 0; ii < this.categoryIds.length; ii++) {
              if (Number.parseInt(this.categoryIds[ii]) === commits[i].category_id) {
                this.categoriesFilters.push({index: i, categoryId: commits[i].category_id})
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
