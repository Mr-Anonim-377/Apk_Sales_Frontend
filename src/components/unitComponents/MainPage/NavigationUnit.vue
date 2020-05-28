<template>
  <li class="nav_product_name position">
      <a class="nav_category"
         v-bind:href="'/catalog/category=' + favoriteCategory.category.categoryId +
          '&page=' + 1 +
          '&collections=' +
          '&price-min='+
          '&price-max='">
        {{favoriteCategory.category.categoryName}}</a>
  </li>
</template>
<script>
export default {
  props: {
    favoriteCategory: {}
  }
}
</script>
<style>
  .position {
  position: relative;
    bottom: 35%;
  }
</style>
