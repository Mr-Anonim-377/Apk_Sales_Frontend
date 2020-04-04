<template>
  <section class="section_nav">
    <div class="section_main">
      <div class="head_nav"></div>
      <div class="container container_nav">
        <div class="row_nav">
          <nav class="nav">
            <ul class="nav_product">
              <li class="nav_product_name">
                <a class="naw_categor" href>Категории</a>
              </li>
<!--              v-on-clickaway="onClickOutside"-->
              <div class="nav_list" @click="isVisible = true" v-on-clickaway="onClickOutside">
                <div class="nav_list_circle_top"  ></div>
                <div class="nav_list_circle_bottom" ></div>
                <div class="category_pop_up" v-if="isVisible">
                  <div class="category_pop_up__blur"></div>
                  <div class="category_pop_up__result">
                    <div class="show_more"></div>
                  </div>
                </div>
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
  import {directive as onClickaway} from 'vue-clickaway'
export default {
  directives: {
    onClickaway: onClickaway
  },
  data () {
    return {
      navigtion: {},
      isVisible: false
    }
  },
  components: {NavigationUnit},
  created: function init () {
    fetch('api/navigation', {
      method: 'get'
    }).then(response => response.json())
      // eslint-disable-next-line
      .then(commits => this.navigtion = commits)
  },
  methods: {
    onClickOutside() {
      this.isVisible = false
    }
  }
}
</script>
<style scoped>
</style>
