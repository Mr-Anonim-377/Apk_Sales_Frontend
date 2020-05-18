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
            <span class="category_list_link">{{collection.collection_name}}</span>
          </li>
        </ul>
      </div>
      <div class="filter-range">
        <div class="filter-range-title"><a class="text_prise">Цена(₽):</a></div>
        <div class="price-controls">
          <input class="min-price" maxlength="7"  v-bind:placeholder="'от ' + totalMinPrice" v-model="minPrice">
          <input class="max-price" maxlength="7" v-bind:placeholder="'до ' + totalMaxPrice" v-model="maxPrice">
        </div>
      </div>
      <div class="btn_border">
<a class="btn_search"
v-bind:href="'http://localhost:8081/catalog/category=' + categoryId +
'&page=' + 1 +
'&collections=' +getStrByArray(getIds()) +
'&price-min='+ minPriceUrl +
'&price-max=' + maxPriceUrl ">Применить</a>
      </div>
    </div>
  </div>
</template>

<script>
import CatalogItem from './CatalogCategory'

export default {
  name: 'CatalogItemFilter',
  components: {CatalogItem},
  props: {
    totalMinPrice: {},
    totalMaxPrice: {},
    priceMin: {},
    priceMax: {},
    productCount: {},
    collectionIds: [],
    numPage: {},
    categoryId: {}
  },
  data () {
    return {
      ids: [],
      colorIsNumber: -1,
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
      collections: [],
      collectionFilters: []
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
        this.colorIsNumber = num
      } else {
        this.colorIsNumber = -1
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
    providerCollectionInFilter (index) {
      for (let i = 0; i < this.collectionFilters.length; i++) {
        if (this.collectionFilters[i].index === index) {
          this.collectionFilters.splice(i, 1);
          return
        }
      }
      this.collectionFilters.push({index: index, collectionId: this.collections[index].collection_id})
    },
    setCollectionIdsArray () {
      this.ids = [];
      this.collectionFilters.forEach(item => this.ids.push(item.collectionId))
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
    fetch(process.env.HOST + '/api/collection/all/byProductOfCategory?categoryId=' + this.categoryId, {
      method: 'get'
    })
      .then(response => response.json())
    // eslint-disable-next-line no-return-assign
      .then(commits => {
        if (commits.type !== 'InternalServerError') {
          for (let i = 0; i < commits.length; i++) {
            for (let ii = 0; ii < this.collectionIds.length; ii++) {
              if (Number.parseInt(this.collectionIds[ii]) === commits[i].collection_id) {
                this.collectionFilters.push({index: i, collectionId: commits[i].collection_id})
              }
            }
          }
          this.collections = commits
        }
      })
  }
}
</script>

<style>

  a:hover{
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
  .btn_search:hover{
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
