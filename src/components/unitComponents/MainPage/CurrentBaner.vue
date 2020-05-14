<template>
  <section class="section">
    <div class="section_main">
      <div class="main"></div>
      <div class="container_clamped">
        <div class="row_banner border_radios">
          <div class="main_banners_wrapper">
            <div class="main_banners_circle_left"></div>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators"
                    v-for="(index) in banersBig"
                    :class="{ 'active': index === 0 }"
                    :data-slide-to=index
                ></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item container_banner_Img"
                     v-for="(item_img,index) in banersBig"
                     :class="{ 'active': index === 0 }">
                  <img v-bind:src="item_img.image.imagePatch" class="d-block w-100 border_radios" alt="...">
                </div>
              </div>
              <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
            <div class="main_banners_circle_right"></div>
          </div>
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
    data() {
      return {
        banersBig: []
      }
    },
    created: function init () {
      this.banersBig = this.baners.filter(function (baner) {
        return baner.pageLocation === 'MAIN_CENTRAL'
      })
    }
  }
</script>
<style scoped>
  .border_radios {
  border-radius: 30px;
  }
</style>
