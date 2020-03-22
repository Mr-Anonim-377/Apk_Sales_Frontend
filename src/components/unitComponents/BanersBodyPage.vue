<template>
  <div class="main_container_banner">
    <div class="container_banner_small_left">
      <div class="banner_small">
        <img
          class="pictures_banner_red"
          v-bind:src="banersSmall[0].image.imagePatch"
         alt="">
      </div>
    </div>
    <div class="container_circle">
      <img
        class="banner_small_top"
        v-bind:src="banersSmall[1].image.imagePatch"
       alt="">
      <div class="row_custom row_product banener_small_bottom ">
        <img
          class="product"
          v-bind:src="banersSmall[2].image.imagePatch"
        >
        <img
          class="product"
          v-bind:src="banersSmall[3].image.imagePatch"
        >
        <img
          class="product"
          v-bind:src="banersSmall[4].image.imagePatch"
        >
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      baners: []
    },
    data() {
      return {
        banersSmall: []
      }
    },
    created: function init () {
      this.banersSmall = this.baners.filter(function (baner) {
        return baner.pageLocation === 'MAIN_SMALL'
      })
    }
  }
</script>

<style>

</style>
