<template>
  <section class="section">
    <div class="section_main">
      <div class="main"></div>
      <div class="order_container">
        <div class="main_order_section">
          <div class="section_good">
            <h1 class="text_h"><b>Оформление заказа</b></h1>
            <br><br>
            <div class="text_order"><b>Состав заказа</b></div>
            <br>
            <div class="container_good" v-for="product in cart.products">
              <div class="img_good"><img class="img_good" v-bind:src="product.product.image.imagePatch"></div>
              <div class="text_good">{{product.productName}}<br>{{product.numberPieces}} шт.</div>
              <div class="good_price">{{product.product.price}} ₽</div>
            </div>
          </div>
          <div class="section_order">
            <div class="container_order-btn">
              <span class="text_order"><b>Ваш заказ</b></span>
            </div>
            <br>
            <div class="container_text">
              <span class="text_good">Товары ({{cart.countProducts}}) </span>
              <span class="text_good text_good_size"> {{cart.totalAmount}} ₽</span>
            </div>
            <div class="container_text">
              <span class="text_good">Доставка курьером </span>
              <span class="text_good text_good_size"> {{deliveryPrice}} ₽</span>
            </div>
            <br>
            <div class="order-line"></div>
            <br>
            <div class="container_text">
              <span class="text_good"><b>Итого</b></span>
              <span class="text_good text_good_size"><b> {{deliveryPrice + cart.totalAmount}} ₽</b></span>
            </div>
          </div>
        </div>
        <br> <br>
        <div class="main_regitretion_section">
          <span class="text_order"><b>Город получения</b></span>
          <div class="item_autocomplete_container">
            <v-autocomplete placeholder="Населенный пункт" :items="itemsCity" v-model="itemCity" :get-label="getLabel"
                            :component-item='template'
                            @update-items="updateItemsCity"
                            :auto-select-one-item="false">
            </v-autocomplete>
            <div class="loader" v-if="isCityInput">
              <div class="ball one"><div class="inner"></div></div>
              <div class="ball two"><div class="inner"></div></div>
              <div class="ball three"><div class="inner"></div></div>
              <div class="ball four"><div class="inner"></div></div>
              <div class="ball five"><div class="inner"></div></div>
              <div class="ball six"><div class="inner"></div></div>
              <div class="ball center"><div class="inner"></div></div>
            </div>
          </div>
          <span class="text_order text_order_size"><b>Способ получения</b></span>
          <div class="section_delivery">
            <div class="container_postal" @click="setNumClick(1)" v-bind:style="getColor(1)">
              <span class="text_order text_size_courier delivery_text"><b>Курьером</b></span>
              <span class="text_good delivery_text">В удобный для вас день</span>
              <span class="text_good text_size_price"> 250 ₽</span>
            </div>
            <div class="container_postal" @click="setNumClick(2)" v-bind:style="getColor(2)">
              <span class="text_order text_size_courier delivery_text"><b>Самовывоз</b></span>
              <span class="text_good delivery_text">Без лишних рук и когда удобно</span>
              <span class="text_good text_size_price"> 99 ₽</span>
            </div>
            <div class="container_postal" @click="setNumClick(3)" v-bind:style="getColor(3)">
              <span class="text_order text_size_courier delivery_text"><b>Почтой</b></span>
              <span class="text_good delivery_text">В ближайшее отделение Почты России</span>
              <span class="text_good text_size_price"> 149 ₽</span>
            </div>
          </div>
          <span class="text_order text_order_size"><b>Адрес получателя</b></span>
          <div class="item_autocomplete_container">
            <v-autocomplete :auto-select-one-item="false" placeholder="Улица" :items="itemsStreat" v-model="itemStreat" :get-label="getLabel" :component-item='template' @update-items="updateItemsStreat">
            </v-autocomplete>
            <div class="loader" v-if="isStreatInput">
              <div class="ball one"><div class="inner"></div></div>
              <div class="ball two"><div class="inner"></div></div>
              <div class="ball three"><div class="inner"></div></div>
              <div class="ball four"><div class="inner"></div></div>
              <div class="ball five"><div class="inner"></div></div>
              <div class="ball six"><div class="inner"></div></div>
              <div class="ball center"><div class="inner"></div></div>
            </div>
          </div>
          <div class="container_input_address">
            <div class="item_autocomplete_container">
              <v-autocomplete :auto-select-one-item="false" placeholder="Дом" :items="itemsHomeNumber" :min-len="1" v-model="itemHomeNumber" :get-label="getLabel" :component-item='template' @update-items="updateItemsHomeNumber">
              </v-autocomplete>
              <div class="loader_container">
                <div class="loader" v-if="isHomeNumberInput">
                  <div class="ball one"><div class="inner"></div></div>
                  <div class="ball two"><div class="inner"></div></div>
                  <div class="ball three"><div class="inner"></div></div>
                  <div class="ball four"><div class="inner"></div></div>
                  <div class="ball five"><div class="inner"></div></div>
                  <div class="ball six"><div class="inner"></div></div>
                  <div class="ball center"><div class="inner"></div></div>
                </div>
              </div>
            </div>
          </div>
          <div class="container_input_mail margin_top">
            <input class="inp_home" placeholder="Квартира" v-model="roomNumber">
            <input class="inp_mail" placeholder="Электронная почта" v-model="email">
            <masked-input @input="phone = arguments[1]" mask="\+\7 (111) 111-11-11" placeholder="Телефон" class="inp_mail" />
          </div>
          <br>
          <span class="text_good_inp">Полные фамилия и имя по паспорту могут потребоваться при получении заказа</span>
          <input class="input_name" placeholder="Фамилия и Имя по паспорту" v-model="fistAndLastName">
          <span class="text_order text_order_size"><b>Способ оплаты</b></span>
          <div class="">
            <input v-model="paymentType" class="inp_radio" type="radio" name="gender" value="non">
            <span class="text_good">Картой</span>
          </div>
          <div class="">
            <input v-model="paymentType" class="inp_radio" type="radio" name="gender" value="cash">
            <span class="text_good">Наличными при получении</span>
          </div>
          <p><input class="mail_inp" type="checkbox" name="spice" value="Salt">Сообщать мне об акциях, скидках и
            рекомендациях</p>
          <div class="btn_order_container">
            <div class="btn_orderReg" @click="createOrder()" >ПЕРЕЙТИ К ОПЛАТЕ</div>
            <a href="/shoppingCart">
              <div class="btn_return">ВЕРНУТЬСЯ В КОРЗИНУ</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ItemTemplate from '../../utilsComponent/ItemTemplate'
