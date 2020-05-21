<template>
  <div>
    <div class="main_good_collection"
         @mouseover="setBlur(true)"
         @mouseout="setBlur(false)">
      <div class="mask_collection"
           @mouseover="setBlur(true)"
           @mouseout="setBlur(false)">
<!--        <h2 class="mask_goods_name"></h2>-->
        <a v-bind:href="'http://localhost:8081/collection/collectionId=' + collection.collectionId +
              '&page=1&categoryIds=&price-min=&price-max='" class="info">{{collection.collectionName}}</a>
      </div>
      <div class = "circle" v-bind:class="getBlur()">
        <div class="article">
          <img
            class="article_pictures"
            :src="collection.image.imagePatch"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    collection: {}
  },
  methods: {
    getBlur () {
      if (this.isBlur === true) {
        return 'blure'
      }
    },
    setBlur (isTrue) {
      this.isBlur = isTrue
    }
  }
}

</script>

<style>
  .main_good_collection .mask_collection {
    width: 100%;
    height: 170px;
    position: absolute;
    overflow: hidden;
  }

  .main_good_collection h2 {
    text-transform: uppercase;
    color: #fff;
    text-align: center;
    position: relative;
    font-size: 23px;
    font-family: Raleway, serif;
    margin-top: 4%;
    margin-right: 22%;
    margin-left: 23%;
    padding: 0;
  }
  .main_good_collection a.info {
    display: inline-block;
    text-decoration: none;
    padding: 7px 14px;
    background: rgb(147, 100, 251);
    color: #fff;
    font-family: Raleway, serif;
    text-transform: uppercase;
    -webkit-box-shadow: 0 0 1px rgb(197, 186, 226);
    box-shadow: 0 0 1px rgb(197, 186, 226);
    text-align: center;
    width: 100%;
    height: 50px;
    margin-top: 60px;

  }

  .main_good_collection a.info:hover {
    background: rgb(162, 76, 251);
    box-shadow: 0 0 5px rgb(197, 186, 226);
  }

  .main_good_collection .mask_collection {
    border-radius: 10px;
    z-index: 99;
    opacity: 0;
    background-color: rgba(58, 1, 132, 0.19);
    transition: all 0.4s ease-in-out;
  }

  .main_good_collection h2 {
    transform: translateY(-100px);
    opacity: 0;
    font-family: Raleway, serif;
    transition: all 0.2s ease-in-out;
  }
  .main_good_collection a.info {
    z-index: 90;
    opacity: 0;
    transition: all 5ms ease-in-out;
  }

  .main_good_collection:hover .mask_collection {
    opacity: 1;
  }

  .main_good_collection:hover h2,
  .main_good_collection:hover img,
  .main_good_collection:hover a.info {
    opacity: 1;
    transform: translateY(0px);
  }

  .main_good_collection:hover a.info {
    transition-delay: 0.2s;
  }
</style>
