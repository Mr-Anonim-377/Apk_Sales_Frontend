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
            {{paymentType}}
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
                            @update-items="updateItemsCity">
            </v-autocomplete>
          </div>
          <span class="text_order text_order_size"><b>Способ получения</b></span>
          <div class="section_delivery">
            <div class="container_postal">
              <span class="text_order text_size_courier delivery_text"><b>Курьером</b></span>
              <span class="text_good delivery_text">В удобный для вас день</span>
              <span class="text_good text_size_price"> 250 ₽</span>
            </div>
            <div class="container_postal">
              <span class="text_order text_size_courier delivery_text"><b>Самовывоз</b></span>
              <span class="text_good delivery_text">Без лишних рук и когда удобно</span>
              <span class="text_good text_size_price"> 99 ₽</span>
            </div>
            <div class="container_postal">
              <span class="text_order text_size_courier delivery_text"><b>Почтой</b></span>
              <span class="text_good delivery_text">В ближайшее отделение Почты России</span>
              <span class="text_good text_size_price"> 149 ₽</span>
            </div>
          </div>
          <span class="text_order text_order_size"><b>Адрес получателя</b></span>
          <div class="item_autocomplete_container">
            <v-autocomplete placeholder="Улица" :items="itemsStreat" v-model="itemStreat" :get-label="getLabel" :component-item='template' @update-items="updateItemsStreat">
            </v-autocomplete>
          </div>
          <div class="container_input_address">
            <div class="item_autocomplete_container">
              <v-autocomplete placeholder="Дом" :items="itemsHomeNumber" :min-len="1" v-model="itemHomeNumber" :get-label="getLabel" :component-item='template' @update-items="updateItemsHomeNumber">
              </v-autocomplete>
            </div>
            <div class="item_autocomplete_container container_margin_left">
              <input class="inp_home" placeholder="Квартира" v-model="roomNumber">
            </div>
          </div>
          <input class="input_name" placeholder="Фамилия и Имя по паспорту" v-model="fistAndLastName">
          <span class="text_good_inp">Полные фамилия и имя по паспорту могут потребоваться при получении заказа</span>
          <div class="container_input_mail">
            <input class="inp_mail" placeholder="Электронная почта" v-model="email">
            <masked-input @input="registerPhone = arguments[1]" mask="\+\7 (111) 111-11-11" placeholder="Телефон" class="inp_mail" />
          </div>
          <span class="text_order text_order_size"><b>Способ оплаты</b></span>
          <div class="">
            <input v-model="paymentType" class="inp_radio" type="radio" name="gender" value="">
            <span class="text_good">Картой</span>
          </div>
          <div class="">
            <input v-model="paymentType" class="inp_radio" type="radio" name="gender" value="Наличными">
            <span class="text_good">Наличными при получении</span>
          </div>
          <p><input class="mail_inp" type="checkbox" name="spice" value="Salt">Сообщать мне об акциях, скидках и
            рекомендациях</p>
          <div class="btn_order_container">
            <div class="btn_orderReg" >ПЕРЕЙТИ К ОПЛАТЕ</div>
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
      email: '',
      phone: '',
      itemHomeNumber: {},
      itemsHomeNumber: [],
      itemStreat: {},
      itemsStreat: [],
      itemCity: {},
      itemsCity: [],
      template: ItemTemplate,
      deliveryPrice: 899,
      roomNumber: '',
      fistAndLastName: '',
      paymentType: ''
    }
  },
  name: 'OrderBody',
  props: {
    cart: {}
  },
  methods: {
    getLabel (item) {
      return item.name
    },
    updateItemsCity (text) {
      const kladrApi = require('kladrapi-for-node');
      const Kladr = new kladrApi();
      let q = {query: text, contentType: 'city', withParent: 0};
      Kladr.getData(q, (err, result) => {
        var items = result.result;
        items.splice(0, 1);
        this.itemsCity = items
      })
    },
    updateItemsStreat (text) {
      const kladrApi = require('kladrapi-for-node');
      const Kladr = new kladrApi();
      let q = {query: text, contentType: 'street', withParent: this.itemCity.id, cityId: this.itemCity.id};
      Kladr.getData(q, (err, result) => {
        var items = result.result;
        items.splice(0, 1);
        this.itemsStreat = items
      })

    },
    updateItemsHomeNumber (text) {
      const kladrApi = require('kladrapi-for-node');
      const Kladr = new kladrApi();
      let q = {query: text, contentType: 'building', withParent: this.itemStreat.id, streetId: this.itemStreat.id};
      Kladr.getData(q, (err, result) => {
        var items = result.result;
        items.splice(0, 1);
        this.itemsHomeNumber = items
      })

    }
  }
}
</script>

<style>
  @import '../../../../static/CSS/CSS.css';

  .v-autocomplete-list{
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
    position: relative;
  }

  .container_margin_left {
    margin-left: 2%;
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
</style>
