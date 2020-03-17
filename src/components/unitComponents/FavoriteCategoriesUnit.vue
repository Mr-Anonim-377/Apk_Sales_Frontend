<template>
  <div class="container_main">
    <div class="main_container_banner">
      <div class="row row_product_child">
        <h1 class="text">{{favoriteCategory.favoriteCategory}}</h1>
      </div>
    </div>
    <br>
    <div class=" main_container_banner favorite_category_product">
      <div class="row row_product_child ">
<!--        <button class="article_child_left"></button>-->

          <ul>
          <FavoriteCategoryUnitProduct
            v-for="favoriteProduct in favoriteCategory.products"
            :favoriteProduct="favoriteProduct"/>

          </ul>
<!--          <button class="article_child_right"></button>-->
      </div>
    </div>
  </div>
</template>

<script>
import FavoriteCategoryUnitProduct from './FavoriteCategoryUnitProduct'
export default {
  name: 'FavoriteCategoryUnit',
  props: {
    favoriteCategory: {},
  },
  components: { FavoriteCategoryUnitProduct}
}
</script>

<style>

</style>
