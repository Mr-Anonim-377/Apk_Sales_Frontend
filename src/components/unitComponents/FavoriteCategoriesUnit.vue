<template>
<div>
              <div class="main_container_banner">
                <div class="row row_product_child">
                  <h1 class="text">{{favoriteCategory.favoriteCategory}}</h1>
                </div>
              </div>
              <br>
              <div class="main_container_banner">
                <div class="row row_product_child">
                  <button class="article_child_left"></button>
                  <FavoriteCategoryUnitProduct/>
                  <button class="article_child_right"></button>
                </div>
              </div>
              </div>
</template>

<script>
import FavoriteCategoryUnitProduct from './FavoriteCategoryUnitProduct'
export default {
  props: {
    favoriteCategory: {}
  },
  components: {FavoriteCategoryUnitProduct}

}
</script>

<style>

</style>