import MaskedInput from 'vue-masked-input'
export default {
  components: {
    MaskedInput
  },
  data () {
    return {
      colorActive: {
        background: '#52abc5'
      },
      isCityInput: false,
      isStreatInput: false,
      isHomeNumberInput: false,
      email: '',
      phone: '',
      itemHomeNumber: {},
      itemsHomeNumber: [],
      itemStreat: {},
      itemsStreat: [],
      itemCity: {},
      itemsCity: [],
      template: ItemTemplate,
      deliveryPrice: 250,
      roomNumber: '',
      fistAndLastName: '',
      paymentType: '',
      numClick: 1,
      uuidDelivery: 'a8b81fcd-a7ad-4973-ae7a-255a65ee71c9',
      cod: {}
    }
  },
  name: 'OrderBody',
  props: {
    user: {},
    cart: {}
  },
  methods: {
    getLabel (item) {
      return item.name
    },
    updateItemsCity (text) {
      this.isCityInput = true;
      const kladrApi = require('kladrapi-for-node');
      const Kladr = new kladrApi();
      let q = {query: text, contentType: 'city', withParent: 0};
      Kladr.getData(q, (err, result) => {
        var items = result.result;
        items.splice(0, 1);
        this.isCityInput = false;
        this.itemsCity = items
      })
    },
    updateItemsStreat (text) {
      this.isStreatInput = true;
      const kladrApi = require('kladrapi-for-node');
      const Kladr = new kladrApi();
      let q = {query: text, contentType: 'street', withParent: this.itemCity.id, cityId: this.itemCity.id};
      Kladr.getData(q, (err, result) => {
        this.isStreatInput = false;
        var items = result.result;
        items.splice(0, 1);
        this.itemsStreat = items
      })
    },
    updateItemsHomeNumber (text) {
      this.isHomeNumberInput = true;
      const kladrApi = require('kladrapi-for-node');
      const Kladr = new kladrApi();
      let q = {query: text, contentType: 'building', withParent: this.itemStreat.id, streetId: this.itemStreat.id};
      Kladr.getData(q, (err, result) => {
        this.isHomeNumberInput = false;
        var items = result.result;
        items.splice(0, 1);
        this.itemsHomeNumber = items
      })
    },
    getColor (num) {
      if (num === this.numClick) {
        return this.colorActive
      }
    },
    setNumClick (num) {
      this.numClick = num;
      if (num === 1) {
        this.uuidDelivery = 'a8b81fcd-a7ad-4973-ae7a-255a65ee71c9';
        this.deliveryPrice = 250
      }
      if (num === 2) {
        this.uuidDelivery = 'a8b81fcd-a7ad-4973-ae7a-255a65ee71c9';
        this.deliveryPrice = 99
      }
      if (num === 3) {
        this.uuidDelivery = 'baa8587b-7859-4b9a-948f-25906513c343';
        this.deliveryPrice = 149
      }
    },
    createOrder () {
      var productsIds = [];
      this.cart.products.forEach(value => productsIds.push({
        productCount: value.numberPieces,
        productId: value.product.productId
      }));
      var requestData = {
        adress: this.itemCity.name + ',' + this.itemStreat.name + ',' + this.itemHomeNumber.name + ',' + this.roomNumber,
        deliveryId: this.uuidDelivery,
        email: this.email,
        firstName: this.fistAndLastName.split(' ')[1],
        isPayment: false,
        lastName: this.fistAndLastName.split(' ')[0],
        paymentType: this.paymentType,
        phone: '+7' + this.phone,
        productIds: productsIds };

      fetch(process.env.HOST + '/api/user/order/create', {
        credentials: 'include',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      }).then(result => result.json()).then(commits => {
        if (commits.cod.length !== 0) {
          this.cod = commits.cod;
          fetch(process.env.HOST + '/api/shoppingCart/clear', {
            method: 'get',
            credentials: 'include'
          }).then(response => this.$emit('addProduct', true));
          this.$router.push({name: 'thanks', params: {cod: this.cod}})
        }
      })
    }
  }
}
</script>

