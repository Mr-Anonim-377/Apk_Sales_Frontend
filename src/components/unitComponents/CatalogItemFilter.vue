<template>
  <div class="main_filters ">
    <div class="main_color"></div>
    <div class="main_filter_container">
      <div class="main_filter">
        <a class="text_color">Коллекции</a>
      </div>
      <div class="main_filter_collection">
        <ul class="main_category_list text_color">
          <li class="category_list_item">
            <a class="category_list_link">Электроника</a>
          </li>
          <li class="category_list_item">
            <a class="category_list_link">Электроника</a>
          </li>
          <li class="category_list_item">
            <a class="category_list_link">Электроника</a>
          </li>
          <li class="category_list_item">
            <a class="category_list_link">Электроника</a>
          </li>
          <li class="category_list_item">
            <a class="category_list_link">Электроника</a>
          </li>
          <li class="category_list_item">
            <a class="category_list_link">Электроника</a>
          </li>
        </ul>
      </div>
      <div class="filter-range">
        <div class="filter-range-title"><a class="text_prise">Цена(р):</a></div>
        <div class="price-controls">
          <label class="min-price">от {{minPrice}}</label>
          <label class="max-price">до {{maxPrice}}</label>
        </div>
        <div class="range-slider">
          <input class="input_filter_min"
                 type="range"
                 min="0"
                 step="1"
                 @focus="setMaxWidth"
                 v-bind:max="tmpMaxPrice"
                 v-model.number="minPrice"
                 v-bind:style="{width: tmpMinInpWidth + '%'}"
          >
          <input class="input_filter_max"
                 type="range"
                 max="10000"
                 step="1"
                 @focus="setMinWidth"
                 v-bind:min="tmpMinPrice"
                 v-model.number="maxPrice"
                 v-bind:style="{width: tmpMaxInpWidth + '%'}"
          >
        </div>
      </div>
      <button class="btn_search"> Начать поиск</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatalogItemFilter',
  components: {},
  props: {},
  data () {
    return {
      tmpMaxPrice: 10000,
      tmpMinPrice: 0,
      tmpMinInpWidth: 100,
      tmpMaxInpWidth: 100,
      minPrice: 0,
      maxPrice: 10000,
      minInpWidth: 100,
      maxInpWidth: 100,
      absRange: 10000,
      products: []
    }
  },
  methods: {
    setMaxWidth () {
      this.tmpMinInpWidth = this.minInpWidth;
      this.tmpMaxPrice = this.maxPrice;
      this.maxInpWidth = (this.absRange - this.minPrice) * (100 / this.absRange)
    },
    setMinWidth () {
      this.tmpMaxInpWidth = this.maxInpWidth;
      this.tmpMinPrice = this.minPrice;
      this.minInpWidth = 100 - (this.absRange - this.maxPrice) * (100 / this.absRange)
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
    fetch(process.env.HOST + '/api/products/category', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        maxPrice: 100,
        minPrice: 0,
        page: 0
      })
    })
      .then(response => response.json())
    // eslint-disable-next-line no-return-assign
      .then(commits => this.products = commits)
      .catch(function (error) {
        console.log('Request failed', error)
      })
  }
}
</script>

<style>
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
    color: #000000;
    font-family: Alef, serif;
    -moz-user-select: none;
    -ms-user-select: none;
    height: 35px;
    background: #AAD9E0;
    border-radius: 6px;
    z-index: 100;
    margin-bottom: 10%;
    position: relative;
    margin-top: 5%;
    margin-left: 25%;
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
</style>
