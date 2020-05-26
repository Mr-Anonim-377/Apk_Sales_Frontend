<template>
  <section class="section_banner">
    <div class="section_main">
      <div class="main"></div>
      <div class="container_clamped">
        <div class="main_banners_wrapper">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1600"
          img-height="600"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide v-for="(item, index) in banersBig" :key="index" v-bind:img-src="item.image.imagePatch"></b-carousel-slide>
        </b-carousel>
      </div>
    </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    baners: []
  },
  data () {
    return {
      banersBig: [],
      slide: 0,
      sliding: null
    }
  },
  created: function init () {
    this.banersBig = this.baners.filter(function (baner) {
      return baner.pageLocation === 'MAIN_CENTRAL'
    })
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>
<style>
  .carousel-inner {
    border-radius: 30px;
  }
  .carousel{
    position: relative;
    border-radius: 30px;
    width: 1100px;
    min-height: 400px;
  }
</style>
