<template>
  <section class = "section">
    <div class="section_main_product">
      <div class = "main"></div>
      <div class="error_catalog" v-if="shoppingCart.products.length === 0"></div>
      <div class="text_shoppingCart" v-if="shoppingCart.products.length === 0">Корзина пуста</div>
      <div class ="basket_container basket_container_section">
        <br>
        <H1 class="textCart" v-if="shoppingCart.products.length > 0">Корзина заказов</H1>
        <br>
        <div class="shop-line" v-if="shoppingCart.products.length > 0"></div>
        <br>
        <div class="section_good">
          <div class="section_goodItem"
               v-for="product in shoppingCart.products"
               :product="product"
          >
            <div class="main_good main_good_product">
              <div class="main_goods main_goods-shopping">
                <img class="main_goods_img" :src="product.product.image.imagePatch"/>
              </div>
              <div class="section_description">
                <div class="main_goods_shop"></div>
                <div class="main_goods_section">
                  <span class="main_goods_text">{{product.productName}}</span>
                  <br>
                  <a class="main_goods_text_pay">Цена: {{product.product.price}}₽</a>
                  <div class="rating-resul">
                    <span class="active"></span>
                    <span class="active"></span>
                    <span class="active"></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
            <ShoppingCartPieces
              :numberPieces = "product.numberPieces"
              :productId = "product.product.productId"
              :productQuantity = "shoppingCart.products"
              v-on:addMinus="refreshShoppingCart($event)"
              v-on:addPlus="refreshShoppingCart($event)"
              v-on:addDelete="refreshShoppingCart($event)"
            />
            <div class="textCart_sum">Сумма: <br> {{product.priceNumberPieces}}₽</div>
          </div>
          <br><br>
          <div class="shop-line" v-if="shoppingCart.products.length > 0"></div>
          <br>
          <div class="section_total">
            <div class="totalCart text_shoppingCart" v-if="shoppingCart.products.length > 0">Сумма заказа: {{shoppingCart.totalAmount}}₽</div>
            <div class="quantityCart text_shoppingCart" v-if="shoppingCart.products.length > 0">Колличество: {{shoppingCart.countProductsPieces}}</div>
          </div>
          <div class="cart-btn" v-if="shoppingCart.products.length > 0">
            <div class="btn_return">ПРОДОЛЖИТЬ ПОКУПКИ</div>
            <div class="btn_shop">ОФОРМИТЬ ЗАКАЗ</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ShoppingCartPieces from './ShoppingCartPieces'
export default {
  name: 'ShoppingCardBody',
  components: {ShoppingCartPieces},
  props: {
    shoppingCart: {}
  },
  methods: {
    refreshShoppingCart (isRefresh) {
      if (isRefresh) {
        this.$emit('addMinus', 'addPlus', 'addDelete', true)
      }
    }
  }
}
</script>

<style >
  .text_shoppingCart {
    font-family: Roboto, serif;
    font-style: normal;
    font-weight: normal;
    text-align: center;
    z-index: 100;
    position: relative;font-size: 32px;
  }
  .section_main_product{
    margin-right: auto;
    margin-left: auto;
    max-width: 1140px;
    width: 100%;
    z-index: 90;
  }
  .section_description{
    width: 530px;
  }
  .section_goodItem{
    position: relative;
    display: inline-flex;
    z-index: 100;
  }
  .rating-resul{
    bottom: 4px;
    position: relative;
    width: 265px;
    left: 116px;
    display: flex;
    margin: 0;
  }
  .error_catalog {
    left: 0;
    top: 0;
    display: inline-block;
    width: 200px;
    height: 200px;
    background-image: url('../../../../static/img/emoji.png');
    background-size: cover;
    z-index: 100;
    position: relative;
    margin-left: 41%;
  }
 .main_good_product{
   height: 200px;
 }
  .main_goods-shopping{
    width: 215px;
  }
  .section_total{
    display: flex;
  }
  .quantityCart{
    font-size: 21px;
    flex: auto;
    margin-left: 220px;
    padding-top: 17px;
  }
  .totalCart{
    margin-left: 64px;
  }
  .textCart{
    text-align: left;
    font-family: Roboto, serif;
    font-style: normal;
    font-weight: normal;
    z-index: 100;
    position: relative;
    font-size: 32px;
    margin-left: 15px;
  }
  .shop-line{
    width: 100%;
    border-top: 2px solid #9EC1D4;
  }
  .main_goods_shop {
    background: rgba(120, 208, 236, 0.5);
    opacity: 1.5;
    filter: blur(5px);
    z-index: 90;
    width: 530px;
    height: 100%;
    position: absolute;
    border-radius: 5px;}
  .textCart_sum{
    font-family: Roboto, serif;
    font-style: normal;
    font-weight: normal;
    z-index: 100;
    position: relative;
    font-size: 22px;
    padding-top: 30px;
    margin-left: 70px;
  }
  .btn_shop{
    font-family: Roboto, serif;
    width: 240px;
    height: 54px;
    font-weight: 700;
    color: white;
    text-decoration: none;
    padding: .8em 1em calc(.8em + 3px);
    border-radius: 3px;
    background: rgb(30, 144, 255);
    box-shadow: 0 -3px rgb(0, 0, 255) inset;
    transition: 0.2s;
    margin: auto;
  }
  .btn_shop:hover {
    background: rgb(65, 105, 225);
  }
  .btn_shop:active {
    background: rgb(65, 105, 225);
    box-shadow: 0 3px rgb(0, 0, 255) inset;
  }
  .btn_return{
    font-family: Roboto, serif;
    width: 275px;
    height: 54px;
    color: #1E90FF;
    font-weight: 700;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 1em 2em;
    outline: none;
    border-radius: 1px;
    -webkit-transition: 0.2s;
    transition: 0.2s;
  }
  .btn_return:hover {
    background: rgba(255,255,255,.2);
    border: 2px solid
  }
  .btn_return:active {
    background: none;
  }
</style>
