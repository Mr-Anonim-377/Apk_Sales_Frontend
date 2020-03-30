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
        <div class="CatalogItemProduct__btn">
        <img class="pictures_catalog pictures_catalog_basked" src="../../../static/CSS/pictures/basket.png"/></div>
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
  }
  // methods: {
  //   SendToDataParent () {
  //     this.$emit('SendToDataParent', this.product_data.article)
  //   }
  // }
}
</script>

<style scoped>

</style>
