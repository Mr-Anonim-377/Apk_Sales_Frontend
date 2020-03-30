<template>
  <div class="main_container_product">
    <FavoriteCategoriesUnit v-for="favoriteCategory in favoriteCategoryProducts"
                            :favoriteCategory="favoriteCategory"/>
  </div>
</template>

<script>
import FavoriteCategoriesUnit from './FavoriteCategoriesUnit'

export default {
  data () {
    return {
      favoriteCategoryProducts: []
    }
  },
  components: {FavoriteCategoriesUnit},
  created: function init () {
    fetch(process.env.HOST + '/api/products/favorites?countFavoriteCategries=5', {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
      .then(response => response.json())
    // eslint-disable-next-line
        .then(commits => this.favoriteCategoryProducts = commits)
  }
}
</script>

<style scoped>

</style>