<style>
  @import '../../../../static/CSS/CSS.css';

  .loader {
    position: absolute;
    width: 172px;
    height: 109px;
    left: 51.5%;
    top: 21%;
    margin-left: -150px;
    margin-top: -50px;
    border-radius: 20px;
  }

  .loader .ball {
    position: absolute;
    width: 0;
    height: 65%;
    left: -15px;
    bottom: 0;
    background: #a366aa;
    opacity: 0;
    -webkit-animation: moveBall 2.8s infinite linear;
    animation: moveBall 2.8s infinite linear;
  }

  .loader .ball.one {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }

  .loader .ball.two {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .loader .ball.three {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }

  .loader .ball.four {
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }

  .loader .ball.five {
    -webkit-animation-delay: 0.8s;
    animation-delay: 0.8s;
  }

  .loader .ball.six {
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }

  .loader .ball .inner {
    height: 20px;
    width: 20px;
    position: absolute;
    background: #be64f0;
    bottom: 0;
    left: 0;
    margin-left: -15px;
    border-radius: 100%;
  }

  .loader .ball.center {
    left: 54%;
    top: 73%;
    background: none;
    -webkit-animation: centerBall 2.8s infinite cubic-bezier(0.55, 0.055, 0.675, 0.19);
    animation: centerBall 2.8s infinite cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  .loader .ball.center .inner {
    top: -15px;
  }

  @-moz-keyframes centerBall {
    0%, 25%, 100% {
      opacity: 1;
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    75% {
      opacity: 0;
    }
  }

  @-webkit-keyframes centerBall {
    0%, 25%, 100% {
      opacity: 1;
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    75% {
      opacity: 0;
    }
  }

  @-o-keyframes centerBall {
    0%, 25%, 100% {
      opacity: 1;
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    75% {
      opacity: 0;
    }
  }

  @keyframes centerBall {
    0%, 25%, 100% {
      opacity: 1;
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    75% {
      opacity: 0;
    }
  }

  @-moz-keyframes moveBall {
    0% {
      left: -10%;
      opacity: 0;
      -webkit-animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
      animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
    }

    10% {
      opacity: 0;
    }

    28.7% {
      transform: rotate(-180deg);
      left: 50%;
      opacity: 1;
      -webkit-animation-timing-function: linear;
      animation-timing-function: linear;
    }

    71.3% {
      transform: rotate(180deg);
      left: 50%;
      opacity: 1;
      -webkit-animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
      animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    90% {
      opacity: 0;
    }

    100% {
      left: 110%;
      transform: rotate(360deg);
      opacity: 0;
    }
  }

  @-webkit-keyframes moveBall {
    0% {
      left: -10%;
      opacity: 0;
      -webkit-animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
      animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
    }

    10% {
      opacity: 0;
    }

    28.7% {
      transform: rotate(-180deg);
      left: 50%;
      opacity: 1;
      -webkit-animation-timing-function: linear;
      animation-timing-function: linear;
    }

    71.3% {
      transform: rotate(180deg);
      left: 50%;
      opacity: 1;
      -webkit-animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
      animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    90% {
      opacity: 0;
    }

    100% {
      left: 110%;
      transform: rotate(360deg);
      opacity: 0;
    }
  }

  @-o-keyframes moveBall {
    0% {
      left: -10%;
      opacity: 0;
      -webkit-animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
      animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
    }

    10% {
      opacity: 0;
    }

    28.7% {
      transform: rotate(-180deg);
      left: 50%;
      opacity: 1;
      -webkit-animation-timing-function: linear;
      animation-timing-function: linear;
    }

    71.3% {
      transform: rotate(180deg);
      left: 50%;
      opacity: 1;
      -webkit-animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
      animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    90% {
      opacity: 0;
    }

    100% {
      left: 110%;
      transform: rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes moveBall {
    0% {
      left: -10%;
      opacity: 0;
      -webkit-animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
      animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
    }

    10% {
      opacity: 0;
    }

    28.7% {
      transform: rotate(-180deg);
      left: 50%;
      opacity: 1;
      -webkit-animation-timing-function: linear;
      animation-timing-function: linear;
    }

    71.3% {
      transform: rotate(180deg);
      left: 50%;
      opacity: 1;
      -webkit-animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
      animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    90% {
      opacity: 0;
    }

    100% {
      left: 110%;
      transform: rotate(360deg);
      opacity: 0;
    }
  }

  .v-autocomplete-list{
    z-index: 100;
    width: 400px;
    border-radius: 5px;
    overflow-y: scroll;
    max-height: 258px;
    background: #9bbbd0;
    text-align: left;
  }
  .v-autocomplete
  .v-autocomplete-input-group
  .v-autocomplete-input {
    outline: none;
  }

  .v-autocomplete-list-item {
    cursor: pointer;
  }

  .btn_return {font-family: Roboto, serif;
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
    margin-left: 10px;
  }

  .btn_return:hover {
    background: rgba(255, 255, 255, .2);
    border: 2px solid
  }

  .btn_return:active {
    background: none;
  }

  .btn_order_container {
    display: flex;
  }

  .good_price {
    font-family: Roboto, serif;
    font-style: italic;
    font-weight: normal;
    font-size: 18px;
    text-align: left;
    height: fit-content;
    width: fit-content;
    position: relative;
    left: 75%;
    top: 23px;
  }

  .item_autocomplete_container {
    display: flex;
    position: relative;
  }

  .container_margin_left {
    margin-left: 5%;
    top: 29px;
  }

  .delivery_text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 4%;
    text-decoration: none;
    color: #08303D;
    position: relative;
    z-index: 72;
    width: 80%;
    font-family: Roboto, serif;
    font-style: italic;
    font-weight: normal;
    font-size: 18px;
    text-align: left;
    margin-left: 21px;
  }

  .loader_container {
    left: 43%;
    position: relative;
  }

  .margin_top {
  margin-top: 2%;
  }
</style>
