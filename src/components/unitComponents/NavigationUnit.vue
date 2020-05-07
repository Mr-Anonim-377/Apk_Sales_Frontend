<template>
  <li class="nav_product_name">
<!--    <router-link :to="{path: '/catalog/'+favoriteCategory.category.categoryId}">-->
      <a class="nav_category"
         v-bind:href="'http://localhost:8081/catalog/' + favoriteCategory.category.categoryId + '&' + 1 + '&' + '&'+ '&'">
        {{favoriteCategory.category.categoryName}}</a>
<!--    </router-link>-->
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
