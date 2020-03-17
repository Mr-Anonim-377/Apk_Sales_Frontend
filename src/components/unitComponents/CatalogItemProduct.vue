<template>
  <div class="CatalogItemProduct">
  <div class="main_good">
    <div class="main_goods">
<!--&lt;!&ndash;      <img class="main_goods_img" src="../CSS/pictures/product.png"/>&ndash;&gt;-->
    </div>
    <div class="main_goods_container">
      <div class="main_goods_back"></div>
      <div class="main_goods_section">
        <a class="main_goods_text">{{product_data.name}}</a>
        <a class="main_goods_text_pay">Цена: {{product_data.id}}</a>
        <br>
        <button
          class="CatalogItemProduct__btn btn"
          @click="SendToDataParent"
        > Добавить в корзину</button>
<!--        <img class="pictures_catalog pictures_catalog_message" v-bind:src="favoriteProduct.image.imagePatch"/>-->
<!--        <img class="pictures_catalog pictures_catalog_basked" src="../CSS/pictures/basked.png"/>-->
      </div>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
        name: "CatalogItemProduct",
      props: {
          product_data: {
            type: Object,
            default (){
              return {}
            },
          },
      },
      data() {
          return {}
      },
      methods: {
        SendToDataParent () {
          this.$emit( 'SendToDataParent', this.product_data.article)
        }
        },
    }
</script>

<style scoped>

</style>
