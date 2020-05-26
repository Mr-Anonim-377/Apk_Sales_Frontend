<template>
  <div class="container_main">
    <div class="main_container_banner">
      <div class=" row row_product_child" >
        <a v-bind:href="'/catalog/category=' + favoriteCategory.favoriteCategory.category.categoryId +
          '&page=1&collections=&price-min=&price-max='">
          <h1 class="text">{{favoriteCategory.favoriteCategory.category.categoryName}}</h1>
        </a>
      </div>
    </div>
    <br>
    <FavoriteCategoryUnitProduct :products="favoriteCategory.products"/>
  </div>
</template>

<script>
import FavoriteCategoryUnitProduct from './FavoriteCategoryUnitProduct'
export default {
  name: 'FavoriteCategoryUnit',
  props: {
    favoriteCategory: {}
  },
  components: {FavoriteCategoryUnitProduct}
}
</script>

<style scoped>

</style>
