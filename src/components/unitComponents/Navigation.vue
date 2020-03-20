<template>
  <section class="section_nav">
    <div class="section_main">
      <div class="head_nav"></div>
      <div class="container container_nav">
        <div class="row row_nav">
          <nav class="nav">
            <ul class="nav_product">
              <li class="nav_product_name">
                <a class="naw_categor" href>Категории</a>
              </li>
              <div class="nav_list">
                <div class="nav_list_circle_top"></div>
                <div class="nav_list_circle_bottom"></div>
              </div>
              <NavigationUnit v-for="favoriteCategory in navigtion.favoriteCategories"
                                      :favoriteCategory="favoriteCategory"></NavigationUnit>
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
    fetch('http://ec2-13-58-76-77.us-east-2.compute.amazonaws.com:8080/navigation', {
      method: 'get'
    }).then(response => response.json())
      // eslint-disable-next-line
      .then(commits => this.navigtion = commits)
  }
}
</script>
<style>
</style>
