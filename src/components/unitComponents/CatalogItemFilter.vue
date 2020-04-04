<template>
  <div class="main_filters ">
    <div class="main_color"></div>
    <div class="main_filter">
      <a class="text_color">Фильры</a>
    </div>
    <div class="main_filter_electr">
      <ul class="main_category_list text_color">
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
        <li class ="category_list_item list_them">
          <a class ="category_list_link">Электроника</a>
        </li>
        <li class ="category_list_item list_them_lvl">
          <a class ="category_list_link">Электроника</a>
        </li>
      </ul>
    </div>
    <div class="filter-range">
      <div class="filter-range-title"><a class="text_prise">Цена(р):</a></div>
      <div class="price-controls">
        <label class="min-price">от {{minPrice}}</label>
        <label class="max-price">до {{maxPrice}}</label>
      </div>
      <div class="range-slider"
      :v-bind = "absRange"
      >
          <input class="input_filter_min"
            type="range"
            min="0"
            max="1000"
            step="1"
            v-model.number="minPrice"
                 :v-bind = "minInpWidth"
                 >
          <input class="input_filter_max"
            type="range"
            min="1000"
            max="10000"
            step="1"
            v-model.number="maxPrice"
                 :v-bind = "maxInpWidth"
                 >
      </div>
    </div>
    <button class="btn_search"> Начать поиск</button>
    <div class="main_filter">
      <a class="text_color">Бренды</a>
    </div>
    <div class="main_filter_electr">
      <ul class="main_category_list text_color">
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
      </ul>
    </div>
    <div class="main_filter">
      <a class="text_color">Коллекции</a>
    </div>
    <div class="main_filter_electr">
      <ul class="main_category_list text_color">
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
        <li class ="category_list_item">
          <a class ="category_list_link">Электроника</a>
        </li>
      </ul>
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
      minPrice: 0,
      minInpWidth: 0,
      maxPrice: 10000,
      maxInpWidth: 10000,
      absRange: 10000,
      products: []
    }
  },
  watch: {
    minPrice: function () {
      this.maxInpWidth = (this.absRange - this.minPrice) * (100 / this.absRange)
    },
    maxPrice: function () {
      this.minInpWidth = (this.absRange - this.maxPrice) * (100 / this.absRange)
    }
  },
  created: function init () {
    fetch(process.env.HOST + '/api/products/category', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({maxPrice: 100,
        minPrice: 0,
        page: 0})
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
.btn_search{
  color: #000000;
  font-family: Alef, serif;
  text-decoration: none;
  user-select: none;
  width: 14%;
  height: 35px;
  position: absolute;
  background: #AAD9E0;
  border-radius: 6px;
  z-index: 100;
  outline: none;
  }
  .input_filter_max{
    right: 0;
    bottom: 0;
    width: 70%;
    -webkit-appearance: none;
    height: 2px;
    background: #ffffff;
    outline: none;
  }
  .input_filter_min{
    left: 0;
    bottom: 0;
    width: 30%;
    -webkit-appearance: none;
    height: 2px;
    background: #ffffff;
    outline: none;
  }
.input_filter_min::-webkit-slider-thumb,
.input_filter_max::-webkit-slider-thumb{
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
