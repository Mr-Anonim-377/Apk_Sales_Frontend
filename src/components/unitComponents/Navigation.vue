<template>
  <section class="section_nav">
    <div class="section_main">
      <div class="head_nav"></div>
      <div class="container container_nav">
        <div class="row_nav">
          <nav class="nav">
            <ul class="nav_product">
              <li class="nav_product_name">
                <router-link :to="{name: 'catalog'}">
                <a class="naw_categor" href>Категории</a>
                </router-link>
              </li>
              <div class="nav_list">
                <div class="nav_list_circle_top"></div>
                <div class="nav_list_circle_bottom"></div>
              </div>
              <NavigationUnit v-for="(favoriteCategory,index) in navigtion.favoriteCategories"
                                      v-if="index<5" :favoriteCategory="favoriteCategory"></NavigationUnit>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import NavigationUnit from './NavigationUnit'
export default {
  data () {
    return {
      navigtion: {}
    }
  },
  components: {NavigationUnit},
  created: function init () {
    fetch(process.env.HOST + '/api/navigation', {
      method: 'get'
    }).then(response => response.json())
      // eslint-disable-next-line
      .then(commits => this.navigtion = commits)
  }
}
</script>
<style scoped>
</style>
