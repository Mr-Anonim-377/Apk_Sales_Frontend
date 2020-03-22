<template>
  <div class="container_main">
    <div class="main_container_banner">
      <div class=" row row_product_child" >
        <h1 class="text">{{favoriteCategory.favoriteCategory.category.categoryName}}</h1>
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

<style>

</style>
