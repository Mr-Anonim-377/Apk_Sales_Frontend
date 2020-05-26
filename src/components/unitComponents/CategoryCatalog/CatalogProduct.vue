<template>
  <div class="CatalogItemProduct" >
    <div class="main_good" v-on-clickaway="isReviewFalse"
         @mouseover="setBlur(true)"
         @mouseout="setBlur(false)">
        <div class="mask" v-bind:class="isOpacity(isReview)"
             @mouseover="setBlur(true)"
             @mouseout="setBlur(false)"
             >
          <h2 class="mask_goods_name" v-bind:class="isOpacity(isReview)">{{productCategory.nameProduct}}</h2>
          <div class="mask_text">
            <p v-bind:class="isOpacity(isReview)">{{productCategory.productDescription}}</p>
          </div>
          <a v-bind:href="'http://localhost:8081/card/'+productCategory.productId" v-bind:class="isOpacity(isReview)" class="info">Открыть карточку товара</a>
          <div class="CatalogItemProduct__btn" @click="setReviewTrue()" >
            <img class="pictures_catalog pictures_catalog_message" src="../../../../static/CSS/pictures/reviews.png"/></div>
          <div class="CatalogItemProduct__btn "
               onclick="change_image.src='https://avatars.mds.yandex.net/get-pdb/1964870/95301851-90a3-40e4-bfb4-9068a3a26d59/s1200'"
               @click="addProduct()">
            <img class="pictures_catalog pictures_catalog_basked" src="../../../../static/CSS/pictures/basket.png"
                 id="change_image"/></div>
        </div>
      <div class="main_goods">
        <img class="main_goods_img" :src="productCategory.image.imagePatch"/>
      </div>
      <div style="z-index: 100;">
        <ReviewPopUp
          :product="productCategory"
          :userEmail="user.email"
          v-if="isReview"
                     v-on:addReview="addReview($event)"></ReviewPopUp>
      </div>
      <div class="main_goods_container"  v-bind:class="getBlur()">
        <div class="main_goods_back"></div>
        <div class="rating-result">
            <span
              v-for="(index) in starArray"
              v-bind:class="isActivClass(index)"></span>
        </div>
        <div class="main_goods_section">
          <span class="main_goods_text">{{productCategory.nameProduct}}</span>
          <br>
          <a class="main_goods_text_pay">{{productCategory.price}}₽</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewPopUp from '../ReviewPopUp/ReviewPopUp'
import {directive as onClickaway} from 'vue-clickaway'

export default {
  directives: {
    onClickaway: onClickaway
  },
  components: {ReviewPopUp},
  comments: {
    ReviewPopUp
  },
  name: 'CatalogItemProduct',
  props: {
    user: {},
    productCategory: {}
  },
  data () {
    return {
      isReview: false,
      isBlur: false,
      mark: 0,
      starArray: [0, 1, 2, 3, 4]
    }
  },
  methods: {
    isActivClass (index) {
      return index < this.mark ? 'active' : ''
    },
    addProduct () {
      fetch(process.env.HOST + '/api/shoppingCart?numberPieces=1&' + 'productId=' + this.productCategory.productId, {
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
        .then(response => this.$emit('addProduct', true))
    },
    getBlur () {
      if (this.isBlur === true) {
        return 'blure'
      }
    },
    setBlur (isTrue) {
      if (!this.isReview) {
        this.isBlur = isTrue
      }
    },
    isOpacity (isOpacity) {
      if (this.user.userEmail !== undefined) {
        return 'opacity'
      }
      if (isOpacity) {
        return 'opacity'
      } else {
        return ''
      }
    },
    isReviewFalse () {
      this.isReview = false;
      this.isBlur = false
    },
    setReviewTrue () {
      this.isBlur = true;
      this.isReview = true
    },
    addReview ($event) {
      fetch(process.env.HOST + '/api/review/product', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify($event)
      }).then(response => response.json())
    }
  },
  created: function init () {
    this.mark = this.productCategory.averageMark === null ? 1 : Math.round(Number.parseFloat(this.productCategory.averageMark))
  }
}
</script>

<style>
  .opacity{
    opacity: 1 !important;
    transform:none !important;
  }
  .rating-result {
    position: relative;
    width: 265px;
    left: 40%;
    top: 125px;
    display: flex;
    z-index: 90;
  }
  .rating-result span {
    padding: 0;
    font-size: 60px;
    line-height: 1;
    color: #b7adbf;
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
    font-size: 23px;
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
    font-size: 21px;
    text-align: left;
    z-index: 90;
    height: 86px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-right: 10%;
    position: relative;
    color: #fff;
    padding: 0px 20px 0px;
    margin-left: 30%;
    width: 47%;
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

  .product_description {
  font-size: 21px;
  }
</style>
