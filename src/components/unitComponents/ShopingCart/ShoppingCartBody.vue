<template>
  <section class = "section">
    <div class="section_main">
      <div class = "main"></div>
      <p class="text_shoppingCart" v-if="products.length === 0">Корзина пуста</p>
      <div class ="basket_container basket_container_section"
        v-for="product in products">
        <div class="section_good">
          <div class="section_goodItem">
            <div class="main_good">
              <div class="main_goods">
<!--                <img class="main_goods_img" :src="product.image.imagePatch"/>-->
              </div>
              <div class="section_description">
                <div class="main_goods_back"></div>
                <div class="main_goods_section">
<!--                  <a class="main_goods_text">{{product.productName}}</a>-->
<!--                  <a class="main_goods_text_pay">{{product.price}} Руб.</a>-->
                </div>
              </div>
            </div>
            <ShoppingCartPieces/>
          </div>
<!--          <div class="section_goodItem">-->
<!--            <div class="main_good">-->
<!--              <div class="main_goods">-->
<!--&lt;!&ndash;                <img class="main_goods_img" src="./CSS/pictures/Citten.jpg"/>&ndash;&gt;-->
<!--              </div>-->
<!--              <div class="section_description">-->
<!--                <div class="main_goods_back"></div>-->
<!--                <div class="main_goods_section">-->
<!--                  <a class="main_goods_text">Карта памяти AEGO 16 GB U1 Class 10 microCDHS (без адаптер) 1DGQ8MO5XB</a>-->
<!--                  <a class="main_goods_text_pay main_goods_text_pay_small"><s>1212.00 Руб.</s><br>1211.0</a>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="section_number">-->
<!--              <div class="minus"></div>-->
<!--              <div class="number">4</div>-->
<!--              <div class="plus"></div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="section_goodItem">-->
<!--            <div class="main_good">-->
<!--              <div class="main_goods">-->
<!--&lt;!&ndash;                <img class="main_goods_img" src="./CSS/pictures/Citten.jpg"/>&ndash;&gt;-->
<!--              </div>-->
<!--              <div class="section_description">-->
<!--                <div class="main_goods_back"></div>-->
<!--                <div class="main_goods_section">-->
<!--                  <a class="main_goods_text">Карта памяти AEGO 16 GB U1 Class 10 microCDHS (без адаптер) 1DGQ8MO5XB</a>-->
<!--                  <a class="main_goods_text_pay">1200.00 Руб.</a>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="section_number">-->
<!--              <div class="minus"></div>-->
<!--              <div class="number">4</div>-->
<!--              <div class="plus"></div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="section_goodItem">-->
<!--            <div class="main_good">-->
<!--              <div class="main_goods">-->
<!--&lt;!&ndash;                <img class="main_goods_img" src="./CSS/pictures/Citten.jpg"/>&ndash;&gt;-->
<!--              </div>-->
<!--              <div class="section_description">-->
<!--                <div class="main_goods_back"></div>-->
<!--                <div class="main_goods_section">-->
<!--                  <a class="main_goods_text">Карта памяти AEGO 16 GB U1 Class 10 microCDHS (без адаптер) 1DGQ8MO5XB</a>-->
<!--                  <a class="main_goods_text_pay">1200.00 Руб.</a>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="section_number">-->
<!--              <div class="minus"></div>-->
<!--              <div class="number">4</div>-->
<!--              <div class="plus"></div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="section_goodItem">-->
<!--            <div class="main_good main_good_end">-->
<!--              <div class="main_goods">-->
<!--&lt;!&ndash;                <img class="main_goods_img" src="./CSS/pictures/Citten.jpg"/>&ndash;&gt;-->
<!--              </div>-->
<!--              <div class="section_description">-->
<!--                <div class="main_goods_back"></div>-->
<!--                <div class="main_goods_section">-->
<!--                  <a class="main_goods_text">Карта памяти AEGO 16 GB U1 Class 10 microCDHS (без адаптер) 1DGQ8MO5XB</a>-->
<!--                  <a class="main_goods_text_pay">1200.00 Руб.</a>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="section_number">-->
<!--              <div class="minus"></div>-->
<!--              <div class="number">4</div>-->
<!--              <div class="plus"></div>-->
<!--            </div>-->
          </div>
        </div>
        <div class="cart-btn" v-if="products > 0 ">
          <button class="cart-btn-wrap">Оформить заказ</button>
        </div>
      </div>
<!--    </div>-->
  </section>
</template>

<script>
import ShoppingCartPieces from './ShoppingCartPieces'
export default {
  name: 'ShoppingCardBody',
  components: {ShoppingCartPieces},
  data () {
    return {products: []}
  },
  created: function init () {
    fetch(process.env.HOST + '/api/shoppingCart/cart', {
      method: 'get',
      credentials: 'include'
    })
      .then(response => response.json())
      // eslint-disable-next-line no-return-assign
      .then(commits => this.products = commits)
      .catch(function (error) {
        console.log('Request failed', error)
      })
  }
}
</script>

<style >
  @import '../../../../static/CSS/CSS.css';

  .text_shoppingCart {
    font-family: Roboto, serif;
    font-style: normal;
    font-weight: normal;
    text-align: center;
    z-index: 100;
    position: relative;font-size: 32px;
  }
</style>
