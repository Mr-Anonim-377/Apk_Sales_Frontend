<template>
  <section class="section_nav">
    <div class="section_main">
      <div class="head_nav"></div>
      <div class="container container_nav">
        <div class="row_nav">
          <nav class="nav">
            <ul class="nav_product">
              <li class="nav_product_name" @click="isVisible = true" v-on-clickaway="onClickOutside">
                <div class="nav_category">Категории</div>
                <div class="nav_list">
                  <div class="nav_list_circle top"></div>
                  <div class="nav_list_circle buttom"></div>
                </div>
                <div class="category_pop_up" v-if="isVisible">
                  <div class="category_pop_up__blur"></div>
                  <div class="category_pop_up__result">
                    <div class="show_more"></div>
                  </div>
                </div>
              </li>
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
    data() {
      return {
        navigtion: {},
        isVisible: false
      }
    },
    components: {NavigationUnit},
    created: function init() {
      fetch(process.env.HOST + '/api/navigation', {
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
