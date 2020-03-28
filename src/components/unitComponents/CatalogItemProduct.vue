<template>
  <div class="CatalogItemProduct">
  <div class="main_good">
    <div class="main_goods">
      <img class="main_goods_img" :src="imagePatch.imagePatch"/>
    </div>
    <div class="main_goods_container">
      <div class="main_goods_back"></div>
      <div class="main_goods_section">
        <a class="main_goods_text">{{collections.collectionName}}</a>
        <a class="main_goods_text_pay">Цена: {{collections.price}}</a>
        <br>
        <button
          class="CatalogItemProduct__btn btn"> Добавить в корзину</button>
<!--        <img class="pictures_catalog pictures_catalog_message" v-bind:src="favoriteProduct.image.imagePatch"/>-->
<!--        <img class="pictures_catalog pictures_catalog_basked" src="../CSS/pictures/basked.png"/>-->
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'CatalogItemProduct',
  props: {
    product: [],
    imagePatch: String
  },
  data () {
    return {}
  },
  created: function init () {
    fetch(process.env.HOST + '/image/' + this.product.image.imageId)
      .then(response => response.json())
      // eslint-disable-next-line
      .then(commits => this.imagePatch = commits)
  }
}
</script>

<style scoped>

</style>
