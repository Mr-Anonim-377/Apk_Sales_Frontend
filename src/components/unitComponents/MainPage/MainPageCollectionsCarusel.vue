<template>
  <div id="container_circle" class="container_circle_carusel">
    <div class="card-carousel--nav__top" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
    <div class="gallery">
      <div class="card-carousel-wrapping" :style="{ transform: 'translateY' + '(' + currentOffset + 'px' + ')',  transition: 'transform ' + settings.timing + ' ' + settings.speed + 'ms'}" >
        <ul>
          <li >
            <CollectionsCaruselUnit
              v-for = "collection in collections"
              :collection="collection"
            />
          </li>
        </ul>
    </div>
    </div>
    <div class="card-carousel--nav__bottom" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
  </div>
</template>
<script>
import CollectionsCaruselUnit from './CollectionsCaruselUnit'

export default {
  props: {
    // Скорость перелистывания (мс)
    speed: {
      type: Number,
      default: 500
    },

    // Анимация перехода (linear, ease-in, ease-out, ease-in-out)
    timing: {
      type: String,
      default: 'ease'
    }
  },
  data () {
    return {collections: [],
      currentOffset: 0,
      windowSize: 4,
      paginationFactor: 180,
      settings: {
        speed: this.speed,
        timing: this.timing
      }
    }
  },
  components: {CollectionsCaruselUnit},
  created: function init () {
    fetch(process.env.HOST + '/api/collection/all')
      .then(response => response.json())
      // eslint-disable-next-line
      .then(commits => this.collections = commits)
  },
  computed: {
    atEndOfList () {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.collections.length - this.windowSize)
    },
    atHeadOfList () {
      return this.currentOffset === 0
    }
  },
  methods: {
    moveCarousel (direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor
      }
    }
  }

}

</script>
<style>
  .card-carousel-wrapping {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666a73;

  }
  .card-carousel--nav__top, .card-carousel--nav__bottom {
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

  .card-carousel--nav__top[disabled], .card-carousel--nav__bottom[disabled] {
    opacity: 0.2;
    border-color: black;
  }

  .card-carousel--nav__top {
    transform: rotate(-45deg);
    margin: auto 20px;
    margin-left: 40%;
  }

  .card-carousel--nav__top:active {
    transform: rotate(-45deg) scale(0.9);
    margin-left: 40%;
  }

  .card-carousel--nav__bottom {
    transform: rotate(135deg);
    margin: auto 20px;
    margin-left: 40%;
  }

  .card-carousel--nav__bottom:active {
    transform: rotate(135deg) scale(0.9);
    margin-left: 40%;
  }
  .container_circle_carusel {
    z-index: 90;
    width: 100%;
    height: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-right: 15px;
    padding-left: 15px;
    max-width: 1200px;
    display: flow-root;
    margin-top: 11%;
  }
</style>
