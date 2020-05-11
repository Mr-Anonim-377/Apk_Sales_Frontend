<template>
  <li class="nav_product_name">
      <a class="nav_category"
         v-bind:href="'http://localhost:8081/catalog/category=' + favoriteCategory.category.categoryId +
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
<style scoped>
</style>
