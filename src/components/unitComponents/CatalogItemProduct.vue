<template>
  <div class="CatalogItemProduct">
  <div class="main_good">
    <div class="main_goods">
      <img class="main_goods_img" :src="productCategory.image.imagePatch"/>
    </div>
    <div class="main_goods_container">
      <div class="main_goods_back"></div>
      <div class="main_goods_section">
        <span class="main_goods_text">{{productCategory.nameProduct}}</span>
        <br>
        <a class="main_goods_text_pay">{{productCategory.price}}₽</a>
        <div class="CatalogItemProduct__btn">
        <img class="pictures_catalog pictures_catalog_message" src="../../../static/CSS/pictures/reviews.png"/></div>
        <button class="CatalogItemProduct__btn" @click="addToCart">
        <img
          class="pictures_catalog pictures_catalog_basked"
          src="../../../static/CSS/pictures/basket.png"
        />
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'CatalogItemProduct',
  props: {
    productCategory: []
  },
  data () {
    return {}
  },
  created: function init () {
    fetch(process.env.HOST + '/api/shoppingCart/addProduct', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      // eslint-disable-next-line no-return-assign
      .then(commits => this.products = commits)
      .catch(function (error) {
        console.log('Request failed', error)
      })
  },
  methods: {
    addToCart () {
      this.$emit('addToCart', this.productCategory)
    }
  }
}
</script>

<style scoped>

</style>
