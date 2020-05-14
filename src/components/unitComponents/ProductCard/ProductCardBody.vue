<template>
  <section class="section section_z-index">
    <div class="section_main">
      <div class="main"></div>
      <div class="product_container">
        <div class="card_row_test">
          <div class="preloader_container" v-if="productsByCategory.length === 0">
            <div class="loader">
              <div class="l_main">
                <div class="l_square"><span></span><span></span><span></span></div>
                <div class="l_square"><span></span><span></span><span></span></div>
                <div class="l_square"><span></span><span></span><span></span></div>
                <div class="l_square"><span></span><span></span><span></span></div>
              </div>
            </div>
          </div>
          <div class="card_row_container" v-if="productsByCategory.length > 0">
            <div class="card_left">
              <div class="photo"
                   @mouseover="isButtonShowCurrentImage = true"
                   @mouseleave="isButtonShowCurrentImage = false">
                <div class="button_increase_container"
                     @click="isShowCurrentImage = true"
                     v-if="isButtonShowCurrentImage === true">
                  <a class="button_increase">
                    Увеличить
                  </a>
                </div>
                <img class="photo_good" v-bind:src="currentImage.imagePatch"/>
              </div>
              <div class="card_info">
                <p class="card_text">
                  <strong>
                <p v-for="property in JSON.parse(product.properties)">
                  {{property}}
                </p>
                </strong>
                </p>
              </div>
              <div class="title"
                   v-if="product.similarProducts.length !== 0">
                <h1 class="text_title text_title_font_size">Похожие товары:</h1>
                <SimilarProductCarusel :products="product.similarProducts"/>
              </div>
            </div>
            <div class="card_right card_right_width">
              <div class="card_images_container">
                <div class="image_show_container"
                     v-if="isShowCurrentImage === true">
                  <a @click="isShowCurrentImage = false" class="image_show_container_exit">
                    x
                  </a>
                  <img class="image_show" v-bind:src="currentImage.imagePatch"/>
                </div>
                <div class="product_card_product_name">
                  {{product.nameProduct}}
                </div>
                <ProductCardImageCarusel :images="images"
                                         v-on:currentImage="saveCurrentImage($event)"/>
              </div>
              <div class="product-description">
                <div class="product-description_title product-description_title_new">Описание</div>
                <div class="product-description_container">
                  <p class="product-description_paragraph">{{product.productDescription}}</p>
                </div>
              </div>
              <a class="cart-btn">
                <a class="cart-btn-wrap"
                @click="addProduct()" content="">Добавить в корзину
                </a>
              </a>
              <div class="text_cart_title text_cart_title_new">Оценка пользователей</div>
              <div class="rating-result">
            <span
              v-for="(index) in starArray"
              v-bind:class="isActivClass(index)"></span>
              </div>
            </div>
          </div>
          <div>
            <div class="carousel_container" v-if="productsByCategory.length > 0">
              <p class="text_title_new">Товары из данной категории</p>
              <p v-if="isError">Ошибка сервера</p>
              <div class="carusel_category_container">
                <FavoriteCategoryUnitProduct :products="productsByCategory"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FavoriteCategoryUnitProduct from '../MainPage/FavoriteCategoryUnitProduct'
import SimilarProductCarusel from './SimilarProductCarusel'
import ProductCardImageCarusel from './ProductCardImageCarusel'

export default {
  name: 'ItemCardBody',
  components: {
    FavoriteCategoryUnitProduct,
    ProductCardImageCarusel,
    SimilarProductCarusel
  },
  props: {
    productId: {}
  },
  data () {
    return {
      mark: 0,
      starArray: [0, 1, 2, 3, 4],
      isShowCurrentImage: false,
      isButtonShowCurrentImage: false,
      isCurrentButtonShowCurrentImage: false,
      currentImage: {},
      images: [],
      isError: false,
      productsByCategory: [],
      product: {}
    }
  },
  created: function init () {
    fetch(process.env.HOST + '/api/products/' + this.productId, {
      method: 'get'
    }).then(response => response.json())
      // eslint-disable-next-line
        .then(commits => {
        this.product = commits;
        this.mark = this.product.averageMark === null
          ? 1
          : Math.round(Number.parseFloat(this.product.averageMark));
        this.currentImage = commits.image;
        this.images.push({image: this.currentImage});
        commits.images.forEach(item => this.images.push(item));
        var currentRequestJson = {
          categoryId: commits.productCategory.categoryId,
          page: 0
        };
        fetch(process.env.HOST + '/api/products/category', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(currentRequestJson)
        })
          .then(response => response.json())
        // eslint-disable-next-line no-return-assign
          .then(response => {
            if (response.type === 'NoSuchObj') {
              this.isError = true
            } else {
              response.products.forEach(item => this.productsByCategory.push(item))
            }
          })
      })
  },

  methods: {
    isActivClass (index) {
      return index < this.mark ? 'active' : ''
    },
    saveCurrentImage (currentImage) {
      this.currentImage = currentImage.image
    },
    addProduct () {
      fetch(process.env.HOST + '/api/shoppingCart?numberPieces=1&' + 'productId=' + this.product.productId, {
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
        .then(response => this.$emit('addProduct', true))
    }
  }
}
</script>

<style>
  @import '../../../../static/CSS/CSS.css';

  .rating-result {
   margin-bottom: 70px;
    position: relative;
    width: 265px;
    left: 18%;
    display: flex;
    z-index: 90;
  }
  .rating-result span {
    padding: 0;
    font-size: 80px;
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

  a {
    cursor: pointer;
  }

  .carousel_card {
    max-width: 660px;
    width: 1200px;
    display: flex;
    box-sizing: inherit;
  }

  .card_right {
    text-align: center;
  }

  .carusel_category_container {
    margin-left: 29%;
  }

  .card_images_container {
    width: 100%;
  }

  .card_right_width {
    width: 55%;
  }

  .text_title_font_size {
    font-size: 30px;
  }

  .product_card_product_name {
    text-align: center;
    font-family: Atomic Age, serif;
    font-style: normal;
    font-weight: normal;
    font-size: 40px;
    line-height: 80px;
    margin-right: 28px;
  }

  .section_z-index {
    z-index: 71;
  }

  .image_show_container {
    top: 50px;
    z-index: 100;
    position: absolute;
    height: 545px;
    width: 556px;
  }

  .image_show {
    border-radius: 50px;
    width: 100%;
    height: 100%;
  }

  .button_increase {
    position: absolute;
    width: 100px;
    height: 30px;
    background: rgba(153, 116, 251, 0.81);
    border-radius: 50px;
    text-align: center;
  }

  .button_increase_container {
    position: relative;
    top: 49%;
    left: 43%;
  }

  .image_show_container_exit {
    position: relative;
    top: 10%;
    left: 42%;
    font-size: 30px;
  }

  .preloader_container {
    top: 202px;
    position: relative;
  }
</style>
