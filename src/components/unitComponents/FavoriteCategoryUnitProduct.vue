<template>
  <!--  <div>-->
  <div class=" main_container_banner favorite_category_product">
    <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
    <div class="row row_product_child">
      <div class="card-carousel-wrapper" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
        <ul v-for="item in products">
          <li>
            <div class="card-carousel">
              <div class="card-carousel--overflow-container">
                <div class="card-carousel-cards">
                  <div class="card-carousel--card">
                    <img v-bind:src="item.image.imagePatch">
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
  </div>
</template>

<script>
  export default {
    props: {
      products: []
    },
    data() {
      return {
        currentOffset: 0,
        windowSize: 3,
        paginationFactor: 220
      }
    },
    computed: {
      atEndOfList() {
        return this.currentOffset <= (this.paginationFactor * -1) * (this.products.length - this.windowSize);
      },
      atHeadOfList() {
        return this.currentOffset === 0;
      }
    },
    methods: {
      moveCarousel(direction) {
        if (direction === 1 && !this.atEndOfList) {
          this.currentOffset -= this.paginationFactor;
        } else if (direction === -1 && !this.atHeadOfList) {
          this.currentOffset += this.paginationFactor;
        }
      }
    }
  }
</script>

<style>
  .card-carousel-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 40px;
    color: #666a73;
  }

  .card-carousel {
    display: flex;
    justify-content: center;
    width: 200px;
  }

  .card-carousel--overflow-container {
    overflow: hidden;
  }

  .card-carousel--nav__left, .card-carousel--nav__right {
    display: inline-block;
    width: 15px;
    height: 15px;
    padding: 10px;
    box-sizing: border-box;
    border-top: 2px solid #42b883;
    border-right: 2px solid #42b883;
    cursor: pointer;
    margin: auto 20px;
    transition: transform 150ms linear;
  }

  .card-carousel--nav__left[disabled], .card-carousel--nav__right[disabled] {
    opacity: 0.2;
    border-color: black;
  }

  .card-carousel--nav__left {
    transform: rotate(-135deg);
    margin: auto 20px;
  }

  .card-carousel--nav__left:active {
    transform: rotate(-135deg) scale(0.9);
  }

  .card-carousel--nav__right {
    transform: rotate(45deg);
    margin: auto 20px;
  }

  .card-carousel--nav__right:active {
    transform: rotate(45deg) scale(0.9);
  }

  .card-carousel-cards {
    display: flex;
    transition: transform 150ms ease-out;
    transform: translatex(0px);
  }

  .card-carousel-cards .card-carousel--card {
    margin: 0 10px;
    cursor: pointer;
    box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06), 0 2px 2px 0 rgba(40, 44, 53, 0.08);
    background-color: #fff;
    border-radius: 50px;
    z-index: 3;
    margin-bottom: 2px;
  }
  .card-carousel-cards .card-carousel--card:first-child {
    margin-left: 0;
  }

  .card-carousel-cards .card-carousel--card:last-child {
    margin-right: 0;
  }

  .card-carousel-cards .card-carousel--card img {
    vertical-align: bottom;
    transition: opacity 150ms linear;
    user-select: none;
    width: 200px;
    height: 200px;
  }

  .card-carousel-cards .card-carousel--card img:hover {
    opacity: 0.5;
  }

  .card-carousel-cards .card-carousel--card--footer {
    border-top: 0;
    padding: 7px 15px;
  }

  .card-carousel-cards .card-carousel--card--footer p {
    padding: 3px 0;
    margin: 0;
    margin-bottom: 2px;
    font-size: 19px;
    font-weight: 500;
    color: #2c3e50;
    user-select: none;
  }

  .card-carousel-cards .card-carousel--card--footer p.tag {
    font-size: 11px;
    font-weight: 300;
    padding: 4px;
    background: rgba(40, 44, 53, 0.06);
    display: inline-block;
    position: relative;
    margin-left: 4px;
    color: #666a73;
  }

  .card-carousel-cards .card-carousel--card--footer p.tag:before {
    content: "";
    float: left;
    position: absolute;
    top: 0;
    left: -12px;
    width: 0;
    height: 0;
    border-color: transparent rgba(40, 44, 53, 0.06) transparent transparent;
    border-style: solid;
    border-width: 8px 12px 12px 0;
  }

  .card-carousel-cards .card-carousel--card--footer {
    margin-left: 0;
    border-left: 1.45px dashed white;
  }

  .card-carousel-cards .card-carousel--card--footer {
    display: none !important;
  }

  .card-carousel-cards .card-carousel--card--footer {
    content: "";
    position: absolute;
    top: 8px;
    left: -3px;
    float: left;
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background: white;
    box-shadow: -0px -0px 0px #004977;
  }

</style>
