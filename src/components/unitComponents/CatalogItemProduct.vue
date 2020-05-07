<template>
  <div class="CatalogItemProduct">
    <div class="main_good"
         @mouseover="setBlur(true)"
         @mouseout="setBlur(false)">
      <div class="mask"
           @mouseover="setBlur(true)"
           @mouseout="setBlur(false)">
        <h2 class="mask_goods_name">{{productCategory.nameProduct}}</h2>
        <div class="mask_text">
          <p>{{productCategory.productDescription}}</p>
        </div>
        <a href="#" class="info">Открыть карточку товара</a>
        <div class="CatalogItemProduct__btn">
          <img class="pictures_catalog pictures_catalog_message" src="../../../static/CSS/pictures/reviews.png"/></div>
        <div class="CatalogItemProduct__btn">
          <img class="pictures_catalog pictures_catalog_basked" src="../../../static/CSS/pictures/basket.png"/></div>
      </div>
      <div class="main_goods">
        <img class="main_goods_img" :src="productCategory.image.imagePatch"/>
      </div>
      <div class="main_goods_container"  v-bind:class="getBlur()">
        <div class="main_goods_back"></div>
        <div class="main_goods_section">
          <span class="main_goods_text">{{productCategory.nameProduct}}</span>
          <br>
          <a class="main_goods_text_pay">{{productCategory.price}}₽</a>
          <div class="rating-result">
            <span class="active"></span>
            <span class="active"></span>
            <span class="active"></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CatalogItemProduct',
    props: {
      productCategory: {}
    },
    data () {
      return {
        isBlur: false
      }
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

  .rating-result {
    bottom: 4px;
    position: relative;
    width: 265px;
    left: 116px;
    display: flex;
    margin: 0;
  }
  .rating-result span {
    padding: 0;
    font-size: 60px;
    line-height: 1;
    color: lightgrey;
    text-shadow: 1px 1px #bbb;
    margin-left: 10px;
  }
  .rating-result > span:before {
    content: '★';
  }
  .rating-result > span.active {
    color: gold;
    text-shadow: 1px 1px #c60;
  }
  .main_good .mask {
    width: 840px;
    height: 100%;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0
  }

  .main_good h2 {
    text-transform: uppercase;
    color: #fff;
    text-align: center;
    position: relative;
    font-size: 17px;
    font-family: Raleway, serif;
    margin-top: 4%;
    margin-right: 22%;
    margin-left: 30%;
    padding: 0;
  }

  .main_good p {
    font-family: Roboto, serif;
    font-style: italic;
    font-weight: normal;
    font-size: 30px;
    text-align: left;
    z-index: 90;
    height: 86px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-right: 10%;
    position: relative;
    color: #fff;
    padding: 0px 20px 0px;
    margin-left: 30%;
  }

  .main_good a.info {
    display: inline-block;
    margin-left: 40%;
    margin-bottom: 4%;
    text-decoration: none;
    padding: 7px 14px;
    background: rgb(147, 100, 251);
    color: #fff;
    font-family: Raleway, serif;
    text-transform: uppercase;
    -webkit-box-shadow: 0 0 1px rgb(197, 186, 226);
    box-shadow: 0 0 1px rgb(197, 186, 226);
  }

  .main_good a.info:hover {
    background: rgb(162, 76, 251);
    box-shadow: 0 0 5px rgb(197, 186, 226);
  }

  .main_good .mask {
    border-radius: 10px;
    z-index: 99;
    opacity: 0;
    background-color: rgba(58, 1, 132, 0.19);
    transition: all 0.4s ease-in-out;
  }

  .main_good h2 {
    transform: translateY(-100px);
    opacity: 0;
    font-family: Raleway, serif;
    transition: all 0.2s ease-in-out;
  }

  .main_good p {
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.2s linear;
  }

  .main_good a.info {
    z-index: 90;
    opacity: 0;
    transition: all 5ms ease-in-out;
  }

  .main_good:hover .mask {
    opacity: 1;
  }

  .main_good:hover h2,
  .main_good:hover img,
  .main_good:hover p,
  .main_good:hover a.info {
    opacity: 1;
    transform: translateY(0px);
  }

  .main_good:hover p {
    transition-delay: 0.1s;
  }

  .main_good:hover a.info {
    transition-delay: 0.2s;
  }
</style>
