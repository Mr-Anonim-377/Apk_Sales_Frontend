<template>
  <li class="nav_product_name">
    <a class="naw_categor" href>{{favoriteCategory.category.categoryName}}</a>
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
</style>
